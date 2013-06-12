
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

		
	/*var elem = document.getElementById("control");
	var bBox = elem.getBBox();
	var scaleX = 2;
	var scaleY = 2;
	$(elem).attr("transform", "scale("+scaleX+", "+scaleY+") translate("+-bBox.width/2+","+-bBox.height/2+") ");*/
	
	var paper = Raphael(10, 10, 600, 600);
	
	//var LogoDrawLinePath1 = paper.path("M509.754,267.758c32.154-0.018,64.294-0.928,96.41-2.434c16.329-0.766,32.649-1.697,48.965-2.705 c2.392-0.148,4.666,1.957,6.99,2.389c2.026,0.376,4.041,0.548,6.098,0.261c6.073-0.848,11.637-3.321,17.229-5.727 c14.06-6.049,29.179-7.473,43.667-12.028c8.274-2.602,17.485-7.028,22.308-14.602c5.781-9.082,3.514-19.581,3.248-29.739 c-0.298-11.375,6.465-21.077,7.766-32.196c2.779-23.757-7.208-47.1-5.938-70.896c0.563-10.56,1.912-21.053,1.925-31.643 c0.011-8.776-0.795-18.59-6.408-25.741c-5.906-7.525-16.952-4.725-25.012-3.575c-6.813,0.972-13.146-0.499-19.855-1.6 c-6.363-1.044-12.704-1.572-19.151-1.391c-31.654,0.886-63.596-3.392-95.136,0.458 c-16.779,2.048-33.186,4.847-50.147,5.267 c-16.694,0.413-33.071-1.289-49.498-4.087c-29.959-5.104-59.63,2.705-89.547,3.725c-33.202,1.133-66.407-1.744-99.484-4.232 c-31.965-2.404-63.883-3.499-95.927-4.091c-16.226-0.3-32.454-0.461-48.682-0.4c-13.978,0.053-28.242-0.385-42.134,1.379 c-16.793,2.132-32.738,9.384-42.704,23.455c-10.063,14.208-12.382,32.588-12.702,49.548c-0.223,11.777,1.508,23.49,1.134,35.25 c-0.464,14.596-4.447,28.842-6.58,43.229c-3.742,25.236-0.353,50.45,2.078,75.628").attr({'fill':'#ffff00','stroke':'none','opacity':'1'});
	//var LogoDrawLinePath2 = paper.path("M363.937,309.798c-15.819,0.521-31.44-2.256-46.957-4.989c-15.391-2.712-30.719-4.398-46.257-5.964 c-15.806-1.594-31.592-3.385-47.447-4.423c-14.637-0.959-29.286-1.327-43.932-2.077c-14.734-0.755-28.471-4.023-42.863-6.885 c-14.136-2.811-28.679-3.313-42.72-6.577c-8.817-2.05-18.855-5.676-27.982-3.775c-6.538,1.362-8.171,10.125-8.397,15.485 c-0.403,9.577,2.016,19.268,3.71,28.626c2.211,12.216,1.692,23.877,0.167,36.189c-1.741,14.055-3.778,27.896-2.111,42.071 c1.977,16.82,3.735,33.451,3.474,50.429c-0.241,15.651-3.268,30.887-4.518,46.428c-0.48,5.977,0.044,12.109,1.979,17.801 c2.446,7.198,3.529,12.19,0.513,19.62c-1.958,4.824-3.494,8.836-2.445,14.056c0.823,4.101,3.037,7.748,6.002,10.64 c5.661,5.521,14.142,7.345,21.713,8.249c22.757,2.718,45.63-2.73,68.445,0.936c7.125,1.146,13.798,3.668,20.804,5.212 c5.245,1.155,10.595,0.845,15.876,0.167c6.375-0.817,12.694-1.791,19.108-2.288c7.131-0.553,14.103,1.776,20.805,3.883 c13.15,4.132,26.651,4.807,40.303,6.125c14.508,1.4,29.05,2.574,43.636,2.444c13.9-0.123,27.104-2.437,40.395-6.405 c13.591-4.058,26.883-8.724,41.142-9.771c16.396-1.205,33.229,0.085,49.667,0.234c15.442,0.14,31.162,0.683,46.558-0.681 c13.705-1.213,26.71-6.537,40.577-6.398c7.425,0.074,14.971,1.604,22.313,2.61c8.297,1.138,16.594,2.264,24.925,3.129 c15.581,1.62,31.1,2.104,46.731,1c16.284-1.148,32.44-3.732,48.582-6.084c14.608-2.128,29.741-3.333,43.806-8.071 c9.256-3.117,17.895-8.265,21.804-17.542c3.479-8.258,4.647-18.522,5.599-27.331c1.423-13.178-0.188-26.538-2.135-39.571 c-1.978-13.229-4.518-26.059-3.348-39.504c1.04-11.948,4.551-23.544,7.475-35.123c3.18-12.594,4.474-24.82,4.308-37.809 c-0.174-13.67-1.063-27.293,1.322-40.838c2.285-12.977,7.369-25.513,8.117-38.729c0.673-11.877-5.018-22.952-6.292-34.606").attr({'fill':'#ff0000','stroke':'none','opacity':'1'});
	
		
	
	var LogoDrawLinePath1 = paper.path(Raphael.transformPath("M509.754,267.758c32.154-0.018,64.294-0.928,96.41-2.434c16.329-0.766,32.649-1.697,48.965-2.705 c2.392-0.148,4.666,1.957,6.99,2.389c2.026,0.376,4.041,0.548,6.098,0.261c6.073-0.848,11.637-3.321,17.229-5.727 c14.06-6.049,29.179-7.473,43.667-12.028c8.274-2.602,17.485-7.028,22.308-14.602c5.781-9.082,3.514-19.581,3.248-29.739 c-0.298-11.375,6.465-21.077,7.766-32.196c2.779-23.757-7.208-47.1-5.938-70.896c0.563-10.56,1.912-21.053,1.925-31.643 c0.011-8.776-0.795-18.59-6.408-25.741c-5.906-7.525-16.952-4.725-25.012-3.575c-6.813,0.972-13.146-0.499-19.855-1.6 c-6.363-1.044-12.704-1.572-19.151-1.391c-31.654,0.886-63.596-3.392-95.136,0.458 c-16.779,2.048-33.186,4.847-50.147,5.267 c-16.694,0.413-33.071-1.289-49.498-4.087c-29.959-5.104-59.63,2.705-89.547,3.725c-33.202,1.133-66.407-1.744-99.484-4.232 c-31.965-2.404-63.883-3.499-95.927-4.091c-16.226-0.3-32.454-0.461-48.682-0.4c-13.978,0.053-28.242-0.385-42.134,1.379 c-16.793,2.132-32.738,9.384-42.704,23.455c-10.063,14.208-12.382,32.588-12.702,49.548c-0.223,11.777,1.508,23.49,1.134,35.25 c-0.464,14.596-4.447,28.842-6.58,43.229c-3.742,25.236-0.353,50.45,2.078,75.628", "s0.5")).attr({stroke: "none"});
	var LogoDrawLinePath2 = paper.path(Raphael.transformPath("M363.937,309.798c-15.819,0.521-31.44-2.256-46.957-4.989c-15.391-2.712-30.719-4.398-46.257-5.964 c-15.806-1.594-31.592-3.385-47.447-4.423c-14.637-0.959-29.286-1.327-43.932-2.077c-14.734-0.755-28.471-4.023-42.863-6.885 c-14.136-2.811-28.679-3.313-42.72-6.577c-8.817-2.05-18.855-5.676-27.982-3.775c-6.538,1.362-8.171,10.125-8.397,15.485 c-0.403,9.577,2.016,19.268,3.71,28.626c2.211,12.216,1.692,23.877,0.167,36.189c-1.741,14.055-3.778,27.896-2.111,42.071 c1.977,16.82,3.735,33.451,3.474,50.429c-0.241,15.651-3.268,30.887-4.518,46.428c-0.48,5.977,0.044,12.109,1.979,17.801 c2.446,7.198,3.529,12.19,0.513,19.62c-1.958,4.824-3.494,8.836-2.445,14.056c0.823,4.101,3.037,7.748,6.002,10.64 c5.661,5.521,14.142,7.345,21.713,8.249c22.757,2.718,45.63-2.73,68.445,0.936c7.125,1.146,13.798,3.668,20.804,5.212 c5.245,1.155,10.595,0.845,15.876,0.167c6.375-0.817,12.694-1.791,19.108-2.288c7.131-0.553,14.103,1.776,20.805,3.883 c13.15,4.132,26.651,4.807,40.303,6.125c14.508,1.4,29.05,2.574,43.636,2.444c13.9-0.123,27.104-2.437,40.395-6.405 c13.591-4.058,26.883-8.724,41.142-9.771c16.396-1.205,33.229,0.085,49.667,0.234c15.442,0.14,31.162,0.683,46.558-0.681 c13.705-1.213,26.71-6.537,40.577-6.398c7.425,0.074,14.971,1.604,22.313,2.61c8.297,1.138,16.594,2.264,24.925,3.129 c15.581,1.62,31.1,2.104,46.731,1c16.284-1.148,32.44-3.732,48.582-6.084c14.608-2.128,29.741-3.333,43.806-8.071 c9.256-3.117,17.895-8.265,21.804-17.542c3.479-8.258,4.647-18.522,5.599-27.331c1.423-13.178-0.188-26.538-2.135-39.571 c-1.978-13.229-4.518-26.059-3.348-39.504c1.04-11.948,4.551-23.544,7.475-35.123c3.18-12.594,4.474-24.82,4.308-37.809 c-0.174-13.67-1.063-27.293,1.322-40.838c2.285-12.977,7.369-25.513,8.117-38.729c0.673-11.877-5.018-22.952-6.292-34.606", "s0.7")).attr({stroke: "none"});

	//var LogoDrawLinePath1 = paper.path(Raphael.transformPath("M16,1.466C7.973,...", "s4T50,50")).attr({fill: "#000", stroke: "none"});
	

	alert(LogoDrawLinePath1.path);
	
	/*alert(svgData.demo.strokepath[0].path);
	alert(svgData.demo.strokepath[1].path);*/
	
	// Setup your Lazy Line element.
	// see README file for more settings
	$('#demo').lazylinepainter({
			'svgData' : svgData,
			'strokeWidth':20,  
			'strokeColor':'#dc908e',
			'onComplete' : function(){
				//$(this).animate({'marginTop':60},500);
				//paper = Raphael(box,boxWidth,boxheight)
				}	
		}
	) 
	
	
	// Paint your Lazy Line, that easy!
	$('#demo').lazylinepainter('paint');
	
	
		
	c = new Boid.Agent(w,h);
	c.start();
	
	//Colour of rules Override:
	
	c.ruleColours[0] = "yellow";
	c.ruleColours[1] = "red";
	c.ruleColours[2] = "blue";
	
	$("#initpop").val(c.initialPopulation);
	$("#percRange").val(c.perceptionRange);
	
	controlmySliders();
	changeWallCollisionState(0);
	changeObstacleState(1);
	resizeFonts();
				
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
	
function resizeFonts()
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


	
	


