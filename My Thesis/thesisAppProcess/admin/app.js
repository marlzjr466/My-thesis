var app = angular.module("myApp", []);

app.controller("myCtrl", function($http, $scope) {
	$scope.user = [];
	$scope.addMinistryBtn = "ADD";
	$scope.pastorAddBtn = "ADD";
	$scope.churchAddBtn = "ADD";
	$scope.eventAddBtn = "SUBMIT";
	$scope.months = [];
	$scope.days = [];
	$scope.month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];

	for (var i = 0; i < 12; i++) {
		$scope.months.push({'mm':$scope.month[i]});
	}
	for (var j = 1; j <= 31; j++) {
		$scope.days.push({'dd':j});
	}
	
	$scope.loadUser = function() {
		$http.get("http://localhost/thesisAppProcess/process/loadUser.php")
		.then(function(data) {
			$scope.user = data.data;
			console.log($scope.user);
		});
	}

	$scope.adminLogin = function() {
		$scope.temp = [];
		if ($scope.adminUsername == undefined || $scope.adminUsername == "") {
			// document.getElementById("usernameField").style.opacity = "1";
			$(".main-container #admin-container #input-wrapper #adminUsername").addClass("shakeObject");
		} else if ($scope.adminPassword == undefined || $scope.adminPassword == "") {
			// document.getElementById("passwordField").style.opacity = "1";
			$(".main-container #admin-container #input-wrapper #adminPassword").addClass("shakeObject");
		} else {
			$http.post("http://localhost/thesisAppProcess/process/adminLogin.php", {
				'username': $scope.adminUsername,
				'password': $scope.adminPassword
			}, {
				headers : {
			        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			    }
			}).then(function(response) {
				if (response.data == "No account found!") {
					$(".noAccountModal").fadeIn();
				} else {
					$scope.user = response.data[0];
					localStorage.setItem("userID",$scope.user.id);
					window.location.href="admin/dashboard.html";
				}
				$scope.adminUsername = null;
				$scope.adminPassword = null;
				// document.getElementById("usernameField").style.opacity = "0";
				// document.getElementById("passwordField").style.opacity = "0";
			});
		}
	}

	// $scope.coordinatorLogin = function() {
	// 	$scope.temp = [];
	// 	if ($scope.adminUsername == undefined || $scope.adminUsername == "") {
	// 		document.getElementById("usernameField").style.opacity = "1";
	// 	} else if ($scope.adminPassword == undefined || $scope.adminPassword == "") {
	// 		document.getElementById("passwordField").style.opacity = "1";
	// 	} else {
	// 		$http.post("http://localhost/thesisAppProcess/process/adminLogin.php", {
	// 			'username': $scope.adminUsername,
	// 			'password': $scope.adminPassword
	// 		}, {
	// 			headers : {
	// 		        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
	// 		    }
	// 		}).then(function(response) {
	// 			if (response.data == "No account found!") {
	// 				$(".noAccountModal").fadeIn();
	// 				$(".main-container").css({"-webkit-filter": "blur(2px)"});
	// 			} else {
	// 				$scope.user = response.data[0];
	// 				localStorage.setItem("userID",$scope.user.id);
	// 				window.location.href="adminPages/dashboard.html";
	// 			}
	// 			$scope.adminUsername = null;
	// 			$scope.adminPassword = null;
	// 			document.getElementById("usernameField").style.opacity = "0";
	// 			document.getElementById("passwordField").style.opacity = "0";
	// 		});
	// 	}
	// }

	$scope.getUserProfile = function() {
		$http.post("http://localhost/thesisAppProcess/process/getUserProfile.php", {
			'userID': localStorage.getItem("userID")
		}, {
			headers : {
		        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		    }
		}).then(function(response) {
			$scope.userFullName = response.data[0].firstname + " " + response.data[0].middlename.charAt(0) + ". " + response.data[0].lastname;
			$scope.userPosition = response.data[0].position;
		});
	}

	$scope.getUserProfileTemp = function() {
		$http.post("http://localhost/thesisAppProcess/process/getUserProfile.php", {
			'userID': 2
		}, {
			headers : {
		        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		    }
		}).then(function(response) {
			$scope.userFullName = response.data[0].firstname + " " + response.data[0].middlename.charAt(0) + ". " + response.data[0].lastname;
			$scope.userPosition = response.data[0].position;
			$scope.userImage = response.data[0].image;
		});
	}

	$scope.ministryInterval;

	$scope.getMinistryInterval = function() {
		$scope.ministryInterval = setInterval($scope.getMinistry,500);
	}

	$scope.getMinistry = function() {
		$http.get("http://localhost/thesisAppProcess/process/getMinistry.php")
		.then(function(data) {
			$scope.ministry = data.data;
			// if ($scope.ministry.length > 0) {
			// 	document.getElementById("ministryData").style.display = "none";
			// } else {
			// 	document.getElementById("ministryData").style.display = "block";
			// }
			console.log($scope.ministry);
		});
	}

	$scope.addMinistry = function() {
		if ($scope.ministryName == "" || $scope.ministryName == undefined) {
			document.getElementById("ministryField").style.opacity = "1";
			$(".bodyContainer #rightContainer #ministryNameInput").addClass("shakeObject");
		} else {
			$http.post("http://localhost/thesisAppProcess/process/addMinistry.php", {
				'name': $scope.ministryName,
				'mission': $scope.ministryMission,
				'vision': $scope.ministryVision,
				'id': $scope.ministryID,
				'btn': $scope.addMinistryBtn
			}, {
				headers : {
			        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			    }
			}).then(function(response) {
				if (response.data == 'Success') {
					document.getElementById("systemResponse").innerHTML = "SUCCESS";
					document.getElementById("systemResponse").style.color = "green";
					document.getElementById("success").style.display = "block";
					document.getElementById("error").style.display = "none";
					$(".addMinistryModal").fadeIn();
				} else {
					document.getElementById("systemResponse").innerHTML = "ERROR";
					document.getElementById("systemResponse").style.color = "red";
					document.getElementById("success").style.display = "none";
					document.getElementById("error").style.display = "block";
					$(".addMinistryModal").fadeIn();
				}
				$scope.ministryName = null;
				$scope.ministryMission = null;
				$scope.ministryVision = null;
				$scope.addMinistryBtn = "ADD";
				document.getElementById("ministryField").style.opacity = "0";
				$(".bodyContainer #rightContainer #ministryNameInput").removeClass("shakeObject");

				$scope.getMinistry();
			});	
		}	
	}

	$scope.viewMinistry = function(name,vision,mission) {
		$(".viewMinistryModal").fadeIn();
		$(".main-wrapper").css({"-webkit-filter": "blur(2px)"});

		console.log(name);
		document.getElementById("ministryNamessss").innerHTML = name + " Ministry";
		document.getElementById("missionContent").innerHTML = mission;
		document.getElementById("visionContent").innerHTML = vision;
	}

	$scope.updateMinistry = function(id,name,mission,vision) {
		$scope.addMinistryBtn = "UPDATE";
		$scope.ministryID = id;
		$scope.ministryName = name;
		$scope.ministryMission = mission;
		$scope.ministryVision = vision;
	}

	$scope.saveID = function(id) {
		window.localStorage.setItem("del", id);
		$('.confirmQuitModal').fadeIn();
	}

	$scope.deleteMinistry = function() {
		var id = window.localStorage.getItem("del");
		$http.post("http://localhost/thesisAppProcess/process/deleteMinistry.php", {
			'id': id
		}, {
			headers : {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		}).then(function(response) {
			if (response.data == 'Success') {
				document.getElementById("systemResponse").innerHTML = "SUCCESS";
				document.getElementById("systemResponse").style.color = "green";
				document.getElementById("success").style.display = "block";
				document.getElementById("error").style.display = "none";
				$('.confirmQuitModal').hide();
				$('.addMinistryModal').fadeIn();
			} else {
				document.getElementById("systemResponse").innerHTML = "ERROR";
				document.getElementById("systemResponse").style.color = "red";
				document.getElementById("success").style.display = "none";
				document.getElementById("error").style.display = "block";
				$('.confirmQuitModal').hide();
				$('.addMinistryModal').fadeIn();
			}
		});
	}

	$scope.pastorImage = "logo.png";
	$scope.churchImage = "agLogo.png";
	$scope.eventImage = "agLogo.png";

	$scope.fileSelected = function(element) {
		$scope.pastorImage = element.files[0].name;
		$scope.churchImage = element.files[0].name;
		$scope.eventImage = element.files[0].name;

		var fd = new FormData();
	    fd.append("file", element.files[0]);

	    $http.post('../uploadImageProcess/uploadImage.php', fd, {
	        withCredentials: true,
	        headers: {'Content-Type': undefined, 'Process-Data': false },
	        transformRequest: angular.identity
	    }).then(function(response) {
	    	console.log(response.data);
	    });
	}

	$scope.addPastor = function() {
		$scope.pastorBday = new Date($scope.pastorMM + "-" + $scope.pastorDD + "-" + $scope.pastorYYYY);
		$scope.pastorBday.setDate($scope.pastorBday.getDate() + 1);
		if ($scope.pastorFname == "" || $scope.pastorFname == undefined) {
			$(".bodyContainer #rightContainer #addPastors #firstname").addClass("shakeObject");
			document.getElementById("pastorEmptyField").style.opacity = "1";
		} else if ($scope.pastorMname == "" || $scope.pastorMname == undefined) {
			$(".bodyContainer #rightContainer #addPastors #middlename").addClass("shakeObject");
			document.getElementById("pastorEmptyField").style.opacity = "1";
		} else if ($scope.pastorLname == "" || $scope.pastorLname == undefined) {
			$(".bodyContainer #rightContainer #addPastors #lastname").addClass("shakeObject");
			document.getElementById("pastorEmptyField").style.opacity = "1";
		} else if ($scope.pastorAddress == "" || $scope.pastorAddress == undefined) {
			$(".bodyContainer #rightContainer #addPastors #address").addClass("shakeObject");
			document.getElementById("pastorEmptyField").style.opacity = "1";
		} else if ($scope.pastorContact == "" || $scope.pastorContact == undefined) {
			$(".bodyContainer #rightContainer #addPastors #contact").addClass("shakeObject");
			document.getElementById("pastorEmptyField").style.opacity = "1";
		}  else if ($scope.pastorMM == "" || $scope.pastorMM == undefined) {
			$(".bodyContainer #rightContainer #addPastors #month").addClass("shakeObject");
			document.getElementById("pastorEmptyField").style.opacity = "1";
		}  else if ($scope.pastorDD == "" || $scope.pastorDD == undefined) {
			$(".bodyContainer #rightContainer #addPastors #day").addClass("shakeObject");
			document.getElementById("pastorEmptyField").style.opacity = "1";
		}  else if ($scope.pastorYYYY == "" || $scope.pastorYYYY == undefined) {
			$(".bodyContainer #rightContainer #addPastors #year").addClass("shakeObject");
			document.getElementById("pastorEmptyField").style.opacity = "1";
		}  else if ($scope.pastorGender == "" || $scope.pastorGender == undefined) {
			$(".bodyContainer #rightContainer #addPastors #gender").addClass("shakeObject");
			document.getElementById("pastorEmptyField").style.opacity = "1";
		} else {
			$http.post("http://localhost/thesisAppProcess/process/addPastor.php", {
				'fname': $scope.pastorFname,
				'mname': $scope.pastorMname,
				'lname': $scope.pastorLname,
				'address': $scope.pastorAddress,
				'contact': $scope.pastorContact,
				'image': $scope.pastorImage,
				'gender': $scope.pastorGender,
				'bday': $scope.pastorBday,
				'btn': $scope.pastorAddBtn,
				'id': $scope.pastorID
			}, {
				headers : {
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				}
			}).then(function(response) {
				if (response.data == 'Success') {
					document.getElementById("systemResponse").innerHTML = "SUCCESS";
					document.getElementById("systemResponse").style.color = "green";
					document.getElementById("success").style.display = "block";
					document.getElementById("error").style.display = "none";
					$('.confirmQuitPastorModal').hide();
					$('.addPastorModal').fadeIn();

					$(".bodyContainer #rightContainer #addPastors #firstname").removeClass("shakeObject");
					$(".bodyContainer #rightContainer #addPastors #middlename").removeClass("shakeObject");
					$(".bodyContainer #rightContainer #addPastors #lastname").removeClass("shakeObject");
					$(".bodyContainer #rightContainer #addPastors #address").removeClass("shakeObject");
					$(".bodyContainer #rightContainer #addPastors #contact").removeClass("shakeObject");
					$(".bodyContainer #rightContainer #addPastors #imgFile").removeClass("shakeObject");
					$(".bodyContainer #rightContainer #addPastors #pastorImageDiv").removeClass("shakeObject");
					$(".bodyContainer #rightContainer #addPastors #month").removeClass("shakeObject");
					$(".bodyContainer #rightContainer #addPastors #day").removeClass("shakeObject");
					$(".bodyContainer #rightContainer #addPastors #year").removeClass("shakeObject");
					$(".bodyContainer #rightContainer #addPastors #gender").removeClass("shakeObject");
					document.getElementById("pastorEmptyField").style.opacity = "0";
					document.getElementById('updatePastor').style.display = 'none';
					document.getElementById('output').style.display = 'none';
					$scope.pastorFname = null;
					$scope.pastorMname = null;
					$scope.pastorLname = null;
					$scope.pastorAddress = null;
					$scope.pastorContact = null;
					$scope.pastorGender = null;
					$scope.pastorMM = null;
					$scope.pastorDD = null;
					$scope.pastorYYYY = null;
					$scope.pastorAddBtn = "ADD";
					$scope.pastorID = null;
				} else {
					document.getElementById("systemResponse").innerHTML = "ERROR";
					document.getElementById("systemResponse").style.color = "red";
					document.getElementById("success").style.display = "none";
					document.getElementById("error").style.display = "block";
					$('.confirmQuitPastorModal').hide();
					$('.addPastorModal').fadeIn();
				}
			});
		}
	}

	$scope.pastorInterval;

	$scope.getPastorInterval = function() {
		$scope.pastorInterval = setInterval($scope.getPastor,500);
	}

	$scope.updatePastor = 'images/icon/logo.png';
	
	$scope.getPastor = function() {
		$http.get("http://localhost/thesisAppProcess/process/getPastor.php")
		.then(function(data) {
			$scope.pastor = data.data;
			if ($scope.pastor.length > 0) {
				document.getElementById("pastorData").style.display = "none";
			} else {
				document.getElementById("pastorData").style.display = "block";
			}
		});
	}

	$scope.updatePastors = function(id,fname,mname,lname,address,contact,gender,image,bday) {
		var x = bday.split('-');
		$scope.pastorFname = fname;
		$scope.pastorMname = mname;
		$scope.pastorLname = lname;
		$scope.pastorAddress = address;
		document.getElementById("contact").value = contact;
		$scope.pastorContact = contact;
		$scope.pastorYYYY = x[0];
		$scope.pastorGender = gender;
		var tempMM = x[1] - 1;
		$scope.pastorMM = "" + (tempMM + 1);
		var tempDD = x[2] - 1;
		$scope.pastorDD = "" + (tempDD + 1);
		document.getElementById("year").value = x[0];
		$scope.pastorAddBtn = "UPDATE";
		$scope.pastorID = id;
		$scope.pastorImage = image;
		$scope.updatePastor = "../uploadImages/" + image;
		document.getElementById("output").style.display = "none";
		document.getElementById("updatePastor").style.display = "block";
	}

	$scope.savePastorID = function(id) {
		window.localStorage.setItem("pastorID", id);
		$('.confirmQuitPastorModal').fadeIn();
	}

	$scope.deletePastor = function() {
		var id = window.localStorage.getItem("pastorID");
		console.log(id);
		$http.post("http://localhost/thesisAppProcess/process/deletePastor.php", {
			'id': id
		}, {
			headers : {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		}).then(function(response) {
			if (response.data == 'Success') {
				document.getElementById("systemResponse").innerHTML = "SUCCESS";
				document.getElementById("systemResponse").style.color = "green";
				document.getElementById("success").style.display = "block";
				document.getElementById("error").style.display = "none";
				$('.confirmQuitPastorModal').hide();
				$('.addPastorModal').fadeIn();
			} else {
				document.getElementById("systemResponse").innerHTML = "ERROR";
				document.getElementById("systemResponse").style.color = "red";
				document.getElementById("success").style.display = "none";
				document.getElementById("error").style.display = "block";
				$('.confirmQuitPastorModal').hide();
				$('.addPastorModal').fadeIn();
			}
		});
	}

	$scope.viewPastor = function(fname,mname,lname,address,contact,gender,image,bday) {
		$(".viewPastorModal").fadeIn();
		$(".main-wrapper").css({"-webkit-filter": "blur(2px)"});
		
		$scope.fullname = fname + " " + mname + " " + lname;
		$scope.pastorIMG = image;
		$scope.pasAddress = address;
		$scope.pasGender = gender;
		$scope.pasContact = contact;
		$scope.pasBday = bday;
	}

	$scope.printPastor = function() {
		window.open("", "_blank", "width=800,height=1000");
	}

	$scope.updateChurch = 'images/icon/logo.png';

	$scope.addChurch = function() {
		if ($scope.churchName == "" || $scope.churchName == undefined) {
			$(".bodyContainer #rightContainer #addChurches #churchName").addClass("shakeObject");
			document.getElementById("churchEmptyField").style.opacity = "1";
		} else if ($scope.churchAddress == "" || $scope.churchAddress == undefined) {
			$(".bodyContainer #rightContainer #addChurches #churchAddress").addClass("shakeObject");
			document.getElementById("churchEmptyField").style.opacity = "1";
		} else if ($scope.churchHostPastor == "" || $scope.churchHostPastor == undefined) {
			$(".bodyContainer #rightContainer #addChurches #hostPastor").addClass("shakeObject");
			document.getElementById("churchEmptyField").style.opacity = "1";
		} else if ($scope.churchType == "" || $scope.churchType == undefined) {
			$(".bodyContainer #rightContainer #addChurches #churchType").addClass("shakeObject");
			document.getElementById("churchEmptyField").style.opacity = "1";
		} else if ($scope.churchMission == "" || $scope.churchMission == undefined) {
			$(".bodyContainer #rightContainer #addChurches #churchMission").addClass("shakeObject");
			document.getElementById("churchEmptyField").style.opacity = "1";
		} else if ($scope.churchVision == "" || $scope.churchVision == undefined) {
			$(".bodyContainer #rightContainer #addChurches #churchVision").addClass("shakeObject");
			document.getElementById("churchEmptyField").style.opacity = "1";
		} else {
			$http.post("http://localhost/thesisAppProcess/process/addChurch.php", {
				'name': $scope.churchName,
				'address': $scope.churchAddress,
				'pastorID': $scope.churchHostPastor,
				'type': $scope.churchType,
				'mission': $scope.churchMission,
				'vision': $scope.churchVision,
				'image': $scope.churchImage,
				'btn': $scope.churchAddBtn,
				'id': $scope.churchID
			}, {
				headers : {
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				}
			}).then(function(response) {
				if (response.data == 'Success') {
				//	console.log(response.data);
					document.getElementById("systemResponse").innerHTML = "SUCCESS";
					document.getElementById("systemResponse").style.color = "green";
					document.getElementById("success").style.display = "block";
					document.getElementById("error").style.display = "none";
					$('.confirmQuitChurchModal').hide();
					$('.addChurchModal').fadeIn();

					$(".bodyContainer #rightContainer #addChurches #churchName").removeClass("shakeObject");
					$(".bodyContainer #rightContainer #addChurches #churchAddress").removeClass("shakeObject");
					$(".bodyContainer #rightContainer #addChurches #hostPastor").removeClass("shakeObject");
					$(".bodyContainer #rightContainer #addChurches #churchType").removeClass("shakeObject");
					$(".bodyContainer #rightContainer #addChurches #churchMission").removeClass("shakeObject");
					$(".bodyContainer #rightContainer #addChurches #churchVision").removeClass("shakeObject");
					document.getElementById("churchEmptyField").style.opacity = "0";
					document.getElementById('updateChurch').style.display = 'none';
					document.getElementById('output').style.display = 'none';

					$scope.churchName = null;
					$scope.churchAddress = null;
					$scope.churchHostPastor = null;
					$scope.churchType = null;
					$scope.churchMission = null;
					$scope.churchVision = null;
					$scope.churchAddBtn = "ADD";
					$scope.churchID = null;	
				} else {
					document.getElementById("systemResponse").innerHTML = "ERROR";
					document.getElementById("systemResponse").style.color = "red";
					document.getElementById("success").style.display = "none";
					document.getElementById("error").style.display = "block";
					$('.confirmQuitChurchModal').hide();
					$('.addChurchModal').fadeIn();
				}

				$scope.getChurches();		
			});
		}	
	} 

	$scope.churchInterval;

	$scope.getChurchInterval = function() {
		$scope.churchInterval = setInterval($scope.getChurches,500);
	}

	$scope.getChurches = function() {
		$http.get("http://localhost/thesisAppProcess/process/getChurch.php")
		.then(function(data) {
			$scope.establishChurch = data.data.establishChurch;
			$scope.sovereignChurch = data.data.sovereignChurch;
			$scope.pioneeringChurch = data.data.pioneeringChurch;
			$scope.allChurch = data.data.allChurch;
			console.log($scope.allChurch);
			if ($scope.establishChurch.length > 0) {
				document.getElementById("establishData").style.display = "none";
			} else {
				document.getElementById("establishData").style.display = "block";
			} if ($scope.sovereignChurch.length > 0) {
				document.getElementById("sovereignData").style.display = "none";
			} else {
				document.getElementById("sovereignData").style.display = "block";
			} if ($scope.pioneeringChurch.length > 0) {
				document.getElementById("pioneeringData").style.display = "none";
			} else {
				document.getElementById("pioneeringData").style.display = "block";
			}
		});
	}

	$scope.updateChurches = function(id,name,address,status,mission,vision,pastorID,image) {
		$scope.churchName = name;
		$scope.churchAddress = address;
		$scope.churchHostPastor = pastorID;
		$scope.churchType = status;
		$scope.churchMission = mission;
		$scope.churchVision = vision;
		$scope.churchAddBtn = "UPDATE";
		$scope.churchID = id;
		$scope.churchImage = image;
		$scope.updateChurch = "../uploadImages/" + image;
		document.getElementById("output").style.display = "none";
		document.getElementById("updateChurch").style.display = "block";
	}

	$scope.saveChurchID = function(id) {
		window.localStorage.setItem("churchID", id);
		$('.confirmQuitChurchModal').fadeIn();
	}

	$scope.deleteChurch = function() {
		var id = window.localStorage.getItem("churchID");
		$http.post("http://localhost/thesisAppProcess/process/deleteChurch.php", {
			'id': id
		}, {
			headers : {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		}).then(function(response) {
			if (response.data == 'Success') {
				document.getElementById("systemResponse").innerHTML = "SUCCESS";
				document.getElementById("systemResponse").style.color = "green";
				document.getElementById("success").style.display = "block";
				document.getElementById("error").style.display = "none";
				$('.confirmQuitChurchModal').hide();
				$('.addChurchModal').fadeIn();
			} else {
				document.getElementById("systemResponse").innerHTML = "ERROR";
				document.getElementById("systemResponse").style.color = "red";
				document.getElementById("success").style.display = "none";
				document.getElementById("error").style.display = "block";
				$('.confirmQuitChurchModal').hide();
				$('.addChurchModal').fadeIn();
			}
		});
	}

	$scope.viewChurch = function(name,address,status,mission,vision,pastorID,image) {
		$(".viewChurchModal").fadeIn();
		$(".main-wrapper").css({"-webkit-filter": "blur(2px)"});

		$http.post("http://localhost/thesisAppProcess/process/getHostPastor.php", {
			'id': pastorID
		}, {
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		}).then(function(response) {
			console.log(response.data);
			$scope.viewChurchName = name;
			$scope.viewChurchAddress = address;
			$scope.viewChurchPastor = response.data[0].firstname + " " + response.data[0].middlename.charAt(0) + ". " + response.data[0].lastname;
			$scope.viewChurchStatus = status;
			$scope.viewChurchMission = mission;
			$scope.viewChurchVision = vision;
			$scope.viewChurchMembers = "382";
			$scope.viewChurchImage = image;
		});
	}

	$scope.addEvent = function() {
		$scope.dateStart = new Date($scope.dateStart);
		$scope.dateEnd = new Date($scope.dateEnd);
		if ($scope.eventAddBtn == "SUBMIT") {
			$scope.dateStart.setDate($scope.dateStart.getDate() + 1);
			$scope.dateEnd.setDate($scope.dateEnd.getDate() + 1);
		}
		if ($scope.dateStart == "" || $scope.dateStart == undefined) {
			$(".bodyContainer #rightContainer #createEvent-report #createPanel #dateStart").addClass("shakeObject");
			document.getElementById("eventEmptyField").style.opacity = "1";
		} else if ($scope.dateEnd == "" || $scope.dateEnd == undefined) {
			$(".bodyContainer #rightContainer #createEvent-report #createPanel #dateEnd").addClass("shakeObject");
			document.getElementById("eventEmptyField").style.opacity = "1";
		} else if ($scope.registrationFee == "" || $scope.registrationFee == undefined) {
			$(".bodyContainer #rightContainer #createEvent-report #createPanel #registrationFee").addClass("shakeObject");
			document.getElementById("eventEmptyField").style.opacity = "1";
		} else if ($scope.theme == "" || $scope.theme == undefined) {
			$(".bodyContainer #rightContainer #createEvent-report #createPanel #theme").addClass("shakeObject");
			document.getElementById("eventEmptyField").style.opacity = "1";
		} else if ($scope.address == "" || $scope.address == undefined) {
			$(".bodyContainer #rightContainer #createEvent-report #createPanel #address").addClass("shakeObject");
			document.getElementById("eventEmptyField").style.opacity = "1";
		} else if ($scope.speaker == "" || $scope.speaker == undefined) {
			$(".bodyContainer #rightContainer #createEvent-report #createPanel #speaker").addClass("shakeObject");
			document.getElementById("eventEmptyField").style.opacity = "1";
		} else if ($scope.host == "" || $scope.host == undefined) {
			$(".bodyContainer #rightContainer #createEvent-report #createPanel #host").addClass("shakeObject");
			document.getElementById("eventEmptyField").style.opacity = "1";
		} else if ($scope.ministries == "" || $scope.ministries == undefined) {
			$(".bodyContainer #rightContainer #createEvent-report #createPanel #ministries").addClass("shakeObject");
			document.getElementById("eventEmptyField").style.opacity = "1";
		} else {
			$http.post("http://localhost/thesisAppProcess/process/addEvent.php", {
				'dateStart': $scope.dateStart,
				'dateEnd': $scope.dateEnd,
				'fee': $scope.registrationFee,
				'theme': $scope.theme,
				'address': $scope.address,
				'speaker': $scope.speaker,
				'host': $scope.host,
				'ministry': $scope.ministries,
				'image': $scope.eventImage,
				'id': $scope.eventID,
				'btn': $scope.eventAddBtn

			}, {
				headers : {
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				}
			}).then(function(response) {
				if (response.data == 'Success') {
				//	console.log(response.data);
					document.getElementById("systemResponse").innerHTML = "SUCCESS";
					document.getElementById("systemResponse").style.color = "green";
					document.getElementById("success").style.display = "block";
					document.getElementById("error").style.display = "none";
					$('.confirmQuitEventModal').hide();
					$('.addEventModal').fadeIn();

					$(".bodyContainer #rightContainer #createEvent-report #createPanel #dateStart").removeClass("shakeObject");
					$(".bodyContainer #rightContainer #createEvent-report #createPanel #dateEnd").removeClass("shakeObject");
					$(".bodyContainer #rightContainer #createEvent-report #createPanel #registrationFee").removeClass("shakeObject");
					$(".bodyContainer #rightContainer #createEvent-report #createPanel #theme").removeClass("shakeObject");
					$(".bodyContainer #rightContainer #createEvent-report #createPanel #address").removeClass("shakeObject");
					$(".bodyContainer #rightContainer #createEvent-report #createPanel #speaker").removeClass("shakeObject");
					$(".bodyContainer #rightContainer #createEvent-report #createPanel #host").removeClass("shakeObject");
					$(".bodyContainer #rightContainer #createEvent-report #createPanel #ministries").removeClass("shakeObject");
					document.getElementById("eventEmptyField").style.opacity = "0";
					document.getElementById('updateEvent').style.display = 'none';
					document.getElementById('output').style.display = 'none';

					$scope.dateStart = null;
					$scope.dateEnd = null;
					document.getElementById("dateEnd").value = null;
					$scope.registrationFee = null;
					$scope.theme = null;
					$scope.address = null;
					$scope.speaker = null;
					$scope.host = null;
					$scope.ministries = null;
					$scope.eventImage = null;
					$scope.eventID = null;
					$scope.eventAddBtn = "SUBMIT";
				} else {
					document.getElementById("systemResponse").innerHTML = "ERROR";
					document.getElementById("systemResponse").style.color = "red";
					document.getElementById("success").style.display = "none";
					document.getElementById("error").style.display = "block";
					$('.confirmQuitEventModal').hide();
					$('.addEventModal').fadeIn();
				}
				$scope.getEvents();
			});
		}
	}

	$scope.eventInterval;

	$scope.getEventInterval = function() {
		$scope.eventInterval = setInterval($scope.getEvents,500);
	}

	$scope.getEvents = function() {
		$http.get("http://localhost/thesisAppProcess/process/getEvent.php")
		.then(function(datas) {

			$scope.hostchurch = [];
			$scope.eventMinistry = [];
			$scope.event = [];
			$scope.eventApprove = [];
			$scope.eventActive = [];
			$scope.event2 = [];
			$scope.eventData = datas.data.eventData;
			$scope.eventApproveData = datas.data.eventApproveData;
			$scope.eventActiveData = datas.data.eventActiveData;
			$scope.eventData2 = datas.data.eventData2;
			$scope.ministryData = datas.data.ministryData;
			$scope.churchData = datas.data.churchData;
			var ministryID = [];
			var hostID = [];
			var ministryID2 = [];
			var hostID2 = [];
			var ministryIDApprove = [];
			var hostIDApprove = [];
			var ministryIDActive = [];
			var hostIDActive = [];

			if ($scope.eventData.length == 0) {
				$(".eventData").show();
			} else {
				$(".eventData").hide();
				for (var i = 0; i < datas.data.eventData.length; i++) {
					ministryID[i] = $scope.eventData[i].ministryID;
					hostID[i] = datas.data.eventData[i].hostChurch;
				}
				var tempMinistry = "";
					var tempHost = "";
				for (var j = 0; j < $scope.eventData.length; j++) {
					
					for (var i = 0; i < $scope.ministryData.length; i++) {
						if ($scope.ministryData[i].id == ministryID[j]) {
							tempMinistry = $scope.ministryData[i].name;
							break;
						}
					}

					for (var x = 0; x < $scope.churchData.length; x++) {
						 if ($scope.churchData[x].id == hostID[j]) {
							tempHost = $scope.churchData[x].name;
							break;
						}
					}

					var id = $scope.eventData[j].id;
					var dateStart = $scope.eventData[j].dateStart;
					var dateEnd = $scope.eventData[j].dateEnd;
					var fee = $scope.eventData[j].registrationFee;
					var theme = $scope.eventData[j].theme;
					var address = $scope.eventData[j].address;
					var speaker = $scope.eventData[j].speaker;
					var image = $scope.eventData[j].image;
					var status = $scope.eventData[j].status;
					var approve = $scope.eventData[j].approve;
					$scope.event.push({
						'id':id,
						'dateStart':dateStart,
						'dateEnd':dateEnd,
						'fee':fee,
						'theme':theme,
						'address':address,
						'speaker':speaker,
						'hostChurch':tempHost,
						'ministry':tempMinistry,
						'status': status,
						'approve':approve,
						'image':image
					});
				}
			}

		// ----- PROPOSE EVENT -------
			if ($scope.eventData2.length == 0) {
				$(".eventData2").show();
				$(".eventRequest").show();
			} else {
				$(".eventData2").hide();
				$(".eventRequest").hide();
				for (var i = 0; i < datas.data.eventData2.length; i++) {
					ministryID2[i] = $scope.eventData2[i].ministryID;
					hostID2[i] = datas.data.eventData2[i].hostChurch;
				}
				var tempMinistryPropose = "";
					var tempHostPropose = "";
				for (var j = 0; j < $scope.eventData2.length; j++) {
					
					for (var i = 0; i < $scope.ministryData.length; i++) {
						if ($scope.ministryData[i].id == ministryID2[j]) {
							tempMinistryPropose = $scope.ministryData[i].name;
							break;
						}
					}

					for (var x = 0; x < $scope.churchData.length; x++) {
						 if ($scope.churchData[x].id == hostID2[j]) {
							tempHostPropose = $scope.churchData[x].name;
							break;
						}
					}

					var id = $scope.eventData2[j].id;
					var dateStart = $scope.eventData2[j].dateStart;
					var dateEnd = $scope.eventData2[j].dateEnd;
					var fee = $scope.eventData2[j].registrationFee;
					var theme = $scope.eventData2[j].theme;
					var address = $scope.eventData2[j].address;
					var speaker = $scope.eventData2[j].speaker;
					var image = $scope.eventData2[j].image;
					var status = $scope.eventData2[j].status;
					var approve = $scope.eventData2[j].approve;
					$scope.event2.push({
						'id':id,
						'dateStart':dateStart,
						'dateEnd':dateEnd,
						'fee':fee,
						'theme':theme,
						'address':address,
						'speaker':speaker,
						'hostChurch':tempHostPropose,
						'ministry':tempMinistryPropose,
						'status': status,
						'approve':approve,
						'image':image,
						'ministryID': ministryID2[j],
						'hostID': hostID2[j]
					});

				}
			}

			// ------ APPROVE EVENT ------
			if ($scope.eventApproveData.length == 0) {
				$(".eventApproveData").show();
			} else {
				$(".eventApproveData").hide();
				for (var i = 0; i < datas.data.eventApproveData.length; i++) {
					ministryIDApprove[i] = $scope.eventApproveData[i].ministryID;
					hostIDApprove[i] = datas.data.eventApproveData[i].hostChurch;
				}
				var tempMinistryApprove = "";
					var tempHostApprove = "";

				for (var j = 0; j < $scope.eventApproveData.length; j++) {
					
					for (var i = 0; i < $scope.ministryData.length; i++) {
						if ($scope.ministryData[i].id == ministryIDApprove[j]) {
							tempMinistryApprove = $scope.ministryData[i].name;
							break;
						}
					}

					for (var x = 0; x < $scope.churchData.length; x++) {
						 if ($scope.churchData[x].id == hostIDApprove[j]) {
							tempHostApprove = $scope.churchData[x].name;
							break;
						}
					}

					var id = $scope.eventApproveData[j].id;
					var dateStart = $scope.eventApproveData[j].dateStart;
					var dateEnd = $scope.eventApproveData[j].dateEnd;
					var fee = $scope.eventApproveData[j].registrationFee;
					var theme = $scope.eventApproveData[j].theme;
					var address = $scope.eventApproveData[j].address;
					var speaker = $scope.eventApproveData[j].speaker;
					var image = $scope.eventApproveData[j].image;
					var status = $scope.eventApproveData[j].status;
					var approve = $scope.eventApproveData[j].approve;
					$scope.eventApprove.push({
						'id':id,
						'dateStart':dateStart,
						'dateEnd':dateEnd,
						'fee':fee,
						'theme':theme,
						'address':address,
						'speaker':speaker,
						'hostChurch':tempHostApprove,
						'ministry':tempMinistryApprove,
						'status': status,
						'approve':approve,
						'image':image
					});
				}
			}

			// ------ ACTIVE EVENT ------
			if ($scope.eventActiveData.length == 0) {
				$(".noActiveEvent").show();
				$(".closeEvent").hide();
				$(".reportExpenses").hide();
				$(".reportActive").show();
				document.getElementById("eventProgram").style.height = "100%";
			} else {
				$(".noActiveEvent").hide();
				$(".closeEvent").show();
				
				$(".reportActive").hide();
				$(".reportExpenses").show();
				document.getElementById("eventProgram").style.height = "0px";
				for (var i = 0; i < datas.data.eventActiveData.length; i++) {
					ministryIDActive[i] = $scope.eventActiveData[i].ministryID;
					hostIDActive[i] = datas.data.eventActiveData[i].hostChurch;
				}
				var tempMinistryActive = "";
					var tempHostActive = "";

				for (var j = 0; j < $scope.eventActiveData.length; j++) {
					
					for (var i = 0; i < $scope.ministryData.length; i++) {
						if ($scope.ministryData[i].id == ministryIDActive[j]) {
							tempMinistryActive = $scope.ministryData[i].name;
							break;
						}
					}

					for (var x = 0; x < $scope.churchData.length; x++) {
						 if ($scope.churchData[x].id == hostIDActive[j]) {
							tempHostActive = $scope.churchData[x].name;
							break;
						}
					}

					var id = $scope.eventActiveData[j].id;
					$scope.activeID = id;
					var dateStart = $scope.eventActiveData[j].dateStart;
					var dateEnd = $scope.eventActiveData[j].dateEnd;
					var fee = $scope.eventActiveData[j].registrationFee;
					var theme = $scope.eventActiveData[j].theme;
					var address = $scope.eventActiveData[j].address;
					var speaker = $scope.eventActiveData[j].speaker;
					var image = $scope.eventActiveData[j].image;
					var status = $scope.eventActiveData[j].status;
					var approve = $scope.eventActiveData[j].approve;
					$scope.eventActive.push({
						'id':id,
						'dateStart':dateStart,
						'dateEnd':dateEnd,
						'fee':fee,
						'theme':theme,
						'address':address,
						'speaker':speaker,
						'hostChurch':tempHostActive,
						'ministry':tempMinistryActive,
						'status': status,
						'approve':approve,
						'image':image
					});
				}
			}

			if ($scope.event2.length == 0) {
				document.getElementById("reqEvent").style.display = "none";
			} else {
				document.getElementById("reqEvent").style.display = "block";
				$scope.requestedEvent = $scope.event2.length;
			}
				
		});
	}

	$scope.viewEvent = function(dateStart, dateEnd, fee, theme, address, speaker, hostChurch, ministry, image) {
		$scope.imageTarp = image;
		$scope.descStart = dateStart;
		$scope.descEnd = dateEnd;
		$scope.descFee = fee;
		$scope.descTheme = theme;
		$scope.descAddress = address;
		$scope.descSpeaker = speaker;
		$scope.descHost = hostChurch;
		$scope.descMinistry = ministry;

		$(".modalWrapper").fadeIn();
		$(".eventWrapper").show();
		$(".main-wrapper").css({"-webkit-filter": "blur(2px)"});
	}

	$scope.updateEvents = function(id,dateStart,dateEnd,fee,theme,address,speaker,hostID,ministryID,image) {
		$scope.dateStart = dateStart;
		document.getElementById("dateStart").valueAsDate = new Date(dateStart);
		$scope.dateEnd = dateEnd;
		document.getElementById("dateEnd").valueAsDate = new Date(dateEnd);
		$scope.registrationFee = parseInt(fee);
		$scope.theme = theme;
		$scope.address = address;
		$scope.speaker = speaker;
		$scope.host = hostID;
		$scope.ministries = ministryID;
		$scope.eventImage = image;
		$scope.updateEvent = "../uploadImages/" + image;
		document.getElementById("output").style.display = "none";
		document.getElementById("updateEvent").style.display = "block";
		$scope.eventID = id;
		$scope.eventAddBtn = "UPDATE";
	}

	$scope.saveEventID = function(id) {
		window.localStorage.setItem("eventID", id);
		$('.confirmQuitEventModal').fadeIn();
	}

	$scope.deleteEvent = function() {
		$http.post("http://localhost/thesisAppProcess/process/deleteEvent.php", {
			'id': window.localStorage.getItem("eventID")
		}, {
			headers : {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		}).then(function(response) {
			if (response.data == 'Success') {
				document.getElementById("systemResponse").innerHTML = "SUCCESS";
				document.getElementById("systemResponse").style.color = "green";
				document.getElementById("success").style.display = "block";
				document.getElementById("error").style.display = "none";
				$('.confirmQuitEventModal').hide();
				$('.addEventModal').fadeIn();
			} else {
				document.getElementById("systemResponse").innerHTML = "ERROR";
				document.getElementById("systemResponse").style.color = "red";
				document.getElementById("success").style.display = "none";
				document.getElementById("error").style.display = "block";
				$('.confirmQuitEventModal').hide();
				$('.addEventModal').fadeIn();
			}
		});
		$scope.getEvents();
	}

	$scope.viewAdminEvent = function(dateStart, dateEnd, fee, theme, address, speaker, hostChurch, ministry, image) {
		$scope.imageTarp = image;
		$scope.descStart = dateStart;
		$scope.descEnd = dateEnd;
		$scope.descFee = fee;
		$scope.descTheme = theme;
		$scope.descAddress = address;
		$scope.descSpeaker = speaker;
		$scope.descHost = hostChurch;
		$scope.descMinistry = ministry;

		$(".modalWrapper").fadeIn();
		$(".eventWrapper").show();
		$(".reportWrapper").hide();
		$(".requestWrapper").hide();
		$(".main-wrapper").css({"-webkit-filter": "blur(2px)"});
	}


	$scope.approveEvent = function(id) {
		$http.post("http://localhost/thesisAppProcess/process/approveEvent.php", {
			'id': id
		}, {
			headers : { 
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		}).then(function(response) {
			if (response.data == 'Success') {
				document.getElementById("systemResponse").innerHTML = "SUCCESS";
				document.getElementById("systemResponse").style.color = "green";
				document.getElementById("success").style.display = "block";
				document.getElementById("error").style.display = "none";
				$('.confirmQuitEventModal').hide();
				$('.addEventModal').fadeIn();
			} else {
				document.getElementById("systemResponse").innerHTML = "ERROR";
				document.getElementById("systemResponse").style.color = "red";
				document.getElementById("success").style.display = "none";
				document.getElementById("error").style.display = "block";
				$('.confirmQuitEventModal').hide();
				$('.addEventModal').fadeIn();
			}
		});
	}

	$scope.setEventActive = function(id) {
		$http.post("http://localhost/thesisAppProcess/process/setEventActive.php", {
			'id': id
		}, {
			headers : { 
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		}).then(function(response) {
			if (response.data == 'Success') {
				document.getElementById("systemResponse").innerHTML = "SUCCESS";
				document.getElementById("systemResponse").style.color = "green";
				document.getElementById("success").style.display = "block";
				document.getElementById("error").style.display = "none";
				$('.confirmQuitEventModal').hide();
				$('.addEventModal').fadeIn();
			} else {
				document.getElementById("systemResponse").innerHTML = "ERROR";
				document.getElementById("systemResponse").style.color = "red";
				document.getElementById("success").style.display = "none";
				document.getElementById("error").style.display = "block";
				$('.confirmQuitEventModal').hide();
				$('.addEventModal').fadeIn();
			}
		});
	}
	$scope.numberOfDays = 0;
	$scope.addProgram = function(id,dateStart,dateEnd,theme,speaker) {
		var start = new Date(dateStart);
		var end = new Date(dateEnd);
		var seconds = Math.abs(end - start) / 1000;
		var minutes = seconds / 60;
		var hours = minutes / 60;
		var days = hours / 24;
		var finalDays = days + 1;

		$http.post("http://localhost/thesisAppProcess/process/addEventDays.php", {
			'batchID': id,
			'days' : finalDays
		}, {
			headers : {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		}).then(function(response) {
			$http.post("http://localhost/thesisAppProcess/process/getEventDays.php", {
				'batchID': id,
			}, {
				headers : {
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				}
			}).then(function(datas) {
				$scope.eventDays = datas.data;
				$scope.numberOfDays = $scope.eventDays.length;
				$(".addProgramWrapper").fadeIn();
				$(".main-wrapper").css({"-webkit-filter": "blur(2px)"});

				$scope.addProgramTitle = theme;
				$scope.addstart = dateStart;
				$scope.addend = dateEnd;
				$scope.getActivities();
			});
		});
	}

	$scope.addActivities = function() {
		$http.post("http://localhost/thesisAppProcess/process/addActivities.php", {
			'day': $scope.programDay,
			'start': $scope.programStart,
			'end': $scope.programEnd,
			'desc': $scope.programDesc,
			'incharge': $scope.programIncharge
		}, {
			headers : {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		}).then(function(response) {
			alert(response.data);

			$scope.programDay = null;
			$scope.programStart = null;
			$scope.programEnd = null;
			$scope.programDesc = null;
			$scope.programIncharge = null;

			$scope.getActivities();
		});
	}

	$scope.getActivities = function() {	
		$http.get("http://localhost/thesisAppProcess/process/getActivities.php")
		.then(function(datas) {
			$scope.activity = datas.data;
			$scope.daysActivity = [];
			var z = [];
			
			for (var i = 1; i <= $scope.numberOfDays; i++) {
				var x  = document.getElementById("daysID"+i).innerHTML;

				z[i-1] = x;
				
			} window.localStorage.setItem("daysIDS",z); 
				$http.post("http://localhost/thesisAppProcess/process/getDaysActivities.php", {
					'days': z,
					'daysString': window.localStorage.getItem("daysIDS")
				}, {
					headers : {
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
					}
				}).then(function(datas) {
					for (var j = 0; j < datas.data.length; j++) {
						$scope.daysActivity[j] = datas.data[j];
					}
				});
		});
	}

	$scope.displayActivities = function() {
		//var z = window.localStorage.getItem("daysIDS").split(",");
		$http.get("http://localhost/thesisAppProcess/process/getActivitiesDays.php")
		.then(function(datas) {
			var ids = datas.data[0].daysID;
			 var z = ids.split(',');
			console.log(z);
			$scope.displayActivity = [];
			var z = datas.data[0].daysID.split(',');
			$http.post("http://localhost/thesisAppProcess/process/getDaysActivities.php", {
				'days': z,
				'daysString': 'none'
			}, {
				headers : {
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				}
			}).then(function(datas) {
				for (var j = 0; j < datas.data.length; j++) {
					$scope.displayActivity[j] = datas.data[j];
				} console.log($scope.displayActivity);
			});
		});
	}

	$scope.closeActiveEvent = function() {
		$http.post("http://localhost/thesisAppProcess/process/closeEventActive.php", {
			'id': parseInt(document.getElementById("activeEventID").innerHTML)
		}, {
			headers : { 
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		}).then(function(response) {
			$scope.getEvents();
		});
	}

	$scope.viewEventsModals = function() {
		$(".viewEventModal").fadeIn();
		$(".main-wrapper").css({"-webkit-filter": "blur(2px)"});
	}

	$scope.addReports = function() {
		$http.post("http://localhost/thesisAppProcess/process/addReports.php", {
			'id': $scope.activeID,
			'purpose': $scope.expensesPurpose,
			'price': $scope.expensesPrice
		}, {
			headers : {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		}).then(function(response) {
			alert(response.data);

			$scope.activeID = null;
			$scope.expensesPurpose = null;
			$scope.expensesPrice = null;
		});	
	}
});
