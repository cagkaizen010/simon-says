
var started = false;

var buttonColours= ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;


$("body").keypress(function () {
    if (!started) {
        nextSequence();
        $("#level-title").text("Level " + level);
        started = true;
    }
});


$(".btn").click(function (){
    var userChosenColour = this.id;

    userClickedPattern.push(userChosenColour);
    playSound(this.id);
    animatePress(this.id);
    checkAnswer(userClickedPattern.length-1);

});



function nextSequence() {
    var randomNumber = Math.floor(4*Math.random());
    
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(50).fadeIn(50);
    
    playSound(randomChosenColour);
    level++;
    $("#level-title").text("Level " + level);

}

function playSound(name) {
    var audio = new Audio("sounds/" +name +".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");

    setTimeout(function() {
        $("#" +currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    console.log(currentLevel);

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel] ) {
        console.log("success");
        if (gamePattern.length === userClickedPattern.length ){
            setTimeout(nextSequence, 1000);
            userClickedPattern = [];
        }
    }
    else {
        var wrongSound = new Audio("sounds/wrong.mp3");
        wrongSound.volume = 0.2;
        wrongSound.play();

        $("body").addClass("game-over");
        setTimeout(function() {
        $("body").removeClass("game-over")}, 200);

        $("h1").text("You failed! Press Any Key To Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}
