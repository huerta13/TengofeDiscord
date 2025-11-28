const { DataTypes } = require("sequelize");
const sequelize = require("../Database/database");
const DiscordPost = require("./DiscordPost");

const ShopifyProduct = sequelize.define("ShopifyProduct", {
    product_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    discord_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
            model: DiscordPost,
            key: "id"
        }
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    URL_handle: {
        type: DataTypes.STRING(200),
        allowNull: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    vendor: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    product_category: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    type: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    published_online: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    status: {
        type: DataTypes.STRING(30),
        allowNull: true
    },
    option1_value: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    price: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    charge_tax: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    requires_shipping: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    product_image_URL: {
        type: DataTypes.STRING(300),
        allowNull: true
    }
}, {
    tableName: "shopify_products",
    timestamps: false
});

module.exports = ShopifyProduct;
