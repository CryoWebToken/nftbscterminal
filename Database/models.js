const Sequelize = require('sequelize')
const { sequelize } = require('./database')

const Collections = sequelize.define('collection', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: { type: Sequelize.STRING, allowNull: false },
    banner: { type: Sequelize.TEXT, allowNull: true },
    icon: { type: Sequelize.TEXT, allowNull: true },
    email: { type: Sequelize.STRING, allowNull: false },
    address: { type: Sequelize.TEXT, allowNull: false },
    url: { type: Sequelize.TEXT, allowNull: true },
    twitter: { type: Sequelize.STRING, allowNull: true },
    discord: { type: Sequelize.STRING, allowNull: true },
    desc: { type: Sequelize.TEXT, allowNull: false },
    createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
}, {
    logging: false
});

const Nft = sequelize.define("nft", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nftID: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false },
    contract: { type: Sequelize.TEXT, allowNull: false },
    name: { type: Sequelize.TEXT, allowNull: true },
    desc: { type: Sequelize.TEXT, allowNull: true },
    url: { type: Sequelize.TEXT, allowNull: true },
    image: { type: Sequelize.TEXT, allowNull: true },
    image_256: { type: Sequelize.TEXT, allowNull: true },
    owner: { type: Sequelize.TEXT, allowNull: true },
    burned: { type: Sequelize.BOOLEAN, allowNull: true },
    attr: { type: Sequelize.TEXT, allowNull: true },
    createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
}, {
    logging: false
});

const Transaction = sequelize.define("transaction", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    tx_hash: { type: Sequelize.TEXT, allowNull: false },
    contract: { type: Sequelize.TEXT, allowNull: false },
    nftId: { type: Sequelize.INTEGER.UNSIGNED, allowNull: true },
    block_signed_at: { type: Sequelize.DATE, allowNull: false },
    block_height: { type: Sequelize.INTEGER.UNSIGNED, allowNull: true },
    from: { type: Sequelize.TEXT, allowNull: true },
    to: { type: Sequelize.TEXT, allowNull: true },
    val: { type: Sequelize.DOUBLE, allowNull: true },
    fee: { type: Sequelize.DOUBLE, allowNull: true },
    createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
}, {
    logging: false
});

const Log_event = sequelize.define("log_event", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    tx_hash: { type: Sequelize.TEXT, allowNull: false },
    contract: { type: Sequelize.TEXT, allowNull: false },
    nftId: { type: Sequelize.INTEGER.UNSIGNED, allowNull: true },
    block_signed_at: { type: Sequelize.DATE, allowNull: false },
    type: { type: Sequelize.TEXT, allowNull: true },
    val1: { type: Sequelize.TEXT, allowNull: true },
    val2: { type: Sequelize.TEXT, allowNull: true },
    createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
}, {
    logging: false
});

const Collections_data = sequelize.define("collection_data", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    address: { type: Sequelize.TEXT, allowNull: false },
    name: { type: Sequelize.TEXT, allowNull: false },
    icon: { type: Sequelize.TEXT, allowNull: true },
    volume: { type: Sequelize.DOUBLE, allowNull: true },
    sales: { type: Sequelize.DOUBLE, allowNull: true },
    users: { type: Sequelize.DOUBLE, allowNull: true },
    volume7d: { type: Sequelize.DOUBLE, allowNull: true },
    sales7d: { type: Sequelize.DOUBLE, allowNull: true },
    average: { type: Sequelize.DOUBLE, allowNull: true },
    items: { type: Sequelize.DOUBLE, allowNull: true },
    createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
}, {
    logging: false
});

const CollectionRequest = sequelize.define('collectionRequest', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: { type: Sequelize.STRING, allowNull: false },
    banner: { type: Sequelize.TEXT, allowNull: true },
    icon: { type: Sequelize.TEXT, allowNull: true },
    email: { type: Sequelize.STRING, allowNull: false },
    address: { type: Sequelize.TEXT, allowNull: false },
    url: { type: Sequelize.TEXT, allowNull: true },
    twitter: { type: Sequelize.STRING, allowNull: true },
    discord: { type: Sequelize.STRING, allowNull: true },
    desc: { type: Sequelize.TEXT, allowNull: false },
    createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
}, {
    logging: false
});

const RichList = sequelize.define('richList', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    address: { type: Sequelize.TEXT, allowNull: false },
    owners: { type: Sequelize.TEXT, allowNull: true },
    items: { type: Sequelize.STRING, allowNull: true },
    amount: { type: Sequelize.STRING, allowNull: true },
    total: { type: Sequelize.DOUBLE, allowNull: false },
    value: { type: Sequelize.DOUBLE, allowNull: false },
    createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
}, {
    logging: false
});

module.exports = { Nft, Collections, Transaction, Log_event, Collections_data, CollectionRequest, RichList }
