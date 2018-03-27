
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

    var questionList = [{

    }];

    // hide the questions and end results until they are called
    $(".gameQuestions").hide();
    $(".endGame").hide();

    //  hide the starter container when it is clicked and pull up the question container
    $(".starter").on("click", function () {
        $(".starter").hide();
        $(".gameQuestions").show();
        countdownInterval(); //start the timer when the questions are displayed
    })

    // create a function that will decrement the timer by one and end the game if the timer is up 
    // check results.
    function countdown () {

        timer--;

        $('#timeRemaining').html(timer + " Seconds");

        if (timer < 0.1) { //I have this set to 0.1 just so a negative number doesn't show up for a split second when the timer resets when the game is reset
            $(".gameQuestions").hide();
            $(".endGame").show();
            // clearInterval(timeDecrement);
            checkResults(); // move on to check results

        };

    };

    // this function makes the countdown function repeat at an increment of 1 second
    function countdownInterval () {

       timeDecrement = setInterval(countdown, 1000);

    };

    
    function questionGenerator () {
        
    }


    function checkResults () {

        clearInterval(timeDecrement); // end the countdown function and stop interval timing

        //set the value chose in the radio button by the user equal to a variable
        // grabbing value from html value (string)
        var Q1 = $('input:radio[name="q1"]:checked').val();
        var Q2 = $('input:radio[name="q2"]:checked').val();
        var Q3 = $('input:radio[name="q3"]:checked').val();
        var Q4 = $('input:radio[name="q4"]:checked').val();
        var Q5 = $('input:radio[name="q5"]:checked').val();
    
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

        // clear radio buttons
        // $(this).prop('checked', false);
        $("input").prop("checked", false); //this will clear out all of the selected choices in the radio buttons


        correctAnswers = 0;
        incorrectAnswers = 0;
        unaswered = 0;
        timer = 10;
        $('#timeRemaining').html(timer + " Seconds");
    };

});