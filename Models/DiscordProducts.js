const { DataTypes } = require("sequelize");
const sequelize = require("../database"); // Ahorita te explico esto

const DiscordProduct = sequelize.define("discord_products", {
    messageId: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    channelId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: DataTypes.TEXT,

    images: {
        type: DataTypes.JSON
    },

    price: DataTypes.INTEGER,

    shopifyProductId: {
        type: DataTypes.STRING
    },

    status: {
        type: DataTypes.ENUM("disponible", "vendido"),
        defaultValue: "disponible"
    },

    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE

}, {
    timestamps: false
});

module.exports = DiscordProduct;
