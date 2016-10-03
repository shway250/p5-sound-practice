// var snow;
// function setup() {
//   createCanvas(480, 270);
//   var r = random(255);
//   var g = random(0,105);
//   var b = random(50,255);
//   background(r, g, b);
//   snow = new Jitter();
// }

// function draw() {
//   noStroke()
//   if(mouseIsPressed){
//   	snow.display();
//     snow.move();
//   } else{
//     fill(255);
//   }
// }

// // Jitter class
// function Jitter() {
//   this.x = mouseX;
//   this.y = mouseY;
//   //rgb values
//   this.r = random(0,100);
//   this.g = random(0,100);
//   this.b = random(0,255);

//   this.move = function() {
//     this.x = mouseX;
//     this.y = mouseY;
//   };

//   this.display = function() {
//     //making Shape
//     fill(this.r,this.g,this.b);
//     rect(this.x,this.y,13,30);
//   }
// };

//################################################
var bx;
var by;
var boxSize = 75;
var overBox = false;
var locked = false;
var xOffset = 0.0; 
var yOffset = 0.0; 

////

var osc;
var fft;

function setup() {
  createCanvas(640, 360);
  bx = width/2.0;
  by = height/2.0;
  rectMode(RADIUS);  

  ///////////////

  osc = new p5.TriOsc(); // set frequency and type
  osc.amp(.5);

  fft = new p5.FFT();
  osc.start();
}

function draw() { 
  background(0);
  
  // Test if the cursor is over the box 
  if (mouseX > bx-boxSize && mouseX < bx+boxSize && 
      mouseY > by-boxSize && mouseY < by+boxSize) {
    overBox = true;  
    if(!locked) { 
      stroke(255); 
      fill(153);
    } 
  } else {
    stroke(153);
    fill(153);
    overBox = false;
  }
  
  // Draw the box
  rect(bx, by, boxSize, boxSize);
//////////////////////////////////////////
  // var waveform = fft.waveform();  // analyze the waveform
  // beginShape();
  // strokeWeight(5);
  // for (var i = 0; i < waveform.length; i++){
  //   var x = map(i, 0, waveform.length, 0, width);
  //   var y = map(waveform[i], -1, 1, height, 0);
  //   vertex(x, y);
  // }
  // endShape();

  // change oscillator frequency based on mouseX
  var freq = map(bx, 0, width, 40, 880);
  osc.freq(freq);

  var amp = map(by, 0, height, 1, .01);
  osc.amp(amp);
}

function mousePressed() {
  if(overBox) { 
    locked = true; 
    fill(255, 255, 255);
  } else {
    locked = false;
  }
  xOffset = mouseX-bx; 
  yOffset = mouseY-by; 

}

function mouseDragged() {
  if(locked) {
    bx = mouseX-xOffset; 
    by = mouseY-yOffset; 
  }
}

function mouseReleased() {
  locked = false;
}