/* 
 * Registro de logs en base de datos
 */
const chalk = require('chalk');

module.exports = (logs) => {
  async function error (mensaje = 'Error desconocido', tipo = '', error, usuario, ip) {
    const data = {
      nivel: 'ERROR',
      mensaje,
      tipo,
      referencia: formatReference(error),
      _usuario_creacion: usuario,
      ip
    };

    if (process.env.NODE_ENV !== 'test') {
      try {
        return await logs.create(data);
      } catch (e) {
        console.error(chalk.red('ERROR LOG:'), e.message, e);
      }
    }
  }

  async function warning (mensaje, tipo = '', referencia, usuario, ip) {
    const data = {
      nivel: 'ADVERTENCIA',
      mensaje,
      tipo,
      referencia,
      usuario,
      ip
    };

    if (process.env.NODE_ENV !== 'test') {
      try {
        return await logs.create(data);
      } catch (e) {
        console.warn(chalk.yellow('WARNING LOG:'), e.message);
      }
    }
  }

  async function info (mensaje, tipo = '', referencia, usuario, ip) {
    const data = {
      nivel: 'INFO',
      mensaje,
      tipo,
      referencia,
      _usuario_creacion: usuario,
      ip
    };
    if (process.env.NODE_ENV !== 'test') {
      try {
        return await logs.create(data);
      } catch (e) {
        console.info(chalk.cyan('INFO LOG:'), e.message);
      }
    }
  }
  
  function formatReference (error) {
    let text = [];

    if (error.fileName) {
      text.push(`Nombre del archivo: ${error.fileName}`);
    }

    if (error.columnNumber) {
      text.push(`Número de columna: ${error.columnNumber}`);
    }

    if (error.lineNumber) {
      text.push(`Número de línea: ${error.lineNumber}`);
    }

    if (error.stack) {
      text.push(error.stack);
    }

    return text.join('\n');
  }
  
  return {
    error,
    warning,
    info
  };
};
