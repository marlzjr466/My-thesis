var setting = false;
var viewProgram = false;
var viewNotification = false;
$(document).ready(function() {
	$(".user-profile i").click(function() {
		if (!setting) {
			$(".setting").stop().slideDown();
			setting = true;
		} else {
			$(".setting").stop().slideUp();
			setting = false;
		}
	});
	

	$(".header-nav #navigation li").click(function() {
		$(".header-nav #navigation li").removeClass();
		$(this).addClass("active");
	});

	$(".view-event-modal-container #close").click(function() {
		$(".view-event-modal").fadeOut();
	});

	$(".profile-modal-container #close").click(function() {
		$(".profile-modal").fadeOut();
	});

	$(".view-selected-event-modal-container #close").click(function() {
		$(".view-selected-event-modal").fadeOut();
	});

	$(".add-program-modal-container #close").click(function() {
		$(".add-program-modal").fadeOut();
	});

	$(".report-event-modal-container #close").click(function() {
		$(".report-event-modal").fadeOut();
	});

	$(".request-event-modal-container #close").click(function() {
		$(".request-event-modal").fadeOut();
	});

	$(".approve-event-modal").click(function() {
		$(this).fadeOut();
	});


	$(".view-ministry-modal-container #close").click(function() {
		$(".view-ministry-modal").fadeOut();
	});

	$(".response-ministry-modal").click(function() {
		$(this).fadeOut();
	});

	$(".error-ministry-modal").click(function() {
		$(this).fadeOut();
	});

	$(".delete-ministry-modal-container #can").click(function() {
		$(".delete-ministry-modal").fadeOut();
	});

	$(".delete-event-modal-container #can").click(function() {
		$(".delete-event-modal").fadeOut();
	});

	$(".delete-church-modal-container #can").click(function() {
		$(".delete-church-modal").fadeOut();
	});

	$(".view-church-modal-container #close").click(function() {
		$(".view-church-modal").fadeOut();
	});

	$(".view-pastor-modal-container #close").click(function() {
		$(".view-pastor-modal").fadeOut();
	});

	$(".delete-pastor-modal-container #can").click(function() {
		$(".delete-pastor-modal").fadeOut();
	});

	$(".view-event-modal-container #close").click(function() {
		$(".view-event-modal").fadeOut();
	});

	$(".request-event-modal-container #close").click(function() {
		$(".request-event-modal").fadeOut();
	});

	$(".add-coordinator-modal-container #close").click(function() {
		$(".add-coordinator-modal").fadeOut();
		document.getElementById("label2").style.display = "none";
	});

	$(".response-event-modal").click(function() {
		$(this).fadeOut();
	});

	$(".message-modal-container #close").click(function() {
		$(".message-modal").fadeOut();
	});
	
	$(".notify #wrapper #notify-img").click(function() {
		if (viewNotification == false) {
			$(".view-notification-modal").fadeIn();
			viewNotification = true;
		} else {
			$(".view-notification-modal").fadeOut();
			viewNotification = false;
		}
	});
});

var editProfile = function() {
	document.getElementById("profile-updated").style.display = "none";
	$(".profile-modal").fadeIn();
}

var registration = function(delegate) {
	if (delegate == 'member') {
		$(".registration-wrapper ul li:last-child").removeClass();
		$(".registration-wrapper ul li:first-child").addClass('active');

		$(".visitor-registration-container").hide();
		$(".member-registration-container").show();
	} else {
		document.getElementById("visitor-register-success").style.display = "none";
		$(".registration-wrapper ul li:first-child").removeClass();
		$(".registration-wrapper ul li:last-child").addClass('active');

		$(".member-registration-container").hide();
		$(".visitor-registration-container").show();
	}
}

var addCoordinatorModal = function() {
	$(".add-coordinator-modal").fadeIn();

	var scope = angular.element(document.getElementById("myCtrl")).scope();
	scope.$apply(function() {
		scope.getAssignMinistry();
	});
}

var reportEventModal = function() {
	$(".report-event-modal").fadeIn();
}

var toggleProgram = function(id) {
	if(!viewProgram) {
		$(".active-event-program-wrapper").stop().slideDown();
		viewProgram = true;	
		document.getElementById("program-view-btn").innerHTML = "Hide program";

		var scope = angular.element(document.getElementById("myCtrl")).scope();
		scope.$apply(function() {
			scope.getProgram(id);
		});
	} else {
		$(".active-event-program-wrapper").stop().slideUp();
		viewProgram = false;
		document.getElementById("program-view-btn").innerHTML = "View program";
	}
}
