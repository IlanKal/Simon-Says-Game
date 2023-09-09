var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var highestScore = -1;
var started = false;


$(document).keypress(function(){
  if(!started){
  $("#level-title").text("level " + level);
  nextSequence();
  started = true;
}
});

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length -1);
} );

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Success")
 
  if (gamePattern.length === userClickedPattern.length) {
    setTimeout(function () {
      nextSequence();
    }, 1000);
  }

} else {
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    var wrong = new Audio('sounds/wrong.mp3');
    wrong.play();

    setTimeout(function () {
      $("body").removeClass("game-over");;
    }, 200);
    startOver();
  }
 }
 
function nextSequence(){
    userClickedPattern = [];
    level++;
    if (highestScore < level) {
      highestScore = level;
      $("#highest-score-title").text("Highest Score: " + highestScore);
    }
    $("#level-title").text("level " + level);

    var randomNumber = Math.floor(Math.random()*4); // choose random number
    var randomChosenColour = buttonColours[randomNumber]; // pick random color
    gamePattern.push(randomChosenColour) // push color to array
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}

function playSound(name){
    var colorSound = new Audio('sounds/' + name + '.mp3');
    colorSound.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
      }, 100);
 }

 function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
 }



