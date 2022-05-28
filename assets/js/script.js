
//declaring variables to be able to access different sections for query and appendchild statements
var startQuizBtn = document.querySelector("#start-quiz");
var QuestionPageContent = document.querySelector("#page-content");
var EndPageContent = document.querySelector("#end-page");
var finalPageContent = document.querySelector("#final-page");
var viewhighscores = document.querySelector("#view-high-scores");

// creating timer variable for document location
const TimeCounter = document.querySelector("#page-timer");

// creating timer value 75 seconds
let TimeRemaining = 75;


//Setting Variables for each question and the answers
var Question1 = ["Commonly used data types DO Not include:", "1. strings", "2. booleans", "3. alerts", "4. numbers"];
var Question2 = ["The Condition in an if / else statement is enclosed with ____.", "1. quotes", "2. curly brackets", "3. parenthesis", "4. square brackets"];
var Question3 = ["Arrays in JavaScript can be used to store ____", "1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"];
var Question4 = ["String values must be enclosed within ___ when being assigned to variables.", "1. commas", "2. curly brackets", "3. quotes", "4. parenthesis"];
var Question5 = ["A very useful tool used during development and debugging for printing content to the debugger is:", "1. JavaScript", "2. terminal/bash", "3. for loops", "4. console.log"];

// setting variable to check for correct answers
var CorrectAnswers = ["3. alerts", "3. parenthesis", "4. all of the above", "3. quotes", "4. console.log"];

// setting a variable to cycle through questions and set the current question
var QuestionCycle = 0;

//setting array to be populated with current question
var CurrentQuestion = [];



// set player object - with question, score and initials
var playerDataObject = {
    question: 0,
    score: 0,
    initials: "",

};
    
   
    // create function to set final page
    var setFinalPage = function () {
        
        // Taking the curent h2 element and changing id class and text content
        document.querySelector("h2").id = "final-page";
        document.querySelector("h2").className = "final-page";
        document.querySelector("h2").textContent = "High Scores";

        // setting h2 #input initials and p to empty
        document.querySelector("#input-initials").innerHTML = "";
        document.querySelector("p").textContent = "";

        // setting submit button to display style none
        document.querySelector("#submit-initials").style.display = "none";

        // setting the input box content to 1. and player's initials and player's score
        document.querySelector("input").value = "1." + playerDataObject.initials + "-" + playerDataObject.score;

        // creating a variable to be able to select #end-page section for appending child elements
        var finalPageContent = document.querySelector("#end-page");

        // creating and appending Go Back Button
        var goBackButton = document.createElement("button");
        goBackButton.id = "go-back";
        goBackButton.innerText = "Go Back";
        finalPageContent.appendChild(goBackButton);

        // creating and appending Clear High Scores Button
        var ClearHighScoresButton = document.createElement("button");
        ClearHighScoresButton.id = "clear-high-scores";
        ClearHighScoresButton.innerText = "Clear High Scores";
        finalPageContent.appendChild(ClearHighScoresButton);

        // adding event listener to Go Back Button which will reload the page
        goBackButton.addEventListener('click', function () {
            location.reload();
        });

        // setting local store for player's initials and player's score
        localStorage.setItem("initials", JSON.stringify(playerDataObject.initials));
        localStorage.setItem("score", JSON.stringify(playerDataObject.score));

        // setting event listener for Clear High scores button and display a window alert
        ClearHighScoresButton.addEventListener('click', function () {
            localStorage.clear();
            window.alert("High Scores Cleared");
        })

    }

    //create function to display end results page
    var SetEndPage = function () {
           
        // creating a div element with ID end-page
        document.querySelector("div").id = "end-page";

        // setting current h2 with new values
        document.querySelector("h2").id = "end-header";
        document.querySelector("h2").className = "end-page";
        document.querySelector("h2").textContent = "All Done!";
         
        // setting p element with new values 
        document.querySelector("p").id = "final-score";
        document.querySelector("p").classname = "end-page";
        document.querySelector("p").textContent = "Your final score is " + TimeRemaining + ".";
        
        // setting the time remaining as the player's score
        playerDataObject.score = playerDataObject.score + TimeRemaining; 

        // setting variable for end-page document for appending child elements
        var EndPageContent = document.querySelector('#end-page');

        //creating and h2 element and appending to endpage
        var inputPretext = document.createElement("h2");
        inputPretext.className = "input-line";
        inputPretext.id = "input-initials";
        inputPretext.innerHTML = "Enter initials:";
        EndPageContent.appendChild(inputPretext);

        // creating an input element and appending to endpage
        var inputBoxInitials = document.createElement("input");
        inputBoxInitials.className = "input-line";
        inputBoxInitials.id = "input-box";
        inputBoxInitials.name = "input-initials"
        EndPageContent.appendChild(inputBoxInitials);

        //ceating a button Submit and appending to endpage
        var submitInitials = document.createElement("button");
        submitInitials.classname = "submit-button";
        submitInitials.id = "submit-initials";
        submitInitials.innerText = "Submit";
        EndPageContent.appendChild(submitInitials);
        
        
        // checking for changes to input box and assigning value to player's initials
       inputBoxInitials.addEventListener('change', function (){
           inputvalue = (this.value);
           playerDataObject.initials = inputvalue;
       });
        
       // adding event listening for click to set final page
        submitInitials.addEventListener("click", setFinalPage);
    };  



    // function to set the questions on the quiz
    var SetQuizQuestion = function () {

          // checking to see which question we are working on and  setting empty array 
          // and then concatting the new question, Question cycle will tell us which question we are working on
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

        // creating a new h2 element for the current question and assigning it with the current question variable
        var QuestionPageHeader = document.createElement("h2");
        QuestionPageHeader.id = "New Question";
        QuestionPageHeader.classname = "question-content";
        QuestionPageHeader.innerHTML = CurrentQuestion[0];
        QuestionPageContent.appendChild(QuestionPageHeader);

        // adding 1 to QuestionCycle 
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

        //  setting end page if timer is 0
        if (TimeRemaining === 0) {
            SetEndPage();

        // if we are on the last question - set end page
        } 
         if (QuestionCycle === 5 && TimeRemaining > 0) {
            SetEndPage();
        };

        // removing current Question from page
        const deleteQuestion = document.getElementById("New Question");
          deleteQuestion.remove();

        // removing all current answers from page
        for (i = 1; i < CurrentQuestion.length; i++) {
            var deleteAnswer = document.getElementById("Answer + " + i );
            deleteAnswer.remove();
        };

        // removing correct/wrong h3 headers

        var deleteAnswerResult = document.getElementById("answer-h3");
            deleteAnswerResult.remove();

        // now calling to set question and set answer again
        SetQuizQuestion();
        SetQuizAnswers();

    };

       // function to display Correct message creates new h3 with correct 

       var DisplayCorrectMessage = function() {
        var HeaderCorrectAnswer = document.createElement("h3");
        HeaderCorrectAnswer.classname = "answer-header";
        HeaderCorrectAnswer.id = "answer-h3";
        HeaderCorrectAnswer.innerHTML = "Correct!";
        QuestionPageContent.appendChild(HeaderCorrectAnswer);
     };
     
     // function to display Wrong Message creates new h3 with wrong message

     var DisplayWrongMessage = function () {
         var HeaderWrongAnswer = document.createElement("h3");
         HeaderWrongAnswer.className = "answer-header";
         HeaderWrongAnswer.id = "answer-h3";
         HeaderWrongAnswer.innerHTML = "Wrong!";
         QuestionPageContent.appendChild(HeaderWrongAnswer);

         // adding penalty of ten seconds off timer for wrong answer
         if (QuestionCycle < 6){
             TimeRemaining = TimeRemaining -10;
         }
      };

    // check answer function
     var checkAnswers = function() {

            // checking to make sure timer is greater than 0
            if (TimeRemaining > 0) {
            
            // adding click event listener to start value check
           QuestionPageContent.addEventListener("click", function (event) { 
            
            // assigning variable bases on innertext of button clicked
            var ButtonClickedName = event.target.innerText;

            // variable to cycle through answer in correct answers array
            var currentAnswer = CorrectAnswers[QuestionCycle-1];
            
            // failsafe that if "start Quiz" button was clicked, would return
            if (ButtonClickedName === "Start Quiz"){
                return;
            }

            // checking to see if innertext of button clicked equals the current answer
            // if so calls to display correct message after 1 seconds delay
            if (ButtonClickedName === currentAnswer) {
                DisplayCorrectMessage();
                setTimeout(() => { clearCurrentQuestionAnswers(); }, 1000);
            }

                // as long as we haven't reached the end of our questions, check if answer is not correct
                // and call to display wrong message after 1 second delay
              if (QuestionCycle < 6 ) {
                  if (ButtonClickedName != currentAnswer && TimeRemaining >0) {
                DisplayWrongMessage();
                setTimeout(() => { clearCurrentQuestionAnswers(); }, 1000);
              }
            }

             // if we are on the last question - clear answers after 1 second delay
             if (QuestionCycle === 5 && TimeRemaining >0) {
                setTimeout(() => {clearCurrentQuestionAnswers(); }, 1000); 
            }
              
    });
    }
    };


// Section Handling area where first 'start quiz' button will replace items on page
var sectionHandler = function () {

    // changing status of current page items after button click
    document.querySelector("h2").textContent = "";
    document.querySelector("p").textContent = "";
    document.querySelector('.button').classname = "disabled";
    document.querySelector('.button').style.display = 'none';
    QuestionPageContent.className = "question-content";

    //calling all the following functions (timer, set question, set answers and check answers) 
    timer();
    SetQuizQuestion();
    SetQuizAnswers();
    checkAnswers();
};

   // Timer function to deduction time by 1 second
   function timer() {
    var timer = setInterval(function() {
        TimeCounter.innerHTML= "Time : 00:" + TimeRemaining;
        TimeRemaining--;

        // if timer is = 0 then clear questions and go to end page
        if (TimeRemaining === 0) {
            clearInterval(timer);
            clearCurrentQuestionAnswers();
        // if timer is less than 0 than return
        if (TimeRemaining < 0) {
            clearInterval(timer);
            return;
        }            

        }
        if (QuestionCycle === 6) {
            TimeRemaining++;
            clearInterval(timer);
        }
    }, 1000);
}

// event listener for start button which will start quiz by calling sectionhandler
startQuizBtn.addEventListener("click", sectionHandler);

// event listener to display high scores on click
viewhighscores.addEventListener("click", function(){
   var initials = localStorage.getItem("initials");
    var score = localStorage.getItem("score");
    document.querySelector("#view-high-scores").innerHTML ='1.' + initials + '-' + score;
});

