/*svg = {};
svg.svgarray = [];

svg.objekt = function(path){
	
	this.path=path;
	this.id;
	
	
	var self=this;
	
	this.init =function(){
		
		
		self.id = svg.svgarray.length;
		
		svg.svgarray.push(self);
		var name = "logopath_"+self.id;
		self.path.attr("id",name);
	}
	
	self.init();
}*/

var global;

var isInGame = true;

var godversusdemonpanel13 = 0;
var godversusdemonpanel24 = 0;

var godversusdemon = godversusdemonpanel13 + godversusdemonpanel24;

var activepower = "none";


$(document).ready(function(){ 
	
	
	//$("#stopbutton").click(stopButtonCB);
	//$("#restartbutton").click(restartButtonCB);
	/*$("#canvas_info_numberboids").click(numberboidsButtonCB);
	$("#canvas_info_pigeonholes").click(pigeonholesButtonCB);
	$("#canvas_info_perceptionrange").click(perceptionrangeButtonCB);
	$("#canvas_info_boidids").click(boididsButtonCB);*/
	
	/*Actions to trigger when users goes out and in the tab*/
	////////////////
	/////
	
	/*$(window).blur(function(e) {
    // Do Blur Actions Here
    	if(isInGame==true) {
    		
    		stopButtonCB();
    		isInGame = false;
    	}
    	
	});
	
	$(window).focus(function(e) {
    // Do Focus Actions Here
    	if(isInGame==false) {
    		
    		startButtonCB();
    		isInGame = true;
    	}
    	
    	
	});*/
	
	
	$('#mycanvas').mousedown(executePower);
	
		
	//////////////////
	//////////////////
	
	
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
	
	
	//Make DoubleHand attached to cursor from the beginning
	
	
	/*$("body").mousemove(function(e){
      $('#followmouse').css({'top': e.clientY +3, 'left': e.clientX -24});
	});*/
	
	
	
	/*$('html').hover(function(){
		
		
	});*/
	
	
	
	
	$('#godlytrclass1').hover(function(){
		$('#godlypowerlabel1').css("opacity","1");
		

	},function(){
		
		
		//f(!$('#godlytrclass1').hasClass("imagehighlight")) $('#godlypowerlabel1').css("opacity","0");
	});
	
	$('#godlytrclass2').hover(function(){
		$('#godlypowerlabel2').css("opacity","1");
		

	},function(){
		
		
		//if(!$('#godlytrclass2').hasClass("imagehighlight")) $('#godlypowerlabel2').css("opacity","0");
	});
	
	$('#godlytrclass3').hover(function(){
		$('#godlypowerlabel3').css("opacity","1");
		

	},function(){
		
		
		//if(!$('#godlytrclass3').hasClass("imagehighlight")) $('#godlypowerlabel3').css("opacity","0");
	});
	
	$('#godlytrclass4').hover(function(){
		$('#godlypowerlabel4').css("opacity","1");
		

	},function(){
		
		
		//if(!$('#godlytrclass4').hasClass("imagehighlight")) $('#godlypowerlabel4').css("opacity","0");
	});
	
	$('#godlyomnitrclass1').hover(function(){
		$('#godlypowerlabel5').css("opacity","1");
		

	},function(){
		
		
		//if(!$('#godlyomnitrclass1').hasClass("imagehighlight")) $('#godlypowerlabel5').css("opacity","0");
	});
	
	$('#godlyomnitrclass2').hover(function(){
		$('#godlypowerlabel6').css("opacity","1");
		

	},function(){
		
		
		//if(!$('#godlyomnitrclass2').hasClass("imagehighlight")) $('#godlypowerlabel6').css("opacity","0");
	});
	
	$('#godlyomnitrclass3').hover(function(){
		$('#godlypowerlabel7').css("opacity","1");
		

	},function(){
		
		
		//if(!$('#godlyomnitrclass3').hasClass("imagehighlight")) $('#godlypowerlabel7').css("opacity","0");
	});
	
	
	$('#demontrclass1').hover(function(){
		$('#demonpowerlabel1').css("opacity","1");
		

	},function(){
		
		
		//if(!$('#demontrclass1').hasClass("imagehighlight-1")) $('#demonpowerlabel1').css("opacity","0");
	});
	
	$('#demontrclass2').hover(function(){
		$('#demonpowerlabel2').css("opacity","1");
		

	},function(){
		
		
		//if(!$('#demontrclass2').hasClass("imagehighlight-1")) $('#demonpowerlabel2').css("opacity","0");
	});
	
	$('#demontrclass3').hover(function(){
		$('#demonpowerlabel3').css("opacity","1");
		

	},function(){
		
		
		//if(!$('#demontrclass3').hasClass("imagehighlight-1")) $('#demonpowerlabel3').css("opacity","0");
	});
	
	$('#demontrclass4').hover(function(){
		$('#demonpowerlabel4').css("opacity","1");
		

	},function(){
		
		
		//if(!$('#demontrclass4').hasClass("imagehighlight-1")) $('#demonpowerlabel4').css("opacity","0");
	});
	
	$('#demonomnitrclass1').hover(function(){
		$('#demonpowerlabel5').css("opacity","1");
		

	},function(){
		
		
		//if(!$('#demonomnitrclass1').hasClass("imagehighlight-1")) $('#demonpowerlabel5').css("opacity","0");
	});
	
	$('#demonomnitrclass2').hover(function(){
		$('#demonpowerlabel6').css("opacity","1");
		

	},function(){
		
		
		//if(!$('#demonomnitrclass2').hasClass("imagehighlight-1")) $('#demonpowerlabel6').css("opacity","0");
	});
	
	$('#demonomnitrclass3').hover(function(){
		$('#demonpowerlabel7').css("opacity","1");
		

	},function(){
		
		
		//if(!$('#demonomnitrclass3').hasClass("imagehighlight-1")) $('#demonpowerlabel7').css("opacity","0");
	});
	
	
	
	
	
	
	
	
	//updateHand(0);
		
	
	
	$('#clickpanel1').click(togglePanel1Show);
	$('#clickpanel2').click(togglePanel2Show);
	$('#clickpanel3').click(togglePanel3Show);
	$('#clickpanel4').click(togglePanel4Show);
	
	
	
	
	$('#clickpanel1').hover(function(){
		$(this).css("background-color","rgba(217,255,255,0.6)");
		$(this).addClass("imagehighlight1");
		//updateHand(1);

	},function(){
		
		$(this).css("background-color","rgba(250,255,255,0.6)");
		$(this).removeClass("imagehighlight1");
		
	});
	
	$('#clickpanel2').hover(function(){
		$(this).css("background-color","rgba(217,255,255,0.6)");
		$(this).addClass("imagehighlight1");
		//updateHand(1);
		
	},function(){
		
		$(this).css("background-color","rgba(250,255,255,0.6)");
		$(this).removeClass("imagehighlight1");
		
	});
	
	$('#clickpanel3').hover(function(){
		$(this).css("background-color","rgba(255,143,143,0.4)");
		$(this).addClass("imagehighlight2");
		//updateHand(-1);
		
	},function(){
		
		$(this).css("background-color","rgba(250,255,255,0.4)");
		$(this).removeClass("imagehighlight2");
		
	});
	
	$('#clickpanel4').hover(function(){
		$(this).css("background-color","rgba(255,143,143,0.4)");
		$(this).addClass("imagehighlight2");
		//updateHand(-1);
	},function(){
		
		$(this).css("background-color","rgba(250,255,255,0.4)");
		$(this).removeClass("imagehighlight2");
		
	});
	
	
	/*$('#panel1').hover(function(){
		//updateHand(1);
	},function(){
		
	});
	$('#panel2').hover(function(){
		//updateHand(1);
	},function(){
		
	});
	$('#panel3').hover(function(){
		//updateHand(-1);
	},function(){
		
	});
	$('#panel4').hover(function(){
		//updateHand(-1);
	},function(){
		
	});*/
	
	/*$('#mycanvas').hover(function(){
		if(godversusdemon == 0) updateHand(0);
	},function(){
		
	});*/
	
	
	
	
	
	
	$('#godlytrclass1').click(activateGodlyPower1);	
	$('#godlytrclass2').click(activateGodlyPower2);
	$('#godlytrclass3').click(activateGodlyPower3);
	$('#godlytrclass4').click(activateGodlyPower4);
	$('#demontrclass1').click(activateDemonPower1);	
	$('#demontrclass2').click(activateDemonPower2);
	$('#demontrclass3').click(activateDemonPower3);
	$('#demontrclass4').click(activateDemonPower4);
	$('#godlyomnitrclass1').click(toggleGodlyOmni1);
	$('#godlyomnitrclass2').click(toggleGodlyOmni2);
	$('#godlyomnitrclass3').click(toggleGodlyOmni3);
	$('#demonomnitrclass1').click(toggleDemonOmni1);
	$('#demonomnitrclass2').click(toggleDemonOmni2);
	$('#demonomnitrclass3').click(toggleDemonOmni3);

	
	
	//$("#Alignment").click(toggleAlignment);

	//$('#Alignment').css('color','purple');
	
	var w = $("#dummy_pane").width();	
	var h = $("#dummy_pane").height();
	

	$('#shrine').css("width",w/10);
	$('#shrine').css("height",h/8);
	
	//$('#shrine').css("top",$("#dummy_pane").width());
	//$('#shrine').css("left",$("#dummy_pane").height());
	
	
	
	
	/*var elem = document.getElementById("control");
	var bBox = elem.getBBox();
	var scaleX = 2;
	var scaleY = 2;
	$(elem).attr("transform", "scale("+scaleX+", "+scaleY+") translate("+-bBox.width/2+","+-bBox.height/2+") ");*/
	
	
	
	//var LogoDrawLinePath1 = paper.path("M509.754,267.758c32.154-0.018,64.294-0.928,96.41-2.434c16.329-0.766,32.649-1.697,48.965-2.705 c2.392-0.148,4.666,1.957,6.99,2.389c2.026,0.376,4.041,0.548,6.098,0.261c6.073-0.848,11.637-3.321,17.229-5.727 c14.06-6.049,29.179-7.473,43.667-12.028c8.274-2.602,17.485-7.028,22.308-14.602c5.781-9.082,3.514-19.581,3.248-29.739 c-0.298-11.375,6.465-21.077,7.766-32.196c2.779-23.757-7.208-47.1-5.938-70.896c0.563-10.56,1.912-21.053,1.925-31.643 c0.011-8.776-0.795-18.59-6.408-25.741c-5.906-7.525-16.952-4.725-25.012-3.575c-6.813,0.972-13.146-0.499-19.855-1.6 c-6.363-1.044-12.704-1.572-19.151-1.391c-31.654,0.886-63.596-3.392-95.136,0.458 c-16.779,2.048-33.186,4.847-50.147,5.267 c-16.694,0.413-33.071-1.289-49.498-4.087c-29.959-5.104-59.63,2.705-89.547,3.725c-33.202,1.133-66.407-1.744-99.484-4.232 c-31.965-2.404-63.883-3.499-95.927-4.091c-16.226-0.3-32.454-0.461-48.682-0.4c-13.978,0.053-28.242-0.385-42.134,1.379 c-16.793,2.132-32.738,9.384-42.704,23.455c-10.063,14.208-12.382,32.588-12.702,49.548c-0.223,11.777,1.508,23.49,1.134,35.25 c-0.464,14.596-4.447,28.842-6.58,43.229c-3.742,25.236-0.353,50.45,2.078,75.628").attr({'fill':'#ffff00','stroke':'none','opacity':'1'});
	//var LogoDrawLinePath2 = paper.path("M363.937,309.798c-15.819,0.521-31.44-2.256-46.957-4.989c-15.391-2.712-30.719-4.398-46.257-5.964 c-15.806-1.594-31.592-3.385-47.447-4.423c-14.637-0.959-29.286-1.327-43.932-2.077c-14.734-0.755-28.471-4.023-42.863-6.885 c-14.136-2.811-28.679-3.313-42.72-6.577c-8.817-2.05-18.855-5.676-27.982-3.775c-6.538,1.362-8.171,10.125-8.397,15.485 c-0.403,9.577,2.016,19.268,3.71,28.626c2.211,12.216,1.692,23.877,0.167,36.189c-1.741,14.055-3.778,27.896-2.111,42.071 c1.977,16.82,3.735,33.451,3.474,50.429c-0.241,15.651-3.268,30.887-4.518,46.428c-0.48,5.977,0.044,12.109,1.979,17.801 c2.446,7.198,3.529,12.19,0.513,19.62c-1.958,4.824-3.494,8.836-2.445,14.056c0.823,4.101,3.037,7.748,6.002,10.64 c5.661,5.521,14.142,7.345,21.713,8.249c22.757,2.718,45.63-2.73,68.445,0.936c7.125,1.146,13.798,3.668,20.804,5.212 c5.245,1.155,10.595,0.845,15.876,0.167c6.375-0.817,12.694-1.791,19.108-2.288c7.131-0.553,14.103,1.776,20.805,3.883 c13.15,4.132,26.651,4.807,40.303,6.125c14.508,1.4,29.05,2.574,43.636,2.444c13.9-0.123,27.104-2.437,40.395-6.405 c13.591-4.058,26.883-8.724,41.142-9.771c16.396-1.205,33.229,0.085,49.667,0.234c15.442,0.14,31.162,0.683,46.558-0.681 c13.705-1.213,26.71-6.537,40.577-6.398c7.425,0.074,14.971,1.604,22.313,2.61c8.297,1.138,16.594,2.264,24.925,3.129 c15.581,1.62,31.1,2.104,46.731,1c16.284-1.148,32.44-3.732,48.582-6.084c14.608-2.128,29.741-3.333,43.806-8.071 c9.256-3.117,17.895-8.265,21.804-17.542c3.479-8.258,4.647-18.522,5.599-27.331c1.423-13.178-0.188-26.538-2.135-39.571 c-1.978-13.229-4.518-26.059-3.348-39.504c1.04-11.948,4.551-23.544,7.475-35.123c3.18-12.594,4.474-24.82,4.308-37.809 c-0.174-13.67-1.063-27.293,1.322-40.838c2.285-12.977,7.369-25.513,8.117-38.729c0.673-11.877-5.018-22.952-6.292-34.606").attr({'fill':'#ff0000','stroke':'none','opacity':'1'});
	
	/*paper.setStart();
		Obj=paper.path('M 509.8 267.8 C 541.9 267.7 574 266.8 606.2 265.3 C 622.5 264.6 638.8 263.6 655.1 262.6 C 657.5 262.5 659.8 264.6 662.1 265 C 664.1 265.4 666.2 265.6 668.2 265.3 C 674.3 264.4 679.9 261.9 685.4 259.5 C 699.5 253.5 714.6 252.1 729.1 247.5 C 737.4 244.9 746.6 240.5 751.4 232.9 C 757.2 223.8 754.9 213.3 754.7 203.2 C 754.4 191.8 761.1 182.1 762.4 171 C 765.2 147.2 755.2 123.9 756.5 100.1 C 757.1 89.5 758.4 79 758.4 68.4 C 758.4 59.7 757.6 49.8 752 42.7 C 746.1 35.2 735.1 38 727 39.1 C 720.2 40.1 713.9 38.6 707.1 37.5 C 700.8 36.5 694.4 36 688 36.1 C 656.3 37 624.4 32.7 592.9 36.6 C 576.1 38.6 559.7 41.4 542.7 41.9 C 526 42.3 509.6 40.6 493.2 37.8 C 463.3 32.7 433.6 40.5 403.7 41.5 C 370.5 42.6 337.3 39.8 304.2 37.3 C 272.2 34.9 240.3 33.8 208.3 33.2 C 192 32.9 175.8 32.7 159.6 32.8 C 145.6 32.8 131.3 32.4 117.4 34.2 C 100.6 36.3 84.7 43.5 74.7 57.6 C 64.7 71.8 62.4 90.2 62 107.2 C 61.8 118.9 63.5 130.6 63.2 142.4 C 62.7 157 58.7 171.2 56.6 185.6 C 52.8 210.9 56.2 236.1 58.7 261.3 C 58.7 261.7 60.7 261.3 60.6 260.7 C 59 244.5 57 228.3 56.8 212 C 56.5 196.1 59.2 180.7 62.1 165.1 C 64.6 151.7 65.5 138.9 64.5 125.3 C 63.8 114.8 63.7 104.3 64.7 93.8 C 66.4 76.2 72.2 58.4 86.4 46.9 C 106.7 30.6 136.5 33.7 160.7 33.6 C 193.7 33.5 226.7 33.9 259.7 35.4 C 292.4 36.8 325.1 40.2 357.9 41.8 C 373.5 42.6 389.2 42.8 404.8 42.3 C 420.3 41.8 435.4 39.3 450.8 37.8 C 466.6 36.3 482.1 36.9 497.7 39.7 C 512.9 42.3 528.4 43.1 543.8 42.7 C 559.6 42.3 575.1 40 590.6 37.7 C 607.7 35.2 625 35.8 642.2 36.5 C 657.8 37.1 673.3 37.4 689 37 C 701.2 36.6 713.2 41.5 725.4 40.1 C 731.6 39.4 738 37.7 744.3 39.3 C 749.3 40.5 752.3 45.8 754 50.3 C 757.5 59.8 756.7 70.8 756.1 80.7 C 755.5 90.3 754 100 754.5 109.7 C 755.1 122.7 758 135.6 759.7 148.5 C 761.3 160.9 761.7 173.2 756.9 185 C 753.1 194.5 752.7 202.5 753.2 212.5 C 753.5 218.5 753.7 224.4 751.3 230.1 C 748.7 236.1 743.1 240.3 737.4 243.3 C 724.3 250.2 708.7 250.9 694.7 255.2 C 688.7 257.1 683 259.9 677 262.2 C 672.2 264.1 667.2 265.3 662.2 263.8 C 658.6 262.7 659.3 261.5 655.9 261.7 C 639.6 262.8 623.3 263.7 607 264.4 C 574.9 266 542.7 266.9 510.6 266.9 C 510 266.9 508.5 267.8 509.8 267.8 L 509.8 267.8Z');
		Obj.attr({'fill':'#000000','stroke':'none'});
		Obj=paper.path('M 363.9 309.8 C 348.1 310.3 332.5 307.5 317 304.8 C 301.6 302.1 286.3 300.4 270.7 298.8 C 254.9 297.3 239.1 295.5 223.3 294.4 C 208.6 293.5 194 293.1 179.3 292.3 C 164.6 291.6 150.9 288.3 136.5 285.5 C 122.3 282.6 107.8 282.1 93.8 278.9 C 84.9 276.8 74.9 273.2 65.8 275.1 C 59.2 276.5 57.6 285.2 57.4 290.6 C 57 300.2 59.4 309.9 61.1 319.2 C 63.3 331.4 62.8 343.1 61.3 355.4 C 59.5 369.5 57.5 383.3 59.1 397.5 C 61.1 414.3 62.9 430.9 62.6 447.9 C 62.4 463.6 59.4 478.8 58.1 494.3 C 57.6 500.3 58.1 506.4 60.1 512.1 C 62.5 519.3 63.6 524.3 60.6 531.8 C 58.6 536.6 57.1 540.6 58.2 545.8 C 59 549.9 61.2 553.6 64.2 556.5 C 69.8 562 78.3 563.8 85.9 564.7 C 108.6 567.4 131.5 562 154.3 565.6 C 161.4 566.8 168.1 569.3 175.1 570.9 C 180.4 572 185.7 571.7 191 571 C 197.4 570.2 203.7 569.2 210.1 568.7 C 217.2 568.2 224.2 570.5 230.9 572.6 C 244.1 576.7 257.6 577.4 271.2 578.7 C 285.7 580.1 300.3 581.3 314.8 581.2 C 328.7 581.1 341.9 578.7 355.2 574.8 C 368.8 570.7 382.1 566.1 396.4 565 C 412.8 563.8 429.6 565.1 446 565.2 C 461.5 565.4 477.2 565.9 492.6 564.6 C 506.3 563.3 519.3 558 533.2 558.2 C 540.6 558.2 548.2 559.8 555.5 560.8 C 563.8 561.9 572.1 563 580.4 563.9 C 596 565.5 611.5 566 627.2 564.9 C 643.4 563.8 659.6 561.2 675.7 558.8 C 690.3 556.7 705.5 555.5 719.5 550.7 C 728.8 547.6 737.4 542.5 741.3 533.2 C 744.8 524.9 746 514.7 746.9 505.9 C 748.4 492.7 746.8 479.3 744.8 466.3 C 742.8 453.1 740.3 440.2 741.5 426.8 C 742.5 414.8 746 403.3 748.9 391.7 C 752.1 379.1 753.4 366.9 753.2 353.9 C 753.1 340.2 752.2 326.6 754.6 313 C 756.8 300 761.9 287.5 762.7 274.3 C 763.4 262.4 757.7 251.3 756.4 239.7 C 756.3 238.8 754.4 239.3 754.5 240.2 C 755.2 246.9 757.2 253.2 758.9 259.7 C 760.9 267.6 761.1 275.3 759.7 283.3 C 757 298.4 751.8 312.5 751 328 C 750.3 343.6 752.2 359.3 750.5 374.9 C 749 388.7 743.9 402 741.2 415.6 C 738.3 429.8 739.1 443.3 741.4 457.6 C 744 473.6 746.4 489.7 745 506 C 744.4 512.2 743.1 518.4 741.9 524.4 C 740.8 529.7 739.3 534.9 735.9 539.2 C 726.8 550.9 708.3 552.4 694.9 554.8 C 678.4 557.7 661.5 559.8 644.8 561.8 C 628.1 563.9 611.3 564.9 594.6 563.7 C 578.5 562.4 562.6 560.2 546.6 558.1 C 540.1 557.3 533.8 556.5 527.2 557 C 521 557.5 514.8 559 508.8 560.4 C 493.3 563.9 477.8 563.9 461.9 564 C 445.2 564 428.6 563.6 411.9 563.5 C 398 563.4 385.3 564.5 371.9 568.3 C 358.2 572.2 344.9 577.2 330.6 578.9 C 315.4 580.8 299.8 579.8 284.6 578.5 C 277.4 578 270.2 577.2 262.9 576.5 C 255 575.7 247.1 575.4 239.4 573.5 C 233.6 572.1 228.1 570 222.4 568.6 C 216.6 567.1 211.1 567.4 205.2 567.8 C 199.1 568.3 193.2 569.6 187.1 570.1 C 179.1 570.9 172.2 568.3 164.7 566.3 C 141.4 560.2 118.1 564.4 94.5 563.9 C 85.1 563.7 75 562.5 67.3 556.8 C 63.5 553.9 61.2 549.8 60.1 545.3 C 58.4 538.4 62.8 532.4 64.5 525.9 C 65.8 521 63.7 516.1 62 511.6 C 59.3 504.4 59.7 496.4 60.6 488.8 C 62.4 473.2 64.6 457.8 64.6 442 C 64.6 426.2 62.7 410.7 60.9 395.1 C 59.1 380 62.2 364.9 63.8 350 C 65.1 338.8 64.8 328.5 62.8 317.5 C 61 307.7 58.5 297.5 59.5 287.4 C 60 283.1 61.6 278.8 65.6 276.6 C 70.4 274 79.9 277.2 84.8 278.3 C 96.8 281 108.6 282.8 120.9 284.4 C 130.9 285.8 140.5 288.2 150.3 290.2 C 159.7 292.1 169.1 293.2 178.7 293.7 C 199 294.8 219.3 295.3 239.5 297.1 C 260.8 299 282.4 300.6 303.5 304 C 323.5 307.1 343.4 311.8 363.7 311.2 C 364.8 311.1 365.3 309.8 363.9 309.8 L 363.9 309.8Z');
		Obj.attr({'fill':'#000000','stroke':'none'});
	var pathlinesfinal = paper.setFinish();	
	
	*/
	
	
	
	
	//var LogoDrawLinePath1 = paper.path(Raphael.transformPath("M16,1.466C7.973,...", "s4T50,50")).attr({fill: "#000", stroke: "none"});
	

		
	/*alert(svgData.demo.strokepath[0].path);
	alert(svgData.demo.strokepath[1].path);*/
	
	//Maybe use maybe not//
	
	//scaleAndDrawPaths(w,h);	
	
	var imageArray=[];
	
	var normalSpriteSheet = new Image();
	var messiahSpriteSheet = new Image();
	var friendSpriteSheet = new Image();
	var outcastSpriteSheet = new Image();
	var testSprite = new Image();
	
	normalSprite.src = "img/normaltype_spritesheet.png";
	messiahSprite.src = "img/messiahtype_spritesheet.png";		
	friendSprite.src = "img/friendtype_spritesheet.png";
	outcastSprite.src = "img/outcasttype_spritesheet.png";
	testSprite.src = "img/normaltype_spritesheet.png";
	
	imageArray.push(normalSprite);
	imageArray.push(messiahSprite);
	imageArray.push(friendSprite);
	imageArray.push(outcastSprite);
	imageArray.push(testSprite);
	
	
	c = new Boid.Agent(w, h, imageArray);
	
	outcastSprite.onload = function() {
	    c.start(); 
	};
	
	//Colour of rules Override:
	
	c.ruleColours[0] = "yellow";
	c.ruleColours[1] = "red";
	c.ruleColours[2] = "blue";
	
	$("#initpop").val(c.initialPopulation);
	$("#percRange").val(c.perceptionRange);
	
	
	//Deactivate Perception Range, BoidNumber and Grid to false in beginning
		
	initializeViewToFalse();

	var centerx = parseInt($('#mycanvas').css('top'))+ h/2 -32;
	var centery = parseInt($('#mycanvas').css('left'))+ w/2 -32;
	
	$('#shrine').css("top",centerx);
	$('#shrine').css("left",centery);
	//$('#shrine').css("left",h/10);
		
	
	
	controlmySliders();
	changeWallCollisionState(0);
	changeObstacleState(1);
	resizeFonts();
	//scaleAndDrawPaths(w,h);
				
	/*makeSlider("Alignment",c.ruleColours[0],function(v){c.ruleCoeffs[0] = v}, {value:1, min:0, max:10, step:.05});
	makeSlider("Repulsion",c.ruleColours[1],function(v){c.ruleCoeffs[1] = v}, {value:1, min:0, max:10, step:.05});
	makeSlider("Cohesion",c.ruleColours[2],function(v){c.ruleCoeffs[2] = v}, {value:0, min:0, max:10, step:.05});
	makeSlider("Sim Speed",NaN,function(v){c.simulationSpeed = v}, {value:1, min:0.05, max:10, step:.05});*/
	
	
	
	
	//$("#restartbutton").click(checkbutton);	
	
	
		

});



/*function checkbutton()
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
	
	/*if(inputtest===false)
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
	
}*/


/*function stopButtonCB()
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
}*/

/*function stopButtonCB()
{
	
	if (c.running == 1) {
		
		c.running = 0;
			
	}*/
	
	
	/*if (c.running) {
		c.running = 0;
		$("#stopbutton").html("start");
	} else {
		c.running = 1;
		$("#stopbutton").html("stop");
		var now = Date.now();
		reqFrame(c.drawLoop.bind(c,now));
	
	}*/
//}

/*function startButtonCB()
{
	if (c.running == 0) {
		
		c.running = 1;
		var now = Date.now();
		
		reqFrame(c.drawLoop.bind(c,now));
		
	}
	
}*/

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

/*function pigeonholesButtonCB()
{	
	if (c.pigeonholesVisible) {
		c.pigeonholesVisible = false;
	}
	else{
		c.pigeonholesVisible = true;
	}
	
}*/

/*function perceptionrangeButtonCB(value)
{	
	
	if (c.perceptionRangeVisible) {
		c.perceptionRangeVisible = false;
	}
	else{
		c.perceptionRangeVisible = true;
	}
}*/

/*function boididsButtonCB()
{	
	
	if (c.displayBoidIDs) {
		c.displayBoidIDs = false;
	}
	else{
		c.displayBoidIDs = true;
	}
}*/


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

function togglePanel1Show() {
	
	var $clickpanel1 = $('#clickpanel1');
	var $panel1 = $('#panel1');
	
	if($clickpanel1.hasClass("active"))
	{
		$clickpanel1.css("left", "70%");
		$clickpanel1.removeClass("active");
		$panel1.css("left", "85%");
		cleanPowersGodly();
		
		if(godversusdemonpanel13 != -1) {
			
			updateActivePower();
			godversusdemonpanel13 = 0;
		}
		
	}
	
	else {
		$clickpanel1.css("left", "-15%");
		$clickpanel1.addClass("active");
		$panel1.css("left", "0%");
		
		if($('#clickpanel3').hasClass("active"))
		{
			
			togglePanel3Show();
		}
		
		godversusdemonpanel13 = +1;
	}
	
	calculateGodVersusDemon();
	
}

function togglePanel2Show() {
	
	var $clickpanel2 = $('#clickpanel2');
	var $panel2 = $('#panel2');
	
	if($clickpanel2.hasClass("active"))
	{
		$clickpanel2.css("left", "70%");
		$clickpanel2.removeClass("active");
		$panel2.css("left", "85%");
		
		
		if(godversusdemonpanel24 != -1) godversusdemonpanel24 = 0;
	
	}
	
	else {
		$clickpanel2.css("left", "-15%");
		$clickpanel2.addClass("active");
		$panel2.css("left", "0%");
		
		if($('#clickpanel4').hasClass("active"))
		{
			
			togglePanel4Show();
		}
		godversusdemonpanel24 = +1;
		
	}
	calculateGodVersusDemon();
	cleanOmni();
		
}

function togglePanel3Show() {
	
	var $clickpanel3 = $('#clickpanel3');
	var $panel3 = $('#panel3');
	
	if($clickpanel3.hasClass("active"))
	{
		$clickpanel3.css("left", "-85%");
		$clickpanel3.removeClass("active");
		$panel3.css("left", "-85%");
		cleanPowersGodly();
		
		
		if(godversusdemonpanel13 != +1) {
			
			updateActivePower();
			godversusdemonpanel13 = 0;
		} 
		
		
	}
	
	else {
		$clickpanel3.css("left", "0%");
		$clickpanel3.addClass("active");
		$panel3.css("left", "0%");
		
		if($('#clickpanel1').hasClass("active"))
		{
			
			togglePanel1Show();	
		}
		godversusdemonpanel13 = -1;
	}
	
	calculateGodVersusDemon();
	
}

function togglePanel4Show() {
	
	var $clickpanel4 = $('#clickpanel4');
	var $panel4 = $('#panel4');
	//var $clickpanel2 = $('#clickpanel2');
	//var $panel2 = $('#panel2');
	
	if($clickpanel4.hasClass("active"))
	{
		$clickpanel4.css("left", "-85%");
		$clickpanel4.removeClass("active");
		$panel4.css("left", "-85%");
		
		if(godversusdemonpanel24 != +1) godversusdemonpanel24 = 0;
		
		
	}
	
	else {
		$clickpanel4.css("left", "0%");
		$clickpanel4.addClass("active");
		$panel4.css("left", "0%");
		
		
		if($('#clickpanel2').hasClass("active"))
		{
			
			togglePanel2Show();
	
		}	
		godversusdemonpanel24 = -1;	
	}
	
	calculateGodVersusDemon();
	cleanOmni();
	
}


function activateGodlyPower1 () {
	
	$godlypower = $(this);
	
	cleanPowersGodly($godlypower);
	
	
	if ($godlypower.hasClass("imagehighlight")) {
		updateActivePower("messiah");
	}
	
	
	
	
}

function activateGodlyPower2 () {
	
	$godlypower = $(this);
	
	cleanPowersGodly($godlypower);
	
	if ($godlypower.hasClass("imagehighlight")) {
		updateActivePower("friendship");
	
	}
	
}

function activateGodlyPower3 () {
	
	$godlypower = $(this);
	
	cleanPowersGodly($godlypower);
	
	if ($godlypower.hasClass("imagehighlight")) {
		updateActivePower("immaculate");
	}
	
}

function activateGodlyPower4 () {
	
	$godlypower = $(this);
	
	cleanPowersGodly($godlypower);
	
	if ($godlypower.hasClass("imagehighlight")) {
		updateActivePower("healblindness");
	}
	
}

function activateDemonPower1 () {
	
	$demonpower = $(this);
	
	cleanPowersDemon($demonpower);
	
	if ($demonpower.hasClass("imagehighlight-1")) {
		updateActivePower("outcast");
	}
	
}

function activateDemonPower2 () {
	
	$demonpower = $(this);
	
	cleanPowersDemon($demonpower);

	
	if ($demonpower.hasClass("imagehighlight-1")) {
		updateActivePower("blindness");
	}
	
}

function activateDemonPower3 () {
	
	$demonpower = $(this);
	
	cleanPowersDemon($demonpower);

	
	if ($demonpower.hasClass("imagehighlight-1")) {
		updateActivePower("suddendeath");
	}
	
}

function activateDemonPower4 () {
	
	$demonpower = $(this);
	
	cleanPowersDemon($demonpower);
	
	if ($demonpower.hasClass("imagehighlight-1")) {
		updateActivePower("sacrifice");
		
	}
	
}

function toggleGodlyOmni1 () {
	
	$godlyomni = $(this);
	
	if (!$godlyomni.hasClass("imagehighlight")) {
		c.pigeonholesVisible = true;
		$godlyomni.addClass("imagehighlight");
	}
	else{
		c.pigeonholesVisible = false;
		$godlyomni.removeClass("imagehighlight");
	}
	
	if(!$godlyomni) c.pigeonholesVisible = false;
	
}

function toggleGodlyOmni2 () {
	
	$godlyomni = $(this);
	
	if (!$godlyomni.hasClass("imagehighlight")) {
		c.ruleVectorVisible = [true, true, false, false, false, false];
		c.setVisibiliyInteractionList(true);	
		$godlyomni.addClass("imagehighlight");
	}
	else{
		c.ruleVectorVisible = [false, false, false, false, false, false];
		c.setVisibiliyInteractionList(false);	
		$godlyomni.removeClass("imagehighlight");
	}
	
}
function toggleGodlyOmni3 () {
	
	$godlyomni = $(this);
	
	if (!$godlyomni.hasClass("imagehighlight")) {
		alert("Godly Omni 3 Activated!");
		$godlyomni.addClass("imagehighlight");
	}
	else{
		alert("Godly Omni 3 Deactivated!");
		$godlyomni.removeClass("imagehighlight");
	}
	
}

function toggleDemonOmni1 () {
	
	$demonomni = $(this);
		
	if (!$demonomni.hasClass("imagehighlight-1")) {
		c.pigeonholesVisible = true;
		$demonomni.addClass("imagehighlight-1");
	}
	else{
		c.pigeonholesVisible = false;
		$demonomni.removeClass("imagehighlight-1");
	}
	
	if(!$demonomni) c.pigeonholesVisible = false;

}

function toggleDemonOmni2 () {
	
	$demonomni = $(this);
	
	if (!$demonomni.hasClass("imagehighlight-1")) {
		c.displayBoidIDs = true;
		$demonomni.addClass("imagehighlight-1");
		
	}
	else{
		c.displayBoidIDs = false;
		$demonomni.removeClass("imagehighlight-1");
	}
	
}

function toggleDemonOmni3 () {
	
	$demonomni = $(this);
	
	if (!$demonomni.hasClass("imagehighlight-1")) {
		c.perceptionRangeVisible = true;
		$demonomni.addClass("imagehighlight-1");
		
	}
	else{
		c.perceptionRangeVisible = false;
		$demonomni.removeClass("imagehighlight-1");
	}
	
		
}

function cleanPowersGodly ($actualpower) {
		
	
	$('#godlytrclass1').removeClass("imagehighlight");
	$('#godlytrclass2').removeClass("imagehighlight");
	$('#godlytrclass3').removeClass("imagehighlight");
	$('#godlytrclass4').removeClass("imagehighlight");
	$('#demontrclass1').removeClass("imagehighlight-1");	
	$('#demontrclass2').removeClass("imagehighlight-1");
	$('#demontrclass3').removeClass("imagehighlight-1");
	$('#demontrclass4').removeClass("imagehighlight-1");
	
	
	
	
		
	
	
	if($actualpower)
	{
		$actualpower.addClass("imagehighlight");
	}
		
}

function cleanPowersDemon ($actualpower) {
		
	
	$('#godlytrclass1').removeClass("imagehighlight");
	$('#godlytrclass2').removeClass("imagehighlight");
	$('#godlytrclass3').removeClass("imagehighlight");
	$('#godlytrclass4').removeClass("imagehighlight");
	$('#demontrclass1').removeClass("imagehighlight-1");	
	$('#demontrclass2').removeClass("imagehighlight-1");
	$('#demontrclass3').removeClass("imagehighlight-1");
	$('#demontrclass4').removeClass("imagehighlight-1");
	
	if($actualpower)
	{
		$actualpower.addClass("imagehighlight-1");
	}
		
		
		/*	if(!('#godlytrclass1').hasClass("imagehighlight"))
			{
				$('#godlypowerlabel1').css("opacity","0");
			}
			
			if(!('#godlytrclass2').hasClass("imagehighlight"))
			{
				$('#godlypowerlabel2').css("opacity","0");
			}
			
			if(!('#godlytrclass3').hasClass("imagehighlight"))
			{
				$('#godlypowerlabel3').css("opacity","0");
			}
			
			if(!('#godlytrclass4').hasClass("imagehighlight"))
			{
				$('#godlypowerlabel4').css("opacity","0");
			}
			
			if(!('#demontrclass1').hasClass("imagehighlight-1"))
			{
				$('#demonpowerlabel1').css("opacity","0");
			}*/

}

function cleanOmni () {
	
	if(godversusdemonpanel24 == 1)
	{
		$('#demonomnitrclass1').removeClass("imagehighlight-1");
		$('#demonomnitrclass2').removeClass("imagehighlight-1");
		$('#demonomnitrclass3').removeClass("imagehighlight-1");
		
	}
	
	else if(godversusdemonpanel24 == -1)
	{
		$('#godlyomnitrclass1').removeClass("imagehighlight");
		$('#godlyomnitrclass2').removeClass("imagehighlight");
		$('#godlyomnitrclass3').removeClass("imagehighlight");
		
		if(!$('#demonomnitrclass1').hasClass("imagehighlight-1")) c.pigeonholesVisible = false;
		if(!$('#demonomnitrclass2').hasClass("imagehighlight-1")) c.displayBoidIDs = false;
		if(!$('#demonomnitrclass3').hasClass("imagehighlight-1")) c.perceptionRangeVisible = false;
	}
	
	else
	{
		$('#demonomnitrclass1').removeClass("imagehighlight-1");
		$('#demonomnitrclass2').removeClass("imagehighlight-1");
		$('#demonomnitrclass3').removeClass("imagehighlight-1");
		
		$('#godlyomnitrclass1').removeClass("imagehighlight");
		$('#godlyomnitrclass2').removeClass("imagehighlight");
		$('#godlyomnitrclass3').removeClass("imagehighlight");

		
		initializeViewToFalse();
	}
	
}

function updateActivePower(iconname) {
	
	
	
	activepower = iconname;
	
	switch(iconname)
	{
		case "messiah":
			$("#mycanvas").css({'cursor': 'url(img/01_messiah_icon64.png) 20 20, pointer'});
		break;
		
		case "friendship":
			$("#mycanvas").css({'cursor': 'url(img/02_friendship_icon64.png) 20 20, pointer'});
		break;
		
		case "immaculate":
			$("#mycanvas").css({'cursor': 'url(img/03_immaculate_icon64.png) 20 20, pointer'});
		break;
		
		case "healblindness":
			$("#mycanvas").css({'cursor': 'url(img/04_healblindness_icon64.png) 20 20, pointer'});
		break; 
		
		case "outcast":
			$("#mycanvas").css({'cursor': 'url(img/05_outcast_icon64.png) 20 20, pointer'});
		break;
		
		case "blindness":
			$("#mycanvas").css({'cursor': 'url(img/06_blindness_icon64.png) 20 20, pointer'});
		break;
		
		case "suddendeath":
			$("#mycanvas").css({'cursor': 'url(img/07_suddendeath_icon64.png) 20 20, pointer'});
		break;
		
		case "sacrifice":
			$("#mycanvas").css({'cursor': 'url(img/08_sacrifice_icon64.png) 20 20, pointer'});
		break;
		
		
		
		default:
			activepower="none";
			$("#mycanvas").css({'cursor': 'url(img/demonhand_icon64.png) 20 20, pointer'});
		break;
			
	}
	
	
}

function executePower(e) {
	
	
	 var selectedboids="";	
     
      //alert(activepower);
      
	switch(activepower)
	{
		case "messiah":
			
			
			selectedboids = c.selectBoids(1,e.clientX - c.theCanvas.offsetLeft, e.clientY - c.theCanvas.offsetTop, 30);
			if(selectedboids.length>0)
			{	
				//c.pushToAddList({type:4,x: e.clientX - c.theCanvas.offsetLeft, y: e.clientY - c.theCanvas.offsetTop });
				for(i=0;i<selectedboids.length;i++)
				{
					c.pushToChangeList( {ball:selectedboids[i],  newType: 6 });
					c.pushToChangeBehaviourList( {ball:selectedboids[i],  newBehaviour: 3 });
				}
					
			}
			
			
			
		break;
		
		case "friendship":
			selectedboids = c.selectBoids(10,e.clientX - c.theCanvas.offsetLeft, e.clientY - c.theCanvas.offsetTop, 50);
			if(selectedboids.length>0)
			{	
				//c.pushToAddList({type:4,x: e.clientX - c.theCanvas.offsetLeft, y: e.clientY - c.theCanvas.offsetTop });
				for(i=0;i<selectedboids.length;i++)
				{
					c.pushToChangeList( {ball:selectedboids[i],  newType: 4 });
					c.pushToChangeBehaviourList( {ball:selectedboids[i],  newBehaviour: 1 });
				}
					
			}
		break;
		
		case "immaculate":
			selectedboids = c.selectBoids(1,e.clientX - c.theCanvas.offsetLeft, e.clientY - c.theCanvas.offsetTop, 30);
			if(selectedboids.length>0)
			{	
				c.pushToAddList({type:2,x: e.clientX - c.theCanvas.offsetLeft, y: e.clientY - c.theCanvas.offsetTop });
							
			}
		break;
		
		case "healblindness":
			selectedboids = c.selectBoids(1,e.clientX - c.theCanvas.offsetLeft, e.clientY - c.theCanvas.offsetTop, 30);
			if(selectedboids.length>0)
			{	
				//c.pushToAddList({type:4,x: e.clientX - c.theCanvas.offsetLeft, y: e.clientY - c.theCanvas.offsetTop });
				for(i=0;i<selectedboids.length;i++)
				{
					c.changePerceptionRange(selectedboids[i],30);
				}
					
			}
		break; 
		
		case "outcast":
			selectedboids = c.selectBoids(1,e.clientX - c.theCanvas.offsetLeft, e.clientY - c.theCanvas.offsetTop, 30);
			if(selectedboids.length>0)
			{	
				//c.pushToAddList({type:4,x: e.clientX - c.theCanvas.offsetLeft, y: e.clientY - c.theCanvas.offsetTop });
				for(i=0;i<selectedboids.length;i++)
				{
					c.pushToChangeList( {ball:selectedboids[i],  newType: 7 });
					c.pushToChangeBehaviourList( {ball:selectedboids[i],  newBehaviour: 2 });
					c.changePerceptionRange(selectedboids[i],25);
				}
					
			}
		break;
		
		case "blindness":
			selectedboids = c.selectBoids(10,e.clientX - c.theCanvas.offsetLeft, e.clientY - c.theCanvas.offsetTop, 30);
			if(selectedboids.length>0)
			{	
				//c.pushToAddList({type:4,x: e.clientX - c.theCanvas.offsetLeft, y: e.clientY - c.theCanvas.offsetTop });
				for(i=0;i<selectedboids.length;i++)
				{
					c.changePerceptionRange(selectedboids[i],20);
				}
					
			}
		break;
		
		case "suddendeath":
			selectedboids = c.selectBoids(1,e.clientX - c.theCanvas.offsetLeft, e.clientY - c.theCanvas.offsetTop, 20);
			if(selectedboids.length>0)
			{	
				c.pushToKillList(selectedboids[0]);
				
					
			}
		break;
		
		case "sacrifice":
			selectedboids = c.selectBoids(20,e.clientX - c.theCanvas.offsetLeft, e.clientY - c.theCanvas.offsetTop, 100);
			if(selectedboids.length>0)
			{	
				//c.pushToAddList({type:4,x: e.clientX - c.theCanvas.offsetLeft, y: e.clientY - c.theCanvas.offsetTop });
				for(i=0;i<selectedboids.length;i++)
				{
					c.pushToKillList(selectedboids[i]);
				}
					
			}
		break;
		
		
		
		default:
			activepower="none";
			break;
			
	}
}


function updateCanvasHighlight() {
	
	switch(godversusdemon) {
		
		case -2:
			$('#mycanvas').animate({boxShadow:'0px 0px 30px 0px rgba(255,162,0,0.5)'}, 200);
			break;
		case -1:
			$('#mycanvas').animate({boxShadow:'0px 0px 10px 0px rgba(255,162,0,0.5)'}, 200);
			break;
		case 1:
			//$("#mycanvas").css("box-shadow","0px 0px 10px 0px rgba(255,246,122,0.7)");
			$('#mycanvas').animate({boxShadow:'0px 0px 10px 0px rgba(255,246,122,0.7)'}, 200);
			break;
		case 2:
			//$("#mycanvas").css("box-shadow","0px 0px 30px 0px rgba(255,246,122,0.7)");
			$('#mycanvas').animate({boxShadow:'0px 0px 30px 0px rgba(255,246,122,0.7)'}, 200);
			break;
		default:
			
			$('#mycanvas').animate({boxShadow:'0px 0px 20px 0px rgba(204,255,204,0.8)'}, 200);

			//$("#mycanvas").css("box-shadow","0px 0px 5px 0px rgba(131,255,122,0.7)");
			break;
	}
	
	
}

function updateHand(value) {
	
	

	
		switch(value) 
		{
			case 1:
				$("#handfollowmouse+1").css("visibility","visible");
				$("#handfollowmouse0").css("visibility","hidden");
				$("#handfollowmouse-1").css("visibility","hidden");
				break;
			case -1:
				$("#handfollowmouse-1").css("visibility","visible");
				$("#handfollowmouse0").css("visibility","hidden");
				$("#handfollowmouse+1").css("visibility","hidden");
				break;
		
			default:
				$("#handfollowmouse0").css("visibility","visible");
				$("#handfollowmouse+1").css("visibility","hidden");
				$("#handfollowmouse-1").css("visibility","hidden");
				break;
		}
}


function initializeViewToFalse() {
		
	c.pigeonholesVisible = false;
	c.displayBoidIDs = false;
	c.perceptionRangeVisible = false;
	c.ruleVectorVisible = [false, false, false, false, false, false];
	c.setVisibiliyInteractionList(false);	

}
	

function calculateGodVersusDemon() {
	
	godversusdemon = godversusdemonpanel13 + godversusdemonpanel24; 
	
	updateCanvasHighlight();
}



function scaleAndDrawPaths(width,height) {
	
	
	 
	var paper = Raphael(0, 0, 10, 10);
	
	paper.setStart();
	
		 var LogoDrawLinePath0 = paper.path(Raphael.transformPath('M 410.2 322.7 C 410.9 322.5 412.9 322 414.9 321.9 C 416.7 321.4 418.6 322.6 420.1 321.5 C 420.8 321 421.7 319.1 422.7 320.1 C 423.3 320.6 422.7 321.7 423.2 322.3 C 423.1 321.6 422.8 320.1 421.8 320.3 C 422.5 320.9 422.9 321.8 423.5 322.5 C 423.5 321.7 423.5 321 423.5 320.3 C 423.5 320.9 423.5 321.6 423.5 322.3 C 423.2 321.7 423 321 423 320.3 C 422.9 321 422.7 321.8 422.3 322.5 C 421.9 322.2 421.9 321.5 421.5 321.1 C 421 321.5 421 322.1 421 322.7 C 421.1 321.7 421.1 320.7 421.1 319.7 C 421.3 320.1 421.2 321.2 421.4 321.9 C 421.3 321.3 421.2 320.7 421.3 320.1 C 421.6 320.2 422 320.3 422.3 320.4 C 422.2 322 422.9 323.5 422.7 325.1 C 422.4 327 420.6 327.9 420.9 329.9 C 421.7 330 422.2 329.7 423 329.5 C 423.7 329.3 424.4 329.4 425.2 329.2 C 425.8 329.1 426.2 328.6 426.9 328.6 C 427.3 328.6 427.6 329 428.1 329 C 428.9 329.1 429.7 328.8 430.5 328.7 C 431.8 328.5 432.6 328.9 433.8 329.1 C 435 329.3 435.7 328.9 436.8 328.5 C 439.7 327.5 440.3 329.8 442.4 330.8 C 443.7 329.2 440.3 328.2 439.2 328.2 C 437.4 328.3 433.7 329.1 432.2 328.1 C 433.1 328.2 433.9 327.7 434.9 328 C 436 328.2 437.7 328.8 438.7 329.4 C 437.1 328.9 435.3 328.6 433.6 328.5 C 432.5 328.4 431.4 328.4 430.3 328.5 C 429 328.6 427.5 329.1 426.2 328.8 C 426.6 330.6 428.5 328.7 429.5 328.9 C 429 329.2 427.9 329.3 427.1 329.5 C 425.9 329.8 424.3 331 423 330.7 C 423.9 330.3 426.7 330 427 329.3 C 425.4 329.2 423.7 329.7 422 329.5 C 422.2 329.6 422.7 329.8 422.7 329.8 C 422.8 328.7 421.3 328.3 420.6 328.9 C 421.2 329.5 422.6 328.6 423.5 328.8 C 423.6 330.8 420 330.8 421 328.5 C 421.2 330.2 422 330 423.5 329.4 C 424.9 328.8 425.8 328.4 427.4 328.3 C 429.9 328 430.6 328.3 431.2 330.7 C 431.8 333.2 431.5 335.6 430.9 338.1 C 431 335.8 430.4 333.5 430.4 331.1 C 430.8 334.1 430 339 432.1 341.5 C 433.7 343.5 436.5 343.1 438.5 342.2 C 439.7 341.7 440.8 341 441.2 339.8 C 441.8 338.3 442.2 336.1 442.2 334.5 C 442.1 333.3 442.4 331.1 441.5 330.2 C 439.8 328.5 437.2 331.1 435.3 329.9 C 436.4 330.1 437.8 329.2 438.9 328.9 C 439.7 328.7 440.7 328.7 441.2 328.2 C 441.3 330.1 441.1 336.4 442.5 337.4 C 442.7 334.5 442.9 331.4 442.8 328.5 C 442.8 332.7 441.3 336.9 441.3 341.1 C 441.3 339.2 441.5 336.8 442.4 335 C 442.7 338.2 440.6 341.5 438.4 343.6 C 439 342.9 441.1 342.5 440.6 343.9 C 440.2 344.7 437.3 345.1 436.6 344.7 C 437.4 343.8 438.9 343.1 440 343.6 C 439.3 343.9 438.1 344.1 437.2 344.2 C 437.9 343.9 438.6 343.4 439.3 343.1 C 438.4 343.1 437 343.4 436.4 344.2 C 437.6 343.4 438.9 341.9 440.5 342.4 C 438.9 342.5 436.2 344.8 435 343.8 C 435.6 343.5 436.7 343.4 437.6 343.2 C 436.6 344.6 434.8 345 433.3 344.1 C 434.1 343.9 435 344.4 435.6 344.8 C 434.4 344.6 433.4 342.9 433 341.8 C 434 342.6 435 343.3 435.7 344.3 C 434.8 343.3 433.5 342.8 432.8 341.7 C 433.3 342.6 434 343.4 434.7 344.2 C 433.8 343.7 432.9 342.9 432 342.5 C 432.3 343.2 433.2 343.5 433.9 343.8 C 432.9 343.8 431.9 343.2 431.4 342.4 C 432 342.7 433 343.2 432.9 344 C 432.1 343.8 431.9 342.5 432.2 341.9 C 432.4 342.2 432.6 342.7 432.6 343.1 C 432.2 341.5 431.7 339.5 431.2 337.7 C 431.2 338.3 431.4 338.9 431.7 339.5 C 431.8 338 431.8 336.5 431.6 335 C 431.3 333.7 430.9 332.6 431.7 331.4 C 431.4 332.2 431.5 333.8 431.7 334.7 C 431.7 333.4 431.9 331.5 431.9 330.1 C 431.8 332.4 430.8 334.6 431.5 336.9 C 431 333.8 430.2 329.3 434.6 329.1 C 437 329 439.8 328.2 442.3 328.4 C 442.1 331.2 442.3 334.2 442.3 337.1 C 442.3 335.4 442.6 333.8 442.7 332.2 C 442.2 334.4 442.6 337.1 442.5 339.4 C 442.2 337.9 442.7 336.4 442.3 334.9 C 440.8 336.4 441.1 339 441.1 340.9 C 441.1 339.1 441 336.7 441 334.6 C 441.2 336.5 441.9 338.4 441.9 340.2 C 440.9 337.8 442.6 334.3 441.7 331.7 C 441.1 333.8 442 336.5 441.9 338.8 C 441.9 336.1 442.6 333 442.3 330.3 C 441.7 331.6 441.7 333.8 442.1 335.1 C 442.9 333.4 442.7 331 443.1 329.2 C 442.7 330.4 443.2 331.7 443.1 333 C 442 331.7 442.1 329.2 442 327.6 C 442.3 328.2 442.5 329 442.2 329.6 C 441.9 329.6 440.8 328.8 440.7 328.9 C 440 329 440.4 330.4 439.6 330.6 C 439.4 330 439.4 329.3 439 328.9 C 438.5 329.3 438.6 330 438.2 330.4 C 438.1 329.8 438.1 329 438.1 328.4 C 437.5 328.8 437.5 329.6 437.3 330.3 C 437.1 329.7 437 328.8 437.1 328.1 C 436.7 328.6 436.5 329.2 436.4 329.8 C 436.2 329.4 436.1 328.9 435.9 328.5 C 435.8 329 435.7 329.6 435.5 330.2 C 435.5 329.7 435.5 329.2 435.4 328.7 C 435.1 329.2 435 329.8 434.9 330.3 C 434.8 329.6 434.7 329 434.6 328.4 C 434.4 328.9 434.3 329.6 434.1 330.1 C 433.9 329.6 433.8 329 433.7 328.4 C 433.3 328.7 433.2 329.3 433.1 329.9 C 433.1 329 432.5 328.8 432 329.4 C 432 328.1 433.9 326.8 434.3 325.5 C 434.8 323.9 435 322.2 435.5 320.6 C 435.1 320.4 434.7 320.3 434.2 320.2 C 435.1 320.3 436 320.6 436.3 321.5 C 436.3 321 436.3 320.6 436.1 320.2 C 435.8 320.8 436 321.5 435.8 322.2 C 435.6 321.8 435.5 321.2 435.3 320.9 C 435.2 321.5 435.3 322.2 435.1 322.7 C 434.6 322 434.2 321.2 434.1 320.4 C 434.3 321.1 434.6 321.8 434.7 322.4 C 434.6 321.8 434.4 321.1 434.4 320.5 C 434.5 321 434.5 321.9 434.5 322.4 C 434.6 321.7 434.7 321 434.9 320.4 C 435.1 321.5 436 322.9 437.3 321.9 C 438.5 321.2 437.8 319.8 437.9 318.7 C 437.9 317.6 438.4 316.5 438.7 315.4 C 438.9 314.5 439.4 312.9 439.9 312.2 C 439.4 311.7 438.5 311.6 437.9 311.9 C 437.4 312.1 435.9 314.8 435.3 313.6 C 434.7 312.4 436.3 312.7 436.7 312.5 C 437.5 312.2 437.8 311.4 438.5 310.8 C 438 311.4 433.5 313.1 435.5 314 C 435.3 313.9 435.1 313.7 434.8 313.5 C 435 313.8 435.1 313.8 435.3 314 C 435.6 313.1 437 312 438.2 312 C 440 312.1 439.5 314.4 440.1 315.5 C 440.1 314.6 440.2 313 439.5 312.3 C 439.6 313.1 439.9 314.2 439.4 315 C 439.2 314.7 439 314.6 438.9 314.2 C 439.1 314.5 439.4 314.9 439.6 315.3 C 440.3 314.7 440.1 312.9 439.3 312.4 C 440 313.2 439.9 314.4 440.1 315.4 C 441 314.5 439.6 314.5 439.4 314.2 C 438.9 313.4 438.8 311.6 439.6 310.9 C 439.8 311.4 439.5 311.9 439 312.3 C 438 311.6 436.7 310.4 435.7 309.5 C 436.5 309.9 437.4 310.8 437.9 311.6 C 436.9 310.8 436.2 309 434.8 309 C 435.4 309.1 435.9 309.5 436.2 310.1 C 436.1 310 436.1 309.9 436 309.8 C 435.7 309.9 435.2 309.9 434.9 310 C 434.7 309.5 434.3 309 434.4 308.4 C 435 308.1 436.5 308.2 437.1 308.6 C 438 309.3 437.7 310.4 439 310.8 C 439.3 310 438.5 309.1 438.7 308.2 C 439 308.3 439.5 308.3 439.8 308.5 C 439.5 308.2 439.3 307.8 439 307.6 C 439.2 307.7 439.6 307.7 439.9 307.8 C 439.9 307.4 439.5 307.1 439.1 306.9 C 439.5 306.8 439.7 306.7 440.2 306.8 C 439.9 306.7 439.7 306.6 439.4 306.4 C 441.3 307.1 439.2 309 439.7 310.2 C 440 309.3 440.3 308.2 440.2 307.2 C 439.4 307.4 439.2 310 438.5 310.8 C 438.6 309.7 439.5 308.7 439.4 307.6 C 438.8 308.5 438.3 309.7 438.1 310.7 C 438.9 310.8 440.1 310.7 440.4 311.6 C 441.4 310.1 444.4 310.6 446.2 311.1 C 447.4 311.4 448.4 312 449.5 312.5 C 450.8 313.1 451.5 314.1 452.7 314.8 C 455 315.9 457.5 315.7 459.9 316.1 C 461.5 316.4 462.9 317.3 464.4 317.6 C 467.4 318.3 471 317.3 474.1 317.2 C 477.2 317.1 480.3 317.5 483.4 317.4 C 486.4 317.2 489.4 316.8 492.4 315.8 C 493.8 315.3 495.2 314.6 496.7 314.5 C 497.9 314.4 499 314.8 500.2 314.9 C 503.4 315.4 506.6 314.6 509.8 314.5 C 512.7 314.4 515.5 314.5 518.4 314.1 C 521 313.8 523.4 314.5 526 314.4 C 528.7 314.3 531.1 313.5 533.7 313.1 C 536.2 312.6 538.5 312.6 541 312.7 C 542.3 312.7 543.7 313.3 544.9 313.1 C 546.3 312.9 547.1 312.4 548.6 312.7 C 550.8 313.1 553 313.5 555.2 313.6 C 559.2 313.7 563 313 567 313.8 C 568.8 314.3 831.8 314.2 833.6 314.7 C 834.8 315 835.8 316 836.8 315.8 L 836.6 315.6 C 835 314.9 568.4 313.9 566.6 313.7 C 561.9 313.2 557.3 314.4 552.7 313.7 C 549.8 313.2 547.9 312.3 544.9 313.1 C 541.6 313.9 539 314.6 535.6 314.8 C 532.1 314.9 528.6 315.3 525.1 315 C 521.7 314.7 518.9 315.2 515.7 314.4 C 513.8 313.9 511.5 313.6 509.6 313.4 C 507.7 313.2 505.6 313.5 503.7 313.9 C 500.6 314.7 498.2 315 495 314.9 C 493.2 314.9 491.6 315.6 489.7 315.5 C 487.9 315.5 486.4 315.6 484.6 315.8 C 481.5 316.3 478.6 317.5 475.4 318.2 C 472.9 318.8 470.5 319.6 467.9 320.2 C 464.7 320.8 461.6 319.9 458.6 318.7 C 456.7 317.9 455.2 317.2 453.5 316.1 C 452.9 315.7 452.2 315.5 451.6 315.1 C 450.8 314.4 450.2 313.4 449.4 312.7 C 449 312.4 448.7 312.1 448.3 311.9 C 447.8 311.6 447.2 311.6 446.7 311.5 C 446.1 311.3 445.6 311.1 445 310.9 C 444.4 310.8 443.9 310.6 443.3 310.6 C 442.9 310.7 442.6 310.8 442.2 310.7 C 441.7 310.6 441.1 310.5 440.6 310.5 C 440.3 310.6 440.1 310.6 439.8 310.7 C 439.7 310.7 439.5 310.8 439.3 310.8 C 438.9 310.9 438.8 310.9 438.6 311.2 C 438.3 311.6 438 312.1 437.6 312.3 C 437.3 312.5 437.1 312.6 436.9 312.9 C 436.7 313.2 436.4 313.6 436 313.8 C 436.2 313.4 436.5 313.1 436.8 312.7 C 436.9 312.5 437.2 312.3 437.2 312 C 437 312.1 436.7 312.3 436.5 312.4 C 436.3 312.6 436 312.8 435.8 312.9 C 435.4 313.2 434.5 314.1 434.2 313.4 C 434.1 313.1 434.4 312.9 434.7 312.7 C 435 312.6 435.2 312.5 435.5 312.3 C 435.8 311.9 436.2 311.7 436.6 311.5 C 437 311.3 437.6 310.9 437.9 311.2 C 437.9 311.3 437.9 311.5 438 311.6 C 438 311.8 438.1 311.9 438.2 312 C 438.3 312.3 438.1 312.4 437.9 312.6 C 437.4 313 437.1 313.5 436.6 313.8 C 436.3 314 436.1 314.1 435.9 314.3 C 435.7 314.6 435.6 314.9 435.2 315.1 C 435.1 314.7 435 314.5 434.8 314.2 C 434.5 313.8 434.2 313.5 433.9 313.2 C 433.9 313.2 433.9 313.3 433.9 313.4 C 433.9 313.4 434 313.4 434 313.4 C 434.1 313.4 434.3 313.2 434.4 313.1 C 434.5 313.1 434.6 313.2 434.7 313.3 C 435 313.3 435.1 313.1 435.3 313 C 435.4 312.9 435.6 312.9 435.7 312.7 C 436 312.4 436.3 312.3 436.7 312.2 C 437.1 312.2 437.5 312.6 437.8 312.3 C 438 312.1 438 311.4 438 311.1 C 438 310.9 438.1 310.5 437.9 310.4 C 437.9 310.2 437.6 310.2 437.5 310.1 C 437.3 310 437.1 309.8 436.9 309.6 C 436.7 309.4 436.4 309.2 436.1 309.1 C 435.6 308.9 435.3 308.8 434.8 308.7 C 434.5 308.7 434.3 308.8 434.1 308.9 C 434.2 309.5 434.8 309.8 435.3 310.1 C 435.9 310.3 436.3 310.7 436.8 310.9 C 437.1 311.1 437.7 311.4 438 311.2 C 438.5 310.8 438.1 310 437.8 309.6 C 437.7 309.3 437.4 309.3 437.2 309.1 C 437 308.8 436.9 308.6 436.6 308.3 C 436.3 308.1 436.1 307.9 435.9 307.6 C 435.7 307.5 435.5 307.4 435.3 307.3 C 435.2 307.5 435 307.7 434.9 307.9 C 434.7 308.3 434.3 308.7 434 309.1 C 434.4 308.7 434.6 308.3 434.9 307.9 C 435 307.7 435.2 307.3 435.4 307.5 C 435.5 307.5 435.6 307.7 435.7 307.9 C 435.9 308.2 436.3 308.6 436.6 308.8 C 437.1 309 437.7 309.2 438 309.6 C 438.2 309.9 438.1 310.1 438.3 310.3 C 438.4 310.4 438.6 310.4 438.7 310.4 C 439 310.5 439 310.5 439.2 310.8 C 439.2 310.9 439.3 311.1 439.4 311.3 C 439.5 311.2 439.5 311.2 439.5 311.1 C 439.6 311 439.7 310.6 439.8 310.4 C 439.9 310.3 440 310.1 440.1 309.9 C 440.1 309.6 440.3 309.3 440.3 309.1 C 440.4 308.6 440.5 308.2 440.7 307.8 C 440.8 307.6 441 307.3 441.1 307.1 C 441.3 306.6 440.8 306.6 440.4 306.4 C 440.2 306.4 440.1 306.3 439.9 306.2 C 439.7 306.2 439.6 306.2 439.5 306.2 C 439.4 306.1 439.2 306 439.1 306 C 439.1 306.2 439 306.4 438.9 306.5 C 438.8 306.8 438.8 307.1 438.7 307.4 C 438.5 308.1 438.1 309 438.2 309.7 C 438.3 309.7 438.3 309.5 438.3 309.4 C 438.2 309.6 438.2 309.8 438.2 310 C 438.3 309.8 438.3 309.5 438.5 309.3 C 438.6 309.5 438.3 310 438.5 310.1 C 438.6 309.9 438.7 309.7 438.8 309.6 C 438.7 309.7 438.6 309.8 438.6 310 C 438.6 310.1 438.6 310.2 438.6 310.3 C 438.5 310.5 438.3 310.6 438.2 310.8 C 438.3 310.9 438.4 310.9 438.5 311 C 438.5 310.9 438.5 310.9 438.5 310.9 C 438.6 311 438.7 311.3 438.7 311.5 C 438.6 311.2 438.8 311 438.8 310.7 C 438.8 310.7 438.7 310.7 438.7 310.7 C 438.7 310.7 438.7 310.8 438.7 310.7 C 438.7 310.8 438.6 310.8 438.5 310.7 C 438.5 310.8 438.5 311 438.5 311.1 C 438.4 310.9 438.5 310.8 438.7 310.7 C 438.7 310.8 438.6 311.1 438.4 311.2 C 438.5 311.2 438.5 311.2 438.5 311.2 C 438.6 311 438.7 310.8 438.7 310.5 C 438.7 310.4 438.7 310.3 438.8 310.1 C 438.8 310.2 438.9 310.3 439 310.3 C 438.8 310.6 438.7 310.8 439.1 311 C 439.3 311 439.5 311.1 439.7 311.2 C 439.9 311.3 439.9 311.5 440.1 311.6 C 440.6 311.8 442.9 311.8 442.8 310.9 C 442.5 311.2 442.2 311.6 441.8 311.8 C 441.4 312 440.7 311.5 440.8 311 C 440.9 310.7 441.4 310.7 441.6 310.7 C 441.9 310.6 442.2 310.5 442.5 310.4 C 442.7 310.3 443 310.3 443.1 310.1 C 442.9 310.1 442.7 310.1 442.5 310.1 C 442.3 310 442.2 310 442 310 C 441.8 310 441.5 310 441.3 310.1 C 440.8 310.1 440.3 310.5 439.8 310.4 C 440 310.3 440.2 310.3 440.3 310.2 C 440.6 310.2 440.9 310.1 441.2 310.2 C 441 310.3 440.6 310.4 440.3 310.4 C 440.5 310.3 440.9 310.4 441.2 310.4 C 441.5 310.4 441.8 310.4 442.1 310.4 C 442.4 310.3 442.6 310.4 442.9 310.3 C 443.1 310.3 443.3 310.2 443.6 310.2 C 443.6 310.4 443.6 310.8 443.6 311.1 C 443.6 311.5 443.5 312.1 443.5 312.6 C 443.5 312.1 443.6 311.6 443.6 311.2 C 443.6 310.9 443.7 310.4 443.6 310.1 C 443.4 310.4 443.4 310.7 443.4 311 C 443.4 311.4 443.6 311.9 443.5 312.3 C 443.4 312.2 442.5 312.1 442.3 312.2 C 442.6 312.2 443.1 312.2 443.4 312.1 C 443.2 312.2 442.7 312.1 442.5 312.1 C 442.2 312.1 441.9 312.1 441.6 312.1 C 441.3 312.1 441 312.1 440.7 312.1 C 440.4 312.1 440.1 311.9 439.8 311.9 C 439.9 312.2 440 312.5 440.1 312.8 C 440.3 313.2 440.5 313.7 440.8 314.1 C 440.7 313.7 440.6 313.3 440.3 313 C 440.1 312.6 440.1 312.2 439.8 311.9 C 439.9 312.2 440.2 312.5 440.3 312.7 C 440.5 313.2 440.6 313.8 440.7 314.2 C 440.8 314.5 440.8 314.8 440.9 315 C 441 315.2 441.2 315.4 441.1 315.5 C 440.9 315.8 440.2 315.9 439.9 316.1 C 440.2 315.9 440.6 315.7 440.8 315.5 C 440.7 315.6 440.5 315.6 440.4 315.6 C 440.2 315.7 440.1 315.8 440 315.9 C 439.9 316 439.3 316.3 439.1 316.3 C 439 316.2 438.8 315.5 438.8 315.4 C 438.7 314.9 438.6 314.4 438.5 313.9 C 438.4 314.1 438.6 314.3 438.7 314.4 C 438.8 314.7 438.8 314.9 438.9 315.2 C 438.7 314.7 438.6 314.2 438.5 313.8 C 438.3 313.3 438.1 312.6 438.3 312.2 C 438.2 312.3 438.3 312.5 438.3 312.7 C 438.4 312.5 438.4 312.4 438.4 312.2 C 438.5 312.5 438.4 312.9 438.6 313.2 C 438.6 312.7 438.6 312.3 438.6 311.8 C 438.9 312.2 438.9 312.9 439 313.4 C 439.1 314.4 438.4 315.5 438.2 316.4 C 438.1 316.8 438.1 317.1 438.1 317.5 C 438.2 318 438 318.4 438 318.8 C 438 319.2 438 319.7 437.9 320.1 C 437.9 320.4 438 320.8 437.8 321.1 C 437.7 321.4 437.3 321.7 437.1 321.9 C 436.9 322.2 436.5 322.7 436.1 322.9 C 435.6 323.1 436.1 322.4 436.1 322.1 C 436.1 321.8 436 321.5 436 321.2 C 435.9 321 436 320.8 435.9 320.7 C 435.9 320.7 436 320.7 436 320.7 C 436 320.8 435.9 320.9 435.9 321 C 435.8 321.5 435.5 321.9 435.7 322.4 C 435.8 322.5 436 322.9 436.2 322.7 C 436.7 322.3 435.3 321.3 435.2 321.1 C 435 320.9 435.2 320.7 435.3 320.6 C 435.5 320.4 435.8 320.1 436 320.1 C 436.3 320.1 436.1 320.6 436 320.8 C 435.7 321.3 435.1 321.6 434.7 322 C 434.5 322.1 433.6 323 433.8 322.2 C 433.9 321.7 434.2 321.3 434.6 321 C 434.8 320.9 435.1 320.8 435.3 320.7 C 435.4 320.6 435.6 320.4 435.8 320.4 C 436 320.3 435.9 320.4 436.1 320.5 C 436.1 320.6 436.2 320.6 436.3 320.7 C 436.6 320.9 436.7 321.6 436.8 322 C 436.8 322.3 436.9 322.5 436.9 322.8 C 436.6 322.7 436.3 322.8 436 322.8 C 435.6 322.8 435.2 322.8 434.7 322.9 C 434.5 323 434.1 323.1 434 322.8 C 433.9 322.7 433.9 322.4 434 322.2 C 434 321.8 434 321.5 434 321.1 C 433.9 320.8 433.8 320.3 434 320 C 434.1 319.7 434.5 319.8 434.7 319.8 C 435 319.8 435.4 319.9 435.7 319.9 C 436.1 319.9 436.5 320 436.8 319.9 C 436.8 320 436.8 320.2 436.8 320.4 C 436.7 320.6 436.7 320.9 436.7 321.1 C 436.8 321.4 436.8 321.6 436.8 321.9 C 436.8 322 436.9 322.3 436.8 322.4 C 436.8 322.5 436.7 322.6 436.6 322.6 C 436.1 322.6 435.8 322.6 435.3 322.6 C 434.8 322.7 434.3 322.7 433.8 322.8 C 433.7 321.8 434.1 320.8 434 319.8 C 434 320.2 434.1 320.8 434.2 321.2 C 434.2 321 434.1 320.9 434.1 320.7 C 434.1 320.5 434.1 320.2 434.1 319.9 C 434.1 320.4 434.1 320.8 434.1 321.2 C 434.1 321.5 433.9 321.9 434 322.3 C 434.1 322.5 434.1 322.6 434.1 322.9 C 434 323.2 434.2 323.3 434.3 323.5 C 434.5 323.8 434.4 324.2 434.3 324.4 C 434 325.5 433.5 326.5 433.4 327.6 C 433.3 328.3 433.7 328.7 434.3 329.1 C 434.7 329.4 435.3 329.5 435.8 329.6 C 436.6 329.7 437.4 329.7 438.1 329.7 C 439.2 329.7 440.4 329.6 441.4 329.2 C 441.1 329.3 440.8 329.2 440.5 329.2 C 440 329.2 439.5 329.3 438.9 329.3 C 438.4 329.3 437.9 329.3 437.4 329.3 C 436.8 329.3 436.3 329.2 435.8 329.2 C 435.4 329.1 435 329 434.5 328.9 C 434.1 328.9 433.6 328.7 433.2 328.8 C 432.7 329 432.1 329.4 431.8 329.8 C 431.6 330 431.6 330.3 431.5 330.5 C 431.3 330.9 431.1 331.2 431 331.6 C 430.9 332 430.8 332.4 430.8 332.8 C 430.5 334 430.5 335.2 430.6 336.4 C 430.7 337.8 430.9 339.1 432 340.1 C 432.5 340.6 433 341.1 433.6 341.5 C 434.1 341.8 434.6 342.3 435.3 342.4 C 435.9 342.5 436.6 342.2 437.2 342.2 C 437.6 342.1 438 342 438.4 341.8 C 438.8 341.7 439.1 341.4 439.4 341.1 C 439.7 340.9 440.1 340.6 440.2 340.3 C 440.4 339.8 440.4 339.3 440.6 338.8 C 440.7 338.4 440.8 338 440.9 337.6 C 440.9 337.3 440.8 337 440.8 336.7 C 440.9 336.1 441.1 335.5 441.2 334.9 C 441.3 334.1 441.3 333.3 441.3 332.5 C 441.4 331.5 441.5 330.5 441.5 329.5 C 441.4 329 441.2 328.4 441.4 328 C 441.7 328.3 441.8 329.1 441.3 329.3 C 441.1 329.4 440.8 329.2 440.6 329.1 C 440.2 329 439.9 328.9 439.5 329 C 439.2 329 438.7 329.1 438.5 329.4 C 438.3 329.6 438.4 329.7 438.6 329.7 C 439.1 329.8 439.7 329.6 440.2 329.5 C 440.5 329.5 440.7 329.4 441 329.4 C 440 328.2 438 328.3 436.5 328.1 C 435.4 327.9 434.3 327.7 433.2 327.7 C 432.3 327.8 431.5 327.9 430.6 328 C 430.8 328.1 431 328.1 431.1 328.1 C 431.6 328.1 432 328.2 432.4 328.3 C 433.5 328.5 434.6 328.8 435.8 329 C 436.3 329 436.8 329.1 437.4 329.2 C 437.7 329.2 438 329.2 438.3 329.4 C 438.8 329.7 438.2 329.6 437.9 329.6 C 437 329.5 436 329.4 435 329.3 C 433.5 329 432 329 430.4 328.9 C 428.7 328.7 427.1 328.6 425.4 328.7 C 424.5 328.7 423.6 328.8 422.8 329 C 423.1 329.1 423.4 329 423.7 329 C 424.2 329 424.7 329 425.3 329.1 C 426.5 329.1 427.7 329.4 429 329.5 C 430.1 329.7 431.3 329.9 432.4 330 C 432.9 330 433.5 329.9 434 330.1 C 433.9 330.3 433.2 330.3 433 330.3 C 432.3 330.4 431.5 330.4 430.7 330.5 C 430 330.5 429.3 330.4 428.6 330.4 C 428.4 330.5 428 330.4 427.9 330.6 C 428.2 330.7 428.7 330.6 429.1 330.6 C 429.7 330.5 430.3 330.4 430.8 330.3 C 431.7 330.3 432.5 330.6 433.3 330.6 C 434.4 330.6 435.5 330.4 436.6 330.3 C 437.1 330.3 437.7 330.2 438.3 330.1 C 438.5 330 438.8 329.9 439 329.9 C 438.4 330.1 437.6 330.1 437 330.2 C 436.2 330.3 435.4 330.5 434.7 330.4 C 433.8 330.3 432.8 330.3 431.9 330.4 C 431.4 330.5 430.6 330.7 430.1 330.4 C 430.9 330.3 431.6 330.3 432.4 330.3 C 433.7 330.2 435.1 330.1 436.4 330.3 C 437.7 330.5 438.9 330.4 440.1 330.4 C 440.5 330.4 440.8 330.5 441.2 330.5 C 441.4 330.6 441.5 330.5 441.6 330.6 C 441.4 331 440.9 331.1 440.4 331.2 C 439.4 331.3 438.3 330.9 437.3 330.7 C 436.4 330.6 435.6 330.6 434.7 330.4 C 433.8 330.3 432.9 330.1 432 330 C 430.7 329.8 429.4 329.9 428.2 329.4 C 429 329.4 429.8 329.4 430.6 329.4 C 431.8 329.4 432.9 329.5 434.1 329.7 C 435.4 329.9 436.6 330.1 437.9 330.1 C 438.7 330.2 439.5 330.1 440.2 330.3 C 438 330.3 435.9 330 433.8 329.8 C 432.5 329.6 431.2 329.6 429.9 329.5 C 429.1 329.4 428.3 329.2 427.4 329.2 C 428.1 329.4 429 329.1 429.7 329.1 C 431 329.1 432.2 329 433.5 329 C 435.6 329.1 437.6 329.6 439.8 329.3 C 439.4 329.1 438.9 329.3 438.5 329.4 C 437.9 329.5 437.3 329.6 436.7 329.5 C 436 329.4 435.5 329.2 434.8 329 C 434 328.7 433.2 328.7 432.3 328.6 C 431.2 328.5 430.2 328.5 429.1 328.3 C 428.1 328.2 427 328.1 426 328.1 C 425 328 424 328.2 423 328.1 C 422.7 328 422.3 328 422 327.9 C 422.9 327.8 423.9 327.8 424.8 327.8 C 425.8 327.9 426.8 327.9 427.8 327.8 C 428.5 327.6 429.4 327.7 430.1 327.8 C 431 327.9 431.9 327.9 432.7 327.9 C 434.1 327.8 435.5 328 436.9 328 C 437.6 328 438.2 328 438.8 328.1 C 439.4 328.1 440 328.1 440.6 328.3 C 440.9 328.4 441.3 328.4 441.5 328.6 C 441.7 328.7 441.9 328.9 442 329 C 442.6 329.6 442.7 330.1 442.8 330.9 C 442.9 331.4 442.9 332.2 443.2 332.6 C 443.2 331.7 443.1 330.8 443.1 329.9 C 443.1 329.2 443.1 328.5 443.1 327.9 C 443.1 327.9 443.1 328 443.1 328.1 C 443 328 442.9 327.9 443 327.8 C 443 327.8 443 327.8 443 327.8 C 442.9 327.9 442.8 328 442.6 328 C 442.4 327.9 442.2 327.8 442 327.8 C 441.8 327.7 441.6 327.8 441.4 327.8 C 441.6 327.9 441.9 327.8 442.2 327.8 C 441.9 327.9 441.3 327.8 441.1 328 C 441.4 328.1 441.8 328 442.1 328 C 441.6 328 441 328.3 440.5 328.4 C 440.5 328.7 440.7 328.9 440.9 329 C 441.1 329.3 441.3 329.5 441.6 329.7 C 442.1 330.1 442.3 330.5 442.1 331.1 C 441.8 331.7 441.7 332.3 441.7 332.9 C 441.6 333.4 441.7 334 441.5 334.5 C 441.2 335.7 441 336.8 440.7 337.9 C 440.6 338.5 440.4 339.1 440.5 339.6 C 440.4 339.1 440.7 338.4 440.7 337.8 C 440.7 337.4 440.6 337 440.6 336.7 C 440.6 336.3 440.5 336 440.5 335.7 C 440.5 335.4 440.5 335.1 440.5 334.8 C 440.5 334.1 440.7 333.3 440.7 332.5 C 440.7 331.9 440.7 331.3 440.7 330.6 C 440.7 331.1 440.9 331.6 440.8 332 C 440.8 331.8 440.8 331.4 440.9 331.1 C 440.9 330.9 440.9 330.6 441 330.3 C 441.3 330.5 441.3 331.1 441.3 331.4 C 441.3 331.9 441.3 332.8 441.5 333.2 C 441.5 333 441.6 332.9 441.6 332.7 C 442 333 441.8 333.6 441.8 334 C 441.8 334.8 441.8 335.6 441.6 336.4 C 441.6 336.6 441.5 336.9 441.5 337.1 C 442.1 335.4 442.9 333.7 443.1 331.8 C 442.7 333 442.8 334.3 442.9 335.6 C 442.9 336.2 443 336.8 443 337.3 C 443.1 338 442.9 338.6 442.9 339.3 C 442.6 339.1 442.9 337.7 443 337.4 C 443 337.7 442.9 338.1 442.9 338.5 C 442.9 338.7 442.9 339 442.7 339.2 C 442.4 338.8 442.7 337.8 442.6 337.4 C 442.4 337.7 442.5 338.4 442.4 338.8 C 442.4 339.2 442.5 339.5 442.5 339.9 C 442.3 339.5 442.3 338.8 442.4 338.4 C 442.4 338.9 442.3 339.4 442.2 339.9 C 442.1 340.2 442 341 441.7 341 C 441.4 340.5 442 339.8 441.9 339.2 C 441.5 339.4 441.4 340.3 441.3 340.7 C 441.2 341.1 441 341.5 440.9 342 C 441.1 341.4 441.3 340.8 441.5 340.3 C 441.7 340 442 339.5 441.9 339.2 C 441.5 339.1 441 340.3 440.9 340.6 C 440.7 341 440.5 341.4 440.3 341.8 C 440.3 341.9 440.2 342.1 440.1 342.2 C 440.3 341.6 440.5 341.1 440.7 340.5 C 440.8 340.2 441.2 339.5 441 339.2 C 440.6 339.4 440.5 340.2 440.2 340.6 C 440.1 340.8 440 341.2 439.7 341.3 C 439.7 340.9 440.1 340.5 440.2 340.2 C 440.3 339.9 440.5 339.6 440.6 339.3 C 440.5 339.7 440.2 340.2 440 340.6 C 440.3 340.3 440.5 339.9 440.8 339.7 C 440.7 340 440.4 340.7 440.1 340.9 C 440.2 340.5 440.6 340.1 440.8 339.8 C 440.7 340.3 440.3 340.8 440 341.2 C 439.8 341.5 439.5 341.9 439.2 342.1 C 439.3 341.6 439.9 341.1 440.2 340.6 C 440 340.8 439.8 341 439.6 341.1 C 439.8 341.3 439.1 341.6 439 341.6 C 439 341.5 439 341.5 439.1 341.5 C 438.9 341.6 438.6 341.7 438.4 341.8 C 438.4 341.8 438.5 341.8 438.6 341.9 C 438.3 342.1 437.7 342 437.4 342 C 437.1 342 436 342 435.9 342.3 C 435.8 342.7 436.9 342.5 437 342.5 C 437.4 342.4 438.2 342.3 438.4 341.9 C 438.3 341.8 438.1 341.9 437.9 341.9 C 437.6 341.9 437.2 341.9 436.8 341.9 C 436.6 342 435.7 342 435.5 342.2 C 435.7 342.4 436.3 342.5 436.5 342.6 C 436.9 342.7 437.3 343 437.7 342.9 C 437.4 342.8 437.1 342.8 436.9 342.8 C 436.4 342.6 436 342.5 435.5 342.3 C 434.9 342 434.3 341.7 433.7 341.4 C 433.9 341.4 434 341.6 434.2 341.7 C 434.4 341.9 434.6 342 434.8 342.1 C 434.5 341.8 434.1 341.6 433.9 341.3 C 433.6 340.9 433.4 340.4 433.3 340 C 433.5 340.3 433.6 340.7 433.8 341 C 434 341.1 434.2 341.2 434.4 341.4 C 434.6 341.6 434.8 341.9 434.9 342.2 C 435.2 342.6 435.6 342.8 435.9 343.2 C 436.1 343.3 436.6 343.8 436.9 343.7 C 437.3 343.5 436.8 342.8 436.5 342.8 C 436.7 343.3 437.8 343.2 438.2 343.3 C 438.7 343.3 439.3 343.5 439.9 343.4 C 440.9 343.1 441.7 341.9 442.1 341 C 442.3 340.6 442.5 340 442.8 339.7 C 442.9 340 442.8 340.3 442.7 340.6 C 442.7 340.9 442.7 341.2 442.5 341.5 C 442.4 341.8 442.2 342.1 442 342.4 C 441.7 342.8 441.5 343.1 441.2 343.3 C 441 343.5 440.7 343.7 440.5 343.9 C 440.3 344.1 439.7 344.7 439.4 344.5 C 439.4 344.2 439.8 344.1 440 344 C 440.2 343.8 440.4 343.6 440.6 343.4 C 440.8 343.2 441 343 441.2 342.8 C 441.1 342.8 440.9 343.1 440.7 343.2 C 440.6 343.3 440.5 343.6 440.3 343.7 C 440.2 343.8 440.1 343.9 439.9 344 C 439.8 344.1 439.7 344.2 439.5 344.2 C 439.2 344.3 439.1 344.4 438.9 344.5 C 438.8 344.6 438.1 345.1 438 344.9 C 438.1 344.7 438.1 344.9 438.2 344.8 C 438.3 344.8 438.4 344.7 438.5 344.7 C 438.9 344.4 439.4 344.4 439.8 344.1 C 439.6 344.2 439.4 344.3 439.2 344.4 C 439.1 344.5 438.9 344.5 438.7 344.6 C 438.5 344.7 438.3 344.9 438.1 344.9 C 437.9 344.9 437.7 344.8 437.5 344.8 C 437.1 344.9 436.8 345.1 436.6 345.2 C 436.3 345.3 436.1 345.3 435.9 345.2 C 435.4 345.2 434.9 345.2 434.4 345.1 C 434 344.9 433.7 344.6 433.3 344.4 C 432.9 344.2 432.6 344 432.4 343.7 C 432.2 343.5 432 343.4 431.9 343.2 C 431.7 343.1 431.6 342.9 431.4 342.7 C 431.3 342.6 431.1 342.5 431 342.3 C 430.8 342 430.7 341.7 430.6 341.3 C 430.6 341.4 430.7 341.6 430.8 341.7 C 431 341.5 430.5 341.3 430.8 341.2 C 431 341.1 431.4 342 431.6 342.1 C 431.7 341.6 431.4 340.2 430.8 340.1 C 430.7 340.4 431.2 342.2 431.8 341.8 C 432.1 341.6 431.8 340.4 431.7 340.1 C 431.7 339.9 431.6 339.7 431.5 339.5 C 431.5 339.4 431.4 339.3 431.4 339.2 C 431.5 338.9 431.7 339.3 431.8 339.4 C 431.9 339.7 432 340.1 432.2 340.3 C 432.4 340.5 433 340.8 433 341.1 C 432.6 341 432.6 340.4 432.5 340 C 432.4 339.5 432.3 339.1 432.2 338.6 C 432.2 338.1 432.2 337.7 432 337.3 C 432.2 337.4 432.5 337.4 432.3 337.7 C 432.3 337.7 432.3 337.7 432.3 337.7 C 432.4 337.9 432.4 338.3 432.4 338.6 C 432.4 339 432.6 339.3 432.8 339.6 C 433 340 433.2 340.4 433.4 340.9 C 433.5 341.1 433.6 341.2 433.7 341.4 C 433.6 340.9 433.3 340.5 432.9 340.2 C 432.7 339.8 432.7 339.4 432.6 339 C 432.1 337.5 432.4 335.9 432.4 334.4 C 432.4 334.9 432.3 335.5 432.3 336 C 432.3 336.5 432.3 337 432.4 337.4 C 432.4 337.7 432.5 338.1 432.4 338.3 C 432.5 337.9 432.4 337.5 432.3 337.1 C 432.2 336.7 432.3 336.3 432.3 335.9 C 432.3 335.5 432.3 335 432.3 334.5 C 432.4 333.9 432.4 333.2 432.3 332.6 C 432.2 332.9 432.2 333.3 432.1 333.6 C 432.1 334 432.1 334.4 432.1 334.7 C 432.1 335.1 432.1 335.6 432.1 336 C 432.1 335.1 432 334 432.2 333 C 432.3 332.5 432.4 332 432.4 331.5 C 432.5 331.1 432.5 330.6 432.5 330.2 C 432.5 330.4 432.4 330.5 432.4 330.6 C 432.3 330.8 432.3 331.1 432.3 331.3 C 432.3 331.8 432.4 332.2 432.3 332.7 C 432.3 333.2 432.1 333.7 432 334.2 C 432 334.4 431.6 335.2 431.9 335.3 C 432 335 431.9 334.7 431.9 334.4 C 431.9 334.2 432 333.6 431.8 333.5 C 431.6 333.8 431.7 334.3 431.7 334.6 C 431.7 335 431.8 335.4 431.8 335.7 C 431.8 335.6 431.6 335.4 431.5 335.4 C 431.4 335.6 431.4 335.8 431.4 336 C 431.4 336.3 431.3 336.6 431.2 336.9 C 431 337.3 431 337.7 431 338.1 C 431 338.3 431 338.6 430.9 338.8 C 430.6 338.1 430.9 337 430.4 336.5 C 430.3 336.6 430.3 336.9 430.3 337 C 430.3 337.4 430.3 337.8 430.3 338.3 C 430.3 339.2 430.4 340.1 430.8 341 C 430.5 340.6 430.2 340.1 430.1 339.6 C 429.7 338.4 429.7 337.1 429.8 335.9 C 429.8 335.2 429.8 334.6 429.8 334 C 429.9 333.5 429.9 333 429.9 332.6 C 430 332 430 331.4 430 330.8 C 430 331.2 430 331.6 430 331.9 C 430 332.4 430 332.9 430 333.4 C 430 334 430.1 334.5 430.2 335 C 430.2 335.5 430.4 336 430.5 336.5 C 430.5 337.1 430.4 337.6 430.5 338.2 C 430.5 337.7 430.4 337.1 430.4 336.6 C 430.3 336 430.5 335.3 430.6 334.7 C 430.7 334.4 430.7 334.1 430.8 333.8 C 430.9 333.5 431.1 333.2 431.1 332.9 C 431.2 332.7 431.2 332.4 431.2 332.2 C 431.2 331.4 431.3 330.7 431.3 329.9 C 430.9 330.7 430.7 331.7 430.5 332.6 C 430.2 332.5 430.3 331.8 430.2 331.6 C 430.2 331.2 430.1 330.9 430.1 330.5 C 430 330.7 429.7 331.5 429.9 331.7 C 430 331.3 429.6 330.9 429.6 330.4 C 429.7 330.6 429.9 330.5 429.9 330.6 C 429.5 330.9 428.8 330.6 428.3 330.6 C 428.1 330.6 427.9 330.7 427.8 330.7 C 427.6 330.7 427.4 330.6 427.2 330.6 C 426.9 330.6 426 330.9 425.9 330.6 C 426.5 330.4 427.3 330.4 428 330.5 C 427.9 330.6 427.8 330.5 427.7 330.5 C 427.4 330.5 427.1 330.5 426.9 330.5 C 426.5 330.4 425.7 330.5 425.5 330.1 C 426 329.9 426.7 329.9 427.2 329.8 C 427.7 329.7 428.1 329.6 428.5 329.7 C 428.8 329.8 429.2 330 429.5 329.9 C 429.1 329.5 425.8 329.6 426.1 328.8 C 426.2 328.4 427.5 328.6 427.8 328.6 C 428.4 328.6 429.3 328.3 429.8 328.5 C 429.4 328.8 429.2 328.8 428.8 328.8 C 428 328.7 427.2 328.8 426.5 328.9 C 425.9 328.9 425.4 329.1 424.8 329.1 C 424.3 329.1 423.8 329.1 423.4 329.1 C 423 329 422.6 329 422.2 329 C 422.3 329.3 422.8 329.1 423 329.1 C 423.2 329 423.6 329 423.3 329.3 C 423.2 329.4 422.9 329.4 422.7 329.5 C 422.5 329.5 422.3 329.6 422 329.6 C 422.3 329.9 422.8 330.1 423 329.6 C 423.3 329.7 423.6 329.2 423.8 329 C 424.1 328.8 424.3 328.7 424.6 328.5 C 424.7 328.5 424.9 328.5 424.9 328.4 C 424.7 328.3 424.5 328.3 424.3 328.2 C 424.1 328.2 423.9 328.1 423.7 328 C 423.4 327.9 423.1 327.9 422.8 327.8 C 422.4 327.8 422 327.8 421.6 327.8 C 421.3 327.8 421 327.9 420.7 327.8 C 420.9 327.9 421 327.7 421.2 327.8 C 421.2 327.9 421.2 327.9 421.2 327.9 C 421.4 328 421.8 327.9 422 328 C 422 328.4 422.4 328.7 422.5 329 C 422.6 329.3 422.5 329.7 422.4 329.9 C 422.4 330.1 422.1 330.3 422.2 330.5 C 422.3 330.9 423 330.3 423.1 330.2 C 423.3 330.1 423.7 330 423.7 329.8 C 423.7 329.6 423.6 329.5 423.4 329.6 C 423.5 329.6 423.5 329.5 423.5 329.5 C 423.5 329.6 423.5 329.7 423.5 329.7 C 423.6 329.6 423.7 329.7 423.8 329.7 C 423.9 329.6 424 329.4 424.1 329.4 C 424.2 329.2 424.3 329 424.5 329 C 424.7 329 424.8 329.2 425 329.2 C 424.8 329.1 423 328.8 423 329.1 C 423 329.3 423.2 329.3 423.3 329.3 C 423.6 329.3 423.8 329.4 424 329.6 C 424.5 329.9 424.9 330.1 425.4 330.2 C 425.5 330.3 425.8 330.4 425.9 330.5 C 425.5 330.5 425.1 330.8 424.7 330.8 C 424.3 330.8 423.8 330.8 423.3 330.8 C 422.9 330.8 422.5 330.6 422 330.6 C 421.5 330.6 421.1 330.8 420.6 330.8 C 420.5 330.5 420.6 330.1 420.6 329.8 C 420.5 329.5 420.5 329.1 420.6 328.8 C 420.6 328.6 420.6 328.4 420.6 328.2 C 420.6 328.1 420.6 327.9 420.6 327.8 C 420.6 327.7 420.8 327.7 420.9 327.6 C 421 327.5 421.1 327.3 421.2 327.2 C 421.3 327.1 421.4 326.9 421.4 326.8 C 421.6 326.4 421.6 326.1 421.8 325.8 C 422 325.5 422.3 325.2 422.5 324.9 C 422.7 324.7 422.8 324.5 423 324.2 C 423.5 323.7 423.7 322.9 423.4 322.2 C 423.2 321.8 423 321.3 422.7 321 C 422.5 320.7 422.1 320.5 421.9 320.3 C 422 320.5 422.2 320.8 422.3 321.1 C 422.4 321.2 422.4 321.4 422.6 321.5 C 422.8 321.7 423.1 321.8 423.2 322 C 423 322.2 422.5 322 422.2 322 C 422 322 421.1 322.4 421 322.1 C 421.2 322.1 421.4 322.2 421.6 322.2 C 422.1 322.2 422.6 322.1 423.1 321.8 C 423.3 321.6 423.6 320.9 423.1 320.8 C 423 321.1 421.9 323.2 421.6 323 C 421.4 322.8 421.8 321.9 421.9 321.7 C 422 321.4 422.3 320.9 422.2 320.5 C 422 320.5 421.9 320.8 421.8 320.9 C 421.5 321.4 421.4 321.9 421.1 322.4 C 420.9 322.9 420.7 322.9 420.7 322.4 C 420.6 321.9 421 321.6 420.9 321.1 C 420.9 320.9 420.7 320.1 420.9 320 C 421 320 421.1 320.1 421.2 320.1 C 421.3 320.1 421.4 320 421.5 320 C 421.8 319.9 422 319.9 422.3 319.9 C 422.6 319.9 422.8 320 423.1 320 C 423.3 320.1 423.4 320 423.5 320.1 C 423.5 320.1 423.6 320.2 423.7 320.2 C 423.7 320.8 423.7 321.5 423.7 322.1 C 423.7 322.4 423.8 322.8 423.4 322.8 C 423.3 322.9 423.1 322.9 423 322.9 C 422.9 322.9 422.8 322.8 422.7 322.8 C 422.6 322.8 422.5 322.8 422.4 322.8 C 422.2 322.9 422 322.8 421.8 322.8 C 421.5 322.8 420.9 322.7 420.6 322.8 C 420.6 322.6 420.6 322.4 420.6 322.2 C 420.7 321.8 420.7 321.4 420.8 321.1 C 420.8 321.4 420.9 321.9 420.8 322.2 C 420.8 321.9 420.9 321.6 420.9 321.3 C 420.8 321.2 420.8 321.2 420.7 321.1 C 420.7 320.9 420.8 320.7 420.8 320.5 C 420.8 320.3 420.6 320 420.7 319.9 C 420.7 320 420.6 320 420.6 320.1 C 420.7 320.1 421.1 320 421.1 320.1 C 420.2 320.3 419.3 320.1 418.3 320.1 C 415.2 320.3 411.9 320.1 408.8 320.6 C 407 320.9 405.8 320.8 404 320.6 C 399.5 320.2 395.1 321.7 390.8 320.3 C 389.2 319.8 387.8 318.8 386.2 318.3 C 384.9 317.9 383.5 317.9 382.1 317.7 C 378.6 317 374.6 318.1 371.2 319.1 C 368 320.1 46.2 319.5 43.2 318.8', "s0.9,t-50,-50")).attr({'stroke':'none'});
		 var LogoDrawLinePath1 = paper.path(Raphael.transformPath("M 836.3 313.6 C 836.3 297.9 839.9 281.3 838.4 266 C 837.1 253.5 830.1 238.9 828.9 224.4 C 827.5 207.7 833.1 192.4 833.1 175.8 C 833.1 166.9 823.8 128 835.4 126.6 C 836.8 115 839.6 104.8 836.4 92.6 C 836.2 93.6 836.4 94.6 837.1 95.5 C 838.7 84.7 834.3 71.9 833.2 61 C 832.9 58.4 832.1 49.7 831 46.3 C 828.7 39.2 823.1 40.7 820.3 33.8 C 801.9 30.5 785.7 25.2 765.7 25.2 C 744.4 25.2 724.9 22.1 703.7 22.1 C 647.5 22.1 591.4 22.1 535.2 22.1 C 510.7 22.1 483.7 18.5 459.4 23.1 C 449.7 24.9 442.5 29.3 431.8 28.4 C 421 27.4 410.9 23.6 400.5 22.1 C 379.7 18.9 353.6 22.1 332.3 24.2 C 314.7 25.9 298.3 22.1 279.2 22.1 C 219 22.1 159.1 21 98.7 21 C 98.8 21 101.1 21 99.6 21 C 80.3 21 61.8 19.2 44.7 26.5 C 21.7 36.4 34.4 49 37.3 68.4 C 40.5 89.7 41.5 111.4 41.5 133.4 C 41.6 154.2 36.3 172.8 37.3 193.9 C 38 207.4 36.8 221.1 37.3 234.7 C 37.6 242.8 36.3 251.9 37.3 260 C 38 265.8 41.5 271.1 42.6 276.7 C 44.5 285.9 46.9 304.1 38.6 309.7 C 28.9 316.3 17.3 305.4 18.6 294.9 C 25.4 292.1 35.6 292.3 37.2 301.1 C 33.2 302.5 28.1 302.4 24.7 301", "s0.9,t-48,-30")).attr({ stroke: "none"});
		 var LogoDrawLinePath2 = paper.path(Raphael.transformPath("M 45.7 317.8 C 24.6 322.6 36.6 347.9 39.4 362.1 C 43.7 383.7 43.6 406.1 43.6 428.6 C 43.6 470.2 19.8 520.3 46 558.7 C 47.7 561.2 45.9 559.7 45 560.7 C 46.9 557.3 47.1 558.9 48.6 557.8 C 43.5 563.9 51.6 571.9 57 574.8 C 56.7 574.7 54.8 573.8 54.8 573.8 C 65.6 578.1 76.8 584.5 87.8 586.3 C 99.7 588.2 114.8 586.9 126.8 586.3 C 137.6 585.8 145.7 585 156.5 588.6 C 165.2 591.6 171.3 593.7 180.5 593.6 C 196.3 593.5 213.1 590.1 228.5 589.1 C 229.2 589.2 228.1 589.3 227.5 589.8 C 245.9 577.9 289.5 580.3 311.3 585 C 327.4 588.5 345.6 591.1 360.7 589.6 C 375.2 588.2 389 585.6 403.7 586.3 C 417.1 586.9 430.9 588.9 444.3 588.4 C 467.5 587.5 490.2 583.1 514.2 583.1 C 534 583.1 553.7 581.5 572.1 579.9 C 577.8 579.5 583.6 580.1 589.1 581.1 C 589.1 580.2 588.7 579.6 587.8 579.2 C 587.7 578.8 588.8 583.2 588.8 583 C 617.3 583.8 645.9 583.1 674.4 583.1 C 698.7 583.1 718.1 578.9 741.5 578.9 C 761.4 578.9 780.2 577.5 799.4 575.8 C 805.6 575.3 820.3 577.3 825.8 574.5 C 831.3 571.7 836.6 557.1 838.4 551.5 C 843.1 537.4 839.4 521.3 837.6 507.2 C 835.8 507.8 832.5 506.8 830.7 507.5 C 833.2 489.2 830 468.1 831 449.4 C 831.5 440.1 831 431.7 833.1 423.1 C 835.2 414.7 838.3 406.7 838.4 397.8 C 838.5 379.8 833.2 362.9 832.1 345.2 C 831.4 334.6 830 329.6 837.1 323.9 C 841.1 320.6 852.5 315.1 858.1 319.1 C 869.2 326.9 861.6 354 845.4 345.5 C 825.7 335.1 859 319.9 853.9 335.6 C 853 335.6 854.3 334.8 854 335.4 C 852.6 335.8 850.4 336.1 848.9 335.7", "s0.9,t-52,-64")).attr({ stroke: "none"});
	
	
	var pathlinesfinal=paper.setFinish();
	
	var translate='t'+(-1*pathlinesfinal.getBBox().x)+','+(-1*pathlinesfinal.getBBox().y);
	//pathlinesfinal.transform(translate+'s0.79,0.79,0,0');

	//paper.attr("id","logodrawing");
	//global=LogoDrawLinePath0;
			
	pathlinesfinal.forEach(callback);
	
	
	//alert(pathlinesfinal.items[0]);
	
	//debugger;	
	
	var path0 = svgData.demo.strokepath[0].path = pathlinesfinal.items[0].realPath;
	var path1 = svgData.demo.strokepath[1].path = pathlinesfinal.items[1].realPath;
	var path2 = svgData.demo.strokepath[2].path = pathlinesfinal.items[2].realPath;
	
	//global= pathlinesfinal;
	
	//global = svgData.demo.strokepath[1].path;
	
	svgData.demo.dimensions.width=width;
	svgData.demo.dimensions.height=height;
	
		
	$('#demo').css("width",$("#dummy_pane").width());
	$('#demo').css("width",$("#dummy_pane").height());
	
	
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
	
	$("#demo svg").attr("id","logocanvas");
	
	
	
	
	//paper.remove(pathlinesfinal);
}


function callback(member)
{
			member.mouseover(function (e) {  this.path.remove(); this.ofill=this.attr('fill');this.attr({fill:'#000000'}); });
			//member.mouseout(function (e) { this.attr({fill:this.ofill}); });
			//member.click(function (e) { var thisPath=this.attr('path');alert('You just clicked on Element #'+this.id+'.To help you find it in the code its path starts with......'+thisPath); });*/
			
}
	

