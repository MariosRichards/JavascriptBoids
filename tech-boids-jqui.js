
$(document).ready(function(){ 
	$("#stopbutton").click(stopButtonCB);
	//$("#restartbutton").click(restartButtonCB);
	$("#canvas_info_numberboids").click(numberboidsButtonCB);
	$("#canvas_info_pigeonholes").click(pigeonholesButtonCB);
	$("#canvas_info_perceptionrange").click(perceptionrangeButtonCB);
	$("#canvas_info_boidids").click(boididsButtonCB);
	
	
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

	
	c = new Boid.Agent(w,h);
	c.start();
	
	//Colour of rules Override:
	
	c.ruleColours[0] = "yellow";
	c.ruleColours[1] = "red";
	c.ruleColours[2] = "blue";
	
	controlmySliders();
	resize();
				
	/*makeSlider("Alignment",c.ruleColours[0],function(v){c.ruleCoeffs[0] = v}, {value:1, min:0, max:10, step:.05});
	makeSlider("Repulsion",c.ruleColours[1],function(v){c.ruleCoeffs[1] = v}, {value:1, min:0, max:10, step:.05});
	makeSlider("Cohesion",c.ruleColours[2],function(v){c.ruleCoeffs[2] = v}, {value:0, min:0, max:10, step:.05});
	makeSlider("Sim Speed",NaN,function(v){c.simulationSpeed = v}, {value:1, min:0.05, max:10, step:.05});*/
	
	
	$("#restartbutton").click(checkbutton);	
	$("form").submit(function () { return false; }); // prevent premature submission/auto page reload!
	
	

});



function checkbutton()
{

	// no input testing at all!

	if ($("#initpop")[0].value) c.newInitialPopulation = $("#initpop")[0].valueAsNumber;
	//if ($("#speed")[0].value) c.newGenericSpeed = $("#speed")[0].valueAsNumber;
	if ($("#percRange")[0].value) c.newPerceptionRange = $("#percRange")[0].valueAsNumber;
	if ($("#obstacles")[0].value) c.newObstacles = $("#obstacles")[0].valueAsNumber;
	if ($("#wallColl")[0].value) c.newWallCollision = $("#wallColl")[0].valueAsNumber;

	restartButtonCB();

}


function stopButtonCB()
{
	if (c.running) {
		c.running = 0;
		$("#stopbutton").html("start");
	} else {
		c.running = 1;
		$("#stopbutton").html("stop");
		reqFrame(c.drawLoop.bind(c));
	
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
		reqFrame(c.drawLoop.bind(c));
	}
	else
	{
		c.running = 0;
	}
	
}



function controlmySliders()
{

    createmySlider(1,0,10,"alignment",c.ruleColours[0],0.05,function(v){c.ruleCoeffs[0] = v});
    createmySlider(1,0,10,"repulsion",c.ruleColours[1],0.05,function(v){c.ruleCoeffs[1] = v});
    createmySlider(1,0,10,"cohesion",c.ruleColours[2],0.05,function(v){c.ruleCoeffs[2] = v});
    createmySlider(1,-10,10,"simspeed","black",0.05,function(v){c.simulationSpeed = v}); 
        
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
	
	alert(height);
	
	switch(height)
	{
		case 1080:
			$("body").css('font-size','200%');
			break;
		case 1050:
			$("body").css('font-size','120%');
			break;
		case 1024:
			$("body").css('font-size','100%');
			break;
		case 900:
			$("body").css('font-size','80%');
			break;
		case 800:
			$("body").css('font-size','80%');
			break;
		case 768:
			$("body").css('font-size','200%');
			break;
		case 720:
			$("body").css('font-size','60%');
			break;
		default:
			$("body").css('font-size','60%');
			break;

	}
	
	
}
	
	


