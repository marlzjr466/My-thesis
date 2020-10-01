var app = angular.module("myApp",[]);

app.controller("myCtrl", function($scope, $http) {

	$scope.pastorLogin = function() {
		if ($scope.accessCode == undefined || $scope.accessCode == "") {
			$(".input-wrapper").addClass("shakeObject");
		} else {
			$http.post("http://localhost/thesisAppProcess/androidProcess/pastorLogin.php", {
				'accessCode': $scope.accessCode
			}, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				}
			}).then(function(response) {
				response
				if (response.data == "No account found!") {
					document.getElementById("incorrect-pass").style.display = "flex";
				} else {
					window.localStorage.setItem("userID",response.data[0].id);
					window.location.href="home.html";
				}
			});
		}	
	}

	$scope.memberLogin = function() {
		if ($scope.memberUser == undefined || $scope.memberUSer == "") {
			$(".user").addClass("shakeObject");
		} else if ($scope.memberPass == undefined || $scope.memberPass == "") {
			$(".pass").addClass("shakeObject");
		} else {
			$http.post("http://localhost/thesisAppProcess/androidProcess/memberLogin.php", {
				'username': $scope.memberUser,
				'password': $scope.memberPass
			}, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				}
			}).then(function(response) {
				if (response.data == "No account found!") {
					document.getElementById("not-approve").style.display = "none";
					document.getElementById("incorrect-memberPass").style.display = "flex";
				} else if (response.data == "Not approve!No account found!") {
					document.getElementById("incorrect-memberPass").style.display = "none";
					document.getElementById("not-approve").style.display = "flex";
				} else {
					window.localStorage.setItem("userID",response.data[0].id);
					window.location.href="home2.html";
				}
			});
		}
	}

	$scope.getUserProfile = function() {
		$http.post("http://localhost/thesisAppProcess/androidProcess/getUserProfile.php", {
			'id': window.localStorage.getItem("userID")
		}, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		}).then(function(response) {
			$scope.userImage = response.data[0].image;
			$scope.userFullname = response.data[0].firstname + " " + response.data[0].lastname;
			$scope.unapprovedInterval();
		});
	}

	$scope.getMemberProfile = function() {
		$http.post("http://localhost/thesisAppProcess/androidProcess/getMemberProfile.php", {
			'id': window.localStorage.getItem("userID")
		}, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		}).then(function(response) {
			$scope.userImage = response.data[0].image;
			$scope.userFullname = response.data[0].firstname + " " + response.data[0].lastname;
		});
	}

	$scope.logoutProcess = function() {
		$http.post("http://localhost/thesisAppProcess/androidProcess/logoutProcess.php", {
			'id': window.localStorage.getItem("userID")
		}, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		}).then(function(response) {
			if (response.data == "Success") {
				window.localStorage.setItem("userID",0);
				window.location.href="index2.html";
			} else {
				// do nothing...
			}
		});
	}

	$scope.logoutProcessMember = function() {
		$http.post("http://localhost/thesisAppProcess/androidProcess/logoutProcessMember.php", {
			'id': window.localStorage.getItem("userID")
		}, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		}).then(function(response) {
			if (response.data == "Success") {
				window.localStorage.setItem("userID",0);
				window.location.href="index2.html";
			} else {
				// do nothing...
			}
		});
	}

	$scope.signupMember = function() {
		document.getElementById("signup-loader").style.display = "block";
		$http.post("http://localhost/thesisAppProcess/androidProcess/signupMember.php", {
			'firstname': $scope.memberFirstname,
			'lastname': $scope.memberLastname,
			'church': $scope.memberChurch,
			'department': $scope.memberDepartment,
			'contact': $scope.memberContact,
			'username': $scope.memberUsername,
			'password': $scope.memberPassword
		}, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		}).then(function(response) {
			document.getElementById("signup-loader").style.display = "none";
			document.getElementById("success").style.display = "block";
			
			$scope.memberFirstname = null;
			$scope.memberLastname = null;
			$scope.memberChurch = null;
			$scope.memberDepartment = null;
			$scope.memberContact = null;
			$scope.memberUsername = null;
			$scope.memberPassword = null;
		});
	}

	$scope.select = function() {
		$http.get("http://localhost/thesisAppProcess/androidProcess/select.php")
		.then(function(data) {
			$scope.churchList = data.data.churchList;
			$scope.departmentList = data.data.departmentList;
		});
	}

	$scope.getEvents = function() {
		$http.post("http://localhost/thesisAppProcess/androidProcess/getEvents.php")
		.then(function(data) {
			$scope.events = data.data;
		});
	}

	$scope.getPastors = function() {
		$http.get("http://localhost/thesisAppProcess/androidProcess/getPastors.php")
		.then(function(data) {
			$scope.pastors = data.data;
		});
	}

	$scope.getMinistry = function() {
		$http.post("http://localhost/thesisAppProcess/androidProcess/getMinistry.php")
		.then(function(data) {
			$scope.ministry = [];

			for (var i = 0; i < data.data.ministry.length; i++) {
				$scope.ministry.push({
					'id': data.data.ministry[i].id,
					'name': data.data.ministry[i].name,
					'coordinator': data.data.coordinator[i].firstname + " " + data.data.coordinator[i].lastname
				});
			}
		});
	}

	$scope.getChurches = function() {
		$http.get("http://localhost/thesisAppProcess/androidProcess/getChurches.php")
		.then(function(data) {
			$scope.churches = data.data;
		});
	}

	$scope.getEvent = function() {
		document.getElementById("noActive").style.display = "none";
		document.getElementById("noUpcoming").style.display = "none";
		document.getElementById("noPrevious").style.display = "none";
		$http.get("http://localhost/thesisAppProcess/androidProcess/getEvent.php")
		.then(function(data) {
			$scope.upcomingEvent = [];
			$scope.activeEvent = [];
			$scope.previousEvent = [];
			$scope.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

			for (var i = 0; i < data.data.coordinator.length; i++) {
				for (var j = 0; j < data.data.previousEvent.length; j++) {
					if (data.data.coordinator[i].ministryID == data.data.previousEvent[j].ministryID) {
						var x = data.data.previousEvent[j].dateStart.split('-');
						var start = $scope.months[x[1]-1] + " " + x[2];
						var y = data.data.previousEvent[j].dateEnd.split('-');
						var end = $scope.months[y[1]-1] + " " + y[2] + ", " + y[0];

						$scope.previousEvent.push({
							'id': data.data.previousEvent[j].id,
							'dateStart': data.data.previousEvent[j].dateStart,
							'dateEnd': data.data.previousEvent[j].dateEnd,
							'dated': start + " - " + end,
							'registrationFee': data.data.previousEvent[j].registrationFee,
							'theme': data.data.previousEvent[j].theme,
							'address': data.data.previousEvent[j].address,
							'speaker': data.data.previousEvent[j].speaker,
							'hostChurch': data.data.previousEvent[j].hostChurch,
							'ministryID': data.data.previousEvent[j].ministryID,
							'status': data.data.previousEvent[j].status,
							'approve': data.data.previousEvent[j].approve,
							'active': data.data.previousEvent[j].active,
							'image': data.data.previousEvent[j].image,
							'coordinatorID': data.data.coordinator[i].id,
							'coordinatorName': data.data.coordinator[i].firstname + " " + data.data.coordinator[i].lastname,
							'coordinatorPosition': data.data.coordinator[i].position,
							'coordinatorImage': data.data.coordinator[i].image
						});
					}
				}
			} if ($scope.previousEvent.length == 0) {
				document.getElementById("noPrevious").style.display = "block";
			}

			for (var i = 0; i < data.data.coordinator.length; i++) {
				for (var j = 0; j < data.data.activeEvent.length; j++) {
					if (data.data.coordinator[i].ministryID == data.data.activeEvent[j].ministryID) {
						var x = data.data.activeEvent[j].dateStart.split('-');
						var start = $scope.months[x[1]-1] + " " + x[2];
						var y = data.data.activeEvent[j].dateEnd.split('-');
						var end = $scope.months[y[1]-1] + " " + y[2] + ", " + y[0];

						$scope.activeEvent.push({
							'id': data.data.activeEvent[j].id,
							'dateStart': data.data.activeEvent[j].dateStart,
							'dateEnd': data.data.activeEvent[j].dateEnd,
							'dated': start + " - " + end,
							'registrationFee': data.data.activeEvent[j].registrationFee,
							'theme': data.data.activeEvent[j].theme,
							'address': data.data.activeEvent[j].address,
							'speaker': data.data.activeEvent[j].speaker,
							'hostChurch': data.data.activeEvent[j].hostChurch,
							'ministryID': data.data.activeEvent[j].ministryID,
							'status': data.data.activeEvent[j].status,
							'approve': data.data.activeEvent[j].approve,
							'active': data.data.activeEvent[j].active,
							'image': data.data.activeEvent[j].image,
							'coordinatorID': data.data.coordinator[i].id,
							'coordinatorName': data.data.coordinator[i].firstname + " " + data.data.coordinator[i].lastname,
							'coordinatorPosition': data.data.coordinator[i].position,
							'coordinatorImage': data.data.coordinator[i].image
						});
					}
				}
			} if ($scope.activeEvent.length == 0) {
				document.getElementById("noActive").style.display = "block";
			}

			for (var i = 0; i < data.data.coordinator.length; i++) {
				for (var j = 0; j < data.data.upcomingEvent.length; j++) {
					if (data.data.coordinator[i].ministryID == data.data.upcomingEvent[j].ministryID) {
						var x = data.data.upcomingEvent[j].dateStart.split('-');
						var start = $scope.months[x[1]-1] + " " + x[2];
						var y = data.data.upcomingEvent[j].dateEnd.split('-');
						var end = $scope.months[y[1]-1] + " " + y[2] + ", " + y[0];

						$scope.upcomingEvent.push({
							'id': data.data.upcomingEvent[j].id,
							'dateStart': data.data.upcomingEvent[j].dateStart,
							'dateEnd': data.data.upcomingEvent[j].dateEnd,
							'dated': start + " - " + end,
							'registrationFee': data.data.upcomingEvent[j].registrationFee,
							'theme': data.data.upcomingEvent[j].theme,
							'address': data.data.upcomingEvent[j].address,
							'speaker': data.data.upcomingEvent[j].speaker,
							'hostChurch': data.data.upcomingEvent[j].hostChurch,
							'ministryID': data.data.upcomingEvent[j].ministryID,
							'status': data.data.upcomingEvent[j].status,
							'approve': data.data.upcomingEvent[j].approve,
							'active': data.data.upcomingEvent[j].active,
							'image': data.data.upcomingEvent[j].image,
							'coordinatorID': data.data.coordinator[i].id,
							'coordinatorName': data.data.coordinator[i].firstname + " " + data.data.coordinator[i].lastname,
							'coordinatorPosition': data.data.coordinator[i].position,
							'coordinatorImage': data.data.coordinator[i].image
						});
					}
				}
			} if ($scope.upcomingEvent.length == 0) {
				document.getElementById("noUpcoming").style.display = "block";
			}
			
		});
	}

	$scope.unapproveCounter = 0;

	$scope.unapprovedInterval = function() {
		setInterval($scope.getUnapproveMember,500);
	}
	$scope.unapproveCounter = 0;
	$scope.getUnapproveMember = function() {
		$http.post("http://localhost/thesisAppProcess/androidProcess/getUnapproveMember.php", {
			'id': window.localStorage.getItem("userID")
		}, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		}).then(function(data) {
			if (data.data.length == 0) {
			//	document.getElementById("count-notification").style.opacity = "0";
				document.getElementById("count-notification2").style.opacity = "0";
				document.getElementById("count-notification3").style.opacity = "0";
				document.getElementById("count-notification4").style.opacity = "0";
				document.getElementById("count-notification5").style.opacity = "0";
				document.getElementById("count-notification6").style.opacity = "0";
				$scope.unapproveCounter = data.data.length;
			} else {
				if ($scope.unapproveCounter != data.data.length) {
					$scope.unapproveCounter = data.data.length;
					$scope.count_notification = data.data.length;
				//	document.getElementById("count-notification").innerHTML = data.data.length;
					document.getElementById("count-notification2").innerHTML = data.data.length;
					// document.getElementById("count-notification3").innerHTML = data.data.length;
					// document.getElementById("count-notification4").innerHTML = data.data.length;
					// document.getElementById("count-notification5").innerHTML = data.data.length;
					// document.getElementById("count-notification6").innerHTML = data.data.length;
					document.getElementById("count-notification").style.opacity = "1";
					document.getElementById("count-notification2").style.opacity = "1";
					document.getElementById("count-notification3").style.opacity = "1";
					document.getElementById("count-notification4").style.opacity = "1";
					document.getElementById("count-notification5").style.opacity = "1";
					document.getElementById("count-notification6").style.opacity = "1";
				} else {
					// do nothing..
				}
			} $scope.getTransferRequest();
		});
	}

	$scope.getUnapproveMember2 = function() {
		document.getElementById("noRequest").style.display = "none";
		$http.post("http://localhost/thesisAppProcess/androidProcess/getUnapproveMember.php", {
			'id': window.localStorage.getItem("userID")
		}, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		}).then(function(data) {
			if (data.data.length == 0) {
				document.getElementById("noRequest").style.display = "block";
				$scope.memberRequest = [];
			} else {
				$scope.memberRequest = data.data;
			}
		});
	}

	$scope.approveRequest = function(id,index) {
		$scope.x = 0;
		document.getElementById("approveBtn"+index).style.display = "none";
		document.getElementById("disapproveBtn"+index).style.display = "none";
		document.getElementById("requestLoader"+index).style.display = "block";

		$http.post("http://localhost/thesisAppProcess/androidProcess/approveRequest.php", {
			'id': id
		}, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		}).then(function(response) {
			if (response.data == "Success") {
				document.getElementById("requestLoader"+index).style.display = "none";
	 			document.getElementById("official"+index).style.display = "block";
			} else {
				// do nothing..
			}

			$scope.getChurchMember();
		});
	}

	$scope.getChurchMember = function() {
		document.getElementById("mensMembers").style.display = "none";
		document.getElementById("womensMembers").style.display = "none";
		document.getElementById("youthMembers").style.display = "none";
		document.getElementById("kidsMembers").style.display = "none";

		$http.post("http://localhost/thesisAppProcess/androidProcess/getChurchMember.php", {
			'id': window.localStorage.getItem("userID")
		}, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		}).then(function(data) {
			$scope.countOfficialMember = data.data.officialmember.length;
			$scope.officialmember = [];
			$scope.mensDepartment = [];
			$scope.womensDepartment = [];
			$scope.youthDepartment = [];
			$scope.kidsDepartment = [];

			for (var i = 0; i < data.data.ministry.length; i++) {
				for (var j = 0; j < data.data.officialmember.length; j++) {
					if (data.data.ministry[i].id == data.data.officialmember[j].ministryID) {
						$scope.officialmember.push({
							'id': data.data.officialmember[j].id,
							'firstname': data.data.officialmember[j].firstname,
							'middlename': data.data.officialmember[j].middlename,
							'lastname': data.data.officialmember[j].lastname,
							'bday': data.data.officialmember[j].bday,
							'address': data.data.officialmember[j].address,
							'gender': data.data.officialmember[j].gender,
							'civilStatus': data.data.officialmember[j].civilStatus,
							'contact': data.data.officialmember[j].contact,
							'ministryID': data.data.officialmember[j].ministryID,
							'ministryDesc': data.data.ministry[i].name,
							'churchID': data.data.officialmember[j].churchID,
							'username': data.data.officialmember[j].username,
							'password': data.data.officialmember[j].password,
							'image': data.data.officialmember[j].image,
							'status': data.data.officialmember[j].status,
							'officialmember': data.data.officialmember[j].officialmember
						});
					}
				}
			}

			for (var i = 0; i < $scope.officialmember.length; i++) {
				if ($scope.officialmember[i].ministryDesc == "Mens") {
					$scope.mensDepartment.push($scope.officialmember[i]);
				} else if ($scope.officialmember[i].ministryDesc == "Womens") {
					$scope.womensDepartment.push($scope.officialmember[i]);
				} else if ($scope.officialmember[i].ministryDesc == "Youth Alive") {
					$scope.youthDepartment.push($scope.officialmember[i]);
				} else if ($scope.officialmember[i].ministryDesc == "Kids") {
					$scope.kidsDepartment.push($scope.officialmember[i]);
				}
			}

			if ($scope.mensDepartment.length == 0) {
				document.getElementById("mensMembers").style.display = "block";
			} if ($scope.womensDepartment.length == 0) {
				document.getElementById("womensMembers").style.display = "block";
			} if ($scope.youthDepartment.length == 0) {
				document.getElementById("youthMembers").style.display = "block";
			} if ($scope.kidsDepartment.length == 0) {
				document.getElementById("kidsMembers").style.display = "block";
			}
		});
	}

	$scope.getTransferChurch = function() {
		document.getElementById("request-loader").style.display = "none";
				document.getElementById("request-submitted").style.display = "none";
		$http.post("http://localhost/thesisAppProcess/androidProcess/getTransferChurch.php", {
			'id': window.localStorage.getItem("userID")
		}, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		}).then(function(data) {
			$scope.transferChurch = data.data;
		});
	}

	$scope.requestTransfer = function() {
		if ($scope.transferChurches == undefined || $scope.transferChurch == "") {
			$('.tc').addClass("shakeObject");
		} else if ($scope.transferReason == undefined || $scope.transferReason == "") {
			$('.tr').addClass("shakeObject");
		} else {
			document.getElementById("request-loader").style.display = "block";
			$http.post("http://localhost/thesisAppProcess/androidProcess/requestTransfer.php", {
				'toChurch': $scope.transferChurches,
				'reason': $scope.transferReason,
				'id': window.localStorage.getItem("userID")
			}, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				}
			}).then(function(response) {
				if (response.data == "Success") {
					document.getElementById("request-loader").style.display = "none";
					document.getElementById("request-submitted").style.display = "block";

					$scope.transferChurch = null;
					$scope.transferReason = null;
				} else {
					// do nothing here...
				}
			});
		}
	}

	$scope.getTransferRequest = function() {
		$http.post("http://localhost/thesisAppProcess/androidProcess/getTransferRequest.php", {
			'id': window.localStorage.getItem("userID")
		}, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		}).then(function(response) {
			if (response.data.transferRequest.length == 0) {
				$scope.countTransferRequest = 0;
				$scope.transferRequest = [];
				document.getElementById("count-notification7").style.opacity = "0";
				document.getElementById("noR").style.display = "block";
			} else {
				$scope.countTransferRequest = response.data.transferRequest.length;
				document.getElementById("noR").style.display = "none";
				document.getElementById("count-notification").style.opacity = "1";
				document.getElementById("count-notification7").style.opacity = "1";
				$scope.transferRequest = [];
				for (var i = 0; i < response.data.transferRequest.length; i++) {
					$scope.transferRequest.push({
						'id': response.data.transferRequest[i].id,
						'firstname': response.data.user[i].firstname,
						'lastname': response.data.user[i].lastname,
						'userID': response.data.user[i].id,
						'image': response.data.user[i].image,
						'churchName': response.data.church[i].name,
						'fromChurchID': response.data.transferRequest[i].fromChurchID,
						'toChurchID': response.data.transferRequest[i].toChurchID,
						'approve': response.data.transferRequest[i].approve,
						'reason': response.data.transferRequest[i].reason
					});
				}
			}
		});
	}

	$scope.approveTransferRequest = function(id) {
		document.getElementById("pic").style.display = "block";
		$http.post("http://localhost/thesisAppProcess/androidProcess/approveTransferRequest.php", {
			'id': id
		}, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		}).then(function(response) {
			if (response.data == "Success") {
				document.getElementById("pic").style.display = "none";
				document.getElementById("approved").style.display = "block";
			} else {
				// do nothing...
			}

			$scope.getChurchMember();
		});
	}
});