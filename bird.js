function Bird() {
  this.isDead = false;
  this.particleSystem = null;
  this.tail = [];

  this.y = height / 2;
  this.x = 120;

  this.gravity = 0.7;
  this.lift = -12;
  this.velocity = 0;

  this.show = function () {
    if (this.isDead) { return; }
    fill(255);
    ellipse(this.x, this.y, 32, 32);
    if (TAIL) {
      this.showTails();
    }
  };

  this.showTails = function () {
    for(let i = 0; i < this.tail.length-1; i+=2) {
      let diam = map(i,0,this.tail.length,0,32);
      let col =  map(i,0,this.tail.length,0,255);
      noStroke();
      fill(col);
      ellipse(this.tail[i], this.  tail[i+1], diam, diam);
    }
  }

  this.up = function () {
    if (this.isDead) { return; }
    this.velocity += this.lift;
  };

  this.update = function () {
    if (this.isDead) {
      this.particleSystem.run();
      return;
    }
    this.velocity += this.gravity;
    this.y += this.velocity;

    if (this.y > height) {
      this.y = height;
      this.velocity = 0;
    }

    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
    this.tail.push(this.x, this.y);
    if (this.tail.length > 20) {
      this.tail.splice(0, 2);
    }
  };

  this.hit = function() {
    this.isDead = true;
    if (HIT_PARTICLE) {
      this.particleSystem = new ParticleSystem(
        createVector(this.x, this.y),
        Particle);
      this.particleSystem.run();
    }
  }
}