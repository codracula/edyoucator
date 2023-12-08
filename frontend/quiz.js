$(document).ready(function() {
    let currentQuestionIndex = 0;
    let quizData = [];

    function loadQuiz() {
        $.get('http://localhost:3000/quizzes', function(data) {
            quizData = data; // Store quiz data
            renderQuestion(currentQuestionIndex); // Render the first question
        });
    }

    function renderQuestion(index) {
        const question = quizData[index];
        $('#quiz-container').empty(); // Clear existing content

        if (question) {
            const questionElem = $('<div>', { class: 'question' });
            questionElem.append($('<h4>').text(question.question));

            ['a', 'b', 'c', 'd'].forEach(option => {
                if (question[option]) {
                    const label = $('<label>', { class: 'option' });
                    const input = $('<input>', { type: 'radio', name: 'answer', value: option });
                    label.append(input, question[option]);
                    questionElem.append(label);
                }
            });

            $('#quiz-container').append(questionElem);
        }
    }

    $('#submit-quiz').click(function() {
        const selectedOption = $('input[name="answer"]:checked').val();
        // Do something with the selected option, e.g., store it for later submission
        console.log('Selected option for question', currentQuestionIndex, ':', selectedOption);

        // Move to the next question
        if (currentQuestionIndex < quizData.length - 1) {
            currentQuestionIndex++;
            renderQuestion(currentQuestionIndex);
        } else {
            // If it was the last question, handle the end of the quiz
            console.log('Quiz completed');
            // Here you can handle the quiz completion, e.g., submit all answers
        }
    });

    loadQuiz();
});
