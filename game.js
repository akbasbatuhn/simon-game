var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var levelCounter = 0;
var hasGameStarted = false;
var isPlayerFailed = false;


setButton();
$(document).keydown( () => {
    if(hasGameStarted) return;
    startGame();
});

function startGame(){
    initializeAttributes();
    startCoreGameplay();
}

function initializeAttributes(){
    hasGameStarted = true;
    isPlayerFailed = false;
}

function startCoreGameplay(){
    nextSequence();
}

function nextSequence(){
    userClickedPattern = [];
    var randomChosenKey = getNewKey();
    gamePattern.push(randomChosenKey);
    useButtonFadeEffect("#" + randomChosenKey);
    levelCounter++;
    changeGameHeader();
}

function changeGameHeader(){
    $("h1").html("Level " + levelCounter);
}

function changeHeaderToFail(){
    $("h1").html("Game over, Press any key to restart.");
}

function getNewKey(){
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    return randomChosenColour;
}

function setButton(){
    $(".btn").click( (event) => {
        if(hasGameStarted === false) return;
        var buttonId = event.target.id;
        if(!buttonId) return;
        pressButton(buttonId);
    });
}

function pressButton(userChosenColor){
    userClickedPattern.push(userChosenColor);
    animateButtonPress("#" + userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
    if(isPlayerFailed) return;
    playSound(userChosenColor);
}

function playSound(buttonId){

    switch(buttonId){
        case "red":
            var redButtonSound = new Audio('sounds/red.mp3');
            redButtonSound.play();
            break;
        
        case "yellow":
            var yellowButtonSound = new Audio('sounds/yellow.mp3');
            yellowButtonSound.play();
            break;
        
        case "green":
            var greenButtonSound = new Audio('sounds/green.mp3');
            greenButtonSound.play();
            break;

        case "blue":
            var blueButtonSound = new Audio('sounds/blue.mp3');
            blueButtonSound.play();
            break;

        case "wrong":
            var wrongButtonSound = new Audio('sounds/wrong.mp3');
            wrongButtonSound.play();
            break;
        
        default:
            console.log(buttonId);
            break;
    }
}

function useButtonFadeEffect(buttonId){
    $(buttonId).fadeOut(125).fadeIn(125).fadeOut(125).fadeIn(125);
}

function animateButtonPress(currentColor){
    var button = $(currentColor);
    button.addClass("pressed");
    setTimeout( () => {
        button.removeClass("pressed");
    },100);
}

function checkAnswer(currentIndex){
    var isButtonsMatched = gamePattern[currentIndex] === userClickedPattern[currentIndex];
    var isUserPressedEnoughButton = gamePattern.length === userClickedPattern.length;

    if(isButtonsMatched) {
        if(isUserPressedEnoughButton && !isPlayerFailed){
            setTimeout( () => {
                if(isPlayerFailed) return;
                nextSequence();
            }, 1000);
        }
        return;
    }
    endGame();
}

function endGame(){
    isPlayerFailed = true;
    playSound("wrong");
    changeHeaderToFail();
    startOver();

    var bodyElement = $("body");
    bodyElement.addClass("game-over");
    setTimeout( () => {
        bodyElement.removeClass("game-over");
    }, 200);
}

function startOver(){
    levelCounter = 0;
    gamePattern = [];
    hasGameStarted = false;
}


