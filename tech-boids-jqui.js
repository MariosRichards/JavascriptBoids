
$(document).ready(function(){ 
	$("#stopbutton").click(stopButtonCB);
	//$("#restartbutton").click(restartButtonCB);
	$("#canvas_info_numberboids").click(numberboidsButtonCB);
	$("#canvas_info_pigeonholes").click(pigeonholesButtonCB);
	$("#canvas_info_perceptionrange").click(perceptionrangeButtonCB);
	$("#canvas_info_boidids").click(boididsButtonCB);
	
	
	
	$("#obstaclebuttonon").click(function(){
		
		changeObstacleState(1);
	});
	$("#obstaclebuttonoff").click(function(){
		
		changeObstacleState(0);
	});
	
	
			
	$("#wallcollision1").click(function(){
		changeWallCollisionState(0);	
	});
	$("#wallcollision2").click(function(){
		changeWallCollisionState(1);	
	});
	$("#wallcollision3").click(function(){
		changeWallCollisionState(2);	
	});



	/*$("#checkboxalignment").click(toggleAlignmentButtonCB);
	$("#checkboxrepulsion").click(toggleRepulsionButtonCB);
	$("#checkboxcohesion").click(toggleCohesionButtonCB);
	$("#checkboxsimspeed").click(toggleSimSpeedButtonCB);*/

	
	
	$("#eyealignment").click(toggleVisibility_AlignmentButtonCB);
	$("#eyerepulsion").click(toggleVisibility_RepulsionButtonCB);
	$("#eyecohesion").click(toggleVisibility_CohesionButtonCB);

	//$("#Alignment").click(toggleAlignment);

	//$('#Alignment').css('color','purple');
	
	var w = $("#dummy_pane").width();	
	var h = $("#dummy_pane").height();

	var eagleSprite = new Image();
	eagleSprite.src = "eagletop.png";
	
	// c = new Boid.Agent(w, h);
	c = new Boid.Agent(w, h, eagleSprite);
	
	eagleSprite.onload = function() {
	    c.start(); 
	};
	
	//Colour of rules Override:
	
	c.ruleColours[0] = "yellow";
	c.ruleColours[1] = "red";
	c.ruleColours[2] = "blue";
	
	$("#initpop").val(c.initialPopulation);
	$("#percRange").val(c.perceptionRange);
	
	controlmySliders();
	changeWallCollisionState(0);
	changeObstacleState(1);
	resize();
				
	/*makeSlider("Alignment",c.ruleColours[0],function(v){c.ruleCoeffs[0] = v}, {value:1, min:0, max:10, step:.05});
	makeSlider("Repulsion",c.ruleColours[1],function(v){c.ruleCoeffs[1] = v}, {value:1, min:0, max:10, step:.05});
	makeSlider("Cohesion",c.ruleColours[2],function(v){c.ruleCoeffs[2] = v}, {value:0, min:0, max:10, step:.05});
	makeSlider("Sim Speed",NaN,function(v){c.simulationSpeed = v}, {value:1, min:0.05, max:10, step:.05});*/
	
	
	
	
	$("#restartbutton").click(checkbutton);	
	
	
		

});



function checkbutton()
{

	var minvalueonscreen=(Math.min($("#dummy_pane").width(),$("#dummy_pane").height()))/2;
		
	var inputtest=true;
	var alertmessage="Invalid parameters introduced. \n\nValid values as follows: \n";
	
	var invalid=" <== Invalid value!";
	invalid.fontcolor("red");	

	alertmessage+="\n\n      Initial Population: 1 or higher."
	if(parseInt($("#initpop").val()) < 1) {
		alertmessage+=invalid;
		$("#initpop").val(1);
		inputtest=false;
	}
	alertmessage+="\n\n      Perception Range: From 3 to "+ minvalueonscreen;
	if(((parseInt($("#percRange").val()) < 3))) {
		alertmessage+=invalid;
		$("#percRange").val(3);
		inputtest=false;
	}
	if((parseInt($("#percRange").val()) > minvalueonscreen)) {
		alertmessage+=invalid;
		$("#percRange").val(minvalueonscreen);
		inputtest=false;
	}
	
	/*alertmessage+="\n\n      Obstacles: From 0 to 1."
	if(((parseInt($("#obstacles").val()) < 0)||((parseInt($("#obstacles").val()) > 1)))) {
		alertmessage+=invalid;
		inputtest=false;
	}
	alertmessage+="\n\n      Wall Collision: From 0 to 2."
	if(((parseInt($("#wallColl").val()) < 0)||((parseInt($("#wallColl").val()) > 2)))) {
		alertmessage+=invalid;
		inputtest=false;
	}*/
	
	if(inputtest===false)
	{
		alert(alertmessage);
	}
	
	if(inputtest===true)
	{
		if ($("#initpop").val()) {
			c.newInitialPopulation = Math.floor(parseInt($("#initpop").val()));
			$("#canvas_info").text(c.newInitialPopulation);
			$("#initpop").val(Math.floor(parseInt($("#initpop").val())));
		}//$("#initpop")[0].valueAsNumber;
		    //if ($("#speed")[0].value) c.newGenericSpeed = $("#speed")[0].valueAsNumber;
		if ($("#percRange").val()) {
			c.newPerceptionRange = parseInt($("#percRange").val());
			$("#percRange").val(Math.floor(parseInt($("#percRange").val())));
		} //$("#percRange")[0].valueAsNumber;
		if ($("#obstacles").val()) {
			c.newObstacles = parseInt($("#obstacles").val());
		} //$("#obstacles")[0].valueAsNumber;
		if ($("#wallColl").val()) {
			c.newWallCollision = parseInt($("#wallColl").val());
		} //$("#wallColl")[0].valueAsNumber;
		
		restartButtonCB();
	}
	
}


function stopButtonCB()
{
	if (c.running) {
		c.running = 0;
		$("#stopbutton").html("start");
	} else {
		c.running = 1;
		$("#stopbutton").html("stop");
		var now = Date.now();
		reqFrame(c.drawLoop.bind(c,now));
	
	}
}

function numberboidsButtonCB()
{
	
	var isVisible = $('#canvas_info').css('visibility');
	
	
	if (isVisible==="visible") {
		$('#canvas_info').css('visibility','hidden');
	}
	else{
		$('#canvas_info').css('visibility','visible');
	}
	
}

function pigeonholesButtonCB()
{	
	if (c.pigeonholesVisible) {
		c.pigeonholesVisible = false;
	}
	else{
		c.pigeonholesVisible = true;
	}
}

function perceptionrangeButtonCB()
{	
	
	if (c.perceptionRangeVisible) {
		c.perceptionRangeVisible = false;
	}
	else{
		c.perceptionRangeVisible = true;
	}
}

function boididsButtonCB()
{	
	
	if (c.displayBoidIDs) {
		c.displayBoidIDs = false;
	}
	else{
		c.displayBoidIDs = true;
	}
}


function restartButtonCB()
{


	c.restartNow = 1;
	if (c.running == 0)
	{
		var now = Date.now();
		reqFrame(c.drawLoop.bind(c,now));
	}
	else
	{
		c.running = 0;
	}
	
}



function controlmySliders()
{

    createmySlider(1,0,10,"alignment",c.ruleColours[0],0.05,function(v){c.setCoeff0(v)});
    createmySlider(1,0,10,"repulsion",c.ruleColours[1],0.05,function(v){c.setCoeff1(v)});
    createmySlider(1,0,10,"cohesion",c.ruleColours[2],0.05,function(v){c.setCoeff2(v)});
    createmySlider(1,-10,10,"simspeed","black",0.05,function(v){c.setCoeff3(v)}); 
        
} 

function createmySlider(initialvalue,min,max,id,labelcolor,stepamount,slidefun)
{
	if(typeof id == "string")
	{
		  $( ".my_slider"+id).slider({
	      range: "min",
	      value: initialvalue,
	      min: min,
	      max: max,
	      step: stepamount,
	      animate:true,
	      slide: function( event, ui ) {
	        $( "#amount"+id ).val(ui.value);
	        slidefun(ui.value);
	      }
	    });
	    $( "#amount"+id ).val($( ".my_slider"+id ).slider( "value" ) );
	    $( "#amount"+id ).attr('disabled','disabled');
	   
	}
}



function toggleVisibility_AlignmentButtonCB()
{	
	if (c.ruleVectorVisible[0]) {
		
		$('#eyealignment img').attr("src","closedeye.svg");
		c.ruleVectorVisible[0] = false;
		/*$('#eyealignment img').attr("height","100%");
		$('#eyealignment img').attr("width","100%");*/


	}
	else{
		$('#eyealignment img').attr("src","openedeye.svg");
		c.ruleVectorVisible[0] = true;
	}
	
}
	
	

function toggleVisibility_RepulsionButtonCB()
{	
	if (c.ruleVectorVisible[1]) {
		
		$('#eyerepulsion img').attr("src","closedeye.svg");
		c.ruleVectorVisible[1] = false;
	}
	else{
		$('#eyerepulsion img').attr("src","openedeye.svg");
		c.ruleVectorVisible[1] = true;
	}
}


function toggleVisibility_CohesionButtonCB()
{	
	if (c.ruleVectorVisible[2]) {
		
		$('#eyecohesion img').attr("src","closedeye.svg");
		c.ruleVectorVisible[2] = false;
	}
	else{
		$('#eyecohesion img').attr("src","openedeye.svg");
		c.ruleVectorVisible[2] = true;
	}
}
	
function resize()
{
	
	var width = screen.width;
	var height = screen.height;
	
	
	switch(height)
	{
		case 1080:
			$("body").css('font-size','200%');  //Good in 200%
			break;
		case 1050:
			$("body").css('font-size','180%'); 
			break;
		case 1024:
			$("body").css('font-size','180%');
			break;
		case 900:
			$("body").css('font-size','180%');
			break;
		case 800:
			$("body").css('font-size','180%');
			break;
		case 768:
			$("body").css('font-size','180%'); //Good in 180%
			break;
		case 720:
			$("body").css('font-size','200%'); //Good in 200%
			break;
		default:
			$("body").css('font-size','150%'); //Good in 150% for 600 height
			break;

	}
	
	
}

  
function disableSelection() { 
      this.each(function() { 
        if (typeof this.onselectstart != 'undefined') {
           this.onselectstart = function() { return false; };
        } else if (typeof this.style.MozUserSelect != 'undefined') {
             this.style.MozUserSelect = 'none';
        } else {
             this.onmousedown = function() { return false; };
         }
        }); 
} 


  
function enableSelection() { 
      this.each(function() { 
        if (typeof this.onselectstart != 'undefined') {
           this.onselectstart = function() { return true; };
        } else if (typeof this.style.MozUserSelect != 'undefined') {
             this.style.MozUserSelect = 'inherit';
        } else {
             this.onmousedown = function() { return true; };
         }
        }); 
} 


function changeObstacleState(number) {
	
	
	if(number===0||number===1)
	{
		
		$("#obstacles").val(number);
	}
	
	
}       

function changeWallCollisionState(number) {
	
	if(number===0||number===1||number===2)
	{	
		$("#wallColl").val(number);
	}
	
}
	
	


