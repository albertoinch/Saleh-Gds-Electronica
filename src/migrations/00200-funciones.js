'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        const sql = (
        `CREATE OR REPLACE FUNCTION venta(datos jsonb)
            RETURNS Int AS $BODY$
            DECLARE idPV Int; idS Int; cufdr Text; nro_factura Int; sector Text; idr Int; saldo Decimal(12, 2);
            BEGIN
                SELECT p.id_punto_venta, s.id_sucursal INTO STRICT idPV, idS
                FROM punto_venta p
                INNER JOIN sucursal s ON s.id_sucursal = p.fid_sucursal
                WHERE s.fid_contribuyente = (datos->'audit_usuario'->>'id_contribuyente')::Int
                AND s.codigo = datos->>'codigoSucursal'
                AND p.codigo = datos->>'codigoPuntoVenta';

                IF EXISTS(SELECT i.codigo
                    FROM item i, jsonb_to_recordset(datos->'detalle') AS d("codigoProducto" Text, "unidadMedida" Text)
                    WHERE i.codigo = d."codigoProducto"
                    AND i.codigo_unidad <> d."unidadMedida") THEN
                    RAISE EXCEPTION 'La unidad de medida no corresponde al producto.';
                END IF;

                IF EXISTS(SELECT d."codigoProducto"
                    FROM jsonb_to_recordset(datos->'detalle') AS d("codigoProducto" Text, "cantidad" Numeric(12, 2), "precioUnitario" Numeric(12, 2), "montoDescuento" Numeric(12, 2))
                    LEFT JOIN item i ON i.codigo = d."codigoProducto"
                    WHERE i.codigo IS NULL OR d."cantidad" * d."precioUnitario" <= coalesce(d."montoDescuento", 0)) THEN
                    RAISE EXCEPTION 'No se encontró el producto o el saldo sería negativo.';
                END IF;

                IF datos->>'numeroFactura' IS NOT NULL THEN
                    nro_factura:= (datos->>'numeroFactura')::Int - 1;
                ELSE
                    SELECT nro INTO nro_factura
                    FROM correlativo
                    WHERE correlativo = 'factura'
                    AND fid_sucursal = idS
                    AND gestion = DATE_PART('YEAR', now())::Text
                    FOR UPDATE;
                    IF nro_factura IS NULL THEN
                        INSERT INTO correlativo (nro, correlativo, fid_sucursal, gestion)
                        VALUES (1, 'factura', idS, DATE_PART('YEAR', now())::Text);
                        nro_factura:= 0;
                    ELSE
                        UPDATE correlativo
                        SET nro = nro + 1
                        WHERE correlativo = 'factura'
                        AND fid_sucursal = idS
                        AND gestion = DATE_PART('YEAR', now())::Text;
                    END IF;
                END IF;

                SELECT codigo_documento_sector INTO STRICT sector
                FROM item i, jsonb_to_recordset(datos->'detalle') AS d("codigoProducto" Text)
                WHERE i.codigo = d."codigoProducto"
                GROUP BY codigo_documento_sector;

                SELECT id_cliente INTO idr
                FROM cliente
                WHERE tipo_documento = datos->>'codigoTipoDocumentoIdentidad'
                AND numero_documento = datos->>'numeroDocumento'
                AND (complemento = datos->>'complemento' OR datos->>'complemento' IS NULL);
                IF idr IS NULL THEN
                    WITH i AS(INSERT INTO cliente (tipo_documento, complemento_visible, numero_documento, complemento, razon_social, _usuario_creacion, _fecha_creacion, _fecha_modificacion)
                    VALUES (datos->>'codigoTipoDocumentoIdentidad', datos->>'complemento' <> '' AND datos->>'complemento' IS NOT NULL, datos->>'numeroDocumento', CASE datos->>'complemento' WHEN '' THEN NULL ELSE datos->>'complemento' END, datos->>'nombreRazonSocial', datos->'audit_usuario'->>'usuario', now(), now())
                    RETURNING id_cliente)
                    SELECT id_cliente INTO idr
                    FROM i;
                END IF;

                WITH i AS(INSERT INTO venta(numero_factura, numero_documento, nombre_razon_social, monto, tipo_emision, cafc, datos, factura, cuf, cufd, codigo_documento_sector, email, _usuario_creacion, _fecha_creacion, _fecha_modificacion, fid_punto_venta, fid_cliente)
                SELECT nro_factura + 1, datos->>'numeroDocumento', datos->>'nombreRazonSocial', SUM(CASE WHEN "subTotal" IS NULL THEN "cantidad" * "precioUnitario" - coalesce("montoDescuento", 0) ELSE "subTotal" END) - coalesce(datos->>'descuentoAdicional', '0')::Numeric(12,2), (datos->>'tipoEmision')::Int, coalesce(datos->>'cafc', ''), datos, '', '', '', sector, datos->>'email', datos->'audit_usuario'->>'usuario', now(), now(), idPV, idr
                FROM jsonb_to_recordset(datos->'detalle') AS d("cantidad" Numeric(12, 2), "precioUnitario" Numeric(12, 2), "montoDescuento" Numeric(12, 2), "subTotal" Numeric(12, 2))
                RETURNING id_venta)
                SELECT id_venta INTO idr
                FROM i;

                INSERT INTO detalle(fid_venta, codigo, descripcion, cantidad, unidad_medida, precio_unitario, monto_descuento, sub_total, numero_imei, numero_serie, _usuario_creacion, _fecha_creacion, _fecha_modificacion)
                SELECT idr, i.codigo, d."descripcion", d."cantidad", d."unidadMedida", d."precioUnitario", coalesce(d."montoDescuento", 0), CASE WHEN d."subTotal" IS NULL THEN d."cantidad" * d."precioUnitario" - coalesce(d."montoDescuento", 0) ELSE "subTotal" END, d."numeroImei", d."numeroSerie", datos->'audit_usuario'->>'usuario', now(), now()
                FROM item i, jsonb_to_recordset(datos->'detalle') AS d("codigoProducto" Text, "descripcion" Text, "cantidad" Numeric(12, 2), "unidadMedida" Text, "precioUnitario" Numeric(12, 2), "montoDescuento" Numeric(12, 2), "subTotal" Numeric(12, 2), "numeroImei" Text, "numeroSerie" Text)
                WHERE i.codigo = d."codigoProducto";

                INSERT INTO deposito(fid_venta, id, numero, fecha, monto, facturado, _usuario_creacion, _fecha_creacion, _fecha_modificacion)
                SELECT idr, id, numero, fecha, monto, facturado, datos->'audit_usuario'->>'usuario', now(), now()
                FROM jsonb_to_recordset(datos->'depositos') AS d(id Int, numero BigInt, fecha Date, monto Numeric(12, 2), facturado Numeric(12, 2));

                WITH v AS(SELECT v.id_venta
                    FROM venta v, deposito d, deposito da
                    WHERE v.id_venta = d.fid_venta
                    AND v.estado NOT IN ('ANULADO', 'RECHAZADO')
                    AND d.id = da.id
                    AND da.fid_venta = idr
                    GROUP BY v.id_venta),
                f AS(SELECT SUM(facturado) facturado
                    FROM deposito d
                    WHERE d.fid_venta = idr),
                m AS(SELECT SUM(monto) monto
                    FROM (SELECT d.id, d.monto
                        FROM deposito d
                        WHERE d.fid_venta IN(SELECT id_venta FROM v)
                        GROUP BY d.id, d.monto) m),
                va AS(SELECT v.id_venta, SUM(d.sub_total) total
                    FROM v, detalle d
                    WHERE v.id_venta = d.fid_venta
                    AND v.id_venta IN(SELECT id_venta FROM v)
                    GROUP BY v.id_venta)
                SELECT MAX(monto) - MAX(facturado) - SUM(total) INTO saldo
                FROM va, m, f;

                IF saldo < 0 THEN
                    RAISE EXCEPTION 'El saldo por la facturación sería negativo.';
                END IF;
        
                RETURN idr;
            END;
            $BODY$ LANGUAGE plpgsql;`
        );

        return queryInterface.sequelize.query(sql);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query('DROP FUNCTION FUNCTION venta(jsonb)');
    }
};
