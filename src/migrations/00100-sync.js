'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        const sql = (
        `CREATE OR REPLACE FUNCTION contribuyente_insert()
        RETURNS trigger AS $$
        BEGIN
            INSERT INTO sync
            SELECT new.id_contribuyente, codigo, ''
            FROM agrupador;
            RETURN new;
        END;
        $$ LANGUAGE plpgsql;

        CREATE TRIGGER contribuyente_insert
        AFTER INSERT ON contribuyente
        FOR EACH ROW
        EXECUTE PROCEDURE contribuyente_insert();

        CREATE OR REPLACE FUNCTION contribuyente_delete()
        RETURNS trigger AS $$
        BEGIN
            DELETE FROM sync
            WHERE fid_contribuyente = old.id_contribuyente;
            RETURN old;
        END;
        $$ LANGUAGE plpgsql;

        CREATE TRIGGER contribuyente_delete
        AFTER DELETE ON contribuyente
        FOR EACH ROW
        EXECUTE PROCEDURE contribuyente_delete();`
        );

        return queryInterface.sequelize.query(sql);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query('');
    }
};
