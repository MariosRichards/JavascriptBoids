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



Boid.Agent = function(canvasWidth, canvasHeight)
{

// PLAYER STUFF
	// this.numberPlayers= 2;
	// this.thePlayers = [];


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
	var wallRepulsion = 1000;
	
	
	
	// How to label items in the pigeonholes
	// use negative indices to refer to objects
	var wallLeft = -1;// -1 = left wall
	var wallRight = -2;// -2 = right wall
	var wallTop = -3;// -3 = upper wall
	var wallBottom = -4;// -4 = lower wall
	
	// -5 for the Obstacle
	// -6 and down for Objects
	
	

	
	
	

	



	var self = this;
	// this.id   = null;

	
	this.theBalls = [];
	// create an array of pigeonholes
	this.PigeonHoles = [];
	// create the interaction list array;
	this.InteractionList = [];
	// temp velocity variables

	this.theCanvas = document.getElementById("mycanvas");
	this.theContext = this.theCanvas.getContext("2d");
	this.theCanvas.width = canvasWidth;
	this.theCanvas.width = canvasHeight;

	
	
	// these are effectively the constants	

	
    // Semaphore variable to add agent
    this.addAgent = false;
    this.addAgentX = 0;
    this.addAgentY = 0;	

	this.genericStroke = "#728FCE";        // steel blue outline
	this.circ = Math.PI*2;            // complete circle

	// Rule coefficients

	this.ruleCoeffs = [];
	this.ruleCoeffs[0] = 1; // alignment coefficient
	this.ruleCoeffs[1] = 1; // repulsion coefficient
	this.ruleCoeffs[2] = 0; // cohesion coefficient
	this.ruleColours = ['rgba(0,0,255,1)', 'rgba(0,255,255,1)', 'rgba(255,0,255,1)'];	



	
	
	var Obstacles = 1; // turn obstacle interaction on(1)/off(0)
	// obstacle is a circle
	var obstacleRadius = 20;
	var obstacleX = this.theCanvas.width/2;
	var obstacleY = this.theCanvas.height/2;
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


	this.perceptionRange = 20;

	this.perceptionRangeSquared = this.perceptionRange*this.perceptionRange;
	this.directionIndicatorLength = this.perceptionRange;

	this.genericRadius = this.perceptionRange; // this is just the radius at which I want to initialise all my Balls	
	this.genericSpeed = 5;
	
	this.initialPopulation = 100;

   // note - am assuming canvas won't change size!!
    this.pigeonholeWidth = Math.ceil(this.theCanvas.width/this.perceptionRange);
    this.pigeonholeHeight = Math.ceil(this.theCanvas.height/this.perceptionRange);

	this.newInitialPopulation = this.initialPopulation;
	this.newGenericSpeed = this.genericSpeed;
	this.newPerceptionRange = this.perceptionRange;
	this.newWallCollision = wallCollision;
	this.newObstacles = Obstacles;
	
	
	
	this.simulationSpeed = 1;
	
	
	// graphics controls
	this.pigeonholesVisible = true;
	this.perceptionRangeVisible = true;
	this.ruleVectorVisible = [true, true, true];	
	this.displayBoidIDs = true;	
	



    this.aBall = {
        x : 100,
        y : 100,
        vX : 10,
        vY : 10,
		vXrule : [0, 0, 0],
		vYrule : [0, 0, 0],
		id : 0,
        pigeon : 0, // pigeonhole
        speed : self.genericSpeed,
        radius : self.genericRadius,
        //colour : self.genericColour,
        stroke : self.genericStroke,

        draw : function() {
            // theContext.strokeStyle = this.stroke;
			
			var theContext = self.theContext;

			theContext.font="lighter 8px verdana";
			theContext.textAlign="center";
			theContext.textBaseline="middle"; 		


			
			if (self.pigeonholesVisible)
				{
				
				// draw pigeonhole grid on screen
				theContext.strokeStyle = 'rgba(0,0,0,0.2)';
				theContext.lineWidth = .05;			
				theContext.beginPath();			
				for (var i = 0; i<self.pigeonholeWidth; i++)
				{
					theContext.moveTo( i*self.perceptionRange , 0);
					theContext.lineTo( i*self.perceptionRange , self.theCanvas.height );
				}
				
				theContext.moveTo( self.theCanvas.width  , 0 );
				theContext.lineTo( self.theCanvas.width  , self.theCanvas.height);

				for (var i = 0; i<self.pigeonholeHeight; i++)
				{
					theContext.moveTo( 0, i*self.perceptionRange );
					theContext.lineTo( self.theCanvas.width, i*self.perceptionRange  );
				}
				
				theContext.moveTo( 0, self.theCanvas.height );
				theContext.lineTo( self.theCanvas.width, self.theCanvas.height );

				theContext.closePath();
				theContext.stroke();			
				// add pigeonhole numbers
				
				for (var i = 0; i<self.pigeonholeWidth*self.pigeonholeHeight; i++)
				{
			
					theContext.fillText(i,
										((i%self.pigeonholeWidth)+.5)      *self.perceptionRange,
										(Math.floor(i/self.pigeonholeWidth)+.5) *self.perceptionRange );
				
				}
			}

			
			// show perception Range
			
			if (self.perceptionRangeVisible)
			{
				theContext.strokeStyle = 'rgba(255,0,0,0.1)';
				theContext.lineWidth = 5;
				theContext.beginPath();
				theContext.arc(this.x,this.y, self.perceptionRange-theContext.lineWidth/2,0, self.circ,true);
				theContext.closePath();
				theContext.stroke();
			}
			
			// draw boid triangle
			theContext.strokeStyle = 'rgba(0,255,0,1)';			
			theContext.lineWidth = 1;			
            theContext.beginPath();			
			var ratio = self.perceptionRange/(this.speed);
			theContext.moveTo(this.x+(this.vX*ratio),this.y+(this.vY*ratio));
			var theta = 140*Math.PI/180;

			theContext.lineTo(this.x+(this.vX*Math.cos(theta)-this.vY*Math.sin(theta))*ratio , this.y+(this.vX*Math.sin(theta)+this.vY*Math.cos(theta))*ratio);
			theta = (140+80)*Math.PI/180;
			theContext.lineTo(this.x+(this.vX*Math.cos(theta)-this.vY*Math.sin(theta))*ratio , this.y+(this.vX*Math.sin(theta)+this.vY*Math.cos(theta))*ratio);
			theContext.lineTo(this.x+(this.vX*ratio),this.y+(this.vY*ratio));
					
            theContext.closePath();
            theContext.stroke();
			
			var arrowX;
			var arrowY;
			
			// ratio = self.perceptionRange/this.speed;

			for (var rule = 0; rule < self.ruleCoeffs.length; rule ++)
			{
				if (self.ruleVectorVisible[rule])
				{
					theContext.strokeStyle = self.ruleColours[rule];
					theContext.beginPath();
					theContext.moveTo(this.x,this.y);
					arrowX = this.vXrule[rule]*ratio*self.ruleCoeffs[rule];
					arrowY = this.vYrule[rule]*ratio*self.ruleCoeffs[rule];
					theContext.lineTo(this.x+arrowX,this.y+arrowY);
					
					var arrowRatio = .2;
					theta = 150*Math.PI/180;
					theContext.lineTo( this.x+arrowX+arrowRatio*( arrowX*Math.cos(theta)-arrowY*Math.sin(theta) ),this.y +arrowY+ arrowRatio*( arrowX*Math.sin(theta) + arrowY*Math.cos(theta) ) );
					theta = 210*Math.PI/180;
					theContext.lineTo( this.x+arrowX+arrowRatio*( arrowX*Math.cos(theta)-arrowY*Math.sin(theta) ),this.y +arrowY+ arrowRatio*( arrowX*Math.sin(theta) + arrowY*Math.cos(theta) ) );
					theContext.lineTo( this.x+arrowX,this.y +arrowY );			
					theContext.closePath();
					theContext.stroke();			
				}
			}
			
			if (self.displayBoidIDs)
			{
				theContext.fillText(this.id +","+ this.pigeon,this.x, this.y);
			}
			
			
        },

        // make 'em "bounce" when they go over the edge
        // no loss of velocity
        move: function() {
            this.x += this.vX*self.simulationSpeed;
            this.y += this.vY*self.simulationSpeed;

			// this.x += this.vX;
            // this.y += this.vY;
			
			
            // Marios: Wouldn't need to check velocity if you could *only* hit the wall when moving in that direction
            // Marios: Could remove wall issues by using wallCollision space
            // Marios: My modifications implicitly assume you won't *appear* in the wall
            // Marios: Minor unnecessary optimisation - only checks for Upper penetration in an axis
            // if Lower penetration has not occurred

			if (wallCollision==1) // toroidal
			{
			// Note - this ignores radius
				this.x = (this.x+self.theCanvas.width)%self.theCanvas.width;
				this.y = (this.y+self.theCanvas.height)%self.theCanvas.height;

			}
			else if (wallCollision==0) // hard bounce
			{

				var penetrationUpper = this.x + this.radius - self.theCanvas.width;
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

				penetrationUpper = this.y + this.radius - self.theCanvas.height;
				penetrationLower = this.radius - this.y;
				if (penetrationUpper > 0) {
					this.vY = -this.vY;
					this.y -= 2*penetrationUpper;
				}
				else if (penetrationLower > 0) {
					this.vY = -this.vY;
					this.y += 2*penetrationLower;
				}
				
				
				// IF BOUNCE NOT APPROPRIATE JUST 'SMACK'
				
				// if (penetrationUpper > 0) {
					// this.vX = 0;
					// this.x -= penetrationUpper;
				// } // mutually exclusive events
				// // ASSUMES RADIUS SMALLER THAN HALF THE SCREEN
				// else if    (penetrationLower > 0) {
					// this.vX = 0;
					// this.x += penetrationLower;
				// }

				// penetrationUpper = this.y + this.radius - theCanvas.height;
				// penetrationLower = this.radius - this.y;
				// if (penetrationUpper > 0) {
					// this.vY = 0;
					// this.y -= penetrationUpper;
				// }
				// else if (penetrationLower > 0) {
					// this.vY = 0;
					// this.y += penetrationLower;
				// }				
				
				
				
				
				
			}
			else // repulsion
			{
				
				this.x = Math.min( Math.max(this.x , 1) , (self.theCanvas.width-1));
				this.y = Math.min( Math.max(this.y , 1) , (self.theCanvas.height-1));					
			
			
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
        x = Math.min( Math.max(x , radius) , (this.theCanvas.width-radius));
        y = Math.min( Math.max(y , radius) , (this.theCanvas.height-radius));
		
		// Prevent balls from being created inside obstacles
		// ugly random positioning solution!
		if (Obstacles==1)
		{
			// radius = Math.sqrt((obstacleX - x)*(obstacleX - x) + (obstacleY - y)*(obstacleY - y) );
			while ( Math.sqrt((obstacleX - x)*(obstacleX - x) + (obstacleY - y)*(obstacleY - y) ) < (obstacleRadius) )
			{

				x = Math.random()*this.theCanvas.width;
				y = Math.random()*this.theCanvas.height;
				
				x = Math.min( Math.max(x , radius) , (this.theCanvas.width-radius));
				y = Math.min( Math.max(y , radius) , (this.theCanvas.height-radius));				
						
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
		ball.vXrule = [0,0,0];
		ball.vYrule = [0,0,0];
		

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

		ball.id = this.theBalls.length;
		
        this.PigeonHoles[ball.pigeon].push(this.theBalls.length);

        return ball;
    }



    // this function will do the drawing
    this.drawBalls = function() {
        // clear the window
        var theContext = self.theContext;
        theContext.clearRect(0, 0, this.theCanvas.width, this.theCanvas.height);
        // draw the balls - too bad we can't use for i in theBalls
        for (var i=self.theBalls.length-1; i>=0; i--) {
            self.theBalls[i].draw();
        }
		
		// draw obstacles
		if (Obstacles==1) {
		
            theContext.strokeStyle = "#FF0000";
            theContext.beginPath();
            theContext.arc(obstacleX,obstacleY, obstacleRadius,0, this.circ,true);
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
				theContext.arc(objectX[obj],objectY[obj], 1,0, this.circ,true);
				theContext.closePath();
				theContext.stroke();			
								
			}
		}
		
    }



    this.createInteractionList = function(ballList)
    {

        // clean InteractionList array of arrays!
   //     self.InteractionList = [];
        var InteractionList     = [];

        var pigeonholeWidth     = this.pigeonholeWidth;
        var pigeonholeHeight    = this.pigeonholeHeight;
		
        var pigeonhole, j, bi, bix, biy, pigeonX, pigeonY;
  

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
								var dx,dy;
								if (j<=-6) // is it an object?
								{

									dx = objectX[-6-j] - bix;
									dy = objectY[-6-j] - biy;
								
								}
								else // no, it's a boid
								{
							
									// test if within perceptionRange
									bj = ballList[j];
									dx = bj.x - bix;
									dy = bj.y - biy;
									
								}
								
								if ( 2*Math.abs(dx) > this.theCanvas.width ) {
									dx = this.theCanvas.width - Math.abs(dx);
								}
								
								if ( 2*Math.abs(dy) > this.theCanvas.height ) {
									dy = this.theCanvas.height - Math.abs(dy);
								}								
									
								if ( (dx*dx + dy*dy) <= this.perceptionRangeSquared ) {
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
							
							
								var dx,dy;
								if (j<=-6) // is it an object?
								{

									dx = objectX[-6-j] - bix;
									dy = objectY[-6-j] - biy;
								
								}
								else // no, it's a boid
								{
							
									// test if within perceptionRange
									bj = ballList[j];
									dx = bj.x - bix;
									dy = bj.y - biy;
									
								}
								if ( (dx*dx + dy*dy) <= this.perceptionRangeSquared ) {
									InteractionList[i].push(j);
								}
							}
						}
					}
				}
			}
			else if (wallCollision ==2)//wallCollision==2 by repulsion
			{
			

				//var wallLeft = -1;// -1 = left wall
				//var wallRight = -2;// -2 = right wall
				//var wallTop = -3;// -3 = upper wall
				//var wallBottom = -4;// -4 = lower wall

				// left/right wall near?

				var penetrationUpper = bix + this.perceptionRange - this.theCanvas.width;
				var penetrationLower = this.perceptionRange - bix;
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

				penetrationUpper = biy + this.perceptionRange - this.theCanvas.height;
				penetrationLower = this.perceptionRange - biy;
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
						for(var interactant = this.PigeonHoles[pigeonhole].length-1; interactant>=0; interactant--) {

							j = this.PigeonHoles[pigeonhole][interactant];

							// here is where you'd add an if statement to cut work in half!
							if(j != i) { //

								var dx,dy;
								if (j<=-6) // is it an object?
								{

									dx = objectX[-6-j] - bix;
									dy = objectY[-6-j] - biy;
								
								}
								else // no, it's a boid
								{
	
									bj = ballList[j];
									dx = bj.x - bix;
									dy = bj.y - biy;
									
								}
								if ( (dx*dx + dy*dy) <= this.perceptionRangeSquared ) {
									InteractionList[i].push(j);
								}
							}
						}
					}
				}			
			}
			else
			{
				debugger;
			}

        }

		return InteractionList;		
    }


    this.applyRules = function(ballList,InteractionList)
    {

		var interactor2;

        for(var interactor1 = ballList.length-1; interactor1>=0; interactor1--) {
		
            var bi = ballList[interactor1];
			
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
							RepulsionX += wallRepulsion*(1)/(1+Math.abs(bxs));
						
						}
						
						else if(interactor2 ==-2) {
						
							var bxs = bi.x - this.theCanvas.width;
							RepulsionX += wallRepulsion*(-1)/(1+Math.abs(bxs));
						
						}
						
						else if(interactor2 ==-3) {		

							var bys = bi.y - this.theCanvas.height;
							RepulsionY += wallRepulsion*(-1)/(1+Math.abs(bys));
						
						}
						
						else if(interactor2 ==-4) {
						
							var bys = bi.y;
							RepulsionY += wallRepulsion*(1)/(1+Math.abs(bys));
						
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

							if (bxs==0 && bys ==0)
							{
								var randomAngleInRadians = Math.random()*Math.PI*2;
								RepulsionX += obstacleRepulsion*Math.cos(randomAngleInRadians)/(1+Math.abs(bxs));						
								RepulsionY += obstacleRepulsion*Math.sin(randomAngleInRadians)/(1+Math.abs(bys));						
							
							}
							else
							{
								RepulsionX += obstacleRepulsion*bxs/(1+Math.abs(bxs));						
								RepulsionY += obstacleRepulsion*bys/(1+Math.abs(bys));							
							
							}

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
							if ( 2*Math.abs(bxs) > this.theCanvas.width ) {
								bxs = this.theCanvas.width - bxs;
							}
							
							if ( 2*Math.abs(bys) > this.theCanvas.height ) {
								bys = this.theCanvas.height - bys;
							}
						}
						
						if (interactor2<=-6)
						{
						
							var invdistsq = 4/(1 + bxs*bxs + bys*bys);

							// vector from j to i weighted by inverse square distance
							RepulsionX += 1000*bxs*invdistsq;
							RepulsionY += 1000*bys*invdistsq;
							
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


							// Cohesion: steer to move toward the average position of local flockmates
							
							// vector from i to j
							CohesionX -= bxs*Math.sqrt(invdistsq);
							CohesionY -= bys*Math.sqrt(invdistsq);							

						}
						
					}
	
				}
				
				// preparing these vectors for separate representation!
				// all of these defined as mean
	
				bi.vXrule[0] = (AlignmentX / Interactions);
				bi.vYrule[0] = (AlignmentY / Interactions);

	
				bi.vXrule[1] = RepulsionX / Interactions;
				bi.vYrule[1] = RepulsionY / Interactions;


				bi.vXrule[2] = CohesionX / Interactions;
				bi.vYrule[2] = CohesionY / Interactions;
							
			}
			else // no interaction
			{
				bi.vXrule[0] = 0;
				bi.vYrule[0] = 0;

				bi.vXrule[1] = 0;
				bi.vYrule[1] = 0;

				bi.vXrule[2] = 0;
				bi.vYrule[2] = 0;			
			
			}
			
        }
    }

	// TESTFUNCTION
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
   
        var pigeonholeWidth = self.pigeonholeWidth;
        var pigeonholeHeight = self.pigeonholeHeight;
        var perceptionRange  = self.perceptionRange;

        // what can interact with what
        InteractionList = self.createInteractionList(theBalls);

        // PUT YOUR RULE FUNCTIONS HERE
        self.applyRules(theBalls,InteractionList);

		
		// confirms update!
		for(var i=theBalls.length-1; i>=0; i--) {
			// var nvx = newVX[i];
			// var nvy = newVY[i];
			// any chance of zero velocity?

			// newVX[interactor1] = bi.vX;
			// newVY[interactor1] = bi.vY;	
			var bi = theBalls[i];
			
			var nvx = bi.vX + this.ruleCoeffs[0]*bi.vXrule[0] + this.ruleCoeffs[1]*bi.vXrule[1] + this.ruleCoeffs[2]*bi.vXrule[2];
			var nvy = bi.vY + this.ruleCoeffs[0]*bi.vYrule[0] + this.ruleCoeffs[1]*bi.vYrule[1] + this.ruleCoeffs[2]*bi.vYrule[2];	
			
			var z = Math.sqrt(nvx*nvx + nvy*nvy);
			if (z<.001) {
				//Marios: Note - very unlikely to enter this loop ... but just in case the vectors cancel out 
				
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
            var pigeonIndex = Math.floor(theBalls[i].x/this.perceptionRange)+Math.floor(theBalls[i].y/this.perceptionRange)*pigeonholeWidth;
            self.PigeonHoles[pigeonIndex].push(i);
            theBalls[i].pigeon = pigeonIndex;
        }
		
		// reset pigeonholes for objects
		for(var i=numObjects-1; i>=0; i--)
		{

			var pigeonIndex =   Math.floor(objectX[i]/this.perceptionRange) + Math.floor(objectY[i]/this.perceptionRange)*pigeonholeWidth;
			self.PigeonHoles[pigeonIndex].push(objectIndex[i]);			
			objectPigeonhole[i] = pigeonIndex;		
		
		}
		
        // Note - this prevents new agent creation in the middle of a cycle
        // Downside, reduces user agency noticeably (creation latency)!

        if (this.addAgent && Objects==1) {

			// CREATE AGENTS ON CLICK CODE
            // var randomAngleInRadians = Math.random()*Math.PI*2;
            // b = self.makeBall( self.addAgentX, self.addAgentY, Math.cos(randomAngleInRadians) * self.genericSpeed, Math.sin(randomAngleInRadians) * self.genericSpeed, self.genericSpeed, self.genericRadius, self.genericStroke );
            // theBalls.push(b);
            // self.addAgent = false;

			objectX[numObjects] = this.addAgentX;
			objectY[numObjects] = this.addAgentY;
			x =  this.addAgentX;
			y =  this.addAgentY;
			
			x = Math.min( Math.max(x , 1) , (this.theCanvas.width-1));
			y = Math.min( Math.max(y , 1) , (this.theCanvas.height-1));
			
			objectX[numObjects] = x;
			objectY[numObjects] = y;
			objectIndex[numObjects] = - 6 - numObjects;

			this.addAgent = 0;

			pigeon =   Math.floor(objectX[numObjects] / this.perceptionRange),
					+ (Math.floor(objectY[numObjects] / this.perceptionRange)) * this.pigeonholeWidth;
			this.PigeonHoles[pigeon].push(objectIndex[numObjects]);			

			objectPigeonhole[numObjects] = pigeon;

			numObjects++;

        }
		
		
	//	this.testObjectPigeonholes();
		
    }
	
	


    // what to do when things get clicked
    this.doClick = function(evt){
        // a catch - we need to adjust for where the canvas is!
		
        // this is quite ugly without some degree of support from
        // a library
        //  var theCanvas = self.theCanvas;

        this.addAgent = true;
        this.addAgentX = evt.pageX - this.theCanvas.offsetLeft;
        this.addAgentY = evt.pageY - this.theCanvas.offsetTop;
 
		
		// aha! - lock this function so no multiple updates can occur!
		if (!this.addAgent)
		{
			this.addAgent = true;
			this.addAgentX = evt.pageX - this.theCanvas.offsetLeft;
			this.addAgentY = evt.pageY - this.theCanvas.offsetTop;
		}

		
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

    // this.loop = function()
    // {

		// var s = 'BoidAgents[' + self.id + '].drawLoop()';
		// // var s = 'BoidAgents[' + self.id + '].drawLoop';
		// self.pid = window.setInterval(s, 50);
		
		// // var reqFrame =
		// // window.requestAnimationFrame ||
			  // // window.webkitRequestAnimationFrame ||
			  // // window.mozRequestAnimationFrame ||
			  // // window.oRequestAnimationFrame ||
			  // // window.msRequestAnimationFrame ||
			  // // function(/* function FrameRequestCallback */ callback, /* DOMElement Element */ element){
				// // window.setTimeout(callback, 1000 / 60);
				// // };
				
		// // reqFrame(eval(s));
					
    // }

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

		objectPigeonhole = [];


		//this.genericSpeed = perceptionRange/4;
		//perceptionRange/2; // this is just the speed at which I want to initialise all my Balls	
		
		//this.initialPopulation = 5000;

	   // note - am assuming canvas won't change size!!
		this.pigeonholeWidth = Math.ceil(this.theCanvas.width/this.perceptionRange);
		this.pigeonholeHeight = Math.ceil(this.theCanvas.height/this.perceptionRange);		
		
		this.restartNow = 0;
		// this.init();
		
		for (var i=this.pigeonholeWidth*this.pigeonholeHeight-1; i>=0; i--)
        {
			this.PigeonHoles[i] = [];
        }				
		
		this.start();
	
	}
	
    this.start = function()
    {

		for (var i=this.initialPopulation-1; i>=0; i--) {

			var randomAngleInRadians = Math.random()*Math.PI*2;

			b = this.makeBall(this.theCanvas.width*Math.random(),
							  this.theCanvas.height*Math.random(),
							  Math.cos(randomAngleInRadians) * this.genericSpeed,
							  Math.sin(randomAngleInRadians) * this.genericSpeed,
							  this.genericSpeed,
							  this.genericRadius,
							  this.genericStroke );
			this.theBalls.push(b);
			
							  // this.genericSpeed*(1+Math.random()*.6-.3),			
		}

		this.theCanvas.addEventListener("click",this.doClick.bind(this),false);
		
		this.running = 1;
		
		reqFrame(this.drawLoop.bind(this));
    }

	
    this.init = function()
    {
		// self.id = BoidAgents.length;
		BoidAgents.push(self);

		for (var i=this.pigeonholeWidth*this.pigeonholeHeight-1; i>=0; i--)
        {
			this.PigeonHoles[i] = [];
        }
    }

    this.init();

}


// var test;

// jQuery(document).ready(function($) {
	// test = new Boid.Agent();
	// test.start();
// });
