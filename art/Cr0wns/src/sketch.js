
function setup() {
  let ratio = 1.618; // Golden Mean
  let pgWidth = $(window).width() * .4; // scale art to window width
  console.log( "Format width: " + pgWidth);
  let myCanvas = createCanvas(pgWidth, pgWidth*ratio, WEBGL);
  myCanvas.parent('myContainer');
  let pgHeight = myCanvas.height;
  console.log( "Format height: " + pgHeight);

  background(255); // white canvas

  let unitX = pgWidth/5;
  let unitY = pgHeight/5;
  let originX = -pgWidth/2;
  let originY = -pgHeight/2;

  let grid = false; // false = hide grid
  if ( grid ) {
    push();
      strokeWeight(1);
      stroke(200);
      for ( x = 0; x < 5; x++ ) {
        let xGrid = (-unitX + (x*unitX))-unitX
        line(xGrid, -pgHeight, xGrid, pgHeight); // vertical gridlines
      }
      for ( y = 0; y < 5; y++ ) {
        let yGrid = (-unitY + (y*unitY))-unitY
        line(-pgWidth, yGrid, pgWidth, yGrid); // horizontal gridlines
      }
    pop();
  }

  // Define Shapes
  let Shape = {}; // Object contains all 16 shapes
  for (i =0; i < 16; i++) {
    let r = Math.floor(Math.random() * 9);
    let vCount = 0; // counter for vertices
    Shape[i] = {"id" : i};
      for (x = 0; x < 3; x++) {
        for (y = 0; y < 3; y++) {
          vCount ++;
          if ( vCount != r ) {
            Shape[i][vCount] = {"x" : x*unitX/2, "y" : y*unitY/2};
          } else {
            Shape[i][vCount] = {"x" : 0, "y" : 0};
          }
        }
      }
  }
  console.log("Shape keys count: " + Object.keys(Shape).length, Shape);

  let count = Object.keys(Shape).length;

  /* COLORS */
  let Colors = ["#eaa780", "#58d2ad", "#6b8abf", "#e1b33f"];

  let posY = originY;
  for (i = 0; i < count; i++) {
    let posX = originX + (unitX * (i%4));
    if ( i % 4 == 0 ) {
      posX = originX; // reset the origin if 4th column
      posY = posY + unitY; // set the Y to the next row
    }
    let vCount = Object.keys(Shape[i]).length;
    push();
    beginShape();
      noStroke();
      angleMode(DEGREES);
      fill(Colors[Math.floor(Math.random() * 4)]);
      let flag = Math.floor(Math.random() * 50);
      switch (true) {
       case (flag % 2 == 0) :
        rotate(180);
        break;
       case (flag % 3 == 0) :
        scale(2);
        break;
       case (flag % 5 == 0) :
        scale(4);
        break;
      }
      for (j = 0; j < vCount-1; j++) {
        vertex((posX + Shape[i][j+1].x)+unitX/2, (posY - Shape[i][j+1].y)+unitY/2);
      }//endfor j
    endShape();
    pop();
  }// endfor i

}
