var startQuizBtn = document.querySelector("#start-quiz");
var QuestionPageContent = document.querySelector("#page-content");
var Question1 = ["Commonly used data types DO Not include:", "1. strings", "2. booleans", "3. alerts", "4. numbers"];
var Question2 = ["The Condition in an if / else statement is enclosed with ____.", "1. quotes", "2. curly brackets", "3. parameters", "4. square brackets"];
var Question3 = ["Arrays in JavaScript can be used to store ____", "1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"];
var Question4 = ["String values must be enclosed within ___ when being assigned to variables.", "1. commas", "2. curly brackets", "3. quotes", "4. parenthesis"];
var Question5 = ["A very useful tool used during development and debugging for printing content to the debugger is:", "1. JavaScript", "2. terminal/bash", "3. for loops", "4. console.log"];



    var SetQuizQuestion = function () {
        // change header function based on current question
        var QuestionPageHeader = document.createElement("h2");
        QuestionPageHeader.classname = "question-content";
        QuestionPageHeader.innerHTML = Question1[0];
        QuestionPageContent.appendChild(QuestionPageHeader);
    }


   // Function to create Quiz Questions on Main page
    var SetQuizAnswers= function() {

    // Create buttons for all answers in question array    
        for (var i = 1; i < Question1.length; i++) {
    
       const AnswerButtons = document.createElement("button");
        AnswerButtons.className = "question-content";
        AnswerButtons.innerHTML = Question1[i];
        AnswerButtons.id = Question1[i];
        QuestionPageContent.appendChild(AnswerButtons);
         }

        QuestionPageContent.addEventListener("click", function(ButtonName){
            console.log("button being clicked is ", ButtonName.textContent);
            var buttonclicked = ButtonName.id;
        })

     };



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
