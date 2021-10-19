const express = require('express');
const apiResponse = require("./apiResponse");
const router = express.Router();

// health check
router.get('/', async (req, res) => {
    const data = {
        uptime: process.uptime(),
        timestamp: Date.now()
    }
    try {
        res.send(healthcheck);
        apiResponse.successResponseWithData(res, 'OK', data);

    } catch (e) {
        healthcheck.message = e;
        apiResponse.ErrorResponse(res, e);
    }
});
module.exports = router;
