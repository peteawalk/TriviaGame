    // set initial vars:
    var rightAnswer = 0;
    var wrongAnswer = 0;
    var timeRemaining = 90;
    var trackTimer;

    //Trivia questions object of object arrays:
    var triviaQuestions = [{
        question: "1. What was the average price of a movie ticket in 1990?",
        choices: ["$4.21", "$5.25", "$6.21", "$7.25"],
        answer: "$4.21"
    }, {
        question: "2. What country makes the most movies per year?",
        choices: ["United States", "India", "China", "Nigeria"],
        answer: "India"
    }, {
        question: "3. Which genre makes up the majority of movies produced?",
        choices: ["Comedy", "Drama", "Horror", "Action"],
        answer: "Drama"
    }, {
        question: "4. Wes Anderson has directed more than how many movies?",
        choices: ["11", "13", "15", "17"],
        answer: "17"
    }, {
        question: "5. What is the highest grossing film?",
        choices: ["Star Wars", "Avatar", "Avengers: Endgame", "Titanic"],
        answer: "Avatar"
    }, {
        question: "6. Which person has won the most Academy Awards (Oscars) of all time?",
        choices: ["Katharine Hepburn", "Meryl Streep", "Walt Disney", "Woody Allen"],
        answer: "Walt Disney"
    }, {
        question: "7. Which film has won the most Academy Awards (Oscars)?",
        choices: ["Avatar", "Star Wars", "Titanic", "Avengers: Endgame"],
        answer: "Titanic"
    }];

    function timer() {
        timeRemaining--;
        $("#score-box").text(`Time remaining: ${timeRemaining} secs`);
        if (timeRemaining === 0) {
            clearInterval(trackTimer);
            $("#score-box").append("<p>You ran out of time! ⏲</p>");
            $("#questions").hide();
            checkAnswers();
        };
    };

    // Start button starts game!
    $("#start-button").on("click", startGame);


    function startGame() {
        $("#start-button").remove();
        for (var i = 0; i < triviaQuestions.length; i++) {
            $("#questions").append(`<p>${triviaQuestions[i].question}</p><br>`);

            for (var j = 0; j < triviaQuestions[i].choices.length; j++) {
                // <label for="male">Male</label>
                // <input type="radio" name="gender" id="male" value="male">
                $("#questions").append(`<label for='question${i}'></label>`);
                $("#questions").append(`<input type='radio' id='question${i}' name='question${i}' value='${triviaQuestions[i].choices[j]}'/> ${triviaQuestions[i].choices[j]}`);
            };
        };
        $("#questions").append("<button id='done-button'>DONE</button>")
        timer(); // start timer!
        trackTimer = setInterval(timer, 1000);
    };

    // Done button to see results -- had to use document as done-button was created after initial start on click
    $(document).on('click', '#done-button', function () {
        checkAnswers()
    });

    function checkAnswers() {
        clearInterval(trackTimer);
        $("#done-button").remove();
        $("#questions").hide();
        $("#score-box").empty();

        for (k = 0; k < 7; k++) {
            var radioValue = $(`input[name='question${k}']:checked`).val();
            if (radioValue === triviaQuestions[k].answer) {
                rightAnswer++;
            } else {
                wrongAnswer++;
            }
        }

        if (rightAnswer > wrongAnswer) {
            $("#score-box").append(`<p>Nice Work! Hit Refresh to play again.</p>`);
        } else {
            $("#score-box").append(`<p>Try again! Hit Refresh to play again.</p>`);
        };

        $("#score-box").append(`<p>Wrong Answers: ${wrongAnswer}</p>`);
        $("#score-box").append(`<p>Right Answers: ${rightAnswer}</p>`);
    };