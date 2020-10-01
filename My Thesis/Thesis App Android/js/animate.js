var showLogin = function(user) {
	$(".input-wrapper").removeClass("shakeObject");
	if (user == "pastor") {
		$(".login-form-member").hide();
		$(".login-form-pastor").fadeIn();
	} else {
		$(".login-form-pastor").hide();
		$(".login-form-member").fadeIn();
	}
}

$(document).ready(function() {

	$(".space").delay(7000).animate({"height": "14vh"});
	$(".choose-user").delay(7500).fadeIn();

	$(".button").click(function() {
		$(".button").removeClass("active");
		$(this).addClass("active");
	});

	$(".no-account").click(function() {
		$(".introWrapper").hide();
		$(".signup-wrapper").show();

		$(".signup-space").animate({"height": "8vh"});
	});

	$(".signup-space").animate({"height": "10vh"});
	$(".signup-space img").click(function() {
		$(".signup-wrapper").hide();
		$(".introWrapper").show();
		$(".signup-space").animate({"height": "0vh"});
	});

	$(".mainContainer #bodyContainer #postEvent #eventWrapper button").click(function() {
		$(".registrationModal").fadeIn();
		$(".mainContainer").css({"-webkit-filter": "blur(2px)"});
	});

	$(".registrationModal #registrationWrapper #cancel").click(function() {
		$(".registrationModal").fadeOut();
		$(".mainContainer").css({"-webkit-filter": "blur(0px)"});
	});

	$(".mainContainer #header #profile").click(function() {
		$(".loginModal").fadeOut();
		$(".mainContainer").hide();
		$(".ministryContainer").hide();
		$(".churchContainer").hide();
		$(".pastorContainer").hide();
		$(".eventContainer").hide();
		$(".pastorsContainer").delay(100).fadeIn(10);
	});

	$(".ministryContainer #header #profile").click(function() {
		$(".loginModal").fadeOut();
		$(".mainContainer").hide();
		$(".ministryContainer").hide();
		$(".churchContainer").hide();
		$(".pastorContainer").hide();
		$(".eventContainer").hide();
		$(".pastorsContainer").delay(100).fadeIn(10);
	});

	$(".churchContainer #header #profile").click(function() {
		$(".loginModal").fadeOut();
		$(".mainContainer").hide();
		$(".ministryContainer").hide();
		$(".churchContainer").hide();
		$(".pastorContainer").hide();
		$(".eventContainer").hide();
		$(".pastorsContainer").delay(100).fadeIn(10);
	});

	$(".pastorContainer #header #profile").click(function() {
		$(".loginModal").fadeOut();
		$(".mainContainer").hide();
		$(".ministryContainer").hide();
		$(".churchContainer").hide();
		$(".pastorContainer").hide();
		$(".eventContainer").hide();
		$(".pastorsContainer").delay(100).fadeIn(10);
	});

	$(".eventContainer #header #profile").click(function() {
		$(".loginModal").fadeOut();
		$(".mainContainer").hide();
		$(".ministryContainer").hide();
		$(".churchContainer").hide();
		$(".pastorContainer").hide();
		$(".eventContainer").hide();
		$(".pastorsContainer").delay(100).fadeIn(10);
	});

	$(".pastorsContainer #header #back").click(function() {
		$(".pastorsContainer").hide();
		$(".mainContainer").fadeIn();
		$(".mainContainer").css({"-webkit-filter": "blur(0px)"});
		$(".ministryContainer").css({"-webkit-filter": "blur(0px)"});
		$(".churchContainer").css({"-webkit-filter": "blur(0px)"});
		$(".pastorContainer").css({"-webkit-filter": "blur(0px)"});
		$(".eventContainer").css({"-webkit-filter": "blur(0px)"});
	});

	$(".mainContainer #bodyContainer #postEvent #eventWrapper h6").click(function() {
		$(".viewRegistered").fadeIn();
		$(".mainContainer").css({"-webkit-filter": "blur(2px)"});
	});

	$(".viewRegistered #registeredWrapper p b").click(function() {
		$(".viewRegistered").fadeOut();
		$(".mainContainer").css({"-webkit-filter": "blur(0px)"});
	});

	// Home Container----------------------------------------------------------------------------------
	// MINISTRY
	$(".mainContainer #footer #ministry").click(function() {
		$(".mainContainer").hide();
		$(".churchContainer").hide();
		$(".pastorContainer").hide();
		$(".eventContainer").hide();
		$(".ministryContainer").show();
	});

	// CHURCH
	$(".mainContainer #footer #church").click(function() {
		$(".mainContainer").hide();
		$(".pastorContainer").hide();
		$(".eventContainer").hide();
		$(".ministryContainer").hide();
		$(".churchContainer").show();
	});

	// HOME
	$(".mainContainer #footer #homeWrapper").click(function() {
		$(".pastorContainer").hide();
		$(".eventContainer").hide();
		$(".ministryContainer").hide();
		$(".churchContainer").hide();
		$(".mainContainer").show();
	});

	// PASTOR
	$(".mainContainer #footer #pastor").click(function() {
		$(".eventContainer").hide();
		$(".ministryContainer").hide();
		$(".churchContainer").hide();
		$(".mainContainer").hide();
		$(".pastorContainer").show();
	});

	// EVENT
	$(".mainContainer #footer #event").click(function() {
		$(".ministryContainer").hide();
		$(".churchContainer").hide();
		$(".mainContainer").hide();
		$(".pastorContainer").hide();
		$(".eventContainer").show();
	});

	// Ministry Container----------------------------------------------------------------------------------
	// MINISTRY
	$(".ministryContainer #footer #ministry").click(function() {
		$(".mainContainer").hide();
		$(".churchContainer").hide();
		$(".pastorContainer").hide();
		$(".eventContainer").hide();
		$(".ministryContainer").show();
	});

	// CHURCH
	$(".ministryContainer #footer #church").click(function() {
		$(".mainContainer").hide();
		$(".pastorContainer").hide();
		$(".eventContainer").hide();
		$(".ministryContainer").hide();
		$(".churchContainer").show();
	});

	// HOME
	$(".ministryContainer #footer #homeWrapper").click(function() {
		$(".pastorContainer").hide();
		$(".eventContainer").hide();
		$(".ministryContainer").hide();
		$(".churchContainer").hide();
		$(".mainContainer").show();
	});

	// PASTOR
	$(".ministryContainer #footer #pastor").click(function() {
		$(".eventContainer").hide();
		$(".ministryContainer").hide();
		$(".churchContainer").hide();
		$(".mainContainer").hide();
		$(".pastorContainer").show();
	});

	// EVENT
	$(".ministryContainer #footer #event").click(function() {
		$(".ministryContainer").hide();
		$(".churchContainer").hide();
		$(".mainContainer").hide();
		$(".pastorContainer").hide();
		$(".eventContainer").show();
	});

	// Church Container----------------------------------------------------------------------------------
	// MINISTRY
	$(".churchContainer #footer #ministry").click(function() {
		$(".mainContainer").hide();
		$(".churchContainer").hide();
		$(".pastorContainer").hide();
		$(".eventContainer").hide();
		$(".ministryContainer").show();
	});

	// CHURCH
	$(".churchContainer #footer #church").click(function() {
		$(".mainContainer").hide();
		$(".pastorContainer").hide();
		$(".eventContainer").hide();
		$(".ministryContainer").hide();
		$(".churchContainer").show();
	});

	// HOME
	$(".churchContainer #footer #homeWrapper").click(function() {
		$(".pastorContainer").hide();
		$(".eventContainer").hide();
		$(".ministryContainer").hide();
		$(".churchContainer").hide();
		$(".mainContainer").show();
	});

	// PASTOR
	$(".churchContainer #footer #pastor").click(function() {
		$(".eventContainer").hide();
		$(".ministryContainer").hide();
		$(".churchContainer").hide();
		$(".mainContainer").hide();
		$(".pastorContainer").show();
	});

	// EVENT
	$(".churchContainer #footer #event").click(function() {
		$(".ministryContainer").hide();
		$(".churchContainer").hide();
		$(".mainContainer").hide();
		$(".pastorContainer").hide();
		$(".eventContainer").show();
	});

	// Pastor Container----------------------------------------------------------------------------------
	// MINISTRY
	$(".pastorContainer #footer #ministry").click(function() {
		$(".mainContainer").hide();
		$(".churchContainer").hide();
		$(".pastorContainer").hide();
		$(".eventContainer").hide();
		$(".ministryContainer").show();
	});

	// CHURCH
	$(".pastorContainer #footer #church").click(function() {
		$(".mainContainer").hide();
		$(".pastorContainer").hide();
		$(".eventContainer").hide();
		$(".ministryContainer").hide();
		$(".churchContainer").show();
	});

	// HOME
	$(".pastorContainer #footer #homeWrapper").click(function() {
		$(".pastorContainer").hide();
		$(".eventContainer").hide();
		$(".ministryContainer").hide();
		$(".churchContainer").hide();
		$(".mainContainer").show();
	});

	// PASTOR
	$(".pastorContainer #footer #pastor").click(function() {
		$(".eventContainer").hide();
		$(".ministryContainer").hide();
		$(".churchContainer").hide();
		$(".mainContainer").hide();
		$(".pastorContainer").show();
	});

	// EVENT
	$(".pastorContainer #footer #event").click(function() {
		$(".ministryContainer").hide();
		$(".churchContainer").hide();
		$(".mainContainer").hide();
		$(".pastorContainer").hide();
		$(".eventContainer").show();
	});

	// Event Container----------------------------------------------------------------------------------
	// MINISTRY
	$(".eventContainer #footer #ministry").click(function() {
		$(".mainContainer").hide();
		$(".churchContainer").hide();
		$(".pastorContainer").hide();
		$(".eventContainer").hide();
		$(".ministryContainer").show();
	});

	// CHURCH
	$(".eventContainer #footer #church").click(function() {
		$(".mainContainer").hide();
		$(".pastorContainer").hide();
		$(".eventContainer").hide();
		$(".ministryContainer").hide();
		$(".churchContainer").show();
	});

	// HOME
	$(".eventContainer #footer #homeWrapper").click(function() {
		$(".pastorContainer").hide();
		$(".eventContainer").hide();
		$(".ministryContainer").hide();
		$(".churchContainer").hide();
		$(".mainContainer").show();
	});

	// PASTOR
	$(".eventContainer #footer #pastor").click(function() {
		$(".eventContainer").hide();
		$(".ministryContainer").hide();
		$(".churchContainer").hide();
		$(".mainContainer").hide();
		$(".pastorContainer").show();
	});

	// EVENT
	$(".eventContainer #footer #event").click(function() {
		$(".ministryContainer").hide();
		$(".churchContainer").hide();
		$(".mainContainer").hide();
		$(".pastorContainer").hide();
		$(".eventContainer").show();
	});



	$(".pastorsContainer #body #update").click(function() {
		$(".pastorsContainer").hide();
		$(".pastorsUpdateContainer").show();
	});

	$(".pastorsUpdateContainer #header #back").click(function() {
		$(".pastorsUpdateContainer").hide();
		$(".pastorsContainer").show();
	});

	$(".memberTransferRequest #header #back").click(function() {
		$(".memberTransferRequest").hide();
		$(".pastorsContainer").show();
	});

	$(".pastorsContainer #body #transfer-request").click(function() {
		$(".pastorsContainer").hide();
		$(".memberTransferRequest").show();
	});

	$(".pastorsContainer #body #church").click(function() {
		$(".pastorsContainer").hide();
		$(".churchUpdateContainer").show();
	});

	$(".churchUpdateContainer #header #back").click(function() {
		$(".churchUpdateContainer").hide();
		$(".pastorsContainer").show();
	});

	$(".pastorsContainer #body #transfer").click(function() {
		$(".pastorsContainer").hide();
		$(".transferContainer").show();
	});

	$(".transferContainer #header #back").click(function() {
		$(".transferContainer").hide();
		$(".pastorsContainer").show();
	});

	$(".pastorsContainer #body #add").click(function() {
		$(".pastorsContainer").hide();
		$(".addMemberContainer").show();
	});

	$(".addMemberContainer #header #back").click(function() {
		$(".addMemberContainer").hide();
		$(".pastorsContainer").show();
	});

	$(".pastorsContainer #body #member").click(function() {
		$(".pastorsContainer").hide();
		$(".churchMemberContainer").show();
		$(".churchMemberContainer #body #member-request-container").hide();
		$(".churchMemberContainer #body #official-member-container").show();
		$(".churchMemberContainer #body ul li").removeClass();
		$(".churchMemberContainer #body ul li:first-child").addClass("activeLI");
	});

	$(".churchMemberContainer #header #back").click(function() {
		$(".churchMemberContainer").hide();
		$(".pastorsContainer").show();
	});

	$(".pastorsContainer #body #post").click(function() {
		$(".pastorsContainer").hide();
		$(".postEventContainer").show();
	});

	$(".postEventContainer #header #back").click(function() {
		$(".postEventContainer").hide();
		$(".pastorsContainer").show();
	});

	$(".churchMemberContainer #body ul li").click(function() {
		$(".churchMemberContainer #body ul li").removeClass();
		$(this).addClass("activeLI");
	});

	$(".churchMemberContainer #body ul li:first-child").click(function() {
		$(".churchMemberContainer #body #member-request-container").hide();
		$(".churchMemberContainer #body #official-member-container").show();
	});

	$(".churchMemberContainer #body ul li:last-child").click(function() {
		$(".churchMemberContainer #body #official-member-container").hide();
		$(".churchMemberContainer #body #member-request-container").show();
	});
});