$(start);

//When the page loads I want the table cells to fadeIn for a few seconds and then fadeOut.


function start() {
  var cells = document.getElementsByClassName('cell');
  fadeInAndOut(cells);
}

function fadeInAndOut(cells) {
  for (var i = 0; i < cells.length; i++) {
    var table = $(cells[i]);
    table.fadeIn('slow');


    setTimeout(function() {
      console.log(table);
      $('.cell').removeClass('tree');
      $('.cell').removeClass('snowman');
    }, 4000);
  }
}

//Now for the click function, I want the cells background-image to appear after every click.

function click(images) {
  document.getElementsByClassName('cell').addEventListener('click', images);
}
