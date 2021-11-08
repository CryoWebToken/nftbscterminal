const mysql = require("mysql2/promise");
const { Sequelize } = require('sequelize');

const host = process.env.DB_HOST; // i use "localhost"
const user = process.env.DB_USER; //mysql username
const password = process.env.DB_PASS; //mysql password
const database = process.env.DB_DATABASE; //database name

// create sequelize instance
const sequelize = new Sequelize(database, user, password, {
    dialect: 'mysql', host: host,
    pool: {
        max: 5,
        min: 0,
        acquire: 60000,
        idle: 10000
    }
});

async function dbInitialize() {
    // create database
    const connection = await mysql.createConnection({ host, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // create main tables
    const { Nft, Collections, Transaction, Log_event, Collections_data, CollectionRequest, RichList } = require('./models');
    await Nft.sync({ alter: true });
    await Collections.sync({ alter: true });
    await Transaction.sync({ alter: true });
    await Log_event.sync({ alter: true });
    await Collections_data.sync({ alter: true });
    await CollectionRequest.sync({ alter: true });
    await RichList.sync({ alter: true });

    // create initial collections in conllections table
    const allCollections = await Collections.findAll({ logging: false, raw: true });
    if (allCollections.length === 0) {
        await Collections.create({
            name: "Pancake Squad",
            banner: "https://static-nft.pancakeswap.com/mainnet/0x0a8901b0E25DEb55A87524f0cC164E9644020EBA/banner-lg.png",
            icon: "https://static-nft.pancakeswap.com/mainnet/0x0a8901b0E25DEb55A87524f0cC164E9644020EBA/avatar.png",
            email: "N/A",
            address: "0x0a8901b0E25DEb55A87524f0cC164E9644020EBA",
            url: "https://pancakeswap.finance/nfts/collections/0x0a8901b0E25DEb55A87524f0cC164E9644020EBA",
            twitter: "N/A",
            discord: "N/A",
            desc: "10,000 unique, randomly-generated PancakeSwap NFTs from the mind of Chef Cecy Meade. Join the squad.",
        }, { logging: false });
    }
}

module.exports = { dbInitialize, sequelize };