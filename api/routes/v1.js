// Express
const express = require('express');
const router = express.Router();
const app = express();
const color = require('config/ansi');

// Search
const searchController = require('v1/controllers/search');

// Import v1 Routes
const v1UserRoute = require('v1/routes/user');
const v1StatisticsRoute = require('v1/routes/statistics')

// Use v1 User Routes
try {
    router.use('/user', v1UserRoute);
    router.use('/statistics', v1StatisticsRoute);
} catch (error) { console.error(`${color.red}Error using v1 User routes\n${color.reset}`, error)}

// Search
try { 
    router.get("/search", searchController)
} catch (error) { console.error("\nError adding search route:\n", error)}

// Export
module.exports = router;