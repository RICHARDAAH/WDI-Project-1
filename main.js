$(start);

//When the page loads I want the table cells to fadeIn for a few seconds and then fadeOut.

var numberOfClicksLeft = 6;
var numberOfSnowmenFound = 0;


function start() {
  var cells = document.getElementsByClassName('cell');
  fadeInAndOut(cells);
  $('td').on('click', cellClick);
}

function cellClick(){
  var hold = parseInt($(this).attr('id')) -1;
  var snowmenArray = ['4', '7', '15', '18'];
  if (snowmenArray.includes($(this).attr('id'))){
    $(this).attr('class', 'cell snowman');
    numberOfSnowmenFound++;
    if (numberOfSnowmenFound === 4){
      return alert('You win!');
    }
  } else {
    $(this).attr('class', 'cell tree');
    setTimeout(function(){
      var $tds = $('td');
      $($tds[hold]).attr('class', 'cell');
    }, 6000);
  }
  numberOfClicksLeft--;
  if (numberOfClicksLeft === 0){
    alert('You lose! Try again.');
  }
  $('#clicksRemaining').text(numberOfClicksLeft);
  $('#snowmenFound').text(numberOfSnowmenFound);
}

function fadeInAndOut(cells) {
  for (var i = 0; i < cells.length; i++) {
    var table = $(cells[i]);
    table.fadeIn('slow');


    setTimeout(function() {
      console.log(table);
      $('.cell').removeClass('tree');
      $('.cell').removeClass('snowman');
    }, 2000);
  }
}


// Need to restart the game everytime the player loses.

//would like to randomise evrytime the player restarts the game!
