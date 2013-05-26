Boid = {};

var BoidAgents       = [];
Boid.Players         = [];

Boid.Player = function(name, id ){
	var self = this;
	this.name = name;
	this.id = null;
	this.inputmethod = "Keyboard";
	this.balls = [];
	/*this.add_ball = function(ball)
	{
		ball.parent = player;
		player.balls.push(ball);
		if(self.thePlayers.length===0)
		{
			player.name="Player1";
			self.theBalls.push(ball);
		}
		if(self.thePlayers.length===1)
		{
			player.name="Player2";
			self.theBalls.push(ball);
		}
	}*/
	this.init = function()
	{
		document.onkeydown = self.input;
		self.id = Boid.Players.length;
		Boid.Player.push(self);
	}

	this.input = function(event)
	{
		switch(this.input)
		{
			case "Mouse": break;
			case "Keyboard":
				switch(event.keyCode)
				{
					case 37: self.theBalls[2].x -= 60; console.log(x); break;
					case 38: this.y -=5; console.log(y); break;
					case 39: this.x +=5; console.log(x); break;
					case 40: this.y +=5; console.log(y); break;
					default:
						 console.log(event.keyCode);
					break;
				}break;
			default: break;
		}
	}
	self.init();
}



Boid.Agent = function()
{

	this.running;
	var toroidal = 1;

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
	
	// Rule coefficients
	this.RepCoeff  = 1; // repulsion coefficient
    this.AliCoeff  = 1;	// alignment coefficient
	this.CohCoeff  = 0;	// cohesion coefficient	
	

	// temp veloctity variables
	var newVX = [];
	var newVY = [];


	this.theCanvas = document.getElementById("mycanvas");
	this.theContext = this.theCanvas.getContext("2d");
	// these are effectively the constants

	var theCanvas   = this.theCanvas;
	var theContext  = this.theContext;

	this.genericStroke = "#728FCE";        // black outline
	this.circ = Math.PI*2;            // complete circle

	var circ = this.circ;

	// make everything go the same speed
	// Marios: This is where I'm dumping any new parameters







	this.perceptionRange = 5;
	var perceptionRange = this.perceptionRange;

	this.perceptionRangeSquared = this.perceptionRange*this.perceptionRange;
	this.directionIndicatorLength = this.perceptionRange;
	var directionIndicatorLength = this.directionIndicatorLength;
	
	this.genericRadius = perceptionRange; // this is just the radius at which I want to initialise all my Balls	
	this.genericSpeed = perceptionRange/2; // this is just the speed at which I want to initialise all my Balls	
	
	this.initialPopulation = 5000;

    // note - am assuming canvas won't change size!!
    this.pigeonholeWidth = Math.ceil(this.theCanvas.width/this.perceptionRange);
    this.pigeonholeHeight = Math.ceil(this.theCanvas.height/this.perceptionRange);

    // Semaphore variable to add agent
    this.addAgent = false;

    var addAgentX = 0;
    var addAgentY = 0;


    this.aBall = {
        x : 100,
        y : 100,
        vX : 10,
        vY : 10,
        pigeon : 0, // pigeonhole
        speed : this.genericSpeed,
        radius : this.genericRadius,
        colour : this.genericColour,
        stroke : this.genericStroke,

        draw : function() {
            theContext.strokeStyle = this.stroke;
            theContext.beginPath();
            theContext.arc(this.x,this.y, perceptionRange,0, circ,true);
            theContext.moveTo(this.x,this.y);
            theContext.lineTo(this.x + directionIndicatorLength*this.vX/this.speed, this.y + directionIndicatorLength*this.vY/this.speed);
            theContext.closePath();
            theContext.stroke();
        },

        // make 'em "bounce" when they go over the edge
        // no loss of velocity
        move: function() {
            this.x += this.vX;
            this.y += this.vY;

            // Marios: Wouldn't need to check velocity if you could *only* hit the wall when moving in that direction
            // Marios: Could remove wall issues by using toroidal space
            // Marios: My modifications implicitly assume you won't *appear* in the wall
            // Marios: Minor unnecessary optimisation - only checks for Upper penetration in an axis
            // if Lower penetration has not occurred

			if (toroidal)
			{
			// Note - this ignores radius
				this.x = (this.x+theCanvas.width)%theCanvas.width;
				this.y = (this.y+theCanvas.height)%theCanvas.height;

			}
			else
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
        }

    };





	this.addBall = function()
    {
		self.addAgent = true;
    }

	this.makeBall = function(x,y, vX, vY, radius, colour, stroke) {

        var theCanvas = this.theCanvas;

        // Ugly Javascript object instantiation
        Empty = function () {};
        Empty.prototype = this.aBall;
        var ball = new Empty();

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
        ball.pigeon = Math.floor(x/ this.perceptionRange) + (Math.floor(y/this.perceptionRange)) * this.pigeonholeWidth;
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

            pigeonX = bi.pigeon%pigeonholeWidth; // 0 : pigeonholeWidth - 1
            pigeonY = Math.floor(bi.pigeon/pigeonholeWidth); // 0 : pigeonholeHeight -1??

            // loop through the 9 tiles without trying access tiles that are outside of the canvas			
			if (toroidal)
			{
				for(var holeX = pigeonX+1; holeX>= pigeonX-1; holeX--) {
				//	holeX = (holeX+pigeonholeWidth)%pigeonholeWidth;
					for(var holeY = pigeonY+1; holeY>= pigeonY-1; holeY--) {
						//holeY = (holeY+pigeonholeHeight)%pigeonholeHeight;
						
						pigeonhole = ((holeX+pigeonholeWidth)%pigeonholeWidth) + pigeonholeWidth*((holeY+pigeonholeHeight)%pigeonholeHeight);
						// now iterate through the Balls in this pigeon if any
						if (pigeonhole < 0 || pigeonhole >= pigeonholeWidth*pigeonholeHeight) {
							debugger;
						}
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
			else
			{		

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
					var bj = ballList[interactor2];

					// Repulsion: steer to avoid crowding local flockmates
					
					var bxs = bi.x - bj.x;
					var bys = bi.y - bj.y;

					if (toroidal) {
						if ( 2*Math.abs(bxs) > theCanvas.width ) {
							bxs = theCanvas.width - bxs;
						}
						
						if ( 2*Math.abs(bys) > theCanvas.height ) {
							bys = theCanvas.height - bys;
						}
					}
					
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


        for(var i=theBalls.length-1; i>=0; i--) {
            theBalls[i].move();
            var pigeonIndex = Math.floor(theBalls[i].x/perceptionRange)+Math.floor(theBalls[i].y/perceptionRange)*pigeonholeWidth;
            self.PigeonHoles[pigeonIndex].push(i);
            theBalls[i].pigeon = pigeonIndex;
        }

        // Note - this prevents new agent creation in the middle of a cycle
        // Downside, reduces user agency noticeably (creation latency)!

        if (self.addAgent) {

            var randomAngleInRadians = Math.random()*Math.PI*2;
            b = self.makeBall( self.addAgentX, self.addAgentY, Math.cos(randomAngleInRadians) * self.genericSpeed, Math.sin(randomAngleInRadians) * self.genericSpeed, self.genericRadius, self.genericColour, self.genericStroke );
            theBalls.push(b);
            self.addAgent = false;
        }
    }


    // what to do when things get clicked
    this.doClick = function(evt){
        // a catch - we need to adjust for where the canvas is!
        // this is quite ugly without some degree of support from
        // a library
        var theCanvas = self.theCanvas;

        self.addAgent = true;
        self.addAgentX = evt.pageX - theCanvas.offsetLeft;
        self.addAgentY = evt.pageY - theCanvas.offsetTop;
    }


    // what we need to do is define a function that updates the position
    // draws, then schedules another iteration in the future
    // WARNING: this is the simplest, but not the best, way to do this
    this.drawLoop = function() {
	
		if (this.running == 1) 
		{	
			self.moveBalls();    // new position
			self.drawBalls();    // show things

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
				
		// reqFrame(eval(s),this.theCanvas);
					
    }

	function setclicks()
	{
		theCanvas.onclick = function() { if (!this.running) {this.running=1; reqFrame(animLoop,theCanvas);}};
		document.getElementById("stopbutton").onclick = function() {this.running=0;};
	}
	
	
    this.start = function()
    {
		var theBalls = self.theBalls;

		for (var i=self.initialPopulation-1; i>=0; i--) {

			var randomAngleInRadians = Math.random()*Math.PI*2;

			b = self.makeBall(50+Math.random()*500,
							  50+Math.random()*300,
							  Math.cos(randomAngleInRadians) * self.genericSpeed,
							  Math.sin(randomAngleInRadians) * self.genericSpeed,
							  self.genericRadius,
							  self.genericColour,
							  self.genericStroke );
			theBalls.push(b);
		}
		theCanvas.addEventListener("mousemove",this.doClick,false);	

		this.running = 1;
		
		self.loop();
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