var app = angular.module("myApp", []);

app.controller("myCtrl", function($http, $scope) {
	$scope.user = [];
	$scope.addMinistryBtn = "ADD";
	$scope.pastorAddBtn = "ADD";
	$scope.churchAddBtn = "ADD";
	$scope.eventAddBtn = "SUBMIT";
	$scope.months = [];
	$scope.days = [];

	$scope.pastorImage = "logo.png";
	$scope.coordinatorImage = "logo.png";
	$scope.churchImage = "agLogo.png";
	$scope.eventImage = "becausehelives.jpg";
	$scope.profileImage = "";
	$scope.coverImage = "";

	$scope.fileSelected = function(element) {
		$scope.pastorImage = element.files[0].name;
		$scope.churchImage = element.files[0].name;
		$scope.eventImage = element.files[0].name;
		$scope.coordinatorImage = element.files[0].name;
		$scope.coverImage = element.files[0].name;

		var fd = new FormData();
	    fd.append("file", element.files[0]);

	    $http.post('http://localhost/thesisAppProcess/process/uploadImage.php', fd, {
	        withCredentials: true,
	        headers: {'Content-Type': undefined},
	        transformRequest: angular.identity
	    }).then(function(response) {
	    	console.log(response.data);
	    });
	}

	$scope.fileSelected2 = function(element) {
		$scope.profileImage = element.files[0].name;

		var fd = new FormData();
	    fd.append("file", element.files[0]);

	    $http.post('http://localhost/thesisAppProcess/process/uploadImage.php', fd, {
	        withCredentials: true,
	        headers: {'Content-Type': undefined},
	        transformRequest: angular.identity
	    }).then(function(response) {
	    	console.log(response.data);
	    });
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
			$(".main-container #admin-container #input-wrapper #adminUsername").addClass("shakeObject");
		} else if ($scope.adminPassword == undefined || $scope.adminPassword == "") {
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
			});
		} 
	}

	$scope.coordinatorLogin = function() {
		$scope.temp = [];
		if ($scope.coordinatorMinistry == undefined || $scope.coordinatorMinistry == "") {
			$(".main-container #coordinator-container #input-wrapper select").addClass("shakeObject");
		} else if ($scope.coordinatorPassword == undefined || $scope.coordinatorPassword == "") {
			$(".main-container #coordinator-container #input-wrapper input").addClass("shakeObject");
		} else {
			$http.post("http://localhost/thesisAppProcess/process/coordinatorLogin.php", {
				'ministry': $scope.coordinatorMinistry,
				'password': $scope.coordinatorPassword
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
					window.location.href="coordinator/dashboard.html";
				}
				$scope.coordinatorMinistry = '';
				$scope.coordinatorPassword = null;
			});
		}
	}

	$scope.logoutProcess = function() {
		$http.post("http://localhost/thesisAppProcess/process/logoutProcess.php", {
			'userID': parseInt(localStorage.getItem("userID"))
		}, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		}).then(function(response) {
			if (response.data == "Success") {
				window.location.href = "../index.html";
			} else {
				// do nothing here......
			}
		});
	}

	$scope.adminMessages = function() {
		$(".message-modal").fadeIn();
		$scope.coordinatorMessage();
		document.getElementById("total-unseen-message").style.display = "none";
	}

	$scope.otherProfile = function() {
		$(".message-modal").fadeIn();
		$scope.otherMessage();
		document.getElementById("total-unseen-message").style.display = "none";
	}

	$scope.friendsID = [];

	$scope.coordinatorMessage = function() {
		$http.get("http://localhost/thesisAppProcess/process/getCoordinator.php")
		.then(function(datas) {
			$scope.coordinatorMsg = datas.data;
			for (var i = 0; i < datas.data.length; i++) {
				var id = datas.data[i].id;
				$scope.friendsID.push({
					'friendID': id,
					'unseen': 0
				});
			} $scope.getUnseenMessage();
		});
	}

	$scope.otherMessage = function() {
		$http.post("http://localhost/thesisAppProcess/process/getOtherProfile.php", {
			'userID': localStorage.getItem('userID')
		}, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		}).then(function(datas) {
			$scope.coordinatorMsg = datas.data;
			for (var i = 0; i < datas.data.length; i++) {
				var id = datas.data[i].id;
				$scope.friendsID.push({
					'friendID': id,
					'unseen': 0
				});
			} $scope.getUnseenMessage();
		});
	}

	$scope.getUnseenMessage = function() {
		$http.post("http://localhost/thesisAppProcess/process/getUnseenMessage.php", {
			'userID': localStorage.getItem('userID')
		}, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		}).then(function(response) {
			$scope.totalUnseen = 0;
			if (response.data.length == 0) {
				// do nothing..
			} else {
				for (var i = 0; i < $scope.friendsID.length; i++) {
					var counter = 0;
					for (var j = 0; j < response.data.length; j++) {
						if ($scope.friendsID[i].friendID == response.data[j].userID) {
							counter++;
						}
					} $scope.friendsID[i].unseen = counter;
					$scope.totalUnseen += counter;
				} 
			} $scope.unseenMessage = $scope.friendsID;
		});
	}

	$scope.totalUnseenMessage = function() {
		$http.post("http://localhost/thesisAppProcess/process/getUnseenMessage.php", {
			'userID': localStorage.getItem('userID')
		}, {
			headers : {
		        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		    }
		}).then(function(response) {
			if (response.data.length == 0) {
				document.getElementById("total-unseen-message").style.display = "none";
			} else {
				document.getElementById("total-unseen-message").innerHTML = response.data.length;
				document.getElementById("total-unseen-message").style.display = "block";
			}
		});
	}

	$scope.done = false;
	$scope.getClientMessage = function(id) {
		$scope.done = false;
		$scope.messageLengthHolder = 0;
		clearInterval($scope.messageInterval);
		clearInterval($scope.seenInterval);

		$http.post("http://localhost/thesisAppProcess/process/getUserProfile.php", {
			'userID': id
		}, {
			headers : {
		        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		    }
		}).then(function(response) {
			$scope.friendFullname = response.data[0].firstname + " " + response.data[0].lastname;
			// $scope.clientPosition = response.data[0].position;
			$scope.friendImage = response.data[0].image;
			$scope.friendID = id;
			if (response.data[0].status == 0) {
				document.getElementById("friend-status").style.display = "none";
			} else {
				document.getElementById("friend-status").style.display = "block";
			}
			document.getElementById("conversation-here").style.display = 'none';

			$scope.getMessage();
			// $(".seen").fadeIn();
			$scope.messageLengthInterval();
			$scope.typingStatusInterval();
			$scope.seenMessageInterval();
		});
	}

	$scope.getMySeenMessage = function() {
		$http.post("http://localhost/thesisAppProcess/process/getMySeenMessages.php", {
			'userID': localStorage.getItem("userID"),
			'friendID': $scope.friendID
		}, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		}).then(function(datas) {
			// if (datas.data.length == 0) {
			// 	document.getElementById("seen").style.display = "block";
			// } else {
			// 	document.getElementById("seen").style.display = "none";
			// }
		});	
	}
	
	$scope.getMessage = function() {
		$http.post("http://localhost/thesisAppProcess/process/getBatchNumbers.php", {
			'userID': localStorage.getItem("userID"),
			'friendID': $scope.friendID
		}, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		}).then(function(datas) {
			$scope.batch = datas.data;
			$scope.selfID = localStorage.getItem("userID");

			$http.post("http://localhost/thesisAppProcess/process/getMessages.php", {
				'userID': localStorage.getItem("userID"),
				'friendID': $scope.friendID
			}, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				}
			}).then(function(data) {
				$scope.message = data.data;
				$scope.allMessage = [];
				$scope.messageType = [];
				$scope.messageTypeFinal = [];

				for (var i = 0; i < datas.data.length; i++) {
					$scope.batchMessage = [];

					for (var j = 0; j < data.data.length; j++) {
						
						if (datas.data[i].batchNumber == data.data[j].batchID) {
							$scope.batchMessage.push(data.data[j]);
						}
					}//console.log($scope.batchMessage);
					$scope.allMessage.push($scope.batchMessage);
				}

				for (var i = 0; i < $scope.allMessage.length; i++) {
					for (var j = 0; j < $scope.allMessage[i].length; j++) {
						if ($scope.allMessage[i].length == 1) {
							$scope.messageType.push("fl");
						} else {
							if (j == 0) {
								$scope.messageType.push("l")
							} else if (j == ($scope.allMessage[i].length-1)) {
								$scope.messageType.push("f")
							} else {
								$scope.messageType.push("m")
							}
						}
					}
				} 

				$scope.mesageLength = $scope.messageType.length
				for (var i = 0; i < $scope.messageType.length; i++) {
					$scope.mesageLength--;
					$scope.messageTypeFinal.push($scope.messageType[$scope.mesageLength]);
				} // console.log($scope.messageTypeFinal);
			});
		});	 $scope.getMySeenMessage();
	} 

	$scope.addMessage = function(batchNumber) {
		$scope.dated = new Date();
		$http.post("http://localhost/thesisAppProcess/process/addMessage.php", {
			'userID': localStorage.getItem("userID"),
			'friendID': $scope.friendID,
			'message': $scope.userMessage,
			'dated': $scope.dated,
			'batchNumber': batchNumber
		}, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		}).then(function(response) {
			$scope.getMessage();
			$scope.userMessage = null;
		});
	}

	// $scope.addChatting = function() {
	// 	$http.get("http://localhost/thesisAppProcess/process/getChatting.php")
	// 	.then(function(datas) {
	// 		if (datas.data.length == 0) {
	// 			$scope.chattingIDs = localStorage.getItem("userID") + "-" + $scope.friendID;
	// 			$http.post("http://localhost/thesisAppProcess/process/addChatting.php", {
	// 				'IDs': $scope.chattingIDs
	// 			}, {
	// 				headers: {
	// 					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
	// 				}
	// 			}).then(function(response) {
	// 				$scope.addBatchNumber(response.data[0].id);
	// 			});
	// 		} else {
	// 			$scope.hasChat = false;
	// 			$scope.chattingIDs1 = localStorage.getItem("userID") + "-" + $scope.friendID;
	// 			$scope.chattingIDs2 = $scope.friendID + "-" + localStorage.getItem("userID");

	// 			for (var i = 0; i < datas.data.length; i++) {
	// 				if (datas.data[i].chatingID == $scope.chattingIDs1 || datas.data[i].chatingID == $scope.chattingIDs2) {
	// 					$scope.chatID = datas.data[i].id;
	// 					$scope.hasChat = true;
	// 					break;
	// 				} 
	// 			}

	// 			if (!$scope.hasChat) {
	// 				$scope.chattingIDs = localStorage.getItem("userID") + "-" + $scope.friendID;
	// 				$http.post("http://localhost/thesisAppProcess/process/addChatting.php", {
	// 					'IDs': $scope.chattingIDs
	// 				}, {
	// 					headers: {
	// 						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
	// 					}
	// 				}).then(function(response) {
	// 					$scope.lastIndex = response.data.length - 1;
	// 					$scope.addBatchNumber(response.data[$scope.lastIndex].id);
	// 				});
	// 			} else {
	// 				$scope.addBatchNumber($scope.chatID);
	// 			}
	// 		}
	// 	});
	// }

	$scope.addBatchNumber = function() {
		if ($scope.friendID == undefined || $scope.friendID == null) {
			$('.coordinator-list-msg').addClass("shakeObject");
		} else if ($scope.userMessage == '' || $scope.userMessage == undefined) {
			$('.input-message').addClass("shakeObject");
		} else {
			$http.get("http://localhost/thesisAppProcess/process/getBatchNumber.php")
			.then(function(datas) {
				if (datas.data.length == 0) {
					$http.post("http://localhost/thesisAppProcess/process/addBatchNumber.php", {
						'userID': localStorage.getItem("userID"),
						'friendID': $scope.friendID
					}, {
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
						}
					}).then(function(response) {
						$scope.addMessage(response.data[0].batchNumber);
					});
				} else {
					if (datas.data[0].userID == localStorage.getItem("userID") && datas.data[0].friendID == $scope.friendID) {
						$scope.addMessage(datas.data[0].batchNumber);
					} else {
						$scope.otherFriend = true;
						for (var i = 0; i < datas.data.length; i++) {
							if (datas.data[i].userID == localStorage.getItem("userID") && datas.data[i].friendID == $scope.friendID) {
								$scope.addMessage(datas.data[i].batchNumber);
								$scope.otherFriend = false;
								break;
							} else if (datas.data[i].userID == $scope.friendID && datas.data[i].friendID == localStorage.getItem("userID")) {
								$http.post("http://localhost/thesisAppProcess/process/addBatchNumber.php", {
									'userID': localStorage.getItem("userID"),
									'friendID': $scope.friendID
								}, {
									headers: {
										'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
									}
								}).then(function(response) {
									$scope.addMessage(response.data[0].batchNumber);
								});
								$scope.otherFriend = false;
								break;
							}
						}

						if ($scope.otherFriend) {
							$http.post("http://localhost/thesisAppProcess/process/addBatchNumber.php", {
								'userID': localStorage.getItem("userID"),
								'friendID': $scope.friendID
							}, {
								headers: {
									'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
								}
							}).then(function(response) {
								$scope.addMessage(response.data[0].batchNumber);
							});
						} else {
							// do nothing...
						}	
					}
				}
			});	
		}
	}

	$scope.updateTypingStatus = function(typingStatus) {
		$http.post("http://localhost/thesisAppProcess/process/updateTypingStatus.php", {
			'status': typingStatus,
			'userID': localStorage.getItem("userID")
		}, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		}).then(function(response) {
			// console.log(response.data);
		});
	}

	// ----------------------- For Real Time Process ----------------------------------------------------
	$scope.nnumber_msg = 0;
	$scope.messageLengthHolder = 0;
	$scope.messageInterval = '';

	$scope.messageLengthInterval = function() {
		$scope.messageInterval = setInterval($scope.getMessageLength,500);
	}

	$scope.getMessageLength = function() {
		$http.get("http://localhost/thesisAppProcess/process/getMessageLength.php")
		.then(function(datas) {
			if ($scope.messageLengthHolder != datas.data.length) {
				$scope.getMessage();
				$scope.messageLengthHolder = datas.data.length;
			} else {
				// do nothing...
			}
		});
	}

	$scope.typingStatusInterval = function() {
		setInterval($scope.getTypingStatus,500);
	}

	$scope.getTypingStatus = function() {
		$http.post("http://localhost/thesisAppProcess/process/getTypingStatus.php", {
			'friendID': $scope.friendID
		}, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		}).then(function(response) {
			if (response.data[0].typing == 0) {
				document.getElementById("friend-typing").style.display = "none";
			} else {
				document.getElementById("friend-typing").style.display = "flex";
			}
		});
	}

	$scope.seenInterval = "";
	
	$scope.seenMessageInterval = function() {
		$scope.seenInterval = setInterval($scope.seen,500);
	}

	$scope.seen = function() {
		$http.post("http://localhost/thesisAppProcess/process/seenMessage.php", {
			'userID': localStorage.getItem("userID"),
			'friendID': $scope.friendID
		}, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		}).then(function(response) {
			if (response.data.length == 0) {
				for (var i = 0; i < $scope.friendsID.length; i++) {
					if ($scope.friendsID[i].friendID == $scope.friendID) {
						$scope.friendsID = [];
						if (!$scope.done) {
							document.getElementById("number-msg"+i).style.display = "none";
							$scope.done = true;
						}
					}
				}
			}
		});
	}

	$scope.hideSeenNumber = function(index) {
		document.getElementById("number-msg"+index).style.display = "none";
	}

	$scope.clearSeenInterval = function() {
		clearInterval($scope.seenInterval);
		$scope.totalUnseenMessage();
	}

	// ----------------------- End of Real Time Process ----------------------------------------------

	$scope.chooseMinistry = function() {
		$http.get("http://localhost/thesisAppProcess/process/getMinistry.php")
		.then(function(datas) {
			$scope.selectMinistry = datas.data;
		});
	}

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
			// document.getElementById("fname").innerHTML = response.data[0].firstname + "!";
			$scope.userImage = response.data[0].image;
			$scope.totalUnseenMessage();
		});
	}

	$scope.getMinistry = function() {
		$http.get("http://localhost/thesisAppProcess/process/getMinistry.php")
		.then(function(data) {
			$scope.ministry = data.data;

			var tr = "";
			var temp_tr = "";

			for (var i = 0; i < $scope.ministry.length; i++) {
				temp_tr = "<tr>" +
								"<td>" + (i+1) + "</td>" +
								"<td>" + $scope.ministry[i].name + "</td>" +
								"<td>" + 
									"<label onclick='viewMinistry("+i+")'>View</label>" +
									" <label onclick='updateMinistry("+i+")'>Update</label> " +
									"<label onclick='deleteMinistry("+i+")'>Delete</label>" +
								"</td>" +
						  "<tr>";
				tr += temp_tr;
			} document.getElementById("ministry-list").innerHTML = tr;
		});
	}

	$scope.getMinistryCoordinatorPage = function() {
		$http.get("http://localhost/thesisAppProcess/process/getMinistry.php")
		.then(function(data) {
			$scope.ministry = data.data;

			var tr = "";
			var temp_tr = "";

			for (var i = 0; i < $scope.ministry.length; i++) {
				temp_tr = "<tr>" +
								"<td>" + (i+1) + "</td>" +
								"<td>" + $scope.ministry[i].name + "</td>" +
								"<td>" + 
									"<label onclick='viewMinistry("+i+")'>View</label>" +
								"</td>" +
						  "<tr>";
				tr += temp_tr;
			} document.getElementById("ministry-list").innerHTML = tr;
		});
	}

	$scope.addMinistry = function(id,name,desc,btn) {
		if (name == "" || name == undefined) {
			document.getElementById("field-required").style.opacity = "1";
			$(".add-ministry-container #wrapper #ministryName").addClass("shakeObject");
		} else {
			$http.post("http://localhost/thesisAppProcess/process/addMinistry.php", {
				'id': id,
				'name': name,
				'desc': desc,
				'btn': btn
			}, {
				headers : {
			        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			    }
			}).then(function(response) {
				if (response.data == "Success") {
					if (btn == "ADD") {
						document.getElementById("response-data").innerHTML = "Added Successfully!";
					} else {
						document.getElementById("response-data").innerHTML = "Updated Successfully!";
					}

					$(".response-ministry-modal").fadeIn();
					document.getElementById("ministryName").value = null;
					document.getElementById("ministryDesc").value = null;
					document.getElementById("ministryID").value = null;
					document.getElementById("addMinistryBtn").innerHTML = "ADD";
					document.getElementById("field-required").style.opacity = "0";
					$(".add-ministry-container #wrapper #ministryName").removeClass();

					$http.get("http://localhost/thesisAppProcess/process/getMinistry.php")
					.then(function(data) {
						$scope.ministry = data.data;
						var tr = "";
						var temp_tr = "";

						for (var i = 0; i < $scope.ministry.length; i++) {
							temp_tr = "<tr>" +
											"<td>" + (i+1) + "</td>" +
											"<td>" + $scope.ministry[i].name + "</td>" +
											"<td>" + 
												"<label onclick='viewMinistry("+i+")'>View</label>" +
												" <label onclick='updateMinistry("+i+")'>Update</label> " +
												"<label onclick='deleteMinistry("+i+")'>Delete</label>" +
											"</td>" +
									  "<tr>";
							tr += temp_tr;
						}
						if 	(tr == "") {
							tr = "<td colspan='4' style='padding: 10px 0px 10px 0px; font-family: arial;'>No data!</td>";
						} document.getElementById("ministry-list").innerHTML = tr;
					});
				} else {
					$(".error-ministry-modal").fadeIn();
					document.getElementById("field-required").style.opacity = "0";
					$(".add-ministry-container #wrapper #ministryName").removeClass();
				}
			});
		}
	}

	$scope.deleteMinistry = function(id) {
		$http.post("http://localhost/thesisAppProcess/process/deleteMinistry.php", {
			'id': id
		}, {
			headers : {
		        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		    }
		}).then(function(response) {
			if (response.data == "Success") {
				document.getElementById("response-data").innerHTML = "Deleted Successfully!";
				$(".response-ministry-modal").delay(50).fadeIn();

				$http.get("http://localhost/thesisAppProcess/process/getMinistry.php")
				.then(function(data) {
					$scope.ministry = data.data;
					var tr = "";
					var temp_tr = "";

					for (var i = 0; i < $scope.ministry.length; i++) {
						temp_tr = "<tr>" +
										"<td>" + (i+1) + "</td>" +
										"<td>" + $scope.ministry[i].name + "</td>" +
										"<td>" + 
											"<label onclick='viewMinistry("+i+")'>View</label>" +
											" <label onclick='updateMinistry("+i+")'>Update</label> " +
											"<label onclick='deleteMinistry("+i+")'>Delete</label>" +
										"</td>" +
								  "<tr>";
						tr += temp_tr;
					} 

					if 	(tr == "") {
						tr = "<td colspan='4' style='padding: 10px 0px 10px 0px; font-family: arial;'>No data!</td>";
					} document.getElementById("ministry-list").innerHTML = tr;
				});
			} else {
				$(".error-ministry-modal").fadeIn();
			}
		});
	}

	$scope.addChurch = function(id,name,address,type,host,btn) {
		$http.post("http://localhost/thesisAppProcess/process/addChurch.php", {
			'name': name,
			'address': address,
			'pastorID': host,
			'type': type,
			'mission': "Yes",
			'vision': "Yes",
			'image': $scope.churchImage,
			'btn': btn,
			'id': id
		}, {
			headers : {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		}).then(function(response) {
			if (response.data == 'Success') {
				if (btn == "ADD") {
					document.getElementById("response-data").innerHTML = "Added Successfully!";
				} else {
					document.getElementById("response-data").innerHTML = "Updated Successfully!";
				}
				
				$(".response-ministry-modal").fadeIn();

				document.getElementById("churchID").value = null;
				document.getElementById("churchName").value = null;
				document.getElementById("churchAddress").value = null;
				document.getElementById("churchType").value = null;
				document.getElementById("churchPastor").value = null;
				document.getElementById("addChurchBtn").innerHTML = "ADD";
				document.getElementById('output').style.display = 'none';
				document.getElementById('photo-wrapper').style.border = '1px solid rgba(0,0,0,.3)';

				$http.get("http://localhost/thesisAppProcess/process/getChurch.php")
				.then(function(data) {
					var type = document.getElementById("deleteChurchType").value;
					if (type == 1 || type == "" || type == undefined) {
						$scope.church = data.data.allChurch;
					} else if (type == 2) {
						$scope.church = data.data.pioneeringChurch;
					} else if (type == 3) {
						$scope.church = data.data.sovereignChurch;
					} else if (type == 4) {
						$scope.church = data.data.establishChurch;
					}

					var tr = "";
					var temp_tr = "";

					for (var i = 0; i < $scope.church.length; i++) {
						temp_tr = "<tr>" +
										"<td>" + (i+1) + "</td>" +
										"<td>" + $scope.church[i].name + "</td>" +
										"<td>" + $scope.church[i].address + "</td>" +
										"<td>" + 
											"<label onclick='viewChurches("+i+")'>View Profile</label>" +
											" <label onclick='updateChurches("+i+","+type+")'>Update</label> " +
											"<label onclick='deleteChurches("+i+","+type+")'>Delete</label>" +
										"</td>" +
								  "<tr>";
						tr += temp_tr;
					}

					if 	(tr == "") {
						tr = "<td colspan='4' style='padding: 10px 0px 10px 0px; font-family: arial;'>No data!</td>";
					} document.getElementById("church-list").innerHTML = tr;

					$scope.getChurches();
				});
			} else {
				$(".error-ministry-modal").fadeIn();
			}	
		});
	} 

	$scope.viewChurchProfile = function(name,address,pastorID,status,mission,vision) {
		$http.post("http://localhost/thesisAppProcess/process/getHostPastor.php", {
			'id': pastorID
		}, {
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		}).then(function(response) {
			console.log(response.data);
			document.getElementById("church-name").innerHTML = name;
			document.getElementById("church-address").innerHTML = address;
			document.getElementById("church-pastor").innerHTML = "Ptr. " + response.data[0].firstname + " " + response.data[0].middlename.charAt(0) + ". " + response.data[0].lastname;
			document.getElementById("church-status").innerHTML = status + " Church";
			document.getElementById("church-members").innerHTML = "382 Members";

			if (mission == "Yes" || vision == "Yes") {
				document.getElementById("mission-content").innerHTML = "Not set.";
				document.getElementById("vision-content").innerHTML = "Not set.";
			} else {
				document.getElementById("mission-content").innerHTML = mission;
				document.getElementById("vision-content").innerHTML = vision;
			}	
		});
	}

	$scope.getChurches = function() {
		$http.get("http://localhost/thesisAppProcess/process/getChurch.php")
		.then(function(data) {
			$scope.establishChurch = data.data.establishChurch;
			$scope.sovereignChurch = data.data.sovereignChurch;
			$scope.pioneeringChurch = data.data.pioneeringChurch;
			$scope.allChurch = data.data.allChurch;
			//console.log($scope.allChurch);
			var tr = "";
			var temp_tr = "";
			var type = "All";
			for (var i = 0; i < $scope.allChurch.length; i++) {
				temp_tr = "<tr>" +
								"<td>" + (i+1) + "</td>" +
								"<td>" + $scope.allChurch[i].name + "</td>" +
								"<td>" + $scope.allChurch[i].address + "</td>" +
								"<td>" + 
									"<label onclick='viewChurches("+i+",1)'>View Profile</label>" +
									" <label onclick='updateChurches("+i+",1)'>Update</label> " +
									"<label onclick='deleteChurches("+i+",1)'>Delete</label>" +
								"</td>" +
						  "<tr>";
				tr += temp_tr;
			} 
			if 	(tr == "") {
				tr = "<td colspan='4' style='padding: 10px 0px 10px 0px; font-family: arial;'>No data!</td>";
			} document.getElementById("church-list").innerHTML = tr;
		});
	}

	$scope.getChurchesCoordinatorPage = function() {
		$http.get("http://localhost/thesisAppProcess/process/getChurch.php")
		.then(function(data) {
			$scope.establishChurch = data.data.establishChurch;
			$scope.sovereignChurch = data.data.sovereignChurch;
			$scope.pioneeringChurch = data.data.pioneeringChurch;
			$scope.allChurch = data.data.allChurch;
			//console.log($scope.allChurch);
			var tr = "";
			var temp_tr = "";
			var type = "All";
			for (var i = 0; i < $scope.allChurch.length; i++) {
				temp_tr = "<tr>" +
								"<td>" + (i+1) + "</td>" +
								"<td>" + $scope.allChurch[i].name + "</td>" +
								"<td>" + $scope.allChurch[i].address + "</td>" +
								"<td>" + 
									"<label onclick='viewChurches("+i+",1)'>View Profile</label>" +
								"</td>" +
						  "<tr>";
				tr += temp_tr;
			} 
			if 	(tr == "") {
				tr = "<td colspan='4' style='padding: 10px 0px 10px 0px; font-family: arial;'>No data!</td>";
			} document.getElementById("church-list").innerHTML = tr;
		});
	}

	$scope.getChurchesFilter = function(type) {
		$http.get("http://localhost/thesisAppProcess/process/getChurch.php")
		.then(function(data) {
			$scope.establishChurch = data.data.establishChurch;
			$scope.sovereignChurch = data.data.sovereignChurch;
			$scope.pioneeringChurch = data.data.pioneeringChurch;
			$scope.allChurch = data.data.allChurch;

			var tr = "";
			var temp_tr = "";

			if (type == "All") {
				for (var i = 0; i < $scope.allChurch.length; i++) {
					temp_tr = "<tr>" +
									"<td>" + (i+1) + "</td>" +
									"<td>" + $scope.allChurch[i].name + "</td>" +
									"<td>" + $scope.allChurch[i].address + "</td>" +
									"<td>" + 
										"<label onclick='viewChurches("+i+",1)'>View Profile</label>" +
									" <label onclick='updateChurches("+i+",1)'>Update</label> " +
									"<label onclick='deleteChurches("+i+",1)'>Delete</label>" +
									"</td>" +
							  "<tr>";
					tr += temp_tr;
				}
			} else if (type == "Pioneering") {
				for (var i = 0; i < $scope.pioneeringChurch.length; i++) {
					temp_tr = "<tr>" +
									"<td>" + (i+1) + "</td>" +
									"<td>" + $scope.pioneeringChurch[i].name + "</td>" +
									"<td>" + $scope.pioneeringChurch[i].address + "</td>" +
									"<td>" + 
										"<label onclick='viewChurches("+i+",2)'>View Profile</label>" +
										" <label onclick='updateChurches("+i+",2)'>Update</label> " +
										"<label onclick='deleteChurches("+i+",2)'>Delete</label>" +
									"</td>" +
							  "<tr>";
					tr += temp_tr;
				}
			} else if (type == "Sovereign") {
				for (var i = 0; i < $scope.sovereignChurch.length; i++) {
					temp_tr = "<tr>" +
									"<td>" + (i+1) + "</td>" +
									"<td>" + $scope.sovereignChurch[i].name + "</td>" +
									"<td>" + $scope.sovereignChurch[i].address + "</td>" +
									"<td>" + 
										"<label onclick='viewChurches("+i+",3)'>View Profile</label>" +
										" <label onclick='updateChurches("+i+",3)'>Update</label> " +
										"<label onclick='deleteChurches("+i+",3)'>Delete</label>" +
									"</td>" +
							  "<tr>";
					tr += temp_tr;
				}
			} else  if (type == "Establish") {
				for (var i = 0; i < $scope.establishChurch.length; i++) {
					temp_tr = "<tr>" +
									"<td>" + (i+1) + "</td>" +
									"<td>" + $scope.establishChurch[i].name + "</td>" +
									"<td>" + $scope.establishChurch[i].address + "</td>" +
									"<td>" + 
										"<label onclick='viewChurches("+i+",4)'>View Profile</label>" +
										" <label onclick='updateChurches("+i+",4)'>Update</label> " +
										"<label onclick='deleteChurches("+i+",4)'>Delete</label>" +
									"</td>" +
							  "<tr>";
					tr += temp_tr;
				}
			}

			if 	(tr == "") {
				tr = "<td colspan='4' style='padding: 10px 0px 10px 0px; font-family: arial;'>No data!</td>";
			} document.getElementById("church-list").innerHTML = tr;
		});
	}

	$scope.deleteChurch = function(id,type) {
		$http.post("http://localhost/thesisAppProcess/process/deleteChurch.php", {
			'id': id
		}, {
			headers : {
		        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		    }
		}).then(function(response) {
			if (response.data == "Success") {
				document.getElementById("response-data").innerHTML = "Deleted Successfully!";
				$(".response-ministry-modal").delay(50).fadeIn();

				$http.get("http://localhost/thesisAppProcess/process/getChurch.php")
				.then(function(data) {
					$scope.establishChurch = data.data.establishChurch;
					$scope.sovereignChurch = data.data.sovereignChurch;
					$scope.pioneeringChurch = data.data.pioneeringChurch;
					$scope.allChurch = data.data.allChurch;

					if (type == 1) {
						$scope.church = data.data.allChurch;
					} else if (type == 2) {
						$scope.church = data.data.pioneeringChurch;
					} else if (type == 3) {
						$scope.church = data.data.sovereignChurch;
					} else if (type == 4) {
						$scope.church = data.data.establishChurch;
					}

					var tr = "";
					var temp_tr = "";

					for (var i = 0; i < $scope.church.length; i++) {
						temp_tr = "<tr>" +
										"<td>" + (i+1) + "</td>" +
										"<td>" + $scope.church[i].name + "</td>" +
										"<td>" + $scope.church[i].address + "</td>" +
										"<td>" + 
											"<label onclick='viewChurches("+i+","+type+")'>View Profile</label>" +
											" <label onclick='updateChurches("+i+","+type+")'>Update</label> " +
											"<label onclick='deleteChurches("+i+","+type+")'>Delete</label>" +
										"</td>" +
								  "<tr>";
						tr += temp_tr;
					}

					if (tr == "") {
						tr = "<td colspan='4' style='padding: 10px 0px 10px 0px; font-family: arial;'>No data!</td>";
					} document.getElementById("church-list").innerHTML = tr; console.log(tr);
				});
			} else {
				$(".error-ministry-modal").fadeIn();
			}
		});
	}

	$scope.getPastor = function() {
		$http.get("http://localhost/thesisAppProcess/process/getOptionPastor.php")
		.then(function(data) {
			$scope.pastor = data.data;
			//console.log($scope.pastor.length);
			var option = "<option value=''>Choose here..</td>";

			if ($scope.pastor.length > 0) {
				for (var i = 0; i < $scope.pastor.length; i++) {
					var fullname = $scope.pastor[i].firstname + " " + $scope.pastor[i].lastname;
					option += "<option value='" + $scope.pastor[i].id + "'>" + fullname + "</option>";
				}
			} else {
				option += "<option>No available pastor! Add pastor first..</option>";
			}

			document.getElementById("churchPastor").innerHTML = option;
		});
	}

	$scope.displayPastor = function() {
		$http.get("http://localhost/thesisAppProcess/process/getPastor.php")
		.then(function(data) {
			$scope.pastors = data.data;

			var tr = "";
			var temp_tr = "";

			for (var i = 0; i < $scope.pastors.length; i++) {
				var fullname = $scope.pastors[i].firstname + " " + $scope.pastors[i].middlename.charAt(0) + ". " + $scope.pastors[i].lastname;
				temp_tr = "<tr>" +
								"<td>" + (i+1) + "</td>" +
								"<td>" + fullname + "</td>" +
								"<td>" + 
									"<label onclick='viewPastors("+i+")'>View Profile</label>" +
									" <label onclick='deletePastors("+i+")'>Delete</label>" +
								"</td>" +
						  "<tr>";
				tr += temp_tr;
			} 

			if 	(tr == "") {
				tr = "<td colspan='4' style='padding: 10px 0px 10px 0px; font-family: arial;'>No data!</td>";
			} document.getElementById("pastor-list").innerHTML = tr;
		});
	}

	$scope.displayPastorCoordinatorPage = function() {
		$http.get("http://localhost/thesisAppProcess/process/getPastor.php")
		.then(function(data) {
			$scope.pastors = data.data;

			var tr = "";
			var temp_tr = "";

			for (var i = 0; i < $scope.pastors.length; i++) {
				var fullname = $scope.pastors[i].firstname + " " + $scope.pastors[i].middlename.charAt(0) + ". " + $scope.pastors[i].lastname;
				temp_tr = "<tr>" +
								"<td>" + (i+1) + "</td>" +
								"<td>" + fullname + "</td>" +
								"<td>" + 
									"<label onclick='viewPastors("+i+")'>View Profile</label>" +
								"</td>" +
						  "<tr>";
				tr += temp_tr;
			} 

			if 	(tr == "") {
				tr = "<td colspan='4' style='padding: 10px 0px 10px 0px; font-family: arial;'>No data!</td>";
			} document.getElementById("pastor-list").innerHTML = tr;
		});
	}

	$scope.addPastor = function(id,fname,mname,lname,gender,address,contact,bday,btn,code) {
		$http.post("http://localhost/thesisAppProcess/process/addPastor.php", {
			'fname': fname,
			'mname': mname,
			'lname': lname,
			'address': address,
			'contact': contact,
			'image': $scope.pastorImage,
			'gender': gender,
			'bday': bday,
			'btn': btn,
			'id': id,
			'code': code
		}, {
			headers : {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		}).then(function(response) {
			if (response.data == 'Success') {
				if (btn == "ADD") {
					document.getElementById("response-data").innerHTML = "Added Successfully!";
				} else {
					document.getElementById("response-data").innerHTML = "Updated Successfully!";
				}
				
				$(".response-ministry-modal").fadeIn();

				document.getElementById("pastorID").value = null;
				document.getElementById("pastorFname").value = null;
				document.getElementById("pastorMname").value = null;
				document.getElementById("pastorLname").value = null;
				document.getElementById("pastorGender").value = null;
				document.getElementById("pastorAddress").value = null;
				document.getElementById("pastorContact").value = null;
				document.getElementById("displayCode").value = null;

				document.getElementById("pastorBdayMM").value = null;
				document.getElementById("pastorBdayDD").value = null;
				document.getElementById("pastorBdayYYYY").value = null;
				document.getElementById("addPastorBtn").innerHTML = "ADD";
				document.getElementById('outputPastor').style.display = 'none';
				document.getElementById('img-wrapper').style.border = '1px solid rgba(0,0,0,.3)';
			} else {
				$(".error-ministry-modal").fadeIn();
			}

			$scope.displayPastor();
		});
	}

	$scope.deletePastors = function(id) {
		$http.post("http://localhost/thesisAppProcess/process/deletePastor.php", {
			'id': id
		}, {
			headers : {
		        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		    }
		}).then(function(response) {
			if (response.data == "Success") {
				document.getElementById("response-data").innerHTML = "Deleted Successfully!";
				$(".response-ministry-modal").delay(50).fadeIn();

				$http.get("http://localhost/thesisAppProcess/process/getPastor.php")
				.then(function(data) {
					$scope.pastors = data.data;

					var tr = "";
					var temp_tr = "";

					for (var i = 0; i < $scope.pastors.length; i++) {
						var fullname = $scope.pastors[i].firstname + " " + $scope.pastors[i].middlename.charAt(0) + ". " + $scope.pastors[i].lastname;
						temp_tr = "<tr>" +
										"<td>" + (i+1) + "</td>" +
										"<td>" + fullname + "</td>" +
										"<td>" + 
											"<label onclick='viewPastors("+i+")'>View Profile</label>" +
											" <label onclick='deletePastors("+i+")'>Delete</label>" +
										"</td>" +
								  "<tr>";
						tr += temp_tr;
					} 

					if 	(tr == "") {
						tr = "<td colspan='4' style='padding: 10px 0px 10px 0px; font-family: arial;'>No data!</td>";
					} document.getElementById("pastor-list").innerHTML = tr;
				});
			} else {
				$(".error-ministry-modal").fadeIn();
			}
		});
	}

	$scope.getEvents = function() {
		$http.get("http://localhost/thesisAppProcess/process/getEvent.php")
		.then(function(datas) {
		// Display previous event...
			$scope.event = [];
			$scope.eventData = datas.data.eventData;
			var ministryID = [];
			var hostID = [];
			var tempMinistry = "";
			var tempHost = "";
			$scope.ministryData = datas.data.ministryData;
			$scope.churchData = datas.data.churchData;

			var tr = "";
			var temp_tr = "";

			for (var i = 0; i < datas.data.eventData.length; i++) {
				ministryID[i] = $scope.eventData[i].ministryID;
				hostID[i] = datas.data.eventData[i].hostChurch;
			}
			
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

			for (var y = 0; y < $scope.event.length; y++) {
				temp_tr = "<tr>" +
								"<td style='height:25px'>" + (y+1) + "</td>" +
								"<td style='height:25px'>" + $scope.event[y].theme + "</td>" +
								"<td style='height:25px'>" + $scope.event[y].ministry + "</td>" +
								"<td style='height:25px'>" + 
									"<label onclick='viewEvents("+y+")'>View</label>" +
									" <label onclick='viewReports("+y+")'>Reports</label>" +
								"</td>" +
						  "</tr>";
				tr += temp_tr;
			}
			if 	(tr == "") {
				tr = "<td colspan='4' style='padding: 10px 0px 10px 0px; font-family: arial;'>No data!</td>";
			} document.getElementById("event-list").innerHTML = tr;

		// End of previous event...


		// Display propose event...
			$scope.event2 = [];
			$scope.eventData2 = datas.data.eventData2;
			var ministryID2 = [];
			var hostID2 = [];
			var tempMinistryPropose = "";
			var tempHostPropose = "";

			var div = "";
			var temp_div = "";

			for (var i = 0; i < datas.data.eventData2.length; i++) {
				ministryID2[i] = $scope.eventData2[i].ministryID;
				hostID2[i] = datas.data.eventData2[i].hostChurch;
			}
			
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

			for (var y = 0; y < $scope.event2.length; y++) {
				var month = ['January','February','March','April','May','June','July','August','September','October','November','December'];
				var x = $scope.event2[y].dateStart.split("-");
				var dateStart = month[(parseInt(x[1]) - 1)] + " " + parseInt(x[2]) + ", " + x[0];
				temp_div = "<div id='wrapper'>" +
								"<div id='imgWrapper'>" +
									"<img src='../images/icon/profile-img.jpg'>" +
								"</div>" +
								"<p>" + $scope.event2[y].ministry + " Coordinator</p>" +
								"<br/>" +
								"<label><i>" + $scope.event2[y].theme + "</i></label>" +
								"<div id='dated'>" +
									"<p>" + dateStart + "</p><br/>" +
									"<label id='approve' onclick='approveEvent("+y+")'>Approve</label>" +
									"<label id='view' onclick='viewRequestEvent("+y+")'>View</label>" +
								"</div>" +
						  "</div>";
				div += temp_div;
			} 
			if 	(div == "") {
				div = "<center>" +
							"<p style='color: gray; padding-top: 20px;'>No event request...</p>" +
						"</center>";
			} document.getElementById("request-list").innerHTML = "<br>" + div;

		// End of propose event..
			
		});
	}

	$scope.getNumbersOfData = function() {
		$http.get("http://localhost/thesisAppProcess/process/getNumbersOfData.php")
		.then(function(datas) { 
			document.getElementById("ministry-number").innerHTML = datas.data.ministryNumber;
			document.getElementById("church-number").innerHTML = datas.data.churchNumber;
			document.getElementById("event-number").innerHTML = datas.data.eventActiveNumber + datas.data.eventPreviousNumber;
			document.getElementById("pastor-number").innerHTML = datas.data.pastorNumber;
		});
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
				$(".approve-event-modal").fadeIn();
				$scope.getEvents();
			} else {
				$scope.getEvents();
			}
		});
	}

	$scope.getEventForCalendar = function(stat,calendar,month,year) {
		$http.get("http://localhost/thesisAppProcess/process/getEventForCalendar.php")
		.then(function(datas) {
			var months = ['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'];
			var tr = "";
			var temp_tr = "";
			var mm = document.getElementById("eventMonth").innerHTML;
			var yyyy = document.getElementById("eventYear").innerHTML;
			var cd = new Date();

			var arr = [];
			for (var x = 0; x < datas.data.length; x++) {
				var dateStart = new Date(datas.data[x].dateStart);
				var dateEnd = new Date(datas.data[x].dateEnd);

				if (mm == months[dateStart.getMonth()]) {
					arr.push(datas.data[x]);
				}
			}

			var week = 0;
			var counter = 0;
			for (var x = 0; x < arr.length; x++) {
				var dateStart = new Date(arr[x].dateStart);
				var dateEnd = new Date(arr[x].dateEnd);
				var days = ((dateEnd - dateStart) / (1000 * 60 * 60 * 24)) + 1;
				var breakTD = false;

				if (month == months[dateStart.getMonth()] && year == dateStart.getFullYear()) {
					for (var i = 0; i < 6; i++) {
						var td = "";
						
						for (var j = 0; j < 7; j++) {
							if(dateStart.getDate() == calendar[i][j]) {
								var id = arr[x].id;
								if (arr[x].status == 1 && arr[x].approve == 1 && arr[x].active == 0) {
									td += "<td colspan='"+days+"'><p onclick='viewSelectedEventCalendar("+id+")' style='background: rgba(9,191,83,.8); display: block;'>"+arr[x].theme+"</p></td>";
								} else if (arr[x].status == 0 && arr[x].approve == 1 && arr[x].active == 1)  {
									td += "<td colspan='"+days+"'><p onclick='viewSelectedEventCalendar("+id+")' style='background: rgba(105,99,219,.8); display: block;'>"+arr[x].theme+"</p></td>";
								} else if (arr[x].status == 0 && arr[x].approve == 1 && arr[x].active == 0) {
									td += "<td colspan='"+days+"'><p onclick='viewSelectedEventCalendar("+id+")' style='background: rgba(241,112,61,.8); display: block;'>"+arr[x].theme+"</p></td>";
								}
								if (counter == 1) {
									week = 14;
								} else if (counter == 4) {
									week = 28;
								} else {
									week = 28;
								}
								breakTD = true;
								break;
							} else if (week != 0) {
								week--;
								continue;
							} else {
								td = td + "<td><p></p></td>";
							}
						} temp_tr = temp_tr + "<tr>" + td + "</tr>";
						if (breakTD) {break;}
						counter++;
					}
				}
			}  tr = temp_tr;
			 document.getElementById("displayEvent").innerHTML = tr;
		});
	}

	$scope.viewSelectedEventCalendar = function(id) {
		$http.post("http://localhost/thesisAppProcess/process/getSelectedEvent.php", {
			"id": id
		}, {
			headers : { 
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		}).then(function(datas) {
			document.getElementById("event-theme").innerHTML = datas.data[0].theme;
			
			$(".view-selected-event-modal").fadeIn();
		});	
	}

	$scope.getActiveEvent = function() {
		$http.get("http://localhost/thesisAppProcess/process/getActiveEvent.php")
		.then(function(datas) {
			$scope.html = "";
			if (datas.data.length > 0) {
				var dateEnd = new Date(datas.data[0].dateEnd);
				var x = new Date(dateEnd);
				var y = new Date();
				var end = x / (100 * 60 * 60 * 24);
				var current = y / (100 * 60 * 60 * 24);
				if (end < current) {
					$http.post("http://localhost/thesisAppProcess/process/closeEventActive.php", {
						'id': datas.data[0].id
					}, {
						headers : { 
							'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
						}
					}).then(function(response) {
						if (response.data == "Success") {
							myRoute('http://localhost/thesisAppProcess/admin/home.php');
						}
					});
				}
				
				$http.post("http://localhost/thesisAppProcess/process/postedBy.php", {
					'id': datas.data[0].ministryID
				}, {
					headers : { 
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
					}
				}).then(function(data) {
					var img = data.data[0].image;
					var fullname = data.data[0].firstname + " " + data.data[0].lastname;
					var position = data.data[0].position;

					window.localStorage.setItem("image",img);
					window.localStorage.setItem("fullname",fullname);
					window.localStorage.setItem("position",position);
				});

				$scope.months = ['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'];
				$scope.splitDateStart = datas.data[0].dateStart.split('-');
				$scope.splitDateEnd = datas.data[0].dateEnd.split('-');
				$scope.startDate = $scope.months[$scope.splitDateStart[1] - 1] + " " + $scope.splitDateStart[2] + ", " + $scope.splitDateStart[0];
				$scope.endDate = $scope.months[$scope.splitDateEnd[1] - 1] + " " + $scope.splitDateEnd[2] + ", " + $scope.splitDateEnd[0];

				$scope.html = '<div class="posted-by">' +
									'<div id="img-wrap">' +
										'<img src="../uploadImages/'+window.localStorage.getItem('image')+'">' +
									'</div>' +
									'<p id="coordinator-name">'+window.localStorage.getItem('fullname')+'</p><br>' +
									'<p id="coordinator-position">'+window.localStorage.getItem('position')+'</p>' +
								'</div>' +
								'<div class="tarp-wrapper">' +
									'<img src="../uploadImages/'+datas.data[0].image+'">' +
								'</div>' +
								'<div class="about-event-wrapper">' +
									'<div id="about-title">' +
										'<p>Theme:</p>' +
										'<p>Speaker:</p>' +
										'<p>Date:</p>' +
									'</div>' +
									'<div id="about-value">' +
										'<p>'+datas.data[0].theme+'</p>' +
										'<p>'+datas.data[0].speaker+'</p>' +
										'<p>'+$scope.startDate+ ' - ' +$scope.endDate+'</p>' +
									'</div> <hr>' +
									'<h6>348 delegates registered..</h6>' +
									'<u onclick="toggleProgram('+datas.data[0].id+')" id="program-view-btn">View program</u>' +
								'</div>';

			} else {
				$scope.html = "<br><br><center style='font-family:myFont2; font-size: 14px; font-weight: bold; color: rgba(0,0,0,.4);'>No active event!<br><br></center>";	
			} document.getElementById("active-event-wrapper").innerHTML = $scope.html;
		});
	}

	$scope.getApprovedEvent = function() {
		$http.get("http://localhost/thesisAppProcess/process/getApprovedEvent.php")
		.then(function(datas) {
			for (var i = 0; i < datas.data.length; i++) {
				var dateStart = new Date(datas.data[i].dateStart);
				var x = new Date(dateStart);
				var y = new Date();
				var start = (x.getMonth() + 1) + " " + x.getDate() + ", " + x.getFullYear();
				var current = (y.getMonth() + 1) + " " + y.getDate() + ", " + y.getFullYear();
				
				if (current == start) {

					$http.post("http://localhost/thesisAppProcess/process/startEventActive.php", {
						'id': datas.data[i].id
					}, {
						headers : { 
							'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
						}
					}).then(function(response) {
						if (response.data == "Success") {
							console.log(response.data);
							myRoute('http://localhost/thesisAppProcess/admin/home.php');
						}
					});
				}
			}
		});
	}

	$scope.getPreviousEvent = function() {
		$http.get("http://localhost/thesisAppProcess/process/getPreviousEvent.php")
		.then(function(datas) {
			$scope.html = "";
			$scope.arr = [false,false,false];
			$scope.months = ['Jan','Feb','Mar','Apr','May','Jul','Jul','Aug','Sept','Oct','Nov','Dec'];
			
			if (datas.data.length > 0) {
				for (var i = 0; i < datas.data.length; i++) {
					
					$scope.arr[i] = true;
				} for (var j = 0; j < 3; j++) {
					if($scope.arr[j]) {
						$scope.splitDateStart = datas.data[j].dateStart.split('-');
						$scope.splitDateEnd = datas.data[j].dateEnd.split('-');
						$scope.startDate = $scope.months[$scope.splitDateStart[1] - 1] + " " + $scope.splitDateStart[2];
						$scope.endDate = $scope.months[$scope.splitDateEnd[1] - 1] + " " + $scope.splitDateEnd[2] + ", " + $scope.splitDateEnd[0];
						
							$scope.html += '<div class="previous-wrapper">' +
												'<div id="previous-img-wrapper">' +
													'<img src="http://localhost/thesisAppProcess/uploadImages/'+datas.data[j].image+'">' +
												'</div>' +
												'<p>Theme: &nbsp;&nbsp; <strong>'+datas.data[j].theme+'</strong></p>' +
												'<p>Speaker: &nbsp;<strong>'+datas.data[j].speaker+'</strong></p>' +
												'<p>Venue: &nbsp;&nbsp; <strong>'+datas.data[j].address+'</strong></p>' +
												'<p>Date: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>'+$scope.startDate+ ' - ' +$scope.endDate+'</strong></p>' +
												'<p>Ministry: &nbsp;<strong id="ministry-name'+j+'"></strong></p>' +
											'</div>';
					} else {
						$scope.html += '<div class="previous-wrapper">' +
											'<br><br><br><center style="font-size: 12px; color: rgba(0,0,0,.4);">No available event!</center>';
										'</div>';
					}
				}
			} else {
				$scope.html = "<br><br><center style='font-family:myFont2; font-size: 14px; font-weight: bold; color: rgba(0,0,0,.4);'>No previous event!<br><br><br></center>";
			} document.getElementById("previous-event-wrapper").innerHTML = $scope.html;
			var counter = datas.data.length + 1;
		
			if (datas.data.length > 0) {
				for (var x = 0; x < datas.data.length; x++) {
					
					$http.post("http://localhost/thesisAppProcess/process/getMinistryWhere.php", {
						"id": datas.data[x].ministryID
					}, {
						headers : { 
							'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
						}
					}).then(function(response) {
						counter--;
						var id = "ministry-name";
						document.getElementById(id).innerHTML = response.data[0].name;

					});
				}
			}
		});
	}

	$scope.getAssignMinistry = function() {
		$http.get("http://localhost/thesisAppProcess/process/getAssignMinistry.php")
		.then(function(datas) {
			$scope.ministry = datas.data;

			var option = "";
			var temp_opt = "";

			for (var i = 0; i < $scope.ministry.length; i++) {
				option += '<option value="'+$scope.ministry[i].id+'">' + $scope.ministry[i].name + ' Ministry</option>';
			} document.getElementById("coordinator-select-ministry").innerHTML = "<option value=''>Choose here</option>" + option;
		});
	}

	$scope.addCoordinator = function(fname,mname,lname,password,number,ministry) {
		$scope.position = "";

		$http.post("http://localhost/thesisAppProcess/process/getMinistryWhere.php", {
			"id": ministry
		}, {
			headers : { 
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		}).then(function(datas) {
			$scope.position = datas.data[0].name + " Coordinator";
		
			$http.post("http://localhost/thesisAppProcess/process/addCoordinator.php", {
				"fname": fname,
				"mname": mname,
				"lname": lname,
				"password": password,
				"number": number,
				"ministry": ministry,
				"image": $scope.coordinatorImage,
				"position": $scope.position
			}, {
				headers : { 
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				}
			}).then(function(response) {
				if (response.data == "Success") {
					document.getElementById("add-coordinator-loading").style.display = "none";
					document.getElementById("label2").style.display = "block";
				}

				document.getElementById("coordinator-firstname").value = null;
				document.getElementById("coordinator-middlename").value = null;
				document.getElementById("coordinator-lastname").value = null;
				document.getElementById("coordinator-password").value = null;
				document.getElementById("coordinator-number").value = null;
				document.getElementById("coordinator-select-ministry").value = '';

				document.getElementById('upload-photo-msg').style.display = 'block';
				document.getElementById('coordinator-image').style.display = 'none';
			});
		});	
	}

	$scope.getCoordinatorInterval = "";
	$scope.x = 0;
	$scope.coordinatorInterval = function() {
		$scope.x = 0;
		$scope.getCoordinatorInterval = setInterval($scope.getCoordinator,100);
	}

	$scope.getCoordinator = function() {
		$http.get("http://localhost/thesisAppProcess/process/getCoordinator.php")
		.then(function(datas) {
			$scope.html = "";

			if ($scope.x == 5) {
				for (var i = 0; i < datas.data.length; i++) {
					$scope.html += '<div class="coordinator-wrapper" onclick="viewCoordinatorProfile('+datas.data[i].id+')">' +
										'<img src="http://localhost/thesisAppProcess/uploadImages/'+datas.data[i].image+'">' +
										'<p>'+datas.data[i].firstname+'</p>' +
									'</div>';
				}
				document.getElementById("coordinator-list").innerHTML = $scope.html;
				clearInterval($scope.getCoordinatorInterval);
			} $scope.x++;
		});
	}

	$scope.getProgram = function(id) {
		$http.post("http://localhost/thesisAppProcess/process/getEventDays.php", {
			'batchID': id
		}, {
			headers : {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		}).then(function(datas) {
			console.log(datas.data);
			if (datas.data.eventDays == undefined || datas.data.eventActivities == undefined) {
				// do nothing..
			} else {
				$scope.html = "";
				for (var i = 0; i < datas.data.eventActivities.length; i++) {
					$scope.html += '<div class="program-wrap">' +
										'<label id="day">Day '+(i+1)+'</label> <br><br>' +
										'<center>' +
											'<div id="div1">'; 

					for (var j = 0; j < datas.data.eventActivities[i].length; j++) {
						$scope.html += '<label>'+datas.data.eventActivities[i][j].startTime+' - '+datas.data.eventActivities[i][j].endTime+'&nbsp;&nbsp;....................................</label>';
					} $scope.html += '</div><div id="div2">';

					for (var j = 0; j < datas.data.eventActivities[i].length; j++) {
						$scope.html += '<label>'+datas.data.eventActivities[i][j].description+' ('+datas.data.eventActivities[i][j].inCharge+')</label><br>';
					} $scope.html += '</div></center></div>';
				} document.getElementById("active-event-program-wrapper").innerHTML = "<p>PROGRAMME</p>" + $scope.html;
			}
		});
	}

	$scope.getMinistryForEvent = function() {
		$http.get("http://localhost/thesisAppProcess/process/getMinistry.php")
		.then(function(datas) {
			$scope.ministry = datas.data;
			$scope.html = '<option value="">Choose here</option>';
			for(var i = 0; i < $scope.ministry.length; i++) {
				$scope.html += '<option value="'+$scope.ministry[i].id+'">'+$scope.ministry[i].name+' Ministry</option>';
			} document.getElementById("select-event-ministry").innerHTML = $scope.html;
		});
	}

	$scope.getChurchesForEvent = function() {
		$http.get("http://localhost/thesisAppProcess/process/getChurch.php")
		.then(function(data) {
			$scope.church = data.data.allChurch;
			$scope.html = '<option value="">Choose here</option>';
			for(var i = 0; i < $scope.church.length; i++) {
				$scope.html += '<option value="'+$scope.church[i].id+'">'+$scope.church[i].name+'</option>';
			} document.getElementById("select-event-church").innerHTML = $scope.html;
		});
	}

	$scope.addEvent = function(dateStart,dateEnd,fee,theme,venue,speaker,church,ministry,eventID,btn) {
		$scope.dateStart = new Date(dateStart);
		$scope.dateEnd = new Date(dateEnd);

		$http.post("http://localhost/thesisAppProcess/process/addEvent.php", {
			'dateStart': $scope.dateStart,
			'dateEnd': $scope.dateEnd,
			'fee': fee,
			'theme': theme,
			'address': venue,
			'speaker': speaker,
			'host': church,
			'ministry': ministry,
			'image': $scope.eventImage,
			'id': eventID,
			'btn': btn
		}, {
			headers : {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		}).then(function(response) {
			if (response.data == 1) {
				if (btn == "CREATE") {
					document.getElementById("response-data").innerHTML = "Created Successfully!";
				} else {
					document.getElementById("response-data").innerHTML = "Updated Successfully!";
				}
				$(".response-event-modal").fadeIn();

				document.getElementById("start-date").value = null;
				document.getElementById("end-date").value = null;
				document.getElementById("add-event-fee").value = null;
				document.getElementById("add-event-theme").value = null;
				document.getElementById("add-event-venue").value = null;
				document.getElementById("add-event-speaker").value = null;
				document.getElementById("select-event-church").value = null;
				document.getElementById("select-event-ministry").value = null;
				document.getElementById("eventID").value = null;
				document.getElementById("add-event-btn").innerHTML = "CREATED";
				document.getElementById('event-img').style.display = 'none';

				if (btn == "UPDATE") {
					$scope.getProposedEvents();
				}
			} else {
				// do nothing...
			}
		});
	}

	$scope.getProposedEvents = function() {
		$http.get("http://localhost/thesisAppProcess/process/getEvent.php")
		.then(function(datas) {
			$scope.event = [];
			var tr = "";
			var temp_tr = "";

			$scope.eventData2 = datas.data.eventData2;
			var ministryID2 = [];
			var hostID2 = [];
			var tempMinistryPropose = "";
			var tempHostPropose = "";

			var div = "";
			var temp_div = "";

			for (var i = 0; i < datas.data.eventData2.length; i++) {
				ministryID2[i] = $scope.eventData2[i].ministryID;
				hostID2[i] = datas.data.eventData2[i].hostChurch;
			}
			
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
				$scope.event.push({
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

			for (var y = 0; y < $scope.event.length; y++) {
				temp_tr = "<tr>" +
								"<td style='height:25px'>" + (y+1) + "</td>" +
								"<td style='height:25px'>" + $scope.event[y].theme + "</td>" +
								"<td style='height:25px'>" + $scope.event[y].ministry + "</td>" +
								"<td style='height:25px'>" + 
									"<label onclick='viewEvents("+y+")'>View</label>" +
									" <label onclick='editProposedEvent("+$scope.event[y].id+")'>Edit</label>" +
									" <label onclick='deleteProposedEvent("+$scope.event[y].id+")'>Delete</label>" +
								"</td>" +
						  "</tr>";
				tr += temp_tr;
			}
			if 	(tr == "") {
				tr = "<td colspan='4' style='padding: 10px 0px 10px 0px; font-family: arial;'>No data!</td>";
			} document.getElementById("event-list").innerHTML = tr;
			
		});
	}

	$scope.getApprovedEvents = function() {
		$http.get("http://localhost/thesisAppProcess/process/getEvent.php")
		.then(function(datas) {
			$scope.event = [];
			var tr = "";
			var temp_tr = "";

			$scope.eventApproveData = datas.data.eventApproveData;
			var ministryIDApprove = [];
			var hostIDApprove = [];
			var tempMinistryApprove = "";
			var tempHostApprove = "";

			for (var i = 0; i < datas.data.eventApproveData.length; i++) {
				ministryIDApprove[i] = $scope.eventApproveData[i].ministryID;
				hostIDApprove[i] = datas.data.eventApproveData[i].hostChurch;
			}
			
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
				$scope.event.push({
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


			$scope.eventActiveData = datas.data.eventActiveData;
			var ministryIDActive = [];
			var hostIDActive = [];
			var tempMinistryActive = "";
			var tempHostActive = "";

			for (var i = 0; i < datas.data.eventActiveData.length; i++) {
				ministryIDActive[i] = $scope.eventActiveData[i].ministryID;
				hostIDActive[i] = datas.data.eventActiveData[i].hostChurch;
			}
			
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
				var dateStart = $scope.eventActiveData[j].dateStart;
				var dateEnd = $scope.eventActiveData[j].dateEnd;
				var fee = $scope.eventActiveData[j].registrationFee;
				var theme = $scope.eventActiveData[j].theme;
				var address = $scope.eventActiveData[j].address;
				var speaker = $scope.eventActiveData[j].speaker;
				var image = $scope.eventActiveData[j].image;
				var status = $scope.eventActiveData[j].status;
				var approve = $scope.eventActiveData[j].approve;
				$scope.event.push({
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

			for (var y = 0; y < $scope.event.length; y++) {
				temp_tr = "<tr>" +
								"<td style='height:25px'>" + (y+1) + "</td>" +
								"<td style='height:25px'>" + $scope.event[y].theme + "</td>" +
								"<td style='height:25px'>" + $scope.event[y].ministry + "</td>" +
								"<td style='height:25px'>" + 
									"<label onclick='viewEvents("+y+")'>View</label>" +
									" <label onclick='addProgram("+y+")'>Add/View program</label>" +
								"</td>" +
						  "</tr>";
				tr += temp_tr;
			}
			if 	(tr == "") {
				tr = "<td colspan='4' style='padding: 10px 0px 10px 0px; font-family: arial;'>No data!</td>";
			} document.getElementById("event-list").innerHTML = tr;
		});
	}

	$scope.editProposedEvent = function(id) {
		$http.post("http://localhost/thesisAppProcess/process/getProposedEvent.php", {
			'id':id
		}, {
			headers : {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		}).then(function(datas) {
			$scope.eventImage = datas.data[0].image;
			document.getElementById("event-img").src = "../uploadImages/" + datas.data[0].image;
			document.getElementById("start-date").value = datas.data[0].dateStart;
			document.getElementById("end-date").value = datas.data[0].dateEnd;
			document.getElementById("add-event-theme").value = datas.data[0].theme;
			document.getElementById("add-event-speaker").value = datas.data[0].speaker;
			document.getElementById("add-event-venue").value = datas.data[0].address;
			document.getElementById("select-event-church").value = datas.data[0].hostChurch;
			document.getElementById("select-event-ministry").value = datas.data[0].ministryID;
			document.getElementById("add-event-fee").value = datas.data[0].registrationFee;
			document.getElementById("eventID").value = datas.data[0].id;
			document.getElementById("add-event-btn").innerHTML = "UPDATE";
			document.getElementById('event-img').style.display = 'block';
		});
	}

	$scope.deleteProposedEvent = function(id) {
		$http.post("http://localhost/thesisAppProcess/process/deleteEvent.php", {
			'id':id
		}, {
			headers : {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		}).then(function(reponse) {
			document.getElementById("response-data").innerHTML = "Deleted Successfully!";
			$(".response-event-modal").delay(50).fadeIn();

			$scope.getProposedEvents();
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
				$scope.eventDays = datas.data.eventDays;
				$scope.numberOfDays = $scope.eventDays.length;
				$scope.getActivities();
			});
		});
	}

	$scope.addActivities = function() {
		document.getElementById("addProgram-loader").style.display = "flex";
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
			if (response.data == "Success") {
				document.getElementById("addProgram-loader").style.display = "none";
				document.getElementById("program-success").style.display = "block";

				$scope.programDay = null;
				$scope.programStart = null;
				$scope.programEnd = null;
				$scope.programDesc = null;
				$scope.programIncharge = null;
			}

			$scope.getActivities();
		});
	}

	$scope.getActivities = function() {	
		document.getElementById("display-loader").style.display = "block";
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
				document.getElementById("display-loader").style.display = "none";
				for (var j = 0; j < datas.data.length; j++) {
					$scope.daysActivity[j] = datas.data[j];
				}
			});
		});
	}

	$scope.displayActivities = function() {
		$http.get("http://localhost/thesisAppProcess/process/getActivitiesDays.php")
		.then(function(datas) {
			var ids = datas.data[0].daysID;
			var z = ids.split(',');
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

	$scope.getSelectChurches = function() {
		$http.get("http://localhost/thesisAppProcess/process/getChurch.php")
		.then(function(data) {
			$scope.church = data.data.allChurch;
			$scope.html = '<option value="">Choose here</option>';
			for(var i = 0; i < $scope.church.length; i++) {
				$scope.html += '<option value="'+$scope.church[i].id+'">'+$scope.church[i].name+'</option>';
			}

			document.getElementById("register-church-delegate").innerHTML = $scope.html;
			document.getElementById("register-church-delegate2").innerHTML = $scope.html;
			// document.getElementById("register-church-delegate3").innerHTML = $scope.html;

			$scope.getPendingDelegates();
		});
	}

	$scope.getMembersByChurch = function(id) {
		$http.post("http://localhost/thesisAppProcess/process/getMembersByChurch.php", {
			'churchID': id
		}, {
			headers : {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		}).then(function(data) {
			$scope.membersByChurch = [];
			$scope.html = "";

			if (data.data.churchMember.length == 0) {
				$scope.html += '<tr>' +
									'<td colspan="3">No data!</td>' +
								'</tr>';
			} else {
				for (var i = 0; i < data.data.churchMember.length; i++) {
					$scope.registered = false;
					for (var j = 0; j < data.data.delegates.length; j++) {
						if (data.data.churchMember[i].id == data.data.delegates[j].memberID) {
							$scope.registered = true;
							break;
						}
					} 

					if (!$scope.registered) {
						$scope.membersByChurch.push(data.data.churchMember[i]);
					}
				}

				for (var x = 0; x < $scope.membersByChurch.length; x++) {
					$scope.html += '<tr>' +
										'<td>'+(x+1)+'</td>' +
										'<td>'+$scope.membersByChurch[x].firstname+' '+$scope.membersByChurch[x].lastname+'</td>' +
										'<td>' +
											'<input id="checkbox'+x+'" type="checkbox" value="'+$scope.membersByChurch[x].id+'" onclick="queueDelegates(this.value,'+x+')">' +
										'</td>' +
									'</tr>';
				}
			} document.getElementById("delegates-by-church").innerHTML = $scope.html;
		});
	}

	$scope.registerDelegates = function(ids,churchID) {
		document.getElementById("member-register-loader").style.display = "block";
		$http.post("http://localhost/thesisAppProcess/process/registerDelegates.php", {
			'ids': ids,
			'churchID': churchID
		}, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		}).then(function(response) {
			if (response.data == "Success") {
				document.getElementById("member-register-loader").style.display = "none";
				document.getElementById("member-register-success").style.display = "block";
			}
			$scope.getMembersByChurch(churchID);
		});
	}

	$scope.registerVisitor = function(churchID,fullname) {
		document.getElementById("visitor-register-loader").style.display = "block";
		$http.post("http://localhost/thesisAppProcess/process/registerVisitor.php", {
			'churchID': churchID,
			'fullname': fullname
		}, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		}).then(function(response) {
			if (response.data == "Success") {
				document.getElementById("visitor-register-loader").style.display = "none";
				document.getElementById("visitor-register-success").style.display = "block";

				document.getElementById("register-church-delegate2").value = "";
				document.getElementById("visitor-fullname").value = null;
			}
		});
	}

	$scope.getPendingDelegates = function() {
		$http.get("http://localhost/thesisAppProcess/process/getPendingDelegates.php")
		.then(function(data) {
			$scope.membersByChurch = [];
			$scope.html = "";

			if (data.data.delegates.length == 0) {
				document.getElementById("count-pending-delegates").style.opacity = "0";
				$scope.html += '<tr>' +
									'<td colspan="3">No data!</td>' +
								'</tr>';
			} else {
				document.getElementById("count-pending-delegates").innerHTML = data.data.delegates.length;
				document.getElementById("count-pending-delegates").style.opacity = "1";
			}

			if (data.data.churchMember.length == 0) {
				$scope.html += '<tr>' +
									'<td colspan="3">No data!</td>' +
								'</tr>';
			} else {
				for (var i = 0; i < data.data.churchMember.length; i++) {
					$scope.registered = false;
					for (var j = 0; j < data.data.delegates.length; j++) {
						if (data.data.churchMember[i].id == data.data.delegates[j].memberID) {
							$scope.registered = true;
							break;
						}
					} 

					if ($scope.registered) {
						$scope.membersByChurch.push(data.data.churchMember[i]);
					}
				}

				for (var x = 0; x < $scope.membersByChurch.length; x++) {
					$scope.html += '<tr>' +
										'<td>'+(x+1)+'</td>' +
										'<td>'+$scope.membersByChurch[x].firstname+' '+$scope.membersByChurch[x].lastname+'</td>' +
										'<td>' +
											'<input id="checkboxPending'+x+'" type="checkbox" value="'+$scope.membersByChurch[x].id+'" onclick="queuePendingDelegates(this.value,'+x+')">' +
										'</td>' +
									'</tr>';
				}
			} document.getElementById("pending-delegates").innerHTML = $scope.html;
		});
	}

	$scope.registerPendingDelegates = function(ids) {
		document.getElementById("pending-register-loader").style.display = "block";
		$http.post("http://localhost/thesisAppProcess/process/registerPendingDelegates.php", {
			'ids': ids
		}, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		}).then(function(response) {
			if (response.data == "Success") {
				document.getElementById("pending-register-loader").style.display = "none";
				document.getElementById("pending-register-success").style.display = "block";
			}
			$scope.getPendingDelegates();
		});
	}

	$scope.notificationLength = 0;
	$scope.ministry_ID = 0;
	var click = false;
	$scope.notificationInterval = function() {
		setInterval($scope.getNotificationAdmin,200);
	}

	$scope.getNotificationAdmin = function() {
		$http.get("http://localhost/thesisAppProcess/process/getNotification.php")
		.then(function(datas) {
			$scope.notification = "";
			if (datas.data.notification.length == 0) {
				document.getElementById("countNotification").style.opacity = "0";

				$scope.notification = '<center>' +
										'<h3>No notifications!</h3>' +
									'</center>';
				document.getElementById("notification-container").innerHTML = $scope.notification;
			} else if($scope.notificationLength != datas.data.length) {
				var countSeen = 0;
				if ($scope.notificationLength != datas.data.notification.length) {
					$scope.ministry_ID = datas.data.notification[0].ministryID;

					document.getElementById("countNotification").style.opacity = "1";
					document.getElementById("countNotification").innerHTML = datas.data.notification.length;

					for (var i = 0; i < datas.data.notification.length; i++) {
						if (datas.data.notification[i].seenadmin == 0) {
							countSeen++;
						}

						$scope.notification = '<div class="notification-wrapper">' +
												'<img src="http://localhost/thesisAppProcess/uploadImages/'+datas.data.coordinator[i].image+'">' +
												'<div class="label">' +
													'<label><strong>'+datas.data.coordinator[i].firstname+'  '+datas.data.coordinator[i].lastname+'</strong>  propose an event with the theme of <strong>'+datas.data.event[i].theme+'...</strong></label>' +
												'</div>' +
											'</div>';
					} if (countSeen > 0) {
						$scope.notificationLength = datas.data.notification.length;
						document.getElementById("countNotification").style.opacity = "1";
						click = false;
					} else {
						document.getElementById("countNotification").style.opacity = "0";
					}

					document.getElementById("notification-container").innerHTML = $scope.notification;
				} else {
					// do nothing...
				}
			} $scope.notificationLength = datas.data.length;
		});
	}

	$scope.notificationSeen = function() {
		if (!click) {
			$http.post("http://localhost/thesisAppProcess/process/notificationSeen.php", {
				'ministryID': $scope.ministry_ID
			}, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				}
			}).then(function(response) {
				$scope.notificationLength = 0;
			}); click = true;
		}
	}

	$scope.notificationLength2 = 0;
	$scope.ministry_ID2 = 0;
	var click2 = false;
	$scope.notificationInterval2 = function() {
		setInterval($scope.getNotificationCoordinator,200);
	}

	$scope.getNotificationCoordinator = function() {
		$http.get("http://localhost/thesisAppProcess/process/getNotification2.php")
		.then(function(datas) {
			$scope.notification = "";
			if (datas.data.notification.length == 0) {
				document.getElementById("countNotification").style.opacity = "0";

				$scope.notification = '<center>' +
										'<h3>No notifications!</h3>' +
									'</center>';
				document.getElementById("notification-container").innerHTML = $scope.notification;
			} else if($scope.notificationLength2 != datas.data.length) {
				var countSeen = 0;
				if ($scope.notificationLength2 != datas.data.notification.length) {
					$scope.ministry_ID2 = datas.data.notification[0].ministryID;

					document.getElementById("countNotification").style.opacity = "1";
					document.getElementById("countNotification").innerHTML = datas.data.notification.length;

					for (var i = 0; i < datas.data.notification.length; i++) {
						if (datas.data.notification[i].seencoordinator == 0) {
							countSeen++;
						}

						$scope.notification = '<div class="notification-wrapper">' +
												'<img src="../uploadImages/'+datas.data.coordinator[i].image+'">' +
												'<div class="label">' +
													'<label><strong>'+datas.data.coordinator[i].firstname+'  '+datas.data.coordinator[i].lastname+'</strong>  has approved the event you proposed with the theme <strong>'+datas.data.event[i].theme+'...</strong></label>' +
												'</div>' +
											'</div>';
					} if (countSeen > 0) {
						$scope.notificationLength2 = datas.data.notification.length;
						document.getElementById("countNotification").style.opacity = "1";
						click2 = false;
					} else {
						document.getElementById("countNotification").style.opacity = "0";
					}

					document.getElementById("notification-container").innerHTML = $scope.notification;
				} else {
					// do nothing...
				} 
			} $scope.notificationLength2 = datas.data.length;
		});
	}

	$scope.notificationSeen2 = function() {
		if (!click2) {
			$http.post("http://localhost/thesisAppProcess/process/notificationSeen2.php", {
				'ministryID': $scope.ministry_ID2
			}, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				}
			}).then(function(response) {
				$scope.notificationLength2 = 0;
			}); click2 = true;
		}
	}

	$scope.getMyProfile = function() {
		$scope.profileImage == "";
		$scope.coverImage == "";
		$http.post("http://localhost/thesisAppProcess/process/getUserProfile.php", {
			'userID': localStorage.getItem("userID")
		}, {
			headers : {
		        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		    }
		}).then(function(response) {
			var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
			if (response.data[0].bday == "0000-00-00") {
				document.getElementById("mybday").innerHTML = "Not set..";
			} else {
				var bday = response.data[0].bday.split('-');
				document.getElementById("mybday").innerHTML = months[bday[1]-1] + " " + bday[2] + ", " + bday[0];
			}
			var myname = response.data[0].firstname + "&nbsp;&nbsp;" + response.data[0].middlename + "&nbsp;&nbsp;" + response.data[0].lastname + "<span>|</span>";
			document.getElementById("myname").innerHTML = myname;
			document.getElementById("myposition").innerHTML = response.data[0].position;
			document.getElementById("mygender").innerHTML = response.data[0].gender;
			document.getElementById("mycontact").innerHTML = response.data[0].contactNo;
			document.getElementById("myadd").innerHTML = response.data[0].address;
			document.getElementById("myusername").innerHTML = response.data[0].username;
			var password = "";
			for (var i = 0; i < response.data[0].password.length; i++) {
				password += "*";
			} document.getElementById("mypassword").innerHTML = password;
			document.getElementById("cover-photo").src = "http://localhost/thesisAppProcess/uploadImages/" + response.data[0].cover;
			document.getElementById("profile-pic").src = "http://localhost/thesisAppProcess/uploadImages/" + response.data[0].image;

			document.getElementById("profile_cover").value = response.data[0].cover;
			document.getElementById("profile_pic").value = response.data[0].image;
			document.getElementById("profile_firstname").value = response.data[0].firstname;
			document.getElementById("profile_middlename").value = response.data[0].middlename;
			document.getElementById("profile_lastname").value = response.data[0].lastname;
			document.getElementById("profile_contact").value = response.data[0].contactNo;
			document.getElementById("profile_gender").value = response.data[0].gender;
			document.getElementById("profile_bday").value = response.data[0].bday;
			document.getElementById("profile_address").value = response.data[0].address;
			document.getElementById("profile_username").value = response.data[0].username;
			document.getElementById("profile_password").value = response.data[0].password;
		});
	}

	$scope.updateProfile = function() {
		if ($scope.profileImage == "" && $scope.coverImage == "") {
			$scope.profileImage = document.getElementById("profile_pic").value;
			$scope.coverImage = document.getElementById("profile_cover").value;
		} else if ($scope.profileImage == "") {
			$scope.profileImage = document.getElementById("profile_pic").value;
		} else if ($scope.coverImage == "") {
			$scope.coverImage = document.getElementById("profile_cover").value;
		}
		document.getElementById("profile-updated").style.display = "none";
		document.getElementById("profile-loading").style.display = "block";
		var bday = new Date(document.getElementById("profile_bday").value);
		$http.post("http://localhost/thesisAppProcess/process/updateProfile.php", {
			'userID': localStorage.getItem("userID"),
			'cover': $scope.coverImage,
			'image': $scope.profileImage,
			'fname': document.getElementById("profile_firstname").value,
			'mname': document.getElementById("profile_middlename").value,
			'lname': document.getElementById("profile_lastname").value,
			'contact': document.getElementById("profile_contact").value,
			'gender': document.getElementById("profile_gender").value,
			'bday': bday,
			'address': document.getElementById("profile_address").value,
			'username': document.getElementById("profile_username").value,
			'password': document.getElementById("profile_password").value
		}, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		}).then(function(response) {
			if (response.data == 1) {
				document.getElementById("profile-loading").style.display = "none";
				document.getElementById("profile-updated").style.display = "block";

				$scope.userImage = $scope.profileImage;
			}
			document.getElementById("fileInput").value = null;
			document.getElementById("fileInput2").value = null;
			$scope.getMyProfile();
		});
	}

	$scope.getMyProfileCoordinator = function() {
		$scope.profileImage == "";
		$scope.coverImage == "";
		$http.post("http://localhost/thesisAppProcess/process/getUserProfile.php", {
			'userID': localStorage.getItem("userID")
		}, {
			headers : {
		        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		    }
		}).then(function(response) {
			var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
			if (response.data[0].bday == "0000-00-00") {
				document.getElementById("mybday").innerHTML = "Not set..";
			} else {
				var bday = response.data[0].bday.split('-');
				document.getElementById("mybday").innerHTML = months[bday[1]-1] + " " + bday[2] + ", " + bday[0];
			}
			var myname = response.data[0].firstname + "&nbsp;&nbsp;" + response.data[0].middlename + "&nbsp;&nbsp;" + response.data[0].lastname + "<span>|</span>";
			document.getElementById("myname").innerHTML = myname;
			document.getElementById("myposition").innerHTML = response.data[0].position;
			document.getElementById("mygender").innerHTML = response.data[0].gender;
			document.getElementById("mycontact").innerHTML = response.data[0].contactNo;
			document.getElementById("myadd").innerHTML = response.data[0].address;
		//	document.getElementById("myusername").innerHTML = response.data[0].username;
			var password = "";
			for (var i = 0; i < response.data[0].password.length; i++) {
				password += "*";
			} document.getElementById("mypassword").innerHTML = password;
			document.getElementById("cover-photo").src = "http://localhost/thesisAppProcess/uploadImages/" + response.data[0].cover;
			document.getElementById("profile-pic").src = "http://localhost/thesisAppProcess/uploadImages/" + response.data[0].image;

			document.getElementById("profile_cover").value = response.data[0].cover;
			document.getElementById("profile_pic").value = response.data[0].image;
			document.getElementById("profile_firstname").value = response.data[0].firstname;
			document.getElementById("profile_middlename").value = response.data[0].middlename;
			document.getElementById("profile_lastname").value = response.data[0].lastname;
			document.getElementById("profile_contact").value = response.data[0].contactNo;
			document.getElementById("profile_gender").value = response.data[0].gender;
			document.getElementById("profile_bday").value = response.data[0].bday;
			document.getElementById("profile_address").value = response.data[0].address;
		//	document.getElementById("profile_username").value = response.data[0].username;
			document.getElementById("profile_password").value = response.data[0].password;
		});
	}

	$scope.updateProfileCoordinator = function() {
		if ($scope.profileImage == "" && $scope.coverImage == "") {
			$scope.profileImage = document.getElementById("profile_pic").value;
			$scope.coverImage = document.getElementById("profile_cover").value;
		} else if ($scope.profileImage == "") {
			$scope.profileImage = document.getElementById("profile_pic").value;
		} else if ($scope.coverImage == "") {
			$scope.coverImage = document.getElementById("profile_cover").value;
		}
		document.getElementById("profile-updated").style.display = "none";
		document.getElementById("profile-loading").style.display = "block";
		var bday = new Date(document.getElementById("profile_bday").value);
		$http.post("http://localhost/thesisAppProcess/process/updateProfile.php", {
			'userID': localStorage.getItem("userID"),
			'cover': $scope.coverImage,
			'image': $scope.profileImage,
			'fname': document.getElementById("profile_firstname").value,
			'mname': document.getElementById("profile_middlename").value,
			'lname': document.getElementById("profile_lastname").value,
			'contact': document.getElementById("profile_contact").value,
			'gender': document.getElementById("profile_gender").value,
			'bday': bday,
			'address': document.getElementById("profile_address").value,
			'username': '',
			'password': document.getElementById("profile_password").value
		}, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		}).then(function(response) {
			if (response.data == 1) {
				document.getElementById("profile-loading").style.display = "none";
				document.getElementById("profile-updated").style.display = "block";

				$scope.userImage = $scope.profileImage;
			}
			document.getElementById("fileInput").value = null;
			document.getElementById("fileInput2").value = null;
			$scope.getMyProfileCoordinator();
		});
	}

	$scope.viewCoordinatorProfile = function(id) {
		$http.post("http://localhost/thesisAppProcess/process/getUserProfile.php", {
			'userID': id
		}, {
			headers : {
		        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		    }
		}).then(function(response) {
			var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
			if (response.data[0].bday == "0000-00-00") {
				document.getElementById("mybday").innerHTML = "Not set..";
			} else {
				var bday = response.data[0].bday.split('-');
				document.getElementById("mybday").innerHTML = months[bday[1]-1] + " " + bday[2] + ", " + bday[0];
			}
			var myname = response.data[0].firstname + "&nbsp;&nbsp;" + response.data[0].middlename + "&nbsp;&nbsp;" + response.data[0].lastname;
			document.getElementById("myname").innerHTML = myname;
			document.getElementById("myposition").innerHTML = response.data[0].position;
			document.getElementById("mygender").innerHTML = response.data[0].gender;
			document.getElementById("mycontact").innerHTML = response.data[0].contactNo;
			document.getElementById("myadd").innerHTML = response.data[0].address;
			document.getElementById("cover-photo").src = "http://localhost/thesisAppProcess/uploadImages/" + response.data[0].cover;
			document.getElementById("profile-pic").src = "http://localhost/thesisAppProcess/uploadImages/" + response.data[0].image;
		});
	}

	// $scope.mySampleHosting = function() {
	// 	setInterval($scope.samp,5000);
	// }

	// $scope.samp = function() {
	// 	$http.get("http://ag-section2.com.preview.services/config.php")
	// 	.then(function(datas) {
	// 		console.log(datas.data);
	// 	});
	// }

	$scope.addExpenses = function(item,price,id,btn) {
		document.getElementById("add-expenses-loader").style.display = "block";
		$http.post("http://localhost/thesisAppProcess/process/addExpenses.php", {
			'item': item,
			'price': price,
			'id': id,
			'btn': btn
		}, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		}).then(function(response) {
			if (response.data == 1) {
				document.getElementById("add-expenses-loader").style.display = "none";
				document.getElementById("add-expenses-success").style.display = "block";

				document.getElementById("purchase-item").value = null;
				document.getElementById("purchase-price").value = null;
				document.getElementById("purchase-id").value = null;
				document.getElementById("purchase-btn").innerHTML = "Add Expenses";
				$scope.getExpenses();
			}
		});
	}

	$scope.getExpenses = function() {
		$http.get("http://localhost/thesisAppProcess/process/getExpenses.php")
		.then(function(datas) {
			$scope.html = "";
			$scope.expenses = datas.data;

			if (datas.data.length == 0) {
				$scope.html = '<tr>' +
								'<td colspan="4">No data!</td>' +
							'</tr>';
			} else {
				for (var i = 0; i < datas.data.length; i++) {
					$scope.html += '<tr>' +
									'<td>'+(i+1)+'</td>' +
									'<td>'+datas.data[i].description+'</td>' +
									'<td>'+datas.data[i].price+'</td>' +
									'<td>' +
										'<img src="../images/icon/edit.png" onclick="updateExpenses('+i+')">' +
										'<img src="../images/icon/delete.png" onclick="deleteExpenses('+i+')">' +
									'</td>' +
								'</tr>';
				}
			} document.getElementById("add-expenses").innerHTML = $scope.html;
		});
	}

	$scope.deleteExpenses = function(id) {
		$http.post("http://localhost/thesisAppProcess/process/deleteExpenses.php", {
			'id': id
		}, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		}).then(function(response) {
			if (response.data == 1) {
				$scope.getExpenses();
			}
		});
	}

	$scope.getYears = function() {
		$http.get("http://localhost/thesisAppProcess/process/getYears.php")
		.then(function(datas) {
			if (datas.data.length > 0) {
				var x = datas.data[0].dateStart.split('-');
				var y = datas.data[datas.data.length-1].dateStart.split('-');

				$scope.html = "<option value=''>Choose here</option>";
				$scope.countYear = parseInt(x[0]);
				for (var i = parseInt(x[0]); i <= parseInt(y[0]); i++) {
					$scope.html += '<option value="'+$scope.countYear+'">'+$scope.countYear+'</option>';
					$scope.countYear++;
				} document.getElementById("reports-year").innerHTML = $scope.html;
			}
		});
	}

$scope.divElements = "";
	$scope.getAnnualReports = function(year) {
		document.getElementById("myReports").innerHTML = "Youth Alive Ministry Reports - " + year;
		$http.post("http://localhost/thesisAppProcess/process/getAnnualReports.php", {
			'year': year
		}, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		}).then(function(response) {
		//	console.log(response.data);
			$scope.months = ['Jan','Feb','Mar','Apr','May','Jul','Jul','Aug','Sept','Oct','Nov','Dec'];
			$scope.totalExpenses = [];
			$scope.totalGross = 0;
			$scope.netIncome = 0;
			$scope.date = "";
			$scope.theme = "";
			$scope.html = "";
			$scope.tempExpenses = 0;
			$scope.totalNetIncome = 0;
			for (var i = 0; i < response.data.event.length; i++) {
				var x = response.data.event[i].dateStart.split('-');
				var y = response.data.event[i].dateEnd.split('-');
				$scope.date = $scope.months[x[1]-1] + " " + x[2] + " - " + $scope.months[y[1]-1] + " " + y[2];
				$scope.theme = response.data.event[i].theme;
				$scope.totalGross = parseInt(response.data.numberOfDelegates[i]) * parseInt(response.data.event[i].registrationFee).toFixed(2);
				if (response.data.expenses.length == 0) {
					$scope.html += '<tr>' +
										'<td>'+$scope.date+'</td>' +
										'<td>'+$scope.theme+'</td>' +
										'<td>'+response.data.numberOfDelegates[i]+'</td>' +
										'<td style="text-align: right;">'+$scope.totalGross.toFixed(2)+'&nbsp;&nbsp;</td>' +
										'<td style="text-align: right;">0.00&nbsp;&nbsp;</td>' +
										'<td style="text-align: right;">'+$scope.totalGross.toFixed(2)+'&nbsp;&nbsp;</td>' +
									'</tr>';
					$scope.totalNetIncome += parseInt($scope.netIncome.toFixed(2));
				} else {
					$scope.netIncome = $scope.totalGross.toFixed(2) - response.data.expenses[i].toFixed(2);
	 
	 				$scope.html += '<tr>' +
										'<td>'+$scope.date+'</td>' +
										'<td>'+$scope.theme+'</td>' +
										'<td>'+response.data.numberOfDelegates[i]+'</td>' +
										'<td style="text-align: right;">'+$scope.totalGross.toFixed(2)+'&nbsp;&nbsp;</td>' +
										'<td style="text-align: right;">'+response.data.expenses[i].toFixed(2)+'&nbsp;&nbsp;</td>' +
										'<td style="text-align: right;">'+$scope.netIncome.toFixed(2)+'&nbsp;&nbsp;</td>' +
									'</tr>';
					$scope.totalNetIncome += parseInt($scope.netIncome.toFixed(2));
				}	
			} $scope.html += '<tr>' +
								'<td colspan="5"><b>TOTAL NET INCOME:</b></td>' +
								'<td style="text-align: right;"><b>'+$scope.totalNetIncome.toFixed(2)+'</b>&nbsp;&nbsp;</td>' +
							'</tr>';
			document.getElementById("annual-reports-display").innerHTML = $scope.html;
			var divElements = document.getElementById("printme").innerHTML;
			window.localStorage.setItem("reports",divElements);
		});
	}

	$scope.viewCoordinatorReports = function() {
		document.getElementById('printHere').innerHTML = window.localStorage.getItem("reports");
		window.print();
	}
});
