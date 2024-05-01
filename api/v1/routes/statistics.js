/*
    /v1/routes/statistics

    All of the statistics
*/ 

// Express
const express               = require('express');
const router                = express.Router();
const color                 = require('config/ansi');

// Controllers
const userStatsController   = require('v1/controllers/statistics/users.js')

try {
    router.get('/users/get', userStatsController.GET)
} catch (error) { console.error("\nError adding auth routes:\n", error)}

// Export
module.exports = router;