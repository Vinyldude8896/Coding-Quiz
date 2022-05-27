var startQuizBtn = document.querySelector("#start-quiz");
var QuestionPageContent = document.querySelector("#page-content");
var EndPageContent = document.querySelector("#end-page");
var finalPageContent = document.querySelector("#final-page");
var viewhighscores = document.querySelector("#view-high-scores");
const TimeCounter = document.querySelector("#page-timer");
let TimeRemaining = 60;
// TimeCounter.innerHTML = `Time: 00:${TimeRemaining}`;

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

// var countdownTimer = tim

// set player object - with question, score and initials
var playerDataObject = {
    question: 0,
    score: 0,
    initials: "",

};
    

    function timer() {
        var timer = setInterval(function() {
            TimeCounter.innerHTML= "Time : 00:" + TimeRemaining;
            TimeRemaining--;
            if (TimeRemaining <0) {
                clearInterval(timer);
            }
            if (QuestionCycle === 5) {
                TimeRemaining++;
                clearInterval(timer);
            }
        }, 1000);
    }

   
    // create function to set final page
    var setFinalPage = function () {

        document.querySelector("h2").id = "final-page";
        document.querySelector("h2").className = "final-page";
        document.querySelector("h2").textContent = "High Scores";

        document.querySelector("#input-initials").innerHTML = "";
        document.querySelector("p").textContent = "";

        document.querySelector("#submit-initials").style.display = "none";

        document.querySelector("input").value = "1." + playerDataObject.initials + "-" + playerDataObject.score;

        var finalPageContent = document.querySelector("#end-page");

        var goBackButton = document.createElement("button");
        goBackButton.id = "go-back";
        goBackButton.innerText = "Go Back";
        finalPageContent.appendChild(goBackButton);

        var ClearHighScoresButton = document.createElement("button");
        ClearHighScoresButton.id = "clear-high-scores";
        ClearHighScoresButton.innerText = "Clear High Scores";
        finalPageContent.appendChild(ClearHighScoresButton);

        goBackButton.addEventListener('click', function () {
            location.reload();
        });

        localStorage.setItem("initials", JSON.stringify(playerDataObject.initials));
        localStorage.setItem("score", JSON.stringify(playerDataObject.score));

        ClearHighScoresButton.addEventListener('click', function () {
            localStorage.clear();
            window.alert("High Scores Cleared");
        })

    }

    //create function to display end results page
    var SetEndPage = function () {

        document.querySelector("div").id = "end-page";

        document.querySelector("h2").id = "end-header";
        document.querySelector("h2").className = "end-page";
        document.querySelector("h2").textContent = "All Done!";
         
        document.querySelector("p").id = "final-score";
        document.querySelector("p").classname = "end-page";
        document.querySelector("p").textContent = "Your final score is " + TimeRemaining + ".";
        playerDataObject.score = playerDataObject.score + TimeRemaining; 

        var EndPageContent = document.querySelector('#end-page');

        var inputPretext = document.createElement("h2");
        inputPretext.className = "input-line";
        inputPretext.id = "input-initials";
        inputPretext.innerHTML = "Enter initials:";
        EndPageContent.appendChild(inputPretext);

        var inputBoxInitials = document.createElement("input");
        inputBoxInitials.className = "input-line";
        inputBoxInitials.id = "input-box";
        inputBoxInitials.name = "input-initials"
        EndPageContent.appendChild(inputBoxInitials);

        var submitInitials = document.createElement("button");
        submitInitials.classname = "submit-button";
        submitInitials.id = "submit-initials";
        submitInitials.innerText = "Submit";
        EndPageContent.appendChild(submitInitials);

        
        
        // // // Need to fix this too ***
       inputBoxInitials.addEventListener('change', function (){
           inputvalue = (this.value);
           console.log(inputvalue);
           playerDataObject.initials = inputvalue;
           console.log(playerDataObject.initials);
       });
        

        submitInitials.addEventListener("click", setFinalPage);
    };  



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
        var QuestionPageHeader = document.createElement("h2");
        QuestionPageHeader.id = "New Question";
        QuestionPageHeader.classname = "question-content";
        QuestionPageHeader.innerHTML = CurrentQuestion[0];
        QuestionPageContent.appendChild(QuestionPageHeader);

        // adding 1 to QuestionCycle to set it to question 1
        QuestionCycle = QuestionCycle +1;
    };


   // Function to create Quiz Questions on Main page
    var SetQuizAnswers= function() {

    // Create buttons for all answers in question array    
        for (var i = 1; i < CurrentQuestion.length; i++) {
    
       var AnswerButtons = document.createElement("button");
        AnswerButtons.className = "question-content";
        AnswerButtons.innerHTML = CurrentQuestion[i];
        AnswerButtons.id = "Answer + "+ i;
        QuestionPageContent.appendChild(AnswerButtons);
         }
     };

  
         // Function to clear current answer and questions

    var clearCurrentQuestionAnswers = function () {

        if (QuestionCycle === 5) {
            SetEndPage();
        };

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
     };
     // function to display Wrong Message

     var DisplayWrongMessage = function () {
         var HeaderWrongAnswer = document.createElement("h3");
         HeaderWrongAnswer.className = "answer-header";
         HeaderWrongAnswer.id = "answer-h3";
         HeaderWrongAnswer.innerHTML = "Wrong!";
         QuestionPageContent.appendChild(HeaderWrongAnswer);

         // adding penalty of ten seconds off timer fror wrong answer
         if (QuestionCycle < 5){
             TimeRemaining = TimeRemaining -10;
         }
      };

    // check for correct answers
     var checkAnswers = function() {

           QuestionPageContent.addEventListener("click", function (event) { 
    
            var ButtonClickedName = event.target.innerText;
            var currentAnswer = CorrectAnswers[QuestionCycle-1];
            
            if (ButtonClickedName === "Start Quiz"){
                return;
            }
            if (QuestionCycle === 5) {
                setTimeout(() => {clearCurrentQuestionAnswers(); }, 1000); 
            }

            if (ButtonClickedName === currentAnswer) {
                DisplayCorrectMessage();
                setTimeout(() => { clearCurrentQuestionAnswers(); }, 1000);
            }
              if (QuestionCycle < 6) {
                  if (ButtonClickedName != currentAnswer ) {
                DisplayWrongMessage();
                setTimeout(() => { clearCurrentQuestionAnswers(); }, 1000);
              }
            }
              
    });
    };


// Section Handling area where first 'start quiz' button will replace items on page
var sectionHandler = function () {

    // changing status of current page items after button click
    document.querySelector("h2").textContent = "";
    document.querySelector("p").textContent = "";
    document.querySelector('.button').classname = "disabled";
    document.querySelector('.button').style.display = 'none';
    QuestionPageContent.className = "question-content";

    timer();
    SetQuizQuestion();
    SetQuizAnswers();
    checkAnswers();
};


startQuizBtn.addEventListener("click", sectionHandler);
viewhighscores.addEventListener("click", function(){
   var initials = localStorage.getItem("initials");
    var score = localStorage.getItem("score");
    document.querySelector("#view-high-scores").innerHTML = '1.' + initials + '-' + score;
});
