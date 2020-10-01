// var loadInterval;
// var xx = 0;
// var reloadDashboard = function() {
// 	loadInterval = setInterval(dashboard,100);
// } var dashboard = function() {
// 	if (xx == 3) {
// 		window.location.reload();
// 		clearInterval(loadInterval);
// 	} xx++;
// }



var loadFileChurch = function(event) {
	var output = document.getElementById('output');
	output.src = URL.createObjectURL(event.target.files[0]);
	document.getElementById('updateChurch').style.display = 'none';
	document.getElementById('output').style.display = 'block';
	document.getElementById('photo-wrapper').style.border = 'none';
}

var loadFilePastor = function(event) {
	var output = document.getElementById('outputPastor');
	output.src = URL.createObjectURL(event.target.files[0]);
	document.getElementById('pastorChurch').style.display = 'none';
	document.getElementById('outputPastor').style.display = 'block';
}

var loadFileCoordinator = function(event) {
	var output = document.getElementById('coordinator-image');
	output.src = URL.createObjectURL(event.target.files[0]);
	document.getElementById('upload-photo-msg').style.display = 'none';
	document.getElementById('coordinator-image').style.display = 'block';
}

var loadFileEvent = function(event) {
	var output = document.getElementById('event-img');
	output.src = URL.createObjectURL(event.target.files[0]);
	document.getElementById('event-img').style.display = 'block';
}

var viewMinistry = function(index) {
	var scope = angular.element(document.getElementById("myCtrl")).scope();
	scope.$apply(function() {
		document.getElementById("ministry-name").innerHTML = scope.ministry[index].name + " Ministry";
		if (scope.ministry[index].mission == "" || scope.ministry[index].mission == undefined) {
			document.getElementById("ministry-description").innerHTML = "No description added.";
		} else {
			document.getElementById("ministry-description").innerHTML = scope.ministry[index].mission;
		} $(".view-ministry-modal").fadeIn();
	});
} 

var updateMinistry = function(index) {
	var scope = angular.element(document.getElementById("myCtrl")).scope();
	scope.$apply(function() {

		document.getElementById("ministryName").value = scope.ministry[index].name;
		document.getElementById("ministryDesc").value = scope.ministry[index].mission;
		document.getElementById("ministryID").value = scope.ministry[index].id;
		document.getElementById("addMinistryBtn").innerHTML = "UPDATE";
	});
} 

var execAddOrUpdateMinistry = function() {
	var scope = angular.element(document.getElementById("myCtrl")).scope();
	scope.$apply(function() {
		var id = document.getElementById("ministryID").value;
		var name = document.getElementById("ministryName").value;
		var desc = document.getElementById("ministryDesc").value;
		var btn = document.getElementById("addMinistryBtn").innerHTML;
		scope.addMinistry(id,name,desc,btn);
	});
}

var deleteMinistry = function(index) {
	var scope = angular.element(document.getElementById("myCtrl")).scope();
	scope.$apply(function() {
		var id = scope.ministry[index].id;
		document.getElementById("deleteMinistryID").value = id;
		$(".delete-ministry-modal").fadeIn();
	});
}

var ecxecDeleteMinistry = function() {
	var scope = angular.element(document.getElementById("myCtrl")).scope();
	scope.$apply(function() {
		var id = document.getElementById("deleteMinistryID").value;
		scope.deleteMinistry(id);
		$(".delete-ministry-modal").fadeOut();
	});
}

var execAddOrUpdateChurch = function() {
	var scope = angular.element(document.getElementById("myCtrl")).scope();
	scope.$apply(function() {

		var id = document.getElementById("churchID").value;
		var name = document.getElementById("churchName").value;
		var address = document.getElementById("churchAddress").value;
		var type = document.getElementById("churchType").value;
		var host = document.getElementById("churchPastor").value;
		var btn = document.getElementById("addChurchBtn").innerHTML;
		scope.addChurch(id,name,address,type,host,btn);
	});
}

var updateChurches = function(index,type) {
	var scope = angular.element(document.getElementById("myCtrl")).scope();
	scope.$apply(function() {
		document.getElementById('output').style.display = 'block';
		var output = document.getElementById('output');
		document.getElementById("deleteChurchType").value = type;
		if (type == 1) {
			output.src = "../uploadImages/" + scope.allChurch[index].image;
			scope.churchImage = scope.allChurch[index].image;
			document.getElementById("churchID").value = scope.allChurch[index].id;
			document.getElementById("churchName").value = scope.allChurch[index].name;
			document.getElementById("churchAddress").value = scope.allChurch[index].address;
			document.getElementById("churchType").value = scope.allChurch[index].status;
			document.getElementById("churchPastor").value = scope.allChurch[index].hostPastorID;
			document.getElementById("addChurchBtn").innerHTML = "UPDATE";
		} else if (type == 2) {
			output.src = "../uploadImages/" + scope.pioneeringChurch[index].image;
			scope.churchImage = scope.pioneeringChurch[index].image;
			document.getElementById("churchID").value = scope.pioneeringChurch[index].id;
			document.getElementById("churchName").value = scope.pioneeringChurch[index].name;
			document.getElementById("churchAddress").value = scope.pioneeringChurch[index].address;
			document.getElementById("churchType").value = scope.pioneeringChurch[index].status;
			document.getElementById("churchPastor").value = scope.pioneeringChurch[index].hostPastorID;
			document.getElementById("addChurchBtn").innerHTML = "UPDATE";
		} else if (type == 3) {
			output.src = "../uploadImages/" + scope.sovereignChurch[index].image;
			scope.churchImage = scope.sovereignChurch[index].image;
			document.getElementById("churchID").value = scope.sovereignChurch[index].id;
			document.getElementById("churchName").value = scope.sovereignChurch[index].name;
			document.getElementById("churchAddress").value = scope.sovereignChurch[index].address;
			document.getElementById("churchType").value = scope.sovereignChurch[index].status;
			document.getElementById("churchPastor").value = scope.sovereignChurch[index].hostPastorID;
			document.getElementById("addChurchBtn").innerHTML = "UPDATE";
		} else if (type == 4) {
			output.src = "../uploadImages/" + scope.establishChurch[index].image;
			scope.churchImage = scope.establishChurch[index].image;
			document.getElementById("churchID").value = scope.establishChurch[index].id;
			document.getElementById("churchName").value = scope.establishChurch[index].name;
			document.getElementById("churchAddress").value = scope.establishChurch[index].address;
			document.getElementById("churchType").value = scope.establishChurch[index].status;
			document.getElementById("churchPastor").value = scope.establishChurch[index].hostPastorID;
			document.getElementById("addChurchBtn").innerHTML = "UPDATE";
		}
	});
}

var getChurchesFilter = function(type) {
	var scope = angular.element(document.getElementById("myCtrl")).scope();
	scope.$apply(function() {
		scope.getChurchesFilter(type);
	});
}

var viewChurches = function(index,type) {
	var scope = angular.element(document.getElementById("myCtrl")).scope();
	scope.$apply(function() {
		if (type == 1 || type == "" || type == undefined) {
			var name = scope.allChurch[index].name;
			var address = scope.allChurch[index].address;
			var pastorID = scope.allChurch[index].hostPastorID;
			var status = scope.allChurch[index].status;
			var image = scope.allChurch[index].image;
			var mission = scope.allChurch[index].mission;
			var vision = scope.allChurch[index].vision;
			document.getElementById("church-image").src = "http://localhost/thesisAppProcess/uploadImages/" + image;
			scope.viewChurchProfile(name,address,pastorID,status,mission,vision);
		} else if (type == 2) {
			var name = scope.pioneeringChurch[index].name;
			var address = scope.pioneeringChurch[index].address;
			var pastorID = scope.pioneeringChurch[index].hostPastorID;
			var status = scope.pioneeringChurch[index].status;
			var image = scope.pioneeringChurch[index].image;
			var mission = scope.pioneeringChurch[index].mission;
			var vision = scope.pioneeringChurch[index].vision;
			document.getElementById("church-image").src = "http://localhost/thesisAppProcess/uploadImages/" + image;
			scope.viewChurchProfile(name,address,pastorID,status,mission,vision);
		} else if (type == 3) {
			var name = scope.sovereignChurch[index].name;
			var address = scope.sovereignChurch[index].address;
			var pastorID = scope.sovereignChurch[index].hostPastorID;
			var status = scope.sovereignChurch[index].status;
			var image = scope.sovereignChurch[index].image;
			var mission = scope.sovereignChurch[index].mission;
			var vision = scope.sovereignChurch[index].vision;
			document.getElementById("church-image").src = "http://localhost/thesisAppProcess/uploadImages/" + image;
			scope.viewChurchProfile(name,address,pastorID,status,mission,vision);
		} else if (type == 4) {
			var name = scope.establishChurch[index].name;
			var address = scope.establishChurch[index].address;
			var pastorID = scope.establishChurch[index].hostPastorID;
			var status = scope.establishChurch[index].status;
			var image = scope.establishChurch[index].image;
			var mission = scope.establishChurch[index].mission;
			var vision = scope.establishChurch[index].vision;
			document.getElementById("church-image").src = "http://localhost/thesisAppProcess/uploadImages/" + image;
			scope.viewChurchProfile(name,address,pastorID,status,mission,vision);
		}

		$(".view-church-modal").fadeIn();
	});
}

var deleteChurches = function(index,type) {
	var scope = angular.element(document.getElementById("myCtrl")).scope();
	scope.$apply(function() {
		if (type == 1) {
			var id = scope.allChurch[index].id;
			document.getElementById("deleteChurchID").value = id;
			document.getElementById("deleteChurchType").value = type;
			$(".delete-church-modal").fadeIn();
		} else if (type == 2) {
			var id = scope.pioneeringChurch[index].id;
			document.getElementById("deleteChurchID").value = id;
			document.getElementById("deleteChurchType").value = type;
			$(".delete-church-modal").fadeIn();
		} else if (type == 3) {
			var id = scope.sovereignChurch[index].id;
			document.getElementById("deleteChurchID").value = id;
			document.getElementById("deleteChurchType").value = type;
			$(".delete-church-modal").fadeIn();
		} else if (type == 4) {
			var id = scope.establishChurch[index].id;
			document.getElementById("deleteChurchID").value = id;
			document.getElementById("deleteChurchType").value = type;
			$(".delete-church-modal").fadeIn();
		}
	});
}

var execDeleteChurch = function() {
	var scope = angular.element(document.getElementById("myCtrl")).scope();
	scope.$apply(function() {
		var id = document.getElementById("deleteChurchID").value;
		var type = document.getElementById("deleteChurchType").value;
		scope.deleteChurch(id,type);
		$(".delete-church-modal").fadeOut();
	});
}

var viewPastors = function(index) {
	var scope = angular.element(document.getElementById("myCtrl")).scope();
	scope.$apply(function() {
		var month = ['January','February','March','April','May','June','July','August','September','October','November','December'];
		var fullname = scope.pastors[index].firstname + " " + scope.pastors[index].middlename.charAt(0) + ". " + scope.pastors[index].lastname;
		var x = scope.pastors[index].bday.split("-");
		var birthday = month[(parseInt(x[1]) - 1)] + " " + x[2] + ", " + x[0];

		document.getElementById("pastor-fullname").innerHTML = "Ptr. " + fullname;
		document.getElementById("pastor-address").innerHTML = scope.pastors[index].address;
		document.getElementById("pastor-contact").innerHTML = scope.pastors[index].contactNo;
		document.getElementById("pastor-gender").innerHTML = scope.pastors[index].gender;
		document.getElementById("pastor-bday").innerHTML = birthday;
		document.getElementById("pastor-image").src = "http://localhost/thesisAppProcess/uploadImages/" + scope.pastors[index].image;

		$(".view-pastor-modal").fadeIn();
	});
}

var execAddorUpdatePastor = function() {
	var scope = angular.element(document.getElementById("myCtrl")).scope();
	scope.$apply(function() {
		var id = document.getElementById("pastorID").value;
		var fname = document.getElementById("pastorFname").value;
		var mname = document.getElementById("pastorMname").value;
		var lname = document.getElementById("pastorLname").value;
		var gender = document.getElementById("pastorGender").value;
		var address = document.getElementById("pastorAddress").value;
		var contact = document.getElementById("pastorContact").value;
		var code = document.getElementById("displayCode").value;

		var mm = document.getElementById("pastorBdayMM").value;
		var dd = document.getElementById("pastorBdayDD").value;
		var yyyy = document.getElementById("pastorBdayYYYY").value;
		var btn = document.getElementById("addPastorBtn").innerHTML;

		var bday = new Date(mm + "-" + dd + "-" + yyyy);
		bday.setDate(bday.getDate() + 1);

		scope.addPastor(id,fname,mname,lname,gender,address,contact,bday,btn,code);
	});
}

var generateCode = function() {
	var type = ['number','letter','number','letter','number','letter'];
	var letterLower = "abcdefghijklmnopqrstuvwxyz";
	var letterUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var number = "0123456789";
	var cased = ['upper','lower','upper','lower','upper','lower'];
	var code = "";

	var randomType ="";
	var randomCase = "";
	var randomLetterLower = "";
	var randomLetterUpper = "";
	var randomNumber = "";


	for (var i = 0; i < 8; i++) {
		randomType = type[Math.floor(Math.random() * type.length)];
		if (randomType == "letter") {
			randomCase = cased[Math.floor(Math.random() * cased.length)];
			if (randomCase == "upper") {
				randomLetterUpper = letterUpper[Math.floor(Math.random() * letterUpper.length)];
				code += randomLetterUpper;
			} else {
				randomLetterLower = letterLower[Math.floor(Math.random() * letterLower.length)];
				code += randomLetterLower;
			}
		} else {
			randomNumber = number[Math.floor(Math.random() * number.length)];
			code += randomNumber;
		}
	} document.getElementById("displayCode").value = code;
}

var deletePastors = function(index) {
	var scope = angular.element(document.getElementById("myCtrl")).scope();
	scope.$apply(function() {
		document.getElementById("pastorID").value = scope.pastors[index].id;

		$(".delete-pastor-modal").fadeIn();
	});
}

var execDeletePastor = function() {
	var scope = angular.element(document.getElementById("myCtrl")).scope();
	scope.$apply(function() {
		var id = document.getElementById("pastorID").value;
		scope.deletePastors(id);

		$(".delete-pastor-modal").fadeOut();
	});
}

var viewEvents = function(index) {
	var scope = angular.element(document.getElementById("myCtrl")).scope();
	scope.$apply(function() {
		var month = ['January','February','March','April','May','June','July','August','September','October','November','December'];
		var x = scope.event[index].dateStart.split("-");
		var y = scope.event[index].dateEnd.split("-");
		var dateStart = month[(parseInt(x[1]) - 1)] + " " + parseInt(x[2]);
		var dateEnd = month[(parseInt(y[1]) - 1)] + " " + parseInt(y[2]) + ", " + y[0];

		document.getElementById("imageTarp").src = "http://localhost/thesisAppProcess/uploadImages/" + scope.event[index].image;
		document.getElementById("descTheme").innerHTML = scope.event[index].theme;
		document.getElementById("descSpeaker").innerHTML = scope.event[index].speaker;
		document.getElementById("descAddress").innerHTML = scope.event[index].address;
		document.getElementById("descDate").innerHTML = dateStart + " - " + dateEnd;
		document.getElementById("descHost").innerHTML = scope.event[index].hostChurch;
		document.getElementById("descMinistry").innerHTML = scope.event[index].ministry;
		document.getElementById("descFee").innerHTML = "P" + scope.event[index].fee + ".00";

		$(".view-event-modal").fadeIn();
	});
}

var viewRequestEvent = function(index) {
	var scope = angular.element(document.getElementById("myCtrl")).scope();
	scope.$apply(function() {
		var month = ['January','February','March','April','May','June','July','August','September','October','November','December'];
		var x = scope.event2[index].dateStart.split("-");
		var y = scope.event2[index].dateEnd.split("-");
		var dateStart = month[(parseInt(x[1]) - 1)] + " " + parseInt(x[2]);
		var dateEnd = month[(parseInt(y[1]) - 1)] + " " + parseInt(y[2]) + ", " + y[0];

		document.getElementById("imageTarp2").src = "http://localhost/thesisAppProcess/uploadImages/" + scope.event2[index].image;
		document.getElementById("descTheme2").innerHTML = scope.event2[index].theme;
		document.getElementById("descSpeaker2").innerHTML = scope.event2[index].speaker;
		document.getElementById("descAddress2").innerHTML = scope.event2[index].address;
		document.getElementById("descDate2").innerHTML = dateStart + " - " + dateEnd;
		document.getElementById("descHost2").innerHTML = scope.event2[index].hostChurch;
		document.getElementById("descMinistry2").innerHTML = scope.event2[index].ministry;
		document.getElementById("descFee2").innerHTML = "P" + scope.event2[index].fee + ".00";

		$(".request-event-modal").fadeIn();
	});
}

var approveEvent = function(index) {
	var scope = angular.element(document.getElementById("myCtrl")).scope();
	scope.$apply(function() {
		scope.approveEvent(scope.event2[index].id);
	});
}

var calendarEvent = function(stat) {
	var months = ['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'];
	var curDate = new Date();
	
	var cal = [];
	var activeMonth = document.getElementById("eventMonth").innerHTML;
	var activeYear = document.getElementById("eventYear").innerHTML;
	var daysInMonth = 0;
	
	if (stat == 'prev') {
		var loopBreak = false;
		for (var i = 0; i < 12; i++) {
			if (activeMonth == months[0]) {
				document.getElementById("eventMonth").innerHTML = months[11];
				document.getElementById("eventYear").innerHTML = parseInt(activeYear) - 1;
				daysInMonth = new Date((parseInt(activeYear) - 1),12,0).getDate();

				var temp_date = (parseInt(activeYear) - 1) + "-" + 12 + "-" + 1;
				var dated = new Date(temp_date).getDay();
				cal = getDays(daysInMonth,dated);
				loopBreak = true;

				var scope = angular.element(document.getElementById("myCtrl")).scope();
				scope.$apply(function() {
					scope.getEventForCalendar('prev',cal,months[11],parseInt(activeYear) - 1);
				});
			} else {
				if (months[i] == activeMonth) {
					document.getElementById("eventMonth").innerHTML = months[i-1];
					daysInMonth = new Date(parseInt(activeYear),i,0).getDate();

					var temp_date = parseInt(activeYear) + "-" + i + "-" + 1;
					var dated = new Date(temp_date).getDay();
					cal = getDays(daysInMonth,dated);
				}

				if (document.getElementById("eventMonth").innerHTML == "JANUARY") {
					if (i < 2) {
						var scope = angular.element(document.getElementById("myCtrl")).scope();
						scope.$apply(function() {
							scope.getEventForCalendar('prev',cal,months[i-1],parseInt(activeYear));
						});
					} 
				} else if (document.getElementById("eventMonth").innerHTML == "FEBRUARY") {
					if (i < 3) {
						var scope = angular.element(document.getElementById("myCtrl")).scope();
						scope.$apply(function() {
							scope.getEventForCalendar('prev',cal,months[i-1],parseInt(activeYear));
						});
					} 
				} else if (document.getElementById("eventMonth").innerHTML == "MARCH") {
					if (i < 4) {
						var scope = angular.element(document.getElementById("myCtrl")).scope();
						scope.$apply(function() {
							scope.getEventForCalendar('prev',cal,months[i-1],parseInt(activeYear));
						});
					} 
				} else if (document.getElementById("eventMonth").innerHTML == "APRIL") {
					if (i < 5) {
						var scope = angular.element(document.getElementById("myCtrl")).scope();
						scope.$apply(function() {
							scope.getEventForCalendar('prev',cal,months[i-1],parseInt(activeYear));
						});
					} 
				} else if (document.getElementById("eventMonth").innerHTML == "MAY") {
					if (i < 6) {
						var scope = angular.element(document.getElementById("myCtrl")).scope();
						scope.$apply(function() {
							scope.getEventForCalendar('prev',cal,months[i-1],parseInt(activeYear));
						});
					} 
				} else if (document.getElementById("eventMonth").innerHTML == "JUNE") {
					if (i < 7) {
						var scope = angular.element(document.getElementById("myCtrl")).scope();
						scope.$apply(function() {
							scope.getEventForCalendar('prev',cal,months[i-1],parseInt(activeYear));
						});
					} 
				} else if (document.getElementById("eventMonth").innerHTML == "JULY") {
					if (i < 8) {
						var scope = angular.element(document.getElementById("myCtrl")).scope();
						scope.$apply(function() {
							scope.getEventForCalendar('prev',cal,months[i-1],parseInt(activeYear));
						});
					} 
				} else if (document.getElementById("eventMonth").innerHTML == "AUGUST") {
					if (i < 9) {
						var scope = angular.element(document.getElementById("myCtrl")).scope();
						scope.$apply(function() {
							scope.getEventForCalendar('prev',cal,months[i-1],parseInt(activeYear));
						});
					}
				} else if (document.getElementById("eventMonth").innerHTML == "SEPTEMBER") {
					if (i < 10) {
						var scope = angular.element(document.getElementById("myCtrl")).scope();
						scope.$apply(function() {
							scope.getEventForCalendar('prev',cal,months[i-1],parseInt(activeYear));
						});
					}
				} else if (document.getElementById("eventMonth").innerHTML == "OCTOBER") {
					if (i < 11) {
						var scope = angular.element(document.getElementById("myCtrl")).scope();
						scope.$apply(function() {
							scope.getEventForCalendar('prev',cal,months[i-1],parseInt(activeYear));
						});
					}
				} else if (document.getElementById("eventMonth").innerHTML == "NOVEMBER") {
					if (i < 12) {
						var scope = angular.element(document.getElementById("myCtrl")).scope();
						scope.$apply(function() {
							scope.getEventForCalendar('prev',cal,months[i-1],parseInt(activeYear));
						});
					}
				} else if (document.getElementById("eventMonth").innerHTML == "DECEMBER") {
					if (i == 12) {
						console.log(document.getElementById("eventMonth").innerHTML);
						var scope = angular.element(document.getElementById("myCtrl")).scope();
						scope.$apply(function() {
							scope.getEventForCalendar('prev',cal,months[i-1],parseInt(activeYear));
						});
					}
				}
			} if (loopBreak) { break; }
		} 
	} else if (stat == 'next') { 
		var loopBreak = false;
		for (var i = 0; i < 12; i++) {
			if (activeMonth == months[11]) {
				document.getElementById("eventMonth").innerHTML = months[0];
				document.getElementById("eventYear").innerHTML = parseInt(activeYear) + 1;
				daysInMonth = new Date((parseInt(activeYear) + 1),1,0).getDate();

				var temp_date = (parseInt(activeYear) + 1) + "-" + 1 + "-" + 1;
				var dated = new Date(temp_date).getDay();
				cal = getDays(daysInMonth,dated);
				loopBreak = true;

				var scope = angular.element(document.getElementById("myCtrl")).scope();
				scope.$apply(function() {
					scope.getEventForCalendar('next',cal,months[0],parseInt(activeYear) + 1);
				});
			} else {
				if (months[i] == activeMonth) {
					document.getElementById("eventMonth").innerHTML = months[i+1];
					daysInMonth = new Date(parseInt(activeYear),(i+2),0).getDate();

					var temp_date = parseInt(activeYear) + "-" + (i+2) + "-" + 1;
					var dated = new Date(temp_date).getDay();
					cal = getDays(daysInMonth,dated);
				}

				if (document.getElementById("eventMonth").innerHTML == "JANUARY") {
					if (i = 0) {
						var scope = angular.element(document.getElementById("myCtrl")).scope();
						scope.$apply(function() {
							scope.getEventForCalendar('next',cal,months[i+1],parseInt(activeYear));
						});
					} 
				} else if (document.getElementById("eventMonth").innerHTML == "FEBRUARY") {
					if (i < 1) {
						var scope = angular.element(document.getElementById("myCtrl")).scope();
						scope.$apply(function() {
							scope.getEventForCalendar('next',cal,months[i+1],parseInt(activeYear));
						});
					} 
				} else if (document.getElementById("eventMonth").innerHTML == "MARCH") {
					if (i < 2) {
						var scope = angular.element(document.getElementById("myCtrl")).scope();
						scope.$apply(function() {
							scope.getEventForCalendar('next',cal,months[i+1],parseInt(activeYear));
						});
					} 
				} else if (document.getElementById("eventMonth").innerHTML == "APRIL") {
					if (i < 3) {
						var scope = angular.element(document.getElementById("myCtrl")).scope();
						scope.$apply(function() {
							scope.getEventForCalendar('next',cal,months[i+1],parseInt(activeYear));
						});
					} 
				} else if (document.getElementById("eventMonth").innerHTML == "MAY") {
					if (i < 4) {
						var scope = angular.element(document.getElementById("myCtrl")).scope();
						scope.$apply(function() {
							scope.getEventForCalendar('next',cal,months[i+1],parseInt(activeYear));
						});
					} 
				} else if (document.getElementById("eventMonth").innerHTML == "JUNE") {
					if (i < 5) {
						var scope = angular.element(document.getElementById("myCtrl")).scope();
						scope.$apply(function() {
							scope.getEventForCalendar('next',cal,months[i+1],parseInt(activeYear));
						});
					} 
				} else if (document.getElementById("eventMonth").innerHTML == "JULY") {
					if (i < 6) {
						var scope = angular.element(document.getElementById("myCtrl")).scope();
						scope.$apply(function() {
							scope.getEventForCalendar('next',cal,months[i+1],parseInt(activeYear));
						});
					} 
				} else if (document.getElementById("eventMonth").innerHTML == "AUGUST") {
					if (i < 7) {
						var scope = angular.element(document.getElementById("myCtrl")).scope();
						scope.$apply(function() {
							scope.getEventForCalendar('next',cal,months[i+1],parseInt(activeYear));
						});
					} 
				} else if (document.getElementById("eventMonth").innerHTML == "SEPTEMBER") {
					if (i < 8) {
						var scope = angular.element(document.getElementById("myCtrl")).scope();
						scope.$apply(function() {
							scope.getEventForCalendar('next',cal,months[i+1],parseInt(activeYear));
						});
					} 
				} else if (document.getElementById("eventMonth").innerHTML == "OCTOBER") {
					if (i < 9) {
						var scope = angular.element(document.getElementById("myCtrl")).scope();
						scope.$apply(function() {
							scope.getEventForCalendar('next',cal,months[i+1],parseInt(activeYear));
						});
					} 
				} else if (document.getElementById("eventMonth").innerHTML == "NOVEMBER") {
					if (i < 10) {
						var scope = angular.element(document.getElementById("myCtrl")).scope();
						scope.$apply(function() {
							scope.getEventForCalendar('next',cal,months[i+1],parseInt(activeYear));
						});
					} 
				} else if (document.getElementById("eventMonth").innerHTML == "DECEMBER") {
					if (i < 11) {
						var scope = angular.element(document.getElementById("myCtrl")).scope();
						scope.$apply(function() {
							scope.getEventForCalendar('next',cal,months[i+1],parseInt(activeYear));
						});
					} 
				}		
			} if (loopBreak) { break; }
		} 
	}

	var tr = "";
	var temp_tr = "";
	var index = months.indexOf(activeMonth);
	if (stat == 'prev') {
		var CD = months[curDate.getMonth()] + " " + curDate.getDate() + ", " + curDate.getFullYear();
		for (var i = 0; i < 6; i++) {
			var td = "";
			for (var j = 0; j < 7; j++) {
				if (months[index-1] == undefined) {
					var AD = "DECEMBER " + cal[i][j] + ", " + (parseInt(activeYear)-1);
				} else {
					var AD = months[index-1] + " " + cal[i][j] + ", " + activeYear;
				} 
				if (CD == AD) {
					td = td + "<td><p style='background: rgb(54,118,222); color: #fff;'>" + cal[i][j] + "</p></td>";
				} else {
					td = td + "<td><p>" + cal[i][j] + "</p></td>";
				}
			} temp_tr = temp_tr + "<tr>" + td + "</tr>";
		} tr = temp_tr;
	} else if (stat == 'next') {
		var CD = months[curDate.getMonth()] + " " + curDate.getDate() + ", " + curDate.getFullYear();
		for (var i = 0; i < 6; i++) {
			var td = "";
			for (var j = 0; j < 7; j++) {
				if (months[index+1] == undefined) {
					var AD = "JANUARY " + cal[i][j] + ", " + (parseInt(activeYear)+1);
				} else {
					var AD = months[index+1] + " " + cal[i][j] + ", " + activeYear;
				}
				if (CD == AD) {
					td = td + "<td><p style='background: rgb(54,118,222); color: #fff;'>" + cal[i][j] + "</p></td>";
				} else {
					td = td + "<td><p>" + cal[i][j] + "</p></td>";
				}
			} temp_tr = temp_tr + "<tr>" + td + "</tr>";
		} tr = temp_tr;
	} document.getElementById("view-calendar").innerHTML = tr;
}

var getDays = function(days,n) {
	var calendar = [];
	var dayStart = n+1;
	var counter = 1;

	for (var i = 0; i < 6; i++) {
		var arr = [];
		for (var j = 1; j <= 7; j++) {
			 if (counter <= days) {
				if (j < dayStart && i == 0) {
					arr[j-1] = " ";
				} else {
					arr[j-1] = counter;
					counter++;
				}
			} else {
				arr[j-1] = " ";
			}
			
			if (j == 7) {
				calendar.push(arr);
			}
		}  
	} return calendar;
}

var viewSelectedEventCalendar = function(id) {
	var scope = angular.element(document.getElementById("myCtrl")).scope();
	scope.$apply(function() {
		scope.viewSelectedEventCalendar(id);
	});
}

var getNumbersOfData = function() {
	var scope = angular.element(document.getElementById("myCtrl")).scope();
	scope.$apply(function() {
		scope.getNumbersOfData();
		scope.getPreviousEvent();
	});
}

var getActiveEvent = function() {
	var scope = angular.element(document.getElementById("myCtrl")).scope();
	scope.$apply(function() {
		scope.getActiveEvent();
	});
}


var getApprovedEvent = function() {
	var scope = angular.element(document.getElementById("myCtrl")).scope();
	scope.$apply(function() {
		scope.getApprovedEvent();
	});
}

var generatePassword = function() {
	var type = ['number','letter','number','letter','number','letter'];
	var letterLower = "abcdefghijklmnopqrstuvwxyz";
	var letterUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var number = "0123456789";
	var cased = ['upper','lower','upper','lower','upper','lower'];
	var code = "";

	var randomType ="";
	var randomCase = "";
	var randomLetterLower = "";
	var randomLetterUpper = "";
	var randomNumber = "";


	for (var i = 0; i < 8; i++) {
		randomType = type[Math.floor(Math.random() * type.length)];
		if (randomType == "letter") {
			randomCase = cased[Math.floor(Math.random() * cased.length)];
			if (randomCase == "upper") {
				randomLetterUpper = letterUpper[Math.floor(Math.random() * letterUpper.length)];
				code += randomLetterUpper;
			} else {
				randomLetterLower = letterLower[Math.floor(Math.random() * letterLower.length)];
				code += randomLetterLower;
			}
		} else {
			randomNumber = number[Math.floor(Math.random() * number.length)];
			code += randomNumber;
		}
	} document.getElementById("coordinator-password").value = code;
}

var addCoordinator = function() {
	var scope = angular.element(document.getElementById("myCtrl")).scope();
	scope.$apply(function() {
		var fname = document.getElementById("coordinator-firstname").value;
		var mname = document.getElementById("coordinator-middlename").value;
		var lname = document.getElementById("coordinator-lastname").value;
		var password = document.getElementById("coordinator-password").value;
		var number = document.getElementById("coordinator-number").value;
		var ministry = document.getElementById("coordinator-select-ministry").value;

		scope.addCoordinator(fname,mname,lname,password,number,ministry);
		document.getElementById("label2").style.display = "none";
		document.getElementById("add-coordinator-loading").style.display = "block";
	});
}

var addEvent = function() {
	var scope = angular.element(document.getElementById("myCtrl")).scope();
	scope.$apply(function() {
		var dateStart = document.getElementById("start-date").value;
		var dateEnd = document.getElementById("end-date").value;
		var fee = document.getElementById("add-event-fee").value;
		var theme = document.getElementById("add-event-theme").value;
		var venue = document.getElementById("add-event-venue").value;
		var speaker = document.getElementById("add-event-speaker").value;
		var church = document.getElementById("select-event-church").value;
		var ministry = document.getElementById("select-event-ministry").value;
		var eventID = document.getElementById("eventID").value;
		var btn = document.getElementById("add-event-btn").innerHTML;

		scope.addEvent(dateStart,dateEnd,fee,theme,venue,speaker,church,ministry,eventID,btn);
	});
}

var getEventType = function(type) {
	var scope = angular.element(document.getElementById("myCtrl")).scope();
	scope.$apply(function() {
		if (type == "All") {
			scope.getEvents();
		} else if (type == "Proposed") {
			scope.getProposedEvents();
		} else if (type == "Approved") {
			scope.getApprovedEvents();
		} else {
			// do nothing...
		}
	});	
}

var editProposedEvent = function(id) {
	var scope = angular.element(document.getElementById("myCtrl")).scope();
	scope.$apply(function() {
		scope.editProposedEvent(id);
	});
}

var deleteProposedEvent = function(id) {
	var scope = angular.element(document.getElementById("myCtrl")).scope();
	scope.$apply(function() {
		document.getElementById("eventID").value = id;
		$(".delete-event-modal").fadeIn();
	});
}

var execDeleteProposedEvent = function() {
	var scope = angular.element(document.getElementById("myCtrl")).scope();
	scope.$apply(function() {
		$(".delete-event-modal").fadeOut();
		scope.deleteProposedEvent(document.getElementById("eventID").value);
	});
}

var addProgram = function(index) {
	var scope = angular.element(document.getElementById("myCtrl")).scope();
	scope.$apply(function() {
		var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];
		var x = scope.event[index].dateStart.split("-");
		var y = scope.event[index].dateEnd.split("-");

		var dated = scope.event[index].theme + "  (" + months[x[1]-1] + " " + x[2] + " - " + months[y[1]-1] + " " + y[2] + ", " + y[0] + ")";
		document.getElementById("themeDate").innerHTML = dated;

		var id = scope.event[index].id;
		var dateStart = scope.event[index].dateStart;
		var dateEnd = scope.event[index].dateEnd;
		var theme = scope.event[index].theme;
		var speaker = scope.event[index].speaker;
		scope.addProgram(id,dateStart,dateEnd,theme,speaker);

		$(".add-program-modal").fadeIn();
	});
}

var queueID = [];
var church_ID = 0;
var getMembersByChurch = function(churchID) {
	queueID = []; church_ID = churchID;
	document.getElementById("member-register-success").style.display = "none";
	var scope = angular.element(document.getElementById("myCtrl")).scope();
	scope.$apply(function() {
		scope.getMembersByChurch(churchID);
	});
}

var queueDelegates = function(id,index) {
	document.getElementById("member-register-success").style.display = "none";
	var checkBox = document.getElementById("checkbox"+index);
	if (checkBox.checked == true) {
		queueID.push(id);
	} else {
		var eraseID = queueID.indexOf(id);
		queueID.splice(eraseID,1);
	}
}

var registerDelegates = function() {
	var scope = angular.element(document.getElementById("myCtrl")).scope();
	scope.$apply(function() {
		scope.registerDelegates(queueID,church_ID);
	});
}

var registerVisitor = function() {
	var scope = angular.element(document.getElementById("myCtrl")).scope();
	scope.$apply(function() {
		var churchID = document.getElementById("register-church-delegate2").value;
		var fullname = document.getElementById("visitor-fullname").value;
		scope.registerVisitor(churchID,fullname);
	});
}

var queueIDPending = [];
var queuePendingDelegates = function(id,index) {
	document.getElementById("pending-register-success").style.display = "none";
	var checkBox = document.getElementById("checkboxPending"+index);
	if (checkBox.checked == true) {
		queueIDPending.push(id);
	} else {
		var eraseID = queueIDPending.indexOf(id);
		queueIDPending.splice(eraseID,1);
	}
}

var registerPendingDelegates = function() {
	var scope = angular.element(document.getElementById("myCtrl")).scope();
	scope.$apply(function() {
		scope.registerPendingDelegates(queueIDPending);
	});
}

var getMyProfile = function() {
	var scope = angular.element(document.getElementById("myCtrl")).scope();
	scope.$apply(function() {
		scope.getMyProfile();
	});
}

var getMyProfileCoordinator = function() {
	var scope = angular.element(document.getElementById("myCtrl")).scope();
	scope.$apply(function() {
		scope.getMyProfileCoordinator();
	});
}

var coordinatorInterval = function() {
	var scope = angular.element(document.getElementById("myCtrl")).scope();
	scope.$apply(function() {
		scope.coordinatorInterval();
	});
}

var viewCoordinatorProfile = function(id) {
	myRoute2("http://localhost/thesisAppProcess/admin/coordinatorProfile.php");
	coordinatorInterval();
	var scope = angular.element(document.getElementById("myCtrl")).scope();
	scope.$apply(function() {
		scope.viewCoordinatorProfile(id);
	});
}

var addExpenses = function() {
	document.getElementById("add-expenses-success").style.display = "none";
	var scope = angular.element(document.getElementById("myCtrl")).scope();
	scope.$apply(function() {
		var item = document.getElementById("purchase-item").value;
		var price = document.getElementById("purchase-price").value;
		var id = document.getElementById("purchase-id").value;
		var btn = document.getElementById("purchase-btn").innerHTML;
		scope.addExpenses(item,price,id,btn);
	});
}

var getExpenses = function() {
	var scope = angular.element(document.getElementById("myCtrl")).scope();
	scope.$apply(function() {
		scope.getExpenses();
	});
}

var updateExpenses = function(index) {
	document.getElementById("add-expenses-success").style.display = "none";
	var scope = angular.element(document.getElementById("myCtrl")).scope();
	scope.$apply(function() {
		document.getElementById("purchase-item").value = scope.expenses[index].description;
		document.getElementById("purchase-price").value = scope.expenses[index].price;
		document.getElementById("purchase-id").value = scope.expenses[index].id;
		document.getElementById("purchase-btn").innerHTML = "Update";
		
	});
}

var deleteExpenses = function(index) {
	document.getElementById("add-expenses-success").style.display = "none";
	var scope = angular.element(document.getElementById("myCtrl")).scope();
	scope.$apply(function() {
		scope.deleteExpenses(scope.expenses[index].id);
	});
}

var getYears = function() {
	var scope = angular.element(document.getElementById("myCtrl")).scope();
	scope.$apply(function() {
		scope.getYears();
	});
}

var getAnnualReports = function(year) {
	if (year == "") {
		// do nothing...
	} else {
		var scope = angular.element(document.getElementById("myCtrl")).scope();
		scope.$apply(function() {
			scope.getAnnualReports(year);
		});
	}
}

var viewCoordinatorReports = function() {
	window.open("../coordinator/printCoordinator.html", "_blank", "scrollbars=yes,width=800,height=1000");
}

var viewReports = function(index) {
	var scope = angular.element(document.getElementById("myCtrl")).scope();
	scope.$apply(function() {
		console.log(scope.event[index]);
		$(".report-event-modal").fadeIn();
	});
}

