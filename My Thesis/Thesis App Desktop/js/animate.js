$(document).ready(function() {

	$(".coordinator-login").click(function() {
		$(".main-container #admin-container").transition({scale: [0.75,0.75]},1000);
		$(".main-container #admin-container").css({"opacity": ".75"});
		$(".main-container #admin-container").css({"transform": "scale(.75) translateX(190%) rotate(-45deg)"});
		$(".main-container #admin-container").css({"z-index": "-1"});
		$(".main-container #admin-container").css({"border": "none"});
		$(".main-container #admin-container").removeClass();
		$(".main-container #coordinator-container").addClass('coordinatorIn');
		$(".main-container #coordinator-container").css({"opacity": "1"});
		$(".main-container #coordinator-container").css({"transform": "scale(1) translateX(-190%) rotate(45deg)"});
		$(".main-container #coordinator-container").css({"z-index": "1"});
		$(".main-container #coordinator-container").css({"border": "1px solid gold"});
		//$(this).fadeOut();
		$(".main-container #coordinator-container #input-wrapper").delay(500).fadeIn();
		$(".main-container #admin-container #input-wrapper").delay(500).fadeOut();
		$(".admin-login").fadeIn();
		$(".shadow-wrapper").transition({x: "105%"},1000);
		$(".add-ons-wrapper").delay(300).fadeOut();
		$(".add-ons-wrapper2").delay(1000).fadeIn();
	});

	$(".admin-login").click(function() {
		$(".main-container #coordinator-container").transition({scale: [0.75,0.75]},1000);
		$(".main-container #coordinator-container").css({"opacity": ".75"});
		$(".main-container #coordinator-container").css({"transform": "scale(.75) translateX(-190%) rotate(45deg)"});
		$(".main-container #coordinator-container").css({"z-index": "-1"});
		$(".main-container #coordinator-container").css({"border": "none"});
		$(".main-container #coordinator-container").removeClass();
		$(".main-container #admin-container").addClass('adminIn');
		$(".main-container #admin-container").css({"opacity": "1"});
		$(".main-container #admin-container").css({"transform": "scale(1) translateX(190%) rotate(-45deg)"});
		$(".main-container #admin-container").css({"z-index": "1"});
		$(".main-container #admin-container").css({"border": "1px solid gold"});
		//$(this).fadeOut();
		$(".main-container #admin-container #input-wrapper").delay(500).fadeIn();
		$(".main-container #coordinator-container #input-wrapper").delay(500).fadeOut();
		$(".coordinator-login").fadeIn();
		$(".shadow-wrapper").transition({x: "130%"},1000);
		$(".add-ons-wrapper2").delay(300).fadeOut();
		$(".add-ons-wrapper").delay(1000).fadeIn();
	});

});