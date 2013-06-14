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


Boid.Agent = function(canvasWidth, canvasHeight, eagleSprite)
{

// PLAYER STUFF
	// this.numberPlayers= 2;
	// this.thePlayers = [];
	
	
	this.eagleSprite = eagleSprite;


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
	this.wallCollision = 0;
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
	
	this.theRepulsors = [];
	
	
	
	// HARDCODED INTERACTION LIST
	this.InteractionList = [];
	
	

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
	
	this.killagent = true;
	this.killThisAgent = {};
	
	this.changeAgent = null;
	this.changeAgentTo = null;
	

	this.circ = Math.PI*2;            // complete circle
	
	// BlackHole code
	this.blackHole = 1;
	this.blackHoleX = this.canvasWidth/2;
	this.blackHoleY = this.canvasHeight/2


	this.Obstacles = 1; // turn obstacle interaction on(1)/off(0)
	// obstacle is a circle
	this.obstacleRadius = 20;
	this.obstacleX = this.canvasWidth/2;
	this.obstacleY = this.canvasHeight/2;
	this.obstacleIndex = -5;
	this.obstacleRepulsion =100;
	
	this.Objects = 1; // Objects turned on
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
	this.newWallCollision = this.wallCollision;
	this.newObstacles = this.Obstacles;
	
	

	
	
	// precomputed sin/cos functions
	this.sin140 = Math.sin(140*Math.PI/180);
	this.cos140 = Math.cos(140*Math.PI/180);
	this.sin220 = Math.sin(220*Math.PI/180);
	this.cos220 = Math.cos(220*Math.PI/180);
	
	this.sin150 = Math.sin(150*Math.PI/180);
	this.cos150 = Math.cos(150*Math.PI/180);
	this.sin210 = Math.sin(210*Math.PI/180);
	this.cos210 = Math.cos(210*Math.PI/180);	
	
	
	this.numTypes = 5;
	// types (of things you can interact with)
	// type 0 = Obstacle
	// type 1 = Wall
	// type 2 = Boid
	// type 3 = Repulsor
	// type 4 = Boid2?
	// type 5 = Black Hole
	
	// id stored as monotonically increasing pseudoglobal
	// only tracks Boids/Repulsors etc


	// RULES
	// alignment
	// repulsion	
	// cohesion
	// wall repulsion
	// object repulsion
	// black hole gravitation
	
	
	// Rule coefficients

	
	
	
	this.ruleCoeffs = [];
	this.ruleCoeffs[0] = [0, 0, 0, 0,    1000, 0]; // obstacle
	this.ruleCoeffs[1] = [0, 0, 0, 1000, 0,    0]; // wall
	this.ruleCoeffs[2] = [1, 1, 0, 0,    0,    0]; // boid
	this.ruleCoeffs[3] = [0, 0, 0, 0,    1000, 0]; // repulsor
	this.ruleCoeffs[4] = [1, 1, 0, 0,    0,    0]; // boid2
	this.ruleCoeffs[5] = [0, 0, 0, 0,    0,    1]; // black hole gravitation
	
	this.numRules = this.ruleCoeffs[0].length;

	
	// this.ruleCoeffs[0] = 1; // alignment coefficient
	// this.ruleCoeffs[1] = 1; // repulsion coefficient
	// this.ruleCoeffs[2] = 0; // cohesion coefficient
	this.ruleColours = ['rgb(0,  0,  255)',
					    'rgb(0,  255,255)',
					    'rgb(255,0  ,255)',
					    'rgb(255,100,255)',
						'rgb(100,0  ,255)',
						'rgb(0  ,0  ,0  )'
						];

	// graphics controls
	this.pigeonholesVisible = false;
	this.perceptionRangeVisible = true;
	this.ruleVectorVisible = [true, true, true, true, true, true];	
	this.displayBoidIDs = true;	
						
	
	this.numObjects = 0; // global object counter!
	
	// slider set coefficient functions
	
	this.setCoeff0 = function(v)
	{
		this.ruleCoeffs[2][0] = v;
		this.ruleCoeffs[4][0] = v;
		
	};
	
	this.setCoeff1 = function(v)
	{
		
		this.ruleCoeffs[2][1] = v;
		this.ruleCoeffs[4][1] = v;		
		
		
	};

	this.setCoeff2 = function(v)
	{
		
		this.ruleCoeffs[2][2] = v;
		this.ruleCoeffs[4][2] = v;				
		
		
	};

	this.setCoeff3 = function(v)
	{
		
		this.simulationSpeed = v;

		
	};
	
	
	
	
	
	
	
	

	this.repulsor = {
		x : 0,
		y : 0,
		id : 0,
		pigeon : 0,
		next : null,
		prev : null,
		type : 3,
		
		};

		
	this.makeRepulsor = function( x, y )
	{
	
	    Empty = function () {};
        Empty.prototype = this.repulsor;
        var repulsor = new Empty();	
		
		x = Math.min( Math.max(x , 1) , (this.canvasWidth-1));
		y = Math.min( Math.max(y , 1) , (this.canvasHeight-1));		
		
		repulsor.x = x;
		repulsor.y = y;
					
		repulsor.id = this.numObjects++;
		
		repulsor.type = 3;

		pigeon =   Math.floor(x / this.perceptionRange)
			    + (Math.floor(y / this.perceptionRange)) * this.pigeonholeWidth;

		repulsor.prev = null;
		repulsor.next = this.PigeonHoles[pigeon];
		
	// doesn't set previous value for the next item!
		if (repulsor.next!==null)
		{
			repulsor.next.prev=repulsor;
		}

		this.PigeonHoles[pigeon] = repulsor;

		repulsor.pigeon = pigeon;
		this.theRepulsors.push(repulsor);		

	//	this.testLinkedList("Called from makeRepulsor");
	}


	
	
    this.aBall = {
        x : 0,
        y : 0,
        vX : 0,
        vY : 0,
		vXrule : [0, 0, 0],
		vYrule : [0, 0, 0],
		interactions : [0, 0, 0],
		id : 0,
        pigeon : 0, // pigeonhole
        speed : 1,
		perceptionRange : self.perceptionRange,
		perceptionRangeSquared: self.perceptionRange*self.perceptionRange,
		next: null,
		prev: null,
		type: 2,

        // draw : function() {

			// var theContext = self.theContext;

			// // show perception Range
			
			// if (self.perceptionRangeVisible)
			// {
				// theContext.strokeStyle = 'rgba(255,0,0,0.1)';
				// theContext.lineWidth = 5;
				// theContext.beginPath();
				// theContext.arc((this.x)<<0,(this.y)<<0, this.perceptionRange-theContext.lineWidth/2,0, self.circ,true);
				// theContext.closePath();
				// theContext.stroke();
			// }
			
			// // draw boid triangle
			// theContext.strokeStyle = 'rgba(0,255,0,1)';
			// theContext.lineWidth = 1;			
            // theContext.beginPath();			
			// var ratio = this.perceptionRange/(this.speed);
			// theContext.moveTo( (this.x+(this.vX*ratio) )<<0,( this.y+(this.vY*ratio) )<<0 );
			// var theta = 140*Math.PI/180;

			// theContext.lineTo( ( this.x+(this.vX*Math.cos(theta)-this.vY*Math.sin(theta))*ratio )<<0 
			                 // , ( this.y+(this.vX*Math.sin(theta)+this.vY*Math.cos(theta))*ratio )<<0 );
			// theta = (140+80)*Math.PI/180;
			// theContext.lineTo( ( this.x+(this.vX*Math.cos(theta)-this.vY*Math.sin(theta))*ratio )<<0
                 			 // , ( this.y+(this.vX*Math.sin(theta)+this.vY*Math.cos(theta))*ratio )<<0 );
			// theContext.lineTo( ( this.x+(this.vX*ratio) )<<0 
			                 // , ( this.y+(this.vY*ratio) )<<0 ) ;
					
            // theContext.closePath();
            // theContext.stroke();
			
			// var arrowX;
			// var arrowY;
			
			// // draw desire vector arrows
			// for (var rule = 0; rule < self.ruleCoeffs.length; rule ++)
			// {
				// if (self.ruleVectorVisible[rule] )
				// {
					// theContext.strokeStyle = self.ruleColours[rule];
					// theContext.beginPath();
					// theContext.moveTo( (this.x)<<0 
					                 // , (this.y)<<0 );
					// arrowX = this.vXrule[rule]*ratio*self.ruleCoeffs[rule];
					// arrowY = this.vYrule[rule]*ratio*self.ruleCoeffs[rule];
					// theContext.lineTo( ( this.x+arrowX )<<0 
					                 // , ( this.y+arrowY )<<0 );
					
					// var arrowRatio = .2;
					// theta = 150*Math.PI/180;
					// theContext.lineTo( ( this.x +arrowX+ arrowRatio*( arrowX*Math.cos(theta) - arrowY*Math.sin(theta) ) )<<0,
					                   // ( this.y +arrowY+ arrowRatio*( arrowX*Math.sin(theta) + arrowY*Math.cos(theta) ) )<<0 );
					// theta = 210*Math.PI/180;
					// theContext.lineTo( ( this.x +arrowX+ arrowRatio*( arrowX*Math.cos(theta) - arrowY*Math.sin(theta) ) )<<0 
					                 // , ( this.y +arrowY+ arrowRatio*( arrowX*Math.sin(theta) + arrowY*Math.cos(theta) ) )<<0 );
					// theContext.lineTo( ( this.x +arrowX )<<0
					                 // , ( this.y +arrowY )<<0 );	
					// theContext.closePath();
					// theContext.stroke();			
				// }
			// }
			
			// if (self.displayBoidIDs)
			// {
				// theContext.fillText(this.id +","+ this.pigeon,this.x<<0, this.y<<0);
			// }
			
			
        // },

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

			if (self.wallCollision==1) // toroidal
			{

				this.x = (this.x+self.canvasWidth)%self.canvasWidth;
				this.y = (this.y+self.canvasHeight)%self.canvasHeight;

			}
			else if (self.wallCollision==0) // hard bounce
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
			else if (self.wallCollision==2) // repulsion
			{
				
				this.x = Math.min( Math.max(this.x , 1) , (self.canvasWidth-1));
				this.y = Math.min( Math.max(this.y , 1) , (self.canvasHeight-1));					

			}
			else
			{
				debugger;
			}
			
			// have I changed pigeonhole?
			
		
			var newPigeon = ( (this.x / self.perceptionRange)<<0 )
			              + ( (this.y / self.perceptionRange)<<0 ) * self.pigeonholeWidth;
				  
			if (newPigeon!=this.pigeon) // pigeonhole changed!
			{
				// remove from previous pigeonhole list
				// WRONG - not necessarily at the head
				
				if (this.prev===null) // obviously at top of list
				{
					// is this *really* at the head?
					self.PigeonHoles[this.pigeon] = this.next; // point to next in list
				}
				else // not at top of list
				{
					this.prev.next = this.next;
				}

				// if there is a next object
				if (this.next!==null)
				{
					this.next.prev = this.prev;
				}

				// AT THIS POINT ORPHANS SHOULD BE ENTIRELY REMOVED!				
				
				// add to new pigeonhole list

				this.next = self.PigeonHoles[newPigeon]; // point at the head of the list			
				this.prev = null; // I am at the top!
				
				self.PigeonHoles[newPigeon] = this; // take the head of the list

				if (this.next!==null)
				{				
					this.next.prev = this;
				}

				this.pigeon = newPigeon; //update pigeonhole				

			}	
			
        }
    };
	

	

	
	


	// this.addBall = function()
    // {
		// this.addAgent = true;
    // }

	this.destroyBall = function(ball)
	{
		// delete from theBalls via a slice#
		
		// have to find it first - loop through entire list - not efficient if this happens a lot!
		var i = 0;
		while(this.theBalls[i]!==ball)
		{
			i++;
		}

		this.theBalls.splice(i,1);
				
		// remove from PigeonHoles

		if (ball.prev===null) // obviously at top of list
		{
			// is this *really* at the head?
			this.PigeonHoles[ball.pigeon] = ball.next; // point to next in list
		}
		else // not at top of list
		{
			ball.prev.next = ball.next;
		}

		// if there is a next object
		if (ball.next!==null)
		{
			ball.next.prev = ball.prev;
		}		
		
	};
	
	
	
	this.makeBall = function(x, y, vX, vY, speed, perceptionRange , type) {

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
		if (this.Obstacles==1)
		{
			while ( ( (this.obstacleX - x)*(this.obstacleX - x) + (this.obstacleY - y)*(this.obstacleY - y) )  
			      < (this.obstacleRadius*this.obstacleRadius) )
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
        // ball.stroke = stroke;
		ball.speed = speed;
		ball.vXrule = [0,0,0];
		ball.vYrule = [0,0,0];
		ball.interactions = [0,0,0];
		ball.type = type; // Boid Type
		

        // make Ball note which pigeonhole it is in
        ball.pigeon = Math.floor(x/ this.perceptionRange) + (Math.floor(y/this.perceptionRange)) * this.pigeonholeWidth;
		
		// if (ball.pigeon >= this.pigeonholeWidth*this.pigeonholeHeight || ball.pigeon <0)
		// {
			// debugger;
		// }
		
//		ball.id = this.theBalls.length;
		ball.id = this.numObjects++;
		
        // this.PigeonHoles[ball.pigeon].push(ball.id);
        //this.PigeonHoles[ball.pigeon].push(ball);
		
		// add ball to pigeonhole at head of list
		
		ball.next = this.PigeonHoles[ball.pigeon]; // point to old list head
		ball.prev = null; // so you know this ball is at the start of the list
		this.PigeonHoles[ball.pigeon] = ball; // place at head of the list
		if (ball.next!==null)
		{
			ball.next.prev=ball;
		}

        this.theBalls.push(ball);
    };



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
			theContext.lineWidth = 1;			
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
		if (this.Obstacles==1) {
		
            theContext.strokeStyle = 'rgba(255,0,0,1)';
            theContext.beginPath();
            theContext.arc(this.obstacleX<<0, this.obstacleY<<0, this.obstacleRadius,0, this.circ,true);
            theContext.closePath();
            theContext.stroke();

		}
		
		// draw objects
		if (this.theRepulsors.length>0)
		{
		
			theContext.strokeStyle = 'rgba(0,255,0,1)';
			theContext.beginPath();		
			for (var obj = this.theRepulsors.length-1; obj>=0; obj--)
			{
				theContext.moveTo( (this.theRepulsors[obj].x) <<0 , (this.theRepulsors[obj].y) <<0);
				theContext.arc(    (this.theRepulsors[obj].x) <<0 , (this.theRepulsors[obj].y) <<0, 1,0, this.circ,true);							
			}
			theContext.closePath();
			theContext.stroke();			
		}

		// draw Boids

		for (var i=this.theBalls.length-1; i>=0; i--)  // cycle through Boid list
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
				theContext.lineWidth = 1;									
			}
			
			
			var ratio = this.perceptionRange/(bi.speed);	
			var boidX = bi.x;
			var boidY = bi.y;
			
			if (bi.type==2)
			{
			
			
				// draw boid triangle
				theContext.strokeStyle = 'rgba(0,255,0,1)';
	
				theContext.beginPath();			

				

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
			
			}
			else if (bi.type==4)
			{
				var centredX = boidX<<0;
				var centredY = boidY<<0;
				var angle = Math.atan2(bi.vY, bi.vX) - Math.PI/2;
			
			
				theContext.translate(centredX,centredY);
				theContext.rotate(angle);
	
				theContext.drawImage(this.eagleSprite, -(this.eagleSpriteHalfWidth<<0)
				                                     , -(this.eagleSpriteHalfWidth<<0) )
													 
				theContext.rotate(-angle);
				theContext.translate(-centredX, -centredY); 			
			


				// draw boid triangle
				// theContext.strokeStyle = 'rgba(0,0,0,1)';
	
				// theContext.beginPath();			

				
				// var boidX = bi.x;
				// var boidY = bi.y;
				// var normVx = bi.vX*ratio;
				// var normVy = bi.vY*ratio;
				
				// theContext.moveTo( ( boidX+normVx )<<0
								 // , ( boidY+normVy )<<0 );

				// theContext.lineTo( ( boidX + normVx*this.cos140 - normVy*this.sin140 )<<0 
								 // , ( boidY + normVx*this.sin140 + normVy*this.cos140 )<<0 );
		
				// theContext.lineTo( ( boidX + normVx*this.cos220 - normVy*this.sin220 )<<0
								 // , ( boidY + normVx*this.sin220 + normVy*this.cos220 )<<0 );
								 
				// theContext.lineTo( ( boidX + normVx )<<0 
								 // , ( boidY + normVy )<<0 ) ;
						
				// theContext.closePath();
				// theContext.stroke();			
			
			
			}
			
			// HARCODED INTERACTION LIST STUFF
			// iterate through interaction list drawing lines
			if (this.InteractionList[i].length>0)
			{

				theContext.strokeStyle = 'rgb(255,105,180)';
				theContext.beginPath();				
			
				for (var j = this.InteractionList[i].length-1; j>=0; j--)
				{
					// move to my location
					var a = this.InteractionList[i][j];
					theContext.moveTo( boidX, boidY );
					theContext.lineTo( a.x, a.y );

				}
				theContext.closePath();
				theContext.stroke();
				this.InteractionList[i] = [];
			}


			
			var arrowX;
			var arrowY;
			var arrowRatio = .2;
			
			// draw desire vector arrows 
			for (var rule = this.ruleCoeffs.length-1; rule >=0; rule --)
			{
				if (this.ruleVectorVisible[rule] && bi.interactions[rule]) // rule vector set to visble AND an interaction occurred
				{
					theContext.strokeStyle = this.ruleColours[rule];
					theContext.beginPath();
					theContext.moveTo( boidX<<0 
									 , boidY<<0 );
									 							 
					arrowX = bi.vXrule[rule]*ratio;
					arrowY = bi.vYrule[rule]*ratio;
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
				
    };



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
			
			// GRAVITATIONAL HARDCODE
			
			if (this.blackHole = 1 && bi.type==4)
			{
				this.applyRulesNow(bi, 5, this.blackHoleX - bix, this.blackHoleY - biy);
			}
			
			
			
			// Check for obstacles
			if (this.Obstacles==1)
			{			
				if ( ((this.obstacleX - bix)*(this.obstacleX - bix) + (this.obstacleY - biy)*(this.obstacleY - biy)) 
				   < ((this.obstacleRadius + bi.perceptionRange)*(this.obstacleRadius + bi.perceptionRange)) ) // could precompute!
				{
					this.applyRulesNow(bi, 0, this.obstacleX - bix, this.obstacleY - biy);					
				}				
			}
			
			// Check for walls
			if (this.wallCollision==2)
			{
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
					this.applyRulesNow(bi, 1, dx, dy);
				}
				
			}
			
			

			
            // loop through the 9 tiles without trying access tiles that are outside of the canvas			
			
			for(var holeX = pigeonX+1; holeX>= pigeonX-1; holeX--) {

				for(var holeY = pigeonY+1; holeY>= pigeonY-1; holeY--) {
					
					var pigeonhole =      ((holeX+pigeonholeWidth )%pigeonholeWidth ) 
					    + pigeonholeWidth*((holeY+pigeonholeHeight)%pigeonholeHeight);
					// now iterate through the Balls in this pigeon if any
						
					var bj = this.PigeonHoles[pigeonhole];
					while (bj!==null)
					{

						// here is where you'd add an if statement to cut work in half!
						if(bj !== bi) { //

						// test if within perceptionRange
							var dx,dy;
							
							dx = bj.x - bix;
							dy = bj.y - biy;							
							
							if (this.wallCollision==1) // toroidal least distance
							{
							
								if ( 2*Math.abs(dx) > canvasWidth ) {
									dx = canvasWidth - Math.abs(dx);
								}
								
								if ( 2*Math.abs(dy) > canvasHeight ) {
									dy = canvasHeight - Math.abs(dy);
								}								
							}
								
							if ( (dx*dx + dy*dy) <= bi.perceptionRangeSquared ) {
								this.applyRulesNow(bi, bj.type, dx, dy, bj);
								
								// HARDCODED INTERACTION LIST STUFF
								
								this.InteractionList[i].push(bj);								
								
							}
						}
						
						bj = bj.next;
						
					}	
				}
			}
        }
    };
	


	
	
	this.applyRulesNow = function(theBall, objectType, dx, dy, theObject)
	{
		var ruleCoeff = this.ruleCoeffs[objectType];
		var invdistsq
		
		// HARDCODED INTERACTION LIST CODE    		
	
		if (ruleCoeff[0]) // alignment
		{
			theBall.vXrule[0] += ruleCoeff[0]*theObject.vX;
			theBall.vYrule[0] += ruleCoeff[0]*theObject.vY;
			theBall.interactions[0] ++;		
		}
			
		if (ruleCoeff[1]) // boid repulsion
		{
			invdistsq = 4/(1 + dx*dx + dy*dy);
			theBall.vXrule[1] -= ruleCoeff[1]*dx*invdistsq;
			theBall.vYrule[1] -= ruleCoeff[1]*dy*invdistsq;
			theBall.interactions[1] ++;		
		}

		if (ruleCoeff[2]) // cohesion
		{
			invdistsq = invdistsq || 4/(1 + dx*dx + dy*dy);
			theBall.vXrule[2] += ruleCoeff[2]*dx*Math.sqrt(invdistsq);
			theBall.vYrule[2] += ruleCoeff[2]*dy*Math.sqrt(invdistsq);	
			theBall.interactions[2] ++;
		}

		if (ruleCoeff[3]) // wall repulsion
		{
			theBall.vXrule[3] -= ruleCoeff[3]*(dx?dx<0?-1:1:0)*(1+Math.abs(dx));
			theBall.vYrule[3] -= ruleCoeff[3]*(dy?dy<0?-1:1:0)*(1+Math.abs(dy));
			theBall.interactions[3] ++;	
		}
		
		if (ruleCoeff[4]) // object repulsion
		{
			invdistsq = invdistsq || 4/(1 + dx*dx + dy*dy);
			theBall.vXrule[4] -= ruleCoeff[4]*dx*invdistsq;
			theBall.vYrule[4] -= ruleCoeff[4]*dy*invdistsq;
			theBall.interactions[4] ++;		
		}		
		
		if (ruleCoeff[5]) // object repulsion
		{
			invdistsq = invdistsq || 4/(1 + dx*dx + dy*dy);
			theBall.vXrule[5] += ruleCoeff[5]*dx*invdistsq;
			theBall.vYrule[5] += ruleCoeff[5]*dy*invdistsq;
			theBall.interactions[5] ++;		
		}			
		
	}
	
	
	
	
	
	
	
	// this.applyRulesNow = function(theBall, objectType, dx, dy, theObject)
	// {
	
		// var invdistsq = 4/(1 + dx*dx + dy*dy);
		
		// if (objectType===1) //// repulsion from 4 walls
		// {
			// // Repulsion
			// theBall.vXrule[1] -= this.objectRepulsion*(dx?dx<0?-1:1:0)*(1+Math.abs(dx));
			// theBall.vYrule[1] -= this.objectRepulsion*(dy?dy<0?-1:1:0)*(1+Math.abs(dy));
			// theBall.interactions[1] ++;					
		
		// } 
		// else if (objectType===0) // repulsion from object
		// {
			// // Repulsion
			// theBall.vXrule[1] -= this.objectRepulsion*dx*invdistsq;
			// theBall.vYrule[1] -= this.objectRepulsion*dy*invdistsq;
			// theBall.interactions[1] ++;				
		
		// } 
		// else
		// {
			// if (objectType===3) // interacting with an object
			// {
				// // Repulsion
				// theBall.vXrule[1] -= this.objectRepulsion*dx*invdistsq;
				// theBall.vYrule[1] -= this.objectRepulsion*dy*invdistsq;
				// theBall.interactions[1] ++;			
			
			// } // Repulsion
			// else if (objectType===2)// interacting with an agent
			// {

				// // Alignment: steer towards the average heading of local flockmates	
				// theBall.vXrule[0] += theObject.vX;
				// theBall.vYrule[0] += theObject.vY;
				// theBall.interactions[0] ++;

				// // Repulsion
				// theBall.vXrule[1] -= dx*invdistsq;
				// theBall.vYrule[1] -= dy*invdistsq;
				// theBall.interactions[1] ++;

				// // Cohesion: steer to move toward the average position of local flockmates
				// theBall.vXrule[2] += dx*Math.sqrt(invdistsq);
				// theBall.vYrule[2] += dy*Math.sqrt(invdistsq);	
				// theBall.interactions[2] ++;

			// } // All three rules
			// else
			// {
				// debugger;
			// }
		// }
	// }
	



    // move the balls
    this.moveBalls = function() {
        var theBalls = this.theBalls;
        var pigeonholeWidth = this.pigeonholeWidth;
        var pigeonholeHeight = this.pigeonholeHeight;
		
		// HARDCODED INTERACTION LIST CODE
		this.InteractionList = [];
        for(var i=theBalls.length-1; i>=0; i--) {
            this.InteractionList[i] = [];
        }		

        // what can interact with what
        this.createInteractionList(this.theBalls,this.pigeonholeWidth, this.pigeonholeHeight, this.canvasWidth, this.canvasHeight);

		// confirms update!
		for(var i=theBalls.length-1; i>=0; i--) {
			// any chance of zero velocity?
			var bi = theBalls[i];	
			
			// normalise the desire vectors
			// if (bi.interactions[0]>1)
			// {
				// bi.vXrule[0] /= bi.interactions[0];
				// bi.vYrule[0] /= bi.interactions[0];
			// }
			// if (bi.interactions[1]>1)
			// {
				// bi.vXrule[1] /= bi.interactions[1];
				// bi.vYrule[1] /= bi.interactions[1];
			// }
			// if (bi.interactions[2]>1)
			// {
				// bi.vXrule[2] /= bi.interactions[2];
				// bi.vYrule[2] /= bi.interactions[2];
			// }
			// if (bi.interactions[3]>1)
			// {
				// bi.vXrule[3] /= bi.interactions[3];
				// bi.vYrule[3] /= bi.interactions[3];
			// }
			// if (bi.interactions[4]>1)
			// {
				// bi.vXrule[4] /= bi.interactions[4];
				// bi.vYrule[4] /= bi.interactions[4];
			// }
			
			// var nvx = bi.vX + bi.vXrule[0] + bi.vXrule[1] + bi.vXrule[2] + bi.vXrule[3] + bi.vXrule[4];
			// var nvy = bi.vY + bi.vYrule[0] + bi.vYrule[1] + bi.vYrule[2] + bi.vXrule[3] + bi.vXrule[4];	
			
			
			var nvx = bi.vX;
			var nvy = bi.vY;
			for (ruleNo = this.numRules; ruleNo>=0; ruleNo--)
			{
				if (bi.interactions[ruleNo])
				{
					bi.vXrule[ruleNo] /= bi.interactions[ruleNo];
					nvx += bi.vXrule[ruleNo];
					bi.vYrule[ruleNo] /= bi.interactions[ruleNo];
					nvy += bi.vYrule[ruleNo];
				}
			}
			
			var z = Math.sqrt(nvx*nvx + nvy*nvy);
			if (z<.001) {
				//Marios: Note - very unlikely to enter this loop ... but just in case the vectors cancel out 
				
				var randomAngleInRadians = Math.random()*this.circ;
				theBalls[i].vX = Math.cos(randomAngleInRadians) * theBalls[i].speed;
				theBalls[i].vY = Math.sin(randomAngleInRadians) * theBalls[i].speed;
				
			}
			else {				
				normalisingCoefficient = theBalls[i].speed/z;
				theBalls[i].vX = nvx*normalisingCoefficient;
				theBalls[i].vY = nvy*normalisingCoefficient;
			}
		}					

        for(var i=theBalls.length-1; i>=0; i--) {
            theBalls[i].move();
        }

	// fake trigger code	
		this.changeAgent = Math.floor((this.theBalls.length)*Math.random());
		this.changeAgentTo = 2*Math.ceil(Math.random()*2);
		
		if (this.changeAgent)
		{
			this.theBalls[this.changeAgent].type = this.changeAgentTo;
		
		
		
			this.changeAgent = null;
			this.changeAgentTo = null;
		}

		
		this.killagent = false;
		if (this.killagent && this.theBalls.length>0)
		{	
			var c = Math.random();
			var b = this.theBalls.length;
			var a = Math.floor(c*b);
			this.killThisAgent = this.theBalls[a];
			
			this.destroyBall(this.killThisAgent);
			this.killagent = false;
			
			this.killagent = true;
		}		
		
		
			
        // Note - this prevents new agent creation in the middle of a cycle
        // Downside, reduces user agency noticeably (creation latency)!
        if (this.addAgent && this.Objects==1) {

			// CREATE AGENTS ON CLICK CODE
            // var randomAngleInRadians = Math.random()*this.circ;
            // b = self.makeBall( self.addAgentX, self.addAgentY, Math.cos(randomAngleInRadians) * self.genericSpeed, Math.sin(randomAngleInRadians) * self.genericSpeed, self.genericSpeed, self.genericRadius, self.genericStroke );

			if (0)
			{
			
			

				var randomAngleInRadians = Math.random()*this.circ;
				var speed = 1;
				this.makeBall(this.addAgentX,
								  this.addAgentY,
								  Math.cos(randomAngleInRadians) * speed,
								  Math.sin(randomAngleInRadians) * speed,
								  speed,
								  this.perceptionRange,
								  2*Math.ceil(Math.random()*2) // 50% type 2, 50% type 4
								  );			
			
				this.addAgent = 0;
			}
			else
			{
				this.makeRepulsor(this.addAgentX, this.addAgentY);
				this.addAgent = 0;
			}

        }	
		
		// HARDCODED INTERACTION LIST CODE
        // for(var i=theBalls.length-1; i>=0; i--) {
            // this.InteractionList[i] = [];
        // }

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
		this.theRepulsors = [];
		
		
		this.initialPopulation = this.newInitialPopulation;
		this.perceptionRange = this.newPerceptionRange;
		this.perceptionRangeSquared = this.perceptionRange*this.perceptionRange;
		
		this.wallCollision = this.newWallCollision;
		this.Obstacles = this.newObstacles;	

		this.Objects = 1; // Objects turned on

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
			this.PigeonHoles[i] = null;
        }
	
		for (var i=this.initialPopulation-1; i>=0; i--) {

			var randomAngleInRadians = Math.random()*this.circ;
			var speed = 1;
			this.makeBall(this.canvasWidth*Math.random(),
							  this.canvasHeight*Math.random(),
							  Math.cos(randomAngleInRadians) * speed,
							  Math.sin(randomAngleInRadians) * speed,
							  speed,
							  this.perceptionRange,
							  2*Math.ceil(Math.random()*2) // 50% type 2, 50% type 4
							  );
			// this.theBalls.push(b);
								// speed
							  // this.genericSpeed*(1+Math.random()*.6-.3),		
							  				//			  (1+Math.random()*.8-.4),	
							  //this.genericStroke

		}
		
		// HARDCODED INTERACTION LIST CODE
        for(var i=this.theBalls.length-1; i>=0; i--) {
            this.InteractionList[i] = [];
        }		
		
		this.eagleSpriteHalfWidth = this.eagleSprite.width/2;
		this.eagleSpriteHalfHeight = this.eagleSprite.height/2;			
		
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



	
	// // doubly linked list test function
	// this.testLinkedList = function(calledFromWhere)
	// {
		// var count = [];
		
		// // traverse every list? FORWARDS
		
		// for (var i=this.pigeonholeWidth*this.pigeonholeHeight-1; i>=0; i--)
        // {
			// var bjprior=null;
			// var bj = this.PigeonHoles[i];
			// while (bj!==null)
			// {

				// if (!count[bj.id])
				// {
					// count[bj.id]=i;
				// }
				// else // duplicate!
				// {
					// debugger; 
				// }


				// if (bj==bj.next) // infinite loop!
				// {
					// debugger;
				// }
				// if (bj!=null && !bj) // not null but some other 'falsy' state
				// {
					// debugger;			
				// }
				// bjprior = bj;
				// bj = bj.next;
			// }
			
			// // now backwards
			// bj = bjprior;
			// while (bj!==null)
			// {
				// if (bj==bj.prev) // infinite loop!
				// {
					// debugger;
				// }			
			
				// bjprior = bj;
				// bj = bj.prev;
			// }
			// // if successful, should read the head of the list
			
			// if (bjprior!=this.PigeonHoles[i])
			// {
				// debugger;
			// }
        // }	
		// // count number of instances of boids
	// }	


