var startQuizBtn = document.querySelector("#start-quiz");
var QuestionPageContent = document.querySelector("#page-content");

//Setting Variables for each question and the answers
var Question1 = ["Commonly used data types DO Not include:", "1. strings", "2. booleans", "3. alerts", "4. numbers"];
var Question2 = ["The Condition in an if / else statement is enclosed with ____.", "1. quotes", "2. curly brackets", "3. parenthesis", "4. square brackets"];
var Question3 = ["Arrays in JavaScript can be used to store ____", "1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"];
var Question4 = ["String values must be enclosed within ___ when being assigned to variables.", "1. commas", "2. curly brackets", "3. quotes", "4. parenthesis"];
var Question5 = ["A very useful tool used during development and debugging for printing content to the debugger is:", "1. JavaScript", "2. terminal/bash", "3. for loops", "4. console.log"];

// setting variable to check for correct answers
var CorrectAnswers = ["3. alerts", "3. parenthesis", "4. all of the above", "3. quotes", "4. console.log"];

// setting cvariable to cycle through questions and set the current question
var QuestionCycle = 0;
var CurrentQuestion = [];

// set player object - with question, score and initials
var playerDataObject = {
    question: 0,
    score: 0,
    initials: "",

}
   



    // function to set the questions on the quiz
    var SetQuizQuestion = function () {

          // checking to see which question we are working on.
          if (QuestionCycle === 0) {
            CurrentQuestion = CurrentQuestion.concat(Question1);
        }
        if (QuestionCycle === 1) {
            CurrentQuestion.length = 0;
            CurrentQuestion = CurrentQuestion.concat(Question2);
        }

        if (QuestionCycle === 2) {
            CurrentQuestion.length = 0;
            CurrentQuestion = CurrentQuestion.concat(Question3);
        }

        if (QuestionCycle === 3) {
            CurrentQuestion.length = 0;
            CurrentQuestion = CurrentQuestion.concat(Question4);
        }

        if (QuestionCycle === 4) {
            CurrentQuestion.length = 0;
            CurrentQuestion = CurrentQuestion.concat(Question5);
        }

        if (QuestionCycle > 4 ) {
        } else {
            // DisplayEndPage();
           }

        // change header function based on current question
        var QuestionPageHeader = document.createElement("h2");
        QuestionPageHeader.id = "New Question";
        QuestionPageHeader.classname = "question-content";
        QuestionPageHeader.innerHTML = CurrentQuestion[0];
        QuestionPageContent.appendChild(QuestionPageHeader);

        // adding 1 to QuestionCycle to set it to question 1
        QuestionCycle = QuestionCycle +1;
        console.log("Question Cycle Value is " + QuestionCycle);
        console.log(CurrentQuestion);
    }


   // Function to create Quiz Questions on Main page
    var SetQuizAnswers= function() {

    // Create buttons for all answers in question array    
        for (var i = 1; i < CurrentQuestion.length; i++) {
    
       const AnswerButtons = document.createElement("button");
        AnswerButtons.className = "question-content";
        AnswerButtons.innerHTML = CurrentQuestion[i];
        AnswerButtons.id = "Answer + "+ i;
        QuestionPageContent.appendChild(AnswerButtons);
         }
     };

  
         // Function to clear current answer and questions

    var clearCurrentQuestionAnswers = function () {

        // removing current Question
        const deleteQuestion = document.getElementById("New Question");
        deleteQuestion.remove();

        // removing all current answers
        for (i = 1; i < CurrentQuestion.length; i++) {
            var deleteAnswer = document.getElementById("Answer + " + i );
            deleteAnswer.remove();
        };

        // removing correct/wrong headers

        var deleteAnswerResult = document.getElementById("answer-h3");
            deleteAnswerResult.remove();
    
        SetQuizQuestion();
        SetQuizAnswers();
    };

       // function to display Correct message

       var DisplayCorrectMessage = function() {
        var HeaderCorrectAnswer = document.createElement("h3");
        HeaderCorrectAnswer.classname = "answer-header";
        HeaderCorrectAnswer.id = "answer-h3";
        HeaderCorrectAnswer.innerHTML = "Correct!";
        QuestionPageContent.appendChild(HeaderCorrectAnswer);
     }
     // function to display Wrong Message

     var DisplayWrongMessage = function () {
         var HeaderWrongAnswer = document.createElement("h3");
         HeaderWrongAnswer.className = "answer-header";
         HeaderWrongAnswer.id = "answer-h3";
         HeaderWrongAnswer.innerHTML = "Wrong!";
         QuestionPageContent.appendChild(HeaderWrongAnswer);
     }

    // check for correct answers
     var checkAnswers = function(event) {
    
            var ButtonClickedName = event.target.innerText;
            var currentAnswer = CorrectAnswers[QuestionCycle-1];
            
            if (ButtonClickedName === "Start Quiz"){
                return;
            }
            if (ButtonClickedName === currentAnswer) {
                DisplayCorrectMessage();
                // QuestionCycle= QuestionCycle +1;
                setTimeout(() => { clearCurrentQuestionAnswers(); }, 2000);


            }  else {
                DisplayWrongMessage();
                // QuestionCycle = QuestionCycle++;
                setTimeout(() => { clearCurrentQuestionAnswers(); }, 2000);
        }
    }
        

    


// Section Handling area where first 'start quiz' button will replace items on page
var sectionHandler = function () {

    // changing status of current page items after button click
    document.querySelector("h2").textContent = "";
    document.querySelector("p").textContent = "";
    document.querySelector('.button').style.display = 'none';
    QuestionPageContent.className = "question-content";

    SetQuizQuestion();
    SetQuizAnswers();
   
};

startQuizBtn.addEventListener("click", sectionHandler);
QuestionPageContent.addEventListener("click", checkAnswers);