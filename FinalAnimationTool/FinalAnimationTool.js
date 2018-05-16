//////////////////////////////////////////
// Final Animation Tool
// by Lionel Miele-Herndon
// made in Code II
// Spring 2018
// at Parsons School of Design
// with Sarah Page
// with help from code written by
// processing forums users amnon.owed, PhiLho, and Chrisir,
// Reddit user ChuckEye, Casey Reas, and Ben Fry
//////////////////////////////////////////

var squares = [];
var squares1 = [];
var squareDistances = [];
var waypoints = [];
var isAnimating, isInfinite, isHoveringSquare, isHoveringWaypoint, isFootball, isDancing1, isDancing2;
var gentium;
var space, deletePic, mouse, select, clickDrag, animationPic, footballField, danceFloor1, danceFloor2;

function preload() {
  relayFont = loadFont('Relay.ttf');
  space = loadImage('space.png');
  deletePic = loadImage('delete.png');
  mouse = loadImage('mouse.png');
  select = loadImage('select.png');
  clickDrag = loadImage('clickdrag.png');
  animationPic = loadImage('animation.png');
  footballField = loadImage('footballfield.png');
  danceFloor1 = loadImage('dancefloor1.jpg');
  danceFloor2 = loadImage('dancefloor2.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  isAnimating = false;
  isInfinite = false;
  isHovering = false;
  isFootball = false;
  isDancing1 = false;
  isDancing2 = false;
  textAlign(CENTER);
  rectMode(CENTER);
}

function draw() {
  if (isFootball){
    image(footballField, 0, 0, windowWidth, windowHeight);
  } else if (isDancing1){
    image(danceFloor1, 0, 0, windowWidth, windowHeight);
  } else if (isDancing2){
    image(danceFloor2, 0, 0, windowWidth, windowHeight);
  } else {
    background(100, 100, 155);
  }
  for (var i = squares.length - 1; i >= 0; i--) {
    squares[i].display();
    if (squares[i].animating) {
      isAnimating = true;
    } else {
      isAnimating = false;
    }
  }
  for (var i = waypoints.length - 1; i >= 0; i--) {
    if (waypoints[i].hover) {
      isHoveringWaypoint = true;
    } else {
      isHoveringWaypoint = false;
    }
  }
  for (var i = squares1.length - 1; i >= 0; i--) {
    if (squares1[i].hover) {
      isHoveringSquare = true;
    } else {
      isHoveringSquare = false;
    }
  }
  //print(isHoveringSquare);
  noStroke();
  textFont(relayFont);
  if (!isAnimating){
  	fill(100, 155, 100);
  	rect(80, 725, 120, 70);
  	fill(0);
    textSize(24);
  	text('Animate', 80, 730);
	} else {
	  fill(190, 100, 100);
  	rect(80, 725, 120, 70);
  	fill(0);
    textSize(24);
  	if (isInfinite){
		text('Stop', 80, 730);
	  } else {
		text('Restart', 80, 730);
	  }
	}
  if (!isInfinite){
  	fill(100, 155, 100);
  	rect(220, 730, 100, 50);
  	fill(255);
  	rect(195, 730, 50, 50);
  	fill(0);
    textSize(16);
  	text('Once', 195, 735);
	} else {
  	fill(100, 155, 100);
  	rect(220, 730, 100, 50);
	  fill(255);
  	rect(245, 730, 50, 50);
  	fill(0);
    textSize(16);
	  text('Loop', 245, 735);
  }
  if (!isFootball){
    fill(100, 140, 140);
    rect(320, 730, 70, 40);
    fill(0);
    textSize(16);
    text('Football \nManager', 320, 725);
  } else {
    fill(140, 140, 100);
    rect(320, 730, 70, 40);
    fill(0);
    textSize(16);
    text('Football \nManager', 320, 725);
  }
  if (!isDancing1){
    fill(100, 140, 140);
    rect(400, 730, 70, 40);
    fill(0);
    textSize(16);
    text('Dance \nManager 1', 400, 725);
  } else {
    fill(140, 140, 100);
    rect(320, 730, 70, 40);
    fill(0);
    textSize(16);
    text('Dance \nManager 1', 400, 725);
  }
  if (!isDancing2){
    fill(100, 140, 140);
    rect(480, 730, 70, 40);
    fill(0);
    textSize(16);
    text('Dance \nManager 2', 480, 725);
  } else {
    fill(140, 140, 100);
    rect(320, 730, 70, 40);
    fill(0);
    textSize(16);
    text('Dance \nManager 2', 480, 725);
  }
  fill(100, 140, 140);
  rect(560, 730, 70, 40);
  fill(0);
  textSize(16);
  text('Clear', 560, 735);
  textSize(18);
  text('Animation Mode', 220, 775);
  //instructional images
  image(space, 25, 110, 220, 45);
  image(deletePic, 12, 175, 240, 40);
  image(mouse, 25, 225, 200, 135);
  image(select, 25, 370, 200, 135);
  image(clickDrag, 25, 530, 200, 135);
  image(animationPic, 25, 0, 220, 120);}

//Press Delete to delete a shape
function keyTyped() {
  if (key === " ") {
    for (var i = 0; i < squares.length; i++) {
      squares[i].locked = false;
    }
    //make a new square
    var wpg = [];
    var s = new Square(mouseX, mouseY, wpg);
    s.addWaypoint(mouseX, mouseY, s.c);
    squares.push(s);
    squares1.push(s);
  } else if (keyCode === BACKSPACE) {
  		for (var i = squares.length - 1; i >= 0; i--) {
        	if (squares[i].locked && squares[i].hover) {
          		squares.splice(i, 1);
        	} 
        	for (var j = squares[i].waypointgroup.length - 1; j >= 0; j--) {
        		if (squares[i].waypointgroup[j].locked && squares[i].waypointgroup[j].hover) {
        			squares[i].waypointgroup.splice(j, 1);
        		}
        	}
        }
        for (var i = waypoints.length - 1; i >= 0; i--) {
        	if (waypoints[i].locked && waypoints[i].hover) {
          		waypoints.splice(i, 1);
        	} 
        }
	}
}

function mousePressed() {
  //if it's the left mouse button
  if (mouseButton == LEFT) {
    //if the mouse is on the animate button when you left click, unlock and animate everything
    if (mouseX < 140 && mouseX > 20 && mouseY > 680 && mouseY < 750 && squares.length > 0) {
    	isAnimating = !isAnimating;
      	if (!isAnimating) {
        	for (var i = 0; i < squares.length; i++) {
          		squares[i].x = squares[i].waypointgroup[0].x;
          		squares[i].y = squares[i].waypointgroup[0].y;
        		}
      	}
      for (var i = 0; i < squares.length; i++) {
      	squares[i].whichWaypoint = 0;
        squares[i].locked = false;
        squares[i].animating = !squares[i].animating;
      }
    } else if (mouseX < 270 && mouseX > 170 && mouseY > 705 && mouseY < 755) {
    	isInfinite = !isInfinite;
    } else if (mouseX < 345 && mouseX > 275 && mouseY > 705 && mouseY < 755) {
      isFootball = !isFootball;
      isDancing1 = false;
      isDancing2 = false;
    } else if (mouseX < 435 && mouseX > 365 && mouseY > 705 && mouseY < 755) {
      isDancing1 = !isDancing1;
      isFootball = false;
      isDancing2 = false;
    } else if (mouseX < 505 && mouseX > 455 && mouseY > 705 && mouseY < 755) {
      isDancing2 = !isDancing2;
      isFootball = false;
      isDancing1 = false;
    } else if (mouseX < 595 && mouseX > 525 && mouseY > 705 && mouseY < 755) {
        for (var i = squares.length - 1; i >= 0; i--) {
          squares.splice(i, 1);
        } 
        isAnimating = false;
        isInfinite = false;
        isHovering = false;
        isFootball = false;
        isDancing1 = false;
        isDancing2 = false;
    //otherwise, create a new waypoint for the square that's selected
    } else if (!isHoveringSquare && !isHoveringWaypoint) {
      for (var i = 0; i < squares.length; i++) {
        if (squares[i].locked) {
          squares[i].addWaypoint(mouseX, mouseY);
          //or select a different square
        } else if (squares[i].hover) {
          for (var j = 0; j < squares.length; j++) {
            squares[j].locked = false;
          }
          squares[i].locked = true;
        }
      }
    } else if (isHoveringSquare) {
      for (var i = 0; i < squares.length; i++) {
        squares[i].locked = false;
        for (var j = 0; j < squares[i].waypointgroup.length; j++){
          if (squares[i].waypointgroup[j].hover){
            squares[i].waypointgroup[j].locked = true;
          }
        }
        if (squares[i].hover) {
          squares[i].locked = true;
        }
      }
    }
  } 
}

//when the mouse is dragged, it drags the shapes that are locked and you're hovering over
function mouseDragged() {
  for (var i = 0; i < squares.length; i++) {
    if (squares[i].locked && squares[i].hover) {
      squares[i].x = mouseX;
      squares[i].y = mouseY;
    }
  }
  for (var j = 0; j < waypoints.length; j++) {
    if (waypoints[j].hover && waypoints[j].locked && !isHoveringSquare) {
      waypoints[j].x = mouseX;
      waypoints[j].y = mouseY;
    }
  }
}

//Waypoint class
function Waypoint(x, y, col) {

  this.x = x;
  this.y = y;
  this.diameter = 10;
  this.locked = false;
  this.animating = false;
  this.c = col;
  this.hover = false;

  this.display = function() {
    if (mouseX > this.x - this.diameter && mouseX < this.x + this.diameter && 
      mouseY > this.y - this.diameter && mouseY < this.y + this.diameter) {
      this.hover = true;
      waypoints[0] = this;
    } else {
      this.hover = false;
    }
    if (isAnimating) {
      fill(100, 155, 100);
    } else if (this.locked) {
      fill(177);
    } else {
      fill(this.c);
    }
    if (this.hover) {
      stroke(1);
    } else {
      noStroke();
    }
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}

//Square class
function Square(x, y, wpg) {

  this.x = x;
  this.y = y;
  this.waypointgroup = wpg;
  this.squareWidth = 20;
  this.hover = false;
  this.locked = true;
  this.animating = false;
  this.whichWaypoint = 0;
  this.distance = 0;
  this.distanceGone = 0;
  this.c = color(random(255), random(100), random(255));

  this.display = function() {
    if (this.animating) {
      this.animate();
    }
    if (mouseX > this.x - this.squareWidth && mouseX < this.x + this.squareWidth && 
      mouseY > this.y - this.squareWidth && mouseY < this.y + this.squareWidth) {
      this.hover = true;
      squares1[0] = this;
    } else {
      this.hover = false;
    }
    for (var i = this.waypointgroup.length - 1; i >= 0; i--) {
        if (this.animating) {
          noStroke();
        } else {
          	this.waypointgroup[i].display();
          	var j = i + 1;
      		if (j <= this.waypointgroup.length - 1) {
          		stroke(1);  
       			line(this.waypointgroup[j].x, this.waypointgroup[j].y, this.waypointgroup[i].x, this.waypointgroup[i].y);
    		}
    	}
    }
    if (this.hover) {
      stroke(1);
    } else {
      noStroke();
    }
    if (this.locked) {
      fill(177); 
      for (var i = 0; i < this.waypointgroup.length; i++) {
        this.waypointgroup[i].locked = true;
      }
    } else {
      fill(this.c);
      for (var i = 0; i < this.waypointgroup.length; i++) {
        this.waypointgroup[i].locked = false;
      }
    }
    rect(this.x, this.y, this.squareWidth, this.squareWidth);
  }

  this.animate = function() {
    if (this.whichWaypoint >= this.waypointgroup.length) {
      this.animating = false;
      if (isInfinite){
      	this.whichWaypoint = 0;
  		}
    } else {
      this.x = lerp(this.x, this.waypointgroup[this.whichWaypoint].x, .1);
      this.y = lerp(this.y, this.waypointgroup[this.whichWaypoint].y, .1);
      if (this.x > this.waypointgroup[this.whichWaypoint].x - 10 && this.x < this.waypointgroup[this.whichWaypoint].x + 10 &&
        this.y > this.waypointgroup[this.whichWaypoint].y - 10 && this.y < this.waypointgroup[this.whichWaypoint].y + 10) {
        this.whichWaypoint++;
      }
    }
    if (isAnimating){
		this.animating = true;
	} else {
		this.animating = false;
	}
 }

  this.addWaypoint = function(x, y) {
    var w = new Waypoint(x, y, this.c)
    this.waypointgroup.push(w);
    waypoints.push(w);
  }
}
