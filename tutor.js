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


	// temp velocity variables

	this.theCanvas = document.getElementById("mycanvas");
	this.theContext = this.theCanvas.getContext("2d");
	this.theCanvas.width = canvasWidth;
	this.theCanvas.height = canvasHeight;
	
	
	this.canvasWidth = canvasWidth;
	this.canvasHeight = canvasHeight;
	
//	this.canvasScale = Math.min(canvasWidth,canvasHeight);
//	alert(this.canvasScale);
	
	// these are effectively the constants	
	
    // Semaphore variable to add agent
    this.addAgent = false;
    this.addAgentX = 0;
    this.addAgentY = 0;	

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
	var obstacleX = this.canvasWidth/2;
	var obstacleY = this.canvasHeight/2;
	var obstacleIndex = -5;
	var obstacleRepulsion =100;
	
	var Objects = 1; // Objects turned on
	var objectX = [];
	var objectY = [];
	var numObjects = 0;
	var objectIndex = [];
	var objectPigeonhole = [];
	this.objectRepulsion = 1000;
	
	// make everything go the same speed
	// Marios: This is where I'm dumping any new parameters


	this.perceptionRange = 20;
	this.initialPopulation = 100;	
	this.simulationSpeed = 1;	
	

	this.perceptionRangeSquared = this.perceptionRange*this.perceptionRange;
	
   // note - am assuming canvas won't change size!!
    this.pigeonholeWidth = Math.ceil(this.canvasWidth/this.perceptionRange);
    this.pigeonholeHeight = Math.ceil(this.canvasHeight/this.perceptionRange);

	this.newInitialPopulation = this.initialPopulation;

	this.newPerceptionRange = this.perceptionRange;
	this.newWallCollision = wallCollision;
	this.newObstacles = Obstacles;
	
	
	// graphics controls
	this.pigeonholesVisible = false;
	this.perceptionRangeVisible = true;
	this.ruleVectorVisible = [true, true, true];	
	this.displayBoidIDs = true;	
	
	
	// precomputed sin/cos functions
	this.sin140 = Math.sin(140*Math.PI/180);
	this.cos140 = Math.cos(140*Math.PI/180);
	this.sin220 = Math.sin(220*Math.PI/180);
	this.cos220 = Math.cos(220*Math.PI/180);
	
	this.sin150 = Math.sin(150*Math.PI/180);
	this.cos150 = Math.cos(150*Math.PI/180);
	this.sin210 = Math.sin(210*Math.PI/180);
	this.cos210 = Math.cos(210*Math.PI/180);	
	

    this.aBall = {
        x : 100,
        y : 100,
        vX : 10,
        vY : 10,
		vXrule : [0, 0, 0],
		vYrule : [0, 0, 0],
		interactions : [0, 0, 0],
		id : 0,
        pigeon : 0, // pigeonhole
        speed : 1,
		perceptionRange : self.perceptionRange,
		perceptionRangeSquared: self.perceptionRange*self.perceptionRange,

        draw : function() {

			var theContext = self.theContext;

			// show perception Range
			
			if (self.perceptionRangeVisible)
			{
				theContext.strokeStyle = 'rgba(255,0,0,0.1)';
				theContext.lineWidth = 5;
				theContext.beginPath();
				theContext.arc((this.x)<<0,(this.y)<<0, this.perceptionRange-theContext.lineWidth/2,0, self.circ,true);
				theContext.closePath();
				theContext.stroke();
			}
			
			// draw boid triangle
			theContext.strokeStyle = 'rgba(0,255,0,1)';
			theContext.lineWidth = 1;			
            theContext.beginPath();			
			var ratio = this.perceptionRange/(this.speed);
			theContext.moveTo( (this.x+(this.vX*ratio) )<<0,( this.y+(this.vY*ratio) )<<0 );
			var theta = 140*Math.PI/180;

			theContext.lineTo( ( this.x+(this.vX*Math.cos(theta)-this.vY*Math.sin(theta))*ratio )<<0 
			                 , ( this.y+(this.vX*Math.sin(theta)+this.vY*Math.cos(theta))*ratio )<<0 );
			theta = (140+80)*Math.PI/180;
			theContext.lineTo( ( this.x+(this.vX*Math.cos(theta)-this.vY*Math.sin(theta))*ratio )<<0
                 			 , ( this.y+(this.vX*Math.sin(theta)+this.vY*Math.cos(theta))*ratio )<<0 );
			theContext.lineTo( ( this.x+(this.vX*ratio) )<<0 
			                 , ( this.y+(this.vY*ratio) )<<0 ) ;
					
            theContext.closePath();
            theContext.stroke();
			
			var arrowX;
			var arrowY;
			
			// draw desire vector arrows
			for (var rule = 0; rule < self.ruleCoeffs.length; rule ++)
			{
				if (self.ruleVectorVisible[rule])
				{
					theContext.strokeStyle = self.ruleColours[rule];
					theContext.beginPath();
					theContext.moveTo( (this.x)<<0 
					                 , (this.y)<<0 );
					arrowX = this.vXrule[rule]*ratio*self.ruleCoeffs[rule];
					arrowY = this.vYrule[rule]*ratio*self.ruleCoeffs[rule];
					theContext.lineTo( ( this.x+arrowX )<<0 
					                 , ( this.y+arrowY )<<0 );
					
					var arrowRatio = .2;
					theta = 150*Math.PI/180;
					theContext.lineTo( ( this.x +arrowX+ arrowRatio*( arrowX*Math.cos(theta) - arrowY*Math.sin(theta) ) )<<0,
					                   ( this.y +arrowY+ arrowRatio*( arrowX*Math.sin(theta) + arrowY*Math.cos(theta) ) )<<0 );
					theta = 210*Math.PI/180;
					theContext.lineTo( ( this.x +arrowX+ arrowRatio*( arrowX*Math.cos(theta) - arrowY*Math.sin(theta) ) )<<0 
					                 , ( this.y +arrowY+ arrowRatio*( arrowX*Math.sin(theta) + arrowY*Math.cos(theta) ) )<<0 );
					theContext.lineTo( ( this.x +arrowX )<<0
					                 , ( this.y +arrowY )<<0 );	
					theContext.closePath();
					theContext.stroke();			
				}
			}
			
			if (self.displayBoidIDs)
			{
				theContext.fillText(this.id +","+ this.pigeon,this.x<<0, this.y<<0);
			}
			
			
        },

        // make 'em "bounce" when they go over the edge
        // no loss of velocity
        move: function() {
            this.x += this.vX*self.simulationSpeed;
            this.y += this.vY*self.simulationSpeed;
			
			
            // Marios: Wouldn't need to check velocity if you could *only* hit the wall when moving in that direction
            // Marios: Could remove wall issues by using wallCollision space
            // Marios: My modifications implicitly assume you won't *appear* in the wall
            // Marios: Minor unnecessary optimisation - only checks for Upper penetration in an axis
            // if Lower penetration has not occurred

			if (wallCollision==1) // toroidal
			{

				this.x = (this.x+self.canvasWidth)%self.canvasWidth;
				this.y = (this.y+self.canvasHeight)%self.canvasHeight;

			}
			else if (wallCollision==0) // hard bounce
			{

				var penetrationUpper = this.x + this.perceptionRange - self.canvasWidth;
				var penetrationLower = this.perceptionRange - this.x;
				if (penetrationUpper > 0) {
					this.vX = -this.vX;
					this.x -= 2*penetrationUpper;
				} // mutually exclusive events

				else if    (penetrationLower > 0) {
					this.vX = -this.vX;
					this.x += 2*penetrationLower;
				}

				penetrationUpper = this.y + this.perceptionRange - self.canvasHeight;
				penetrationLower = this.perceptionRange - this.y;
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
				
				this.x = Math.min( Math.max(this.x , 1) , (self.canvasWidth-1));
				this.y = Math.min( Math.max(this.y , 1) , (self.canvasHeight-1));					

			}
        }
    };


	this.addBall = function()
    {
		this.addAgent = true;
    }

	
	this.makeBall = function(x, y, vX, vY, speed, perceptionRange , stroke) {

        var theCanvas = this.theCanvas;

        // Ugly Javascript object instantiation
        Empty = function () {};
        Empty.prototype = this.aBall;
        var ball = new Empty();

        // Prevent balls from being created overlapping with walls
        x = Math.min( Math.max(x , perceptionRange) , (this.canvasWidth-perceptionRange));
        y = Math.min( Math.max(y , perceptionRange) , (this.canvasHeight-perceptionRange));
		
		// Prevent balls from being created inside obstacles
		// ugly random positioning solution!
		if (Obstacles==1)
		{
			while ( Math.sqrt((obstacleX - x)*(obstacleX - x) + (obstacleY - y)*(obstacleY - y) ) < (obstacleRadius) )
			{

				x = Math.random()*this.canvasWidth;
				y = Math.random()*this.canvasHeight;
				
				x = Math.min( Math.max(x , perceptionRange) , (this.canvasWidth-perceptionRange));
				y = Math.min( Math.max(y , perceptionRange) , (this.canvasHeight-perceptionRange));				
									
			}
		}
		

        ball.x = x;
        ball.y = y;
        ball.vX = vX;
        ball.vY = vY;
        ball.perceptionRange = perceptionRange;
		ball.perceptionRangeSquared = perceptionRange*perceptionRange;
        ball.stroke = stroke;
		ball.speed = speed;
		ball.vXrule = [0,0,0];
		ball.vYrule = [0,0,0];
		ball.interactions = [0, 0, 0];
		

        // make Ball note which pigeonhole it is in
        ball.pigeon = Math.floor(x/ this.perceptionRange) + (Math.floor(y/this.perceptionRange)) * this.pigeonholeWidth;
		
		if (ball.pigeon >= this.pigeonholeWidth*this.pigeonholeHeight || ball.pigeon <0)
		{
			debugger;
		}
		
		ball.id = this.theBalls.length;
		
        this.PigeonHoles[ball.pigeon].push(this.theBalls.length);

        return ball;
    }



    // this function will do the drawing
    this.drawBalls = function() {
        // clear the window

      //  theContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
		this.theCanvas.width = this.canvasWidth; // this has the effect of clearing the canvas!
		
        var theContext = this.theContext;		
		
        // draw the balls 
		theContext.font="lighter 7px verdana";
		theContext.textAlign="center";
		theContext.textBaseline="middle"; 	
		// draw pigeonhole grid on screen
		// would relate to 'global' perceptionRange
		if (this.pigeonholesVisible)
			{
			
			theContext.strokeStyle = 'rgba(0,0,0,.1)';
			theContext.lineWidth = .1;			
			theContext.beginPath();			
			for (var i = 0; i<this.pigeonholeWidth; i++)
			{
				theContext.moveTo( (i*this.perceptionRange)<<0 , 0);
				theContext.lineTo( (i*this.perceptionRange)<<0 , this.canvasHeight );
			}
			
			theContext.moveTo( this.canvasWidth  , 0 );
			theContext.lineTo( this.canvasWidth  , this.canvasHeight);

			for (var i = 0; i<this.pigeonholeHeight; i++)
			{
				theContext.moveTo( 0, (i*this.perceptionRange)<<0 );
				theContext.lineTo( this.canvasWidth, (i*this.perceptionRange)<<0 );
			}
			
			theContext.moveTo( 0, this.canvasHeight );
			theContext.lineTo( this.canvasWidth, this.canvasHeight );

			theContext.closePath();
			theContext.stroke();			
			// add pigeonhole numbers
			
			for (var i = 0; i<this.pigeonholeWidth*this.pigeonholeHeight; i++)
			{
		
				theContext.fillText(i,
									( ( (i%this.pigeonholeWidth)+.5)       *this.perceptionRange )<<0,
									( ( ((i/this.pigeonholeWidth)<<0) +.5) *this.perceptionRange )<<0 );
			
			}
		}		
		
		
		// draw obstacles
		if (Obstacles==1) {
		
            theContext.strokeStyle = 'rgba(255,0,0,1)';
            theContext.beginPath();
            theContext.arc(obstacleX<<0,obstacleY<<0, obstacleRadius,0, this.circ,true);
            theContext.closePath();
            theContext.stroke();

		}
		
		// draw objects
		if (numObjects>0)
		{
		
			theContext.strokeStyle = 'rgba(0,255,0,1)';
			theContext.beginPath();		
			for (var obj = numObjects-1; obj>=0; obj--)
			{
				theContext.moveTo(objectX[obj]<<0,objectY[obj]<<0);
				theContext.arc(objectX[obj]<<0,objectY[obj]<<0, 1,0, this.circ,true);							
			}
			theContext.closePath();
			theContext.stroke();			
		}


		for (var i=this.theBalls.length-1; i>=0; i--) 
		{
			var bi = this.theBalls[i];
			// show perception Range
			
			if (this.perceptionRangeVisible)
			{
				theContext.strokeStyle = 'rgba(255,0,0,0.1)';
				theContext.lineWidth = 5;
				theContext.beginPath();
				theContext.arc((bi.x)<<0,(bi.y)<<0, this.perceptionRange-2.5,0, this.circ,true); // decrement radius by half of line width
				theContext.closePath();
				theContext.stroke();
			}
			
			// draw boid triangle
			theContext.strokeStyle = 'rgba(0,255,0,1)';
			theContext.lineWidth = 1;			
			theContext.beginPath();			
			var ratio = this.perceptionRange/(bi.speed);
			
			var boidX = bi.x;
			var boidY = bi.y;
			var normVx = bi.vX*ratio;
			var normVy = bi.vY*ratio;
			
			theContext.moveTo( ( boidX+normVx )<<0
			                 , ( boidY+normVy )<<0 );

			theContext.lineTo( ( boidX + normVx*this.cos140 - normVy*this.sin140 )<<0 
							 , ( boidY + normVx*this.sin140 + normVy*this.cos140 )<<0 );
	
			theContext.lineTo( ( boidX + normVx*this.cos220 - normVy*this.sin220 )<<0
							 , ( boidY + normVx*this.sin220 + normVy*this.cos220 )<<0 );
							 
			theContext.lineTo( ( boidX + normVx )<<0 
							 , ( boidY + normVy )<<0 ) ;
					
			theContext.closePath();
			theContext.stroke();
			
			var arrowX;
			var arrowY;
			var arrowRatio = .2;
			
			// draw desire vector arrows 
			for (var rule = this.ruleCoeffs.length-1; rule >=0; rule --)
			{
				if (this.ruleVectorVisible[rule] && this.ruleCoeffs[rule]!=0)
				{
					theContext.strokeStyle = this.ruleColours[rule];
					theContext.beginPath();
					theContext.moveTo( boidX<<0 
									 , boidY<<0 );
									 
									 
					arrowX = bi.vXrule[rule]*ratio*this.ruleCoeffs[rule];
					arrowY = bi.vYrule[rule]*ratio*this.ruleCoeffs[rule];
					theContext.lineTo( ( boidX+arrowX )<<0 
									 , ( boidY+arrowY )<<0 );



					theContext.lineTo( ( boidX + arrowX + arrowX*arrowRatio*this.cos150 - arrowY*arrowRatio*this.sin150  )<<0,
									   ( boidY + arrowY + arrowX*arrowRatio*this.sin150 + arrowY*arrowRatio*this.cos150  )<<0 );

					theContext.lineTo( ( boidX + arrowX + arrowX*arrowRatio*this.cos210 - arrowY*arrowRatio*this.sin210  )<<0 
									 , ( boidY + arrowY + arrowX*arrowRatio*this.sin210 + arrowY*arrowRatio*this.cos210  )<<0 );
									 
					theContext.lineTo( ( boidX + arrowX )<<0
									 , ( boidY + arrowY )<<0 );	
									 
					theContext.closePath();
					theContext.stroke();			
				}
				
				// empty the desire vectors (necessary!)
				bi.vXrule[rule] = 0;
				bi.vYrule[rule] = 0;
				bi.interactions[rule] = 0;
				
			}
			
			if (this.displayBoidIDs)
			{
				theContext.fillText(bi.id +","+ bi.pigeon,boidX<<0, boidY<<0);
			}		
		}
				
    }



    this.createInteractionList = function(theBalls,pigeonholeWidth, pigeonholeHeight, canvasWidth, canvasHeight)
    {

        // clean InteractionList array of arrays!

			
        var pigeonhole, j, bi, bix, biy, pigeonX, pigeonY; 

        for(var i=theBalls.length-1; i>=0; i--) {

			// could cause problems if number of agents changes mid game!

		
            bi = theBalls[i];
            bix = bi.x;
            biy = bi.y;

            pigeonX = bi.pigeon%pigeonholeWidth; // 0 : pigeonholeWidth-1
            pigeonY = Math.floor(bi.pigeon/pigeonholeWidth); // 0 : pigeonholeHeight -1??
			
			// Check for obstacles
			if (Obstacles==1)
			{			
				if ( ((obstacleX - bix)*(obstacleX - bix) + (obstacleY - biy)*(obstacleY - biy)) < ((obstacleRadius + bi.perceptionRange)*(obstacleRadius + bi.perceptionRange)) ) // could precompute!
				{
						this.applyRulesNow(bi, -5, obstacleX - bix, obstacleY - biy);					
				}				
			}

			
            // loop through the 9 tiles without trying access tiles that are outside of the canvas			
			if (wallCollision==1)
			{
				for(var holeX = pigeonX+1; holeX>= pigeonX-1; holeX--) {

					for(var holeY = pigeonY+1; holeY>= pigeonY-1; holeY--) {

						
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
									bj = theBalls[j];
									dx = bj.x - bix;
									dy = bj.y - biy;
									
								}
								
								if ( 2*Math.abs(dx) > canvasWidth ) {
									dx = canvasWidth - Math.abs(dx);
								}
								
								if ( 2*Math.abs(dy) > canvasHeight ) {
									dy = canvasHeight - Math.abs(dy);
								}								
									
								if ( (dx*dx + dy*dy) <= bi.perceptionRangeSquared ) {
									this.applyRulesNow(bi, j, dx, dy);
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
									bj = theBalls[j];
									dx = bj.x - bix;
									dy = bj.y - biy;
									
								}
								if ( (dx*dx + dy*dy) <= (bi.perceptionRangeSquared) ) {
									this.applyRulesNow(bi, j, dx, dy);									
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

				var penetrationUpper = bix + bi.perceptionRange - canvasWidth;
				var penetrationLower = bi.perceptionRange - bix;
				var dx =0, dy=0;
				
				if (penetrationUpper > 0) { // right wall					
					dx = penetrationUpper;
				} // mutually exclusive events

				else if (penetrationLower > 0) {					
					dx = -penetrationLower;					
				}

				penetrationUpper = biy + bi.perceptionRange - canvasHeight;
				penetrationLower = bi.perceptionRange - biy;
				
				if (penetrationUpper > 0) {				
					dy = penetrationUpper;
				}
				
				else if (penetrationLower > 0) {								
					dy = -penetrationLower;
				}				
				
				if (dx!=0 || dy!=0)
				{
					this.applyRulesNow(bi, -1, dx, dy);
				}
				
				// -1 now equivalent to 'collided with one or more walls'
				
				
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
	
									bj = theBalls[j];
									dx = bj.x - bix;
									dy = bj.y - biy;
									
								}
								if ( (dx*dx + dy*dy) <= (bi.perceptionRangeSquared) ) {
									this.applyRulesNow(bi, j, dx, dy);
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

    }
	
	
	
	this.applyRulesNow = function(theBall, theObject, dx, dy)
	{
	
		var invdistsq = 4/(1 + dx*dx + dy*dy);

		if (theObject<0 && theObject>-5) //wall collision by repulsion
		{
			// Repulsion
			theBall.vXrule[1] -= this.objectRepulsion*(dx?dx<0?-1:1:0)*(1+Math.abs(dx));
			theBall.vYrule[1] -= this.objectRepulsion*(dy?dy<0?-1:1:0)*(1+Math.abs(dy));
			theBall.interactions[1] ++;					
		
		} // repulsion from 4 walls
		else if (theObject==-5)
		{
			// Repulsion
			theBall.vXrule[1] -= this.objectRepulsion*dx*invdistsq;
			theBall.vYrule[1] -= this.objectRepulsion*dy*invdistsq;
			theBall.interactions[1] ++;				
		
		} // repulsion from object
		else
		{
			if (theObject<=-6) // interacting with an object
			{
				// Repulsion
				theBall.vXrule[1] -= this.objectRepulsion*dx*invdistsq;
				theBall.vYrule[1] -= this.objectRepulsion*dy*invdistsq;
				theBall.interactions[1] ++;			
			
			} // Repulsion
			else // interacting with an agent
			{

				// Alignment: steer towards the average heading of local flockmates	
				theBall.vXrule[0] += this.theBalls[theObject].vX;
				theBall.vYrule[0] += this.theBalls[theObject].vY;
				theBall.interactions[0] ++;

				// Repulsion
				theBall.vXrule[1] -= dx*invdistsq;
				theBall.vYrule[1] -= dy*invdistsq;
				theBall.interactions[1] ++;

				// Cohesion: steer to move toward the average position of local flockmates
				theBall.vXrule[2] += dx*Math.sqrt(invdistsq);
				theBall.vYrule[2] += dy*Math.sqrt(invdistsq);	
				theBall.interactions[2] ++;

			} // All three rules
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
        var theBalls = this.theBalls;
   
        var pigeonholeWidth = this.pigeonholeWidth;
        var pigeonholeHeight = this.pigeonholeHeight;

        // what can interact with what
        this.createInteractionList(this.theBalls,this.pigeonholeWidth, this.pigeonholeHeight, this.canvasWidth, this.canvasHeight);
	
		// confirms update!
		for(var i=theBalls.length-1; i>=0; i--) {
			// any chance of zero velocity?
			var bi = theBalls[i];	
			
			// normalise the desire vectors
			if (bi.interactions[0]>1)
			{
				bi.vXrule[0] /= bi.interactions[0];
				bi.vYrule[0] /= bi.interactions[0];
			}
			if (bi.interactions[1]>1)
			{
				bi.vXrule[1] /= bi.interactions[1];
				bi.vYrule[1] /= bi.interactions[1];
			}
			if (bi.interactions[2]>1)
			{
				bi.vXrule[2] /= bi.interactions[2];
				bi.vYrule[2] /= bi.interactions[2];
			}
			
			
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

		for(var i=pigeonholeWidth*pigeonholeHeight-1; i>=0; i--) {		
            this.PigeonHoles[i].length=0;
        }

		// move balls and update pigeonholes
        for(var i=theBalls.length-1; i>=0; i--) {
            theBalls[i].move();
            var pigeonIndex = Math.floor(theBalls[i].x/this.perceptionRange)+Math.floor(theBalls[i].y/this.perceptionRange)*pigeonholeWidth;
            this.PigeonHoles[pigeonIndex].push(i);
            theBalls[i].pigeon = pigeonIndex;
        }
		
		// reset pigeonholes for objects
		for(var i=numObjects-1; i>=0; i--)
		{

			var pigeonIndex =   Math.floor(objectX[i]/this.perceptionRange) + Math.floor(objectY[i]/this.perceptionRange)*pigeonholeWidth;
			this.PigeonHoles[pigeonIndex].push(objectIndex[i]);			
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
			
			x = Math.min( Math.max(x , 1) , (this.canvasWidth-1));
			y = Math.min( Math.max(y , 1) , (this.canvasHeight-1));
			
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
			
			reqFrame(this.drawLoop.bind(this));
			
		}
		else if (this.restartNow == 1)
		{
			this.restart();
		}

    }


	
	this.restart = function()
	{
		
		this.theBalls = [];
		// create an array of pigeonholes
		this.PigeonHoles = [];
		// create the interaction list array;
		
		this.initialPopulation = this.newInitialPopulation;
		this.perceptionRange = this.newPerceptionRange;
		this.perceptionRangeSquared = this.perceptionRange*this.perceptionRange;
		
		wallCollision = this.newWallCollision;
		Obstacles = this.newObstacles;	

		Objects = 1; // Objects turned on
		objectX = [];
		objectY = [];
		numObjects = 0;
		objectIndex = [];

		objectPigeonhole = [];

	   // note - am assuming canvas won't change size!!
		this.pigeonholeWidth = Math.ceil(this.canvasWidth/this.perceptionRange);
		this.pigeonholeHeight = Math.ceil(this.canvasHeight/this.perceptionRange);		
		
		this.restartNow = 0;
				
		this.start();
	
	}
	
    this.start = function()
    {

		// initialise the pigeonhole system
		for (var i=this.pigeonholeWidth*this.pigeonholeHeight-1; i>=0; i--)
        {
			this.PigeonHoles[i] = [];
        }			
	
		for (var i=this.initialPopulation-1; i>=0; i--) {

			var randomAngleInRadians = Math.random()*Math.PI*2;

			var speed = 1;
			
			b = this.makeBall(this.canvasWidth*Math.random(),
							  this.canvasHeight*Math.random(),
							  Math.cos(randomAngleInRadians) * speed,
							  Math.sin(randomAngleInRadians) * speed,
							  speed,
							  this.perceptionRange );
			this.theBalls.push(b);
								// speed
							  // this.genericSpeed*(1+Math.random()*.6-.3),		
							  				//			  (1+Math.random()*.8-.4),	
							  //this.genericStroke
	  
 
		}
		
		this.theCanvas.addEventListener("click",this.doClick.bind(this),false);
		
		this.running = 1;
		
		reqFrame(this.drawLoop.bind(this));
    }

	
    this.init = function()
    {
		// self.id = BoidAgents.length;
		BoidAgents.push(self);

    }

    this.init();

}


