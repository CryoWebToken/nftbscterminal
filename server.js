const express = require('express');
require('dotenv').config()
const port = process.env.PORT || 2200;
const app = express();
const apiResponse = require("./Service/apiResponse");
const routes = require("./Service/routes");
const helmet = require("helmet");
const cors = require('cors');

// securing the app with HTTP headers
app.use(helmet());

// cors secure domains
const allowedDomains = [`http://localhost:${port}`];
app.use(cors({
    origin: function (origin, callback) {
        // bypass the requests with no origin (like curl requests, mobile apps, etc )
        if (!origin) return callback(null, true);

        if (allowedDomains.indexOf(origin) === -1) {
            const msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

// routing APIs
app.use('/', routes);

// throw 404 if URL not found
app.all("*", function (req, res) {
    return apiResponse.notFoundResponse(res, "404 Page not found");
});

// start server listen and port number
app.listen(port, () => {
    console.log('Server started! At http://localhost:' + port);
});