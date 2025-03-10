const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Pokemon = sequelize.define("Pokemon", {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nivel: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    habilidades: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    peso: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    altura: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    genero: {
        type: DataTypes.ENUM("Macho", "Hembra", "Desconocido"),
        allowNull: false
    },
    region: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Pokemon;

