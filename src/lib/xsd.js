const xsd = require('xsd-schema-validator');

function validateXML(xml, xsdFile) {
    return new Promise((resolve, reject) => {
        xsd.validateXML(xml, xsdFile, function(err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

module.exports = {
    validateXML
};