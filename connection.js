const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('eprops', 'propmanagement', 'propmanagement!', {
    host: 'localhost',
    dialect: 'mysql',       /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});

module.exports = sequelize;