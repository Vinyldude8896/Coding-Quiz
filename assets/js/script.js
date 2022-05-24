var startQuizBtn = document.querySelector("#start-quiz");


var sectionHandler = function () {
    var pageContent = document.querySelector("#page-content");

    document.querySelector("h2").textContent = "";
    document.querySelector("p").textContent = "";
    document.querySelector('.button').style.display = 'none';
    pageContent.className = "question-content";
    
    var questionHeader = document.createElement("h2");
        questionHeader.classname = "question-content";
        questionHeader.innerHTML = "Commonly used data types DO Not Include:"
       pageContent.appendChild(questionHeader);

    var question1Answers = ["1. strings", "2. booleans", "3. alerts", "4. numbers"];

        for (var i = 0; i < question1Answers.length; i++) {
    
       const btn = document.createElement("button");
        btn.className = "question-content";
        btn.innerHTML = question1Answers[i];
        btn.id = question1Answers[i];
        pageContent.appendChild(btn);

    }
};

startQuizBtn.addEventListener("click", sectionHandler);
