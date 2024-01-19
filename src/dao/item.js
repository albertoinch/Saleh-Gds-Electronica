const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = (app) => {
    const models = app.db.models;

    async function getItem(datos, t) {
        return await models.item.findOne({
            attributes: [
                ['codigo', 'codigoProducto'],
                ['actividad_economica', 'actividadEconomica'],
                ['codigo_sin', 'codigoProductoSin'],
                [Sequelize.literal(`descripcion || ' (' || '${datos.descripcion}' || ')'`), 'descripcion'],
                [Sequelize.literal(datos.cantidad), 'cantidad'],
                [Sequelize.literal(datos.unidadMedida), 'unidadMedida'],
                [Sequelize.literal(datos.precioUnitario), 'precioUnitario'],
                [Sequelize.literal(datos.montoDescuento ? datos.montoDescuento : 'NULL'), 'montoDescuento'],
                [Sequelize.literal(datos.montoDescuento ? `${datos.precioUnitario} * ${datos.cantidad} - ${datos.montoDescuento}` : `${datos.precioUnitario} * ${datos.cantidad}`), 'subTotal'],
                [Sequelize.literal(datos.numeroSerie ? datos.numeroSerie : 'NULL'), 'numeroSerie'],
                [Sequelize.literal(datos.numeroImei ? datos.numeroImei : 'NULL'), 'numeroImei'],
                ['codigo_documento_sector', 'codigoDocumentoSector']
            ],
            where: {
                codigo: datos.codigoProducto
            },
            transaction: t
        }).then(itemResp => {
            if (itemResp) {
                return itemResp.toJSON();
            } else {
                return itemResp;
            }
        });
    }

    async function items(t){
        return await models.item.findAll({
            attributes:['codigo','descripcion','codigo_unidad','imei','serie'],
            transaction: t
        }).then(res => res.map(item => item.toJSON()))
    }

    async function index(req, t) {
        //var nro = parseInt(req.query.buscarActividad);
        const options = {
            fid_contribuyente: req.body.audit_usuario.id_contribuyente
        };

        // filtro por Actividad
        if(req.query.buscarActividad){
            options.actividad_economica={
                [Op.iLike]: '%'+req.query.buscarActividad+'%'
            };
        }
        //filtro por codigo
        if(req.query.buscarCodigo){
            options.codigo= {
                [Op.iLike]: '%'+req.query.buscarCodigo+'%'
            }
        }
        //filtro por codigo SIN
        if(req.query.buscarCodigoSin){
            options.codigo_sin= {
                [Op.iLike]: '%'+req.query.buscarCodigoSin+'%'
            }
        }

        let limit = req.query.limit;   // numero de respuestas por pagina
        let page = req.params.page;
        let offset = limit * (page - 1);
        //console.log(options)
        return models.item.findAndCountAll({
            attributes: ['codigo', 'actividad_economica', 'codigo_sin', 'descripcion', 'codigo_unidad'],
            where: options,
            limit: limit,
            offset: offset,
            order: [['codigo', 'ASC']]
        }).then(function (data) {
            page = Math.ceil(data.count / limit);
            return data;
        });
    }

    async function post(item, t) {
        if (item.actividad_economica && item.codigo_sin) {
            const a = await app.dao.catalogo.getActividadEconomica(item.actividad_economica.toString(), t);//verificacion si existe el codigo enviado
            if (!a) {
                throw Error('La actividad economica no es válida.');
            }
            const s = await app.dao.catalogo.getActividadCodigoSin(item.codigo_sin.toString(), item.actividad_economica.toString(), t);//verificacion si existe el codigo enviado
            if (!s) {
                throw Error('El codigo SIN de producto introducido no es válido.');
            }
        }
        const m = await app.dao.catalogo.getCodigoMoneda(item.codigo_moneda.toString(), t);//verificacion si existe el codigo enviado
        if (!m) {
            throw Error('El codigo de moneda introducido no es válido.');
        }
        const u = await app.dao.catalogo.getCodigoUnidadMedida(item.codigo_unidad.toString(), t);//verificacion si existe el codigo enviado
        if (!u) {
            throw Error('El codigo de unidad de medida introducido no es válido.');
        }
        var itemNew = await models.item.create({
            actividad_economica: item.actividad_economica,
            codigo: item.codigo,
            codigo_sin: item.codigo_sin,
            descripcion: item.descripcion,
            imei: item.imei,
            serie: item.serie,
            codigo_unidad: item.codigo_unidad,
            codigo_documento_sector: item.tipo_documento_sector,
            fid_contribuyente: item.audit_usuario.id_contribuyente,
            _usuario_creacion: item.audit_usuario.usuario,
        }, {
            transaction: t,
        });
        return itemNew;
    }

    async function buscarItem(id, t){
        return await models.item.findByPk(id,{transaccion: t}).then(resp =>{
            return resp.toJSON();
          });
    }

    async function editarItem(codigoItem, item, usuario, t){
        return await models.item.update({
            actividad_economica: item.actividad_economica,
            codigo: item.codigo,
            codigo_sin: item.codigo_sin,
            descripcion: item.descripcion.toUpperCase(),
            codigo_unidad: item.codigo_unidad,
            codigo_documento_sector: item.tipo_documento_sector,
            imei: item.imei,
            serie: item.serie,
            _usuario_modificacion: usuario
        }, {
            where: {
                codigo: codigoItem
            },
            transaction: t
        });
    }

    return {
        getItem,
        items,
        index,
        post,
        buscarItem,
        editarItem
    };
};
