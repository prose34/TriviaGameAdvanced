
// Press the start button - on click function and display questions
// start 30 second interval timer
// provide only one answer per radio button
// if click submit end the timer and run function to check answers
// if timer runs out say game over time out 0 score?
// list correct, incorrect, unaswered questions


// when the html has loaded, run the following code
$(document).ready(function() {

    var correctAnswers = 0;
    var incorrectAnswers = 0;
    var unaswered = 0;
    var timer = 30;
    var timeDecrement;

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

    
    // if the user clicks submit answers button, it skips the timer and ends the game, checks results
    $(".submitButton").on("click", function() {
            $(".gameQuestions").hide();
            $(".endGame").show();
            checkResults(); //move on to check results
    });

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
        if (Q1 == "Peter Parker") {
            correctAnswers++;
        } else if (Q1 == undefined) {
            unaswered++;
        } else {
            incorrectAnswers++;
        };
       
        if (Q2 == "Black Widow") {
            correctAnswers++;
        } else if (Q2 == undefined) {
            unaswered++;
        } else {
            incorrectAnswers++;
        };

        if (Q3 == "Hulk") {
            correctAnswers++;
        } else if (Q3 == undefined) {
            unaswered++;
        } else {
            incorrectAnswers++;
        };

        if (Q4 == "Blind") {
            correctAnswers++;
        } else if (Q4 == undefined) {
            unaswered++;
        } else {
            incorrectAnswers++;
        };

        if (Q5 === "X-men") {
            correctAnswers++;
        } else if (Q5 === undefined) {
            unaswered++;
        } else {
            incorrectAnswers++;
        };

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
        timer = 30;
        $('#timeRemaining').html(timer + " Seconds");
    };

});