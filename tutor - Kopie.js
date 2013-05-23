// tutor.js - Javascript canvas, animation, and boids tutorial.
// 	Mike Gleicher, Sept 3, 2012
//	this file will "evolve" as you check out different versions
//	(it starts with revision 3, since HG numbers all versions of the project)


// note: I am choosing to do this as an "onload" function for the
// window (so it gets run when the window is done loading), rather 
// than as a function of the canvas.
window.onload = function() {
	// I am putting my "Application object" inside this function
	// which might be a little bit inelegant, but it works
	
	// figure out what the "requestAnimationFrame" function is called
	// the problem is that different browsers call it differently
	// if we don't have it at all, just use setTimeout
	var reqFrame =window.requestAnimationFrame ||
	          window.webkitRequestAnimationFrame ||
	          window.mozRequestAnimationFrame ||
	          window.oRequestAnimationFrame ||
	          window.msRequestAnimationFrame ||
	          function(/* function FrameRequestCallback */ callback, /* DOMElement Element */ element){
	            window.setTimeout(callback, 1000 / 60);
				};
	
	
	// "application" level variables (not totally global, but used by all
	// of the functions defined inside this function
	// get the canvas (assumes that its there)
	var theCanvas = document.getElementById("mycanvas");
	var theContext = theCanvas.getContext("2d");
	// these are effectively the constants
	var genericColour = "#FFFF00";		// yellow fill
	var genericStroke = "#000000";		// black outline
	var circ = Math.PI*2;			// complete circle
	
	// make everything go the same speed
	// Marios: This is where I'm dumping any new parameters
	var genericSpeed = 4.0; // this is just the speed at which I want to initialise all my Balls
	var genericRadius = 1; // this is just the radius at which I want to initialise all my Balls
	// radius only effects interactions with the wall!
//	var ali = 10; // alignment parameter - between 0 and 1	

	var perceptionRange = 10;
	var directionIndicatorLength = perceptionRange;	
	var perceptionRangeSquared = perceptionRange*perceptionRange;
	var initialPopulation = 40;
	
	var RepCoeff = 1;
	var AliCoeff = 1; 
	var CohCoeff = 0;
	
	
	// note - am assuming canvas won't change size!!
	var pigeonholeWidth = Math.ceil(theCanvas.width/perceptionRange);
	var pigeonholeHeight = Math.ceil(theCanvas.height/perceptionRange);
	
	// Semaphore variable to add agent
	var addAgent = false;
	var addAgentX = 0;
	var addAgentY = 0;
	
	// create a prototype ball
	// this is a slightly weird way to make an object, but it's very
	// javascripty
	var aBall = {
		"x" : 100,
		"y" : 100,
		"vX" : 10,
		"vY" : 10,
		"pigeon" : 0, // pigeonhole
		"speed" : genericSpeed,
		"radius" : genericRadius,
		"colour" : genericColour,
		"stroke" : genericStroke,
		
		draw : function() {
			theContext.strokeStyle = "#728FCE";
//			theContext.fillStyle = this.colour;
			theContext.beginPath();
			theContext.arc(this.x,this.y,perceptionRange,0,circ,true);
			theContext.moveTo(this.x,this.y);
			theContext.lineTo(this.x + directionIndicatorLength*this.vX/this.speed, this.y + directionIndicatorLength*this.vY/this.speed);
			theContext.closePath();
			theContext.stroke();
//			theContext.fill();			
		},
		
		// make 'em "bounce" when they go over the edge
		// no loss of velocity
		move: function() {
		// Marios: I think there's at least one bug here which allows particles to get stuck in the wall
			this.x += this.vX;
			this.y += this.vY;
			
			// Marios: Wouldn't need to check velocity if you could *only* hit the wall when moving in that direction
			
			// Marios: Could remove wall issues by using toroidal space 
			
			// Marios: My modifications implicitly assume you won't *appear* in the wall
			
			// Marios: Minor unnecessary optimisation - only checks for Upper penetration in an axis
			// if Lower penetration has not occurred
			
			var penetrationUpper = this.x + this.radius - theCanvas.width;
			var penetrationLower = this.radius - this.x;			
			if (penetrationUpper > 0) {
				this.vX = -this.vX;
				this.x -= 2*penetrationUpper;
			} // mutually exclusive events 
			// ASSUMES RADIUS SMALLER THAN HALF THE SCREEN
			else if	(penetrationLower > 0) {
				this.vX = -this.vX;
				this.x += 2*penetrationLower;
			}			
			
			
			penetrationUpper = this.y + this.radius - theCanvas.height;
			penetrationLower = this.radius - this.y;	
			if (penetrationUpper > 0) {			
				this.vY = -this.vY;
				this.y -= 2*penetrationUpper;
			}
			else if (penetrationLower > 0) {
				this.vY = -this.vY;
				this.y += 2*penetrationLower;
			}
		},
		
		// normalize the velocity to the given speed
		// if your velocity is zero, make a random velocity
		norm: function () {
		// Marios: Horrible!
			var z = Math.sqrt(this.vX * this.vX + this.vY * this.vY );
			if (z<.001) {
				//Marios: Note - very unlikely to enter this loop ... but still
				
				var randomAngleInRadians = Math.random()*Math.PI*2;
				this.vX = Math.cos(randomAngleInRadians) * this.speed;
				this.vY = Math.sin(randomAngleInRadians) * this.speed;
				
				
			} else {
				z = this.speed / z;
				this.vX *= z;
				this.vY *= z;
			}
		}
	};
	
	// this is so Javascripty it makes my head hurt:
	// to create a new Ball object, we make a new empty object
	// and set its prototype to be the first ball
	// (we probably could use create as well)
	// then we set some other stuff if we want
	function makeBall(x,y, vX, vY, radius, colour, stroke) {

		// Ugly Javascript object instantiation
		Empty = function () {};
		Empty.prototype = aBall;	
		ball = new Empty();
		
		// Prevent balls from being created overlapping with walls
		x = Math.min( Math.max(x , radius) , (theCanvas.width-radius));
		y = Math.min( Math.max(y , radius) , (theCanvas.height-radius));
		
		ball.x = x;
		ball.y = y;
		ball.vX = vX;
		ball.vY = vY;
		ball.radius = radius;
		ball.colour = colour;
		ball.stroke = stroke;
		
		// make Ball note which pigeonhole it is in
		ball.pigeon = Math.floor(x/perceptionRange) + (Math.floor(y/perceptionRange))*pigeonholeWidth;
		// 0 : pigeonholeWidth*pigeonholeHeight-1
		
		// add ball to pigeonhole
		// 0 : pigeonholeWidth*pigeonholeHeight-1
		// Assumes Balls are *always* added instantly after creation *and* that they are always added at the end
		PigeonHoles[ball.pigeon].push(theBalls.length);			
		
		return ball;
	}
	

	// this function will do the drawing
	function drawBalls() {
		// clear the window
		theContext.clearRect(0, 0, theCanvas.width, theCanvas.height);
		// draw the balls - too bad we can't use for i in theBalls
		for (var i=0; i<theBalls.length; i++) {
			theBalls[i].draw();
		}
	}
	
	
	// bouncing behavior - if two balls are on top of each other,
	// have them react in a simple way
	// this assumes that everything has the same radius as the prototype
	function bounce(ballList) {	
		var rad = 0;
//		var rad = 2 * radius;
		// rad = rad*rad;
		
		for(var i=ballList.length-1; i>=0; i--) {
			var bi = ballList[i];
			var bix = bi.x;
			var biy = bi.y;
			// notice that we do the n^2 checks here, slightly painful
			for(var j=i-1; j>=0; j--) {
				rad = ballList[i].radius + ballList[j].radius;
				rad *= rad;
				var bj = ballList[j];
				var bjx = bj.x;
				var bjy = bj.y;
				var dx = bjx - bix;
				var dy = bjy - biy;
				var d = dx*dx+dy*dy;
				if (d < rad) {
					bj.vX = dy;
					bj.vY = dx;
					bi.vX = -dx;
					bi.vY = -dy;
				}
			}
		}
	}
	
	
// TESTFUNCTION!!!!!!
	// Reynold's like alignment
	// each boid tries to make it's velocity to be similar to its neighbors
	// recipricol falloff in weight (allignment parameter + d
	// this assumes the velocities will be renormalized
	function Oldalign(ballList)
	{
	// Marios: Some pretty terrible purpose commenting here!
		//var ali = 0.6; // alignment parameter - between 0 and 1
		
		// make temp arrays to store results
		// this is inefficient, but the goal here is to make it work first
		// var newVX = new Array(ballList.length);
		// var newVY = new Array(ballList.length);
		
		var newVX2 = [];
		var newVY2 = [];
		i = ballList.length;
		while (i--) {
			newVX2[i] = 0;
			newVY2[i] = 0;			
		}
		
		// do the n^2 loop over all pairs, and sum up the contribution of each
		for(var i=ballList.length-1; i>=0; i--) {
			var bi = ballList[i];
			var bix = bi.x;
			var biy = bi.y;
			
			// changed ali to be a weighting parameter on self-contribution!
			newVX2[i] += bi.vX;
			newVY2[i] += bi.vY;

			// Marios: This section right here is why it crashes if
			// the alignment parameter (ali) is set to 0 (as you can later on)
			// The code should considers the contribution of the flight direction
			// of all other boids within some radius/weighted by distance
			// but it actually includes itself (whem i==j) so if you set ali to 0
			// you get a Divide By Zero error
			
			pigeonX = bi.pigeon%pigeonholeWidth; // 0 : pigeonholeWidth - 1
			pigeonY = Math.floor(bi.pigeon/pigeonholeWidth); // 0 : pigeonholeHeight -1??
			
			// loop through the 9 tiles without trying access tiles that are outside of the canvas
			for(var holeX = Math.min(pigeonX+1,pigeonholeWidth-1); holeX>= Math.max(pigeonX-1,0); holeX--) {
			
				for(var holeY = Math.min(pigeonY+1,pigeonholeHeight-1); holeY>= Math.max(pigeonY-1,0); holeY--) {
				
					pigeonhole = holeX + pigeonholeWidth*holeY;
					// now iterate through the Balls in this pigeon if any
					for(var interactant = PigeonHoles[pigeonhole].length-1; interactant>=0; interactant--) {
		//				alert("random statement");
	//					alert(interactant);
						j = PigeonHoles[pigeonhole][interactant];
						// here is where you'd add an if statement to cut work in half!
						if(i>j) {
						// test if within perceptionRange
							var bj = ballList[j];						
							var dx = bj.x - bix;
							var dy = bj.y - biy;
							if ( (dx*dx + dy*dy) <= perceptionRangeSquared ) {
							// add to the weighted sum
								newVX2[i] += bj.vX;
								newVY2[i] += bj.vY;			
								// by symmetry
								newVX2[j] += bi.vX;
								newVY2[j] += bi.vY;	

							}
						}
					}
				}
			}
		}
		
		
		// compare results to validate new code!
		

		
		// var screwed = false;
		

		// if(newVX.length !== newVX2.length) {
			// screwed = true;
			// console.log("newVX.length !== newVX2.length");
		// }
		// for(var j = newVX.length; j--;) {
			// if( (newVX[j] - newVX2[j]) > .001) {
				// screwed = true;
				// console.log(newVX[j] - newVX2[j]);
				// console.log(j);
			// }
		// }

		// if(newVY.length !== newVY2.length) {
			// screwed = true;
			// console.log("newVY.length !== newVY2.length");
		// }
		// for(var j = newVY.length; j--;) {
			// if( (newVY[j] - newVY2[j]) > .001) {
				// screwed = true;
				// console.log(newVY[j] - newVY2[j]);
				// console.log(j);
			// }
		// }
		
		// if (screwed) {
    		// console.log(screwed);
			// debugger;
        // }    
		
		for(var i=ballList.length-1; i>=0; i--) {
			ballList[i].vX = newVX2[i];
			ballList[i].vY = newVY2[i];
		}		
		
	//	debugger;
		
	}	
	

	// Reynold's like alignment
	// each boid tries to make it's velocity to be similar to its neighbors
	// recipricol falloff in weight (allignment parameter + d
	// this assumes the velocities will be renormalized
	function createInteractionList(ballList)
	{
		
		// clean InteractionList array of arrays!
		InteractionList = new Array();
		// 600 array positions
		for (var i=0; i<ballList.length; i++) {
			InteractionList[i] = new Array();
		}			
		

		for(var i=ballList.length-1; i>=0; i--) {
			var bi = ballList[i];
			var bix = bi.x;
			var biy = bi.y;
					
			pigeonX = bi.pigeon%pigeonholeWidth; // 0 : pigeonholeWidth - 1
			pigeonY = Math.floor(bi.pigeon/pigeonholeWidth); // 0 : pigeonholeHeight -1??

			// loop through the 9 tiles without trying access tiles that are outside of the canvas
			for(var holeX = Math.min(pigeonX+1,pigeonholeWidth-1); holeX>= Math.max(pigeonX-1,0); holeX--) {
			
				for(var holeY = Math.min(pigeonY+1,pigeonholeHeight-1); holeY>= Math.max(pigeonY-1,0); holeY--) {
				
					pigeonhole = holeX + pigeonholeWidth*holeY;
					// now iterate through the Balls in this pigeon if any
					for(var interactant = PigeonHoles[pigeonhole].length-1; interactant>=0; interactant--) {

						j = PigeonHoles[pigeonhole][interactant];
						// here is where you'd add an if statement to cut work in half!
						if(j!=i) { // j>i
						// test if within perceptionRange
							var bj = ballList[j];						
							var dx = bj.x - bix;
							var dy = bj.y - biy;
							if ( (dx*dx + dy*dy) <= perceptionRangeSquared ) {
								
								InteractionList[i].push(j);
								
							}
						}
					}
				}
			}
		}		
	}
	
	
	
	function applyRules(ballList,InteractionList)	
	{

		
		for(var interactor1 = ballList.length-1; interactor1>=0; interactor1--) {	
		
			// add your own velocity
			var bi = ballList[interactor1];		
			
			// initialises the new velocity array!
			newVX[interactor1] = bi.vX;
			newVY[interactor1] = bi.vY;			

			// will probably remove this crude weighting!
			
			AlignmentX = 0;
			AlignmentY = 0;
			
			CohesionX = 0;
			CohesionY = 0;
			
			RepulsionX = 0;
			RepulsionY = 0;
			
			// TOO CLEVER - USING SYMMETRY MAKES OTHER STUFF HARDER!
			
			Interactions = InteractionList[interactor1].length;

			if (Interactions > 0) {
			
				for(var j = Interactions-1; j>=0; j--) {	

					interactor2 = InteractionList[interactor1][j];
					var bj = ballList[interactor2];

					// Repulsion: steer to avoid crowding local flockmates
					
					var bxs = bi.x - bj.x;
					var bys = bi.y - bj.y;
					var invdistsq = 4/(1 + bxs*bxs + bys*bys);

					// vector from j to i weighted by inverse square distance
					RepulsionX += bxs*invdistsq;
					RepulsionY += bys*invdistsq;
					
					// newVX[interactor1] += bxs;
					// newVY[interactor1] += bys;

					// newVX[interactor2] -= bxs;
					// newVY[interactor2] -= bys;					
					
					// Alignment: steer towards the average heading of local flockmates
					// add to the sum
					
					AlignmentX += bj.vX;
					AlignmentY += bj.vY;
					
					// newVX[interactor1] += bj.vX;
					// newVY[interactor1] += bj.vY;			
					// by symmetry
					// newVX[interactor2] += bi.vX;
					// newVY[interactor2] += bi.vY;			
					
					// Cohesion: steer to move toward the average position of local flockmates
					
					// vector from i to j
					CohesionX -= bxs;
					CohesionY -= bys;
					
				}
			
				// preparing these vectors for separate representation!
				// all of these defined as mean
				RepulsionX /= Interactions;				
				RepulsionY /= Interactions;
				AlignmentX /= Interactions;
				AlignmentY /= Interactions;
				CohesionX  /= Interactions;
				CohesionY  /= Interactions;				
				
			
				newVX[interactor1] += RepCoeff*RepulsionX + AliCoeff*AlignmentX + CohCoeff*CohesionX;
				newVY[interactor1] += RepCoeff*RepulsionY + AliCoeff*AlignmentY + CohCoeff*CohesionY;				
				
				
			}
			
			
			
			
			
		}		

		



	}
	
	
	
	
	
	
	// move the balls
	function moveBalls() {

		// what can interact with what
		createInteractionList(theBalls);

		// for(var i=theBalls.length-1; i>=0; i--) {		
			// var bi = theBalls[i];		

			// // initialises the new velocity array!
			// newVX[i] = bi.vX*ali;
			// newVY[i] = bi.vY*ali;		
		// }			
		
		// PUT YOUR RULE FUNCTIONS HERE
		applyRules(theBalls,InteractionList);
	//	bounce(theBalls);	
	
		// confirms update!
		for(var i=theBalls.length-1; i>=0; i--) {
			var nvx = newVX[i];
			var nvy = newVY[i];
			// any chance of zero velocity?
			var z = Math.sqrt(nvx*nvx + nvy*nvy);
			if (z<.001) {
				//Marios: Note - very unlikely to enter this loop ... but still
				
				var randomAngleInRadians = Math.random()*Math.PI*2;
				theBalls[i].vX = Math.cos(randomAngleInRadians) * theBalls[i].speed;
				theBalls[i].vY = Math.sin(randomAngleInRadians) * theBalls[i].speed;
				
			}
			else {				
				normalisingCoefficient = theBalls[i].speed/z;
				theBalls[i].vX = nvx*normalisingCoefficient;
				theBalls[i].vY = nvy*normalisingCoefficient;
			}
		}				
	
		// clean array
		PigeonHoles = new Array();
		// 600 array positions
		for (var i=pigeonholeWidth*pigeonholeHeight-1; i>=0; i--) {
			PigeonHoles[i] = new Array();
		}		
	

		for(var i=theBalls.length-1; i>=0; i--) {
			theBalls[i].move();

			pigeonIndex = Math.floor(theBalls[i].x/perceptionRange)+Math.floor(theBalls[i].y/perceptionRange)*pigeonholeWidth;
			PigeonHoles[pigeonIndex].push(i);	
			theBalls[i].pigeon = pigeonIndex;		
		}
		
		
		// Note - this prevents new agent creation in the middle of a cycle
		// Downside, reduces user agency noticeably (creation latency)!
		
		if (addAgent) {
			
			var randomAngleInRadians = Math.random()*Math.PI*2;
			b = makeBall( addAgentX, addAgentY, Math.cos(randomAngleInRadians) * genericSpeed, Math.sin(randomAngleInRadians) * genericSpeed, Math.random()*5+1, genericColour, genericStroke );
			theBalls.push(b)

			addAgent = false;
		}

	}
	
	// what to do when things get clicked
	function doClick(evt){
		// a catch - we need to adjust for where the canvas is!
		// this is quite ugly without some degree of support from
		// a library
								
		addAgent = true;
		addAgentX = evt.pageX - theCanvas.offsetLeft;
		addAgentY = evt.pageY - theCanvas.offsetTop;
						
	}

	
	// what we need to do is define a function that updates the position
	// draws, then schedules another iteration in the future
	// WARNING: this is the simplest, but not the best, way to do this
	function drawLoop() {
		moveBalls();	// new position
		drawBalls();	// show things
		reqFrame(drawLoop);	// call us again in 20ms
		// print number of Balls

		// Jquery code to display number of Balls beneath canvas
		var x = document.getElementById("canvas_info");
		if ( !x)
		{
			var div = '<div id = "canvas_info"></div>';
			$("body").append(div);
		}		
		$("#canvas_info").html(theBalls.length);

	}
	
	
	
	
	
	// CONFUSING IMPLICIT MAIN FUNCTION!
	// make an array of balls
	theBalls = [];
	// create an array of pigeonholes
	PigeonHoles = [];
	// create the interaction list array;
	InteractionList = [];

	// temp velocity variables
	var newVX = [];
	var newVY = [];	
		
	for (var i=0; i<pigeonholeWidth*pigeonholeHeight; i++) {
	// 0 : pigeonholeWidth*pigeonholeHeight-1	
		PigeonHoles[i] = new Array();
	}
	
	// create initialPopulation Balls
	for (var i=0; i<initialPopulation; i++) {
	
		var randomAngleInRadians = Math.random()*Math.PI*2;

		b = makeBall( 50+Math.random()*500, 50+Math.random()*300, Math.cos(randomAngleInRadians) * genericSpeed, Math.sin(randomAngleInRadians) * genericSpeed, Math.random()*5+1, genericColour, genericStroke );
		theBalls.push(b);
		
	}

	theCanvas.addEventListener("mousemove",doClick,false);	
	drawLoop();
}