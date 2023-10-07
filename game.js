var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  // play audio
  playAudio(randomChosenColour);
  //animation effect
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);
}

function playAudio(str) {
  var audio = new Audio("./sounds/" + str + ".mp3");
  audio.play();
}

function buttonAnimation(str, cla) {
  $(str).addClass(cla);
  setTimeout(function () {
    $(str).removeClass(cla);
  }, 100);
}

function wrongSelection() {
  gamePattern.length = 0;
  $("#level-title").text("Game Over, Press Any Key to Restart");
  //wrong audio
  playAudio("wrong");
  // wrong effect
  buttonAnimation("body", "game-over");
  k = 0;
}

var k = 0; // on keypress
$(document).on("keydown", function () {
  if (k === 0) {
    nextSequence();
    $("#level-title").text("Level " + gamePattern.length);
    k++;
  }
});

var i = 0;
var g = 1;
// on click
$(".btn").on("click", function (event) {
  if (gamePattern.length == 0) {
    wrongSelection();
  } else {
    if (gamePattern[i] === event.currentTarget.getAttribute("id")) {
      // play audio
      playAudio(event.currentTarget.getAttribute("id"));
      //click effect
      buttonAnimation(event.currentTarget, "pressed");
      i++;
      g = 1;
    } else {
      i = 0;
      g = 0;
      wrongSelection();
    }

    if (i === gamePattern.length && g === 1) {
      i = 0;
      g = 1;
      setTimeout(function () {
        nextSequence();
        $("#level-title").text("Level " + gamePattern.length);
      }, 500);
    }
  }
});
