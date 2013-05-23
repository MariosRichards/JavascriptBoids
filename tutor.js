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


this.genericColour = "#FFFF00";        // yellow fill
this.genericStroke = "#000000";        // black outline
this.circ = Math.PI*2;            // complete circle

var circ = this.circ;

// make everything go the same speed
// Marios: This is where I'm dumping any new parameters

this.genericSpeed = 4.0; // this is just the speed at which I want to initialise all my Balls



this.genericRadius = 1; // this is just the radius at which I want to initialise all my Balls
this.ali = 10; // alignment parameter - between 0 and 1
this.directionIndicatorLength = this.genericRadius;
var directionIndicatorLength = this.directionIndicatorLength;

this.perceptionRange = 20;
var perceptionRange = this.perceptionRange;


this.perceptionRangeSquared = this.perceptionRange*this.perceptionRange;

this.initialPopulation = 5;

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
        "pigeon" : 0, // pigeonhole
        "speed" : this.genericSpeed,
        "radius" : this.genericRadius,
        "colour" : this.genericColour,
        "stroke" : this.genericStroke,

        draw : function() {
            // debugger;

            theContext.strokeStyle = this.stroke;
//            theContext.fillStyle = this.colour;
            theContext.beginPath();
            theContext.arc(this.x,this.y, perceptionRange,0, circ,true);
            theContext.moveTo(this.x,this.y);
            theContext.lineTo(this.x + directionIndicatorLength*this.vX, this.y + directionIndicatorLength*this.vY);
            theContext.closePath();
            theContext.stroke();
//            theContext.fill();
        },

        // make 'em "bounce" when they go over the edge
        // no loss of velocity
        move: function() {
        // Marios: I think there's at least one bug here which allows particles to get stuck in the wall
            this.x += this.vX;
            this.y += this.vY;

            // console.log(this.x);


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



this.addBall = function()
    {
    self.addAgent = true;
    /*
    var randomAngleInRadians = Math.random()*Math.PI*2;
    b = self.makeBall( 300, 300, Math.cos(randomAngleInRadians) * self.genericSpeed,
                                Math.sin(randomAngleInRadians) * self.genericSpeed,
                                30, "rgb(255,128,128)", "FF0000" );
    self.theBalls.push(b)
    */

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


    // bouncing behavior - if two balls are on top of each other,
    // have them react in a simple way
    // this assumes that everything has the same radius as the prototype
    this.bounce = function(ballList) {
        var rad = 0;
        //        var rad = 2 * radius;
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




    // Reynold's like alignment
    // each boid tries to make it's velocity to be similar to its neighbors
    // recipricol falloff in weight (allignment parameter + d
    // this assumes the velocities will be renormalized
    this.createInteractionList = function(ballList)
    {

        // clean InteractionList array of arrays!
        self.InteractionList = [];
        var InteractionList     = self.InteractionList;
        var pigeonholeWidth     = this.pigeonholeWidth;
        var pigeonholeHeight    = this.pigeonholeHeight;
        var pigeonhole, j;


        var PigeonHoles = self.PigeonHoles;


        // 600 array positions
        for (var i=0; i<ballList.length; i++) {
            InteractionList[i] = new Array();
        }


        for(var i=ballList.length-1; i>=0; i--) {
            var bi = ballList[i];
            var bix = bi.x;
            var biy = bi.y;

            // XANTO

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
                        if(j>i) { //
                        // test if within perceptionRange
                            var bj = ballList[j];

                            if (! bj) alert("NO BALL");


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
    }




    this.align = function(ballList,InteractionList)
    {
    var InteractionList     = self.InteractionList;
    var interactor2;


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

                newVX[interactor2] -= bxs;
                newVY[interactor2] -= bys;

                // Alignment: steer towards the average heading of local flockmates
                // add to the sum
                newVX[interactor1] += bj.vX;
                newVY[interactor1] += bj.vY;
                // by symmetry
                newVX[interactor2] += bi.vX;
                newVY[interactor2] += bi.vY;

                // Cohesion: steer to move toward the average position of local flockmates





            }
        }





    }





    // move the balls
    this.moveBalls = function() {
        var theBalls = self.theBalls;
        var PigeonHoles = self.PigeonHoles;
        var InteractionList = self.InteractionList;
        var ali = self.ali;
        var pigeonholeWidth = self.pigeonholeWidth;
        var pigeonholeHeight = self.pigeonholeHeight;
        var perceptionRange  = self.perceptionRange;


        // what can interact with what
        self.createInteractionList(theBalls);

        for(var i=theBalls.length-1; i>=0; i--) {
            var bi = theBalls[i];

            // initialises the new velocity array!
            if (! newVX[i]) newVX[i] = [];
            if (! newVY[i]) newVY[i] = [];

            newVX[i] = bi.vX*ali;
            newVY[i] = bi.vY*ali;
        }

        // PUT YOUR RULE FUNCTIONS HERE
        self.align(theBalls,InteractionList);
    //    bounce(theBalls);

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
        for (var i=0; i<pigeonholeWidth*pigeonholeHeight; i++) {
            PigeonHoles[i] = new Array();
        }


        for (var i=0; i<theBalls.length; i++) {
            //theBalls[i].norm();
            theBalls[i].move();
            var pigeonIndex = Math.floor(theBalls[i].x/perceptionRange)+Math.floor(theBalls[i].y/perceptionRange)*pigeonholeWidth;
            PigeonHoles[pigeonIndex].push(i);
            theBalls[i].pigeon = pigeonIndex;
        }


        // Note - this prevents new agent creation in the middle of a cycle
        // Downside, reduces user agency noticeably (creation latency)!

        if (self.addAgent) {

            var randomAngleInRadians = Math.random()*Math.PI*2;
            b = self.makeBall( addAgentX, addAgentY, Math.cos(randomAngleInRadians) * self.genericSpeed, Math.sin(randomAngleInRadians) * self.genericSpeed, Math.random()*5+1, self.genericColour, self.genericStroke );
            theBalls.push(b);

            self.addAgent = false;
        }

    }





    // what to do when things get clicked
    this.doClick = function(evt){
        // a catch - we need to adjust for where the canvas is!
        // this is quite ugly without some degree of support from
        // a library
        var addAgent = self.addAgent;
        var theCanvas = self.theCanvas;

        addAgent = true;
        addAgentX = evt.pageX - theCanvas.offsetLeft;
        addAgentY = evt.pageY - theCanvas.offsetTop;

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



    this.temporary = function()
    {
    console.log("Hi");
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