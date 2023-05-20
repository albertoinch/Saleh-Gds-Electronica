const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = (query, where, include, t) => {
    const res = {};
    if (include) {
        res.include = include;
    }
    if (query.order) {
        res.order = [];
        for (let i = 0; i < query.order.length; i++) {
            if (query.columns[parseInt(query.order[i].column)].orderable == 'true') {
                const column = query.columns[parseInt(query.order[i].column)].data.split('.');
                if (column.length > 1) {
                    res.include.map(t => {
                        if (t.as == column[0]) {
                            if (!t.order) {
                                t.order = [];
                            }
                            t.order.push([column[1], query.order[i].dir]);
                        }
                        return t;
                    });
                } else {
                    res.order.push([column[0], query.order[i].dir]);
                }
            }
        }
    }
    if (query.columns) {
        const where = {
            [Op.and]: []
        };
        for (let i = 0; i < query.columns.length; i++) {
            if (query.columns[i].search.value != '') {
                const column = query.columns[i].data.split('.');
                if (column.length > 1) {
                    res.include.map(t => {
                        if (t.as == column[0]) {
                            if (!t.where) {
                                t.where = {
                                    [Op.and]: []
                                };
                            }
                            t.where[Op.and].push({
                                [column[1]]: {
                                    [Op.iLike]: `${query.columns[i].search.value}%`
                                }
                            });
                        }
                        return t;
                    });
                } else {
                    if (column[0].indexOf('->') > 0) {
                        where[Op.and].push(Sequelize.literal(`${column[0]} = '${query.columns[i].search.value}'`));
                    } else if (query.columns[i].search.like) {
                        where[Op.and].push({
                            [column[0]]: {
                                [Op.iLike]: `${query.columns[i].search.value}%`
                            }
                        });
                    } else if (query.columns[i].search.value instanceof Date) {
                        where[Op.and].push({
                            [column[0]]: {
                                [Op.gte]: query.columns[i].search.value,
                                [Op.lte]: query.columns[i].search.value2
                            }
                        });
                    } else if (query.columns[i].search.value == parseInt(query.columns[i].search.value)) {
                        where[Op.and].push({
                            [column[0]]: parseInt(query.columns[i].search.value)
                        });
                    } else {
                        where[Op.and].push({
                            [column[0]]: {
                                [Op.iLike]: `${query.columns[i].search.value}%`
                            }
                        });
                    }
                }
            }
        }
        if (where[Op.and].length) {
            res.where = where;
        }
    }
    if (where) {
        if (res.where) {
            res.where[Op.and].push(where);
        } else {
            res.where = where;
        }
    }
    if (query.length) {
        res.limit = query.length;
        res.offset = query.start;
    }
    if (t) {
        res.transaction = t
    }
    return res;
};