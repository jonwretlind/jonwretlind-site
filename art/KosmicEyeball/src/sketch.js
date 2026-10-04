let c = 0;
let img;
let BgStars;

function setup() {
  let myCanvas = createCanvas(800, 800, WEBGL);
  myCanvas.parent('myContainer');
  img = loadImage('01-3.jpg'); // earth image
  Stars();
}

function draw() {

  let locX = mouseX - height / 2;
  let locY = mouseY - width / 2;

  //lighting
  // blue directional light from the left
  directionalLight(0, 0, 255, -1, 0, 0);
  ambientLight(128, 128, 128);
  pointLight(255, 255, 255, 200, 200, 600);

  background("black");

  // Sphere
  stroke(0, c/2, c);
  fill(0, 128, 128)
  push();
  rotateY(frameCount * 0.002);
  translate(0, 0, 0);
  texture(img);
  sphere(200);
  pop();

  rotateY(frameCount * 0.01);

  // "magnetic lines"
  for (let j = 0; j < 10; j++) {
    push();
    for (let i = 0; i < 100; i++) {
      translate(
        sin(frameCount * 0.0001 + j) * 200,
        sin(frameCount * 0.0001 + j) * 200,
        i * 0.1
      );
      rotateZ(frameCount * 0.002);
      rotateX(frameCount * 0.001);
      push();
      c = c + .25; if (c == 255) c = 0;
      stroke(c/4, c, 0);
      //strokeWeight(c/25);
      sphere(20);
      pop();
    }
    pop();
  }

  // Torus
  translate(400, 0, 0);
  push();
  rotateZ(frameCount * 0.01);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  normalMaterial();
  torus(100, 20, 60, 60);
  pop();


}// draw()


function Stars() {

const numberOfStars = 500,
  twinkleFrequencyMinimum = 2, // seconds
  twinkleFrequencyMaximum = 6; // ''

const constructUniverse = () => {

  const mainWidth = document.getElementsByTagName("main")[0].scrollWidth;
  const mainHeight = document.getElementsByTagName("main")[0].scrollHeight;

  for (i = 0; i < numberOfStars; i++) {

    const xAxis = Math.floor(Math.random() * mainWidth);
    const yAxis = Math.floor(Math.random() * mainHeight);

    const star = document.createElement("div");
    star.classList.add("star");
    star.style.top = yAxis.toString() + "px";
    star.style.left = xAxis.toString() + "px";
    document.getElementsByTagName("main")[0].appendChild(star);

  }

  const randomRange = (min, max) => {
    return Math.floor(Math.random() * (max + 1 - min) + min);
  };

  let stars = document.getElementsByClassName("star");

  for (i = 0; i < stars.length; i++) {
    let randNum = randomRange(twinkleFrequencyMinimum, twinkleFrequencyMaximum); // twinkle duration
    stars[i].style.animationDuration = randNum + "s";
  }

  // todo: finish this..

  // random 'big' twinkle
  /* const bigTwinkle = document.createElement('div');
  bigTwinkle.classList.add('bigtwinkle');
  const bigTwinkleStar = document.getElementsByClassName("star")[numberOfStars - 1];
  const starParent = bigTwinkleStar.parentNode;

  starParent.insertBefore(bigTwinkle, bigTwinkleStar);
  bigTwinkle.style.top = bigTwinkle.nextSibling.style.top; */
};

const outputStars = () => {
  let starCollection = document.getElementsByClassName("star");
  if (starCollection.length === 0) {
    constructUniverse();
  } else {
    const removeStars = (starCollection) => {
      starCollection.forEach((el) => el.remove());
    };
    removeStars(document.querySelectorAll(".star"));
    constructUniverse();
  }
};

let timerIsActive = false;

window.addEventListener("resize", () => {
  if (!timerIsActive) {
    timerIsActive = true;
    var timer = setTimeout(() => {
      outputStars();
      timerIsActive = false;
    }, 500);
  }
});

outputStars();

}// Stars()
