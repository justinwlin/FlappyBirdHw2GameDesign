function Bird() {
  this.isDead = false;
  this.particleSystem = null;

  this.y = height / 2;
  this.x = 120;

  this.gravity = 0.7;
  this.lift = -12;
  this.velocity = 0;

  this.show = function () {
    if (this.isDead) { return; }
    fill(255);
    ellipse(this.x, this.y, 32, 32);
  };

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
  };

  this.hit = function() {
    this.isDead = true;
    this.particleSystem = new ParticleSystem(
      createVector(this.x, this.y),
      Particle);
    this.particleSystem.run();
  }
}