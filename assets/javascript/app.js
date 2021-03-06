
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

    // this section is for variables
    // =============================================================================================================
    // =============================================================================================================
    // =============================================================================================================

    var correctAnswers = 0; //number of correct answers user has. this will be incremented up one on a correct answer
    var incorrectAnswers = 0; //number of incorrect answers user has. this will be incremented up one on a wrong answer
    var unaswered = 0; //number of unanswered questions user has. this will increment up when no answer is selected and time runs out
    
    var timer = 10; //this timer is for each question. the user has ten seconds to choose an answer for each multiple choice question
    var timerForResults = 5; //this is the timer for the results screen that pops up after the user selects an answer. this in-between results screen goes to the next question or final results after 5 seconds
    var timeDecrement; //need to establish this variable here in the global scope so we can properly assign and clear intervals as needed. 
    var resultsTimeDecrement; //same as above, but for resultstimer
    
    var currentQuestion = 0; //this is the current question the user is on. starting at 0 index in order to use as a reference inside the questionList array of objects
    var userAnswer; //global variable that can be assigned to the answer the user selects in the multiple choice game

    // this is the array of questions, each item in the array is an object containing: the question, answer choices, correct answer, and a gif to be displayed
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

    // these messages will display after the user selects an answer for a question
    var answerMessage = {
        correct: "CORRECT!",
        incorrect: "WRONG!",
        endTime: "OUT OF TIME!",
        finished: "Here are your results:"
    }

    // logging to test outcome of looking inside array object
    // console.log(questionList[0].answer);
    // console.log(questionList[0].choices[2]);
    // console.log(questionList[currentQuestion].answer);
    // console.log(questionList[currentQuestion].choices[questionList[currentQuestion].answer]);


    // begin the game section   
    // =============================================================================================================
    // =============================================================================================================
    // =============================================================================================================


    // hide the questions, individual question results and final tally end results until they are called
    $(".gameQuestions").hide();
    $(".questionResult").hide();
    $(".endGame").hide();
    

    //  hide the starter container when it is clicked and pull up the question container
    $(".starter").on("click", function () {
        $(".starter").hide();
        $(".gameQuestions").show();
        countdownInterval(); //start the timer when the questions are displayed. 10 sec per question
        questionGenerator(); //call the questions. cycle through and display the questions one by one
    })









    // create a function that will decrement the timer by one and skip the question (mark unanswered) if the timer is up 
    // show individual results when time is up
    function countdown () {

        timer--; //decrement the timer variable by 1 

        $('#timeRemaining').html(timer + " Seconds"); //display the remaining time in the element with the timeRemaining ID

        if (timer < 1) { //I have this set to 0.1 just so a negative number doesn't show up for a split second when the timer resets when the game is reset/new question comes up
            $(".gameQuestions").hide(); //hide the question when time is up
            $(".questionResult").show(); //pull up individual results when time is up
            analyzeAnswer(); //check results

        };

    };

    // this function makes the countdown function repeat at an increment of 1 second
    function countdownInterval () {
       timeDecrement = setInterval(countdown, 1000); //the setInterval function grabs the countdown function and makes it repeat every 1000 miliseconds. set it equal to timeDecrement in order to clear it/stop calling it later
    };






    // this is another timing function intended to make the intermediate results (individual question result) page visible for 5 seconds
    function resultsTimer () {

        timerForResults--; //decrement the time this part of the program will show up for

        if (timerForResults < 0) { // when time reaches near 0, show the next question, and hide the result page
            nextQuestion();
        }
    
    }

    //this function sets the interval at which the resultsTimer runs. runs every second. 
    function resultsCountdownInterval () {
        resultsTimeDecrement = setInterval(resultsTimer, 1000);
    }







    // this code runs when the start button is clicked or time runs out on the individual question result page
    function questionGenerator () {

        console.log(currentQuestion);
        $('#questionText').html(questionList[currentQuestion].q); //display the current question - cycle through the array object based on the currentQuestion variable value
            
        // show all possible choices
        $("#option1").html(questionList[currentQuestion].choices[0]); 
        $("#option2").html(questionList[currentQuestion].choices[1]);
        $("#option3").html(questionList[currentQuestion].choices[2]);
        $("#option4").html(questionList[currentQuestion].choices[3]);

        $(".multipleChoice").on("click", function (){  // when you click on one of the four options the program will do the following:
            userAnswer = $(this).html(); //save the value/answer that the user clicked on
            $(".gameQuestions").hide(); //hide the questions and answers
            $(".questionResult").show(); //show the individual result answer - display if the user was right, wrong, or didn't answer the question
            analyzeAnswer(); //run the function that determines if the user was correct, wrong, or didn't answer
            
        });

    };


    // i need something to stop the game based on currentquestion length. 
    // always stop and get user answer


    function analyzeAnswer () {
    
        clearInterval(timeDecrement); //end the timer associated with answering the question
        resultsCountdownInterval();

        // these if statements compare the user selected answer to the correct answer and add to the 
        // appropriate score variable. a message is displayed depending on what the user selected as well
        // display gif as well 
        // say correct answer?
        if(userAnswer === questionList[currentQuestion].choices[questionList[currentQuestion].answer]) {
            correctAnswers++;
            $('#correctOrIncorrect').html(answerMessage.correct);
        } else if (userAnswer === undefined) {
            unaswered++;
            $('#outOfTime').html(answerMessage.endTime);
        } else {
            incorrectAnswers++;
            $('#correctOrIncorrect').html(answerMessage.incorrect);
        }

        // logging to check results
        console.log(userAnswer);

        console.log(correctAnswers);
        console.log(incorrectAnswers);
        console.log(unaswered);

        //increment the current question by one and then move onto the next question

        // we want to move onto the next question after 5 seconds. call timer and question generator in that function
    };



    function nextQuestion () {
        currentQuestion++;
        clearInterval(resultsTimeDecrement);
        timer = 10;
        timerForResults = 5;
        $(".questionResult").hide();
        $(".gameQuestions").show();
        countdownInterval();
        questionGenerator();

    }

















    // function correctAnswer () {

    //     // correctAnswerTimer--

    //     clearInterval(timeDecrement);
    //     $('#timer').hide();
    //     $('#questionText').hide();
            
    //     $("#option1").hide();
    //     $("#option2").hide();
    //     $("#option3").hide();
    //     $("#option4").hide();

    //     // if timer reaches 0 move to next question

    // }

    // function checkResults () {

    //     clearInterval(timeDecrement); // end the countdown function and stop interval timing
    
    //     // if statements to compare answer to correct answer, add to incorrect or unanswered total as well

    //     // display total number of correct, wrong, and unanswered questions on end results container
    //     $("#correctAnswers").html(correctAnswers);
    //     $("#incorrectAnswers").html(incorrectAnswers);
    //     $("#unanswered").html(unaswered);

    //     // reset the game if the reset button is pressed
    //     $("#restartButton").on("click", resetGame);

    // };

    // function resetGame () {
    //     $(".gameQuestions").hide();
    //     $(".endGame").hide();
    //     $(".starter").show();

    //     correctAnswers = 0;
    //     incorrectAnswers = 0;
    //     unaswered = 0;
    //     timer = 10;
    //     $('#timeRemaining').html(timer + " Seconds");
    // };

});