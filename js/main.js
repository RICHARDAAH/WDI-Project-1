$(start);

// Define the variables that are going to be used by all/several of the functions globally so that they can be accessed!
// If they were defined in a function, they wouldn't be accessible to another function.
var numberOfClicksLeft   = 6;
var numberOfSnowmenFound = 0;
var numberOfSnowmen      = 4;
var width                = 5;
var placement            = [];
var board;
var body;
var squares;
var message;

function start() {
  // Find the body tag
  body = document.getElementsByTagName('body')[0];
  message = document.getElementsByClassName('message')[0];
  $(message).on('click', 'button', playAgain);
  createBoard();
}

function createBoard() {
  // Set the initial message
  message.innerHTML = 'Find the snowmen with 6 guesses!';
  // Creating a ul in JS memory
  board = document.createElement('ul');
  // Give the class of .board to the ul
  board.setAttribute('class', 'board');
  // Appending the newly created ul into the body (where it'll be styled by CSS)
  body.appendChild(board);

  // Loop over the total number of squares
  for (var i = 0; i < width*width; i++) {
    // Creating one li
    var li = document.createElement('li');
    // Setting the attribute of class to be cell
    li.setAttribute('class', 'cell');
    // Then add to the board
    board.appendChild(li);
  }

  // Create a variable where we select all of the new cells that we added
  squares = document.getElementsByClassName('cell');
  placeCharacters();
}

function placeCharacters() {
  for (var i = 0; i < numberOfSnowmen; i++) {
    // Push a random number between 0 and the number of squares (li)
    // Ensure that the number isn't already in the combination
    var randomIndex = getRandomInt(0, squares.length-1);
    while (placement.includes(randomIndex)) {
      randomIndex = getRandomInt(0, squares.length-1);
    }
    placement.push(randomIndex);
  }
  flashCharacters();
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function flashCharacters() {
  // Loop through the squares and add the correct class
  for (var i = 0; i < squares.length; i++) {
    var $square = $(squares[i]);
    if (placement.includes(i)) {
      $square.addClass('snowman').hide().fadeIn(2000);
    } else {
      $square.addClass('tree').hide().fadeIn(2000);
    }
  }
  // Make the squares disappear quickly
  setTimeout(function() {
    $(squares).removeClass('tree');
    $(squares).removeClass('snowman');
    $(squares).on('click', choose);
  }, 2000);
}

function choose() {
  // Convert the HTML collection into an array
  var squaresArray   = [].slice.call(squares);
  var index          = squaresArray.indexOf(this);
  var $clickedSquare = $(this);

  if (placement.includes(index)) {
    $clickedSquare.attr('class', 'cell snowman');
    numberOfSnowmenFound++;
    if (numberOfSnowmenFound === 4){
      message.innerHTML = 'You win! <button>Play Again</button>';
      $(squares).off('click', choose);
    }
  } else {
    $clickedSquare.attr('class', 'cell tree');

    setTimeout(function(){
      $clickedSquare.attr('class', 'cell');
    }, 3000);
  }

  numberOfClicksLeft--;

  if (numberOfClicksLeft === 0){
    message.innerHTML = 'You lose! Try again. <button>Play Again</button>';
    $(squares).off('click', choose);
  }

  $('#clicksRemaining').text(numberOfClicksLeft);
  $('#snowmenFound').text(numberOfSnowmenFound);
}

function playAgain(){
  document.body.removeChild(board);
  numberOfClicksLeft   = 6;
  numberOfSnowmenFound = 0;
  numberOfSnowmen      = 4;
  width                = 5;
  placement            = [];

  $('#clicksRemaining').text(numberOfClicksLeft);
  $('#snowmenFound').text(numberOfSnowmenFound);
  createBoard();
}
