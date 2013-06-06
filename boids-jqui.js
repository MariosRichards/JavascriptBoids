
$(document).ready(function(){ 
	$("#stopbutton").click(stopButtonCB);
	// $("#restartbutton").click(restartButtonCB);	
	
	var w = $("dummy_pane").width;	
	var h = $("dummy_pane").height;

	
	c = new Boid.Agent(w,h);
	c.start();
	
	//Colour of rules Override:
	
	c.ruleColours[0] = "yellow";
	c.ruleColours[1] = "red";
	c.ruleColours[2] = "blue";
	
	
				
	makeSlider("Alignment:",c.ruleColours[0],function(v){c.ruleCoeffs[0] = v}, {value:1, min:0, max:10, step:.05});
	makeSlider("Repulsion:",c.ruleColours[1],function(v){c.ruleCoeffs[1] = v}, {value:1, min:0, max:10, step:.05});
	makeSlider("Cohesion:",c.ruleColours[2],function(v){c.ruleCoeffs[2] = v}, {value:0, min:0, max:10, step:.05});
	makeSlider("Sim Speed:",NaN,function(v){c.simulationSpeed = v}, {value:1, min:0.05, max:10, step:.05});
	
	
	$("#trigger").click(checkbutton);	
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


function makeSlider(label,colour,slidefun,slideparams)
{
	if (typeof(label)=="undefined")      label="nolabel";
	if (typeof(colour)=="undefined")     colour="#000000";
	if (typeof(slideparams)=="undefined") slideparams={};

	if (typeof(slideparams.value)=="undefined") slideparams.value=5;
	
	var outer = $("<div />").addClass("inset").appendTo("#controls");
	$("<span \>").text(label+":").css("color",colour).addClass("numlabel").appendTo(outer);
	var inp = $("<input \>").addClass("numinput").attr('type','number').appendTo(outer);
	var sdi = $("<div \>").addClass("slidermarg").appendTo(outer);
	sdi.slider(slideparams).bind("slide",
								 function( event, ui ) {
									inp.val( ui.value );
									slidefun(ui.value)
									} );
	inp.val(slideparams.value);
	slidefun(slideparams.value);
}

