// Importing necessary modules
const express = require("express");         // Express framework for handling HTTP requests
const cors = require("cors");               // CORS middleware for handling cross-origin requests
const dbConnection = require("./config");   // MySQL database configuration module

// Create an instance of Express application
var app = express();

// Middleware setup
app.use(cors());                                    // Enable CORS for all routes
app.use(express.json());                            // Parse JSON payloads in incoming requests
app.use(express.urlencoded({ extended: true}));     // Parse URL-encoded payloads 

// RESTful API Endpoint: GET

// RESTful API Endpoint: POST

// RESTful API Endpoint: PUT

// RESTful API Endpoint: DELETE


// Server listening on port 3000
app.listen(3000, () => {
    console.log("Express server is running and listening.");
});