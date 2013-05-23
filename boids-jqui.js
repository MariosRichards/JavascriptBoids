$(document).ready(function(){ 
	$("#stopbutton").click(stopButtonCB);
	c = new Boid.Agent();
	c.start();
				
	makeSlider("Radius:",function(v){}, {value:10, min:2, max:30, step:1});
	makeSlider("Align:",function(v){}, {value:.1, min:0, max:1, step:.05});
	makeSlider("Vel:",function(v){}, {value:10, min:2, max:30, step:1});

	// makeSlider("Radius:",function(v){theBoids.params.radius = v}, {value:10, min:2, max:30, step:1});
	// makeSlider("Align:",function(v){theBoids.params.align = v}, {value:.1, min:0, max:1, step:.05});
	// makeSlider("Vel:",function(v){theBoids.params.vel = v}, {value:10, min:2, max:30, step:1});	

	
});

function stopButtonCB()
{
	if (running) {
		running = 0;
		$("#stopbutton").html("start");
	} else {
		running = 1;
		$("#stopbutton").html("stop");
		reqFrame(animLoop,theCanvas);
	}
}

//        		<div class="inset">
//        			<span class="numlabel">Radius:</span>
//        			<input type="number" id="radval" class="numinput"/>
//        			<div id="radslider" class="slidermarg"></div>
//        		</div>

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