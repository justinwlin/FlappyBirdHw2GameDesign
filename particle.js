// particle system
function ParticleSystem(position, particleFactory) {
    this.position = position.copy();
    this.particleFactory = particleFactory;
    this.particles = [];
    for (let i = 0; i < 50; i++) {
      this.particles.push(new particleFactory(this.position));
    }
  }
  
  ParticleSystem.prototype.run = function() {
    for (let i = this.particles.length-1; i >= 0; i--) {
      let p = this.particles[i];
      p.run();
      if (p.isDead()) {
        this.particles.splice(i, 1);
      }
    }
  }
  
  let colors = [
    '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5',
    '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50',
    '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800',
    '#FF5722'
  ];
  
  // hit-explode particle
  function Particle(position) {
    this.acceleration = createVector(0   , 0.1);
    this.velocity = createVector(random(-5, 0), random(-5, 5));
    this.position = position.copy();
    this.color = colors[Math.floor(random(0, colors.length))];
    this.lifespan = 255;
  }
  
  Particle.prototype.run = function() {
    this.update();
    this.display();
  };
  
  // Method to update position
  Particle.prototype.update = function(){
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 5;
  };
  
  // Method to display
  Particle.prototype.display = function() { 
    strokeWeight(0);
    fill(this.color);
    ellipse(this.position.x, this.position.y, 12, 12);
  };
  
  // Is the particle still useful?
  Particle.prototype.isDead = function(){
    return this.lifespan < 0;
  };