const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

module.exports = (app) => {
    const database = app.config.database;

    const sequelize = new Sequelize(
        database.database,
        database.username,
        database.password,
        database.options,
    );

    const db = {
        sequelize,
        models: {},
    };

    const dirModels = path.join(__dirname, '../models');
    const list = fs.readdirSync(dirModels);
    for (let i = 0; i < list.length; i++) {
        const dir = list[i];
        if (fs.statSync(`${dirModels}/${dir}`).isDirectory()) {
            const subDirModels = path.join(dirModels, dir);
            const list2 = fs.readdirSync(subDirModels);
            for (let j = 0; j < list2.lenght; j++) {
                const file = list2[j];
                const pathFile = path.join(subDirModels, file);
                const model = require(pathFile)(sequelize, Sequelize.DataTypes);
                db.models[model.name] = model;
            }
        } else {
            console.log(`-------------------- ${dir} --------------------`);
            const pathFile = path.join(dirModels, dir);
            const model = require(pathFile)(sequelize, Sequelize.DataTypes);
            db.models[model.name] = model;
        }
    }

    console.log('cargando asociaciones....');
    Object.keys(db.models).forEach((key) => {
        console.log(`---->${key + db.models[key]}`);
        if (db.models[key].associate !== undefined) {
            db.models[key].associate(db.models);
        }
    });

    db.sequelize.sync().then(result => {
        console.log("------------BASE DE DATOS CREADA--------------");
        if (process.env.FORCE || process.env.CREATE) {
            process.exit(0);
        } else {
            console.log(`Iniciando servidor en el puerto ${app.get('port')}`);
        }
    }).catch(error => {
        console.log(error);
        process.exit(0);
    });

    return db;
};

