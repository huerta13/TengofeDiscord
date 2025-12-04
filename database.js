const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("discord_shop", "root", "310704", {
    host: "localhost",
    dialect: "mysql",
    logging: false
});

module.exports = sequelize;
