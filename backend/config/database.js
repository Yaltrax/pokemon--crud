const { Sequelize } = require("sequelize");

// Configurar la conexión a MySQL
const sequelize = new Sequelize("pokemon_db", "admin", "admin123", {
    host: "localhost",
    dialect: "mysql",
    logging: false
});

module.exports = sequelize;


