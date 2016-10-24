
var negPoints = 0;
function Boid(loc, vel, acc, clr, id) {
  this.acc = acc;
  this.vel = vel;
  this.loc = loc;
  this.clr = clr;
  this.id = id;
  this.repMult = .1;
  this.atrMult = .5;
  this.velLimit = 1.5;
  this.hit = false;
  this.touch = false;


  this.render = function() {

   this.hit = collideCirclePoly(this.loc.x,this.loc.y,8,poly);

   if(this.hit){
    fill(200,67,2);
  }else{
    fill(this.clr);
  }
    stroke(0,255,255);
    ellipse(this.loc.x, this.loc.y, random(4,9), random(4,9));

  }

  this.update = function() {
    this.velLimit = 1.5;
    //Change force if  repellor is in range
    if(this.loc.dist(repellor.loc) < 50){
      this.force = p5.Vector.sub(this.loc, repellor.loc);
      this.force.normalize();
      this.repMult = 5;
      this.velLimit = 3;
      if(this.loc.dist(repellor.loc) < 50) {
        this.repMult = 5;
        this.velLimit = 2;
      }
      this.force.mult(this.repMult);
      this.applyForce(this.force);
      this.velLimit = 5;
    }
    //Change force if  repellor is in range
    if(this.loc.dist(attractor.loc) < 150){
      this.force = p5.Vector.sub( attractor.loc, this.loc);
      this.force.normalize();
      this.clr = color(180,0,250);
      //posPoints = posPoints+1;
      this.force.mult(0.38);
      this.applyForce(this.force);
      this.velLimit = 5;
    }
    if(this.loc.dist(attractor1.loc) < 150){
      this.force = p5.Vector.sub( attractor1.loc, this.loc);
      this.force.normalize();
      //this.clr = color(200,67,2);
      this.force.mult(0.25);
      this.applyForce(this.force);
      this.velLimit = 5;
    }
    this.vel.add(acc);
    this.loc.add(this.vel);
    this.vel.limit(this.velLimit);
    this.acc.mult(0);



  }



  this.checkEdges = function() {
    if (this.loc.x > width || this.loc.x < 0) this.vel.x *= (-1);
    if (this.loc.y > height || this.loc.y < 0) this.vel.y *= (-1);
  }
}


function Ball() {
  this.loc = createVector(random(width/2,width), random(height/2,height));
  this.vel = createVector(random(-5, 5), random(-5, 5));
  this.rad = random(10, 30);
  this.clr = color(220, 150, 20);
  var hit = false;
  var boidHit = false;

  this.run = function() {
    this.move();
    this.bounce();
    this.render();
    this.update();
  }
  this.render = function() {
    //fill(this.clr);
    //ellipse(this.loc.x, this.loc.y, this.rad, this.rad);
  }

  this.update = function(){
    for(var i = 0; i < boids.length; i++){
      if(this.loc.dist(boids[i].loc) < 30){
        boids.splice(i,1);
        negPoints = negPoints+1;
      }
    }
  }

  this.bounce = function() {
    if (this.loc.x > width || this.loc.x < 0) {
      this.vel.x *= (-1);
    }

    if (this.loc.y > height || this.loc.y < 0) {
      this.vel.y *= -1
    }


    hit = collideCircleCircle(this.loc.x,this.loc.y,this.rad,460,270,270);
    if(hit){
      this.vel.y *= (-1);
      this.vel.x *= (-1);
    }



  }

  this.move = function() {
    //this.vel = createVector(random(-5, 5), random(-5, 5));
    this.loc.add(this.vel);
  }
}
