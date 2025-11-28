const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    "discord_posts",      // Nombre de la base
    "root",               // Usuario
    "310704",        // CONTRASEÑA
    {
        host: "localhost",
        dialect: "mysql",
        logging: false,
    }
);

module.exports = sequelize;