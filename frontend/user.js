// class User {
//     constructor() {
//         Object.assign(this, { username, password, firstName, lastName, city, country, zipCode, email, phone });
//         this.quizMade;
//         this.quizTaken;
//         this.subjectsTaken = [];
//         this.scores = [];
        
//     }

//     changInfo(f, l, email, tel) {
//         if (f != undefined) {

//             this.firstName = f;
//         }
//         if (l != undefined) {
//             this.lastName = l;
//         }
//         if (email != undefined) {
//             this.email = email;
//         }
//         if (tel != undefined) {
//             this.tel = tel;
//         }
//     }
    
//     makeQuiz(quizName) {
//         // var quizName = new quizNam
//         // this.quizMade++;
//         makeQuestion(question, a,b,c,d,answer);
//         console.log(`${this.username} has made a quiz!`);
//     }

//     addQuestion(quizName, question, a, b, c, d, answer) {
        
//     }

//     removeQuestion(quizName, questionNum) {

//     }

//     takeQuiz(subject, score, date) {
//         this.quizTaken++;
//         this.subjectsTaken.push(subject);
//         this.scores.push(score);
//         this.datesTaken.push(date);
//         console.log(`${this.username} has taken a quiz on ${subject} with a score of ${score} on ${date}.`);
//     }
// }