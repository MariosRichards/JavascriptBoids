Boid = {};

var BoidAgents       = [];
// Boid.Players         = [];

// Boid.Player = function(name, id ){
	// var self = this;
	// this.name = name;
	// this.id = null;
	// this.inputmethod = "Keyboard";
	// this.balls = [];
	// /*this.add_ball = function(ball)
	// {
		// ball.parent = player;
		// player.balls.push(ball);
		// if(self.thePlayers.length===0)
		// {
			// player.name="Player1";
			// self.theBalls.push(ball);
		// }
		// if(self.thePlayers.length===1)
		// {
			// player.name="Player2";
			// self.theBalls.push(ball);
		// }
	// }*/
	// this.init = function()
	// {
		// document.onkeydown = self.input;
		// self.id = Boid.Players.length;
		// Boid.Player.push(self);
	// }

	// this.input = function(event)
	// {
		// switch(this.input)
		// {
			// case "Mouse": break;
			// case "Keyboard":
				// switch(event.keyCode)
				// {
					// case 37: self.theBalls[2].x -= 60; console.log(x); break;
					// case 38: this.y -=5; console.log(y); break;
					// case 39: this.x +=5; console.log(x); break;
					// case 40: this.y +=5; console.log(y); break;
					// default:
						 // console.log(event.keyCode);
					// break;
				// }break;
			// default: break;
		// }
	// }
	// self.init();
// }



Boid.Agent = function()
{

	// shim layer with setTimeout fallback
	reqFrame =window.requestAnimationFrame ||
	          window.webkitRequestAnimationFrame ||
	          window.mozRequestAnimationFrame ||
	          window.oRequestAnimationFrame ||
	          window.msRequestAnimationFrame ||
	          function(/* function FrameRequestCallback */ callback, /* DOMElement Element */ element){
	            window.setTimeout(callback, 1000 / 60);
				};


	this.running;
	this.restartNow = 0;
	
	// wall function choice
	// 0 = Hard Bounce
	// 1 = toroidal (no walls)
	// 2 = Repulsion
	
	// WARNING: WALL COLLISION PLACES A CONSTRAINT ON MAXIMUM SPEED OF 1/4 PERCEPTION RANGE
	// WHY 1/4?
	var wallCollision = 0;
	var wallRepulsion = 100;
	// use negative indices to refer to objects
	var wallLeft = -1;// -1 = left wall
	var wallRight = -2;// -2 = right wall
	var wallTop = -3;// -3 = upper wall
	var wallBottom = -4;// -4 = lower wall
	
	

	
	
	

	

// PLAYER STUFF
	this.numberPlayers= 2;
	this.thePlayers = [];


	var self = this;
	this.id   = null;

	
	this.theBalls = [];
	// create an array of pigeonholes
	this.PigeonHoles = [];
	// create the interaction list array;
	this.InteractionList = [];
	// temp velocity variables
	var newVX = [];
	var newVY = [];
	this.theCanvas = document.getElementById("mycanvas");
	this.theContext = this.theCanvas.getContext("2d");
	// these are effectively the constants	
	var theCanvas   = this.theCanvas;
	var theContext  = this.theContext;
	
    // Semaphore variable to add agent
    this.addAgent = false;
    this.addAgentX = 0;
    this.addAgentY = 0;	

	this.genericStroke = "#728FCE";        // steel blue outline
	this.circ = Math.PI*2;            // complete circle
	var circ = this.circ;

 
	
	
	
	
	// Rule coefficients
	this.RepCoeff  = 1; // repulsion coefficient
    this.AliCoeff  = 1;	// alignment coefficient
	this.CohCoeff  = 0;	// cohesion coefficient	



	
	
	var Obstacles = 0; // turn obstacle interaction on(1)/off(0)
	// obstacle is a circle
	var obstacleRadius = 20;
	var obstacleX = theCanvas.width/2;
	var obstacleY = theCanvas.height/2;
	var obstacleIndex = -5;
	var obstacleRepulsion =100;
	
	
	var Objects = 1; // Objects turned on
	var objectX = [];
	var objectY = [];
	var numObjects = 0;
	var objectIndex = [];
	var objectPigeonhole = [];
	
	
	

	// make everything go the same speed
	// Marios: This is where I'm dumping any new parameters


	this.perceptionRange = 100;
	var perceptionRange = this.perceptionRange;

	this.perceptionRangeSquared = this.perceptionRange*this.perceptionRange;
	this.directionIndicatorLength = this.perceptionRange;
	var directionIndicatorLength = this.directionIndicatorLength;
	
	this.genericRadius = perceptionRange; // this is just the radius at which I want to initialise all my Balls	
	this.genericSpeed = perceptionRange/4;
	//perceptionRange/2; // this is just the speed at which I want to initialise all my Balls	
	
	this.initialPopulation = 1;

   // note - am assuming canvas won't change size!!
    this.pigeonholeWidth = Math.ceil(this.theCanvas.width/this.perceptionRange);
    this.pigeonholeHeight = Math.ceil(this.theCanvas.height/this.perceptionRange);

	this.newInitialPopulation = this.initialPopulation;
	this.newGenericSpeed = this.genericSpeed;
	this.newPerceptionRange = this.perceptionRange;
	this.newWallCollision = wallCollision;
	this.newObstacles = Obstacles;
	



    this.aBall = {
        x : 100,
        y : 100,
        vX : 10,
        vY : 10,
        pigeon : 0, // pigeonhole
        speed : self.genericSpeed,
        radius : self.genericRadius,
        //colour : self.genericColour,
        stroke : self.genericStroke,

        draw : function() {
            theContext.strokeStyle = this.stroke;
            theContext.beginPath();
            theContext.arc(this.x,this.y, self.perceptionRange,0, circ,true);
            theContext.moveTo(this.x,this.y);
            theContext.lineTo(this.x + self.directionIndicatorLength*this.vX/this.speed, this.y + self.directionIndicatorLength*this.vY/this.speed);
            theContext.closePath();
            theContext.stroke();
        },

        // make 'em "bounce" when they go over the edge
        // no loss of velocity
        move: function() {
            this.x += this.vX;
            this.y += this.vY;

            // Marios: Wouldn't need to check velocity if you could *only* hit the wall when moving in that direction
            // Marios: Could remove wall issues by using wallCollision space
            // Marios: My modifications implicitly assume you won't *appear* in the wall
            // Marios: Minor unnecessary optimisation - only checks for Upper penetration in an axis
            // if Lower penetration has not occurred

			if (wallCollision==1) // toroidal
			{
			// Note - this ignores radius
				this.x = (this.x+theCanvas.width)%theCanvas.width;
				this.y = (this.y+theCanvas.height)%theCanvas.height;

			}
			else if (wallCollision==0) // hard bounce
			{

				var penetrationUpper = this.x + this.radius - theCanvas.width;
				var penetrationLower = this.radius - this.x;
				if (penetrationUpper > 0) {
					this.vX = -this.vX;
					this.x -= 2*penetrationUpper;
				} // mutually exclusive events
				// ASSUMES RADIUS SMALLER THAN HALF THE SCREEN
				else if    (penetrationLower > 0) {
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
			}
			else // repulsion
			{
			}
        }

    };





	this.addBall = function()
    {
		self.addAgent = true;
    }

	this.makeBall = function(x, y, vX, vY, speed, radius, stroke) {

        var theCanvas = this.theCanvas;

        // Ugly Javascript object instantiation
        Empty = function () {};
        Empty.prototype = this.aBall;
        var ball = new Empty();

        // Prevent balls from being created overlapping with walls
        x = Math.min( Math.max(x , radius) , (theCanvas.width-radius));
        y = Math.min( Math.max(y , radius) , (theCanvas.height-radius));
		
		// Prevent balls from being created inside obstacles
		// ugly random positioning solution!
		if (Obstacles==1)
		{
			// radius = Math.sqrt((obstacleX - x)*(obstacleX - x) + (obstacleY - y)*(obstacleY - y) );
			while ( Math.sqrt((obstacleX - x)*(obstacleX - x) + (obstacleY - y)*(obstacleY - y) ) < (obstacleRadius) )
			{

				x = Math.random()*theCanvas.width;
				y = Math.random()*theCanvas.height;
				
				x = Math.min( Math.max(x , radius) , (theCanvas.width-radius));
				y = Math.min( Math.max(y , radius) , (theCanvas.height-radius));				
						
				// radius = Math.sqrt((obstacleX - x)^2 + (obstacleY - y)^2 );
						
			}

		}
		

        ball.x = x;
        ball.y = y;
        ball.vX = vX;
        ball.vY = vY;
        ball.radius = radius;
//        ball.colour = colour;
        ball.stroke = stroke;
		ball.speed = speed;

        // make Ball note which pigeonhole it is in
        ball.pigeon = Math.floor(x/ this.perceptionRange) + (Math.floor(y/this.perceptionRange)) * this.pigeonholeWidth;
		
		if (ball.pigeon >= this.pigeonholeWidth*this.pigeonholeHeight || ball.pigeon <0)
		{
			debugger;
		}
		
        // 0 : pigeonholeWidth*pigeonholeHeight-1
        // add ball to pigeonhole
        // 0 : pigeonholeWidth*pigeonholeHeight-1
        // Assumes Balls are *always* added instantly after creation *and* that they are always added at the end

        this.PigeonHoles[ball.pigeon].push(this.theBalls.length);

        return ball;
    }



    // this function will do the drawing
    this.drawBalls = function() {
        // clear the window
        var theContext = self.theContext;
        theContext.clearRect(0, 0, theCanvas.width, theCanvas.height);
        // draw the balls - too bad we can't use for i in theBalls
        for (var i=self.theBalls.length-1; i>=0; i--) {
            self.theBalls[i].draw();
        }
		
		// draw obstacles
		if (Obstacles==1) {
		
            theContext.strokeStyle = "#FF0000";
            theContext.beginPath();
            theContext.arc(obstacleX,obstacleY, obstacleRadius,0, circ,true);
            theContext.closePath();
            theContext.stroke();

		}
		
		// draw objects
		if (Objects==1)
		{
			for (var obj = numObjects-1; obj>=0; obj--)
			{

				theContext.strokeStyle = "#00FF00";
				theContext.beginPath();
				theContext.arc(objectX[obj],objectY[obj], 1,0, circ,true);
				theContext.closePath();
				theContext.stroke();			
								
			}
		}
		
    }



    this.createInteractionList = function(ballList)
    {

        // clean InteractionList array of arrays!
        self.InteractionList = [];
        var InteractionList     = self.InteractionList;

        var pigeonholeWidth     = this.pigeonholeWidth;
        var pigeonholeHeight    = this.pigeonholeHeight;
        var pigeonhole, j, bi, bix, biy, pigeonX, pigeonY;
        // var PigeonHoles = self.PigeonHoles;

        // 600 array positions
        for(var i=ballList.length-1; i>=0; i--) {
            InteractionList[i] = new Array();
        }

        for(var i=ballList.length-1; i>=0; i--) {

            bi = ballList[i];
            bix = bi.x;
            biy = bi.y;

            pigeonX = bi.pigeon%pigeonholeWidth; // 0 : pigeonholeWidth-1
            pigeonY = Math.floor(bi.pigeon/pigeonholeWidth); // 0 : pigeonholeHeight -1??
			
			// Check for obstacles
			if (Obstacles==1)
			{
			
				if ( ((obstacleX - bix)*(obstacleX - bix) + (obstacleY - biy)*(obstacleY - biy)) < ((obstacleRadius + this.perceptionRange)*(obstacleRadius + this.perceptionRange)) )
				{
					InteractionList[i].push(obstacleIndex);
				}
				
			}
			

			
			
            // loop through the 9 tiles without trying access tiles that are outside of the canvas			
			if (wallCollision==1)
			{
				for(var holeX = pigeonX+1; holeX>= pigeonX-1; holeX--) {
				//	holeX = (holeX+pigeonholeWidth)%pigeonholeWidth;
					for(var holeY = pigeonY+1; holeY>= pigeonY-1; holeY--) {
						//holeY = (holeY+pigeonholeHeight)%pigeonholeHeight;
						
						pigeonhole = ((holeX+pigeonholeWidth)%pigeonholeWidth) + pigeonholeWidth*((holeY+pigeonholeHeight)%pigeonholeHeight);
						// now iterate through the Balls in this pigeon if any

						for(var interactant = self.PigeonHoles[pigeonhole].length-1; interactant>=0; interactant--) {

							j = self.PigeonHoles[pigeonhole][interactant];

							// here is where you'd add an if statement to cut work in half!
							if(j != i) { //

							// test if within perceptionRange
								var bj = ballList[j];
								var dx = bj.x - bix;
								var dy = bj.y - biy;
								
								if ( 2*Math.abs(dx) > theCanvas.width ) {
									dx = theCanvas.width - Math.abs(dx);
								}
								
								if ( 2*Math.abs(dy) > theCanvas.height ) {
									dy = theCanvas.height - Math.abs(dy);
								}								
									
								if ( (dx*dx + dy*dy) <= self.perceptionRangeSquared ) {
								   // debugger;
									InteractionList[i].push(j);
								}
							}
						}	
					}
				}
			}
			else if (wallCollision ==0)
			{		

				for(var holeX = Math.min(pigeonX+1,pigeonholeWidth-1); holeX>= Math.max(pigeonX-1,0); holeX--) {

					for(var holeY = Math.min(pigeonY+1,pigeonholeHeight-1); holeY>= Math.max(pigeonY-1,0); holeY--) {

						pigeonhole = holeX + pigeonholeWidth*holeY;
						// now iterate through the Balls in this pigeon if any
						for(var interactant = self.PigeonHoles[pigeonhole].length-1; interactant>=0; interactant--) {

							j = self.PigeonHoles[pigeonhole][interactant];

							// here is where you'd add an if statement to cut work in half!
							if(j != i) { //

								if (j<=-6)
								{

									var dx = objectX[-6-j] - bix;
									var dy = objectY[-6-j] - biy;
								
								}
								else
								{
							
									// test if within perceptionRange
									var bj = ballList[j];
									var dx = bj.x - bix;
									var dy = bj.y - biy;
									
								}
								if ( (dx*dx + dy*dy) <= self.perceptionRangeSquared ) {
									InteractionList[i].push(j);
								}
							}
						}
					}
				}
			}
			else //wallCollision==1 by repulsion
			{
			

				//var wallLeft = -1;// -1 = left wall
				//var wallRight = -2;// -2 = right wall
				//var wallTop = -3;// -3 = upper wall
				//var wallBottom = -4;// -4 = lower wall

				// left/right wall near?

				var penetrationUpper = bix + self.perceptionRange - this.theCanvas.width;
				var penetrationLower = self.perceptionRange - bix;
				if (penetrationUpper > 0) { // right wall
					
					InteractionList[i].push(wallRight);
					
					// this.vX = -this.vX;
					// this.x -= 2*penetrationUpper;
				} // mutually exclusive events
				// ASSUMES RADIUS SMALLER THAN HALF THE SCREEN
				else if (penetrationLower > 0) {
					
					InteractionList[i].push(wallLeft);
					
					// this.vX = -this.vX;
					// this.x += 2*penetrationLower;
				}

				penetrationUpper = biy + self.perceptionRange - this.theCanvas.height;
				penetrationLower = self.perceptionRange - biy;
				if (penetrationUpper > 0) {
				
					InteractionList[i].push(wallTop);
				
				
					// this.vY = -this.vY;
					// this.y -= 2*penetrationUpper;
				}
				else if (penetrationLower > 0) {
				
					InteractionList[i].push(wallBottom);
				
					// this.vY = -this.vY;
					// this.y += 2*penetrationLower;
				}				
				
				

				
				// upper/lower wall near?
				
			
				for(var holeX = Math.min(pigeonX+1,pigeonholeWidth-1); holeX>= Math.max(pigeonX-1,0); holeX--) {

					for(var holeY = Math.min(pigeonY+1,pigeonholeHeight-1); holeY>= Math.max(pigeonY-1,0); holeY--) {

						pigeonhole = holeX + pigeonholeWidth*holeY;
						// now iterate through the Balls in this pigeon if any
						for(var interactant = self.PigeonHoles[pigeonhole].length-1; interactant>=0; interactant--) {

							j = self.PigeonHoles[pigeonhole][interactant];

							// here is where you'd add an if statement to cut work in half!
							if(j != i) { //

							// test if within perceptionRange
								var bj = ballList[j];
								var dx = bj.x - bix;
								var dy = bj.y - biy;
								if ( (dx*dx + dy*dy) <= self.perceptionRangeSquared ) {
									InteractionList[i].push(j);
								}
							}
						}
					}
				}			
			}
			
		
			self.InteractionList = InteractionList;
        }
    }


    this.applyRules = function(ballList,InteractionList)
    {
		var InteractionList     = self.InteractionList;
		var interactor2;

        for(var interactor1 = ballList.length-1; interactor1>=0; interactor1--) {
		
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
		
		
			var Interactions = InteractionList[interactor1].length;
		
            // add your own velocity
			if (Interactions > 0) {
			
				for(var j = Interactions-1; j>=0; j--) {

					interactor2 = InteractionList[interactor1][j];
				
					if (wallCollision==2 && interactor2<0 && interactor2>-5) { //wall collision by repulsion

						// var wallLeft = -1;// -1 = left wall
						// var wallRight = -2;// -2 = right wall
						// var wallTop = -3;// -3 = upper wall
						// var wallBottom = -4;// -4 = lower wall					
						
						if (interactor2 ==-1) {
						
							var bxs = bi.x;
							RepulsionX += wallRepulsion*bxs/(1+Math.abs(bxs));
						
						}
						
						else if(interactor2 ==-2) {
						
							var bxs = bi.x - this.theCanvas.width;
							RepulsionX += wallRepulsion*bxs/(1+Math.abs(bxs));
						
						}
						
						else if(interactor2 ==-3) {		

							var bys = bi.y - this.theCanvas.height;
							RepulsionY += wallRepulsion*bys/(1+Math.abs(bys));
						
						}
						
						else if(interactor2 ==-4) {
						
							var bys = bi.y;
							RepulsionY += wallRepulsion*bys/(1+Math.abs(bys));
						
						}
						
						else
						{
							debugger;
						}
						
						break;
						//dreaded break command!
						// filthy filthy filthy
					}
					else if (Obstacles ==1 && interactor2==-5)
					{
						
							var bxs = bi.x-obstacleX;
							var bys = bi.y-obstacleY;							
							RepulsionX += obstacleRepulsion*bxs/(1+Math.abs(bxs));						
							RepulsionY += obstacleRepulsion*bys/(1+Math.abs(bys));						

					}
					else // interaction with another Ball
					{
						
						if (interactor2<=-6)
						{
						
							var bxs = bi.x - objectX[-6-interactor2] ;
							var bys = bi.y - objectY[-6-interactor2] ;
						
						}
						else
						{
							// test if within perceptionRange
							var bj = ballList[interactor2];
							var bxs = bi.x - bj.x;
							var bys = bi.y - bj.y;
							
						}						

						// Repulsion: steer to avoid crowding local flockmates
						
						if (wallCollision==1) { // toroidal wall collision
							if ( 2*Math.abs(bxs) > theCanvas.width ) {
								bxs = theCanvas.width - bxs;
							}
							
							if ( 2*Math.abs(bys) > theCanvas.height ) {
								bys = theCanvas.height - bys;
							}
						}
						
						if (interactor2<=-6)
						{
						
							var invdistsq = 4/(1 + bxs*bxs + bys*bys);

							// vector from j to i weighted by inverse square distance
							RepulsionX += 1000*bxs*invdistsq;
							RepulsionY += 1000*bys*invdistsq;

							// Alignment: steer towards the average heading of local flockmates
							// add to the sum
							
							// AlignmentX += bj.vX;
							// AlignmentY += bj.vY;
<<<<<<< HEAD
<<<<<<< HEAD

							// // Cohesion: steer to move toward the average position of local flockmates
							
							// // vector from i to j
							// CohesionX -= bxs*Math.sqrt(invdistsq);
							// CohesionY -= bys*Math.sqrt(invdistsq);
							
						}
						else // interacting with an agent
						{
							
							var invdistsq = 4/(1 + bxs*bxs + bys*bys);

							// vector from j to i weighted by inverse square distance
							RepulsionX += bxs*invdistsq;
							RepulsionY += bys*invdistsq;

							// Alignment: steer towards the average heading of local flockmates
							// add to the sum
							
							AlignmentX += bj.vX;
							AlignmentY += bj.vY;

=======

=======

>>>>>>> e078b4d6547a3fc0ddaa74388d0a369842c3ad39
							// // Cohesion: steer to move toward the average position of local flockmates
							
							// // vector from i to j
							// CohesionX -= bxs*Math.sqrt(invdistsq);
							// CohesionY -= bys*Math.sqrt(invdistsq);
							
						}
						else
						{
							
							var invdistsq = 4/(1 + bxs*bxs + bys*bys);

							// vector from j to i weighted by inverse square distance
							RepulsionX += bxs*invdistsq;
							RepulsionY += bys*invdistsq;

							// Alignment: steer towards the average heading of local flockmates
							// add to the sum
							
							AlignmentX += bj.vX;
							AlignmentY += bj.vY;

<<<<<<< HEAD
>>>>>>> e078b4d6547a3fc0ddaa74388d0a369842c3ad39
=======
>>>>>>> e078b4d6547a3fc0ddaa74388d0a369842c3ad39
							// Cohesion: steer to move toward the average position of local flockmates
							
							// vector from i to j
							CohesionX -= bxs*Math.sqrt(invdistsq);
							CohesionY -= bys*Math.sqrt(invdistsq);							

						}
						
					}
	
				}
				
				// preparing these vectors for separate representation!
				// all of these defined as mean
				RepulsionX /= Interactions;				
				RepulsionY /= Interactions;
				AlignmentX /= Interactions;
				AlignmentY /= Interactions;
				CohesionX  /= Interactions;
				CohesionY  /= Interactions;				
			
				newVX[interactor1] += self.RepCoeff*RepulsionX + self.AliCoeff*AlignmentX + self.CohCoeff*CohesionX;
				newVY[interactor1] += self.RepCoeff*RepulsionY + self.AliCoeff*AlignmentY + self.CohCoeff*CohesionY;		
				
			}
        }
    }


	// are the object pigeonholes consistent?
	this.testObjectPigeonholes = function()
	{
		for (obj = numObjects-1; obj>=0; obj--)
		{	
		    var contents = self.PigeonHoles[objectPigeonhole[obj]];
		    unfound = true;
		    for (int = contents.length-1; int >=0; int--)
		    {
		        
    			if (contents[int]==objectIndex[obj])
    			{
    				unfound = false;
    			}
		    }
		    if (unfound)
		    {
		         debugger;   
		    }
		}
	}
	
	
	

    // move the balls
    this.moveBalls = function() {
        var theBalls = self.theBalls;
    //    var PigeonHoles = self.PigeonHoles;
        var InteractionList = self.InteractionList;
   
        var pigeonholeWidth = self.pigeonholeWidth;
        var pigeonholeHeight = self.pigeonholeHeight;
        var perceptionRange  = self.perceptionRange;

        // what can interact with what
        self.createInteractionList(theBalls);

        // PUT YOUR RULE FUNCTIONS HERE
        self.applyRules(theBalls,InteractionList);

		
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
        self.PigeonHoles = new Array();
        // 600 array positions
		for(var i=pigeonholeWidth*pigeonholeHeight-1; i>=0; i--) {		
            self.PigeonHoles[i] = new Array();
        }

// move balls and update pigeonholes
        for(var i=theBalls.length-1; i>=0; i--) {
            theBalls[i].move();
            var pigeonIndex = Math.floor(theBalls[i].x/perceptionRange)+Math.floor(theBalls[i].y/perceptionRange)*pigeonholeWidth;
            self.PigeonHoles[pigeonIndex].push(i);
            theBalls[i].pigeon = pigeonIndex;
        }
		
// reset pigeonholes for objects
		for(var i=numObjects-1; i>=0; i--)
		{
<<<<<<< HEAD
<<<<<<< HEAD
			var pigeonIndex =   Math.floor(objectX[i]/perceptionRange) + Math.floor(objectY[i]/perceptionRange)*pigeonholeWidth;
			
			// pigeon = Math.floor(objectX[i]/self.perceptionRange),
			// + (Math.floor(objectY[i]/self.perceptionRange)) * self.pigeonholeWidth;
			self.PigeonHoles[pigeonIndex].push(objectIndex[i]);			
=======
=======
>>>>>>> e078b4d6547a3fc0ddaa74388d0a369842c3ad39
			
			pigeon = Math.floor(objectX[i]/self.perceptionRange)+ (Math.floor(objectY[i]/self.perceptionRange)) * self.pigeonholeWidth;
			self.PigeonHoles[pigeon].push(objectIndex[i]);		
			objectPigeonhole[i] = pigeon;		
<<<<<<< HEAD
>>>>>>> e078b4d6547a3fc0ddaa74388d0a369842c3ad39
=======
>>>>>>> e078b4d6547a3fc0ddaa74388d0a369842c3ad39
		
		}
		
        // Note - this prevents new agent creation in the middle of a cycle
        // Downside, reduces user agency noticeably (creation latency)!

        if (self.addAgent && Objects==1) {

            // var randomAngleInRadians = Math.random()*Math.PI*2;
            // b = self.makeBall( self.addAgentX, self.addAgentY, Math.cos(randomAngleInRadians) * self.genericSpeed, Math.sin(randomAngleInRadians) * self.genericSpeed, self.genericSpeed, self.genericRadius, self.genericStroke );
            // theBalls.push(b);
            // self.addAgent = false;

<<<<<<< HEAD
<<<<<<< HEAD
			objectX[numObjects] = self.addAgentX;
			objectY[numObjects] = self.addAgentY;
=======
=======
>>>>>>> e078b4d6547a3fc0ddaa74388d0a369842c3ad39
			x =  self.addAgentX;
			y =  self.addAgentY;
			
			x = Math.min( Math.max(x , 1) , (theCanvas.width-1));
			y = Math.min( Math.max(y , 1) , (theCanvas.height-1));
			
			objectX[numObjects] = x;
			objectY[numObjects] = y;
<<<<<<< HEAD
>>>>>>> e078b4d6547a3fc0ddaa74388d0a369842c3ad39
=======
>>>>>>> e078b4d6547a3fc0ddaa74388d0a369842c3ad39
			objectIndex[numObjects] = - 6 - numObjects;

			self.addAgent = 0;

<<<<<<< HEAD
<<<<<<< HEAD
			pigeon =   Math.floor(objectX[numObjects] / self.perceptionRange),
					+ (Math.floor(objectY[numObjects] / self.perceptionRange)) * self.pigeonholeWidth;
			self.PigeonHoles[pigeon].push(objectIndex[numObjects]);			
=======
			pigeon = Math.floor(objectX[numObjects]/ self.perceptionRange) + (Math.floor(objectY[numObjects]/self.perceptionRange)) * self.pigeonholeWidth;
			self.PigeonHoles[pigeon].push(objectIndex[numObjects]);
			objectPigeonhole[numObjects] = pigeon;
>>>>>>> e078b4d6547a3fc0ddaa74388d0a369842c3ad39
=======
			pigeon = Math.floor(objectX[numObjects]/ self.perceptionRange) + (Math.floor(objectY[numObjects]/self.perceptionRange)) * self.pigeonholeWidth;
			self.PigeonHoles[pigeon].push(objectIndex[numObjects]);
			objectPigeonhole[numObjects] = pigeon;
>>>>>>> e078b4d6547a3fc0ddaa74388d0a369842c3ad39
			numObjects++;

        }
		
		
		this.testObjectPigeonholes();
		
    }
	
	


    // what to do when things get clicked
    this.doClick = function(evt){
        // a catch - we need to adjust for where the canvas is!
        // this is quite ugly without some degree of support from
        // a library
<<<<<<< HEAD
<<<<<<< HEAD
      //  var theCanvas = self.theCanvas;

        this.addAgent = true;
        this.addAgentX = evt.pageX - this.theCanvas.offsetLeft;
        this.addAgentY = evt.pageY - this.theCanvas.offsetTop;
=======
=======
>>>>>>> e078b4d6547a3fc0ddaa74388d0a369842c3ad39
        var theCanvas = self.theCanvas;
		
		// aha! - lock this function so no multiple updates can occur!
		if (!self.addAgent)
		{
			self.addAgent = true;
			self.addAgentX = evt.pageX - theCanvas.offsetLeft;
			self.addAgentY = evt.pageY - theCanvas.offsetTop;
		}
<<<<<<< HEAD
>>>>>>> e078b4d6547a3fc0ddaa74388d0a369842c3ad39
=======
>>>>>>> e078b4d6547a3fc0ddaa74388d0a369842c3ad39
		
    }


    // what we need to do is define a function that updates the position
    // draws, then schedules another iteration in the future
    // WARNING: this is the simplest, but not the best, way to do this
    this.drawLoop = function() {
	
		if (this.running == 1) 
		{	
			this.moveBalls();    // new position
			this.drawBalls();    // show things

			// reqFrame(self.drawLoop);    // call us again in 20ms
			// print number of Balls

			// Jquery code to display number of Balls beneath canvas
			var x = document.getElementById("canvas_info");
			if ( !x)
			{
				var div = '<div id = "canvas_info"></div>';
				$("body").append(div);
			}
			$("#canvas_info").html(self.theBalls.length);
			
			reqFrame(this.drawLoop.bind(this));
			
		}
		else if (this.restartNow == 1)
		{
			this.restart();
		}

    }

    this.loop = function()
    {

		var s = 'BoidAgents[' + self.id + '].drawLoop()';
		// var s = 'BoidAgents[' + self.id + '].drawLoop';
		self.pid = window.setInterval(s, 50);
		
		// var reqFrame =
		// window.requestAnimationFrame ||
			  // window.webkitRequestAnimationFrame ||
			  // window.mozRequestAnimationFrame ||
			  // window.oRequestAnimationFrame ||
			  // window.msRequestAnimationFrame ||
			  // function(/* function FrameRequestCallback */ callback, /* DOMElement Element */ element){
				// window.setTimeout(callback, 1000 / 60);
				// };
				
		// reqFrame(eval(s));
					
    }

	// function setclicks()
	// {
		// theCanvas.onclick = function() { if (!this.running) {this.running=1; reqFrame(animLoop,theCanvas);}};
		// document.getElementById("stopbutton").onclick = function() {this.running=0;};
	// }
	
	
	this.restart = function()
	{
		
		this.theBalls = [];
		// create an array of pigeonholes
		this.PigeonHoles = [];
		// create the interaction list array;
		this.InteractionList = [];
		// temp velocity variables		
		
		//this.perceptionRange = 5;
//		var perceptionRange = this.perceptionRange;

		this.initialPopulation = this.newInitialPopulation;
		this.genericSpeed = this.newGenericSpeed;
		this.perceptionRange = this.newPerceptionRange;


		this.genericRadius = this.perceptionRange; // this is just the radius at which I want to initialise all my Balls			

		this.perceptionRangeSquared = this.perceptionRange*this.perceptionRange;
		this.directionIndicatorLength = this.perceptionRange;
	//	var directionIndicatorLength = this.directionIndicatorLength;
		
		wallCollision = this.newWallCollision;
		Obstacles = this.newObstacles;	


		Objects = 1; // Objects turned on
		objectX = [];
		objectY = [];
		numObjects = 0;
		objectIndex = [];
<<<<<<< HEAD
<<<<<<< HEAD
		
=======
		objectPigeonhole = [];
>>>>>>> e078b4d6547a3fc0ddaa74388d0a369842c3ad39
=======
		objectPigeonhole = [];
>>>>>>> e078b4d6547a3fc0ddaa74388d0a369842c3ad39

		//this.genericSpeed = perceptionRange/4;
		//perceptionRange/2; // this is just the speed at which I want to initialise all my Balls	
		
		//this.initialPopulation = 5000;

	   // note - am assuming canvas won't change size!!
		this.pigeonholeWidth = Math.ceil(this.theCanvas.width/this.perceptionRange);
		this.pigeonholeHeight = Math.ceil(this.theCanvas.height/this.perceptionRange);		
		
		this.restartNow = 0;
		this.init();
		this.start();
	
	}
	
    this.start = function()
    {
		var theBalls = self.theBalls;

		for (var i=self.initialPopulation-1; i>=0; i--) {

			var randomAngleInRadians = Math.random()*Math.PI*2;

			b = self.makeBall(theCanvas.width*Math.random(),
							  theCanvas.height*Math.random(),
							  Math.cos(randomAngleInRadians) * self.genericSpeed,
							  Math.sin(randomAngleInRadians) * self.genericSpeed,
							  self.genericSpeed,
							  self.genericRadius,
							  self.genericStroke );
			theBalls.push(b);
		}
//		theCanvas.addEventListener("mousemove",this.doClick,false);	
<<<<<<< HEAD
<<<<<<< HEAD
		theCanvas.addEventListener("click",this.doClick.bind(this),false);
		
	
		
=======
		theCanvas.addEventListener("mousemove",this.doClick,false);	
>>>>>>> e078b4d6547a3fc0ddaa74388d0a369842c3ad39
=======
		theCanvas.addEventListener("mousemove",this.doClick,false);	
>>>>>>> e078b4d6547a3fc0ddaa74388d0a369842c3ad39
		this.running = 1;
		
		//self.loop();
	//	reqFrame(self.drawLoop);
		reqFrame(this.drawLoop.bind(this));
    }

	
    this.init = function()
    {
		self.id = BoidAgents.length;
		BoidAgents.push(self);

		for (var i=self.pigeonholeWidth*self.pigeonholeHeight-1; i>=0; i--)
        {
			this.PigeonHoles[i] = [];
        }
    }

    self.init();

}


// var test;

// jQuery(document).ready(function($) {
	// test = new Boid.Agent();
	// test.start();
// });
