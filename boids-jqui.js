

$(document).ready(function(){ 
	$("#stopbutton").click(stopButtonCB);
	$("#restartbutton").click(restartButtonCB);	
	c = new Boid.Agent();
	c.start();
				
	makeSlider("Alignment:",c.ruleColours[0],function(v){c.ruleCoeffs[0] = v}, {value:1, min:0, max:10, step:.05});
	makeSlider("Repulsion:",c.ruleColours[1],function(v){c.ruleCoeffs[1] = v}, {value:1, min:0, max:10, step:.05});
	makeSlider("Cohesion:",c.ruleColours[2],function(v){c.ruleCoeffs[2] = v}, {value:0, min:0, max:10, step:.05});

	makeSlider2("Initial Population:",function(v){c.newInitialPopulation = v}, {value:50, min:1, max:10000, step:1});
	makeSlider2("Speed:",function(v){c.newGenericSpeed = v}, {value:1, min:.1, max:10, step:.05});
	makeSlider2("Perception Range:",function(v){c.newPerceptionRange = v}, {value:5, min:1, max:100, step:1});	
	makeSlider2("Obstacles on/off:",function(v){c.newObstacles = v}, {value:1, min:0, max:1, step:1});		
	makeSlider2("Wall Collision type:",function(v){c.newWallCollision = v}, {value:0, min:0, max:2, step:1});		
	
	// $("#checkbutton").click( checkbutton );	
	$("#trigger").click(checkbutton);	
	$("form").submit(function () { return false; }); // prevent premature submission/auto page reload!
	
});






function checkbutton()
{
	// c.ruleCoeffs[2]=10;

				// Speed <input id="speed" type="text" />
				// Perception Range <input id="percRange" type="text" />
				// Obstacles on/off <input id="obstacles" type="text" />
				// Wall Collision Type <input id="wallColl" type="text" />
				
	// no input testing at all!

	if ($("#initpop")[0].value) c.newInitialPopulation = $("#initpop")[0].valueAsNumber;
	if ($("#speed")[0].value) c.newGenericSpeed = $("#speed")[0].valueAsNumber;
	if ($("#percRange")[0].value) c.newPerceptionRange = $("#percRange")[0].valueAsNumber;
	if ($("#obstacles")[0].value) c.newObstacles = $("#obstacles")[0].valueAsNumber;
	if ($("#wallColl")[0].value) c.newWallCollision = $("#wallColl")[0].valueAsNumber;

	restartButtonCB();
//	var justoneinput = $("#initpop");

	// c.ruleCoeffs[2]=$("#initpop")[0].value;
	// alert("hey!");

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