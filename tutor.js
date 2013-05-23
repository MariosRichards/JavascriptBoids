Boid = {};
var BoidAgents = [];


Boid.Agent = function()
{
	var reqFrame =window.requestAnimationFrame ||
			  window.webkitRequestAnimationFrame ||
			  window.mozRequestAnimationFrame ||
			  window.oRequestAnimationFrame ||
			  window.msRequestAnimationFrame ||
			  function(/* function FrameRequestCallback */ callback, /* DOMElement Element */ element){
				window.setTimeout(callback, 1000 / 60);
				};

	var self = this;
	this.id   = null;
	this.theBalls = [];
	// create an array of pigeonholes
	this.PigeonHoles = [];
	// create the interaction list array;
	this.InteractionList = [];
	// temp veloctity variables
	var newVX = [];
	var newVY = [];
	this.theCanvas = document.getElementById("mycanvas");
	this.theContext = this.theCanvas.getContext("2d");
		// these are effectively the constants
	var theCanvas     = this.theCanvas;
	var theContext  = this.theContext;
//	this.genericColour = "#FFFF00";        // yellow fill
	this.genericStroke = "#728FCE";        // black outline
	this.circ = Math.PI*2;            // complete circle
	var circ = this.circ;

	this.genericSpeed = 4.0; // this is just the speed at which I want to initialise all my Balls
	this.genericRadius = 1; // this is just the radius at which I want to initialise all my Balls


	this.perceptionRange = 20;
	var perceptionRange = this.perceptionRange;
	this.perceptionRangeSquared = this.perceptionRange*this.perceptionRange;
	this.initialPopulation = 40;
	this.directionIndicatorLength = this.perceptionRange;
	var directionIndicatorLength = this.directionIndicatorLength;	
	
	this.RepCoeff  = 1; // repulsion coefficient
    this.AliCoeff  = 1;	// alignment coefficient
	this.CohCoeff  = 0;	// cohesion coefficient
	

    // note - am assuming canvas won't change size!!
    this.pigeonholeWidth = Math.ceil(this.theCanvas.width/this.perceptionRange);
    this.pigeonholeHeight = Math.ceil(this.theCanvas.height/this.perceptionRange);

    // Semaphore variable to add agent
    this.addAgent = false;
    var addAgentX = 0;
    var addAgentY = 0;

	
	this.aBall = {
        "x" : 100,
        "y" : 100,
        "vX" : 10,
        "vY" : 10,
        "pigeon" : 0, 
        "speed" : this.genericSpeed,
        "radius" : this.genericRadius,
        "colour" : this.genericColour,
        "stroke" : this.genericStroke,

        draw : function() {

			theContext.strokeStyle = this.stroke;
            theContext.beginPath();
            theContext.arc(this.x,this.y, perceptionRange,0, circ,true);
            theContext.moveTo(this.x,this.y);
            theContext.lineTo(this.x + directionIndicatorLength*this.vX/this.speed, this.y + directionIndicatorLength*this.vY/this.speed);
            theContext.closePath();
            theContext.stroke();
			
        },

        move: function() {
            this.x += this.vX;
            this.y += this.vY;

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
        ball.pigeon = Math.floor(x/ this.perceptionRange) + (Math.floor(y/this.perceptionRange))* this.pigeonholeWidth;
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
        for (var i=0; i< self.theBalls.length; i++) {
            self.theBalls[i].draw();
        }
    }


    this.createInteractionList = function(ballList)
    {

        // clean InteractionList array of arrays!
        /*self.*/InteractionList = [];
        var InteractionList     = self.InteractionList;
        var pigeonholeWidth     = this.pigeonholeWidth;
        var pigeonholeHeight    = this.pigeonholeHeight;
        var pigeonhole, j;
        var PigeonHoles = self.PigeonHoles;

        // 600 array positions
        for (var i=ballList.length-1; i>=0; i--) {
            InteractionList[i] = new Array();
        }

        for(var i=ballList.length-1; i>=0; i--) {
            var bi = ballList[i];
            var bix = bi.x;
            var biy = bi.y;

            var pigeonX = bi.pigeon%pigeonholeWidth; // 0 : pigeonholeWidth - 1
            var pigeonY = Math.floor(bi.pigeon/pigeonholeWidth); // 0 : pigeonholeHeight -1??

            // loop through the 9 tiles without trying access tiles that are outside of the canvas
            for(var holeX = Math.min(pigeonX+1,pigeonholeWidth-1); holeX>= Math.max(pigeonX-1,0); holeX--) {

                for(var holeY = Math.min(pigeonY+1,pigeonholeHeight-1); holeY>= Math.max(pigeonY-1,0); holeY--) {

                    pigeonhole = holeX + pigeonholeWidth*holeY;
                    // now iterate through the Balls in this pigeon if any
                    for(var interactant = PigeonHoles[pigeonhole].length-1; interactant>=0; interactant--) {

                        j = PigeonHoles[pigeonhole][interactant];
                        // here is where you'd add an if statement to cut work in half!
                        if(j!=i) { // No symmetry optimization in effect !!!
                        // test if within perceptionRange
                            var bj = ballList[j];
                            var dx = bj.x - bix;
                            var dy = bj.y - biy;
                            if ( (dx*dx + dy*dy) <= self.perceptionRangeSquared ) {
                                /*self.*/InteractionList[i].push(j);
                            }
                        }
                    }
                }
            }
        }
    }




    this.align = function(ballList,InteractionList)
    {
		//var InteractionList     = self.InteractionList;
		var interactor2;
		var RepCoeff    = self.RepCoeff;
        var AliCoeff   = self.AliCoeff;		
		var CohCoeff   = self.CohCoeff;	


		// for(var interactor1 = ballList.length-1; interactor1>=0; interactor1--) {	
		
			// // add your own velocity
			// var bi = ballList[interactor1];		
			
			// // initialises the new velocity array!
			// newVX[interactor1] = bi.vX;
			// newVY[interactor1] = bi.vY;			

			// // will probably remove this crude weighting!
			
			// AlignmentX = 0;
			// AlignmentY = 0;
			
			// CohesionX = 0;
			// CohesionY = 0;
			
			// RepulsionX = 0;
			// RepulsionY = 0;
			
			// // TOO CLEVER - USING SYMMETRY MAKES OTHER STUFF HARDER!
			
			// Interactions = InteractionList[interactor1].length;

			// if (Interactions > 0) {
			
				// for(var j = Interactions-1; j>=0; j--) {	

					// interactor2 = InteractionList[interactor1][j];
					// var bj = ballList[interactor2];

					// // Repulsion: steer to avoid crowding local flockmates
					
					// var bxs = bi.x - bj.x;
					// var bys = bi.y - bj.y;
					// var invdistsq = 4/(1 + bxs*bxs + bys*bys);

					// // vector from j to i weighted by inverse square distance
					// RepulsionX += bxs*invdistsq;
					// RepulsionY += bys*invdistsq;				
					
					// // Alignment: steer towards the average heading of local flockmates
					// // add to the sum
					
					// AlignmentX += bj.vX;
					// AlignmentY += bj.vY;
										
					// // Cohesion: steer to move toward the average position of local flockmates
					
					// // vector from i to j
					// CohesionX -= bxs;
					// CohesionY -= bys;
					
				// }
			
				// // preparing these vectors for separate representation!
				// // all of these defined as mean
				// RepulsionX /= Interactions;				
				// RepulsionY /= Interactions;
				// AlignmentX /= Interactions;
				// AlignmentY /= Interactions;
				// CohesionX  /= Interactions;
				// CohesionY  /= Interactions;				
							
				// newVX[interactor1] += RepCoeff*RepulsionX + AliCoeff*AlignmentX + CohCoeff*CohesionX;
				// newVY[interactor1] += RepCoeff*RepulsionY + AliCoeff*AlignmentY + CohCoeff*CohesionY;				
							
			// }

		// }			
		
		
        for(var interactor1 = ballList.length-1; interactor1>=0; interactor1--) {

            // add your own velocity
            var bi = ballList[interactor1];
            for(var j = InteractionList[interactor1].length-1; j>=0; j--) {

                interactor2 = InteractionList[interactor1][j];
                var bj = ballList[interactor2];

                // Separation: steer to avoid crowding local flockmates

                var bxs = bi.x - bj.x;
                var bys = bi.y - bj.y;
                var distsq = (1 + bxs*bxs + bys*bys)/4;
                bxs/=distsq;
                bys/=distsq;

                newVX[interactor1] += bxs;
                newVY[interactor1] += bys;

                // newVX[interactor2] -= bxs;
                // newVY[interactor2] -= bys;

                // Alignment: steer towards the average heading of local flockmates
                // add to the sum
                newVX[interactor1] += bj.vX;
                newVY[interactor1] += bj.vY;
                // by symmetry
                // newVX[interactor2] += bi.vX;
                // newVY[interactor2] += bi.vY;

                // Cohesion: steer to move toward the average position of local flockmates
            }
        }
		
    }





    // move the balls
    this.moveBalls = function() {
        var theBalls           = self.theBalls;
        var PigeonHoles        = self.PigeonHoles;
        var InteractionList    = self.InteractionList;
        var pigeonholeWidth    = self.pigeonholeWidth;
        var pigeonholeHeight   = self.pigeonholeHeight;
        var perceptionRange    = self.perceptionRange;


        // what can interact with what
        self.createInteractionList(theBalls);

        for(var i=theBalls.length-1; i>=0; i--) {
            var bi = theBalls[i];

            newVX[i] = bi.vX;
            newVY[i] = bi.vY;
        }

        // PUT YOUR RULE FUNCTIONS HERE
        self.align(theBalls,InteractionList);

        // confirms update!
        for(var i=theBalls.length-1; i>=0; i--) {
            var nvx = newVX[i];
            var nvy = newVY[i];
            var normalisingCoefficient = theBalls[i].speed/Math.sqrt(nvx*nvx + nvy*nvy);
            theBalls[i].vX = nvx*normalisingCoefficient;
            theBalls[i].vY = nvy*normalisingCoefficient;
        }

        // clean array
        PigeonHoles = new Array();
        // 600 array positions
		for(var i=pigeonholeWidth*pigeonholeHeight-1; i>=0; i--) {		
            PigeonHoles[i] = new Array();
        }


        for(var i=theBalls.length-1; i>=0; i--) {
            theBalls[i].move();
            var pigeonIndex = Math.floor(theBalls[i].x/perceptionRange)+Math.floor(theBalls[i].y/perceptionRange)*pigeonholeWidth;
            PigeonHoles[pigeonIndex].push(i);
            theBalls[i].pigeon = pigeonIndex;
        }


        // Note - this prevents new agent creation in the middle of a cycle
        // Downside, reduces user agency noticeably (creation latency)!

        if (self.addAgent) {

            var randomAngleInRadians = Math.random()*Math.PI*2;
            b = self.makeBall( self.addAgentX, self.addAgentY, Math.cos(randomAngleInRadians) * self.genericSpeed, Math.sin(randomAngleInRadians) * self.genericSpeed, Math.random()*5+1, self.genericColour, self.genericStroke );
            theBalls.push(b);

            self.addAgent = false;
        }

    }





    // what to do when things get clicked
    this.doClick = function(evt){
        // a catch - we need to adjust for where the canvas is!
        // this is quite ugly without some degree of support from
        // a library
        // var addAgent = self.addAgent;
        var theCanvas = self.theCanvas;

				
        self.addAgent = true;
        self.addAgentX = evt.pageX - theCanvas.offsetLeft;
        self.addAgentY = evt.pageY - theCanvas.offsetTop;

    }


    // what we need to do is define a function that updates the position
    // draws, then schedules another iteration in the future
    // WARNING: this is the simplest, but not the best, way to do this
    this.drawLoop = function() {
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



    this.loop = function()
    {
		var s = 'BoidAgents[' + self.id + '].drawLoop()';
		self.pid = window.setInterval(s, 50);

    }


    this.start = function()
    {
		var theBalls = self.theBalls;

		for (var i=0; i< self.initialPopulation; i++) {

			var randomAngleInRadians = Math.random()*Math.PI*2;

			b = self.makeBall( 50+Math.random()*500,
							  50+Math.random()*300,
							  Math.cos(randomAngleInRadians) * self.genericSpeed,
							  Math.sin(randomAngleInRadians) * self.genericSpeed,
							  Math.random()*5+1, self.genericColour, self.genericStroke );
			theBalls.push(b);
		}
			
		theCanvas.addEventListener("mousemove",this.doClick,false);	
		self.loop();
    }



    this.init = function()
    {
		self.id = BoidAgents.length;
		BoidAgents.push(self);

		for (var i=0; i < self.pigeonholeWidth*self.pigeonholeHeight; i++)
        {
			this.PigeonHoles[i] = [];
        }
    }

    self.init();


}