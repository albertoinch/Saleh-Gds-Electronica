const wkhtmltopdf = require('wkhtmltopdf');

/**
 * @constructor
 * @param {string} plantilla Nombre de la plantilla.
 */
function reporte(plantilla) {
    const self = this;
    const file = `${_path}/src/templates/${plantilla}.pug`;
    self.template = require('pug').compileFile(file);
};

/**
 * Función que recibe los datos a reemplazar en la plantilla y devuelve el pdf.
 * @param {Object} datos Datos a reemplazar en la plantilla.
 * @param {Object} opciones Opciones para crear el reporte.
 * @returns {pdf}
 */
reporte.prototype.pdf = function(datos = {}, opciones = {}) {
    const self = this;
    let html = self.template(datos);
    let opt = {
        //pageSize: 'letter',
        pageWidth: '216mm',
        pageHeight: '279mm',
        marginLeft: '1.5cm',
        marginRight: '1.5cm',
        marginTop: '1.5cm',
        marginBottom: '2cm'
    };
    if (opciones.orientation) opt.orientation = opciones.orientation;
    if (opciones.marginTop) opt.marginTop = opciones.marginTop;
    if (opciones.marginLeft) opt.marginLeft = opciones.marginLeft;
    if (opciones.marginRight) opt.marginRight = opciones.marginRight;
    if (opciones.marginBotton) opt.marginBotton = opciones.marginBotton;
    if (opciones.pageWidth) opt.pageWidth = opciones.pageWidth;
    if (opciones.pageHeight) opt.pageHeight = opciones.pageHeight;
    if (opciones.output) opt.output = opciones.output;
    opt.headerHtml = `file:///${_path}/src/templates/header.html`;
    opt.footerHtml = `file:///${_path}/src/templates/footer.html`;
    return wkhtmltopdf(html, opt);
};

module.exports = reporte;
