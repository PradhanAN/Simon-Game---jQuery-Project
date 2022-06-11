var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 1;


$(document).keypress(function() {
  setTimeout(function() {
    nextSequence();
  }, 300);
});


function nextSequence() {
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  gamePattern.push(randomChosenColour);
}


$(".btn").click(function() {
  var userChosenColor = this.id;
  $("#" + userChosenColor).addClass("pressed");
  setTimeout(function() {
    $("#" + userChosenColor).removeClass("pressed");
  }, 100);
  playSound(userChosenColor);
  userClickedPattern.push(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
})


function checkAnswer(currentIndex) {
  if (userClickedPattern[currentIndex] === gamePattern[currentIndex]) {
    if (userClickedPattern.length === gamePattern.length) {
      userClickedPattern = [];
      level++;
      setTimeout(function() {
        nextSequence();
      }, 600);
    }
  }
  else {
    gamePattern = [];
    userClickedPattern = [];
    level = 1;
    $("h1").text("Game-Over, Press Any Key to Restart");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 700);
  }

}


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
