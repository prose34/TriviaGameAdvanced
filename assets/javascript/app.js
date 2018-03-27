
// on start click, show one question
// make a list of questions - try object array object
// use for loops and if statements:
// display question one and all of its choices
// be able to hover over possible answers and use pseudo style to show border/background
// if correct answer is selected, add one to correct score    - a few seconds later move to next question or end
// if wrong answer is selected, add one to wrong answers, show correct answer - a few seconds later move to next question or end
// or if you run out of time say out of time and show correct answer - a few seconds later move to next question or end screeen
// insert gif after each answer and notify if right or wrong
// after the final question, display correct, wrong and unanswered
// start over button


// extra: add sound for correct answer or at end of game




// when the html has loaded, run the following code
$(document).ready(function() {

    var correctAnswers = 0;
    var incorrectAnswers = 0;
    var unaswered = 0;
    var timer = 10;
    var timeDecrement;
    var currentQuestion = 0;
    var userAnswer;

    var questionList = [{
        q: "In what comic book did Spider-Man first appear?",
        choices: ["Amazing Spider-man #1", "Spectacular Spider-man #1", "Amazing Fantasy #15", "Avengers #1"],
        answer: 2,
        gif: "test",
    },{
        q: "Who does the Silver Surfer serve?",
        choices: ["The Beyonder", "Galactus", "Thanos", "Dormammu"],
        answer: 1,
    },{
        q: "Do did Bruce Banner/The Hulk get his powers?",
        choices: ["Spider Bite", "Solar Radiation", "Genetic Mutation", "Gamma Radiation"],
        answer: 3,
    },{
        q: "Who was the founder of the X-men?",
        choices: ["Magneto", "Professor X", "Wolverine", "Cyclops"],
        answer: 1,
    },{
        q: "Which comic book artist is nicknamed 'The King'?",
        choices: ["Jack Kirby", "Steve Ditko", "Stan Lee", "Todd McFarlane"],
        answer: 0,
    }];

    var answerMessage = {
        correct: "CORRECT!",
        incorrect: "WRONG!",
        endTime: "OUT OF TIME!",
        finished: "Here are your results:"
    }

    console.log(questionList[0].q);
    console.log(questionList[0].choices[0]);


    // hide the questions and end results until they are called
    $(".gameQuestions").hide();
    $(".questionResult").hide();
    $(".endGame").hide();
    

    //  hide the starter container when it is clicked and pull up the question container
    $(".starter").on("click", function () {
        $(".starter").hide();
        $(".gameQuestions").show();
        countdownInterval(); //start the timer when the questions are displayed
        questionGenerator();
    })

    // create a function that will decrement the timer by one and end the game if the timer is up 
    // show results when time is up
    function countdown () {

        timer--;

        $('#timeRemaining').html(timer + " Seconds");

        if (timer < 0.1) { //I have this set to 0.1 just so a negative number doesn't show up for a split second when the timer resets when the game is reset
            $(".gameQuestions").hide();
            $(".endGame").show();
            checkResults(); // move on to check results

        };

    };

    // this function makes the countdown function repeat at an increment of 1 second
    function countdownInterval () {
       timeDecrement = setInterval(countdown, 1000);
    };

    
    function questionGenerator () {

        $('#questionText').html(questionList[currentQuestion].q);
            
        $("#option1").html(questionList[currentQuestion].choices[0]);
        $("#option2").html(questionList[currentQuestion].choices[1]);
        $("#option3").html(questionList[currentQuestion].choices[2]);
        $("#option4").html(questionList[currentQuestion].choices[3]);

        $(".multipleChoice").on("click", function (){
            // when you click on one of the four options the program should move onto the results display
            // five seconds after the results are displayed, add one to the current question and begin again
            // when the currentquestions run out go to results screen
            userAnswer = $(this).html();
            analyzeAnswer(); 
            $(".questionResult").show();
            $(".gameQuestions").hide();

            // console.log($(this).html());
        });

    };


    function analyzeAnswer () {
    
        // first clear questions and display wheter or not answer was correct and the gif. end after 5 seconds

        // i want to reactivate the question generator here, so lets add one to currectquestions
    
        // console.log(questionList[currentQuestion].answer);

        if(userAnswer === questionList[currentQuestion].choices.indexOf(questionList[currentQuestion].answer)) {
            correctAnswers++;
        }

        correctAnswer();

        // console.log(correctAnswers);
    };

    function correctAnswer () {

        clearInterval(timeDecrement);
        $('#timer').hide();
        $('#questionText').hide();
            
        $("#option1").hide();
        $("#option2").hide();
        $("#option3").hide();
        $("#option4").hide();

        correctAnswer++;
    }




    function checkResults () {

        clearInterval(timeDecrement); // end the countdown function and stop interval timing
    
        // if statements to compare answer to correct answer, add to incorrect or unanswered total as well

        // display total number of correct, wrong, and unanswered questions on end results container
        $("#correctAnswers").html(correctAnswers);
        $("#incorrectAnswers").html(incorrectAnswers);
        $("#unanswered").html(unaswered);

        // reset the game if the reset button is pressed
        $("#restartButton").on("click", resetGame);

    };

    function resetGame () {
        $(".gameQuestions").hide();
        $(".endGame").hide();
        $(".starter").show();

        correctAnswers = 0;
        incorrectAnswers = 0;
        unaswered = 0;
        timer = 10;
        $('#timeRemaining').html(timer + " Seconds");
    };

});