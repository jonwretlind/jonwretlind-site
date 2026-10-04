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
  const RSS_URL = 'https://www.nytimes.com/svc/collections/v1/publish/https://www.nytimes.com/section/world/rss.xml';
  let theTXT = [];
  fetch(RSS_URL)
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data => {
      let items = data.querySelectorAll("item");
      items.forEach(el => {
        theTXT.push(el.querySelector("title").innerHTML);
      });
    })



// FUNCTIONS
function draw(x, y, width, height, xMovement, yMovement, steps) {
  context.beginPath();
  context.rect(x, y, width, height);
  context.stroke();

  if(steps >= 0) {
    var newSize = (startSize) * (steps / startSteps) + finalSize;
    var newX = x + (width - newSize) / 7
    var newY = y + (height - newSize) / 7
    newX = newX - ((x - newX) / (steps + 3)) * xMovement
    newY = newY - ((y - newY) / (steps + 3)) * yMovement
    draw(newX, newY, newSize, newSize, xMovement, yMovement, steps - 3);
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
  return Math.floor(Math.random() * r);
}



// MAIN LOOP
window.setInterval(function() {
  idx ++;
  if (idx < getRand(360)) {
    id1 = idx / getRand(13);
    id2 = idx / getRand(13);
    main( id1, id2, idx, id2 * (1 / id1), id1 * (1 / id2) );
  } else {
    context.strokeStyle = getRandomColor();
    context.lineWidth = getRand(3);
    id1 = idx / getRand(13);
    id2 = idx / getRand(13);
    idx = 0;
  }
    context.font = (id1*getRand(300)) + "px Arial, sans-serif";
    context.fillStyle = getRandomColor();
    var itemIdx = getRand(theTXT.length); //grab a random item index from array of stories
    var TxtContent = theTXT[itemIdx];
    context.fillText(TxtContent, id1*(idx*getRand(100)), id2*(idx*getRand(100)) );
}, 30);
