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


// Admins
// RESTful API Endpoint: GET /admins
// Retrieve all admins from the database
// URI http://localhost:port/admins
app.get('/admins', (req, res) => {
    const sqlQuery = 'SELECT * FROM admins';
    dbConnection.query(sqlQuery, (error, result) => {
        if (error) {
            return res.status(400).json({error: 'Error in the SQL statement. Please check.'});
        }
        return res.status(200).json(result);
    });
});

// RESTful API Endpoint: GET /admins/:userid
// Retrieve admin status for a specific user
app.get('/admins/:userid', (req, res) => {
    const userid = req.params.userid;
    const sqlQuery = 'SELECT * FROM admins WHERE userid = ?';
    dbConnection.query(sqlQuery, [userid], (error, result) => {
        if (error) {
            return res.status(400).json({error: 'Error in the SQL Statement. Please check.'});
        }
        return res.status(200).json(result);
    });
});

// RESTful API Endpoint: POST /admins
// Adds a new admin to the database
app.post('/admins', (req, res) => {
    const { userid, admin } = req.body;
    const sqlInsert = `INSERT INTO admins (userid, admin) VALUES (?, ?)`;
    dbConnection.query(sqlInsert, [userid, admin], (error, result) => {
        if (error) {
            return res.status(400).json({error: 'Error in the SQL statement. Please check.'});
        }
        return res.status(200).json({message: 'New admin added successfully!'});
    });
});

// RESTful API Endpoint: PUT /admins/:userid
// Updates an existing admin
app.put('/admins/:userid', (req, res) => {
    const userid = req.params.userid;
    const { admin } = req.body;
    const sqlUpdate = `UPDATE admins SET admin = ? WHERE userid = ?`;
    dbConnection.query(sqlUpdate, [admin, userid], (error, result) => {
        if (error) {
            return res.status(400).json({error: 'Error in SQL query. Please check.'});
        }
        return res.status(200).json({message: 'Admin updated successfully!'});
    });
});

// RESTful API Endpoint: DELETE /admins/:userid
// Deletes an existing admin
app.delete('/admins/:userid', (req, res) => {
    const userid = req.params.userid;
    const sqlDelete = 'DELETE FROM admins WHERE userid = ?';
    dbConnection.query(sqlDelete, [userid], (error, result) => {
        if (error) {
            return res.status(400).json({error: 'Error in SQL query. Please check.'});
        }
        return res.status(200).json({message: `Admin with userid ${userid} deleted successfully!`});
    });
});

// Answers
// RESTful API Endpoint: GET /answers
// Retrieve all answers
app.get('/answers', (req, res) => {
    const sqlQuery = 'SELECT * FROM answers';
    dbConnection.query(sqlQuery, (error, result) => {
        if (error) {
            return res.status(400).json({ error: 'Error in SQL query. Please check.' });
        }
        return res.status(200).json(result);
    });
});

// RESTful API Endpoint: GET /answers/:quizid
// Retrieve answers for a specific quiz
app.get('/answers/:quizid', (req, res) => {
    const quizid = req.params.quizid;
    const sqlQuery = 'SELECT * FROM answers WHERE quizid = ?';
    dbConnection.query(sqlQuery, [quizid], (error, result) => {
        if (error) {
            return res.status(400).json({ error: 'Error in SQL query. Please check.' });
        }
        return res.status(200).json(result);
    });
});

// RESTful API Endpoint: POST /answers
// Add a new answer
app.post('/answers', (req, res) => {
    const { quizid, questionnumber, question, answer } = req.body;
    const sqlInsert = 'INSERT INTO answers (quizid, questionnumber, question, answer) VALUES (?, ?, ?, ?)';
    dbConnection.query(sqlInsert, [quizid, questionnumber, question, answer], (error, result) => {
        if (error) {
            return res.status(400).json({ error: 'Error in SQL statement. Please check.' });
        }
        return res.status(200).json({ message: 'New answer added successfully!' });
    });
});

// RESTful API Endpoint: PUT /answers/:quizid/:questionnumber
// Update an existing answer
app.put('/answers/:quizid/:questionnumber', (req, res) => {
    const quizid = req.params.quizid;
    const questionnumber = req.params.questionnumber;
    const { question, answer } = req.body;
    const sqlUpdate = 'UPDATE answers SET question = ?, answer = ? WHERE quizid = ? AND questionnumber = ?';
    dbConnection.query(sqlUpdate, [question, answer, quizid, questionnumber], (error, result) => {
        if (error) {
            return res.status(400).json({ error: 'Error in SQL query. Please check.' });
        }
        return res.status(200).json({ message: 'Answer updated successfully!' });
    });
});

// RESTful API Endpoint: DELETE /answers/:quizid/:questionnumber
// Delete an answer
app.delete('/answers/:quizid/:questionnumber', (req, res) => {
    const quizid = req.params.quizid;
    const questionnumber = req.params.questionnumber;
    const sqlDelete = 'DELETE FROM answers WHERE quizid = ? AND questionnumber = ?';
    dbConnection.query(sqlDelete, [quizid, questionnumber], (error, result) => {
        if (error) {
            return res.status(400).json({ error: 'Error in SQL query. Please check.' });
        }
        return res.status(200).json({ message: `Answer for quiz ID ${quizid}, question number ${questionnumber} deleted successfully!` });
    });
});

// Authentication
// RESTful API Endpoint: GET /authentication/:userID
// Retrieve a user's authentication details
app.get('/authentication/:userID', (req, res) => {
    const userID = req.params.userID;
    const sqlQuery = 'SELECT * FROM authentication WHERE userID = ?';
    dbConnection.query(sqlQuery, [userID], (error, result) => {
        if (error) {
            return res.status(400).json({ error: 'Error in SQL query. Please check.' });
        }
        return res.status(200).json(result);
    });
});

// RESTful API Endpoint: POST /authentication
// Add a new user's authentication details
app.post('/authentication', (req, res) => {
    const { userID, password } = req.body;
    const sqlInsert = 'INSERT INTO authentication (userID, password) VALUES (?, ?)';
    dbConnection.query(sqlInsert, [userID, password], (error, result) => {
        if (error) {
            return res.status(400).json({ error: 'Error in SQL statement. Please check.' });
        }
        return res.status(200).json({ message: 'New user authentication added successfully!' });
    });
});

// RESTful API Endpoint: PUT /authentication/:userID
// Update an existing user's password
app.put('/authentication/:userID', (req, res) => {
    const userID = req.params.userID;
    const { password } = req.body;
    const sqlUpdate = 'UPDATE authentication SET password = ? WHERE userID = ?';
    dbConnection.query(sqlUpdate, [password, userID], (error, result) => {
        if (error) {
            return res.status(400).json({ error: 'Error in SQL query. Please check.' });
        }
        return res.status(200).json({ message: 'User password updated successfully!' });
    });
});

// RESTful API Endpoint: DELETE /authentication/:userID
// Delete a user's authentication details
app.delete('/authentication/:userID', (req, res) => {
    const userID = req.params.userID;
    const sqlDelete = 'DELETE FROM authentication WHERE userID = ?';
    dbConnection.query(sqlDelete, [userID], (error, result) => {
        if (error) {
            return res.status(400).json({ error: 'Error in SQL query. Please check.' });
        }
        return res.status(200).json({ message: `Authentication details for user ID ${userID} deleted successfully!` });
    });
});

// Classrooms
// RESTful API Endpoint: GET /classrooms
// Retrieve all classrooms
app.get('/classrooms', (req, res) => {
    const sqlQuery = 'SELECT * FROM classrooms';
    dbConnection.query(sqlQuery, (error, result) => {
        if (error) {
            return res.status(400).json({ error: 'Error in SQL query. Please check.' });
        }
        return res.status(200).json(result);
    });
});

// RESTful API Endpoint: POST /classrooms
// Create a new classroom
app.post('/classrooms', (req, res) => {
    const { moderatorid, quizid, quiztaker } = req.body;
    const sqlInsert = 'INSERT INTO classrooms (moderatorid, quizid, quiztaker) VALUES (?, ?, ?)';
    dbConnection.query(sqlInsert, [moderatorid, quizid, quiztaker], (error, result) => {
        if (error) {
            return res.status(400).json({ error: 'Error in SQL statement. Please check.' });
        }
        return res.status(200).json({ message: 'New classroom created successfully!' });
    });
});

// RESTful API Endpoint: PUT /classrooms/:id
// Update an existing classroom
app.put('/classrooms/:id', (req, res) => {
    const id = req.params.id;
    const { moderatorid, quizid, quiztaker } = req.body;
    const sqlUpdate = 'UPDATE classrooms SET moderatorid = ?, quizid = ?, quiztaker = ? WHERE id = ?';
    dbConnection.query(sqlUpdate, [moderatorid, quizid, quiztaker, id], (error, result) => {
        if (error) {
            return res.status(400).json({ error: 'Error in SQL query. Please check.' });
        }
        return res.status(200).json({ message: 'Classroom updated successfully!' });
    });
});

// RESTful API Endpoint: DELETE /classrooms/:id
// Delete a classroom
app.delete('/classrooms/:id', (req, res) => {
    const id = req.params.id;
    const sqlDelete = 'DELETE FROM classrooms WHERE id = ?';
    dbConnection.query(sqlDelete, [id], (error, result) => {
        if (error) {
            return res.status(400).json({ error: 'Error in SQL query. Please check.' });
        }
        return res.status(200).json({ message: `Classroom with ID ${id} deleted successfully!` });
    });
});

// QuizID
// RESTful API Endpoint: GET /quizid
// Retrieve all quizzes
app.get('/quizid', (req, res) => {
    const sqlQuery = 'SELECT * FROM quizid';
    dbConnection.query(sqlQuery, (error, result) => {
        if (error) {
            return res.status(400).json({ error: 'Error in SQL query. Please check.' });
        }
        return res.status(200).json(result);
    });
});

// RESTful API Endpoint: POST /quizid
// Create a new quiz
app.post('/quizid', (req, res) => {
    const { moderator, quizid, quizname } = req.body;
    const sqlInsert = 'INSERT INTO quizid (moderator, quizid, quizname) VALUES (?, ?, ?)';
    dbConnection.query(sqlInsert, [moderator, quizid, quizname], (error, result) => {
        if (error) {
            return res.status(400).json({ error: 'Error in SQL statement. Please check.' });
        }
        return res.status(200).json({ message: 'New quiz created successfully!' });
    });
});

// RESTful API Endpoint: PUT /quizid/:id
// Update an existing quiz
app.put('/quizid/:id', (req, res) => {
    const id = req.params.id;
    const { moderator, quizname } = req.body;
    const sqlUpdate = 'UPDATE quizid SET moderator = ?, quizname = ? WHERE quizid = ?';
    dbConnection.query(sqlUpdate, [moderator, quizname, id], (error, result) => {
        if (error) {
            return res.status(400).json({ error: 'Error in SQL query. Please check.' });
        }
        return res.status(200).json({ message: 'Quiz updated successfully!' });
    });
});

// RESTful API Endpoint: DELETE /quizid/:id
// Delete a quiz
app.delete('/quizid/:id', (req, res) => {
    const id = req.params.id;
    const sqlDelete = 'DELETE FROM quizid WHERE quizid = ?';
    dbConnection.query(sqlDelete, [id], (error, result) => {
        if (error) {
            return res.status(400).json({ error: 'Error in SQL query. Please check.' });
        }
        return res.status(200).json({ message: `Quiz with ID ${id} deleted successfully!` });
    });
});

// Quizzes
// RESTful API Endpoint: GET /quizzes
// Retrieve all quizzes
app.get('/quizzes', (req, res) => {
    const sqlQuery = 'SELECT * FROM quizzes';
    dbConnection.query(sqlQuery, (error, result) => {
        if (error) {
            return res.status(400).json({ error: 'Error in SQL query. Please check.' });
        }
        return res.status(200).json(result);
    });
});

// RESTful API Endpoint: POST /quizzes
// Create a new quiz
app.post('/quizzes', (req, res) => {
    const { quizname, totalquestion, questionnumber, question, choices } = req.body;
    const sqlInsert = 'INSERT INTO quizzes (quizname, totalquestion, questionnumber, question, choices) VALUES (?, ?, ?, ?, ?)';
    dbConnection.query(sqlInsert, [quizname, totalquestion, questionnumber, question, choices], (error, result) => {
        if (error) {
            return res.status(400).json({ error: 'Error in SQL statement. Please check.' });
        }
        return res.status(200).json({ message: 'New quiz created successfully!' });
    });
});

// RESTful API Endpoint: PUT /quizzes/:id
// Update an existing quiz
app.put('/quizzes/:id', (req, res) => {
    const id = req.params.id;
    const { quizname, totalquestion, questionnumber, question, choices } = req.body;
    const sqlUpdate = 'UPDATE quizzes SET quizname = ?, totalquestion = ?, questionnumber = ?, question = ?, choices = ? WHERE quizid = ?';
    dbConnection.query(sqlUpdate, [quizname, totalquestion, questionnumber, question, choices, id], (error, result) => {
        if (error) {
            return res.status(400).json({ error: 'Error in SQL query. Please check.' });
        }
        return res.status(200).json({ message: 'Quiz updated successfully!' });
    });
});

// RESTful API Endpoint: DELETE /quizzes/:id
// Delete a quiz
app.delete('/quizzes/:id', (req, res) => {
    const id = req.params.id;
    const sqlDelete = 'DELETE FROM quizzes WHERE quizid = ?';
    dbConnection.query(sqlDelete, [id], (error, result) => {
        if (error) {
            return res.status(400).json({ error: 'Error in SQL query. Please check.' });
        }
        return res.status(200).json({ message: `Quiz with ID ${id} deleted successfully!` });
    });
});

// Users
// RESTful API Endpoint: GET /users
// Retrieve all users
app.get('/users', (req, res) => {
    const sqlQuery = 'SELECT * FROM users';
    dbConnection.query(sqlQuery, (error, result) => {
        if (error) {
            return res.status(400).json({ error: 'Error in SQL query. Please check.' });
        }
        return res.status(200).json(result);
    });
});

// RESTful API Endpoint: POST /users
// Create a new user
app.post('/users', (req, res) => {
    const { userid, username, firstname, lastname, dateofbirth, email, city, state, country } = req.body;
    const sqlInsert = 'INSERT INTO users (userid, username, firstname, lastname, dateofbirth, email, city, state, country) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    dbConnection.query(sqlInsert, [userid, username, firstname, lastname, dateofbirth, email, city, state, country], (error, result) => {
        if (error) {
            return res.status(400).json({ error: 'Error in SQL statement. Please check.' });
        }
        return res.status(200).json({ message: 'New user created successfully!' });
    });
});

// RESTful API Endpoint: PUT /users/:id
// Update an existing user
app.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const { username, firstname, lastname, dateofbirth, email, city, state, country } = req.body;
    const sqlUpdate = 'UPDATE users SET username = ?, firstname = ?, lastname = ?, dateofbirth = ?, email = ?, city = ?, state = ?, country = ? WHERE userid = ?';
    dbConnection.query(sqlUpdate, [username, firstname, lastname, dateofbirth, email, city, state, country, id], (error, result) => {
        if (error) {
            return res.status(400).json({ error: 'Error in SQL query. Please check.' });
        }
        return res.status(200).json({ message: 'User updated successfully!' });
    });
});

// RESTful API Endpoint: DELETE /users/:id
// Delete a user
app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    const sqlDelete = 'DELETE FROM users WHERE userid = ?';
    dbConnection.query(sqlDelete, [id], (error, result) => {
        if (error) {
            return res.status(400).json({ error: 'Error in SQL query. Please check.' });
        }
        return res.status(200).json({ message: `User with ID ${id} deleted successfully!` });
    });
});

// User Responses
// RESTful API Endpoint: GET /user_responses
// Retrieve all user responses
app.get('/user_responses', (req, res) => {
    const sqlQuery = 'SELECT * FROM user_responses';
    dbConnection.query(sqlQuery, (error, result) => {
        if (error) {
            return res.status(400).json({ error: 'Error in SQL query. Please check.' });
        }
        return res.status(200).json(result);
    });
});

// RESTful API Endpoint: POST /user_responses
// Create a new user response
app.post('/user_responses', (req, res) => {
    const { user_id, question_id, selected_option } = req.body;
    const sqlInsert = 'INSERT INTO user_responses (user_id, question_id, selected_option) VALUES (?, ?, ?)';
    dbConnection.query(sqlInsert, [user_id, question_id, selected_option], (error, result) => {
        if (error) {
            return res.status(400).json({ error: 'Error in SQL statement. Please check.' });
        }
        return res.status(200).json({ message: 'New response recorded successfully!' });
    });
});

// RESTful API Endpoint: PUT /user_responses/:id
// Update an existing user response
app.put('/user_responses/:id', (req, res) => {
    const id = req.params.id;
    const { user_id, question_id, selected_option } = req.body;
    const sqlUpdate = 'UPDATE user_responses SET user_id = ?, question_id = ?, selected_option = ? WHERE response_id = ?';
    dbConnection.query(sqlUpdate, [user_id, question_id, selected_option, id], (error, result) => {
        if (error) {
            return res.status(400).json({ error: 'Error in SQL query. Please check.' });
        }
        return res.status(200).json({ message: 'Response updated successfully!' });
    });
});

// RESTful API Endpoint: DELETE /user_responses/:id
// Delete a user response
app.delete('/user_responses/:id', (req, res) => {
    const id = req.params.id;
    const sqlDelete = 'DELETE FROM user_responses WHERE response_id = ?';
    dbConnection.query(sqlDelete, [id], (error, result) => {
        if (error) {
            return res.status(400).json({ error: 'Error in SQL query. Please check.' });
        }
        return res.status(200).json({ message: `Response with ID ${id} deleted successfully!` });
    });
});

// Server listening on port 3000
app.listen(3000, () => {
    console.log("Express server is running and listening.");
});