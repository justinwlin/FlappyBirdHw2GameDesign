// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/cXgA1d_E-jY&
let HIT_PARTICLE = true;
let HIT_SHAKE = true;
let UP_SHAKE = true;
let TAIL = true;

let song;
let jumpsound;
let bird;
let pipes = [];
let resetState = false;
const STATES = {
  READY: 'ready',
  PLAYING: 'playing',
  ENED: 'ended'
};
let state = STATES.PLAYING;
let shakeFrames = 0;

function preload() {
  song = loadSound('megalovania.mp3');
  jumpsound = loadSound('swoosh.wav');
}

function setup() {
  createCanvas(640, 480);
  song.loop();
  bird = new Bird();
  pipes.push(new Pipe());
}

function reset() {
  bird = 0;
  pipes = [];
  state = STATES.PLAYING;
  shakeFrames = 0;
  bird = new Bird();
  resetState = false;
}

function draw() {
  background(0);
  switch (state) {
    case STATES.PLAYING: {
      console.log('a');
      drawPlaying();
      break;
    } case STATES.ENDED: {
      console.log('b');

      if (resetState == false) {
        setTimeout(() => {
          reset();
          console.log('RESETTING');
        }, 1000);
        resetState = true;
      }
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
    translate(0, random(-5, 5));
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
    jumpsound.play();
    //console.log("SPACE");
  }
}
