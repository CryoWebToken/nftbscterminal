const express = require('express');
require('dotenv').config()
const port = process.env.PORT || 2200;
const app = express();
const path = require('path');
const apiResponse = require("./Service/apiResponse");
const routes = require("./Service/routes");
const cors = require('cors');
const cron = require('node-cron');

//applying cors only on localhost
const corsOptions = {
    origin: ['http://localhost:2200', 'http://localhost:3000', 'http://localhost:8080', 'https://www.nftonbsc.com'],
    methods: "GET,POST",
    allowedHeaders:
        "Access-Control-Allow-Headers,Access-Control-Allow-Origin,Access-Control-Request-Method,Access-Control-Request-Headers,Origin,Cache-Control,Content-Type,X-Token,X-Refresh-Token",
    credentials: true, preflightContinue: false,
    optionsSuccessStatus: 204
};
app.use(cors(corsOptions));

// routing APIs
app.use('/api', routes);

//serving webpage files
app.use(express.json());
app.use(express.static('Client/build'));
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '/Client/build/', 'index.html'), function (err) {
        if (err) {
            apiResponse.notFoundResponse(res, "404 Page not found")
        }
    });
});

// throw 404 if URL not found
app.all("*", function (req, res) {
    return apiResponse.notFoundResponse(res, "404 Page not found");
});

// start server listen and port number
app.listen(port, () => {
    console.log('Server started! At http://localhost:' + port);
});

// main code
(async function main() {

    // init DB
    const { dbInitialize } = require('./Database/database');
    await dbInitialize();
    console.log("Database connected");

    // fetch nft IDs from collections
    const { fetchCollections } = require('./Database/dbQuery');
    cron.schedule('0 * * * *', () => { // every hour at minute 0
        fetchCollections()
    });

    // fetch nfts metadata
    const { fetchNftids } = require('./Database/dbQuery');
    fetchNftids();

    // fetch nft transactions
    const { fetchTransactions } = require('./Database/dbQuery');
    fetchTransactions();

    // update collections data
    const { collectionData } = require('./Database/dbQuery');
    cron.schedule('*/30 * * * *', () => { // every 30th minute
        collectionData();
    });

    // update cRich List
    const { richListQuery } = require('./Service/richList');
    cron.schedule('0 */6 * * *', () => { // At minute 0 past every 6th hour
        richListQuery();
    });
})();