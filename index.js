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

// Algebra questions 
// RESTful API Endpoint: GET
// Retrieve all the algebra questions from the database
// URI http://localhost:port/algebra_questions
app.get('/algebra_questions', (req, res) => {
    const sqlQuery = 'SELECT * FROM algebra_questions';
    dbConnection.query (sqlQuery, (error, result) => {
        if (error) {
            return res.status(400).json({error: 'Error in the SQL Statement. Please check.'});
        }

        return res.status(200).json(result);
    });
});

// RESTful API Endpoint: POST
// Creates a new algebra question in the database
// URI http://localhost:port/algebra_questions
app.post('/algebra_questions', (req, res) => {
    // data from the thunder client
    const {question, option_a, option_b, option_c, option_d, answer} = req.body;

    // Using INSERT query
    const sqlInsert = `INSERT INTO algebra_questions (question, option_a, option_b, option_c, option_d, answer) VALUES (?, ?, ?, ?, ?, ?)`;
    dbConnection.query(sqlInsert, [question, option_a, option_b, option_c, option_d, answer], (error, result) => {
        if (error) {
            return res.status(400).json({error: 'Error in the SQL statement. Please check.'});
        }
        return res.status(200).json({message: 'Added new question successfully!'});
    });
});

// RESTful API Endpoint: PUT
// Updates the existing algebra question
// URI http://localhost:port/algebra_questions/:id
app.put('/algebra_questions/:id', (req, res) => {
    const id = req.params.id;

    const {question, option_a, option_b, option_c, option_d, answer} = req.body;

    const sqlUpdate = `UPDATE algebra_questions SET question = ?, option_a = ?, option_b = ?, option_c = ?, option_d = ?, answer = ? WHERE id = ?`;

    dbConnection.query(sqlUpdate, [question, option_a, option_b, option_c, option_d, answer, id], (error, result) => {
        if (error) {
            return res.status(400).json({error: 'Error in SQL query. Please check.'});
        }
        return res.status(200).json({message: 'Question updated successfully!'});
    });
});

// RESTful API Endpoint: DELETE
// Deletes a existing algebra question by id number
// URI http://localhost:port/algebra_questions/:id
app.delete('/algebra_questions/:id', (req, res) => {
    const id = req.params.id;

    const sqlDelete = 'DELETE FROM algebra_questions WHERE id = ?';

    dbConnection.query(sqlDelete, [id], (error, result) => {
        if (error) {
            return res.status(400).json({error: 'Error in SQL query. Please check.'});
        }

        return res.status(200).json({message: 'Question with Id ${id} deleted successfully!'});
    });
});

// Chemestry quetions
// RESTful API Endpoint: GET
// Retrieve all the algebra questions from the database
// URI http://localhost:port/algebra_questions
app.get('/chemistry_questions', (req, res) => {
    const sqlQuery = 'SELECT * FROM chemistry_questions';
    dbConnection.query (sqlQuery, (error, result) => {
        if (error) {
            return res.status(400).json({error: 'Error in the SQL Statement. Please check.'});
        }

        return res.status(200).json(result);
    });
});

// RESTful API Endpoint: POST
// Creates a new algebra question in the database
// URI http://localhost:port/algebra_questions
app.post('/chemistry_questions', (req, res) => {
    // data from the thunder client
    const {question, option_a, option_b, option_c, option_d, answer} = req.body;

    // Using INSERT query
    const sqlInsert = `INSERT INTO chemistry_questions (question, option_a, option_b, option_c, option_d, answer) VALUES (?, ?, ?, ?, ?, ?)`;
    dbConnection.query(sqlInsert, [question, option_a, option_b, option_c, option_d, answer], (error, result) => {
        if (error) {
            return res.status(400).json({error: 'Error in the SQL statement. Please check.'});
        }
        return res.status(200).json({message: 'Added new question successfully!'});
    });
});

// RESTful API Endpoint: PUT
// Updates the existing algebra question
// URI http://localhost:port/algebra_questions/:id
app.put('/chemistry_questions/:id', (req, res) => {
    const id = req.params.id;

    const {question, option_a, option_b, option_c, option_d, answer} = req.body;

    const sqlUpdate = `UPDATE chemistry_questions SET question = ?, option_a = ?, option_b = ?, option_c = ?, option_d = ?, answer = ? WHERE id = ?`;

    dbConnection.query(sqlUpdate, [question, option_a, option_b, option_c, option_d, answer, id], (error, result) => {
        if (error) {
            return res.status(400).json({error: 'Error in SQL query. Please check.'});
        }
        return res.status(200).json({message: 'Question updated successfully!'});
    });
});

// RESTful API Endpoint: DELETE
// Deletes a existing algebra question by id number
// URI http://localhost:port/algebra_questions/:id
app.delete('/chemistry_questions/:id', (req, res) => {
    const id = req.params.id;

    const sqlDelete = 'DELETE FROM chemistry_questions WHERE id = ?';

    dbConnection.query(sqlDelete, [id], (error, result) => {
        if (error) {
            return res.status(400).json({error: 'Error in SQL query. Please check.'});
        }

        return res.status(200).json({message: 'Question with Id ${id} deleted successfully!'});
    });
});

// Server listening on port 3000
app.listen(3000, () => {
    console.log("Express server is running and listening.");
});