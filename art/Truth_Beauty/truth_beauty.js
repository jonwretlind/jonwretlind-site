let windowWd = window.innerWidth,
    windowHt = window.innerHeight;

    let texArr = [],
        idx = 0;
        
    function preload() {
      texArr[0] = loadImage("./assets/rose-tile.png");
      texArr[1] = loadImage("./assets/circuit1.png");
      texArr[2] = loadImage("./assets/fish.png");
      texArr[3] = loadImage("./assets/circuit2.png");
      texArr[4] = loadImage("./assets/dog.png");
    }

    function setup() {
      createCanvas(windowWd, windowHt, WEBGL);
    
      background(0); // clear the screen

      window.setInterval(function() {
        idx++;
        if (idx >= texArr.length) idx = 0;
      }, 5000)

    }
    
    function draw() {
    
      // MAIN ACTION
        // cube
        push();
          var cubeSize = windowWd;
          texture(texArr[idx]);
          translate(0, 0, 0);
          rotateZ(frameCount * 0.001);
          rotateX(frameCount * 0.001);
          rotateY(frameCount * 0.001);
          box(cubeSize, cubeSize, cubeSize);
        pop();

    }
     