const { Sequelize } = require('sequelize'); 

const sequelize = new Sequelize('expense-table', 'root', 'arushi@mysql', {
    host: 'localhost',
    dialect: 'mysql', 
});

module.exports = sequelize;
