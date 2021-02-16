// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/cXgA1d_E-jY&
let HIT_PARTICLE = true;
let HIT_SHAKE = true;
let UP_SHAKE = true;
let TAIL = true;


let bird;
let pipes = [];
const STATES = {
  READY: 'ready',
  PLAYING: 'playing',
  ENED: 'ended'
}
let state = STATES.PLAYING;
let shakeFrames = 0;

function setup() {
  createCanvas(640, 480);
  bird = new Bird();
  pipes.push(new Pipe());
}

function draw() {
  background(0);
  switch (state) {
    case STATES.PLAYING: {
      drawPlaying();
      break;
    } case STATES.ENDED: {
      drawEnded();
      break;
    }
  }
}

function drawPlaying() {
  if (UP_SHAKE) {
    translate(0, bird.velocity / 4);
  }
  for (var i = pipes.length - 1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();

    if (pipes[i].hits(bird)) {
      //console.log('HIT');
      bird.hit();
      shakeFrames = 0;
      state = STATES.ENDED;
    }

    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  }
  bird.update();
  bird.show();

  if (frameCount % 75 == 0) {
    pipes.push(new Pipe());
  }
}

function drawEnded() {
  // shake
  if (HIT_SHAKE && shakeFrames < 8) {
    translate(0, random(-5,5));
    shakeFrames++;
  }
  // draw pipes
  for (var i = pipes.length - 1; i >= 0; i--) {
    pipes[i].show();
  }
  bird.update();
  bird.show();
}

function keyPressed() {
  if (key == ' ') {
    bird.up();
    //console.log("SPACE");
  }
}
