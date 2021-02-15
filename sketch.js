// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/cXgA1d_E-jY&

let bird;
let pipes = [];
const STATES = {
  READY: 'ready',
  PLAYING: 'playing',
  ENED: 'ended'
}
let state = STATES.PLAYING;

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
  for (var i = pipes.length - 1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();

    if (pipes[i].hits(bird)) {
      //console.log('HIT');
      bird.hit();
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
