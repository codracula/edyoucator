// Import the MySQL module
const mysql = require("mysql");

// Define the configuration for connecting to the MySQL database
const connection = mysql.createConnection ({
    host: "localhost",
    port: 3306,
    user: "testuser",
    password: "mypassword",
    database: "edyoucator",
    debug: false // Connection debugging mode is OFF
});

// Establish the connection to the database
connection.connect(error => {
    // Unsuccessful : handle any errors that might occur during connection
    if (error) {
        console.error('There was an error connecting to the database: ', error.stack);
        return;
    }
    // Successful : output on the screen a message that connection was successful
    console.log('Backend is now connected to: ' + connection.config.database + '.');
});

// Export the connection for use in other parts of the application
module.exports = connection;