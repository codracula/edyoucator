// Importing necessary modules
const express = require("express");         // Express framework for handling HTTP requests
const cors = require("cors");               // CORS middleware for handling cross-origin requests
const dbConnection = require("./config");   // MySQL database configuration module
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');



// Create an instance of Express application
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
// Define Swagger options
const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'TCSS 460 Project API',
        version: '1.0.0',
        description: 'API Documentation for the TCSS 460 Project.',
      },
    },
    apis: [path.join(__dirname, '*.js')],
};

// Initialize Swagger
const swaggerSpec = swaggerJsdoc(options);

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware setup
app.use(cors());                                    // Enable CORS for all routes
app.use(express.json());                            // Parse JSON payloads in incoming requests
app.use(express.urlencoded({ extended: true}));     // Parse URL-encoded payloads 

  
frontend_path = path.join(__dirname, '..') + '/frontend';

app.use(express.static(path.join(frontend_path, 'static')));

const PORT = process.env.PORT || 3000; 

/**
 * @swagger
 * /admins:
 *   get:
 *     summary: Retrieve a list of all administrators.
 *     tags: [Admin]
 *     description: Fetches a list of all administrators from the database. This can include details such as user ID, and admin status.
 *     responses:
 *       200:
 *         description: A list of admins successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: 
 *                 type: object
 *                 properties:
 *                   userid:
 *                     type: integer
 *                     description: The admin user ID.
 *                   admin:
 *                     type: enum('Yes, NO')
 *                     description: The admin status, indicating if the user is an admin ("Yes") or not ("No").
 *       400:
 *         description: Error in SQL statement or query execution.
 */
// Admins
// RESTful API Endpoint: GET /admins
// 1 Retrieve all admins from the database
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

/**
 * @swagger
 * /admins/{userid}:
 *   get:
 *     summary: Retrieve admin status for a specific user
 *     tags: [Admin]
 *     description: Fetches the admin status for the user with the specified user ID from the database.
 *     parameters:
 *       - in: path
 *         name: userid
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique ID of the user to retrieve admin status.
 *     responses:
 *       200:
 *         description: Admin status for the specified user successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userid:
 *                   type: integer
 *                   description: The user's ID.
 *                 admin:
 *                   type: enum
 *                   description: The admin status of the user ("Yes" or "No").
 *       400:
 *         description: Error in SQL statement or query execution.
 */
// 2 RESTful API Endpoint: GET /admins/:userid
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

// 3 RESTful API Endpoint: POST /admins
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

// 4 RESTful API Endpoint: PUT /admins/:userid
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

// 5 RESTful API Endpoint: DELETE /admins/:userid
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

/**
 * @swagger
 * /authentication/{userID}:
 *   get:
 *     summary: Retrieve a user's authentication details
 *     tags: [Authentication]
 *     description: Fetches authentication details of a user based on their unique userID.
 *     parameters:
 *       - in: path
 *         name: userID
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique identifier of the user.
 *     responses:
 *       200:
 *         description: Authentication details of the user successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   userID:
 *                     type: integer
 *                     description: Unique identifier of the user.
 *                   password:
 *                     type: string
 *                     description: The user's password
 *       400:
 *         description: Error in SQL query.
 */
// Authentication
// 6 RESTful API Endpoint: GET /authentication/:userID
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

/**
 * @swagger
 * /classrooms:
 *   get:
 *     summary: Retrieve all classrooms
 *     tags: [Classrooms]
 *     description: Fetches all the classroom details from the database.
 *     responses:
 *       200:
 *         description: All classroom data successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   response_id:
 *                     type: integer
 *                     description: Unique identifier of the classroom.
 *                   user_id:
 *                     type: integer
 *                     description: Identifier of the user associated with the classroom.
 *                   question_id:
 *                     type: integer
 *                     description: Identifier of the question associated with the classroom.
 *                   selected_option:
 *                     type: string
 *                     description: The selected option for the question in the classroom.
 *       400:
 *         description: Error in SQL query.
 */
// Classrooms
// 7 RESTful API Endpoint: GET /classrooms
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

/**
 * @swagger
 * /classrooms:
 *   post:
 *     summary: Create a new classroom
 *     tags: [Classrooms]
 *     description: Adds a new classroom to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - moderatorid
 *               - quizid
 *               - quiztaker
 *             properties:
 *               moderatorid:
 *                 type: integer
 *                 description: Identifier of the moderator for the classroom.
 *               quizid:
 *                 type: integer
 *                 description: Identifier of the quiz associated with the classroom.
 *               quiztaker:
 *                 type: string
 *                 description: Identifier of the quiz taker in the classroom.
 *     responses:
 *       200:
 *         description: New classroom created successfully.
 *       400:
 *         description: Error in SQL statement.
 */
// 8 RESTful API Endpoint: POST /classrooms
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

/**
 * @swagger
 * /classrooms/{id}:
 *   put:
 *     summary: Update an existing classroom
 *     tags: [Classrooms]
 *     description: Modifies the details of an existing classroom based on its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique identifier of the classroom to be updated.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               moderatorid:
 *                 type: integer
 *                 description: Updated identifier of the moderator.
 *               quizid:
 *                 type: integer
 *                 description: Updated identifier of the quiz.
 *               quiztaker:
 *                 type: string
 *                 description: Updated identifier of the quiz taker.
 *     responses:
 *       200:
 *         description: Classroom updated successfully.
 *       400:
 *         description: Error in SQL query.
 */
// 9 RESTful API Endpoint: PUT /classrooms/:id
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

/**
 * @swagger
 * /classrooms/{id}:
 *   delete:
 *     summary: Delete a classroom
 *     tags: [Classrooms]
 *     description: Removes a classroom from the database based on its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique identifier of the classroom to be deleted.
 *     responses:
 *       200:
 *         description: Classroom deleted successfully.
 *       400:
 *         description: Error in SQL query.
 */
// 10 RESTful API Endpoint: DELETE /classrooms/:id
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


/**
 * @swagger
 * /quizid:
 *   get:
 *     summary: Retrieve all quizzes and their moderators
 *     tags: [Quiz_ID]
 *     description: Fetches a list of all quizzes from the database along with their respective moderators.
 *     responses:
 *       200:
 *         description: A list of quizzes with moderator information successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   quizid:
 *                     type: integer
 *                     description: The unique ID of the quiz.
 *                   quizname:
 *                     type: string
 *                     description: The name of the quiz.
 *                   moderator:
 *                     type: integer
 *                     description: The moderator of the quiz.
 *       400:
 *         description: Error in SQL query.
 */
// QuizID
// 11 RESTful API Endpoint: GET /quizid
// Retrieve all quizzes
app.get('/quizid/:userid', (req, res) => {
    const userid = req.params.userid;
    // const userid = dataReceive.userid;
    console.log(userid);
    const sqlQuery = 'SELECT * FROM quizid WHERE quizid.moderator = ?';
    dbConnection.query(sqlQuery, [userid], (error, result) => {
        if (error) {
            return res.status(400).json({ error: 'Error in SQL query. Please check.' });
        }
        if (result) {
            res.status(200).json({success: true, 
                message: 'sending quiz name over..',
                result: result
            });
        }else {
            return res.status(200).json({error: 'No quiz data available.'});
        }
    });
});

/**
 * @swagger
 * /quizid:
 *   post:
 *     summary: Create a new quiz and assign a moderator
 *     tags: [Quiz_ID]
 *     description: Adds a new quiz to the database and assigns a moderator to it.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quizid:
 *                 type: integer
 *                 description: The unique ID for the new quiz.
 *               quizname:
 *                 type: string
 *                 description: The name of the new quiz.
 *               moderator:
 *                 type: integer
 *                 description: The moderator assigned to the new quiz.
 *     responses:
 *       200:
 *         description: New quiz created and moderator assigned successfully.
 *       400:
 *         description: Error in SQL statement.
 */
// 12 RESTful API Endpoint: POST /quizid
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

/**
 * @swagger
 * /quizid/{id}:
 *   put:
 *     summary: Update an existing quiz (Moderator Only)
 *     tags: [Quiz_ID]
 *     description: Allows the moderator to update the details of their quiz.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique ID of the quiz to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               moderator:
 *                 type: integer
 *                 description: The moderator updating the quiz.
 *               quizname:
 *                 type: string
 *                 description: The updated name of the quiz.
 *     responses:
 *       200:
 *         description: Quiz updated successfully by the moderator.
 *       400:
 *         description: Error in SQL query or update operation.
 */
// 13 RESTful API Endpoint: PUT /quizid/:id
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

/**
 * @swagger
 * /quizid/{id}:
 *   delete:
 *     summary: Delete a quiz (Moderator Only)
 *     tags: [Quiz_ID]
 *     description: Allows the moderator to delete their quiz from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique ID of the quiz to delete.
 *     responses:
 *       200:
 *         description: Quiz deleted successfully by the moderator.
 *       400:
 *         description: Error in SQL query or delete operation.
 */
// 14 RESTful API Endpoint: DELETE /quizid/:id
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

/**
 * @swagger
 * /quizzes:
 *   get:
 *     summary: Retrieve all quizzes
 *     tags: [Quizzes]
 *     description: Fetches a list of all quizzes from the database.
 *     responses:
 *       200:
 *         description: A list of quizzes successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   quizid:
 *                     type: integer
 *                     description: The unique ID of the quiz.
 *                   question:
 *                     type: string
 *                     description: The quiz question.
 *                   a:
 *                     type: string
 *                     description: Option A.
 *                   b:
 *                     type: string
 *                     description: Option B.
 *                   c:
 *                     type: string
 *                     description: Option C.
 *                   d:
 *                     type: string
 *                     description: Option D.
 *                   answer:
 *                     type: string
 *                     description: The correct answer.
 *       400:
 *         description: Error in SQL query.
 */
// Quizzes
// 15 RESTful API Endpoint: GET /quizzes
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

/**
 * @swagger
 * /quizzes:
 *   post:
 *     summary: Create a new quiz question
 *     tags: [Quizzes]
 *     description: Adds a new quiz question to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quizid:
 *                 type: integer
 *                 description: The unique ID for the quiz.
 *               question:
 *                 type: string
 *                 description: The quiz question.
 *               a:
 *                 type: string
 *                 description: Option A.
 *               b:
 *                 type: string
 *                 description: Option B.
 *               c:
 *                 type: string
 *                 description: Option C.
 *               d:
 *                 type: string
 *                 description: Option D.
 *               answer:
 *                 type: string
 *                 description: The correct answer.
 *     responses:
 *       200:
 *         description: New quiz question created successfully.
 *       400:
 *         description: Error in SQL statement.
 */
// 16 RESTful API Endpoint: POST /quizzes
// Create a new quiz
app.post('/quizzes', (req, res) => {
    const { quizid, question, a, b, c, d, answer } = req.body;
    const sqlInsert = 'INSERT INTO quizzes (quizid, question, a, b, c, d, answer) VALUES (?, ?, ?, ?, ?, ?, ?)';
    dbConnection.query(sqlInsert, [quizid, question, a, b, c, d, answer], (error, result) => {
        if (error) {
            return res.status(400).json({ error: 'Error in SQL statement. Please check.' });
        }
        return res.status(200).json({ message: 'New quiz created successfully!' });
    });
});

/**
 * @swagger
 * /quizzes/{questionnumber}:
 *   put:
 *     summary: Update an existing quiz question
 *     tags: [Quizzes]
 *     description: Updates a quiz question in the database.
 *     parameters:
 *       - in: path
 *         name: questionnumber
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique question number of the quiz to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quizid:
 *                 type: integer
 *                 description: The quiz ID.
 *               question:
 *                 type: string
 *                 description: The updated quiz question.
 *               a:
 *                 type: string
 *                 description: Updated Option A.
 *               b:
 *                 type: string
 *                 description: Updated Option B.
 *               c:
 *                 type: string
 *                 description: Updated Option C.
 *               d:
 *                 type: string
 *                 description: Updated Option D.
 *               answer:
 *                 type: string
 *                 description: The updated correct answer.
 *     responses:
 *       200:
 *         description: Quiz question updated successfully.
 *       400:
 *         description: Error in SQL query or update operation.
 *       404:
 *         description: No quiz found with the given question number.
 */
// 17 RESTful API Endpoint: PUT /quizzes/:questionsnumber
// Update an existing quiz
app.put('/quizzes/:questionnumber', (req, res) => {
    const questionnumber = req.params.questionnumber;
    const { quizid, question, a, b, c, d, answer } = req.body;
    const sqlUpdate = 'UPDATE quizzes SET quizid = ?, question = ?, a = ?, b = ?, c = ?, d = ?, answer = ? WHERE questionnumber = ?';
    dbConnection.query(sqlUpdate, [quizid, question, a, b, c, d, answer, questionnumber], (error, result) => {
        if (error) {
            return res.status(400).json({ error: 'Error in SQL statement. Please check.' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'No quiz found with the given question number.' });
        }
        return res.status(200).json({ message: 'Quiz updated successfully!' });
    });
});

/**
 * @swagger
 * /quizzes/{questionnumber}:
 *   delete:
 *     summary: Delete a quiz question
 *     tags: [Quizzes]
 *     description: Deletes a quiz question from the database based on its question number.
 *     parameters:
 *       - in: path
 *         name: questionnumber
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique question number of the quiz to delete.
 *     responses:
 *       200:
 *         description: Quiz question deleted successfully.
 *       400:
 *         description: Error in SQL query.
 *       404:
 *         description: No quiz found with the given question number.
 */
// 18 RESTful API Endpoint: DELETE /quizzes/:questionnumber
// Delete a quiz based on question number
app.delete('/quizzes/:questionnumber', (req, res) => {
    const questionnumber = req.params.questionnumber;
    const sqlDelete = 'DELETE FROM quizzes WHERE questionnumber = ?';
    dbConnection.query(sqlDelete, [questionnumber], (error, result) => {
        if (error) {
            return res.status(400).json({ error: 'Error in SQL query. Please check.' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: `No quiz found with question number ${questionnumber}.` });
        }
        return res.status(200).json({ message: `Quiz with question number ${questionnumber} deleted successfully!` });
    });
});

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of all users
 *     tags: [Users]
 *     description: Fetches a list of all users from the database, including their details.
 *     responses:
 *       200:
 *         description: A list of users successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   userid:
 *                     type: integer
 *                     description: The user's ID.
 *                   username:
 *                     type: string
 *                     description: The username of the user.
 *                   firstname:
 *                     type: string
 *                     description: The first name of the user.
 *                   lastname:
 *                     type: string
 *                     description: The last name of the user.
 *                   dateofbirth:
 *                     type: string
 *                     format: date
 *                     description: The user's date of birth.
 *                   email:
 *                     type: string
 *                     format: email
 *                     description: The email address of the user.
 *                   city:
 *                     type: string
 *                     description: The city of the user.
 *                   state:
 *                     type: string
 *                     description: The state of the user.
 *                   country:
 *                     type: string
 *                     description: The country of the user.
 *       400:
 *         description: Error in SQL query.
 */
// Users
// 19 RESTful API Endpoint: GET /users
// Retrieve all users
app.get('/users', (req, res) => {
    const userID = parseInt(req.body.userID);
    const sqlQuery = 'SELECT * FROM users WHERE userID =?';
    dbConnection.query(sqlQuery, userID, (error, result) => {
        if (error) {
            return res.status(400).json({ error: 'Error in SQL query. Please check.' });
        }
        return res.status(200).json(result);
    });
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     description: Adds a new user to the database with the provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userid:
 *                 type: integer
 *                 description: The user's ID.
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *               firstname:
 *                 type: string
 *                 description: The first name of the user.
 *               lastname:
 *                 type: string
 *                 description: The last name of the user.
 *               dateofbirth:
 *                 type: string
 *                 format: date
 *                 description: The user's date of birth.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user.
 *               city:
 *                 type: string
 *                 description: The city of the user.
 *               state:
 *                 type: string
 *                 description: The state of the user.
 *               country:
 *                 type: string
 *                 description: The country of the user.
 *     responses:
 *       200:
 *         description: New user created successfully.
 *       400:
 *         description: Error in SQL statement.
 */
// 20 RESTful API Endpoint: POST /users
// Create a new user
app.post('/users', (req, res) => {
    const { userid, password, username, firstname, lastname, dateofbirth, email, city, state, country  } = req.body;
    // console.log(req.body);
    const sqlInsert = 'INSERT INTO users JOIN authentication on users.userid = authentication.userid WHERE users.userid=? AND authentication.password = ? AND users.username=? AND users.firstname=? AND users.lastname=? AND users.dateofbirth=? AND users.email=? AND users.city? AND users.state? AND users.country=?';
    dbConnection.query(sqlInsert, [userid, password, username, firstname, lastname, dateofbirth, email, city, state, country], (error, result) => {
        if (error) {
            result: req.body;
            return res.status(400).json({ error: 'Error in SQL statement. Please check.' });
            
        }
        return res.status(200).json({ message: 'New user created successfully!' });
    });
});

// 21 RESTful API Endpoint: POST /users
// Checking password for the exiting user for authentiation
app.post('/cred', (req, res) => {
    // const {userid, password} = req.body;
    const userid = parseInt(req.body.userid);
    const password = req.body.password;
    console.log(userid, password);
    // SELECT * FROM authentication JOIN users ON users.userID = authentication.userID JOIN quizID ON users.userID = quizID.moderatorID WHERE userID =?  AND password = ?";
    const query = "SELECT * FROM authentication JOIN users On authentication.userid = users.userid WHERE authentication.userid =?  AND authentication.password = ?";
    // const userInfo = "SELECT * FROM users WHERE userID =?";
    var outputInfo;

    dbConnection.query(query, [userid, password], (error, result) => {

        if (error) {
            // console.error(error.message);
            return res.status(500).json({ error: 'Error in SQL statement. Please check.' });
        }
        if (result) {

            res.status(200).json({success: true, 
                message: 'credential is valid',
                result: result
                
            });
        }else {
            res.status(200).json({sucess: false, message: 'Invalid credential'});
        }
    });

});

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update an existing user
 *     tags: [Users]
 *     description: Updates the details of an existing user in the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique ID of the user to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *               firstname:
 *                 type: string
 *                 description: The first name of the user.
 *               lastname:
 *                 type: string
 *                 description: The last name of the user.
 *               dateofbirth:
 *                 type: string
 *                 format: date
 *                 description: The user's date of birth.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user.
 *               city:
 *                 type: string
 *                 description: The city of the user.
 *               state:
 *                 type: string
 *                 description: The state of the user.
 *               country:
 *                 type: string
 *                 description: The country of the user.
 *     responses:
 *       200:
 *         description: User updated successfully.
 *       400:
 *         description: Error in SQL query or update operation.
 */
// 22 RESTful API Endpoint: PUT /users/:id
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

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     description: Deletes a user from the database based on their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique ID of the user to delete.
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *       400:
 *         description: Error in SQL query or delete operation.
 *       404:
 *         description: User not found.
 */
// 23 RESTful API Endpoint: DELETE /users/:id
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
// 24 RESTful API Endpoint: GET /user_responses
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

// 25 RESTful API Endpoint: POST /user_responses
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

// 26 RESTful API Endpoint: PUT /user_responses/:id
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

// 27 RESTful API Endpoint: DELETE /user_responses/:id
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

/**
 * @swagger
 * /leaderboard:
 *   get:
 *     summary: Retrieve leaderboard data
 *     tags: [Leaderboard]
 *     description: Fetches the leaderboard data from the database, sorted by scores in descending order.
 *     responses:
 *       200:
 *         description: Leaderboard data successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   userid:
 *                     type: string
 *                     description: Unique identifier of the user, stored as a varchar.
 *                   quizid:
 *                     type: integer
 *                     description: Identifier of the quiz associated with the score.
 *                   score:
 *                     type: integer
 *                     description: Score achieved by the user.
 *       400:
 *         description: Error in SQL query.
 */
// 28 RESTful API Endpoint: GET /leaderboard
// Retrieve leaderboard data
app.get('/leaderboard', (req, res) => {
    const sqlQuery = 'SELECT * FROM leaderboard ORDER by score DESC';
    dbConnection.query(sqlQuery, (error, result) => {
        if (error) {
            return res.status(400).json({error: 'Error in SQL query. Please check.'});
        }
        return res.status(200).json(result);
    });
});

app.get('/quizzes/chemistry', (req, res) => {
    const sqlQuery = 'SELECT questionnumber, question, a, b, c, d FROM quizzes WHERE quizid = 2000';
    dbConnection.query(sqlQuery, (error, result) => {
        if (error) {
            return res.status(400).json({ error: 'Error in SQL query. Please check.' });
        }
        return res.status(200).json(result);
    });
});

app.get('/quizzes/algebra', (req, res) => {
    const sqlQuery = 'SELECT questionnumber, question, a, b, c, d FROM quizzes WHERE quizid = 1000';
    dbConnection.query(sqlQuery, (error, result) => {
        if (error) {
            return res.status(400).json({ error: 'Error in SQL query. Please check.' });
        }
        return res.status(200).json(result);
    });
});

app.post('/quizzes/check-answer', (req, res) => {
    const { questionId, userAnswer } = req.body;

    if (!questionId || !userAnswer) {
        return res.status(400).json({ error: 'Missing questionId or userAnswer' });
    }

    const sqlQuery = 'SELECT answer FROM quizzes WHERE questionnumber = ?';

    dbConnection.query(sqlQuery, [questionId], (error, result) => {
        if (error) {
            return res.status(500).json({ error: 'Error in SQL query. Please check.' });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: 'Question not found.' });
        }

        const correctAnswer = result[0].answer;
        const isCorrect = userAnswer.toLowerCase() === correctAnswer.toLowerCase();
        return res.status(200).json({ correct: isCorrect });
    });
});

// Server listening on port 3000
app.listen(3000, () => {
    console.log("Express server is running and listening.");
});