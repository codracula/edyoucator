// This file would handle requests related to quizzes, such as fetching quiz questions, submitting answers, and tracking progress.
// This file will be responsible for the frontend logic of our quiz taker functionality. It will interact with the user interface
// and make requests to the backend.

// Fetch Quizzes
// Implement a function to fetch available quizzes from the backend.
// This will likely make a GET request to an endpoint defined in index.js? (not sure yet)
// Fetch algebra quizzes
const fetchAlgebraQuizzes = async () => {
    try {
        const response = await fetch('http://localhost:3000/algebra_questions');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const quizzes = await response.json();
        return quizzes;
    } catch (error) {
        console.error('Error fetching algebra quizzes: ', error);
    }
};

// Fetch Chemistry Quizzes
const fetchChemistryQuizzes = async () => {
    try {
        const response = await fetch('http://localhost:3000/chemistry_questions');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const quizzes = await response.json();
        return quizzes;
    } catch (error) {
        console.error('Error fetching chemistry quizzes:', error);
    }
};

// Example usage
fetchAlgebraQuizzes().then(quizzes => {
    if (quizzes) {
        console.log('Algebra Quizzes:', quizzes);
        // Display these quizzes on the page
    }
});

fetchChemistryQuizzes().then(quizzes => {
    if (quizzes) {
        console.log('Chemistry Quizzes:', quizzes);
        // Display these quizzes on the page
    }
});


// Display Quizzes
// Once fetch the quizzes, display them on the page.
// User should be able to select a quiz to take.



// Handle Quiz interaction
// Implement fuctions to handle quiz interactions like displaying questions, selecting answers,
// and navigating between questions.



// Submit Answers
// Implement a fuction to submit answers to the backend, probably a POST request to an endpoint



// Track progress
// Add features to track and display the user's progress through the quiz.