/*
 * Limovia API

 * This script initializes and starts the Limovia API server.
*/

// Set up module aliases
require('dotenv').config();
require('module-alias/register');

// Import modules
const express = require('express');
const cors = require('cors');
const consoleStamp = require('console-stamp');
const color = require('config/ansi');

// Initialize Express app
const app = express();
const port = process.env.PORT;

// Configure console logging format
consoleStamp(console, { format: `${color.magenta}:date(HH:MM:ss)${color.reset}` });

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable Cross-Origin Resource Sharing
const corsConfig = require('config/cors');
app.use(cors(corsConfig));

// Import API routes
const v1Routes = require('routes/v1');

// API routes
app.use('/v1', v1Routes);

// Start API server
app.listen(port, () => {
    console.log(`Limovia API running on port ${port}`);
});
