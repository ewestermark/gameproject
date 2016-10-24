var numBoids = 222;
var boids = [];
var randomPoly = []

var poly = [];
var x = [],
  y = [],
  segNum = 12,
  segLength = 8;
var head;
var posPoints = 0;
var points = 0;

for (var i = 0; i < segNum; i++) {
  x.push(i);
  y.push(i);
}

function setup() {
	var cnv = createCanvas(1100, 900);
	var x = (windowWidth - width) / 2;
	var y = (windowHeight - height) / 2;
	cnv.position(x, y);

	stroke(200, 200, 0);
	fill(200, 200, 0);

	Boid.prototype = new Mover();
  loadBoids();
	loadPoly();
	//collideDebug(true)
  head = new Ball();


}


function draw() {
	background(0);
	head.run();
	dragSegment(0, head.loc.x, head.loc.y);
  for( var i=0; i < x.length-1; i++) {
    dragSegment(i+1, x[i], y[i], i);
  }
	repellor = new Mover();
	repellor.clr = color(50,45,120);
	repellor.loc = createVector(100,100);
  attractor1 = new Mover();
  attractor1.loc = createVector(mouseX,mouseY);
  attractor1.clr = color(255);

	drawPoly();
	runBoids();
  noStroke();
	fill(10,20,100,80);
	//rect(0,0,width,height);
	attractor.clr = color(10,20,80);

  cursor(HAND);
  fill(50,80,170);
  ellipse(attractor1.loc.x, attractor1.loc.y,30,30);
posPoints = numBoids;
points = posPoints-negPoints;
textSize(30);
 text("Surviving Boids: " + points, 30,height-10);
}

function loadPoly(){

}
function drawPoly(){
  //stroke(200,67,2);
  fill(10,20,80);
   ellipse(460,280,270,270);



}
function loadBoids() {
	// create an attractor and set values
	attractor = new Mover();
	attractor.rad = 40;
  attractor.loc = createVector(460,280);

	// create a repellor and set values

	for (var i = 0; i < numBoids; i++) {
		var loc = createVector(random(width), random(height));
		var vel = createVector(random(-5, 5), random(-5,5));
		var acc = createVector(0,0);
		var clr = color(20,50,200);
		boids.push(new Boid(loc, vel, acc, clr, i));
	}
}

function runBoids() {
 attractor.run();
	//repellor.run();
	for (var i = 0; i < boids.length; i++) {
		boids[i].run();
	}
}

setInterval(changeAttAcc, 1000);
setInterval(changeRepAcc, 1500);

function changeAttAcc() {
	attractor.acc = createVector(random(-.3, .3), random(-.3, .3));
}
function changeRepAcc() {
	repellor.acc = createVector(random(-.3, .3), random(-.3, .3));
}

function dragSegment(i, xin, yin, ind) {
  var dx = xin - x[i];
  var dy = yin - y[i];
  var angle = atan2(dy, dx);
  x[i] = xin - cos(angle) * segLength;
  y[i] = yin - sin(angle) * segLength;
  segment(x[i], y[i], angle, ind);
}

function segment(x, y, a, ind) {
  push();
  translate(x, y);
  strokeWeight(15-(ind/2));
  fill(0,0, 255-10*ind, 200-ind*10);
  stroke(0,50,150,100);
  rotate(a);
  line(0, 0, segLength, 0);
  pop();
}
