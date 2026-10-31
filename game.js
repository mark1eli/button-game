alert("hello")

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];

// Step 4 - Array for the user's clicks
var userClickedPattern = [];

// Step 7 - Track whether the game has started, and the level
var started = false;
var level = 0;

// Step 7 - Detect a keyboard key press, only the first time call nextSequence()
$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// Step 4 - Detect when any of the buttons are clicked
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  // Step 5 - Play the sound for the clicked button
  playSound(userChosenColour);

  // Step 6 - Animate the clicked button
  animatePress(userChosenColour);

  // Step 8 - Check the answer, passing in the index of the last answer
  checkAnswer(userClickedPattern.length - 1);
});

// Step 8 - Check the user's answer against the game sequence
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    // Step 8.4 - Check that the user has finished their sequence
    if (userClickedPattern.length === gamePattern.length) {
      // Step 8.5 - Call nextSequence() after a 1000 millisecond delay
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    // Step 9 - Play wrong.mp3
    playSound("wrong");

    // Step 9 - Apply "game-over" to the body, remove it after 200 milliseconds
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    // Step 9 - Change the h1 title
    $("#level-title").text("Game Over, Press Any Key to Restart");

    // Step 10 - Restart the game
    startOver();
  }
}

// Step 2 - Create a new pattern
function nextSequence() {
  // Step 8.6 - Reset userClickedPattern ready for the next level
  userClickedPattern = [];

  // Step 7 - Increase the level by 1 and update the h1
  level++;
  $("#level-title").text("Level " + level);

  // Step 2 - Random number between 0 and 3
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // Step 3 - Flash the button with the same id as randomChosenColour
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  // Step 3 & 5 - Play the sound for that colour
  playSound(randomChosenColour);
}

// Step 5 - Play a sound by name (used for nextSequence, clicks and "wrong")
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Step 6 - Add "pressed" to the clicked button, remove it after 100 milliseconds
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

// Step 10 - Reset level, gamePattern and started
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
