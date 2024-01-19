const moment = require('moment');

module.exports = (app) => {
    function modulo11(dado) {
        let mult, suma, i, n, dig;
        suma = 0;
        mult = 2;
        for (let i = dado.length - 1; i >= 0; i--) {
            suma += (mult * parseInt(dado.substring(i, i + 1)));
            if (++mult > 9) {
                mult = 2;
            }
        }
        dig = suma % 11;
        switch (dig) {
            case 10:
                dado += '1';
                break;
            case 11:
                dado += '0';
                break;
            default:
                dado += dig.toString();
        }
        return dado;
    }

    function cero(value, n) {
        while (value.toString().length < n) {
            value = `0${value}`;
        }
        return value;
    }

    function dec2hex(str) {
        let dec = str.split(''), sum = [], hex = [], s;
        while (dec.length) {
            s = 1 * dec.shift();
            for (let i = 0; s || i < sum.length; i++) {
                s += (sum[i] || 0) * 10;
                sum[i] = s % 16;
                s = (s - sum[i]) / 16;
            }
        }
        while (sum.length) {
            hex.push(sum.pop().toString(16));
        }
        return hex.join('').toUpperCase();
    }

    function getCuf(nit, fecha, sucursal, codigoModalidad, tipoEmision, tipoFacturaDocumento, tipoDocumentoSector, numeroFactura, puntoVenta, codigoControl) {
        let value = `${cero(nit, 13)}${moment(fecha, 'YYYY-MM-DDTHH:mm:ss.SSS').format('YYYYMMDDHHmmssSSS')}`;
        value = `${value}${cero(sucursal, 4)}${codigoModalidad}${tipoEmision}${tipoFacturaDocumento}`;
        value = `${value}${cero(tipoDocumentoSector, 2)}${cero(numeroFactura, 10)}${cero(puntoVenta, 4)}`;
        return `${dec2hex(modulo11(value))}${codigoControl}`;
    }

    return getCuf;
};
