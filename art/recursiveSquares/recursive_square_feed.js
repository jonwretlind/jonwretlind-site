// GLOBALS
  const canvas = document.querySelector('canvas');
  const context = canvas.getContext('2d');
  const size = window.innerWidth;
  const dpr = window.devicePixelRatio;
  canvas.width = size * dpr;
  canvas.height = size * dpr;
  context.scale(dpr, dpr);
  context.lineWidth = .5;
  context.strokeStyle = '#ff0000';

  // INIT VARS
  var finalSize = 10;
  var startSize = size;
  var startSteps = 4;
  idx = 0;

  // FETCH FROM FEED
  const RSS_URL = 'https://feeds.simplecast.com/54nAGcIl';
  let theTXT = "";
  fetch(RSS_URL)
    .then(response => response.text())
    .then(str => jQuery.parseXML(str))
    .then(data => ( theTXT = data.location ))

// FUNCTIONS
function draw(x, y, width, height, xMovement, yMovement, steps) {
  context.beginPath();
  context.rect(x, y, width, height);
  context.stroke();

  if(steps >= 0) {
    var newSize = (startSize) * (steps / startSteps) + finalSize;
    var newX = x + (width - newSize) / 2
    var newY = y + (height - newSize) / 2
    newX = newX - ((x - newX) / (steps + 2)) * xMovement
    newY = newY - ((y - newY) / (steps + 2)) * yMovement
    draw(newX, newY, newSize, newSize, xMovement, yMovement, steps - 1);
  }
}

function main(x, y, angle, m1, m2) {
  nx = (x - 10) * Math.sin(angle * m1);
  ny = (y - 5) * Math.sin(angle * m2);
  for (var i=nx; i <=10; i++ ) {
    draw(i*nx, i*ny, startSize, startSize, ny, nx, i+(getRand(100)));
  }
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getRand(r) {
  return Math.floor(Math.random() * r)
}



// MAIN LOOP
window.setInterval(function() {
  idx ++;
  if (idx < getRand(360)) {
    id1 = idx / getRand(100);
    id2 = idx / getRand(100);
    main( id1, id2, idx, id2 * (1 / id1), id1 * (1 / id2) );
  } else {
    context.strokeStyle = getRandomColor();
    id1 = idx / getRand(100);
    id2 = idx / getRand(100);
    idx = 0;
  }
    context.font = (id1*getRand(100)) + "px Arial";
    context.fillText(theTXT, id1*(idx*getRand(100)), id2*(idx*getRand(100)) );
}, 30);
