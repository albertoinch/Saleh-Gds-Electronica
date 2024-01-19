const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = (app) => {
    const models = app.db.models;

    async function getCodigoCliente(factura, t) {
        let clienteRes = await models.cliente.findOne({
            attributes: ['id_cliente'],
            where: factura.complemento && factura.complemento !== '' ? {
                tipo_documento: factura.codigoTipoDocumentoIdentidad.toString(),
                complemento_visible: true,
                numero_documento: factura.numeroDocumento.toString(),
                complemento: factura.complemento
            } : {
              tipo_documento: factura.codigoTipoDocumentoIdentidad.toString(),
              complemento_visible: false,
              numero_documento: factura.numeroDocumento.toString()
          },
            transaction: t
        });
        if (!clienteRes) {
            clienteRes = await models.cliente.create(factura.complemento && factura.complemento !== '' ? {
                tipo_documento: factura.codigoTipoDocumentoIdentidad.toString(),
                complemento_visible: true,
                numero_documento: factura.numeroDocumento.toString(),
                complemento: factura.complemento,
                razon_social: factura.nombreRazonSocial,
                _usuario_creacion: factura.audit_usuario.usuario
            } : {
                tipo_documento: factura.codigoTipoDocumentoIdentidad.toString(),
                complemento_visible: false,
                numero_documento: factura.numeroDocumento.toString(),
                complemento: undefined,
                razon_social: factura.nombreRazonSocial,
                _usuario_creacion: factura.audit_usuario.usuario
            }, {
                transaction: t,
            });
        }
        return clienteRes.id_cliente;
    }

    //FUNCIONES RECUPERADAS
    async function editarCliente(idCliente,datos,usuario, t){
        return await models.cliente.update({
            razon_social: datos.nombreRazonSocial.toUpperCase(),
            numero_documento:datos.numeroDocumento,
            tipo_documento:datos.codigoTipoDocumentoIdentidad,
            complemento: (datos.complemento && datos.complemento !== '' )? datos.complemento.toUpperCase() : null,
            complemento_visible: (datos.complemento) ? true : false,
            fecha_nacimiento: datos.fechaNacimiento,
            estado: datos.estado,
            //correo: datos.correo,
            _usuario_modificacion:usuario
        }, {
            where: {
                id_cliente: idCliente
            },
            transaction: t
        });
    }

    async function put(idCliente, tipoDocumento, numeroDocumento, complemento, razonSocial, t) {
        return await models.cliente.update({
            tipo_documento: tipoDocumento,
            numero_documento: numeroDocumento,
            complemento: complemento && complemento !== '' ? complemento.toUpperCase() : null,
            complemento_visible: complemento && complemento !== '' ? true : false,
            razon_social: razonSocial
        }, {
            where: {
                id_cliente: idCliente
            },
            transaccion: t
        })
    }

    async function listar(req, t) {
      //var nro = parseInt(req.query.buscarNroDoc);
      const options = { }

      //filtro por ESTADO
      if(req.query.buscarEstado){
        options.estado= {
          [Op.like]: req.query.buscarEstado
        }
      }
      //filtro por tipo de NRO de factura
      if(req.query.buscarNroDoc){
        options.numero_documento ={
          [Op.iLike]: '%'+req.query.buscarNroDoc+'%'
        }
      }
      // filtro por CLIENTE
      if(req.query.buscarClientes){
        options.razon_social={
          [Op.iLike]: '%'+req.query.buscarClientes+'%'
        };
      }

      let limit = req.query.limit;   // numero de respuestas por pagina
      let page = req.params.page;
      let offset = limit * (page - 1);
       return models.cliente.findAndCountAll({
            attributes: ['id_cliente', 'numero_documento', 'tipo_documento','razon_social','estado', 'complemento', 'complemento_visible'],
            where: options,
            limit: limit,
            offset: offset,
            order: [['razon_social', 'ASC']]
        },{
            transaccion: t
        }).then(function (data) {
           return data;
        }).catch(e => {
           throw e;
        });
    }

    async function buscarCliente(id, t){
      return await models.cliente.findByPk(id,{transaccion: t}).then(resp =>{
        return resp.toJSON();
      });
    }

    async function buscaClienteCI(ci, t){
      return await models.cliente.findOne({
        where:{
          numero_documento: {
            [Op.like]: ci
          }
        },
        transaccion: t
      }).then(resp=>{
        if (resp != null) {
          return resp.toJSON();
        } else {
          return ;
        }
      }).catch(err=>{
        throw err;
      })
    }

    async function buscaClienteCIC(ci, complemento, tipoDoc, t){
      if(!complemento){
        complemento = null
      }
      var options={
        numero_documento: {
          [Op.like]: ci
        },
        complemento: {
          [Op.eq]: complemento
        },
        estado: 'ACTIVO'
      } 
      if(tipoDoc != 0){
        options.tipo_documento = {
          [Op.eq]: tipoDoc
        }
      }
      return await models.cliente.findOne({
        where:options,
        transaccion: t,
      }).then(resp=>{
        if (resp != null) {
          return resp.toJSON();
        } else {
          return ;
        }
      }).catch(err=>{
        throw err;
      })
    }

    return {
        getCodigoCliente,
        editarCliente,
        put,
        listar,
        buscarCliente,
        buscaClienteCI,
        buscaClienteCIC,
    };
};
