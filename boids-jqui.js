

$(document).ready(function(){ 
	$("#stopbutton").click(stopButtonCB);
	$("#restartbutton").click(restartButtonCB);	
	c = new Boid.Agent();
	c.start();
				
	makeSlider("Alignment:",function(v){c.AliCoeff = v}, {value:1, min:0, max:10, step:.05});
	makeSlider("Repulsion:",function(v){c.RepCoeff = v}, {value:1, min:0, max:10, step:.05});
	makeSlider("Cohesion:",function(v){c.CohCoeff = v}, {value:0, min:0, max:10, step:.05});

	makeSlider2("Initial Population:",function(v){c.newInitialPopulation = v}, {value:50, min:1, max:10000, step:1});
	makeSlider2("Speed:",function(v){c.newGenericSpeed = v}, {value:1, min:.1, max:10, step:.05});
	makeSlider2("Perception Range:",function(v){c.newPerceptionRange = v}, {value:5, min:1, max:100, step:1});	
	makeSlider2("Obstacles on/off:",function(v){c.newObstacles = v}, {value:1, min:0, max:1, step:1});		
	makeSlider2("Wall Collision type:",function(v){c.newWallCollision = v}, {value:0, min:0, max:2, step:1});		
	
});

function stopButtonCB()
{
	if (c.running) {
		c.running = 0;
		$("#stopbutton").html("start");
	} else {
		c.running = 1;
		$("#stopbutton").html("stop");
		reqFrame(c.drawLoop);

	}
}

function restartButtonCB()
{
	// if (c.running) {
		// c.running = 0;
	// //	$("#stopbutton").html("start");
	// } else {
		// c.running = 1;
	// //	$("#stopbutton").html("stop");
// //		reqFrame(c.loop,c.theCanvas);
		// c.loop();
	// }
	
	
	// var allInputs = $(":input","#controls3");
	
	// if (allInputs[0].valueAsNumber) {c.newInitialPopulation = allInputs[0].valueAsNumber;}
	// if (allInputs[1].valueAsNumber) {c.newGenericSpeed      = allInputs[1].valueAsNumber;}		
	// if (allInputs[2].valueAsNumber) {c.newPerceptionRange   = allInputs[2].valueAsNumber;}		
	// if (allInputs[3].valueAsNumber) {c.newObstacles         = allInputs[3].valueAsNumber;}		
	// if (allInputs[4].valueAsNumber) {c.newWallCollision     = allInputs[4].valueAsNumber;}	
	

	c.restartNow = 1;
	c.running = 0;
	
}


function makeSlider(label,slidefun,slideparams)
{
	if (typeof(label)=="undefined")      label="nolabel";
	if (typeof(slideparams)=="undefined") slideparams={};

	if (typeof(slideparams.value)=="undefined") slideparams.value=5;
	
	var outer = $("<div />").addClass("inset").appendTo("#controls");
	$("<span \>").text(label+":").addClass("numlabel").appendTo(outer);
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

function makeSlider2(label,slidefun,slideparams)
{
	if (typeof(label)=="undefined")      label="nolabel";
	if (typeof(slideparams)=="undefined") slideparams={};

	if (typeof(slideparams.value)=="undefined") slideparams.value=5;
	var outer = $("<div />").addClass("inset").appendTo("#controls2");
	$("<span \>").text(label+":").addClass("numlabel").appendTo(outer);
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