/*	my-route JS - v1.0 - 2018-09-27
	http://myroutejs.com
 	Copyright 2018 my-route by Biboy Langomez II; Licensed WMSU-ESU Molave 
 */
function myRoute(path) {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new AtiveXObject("Microsoft.XMLHTTP");
	}
	
	xmlhttp.onreadystatechange = function () {
		var cal = [];
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			document.getElementById("view-route").innerHTML = xmlhttp.responseText;

			var months = ['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'];
			var curDate = new Date();
			document.getElementById("eventMonth").innerHTML = months[curDate.getMonth()];
			document.getElementById("eventYear").innerHTML = curDate.getFullYear();

			var daysInMonth = new Date(curDate.getFullYear(),(curDate.getMonth()+1),0).getDate();
			var dated = curDate.getFullYear() + "-" + (curDate.getMonth()+1) + "-" + 1;
			var dayStart = new Date(dated).getDay();
			cal = getDaysActive(daysInMonth,dayStart);

			var tr = "";
			var temp_tr = "";

			for (var i = 0; i < 6; i++) {
				var td = "";
				for (var j = 0; j < 7; j++) {
					if (curDate.getDate() == cal[i][j]) {
						td = td + "<td><p style='background: rgb(54,118,222); color: #fff;'>" + cal[i][j] + "</p></td>";
					} else {
						td = td + "<td><p>" + cal[i][j] + "</p></td>";
					}
				} temp_tr = temp_tr + "<tr>" + td + "</tr>";
			} tr = temp_tr;

			document.getElementById("view-calendar").innerHTML = tr;

			var scope = angular.element(document.getElementById("myCtrl")).scope();
			scope.$apply(function() {
				scope.getEventForCalendar('',cal,months[curDate.getMonth()],curDate.getFullYear());
				scope.getSelectChurches();
			});

			document.getElementById("previous-event-wrapper").innerHTML = "";
		}
	}
	xmlhttp.open("GET",path,true);
	xmlhttp.send();
}

var getDaysActive = function(days,n) {
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

function myRoute2(path) {
	$(".header-nav ul li").removeClass("active");
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new AtiveXObject("Microsoft.XMLHTTP");
	}
	
	xmlhttp.onreadystatechange = function () {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			document.getElementById("view-route").innerHTML = xmlhttp.responseText;

			var months = ['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'];
			var curDate = new Date();
			document.getElementById("eventMonth").innerHTML = months[curDate.getMonth()];
			document.getElementById("eventYear").innerHTML = curDate.getFullYear();

			var daysInMonth = new Date(curDate.getFullYear(),(curDate.getMonth()+1),0).getDate();
			var dated = curDate.getFullYear() + "-" + (curDate.getMonth()+1) + "-" + 1;
			var dayStart = new Date(dated).getDay();
			cal = getDaysActive(daysInMonth,dayStart);

			var tr = "";
			var temp_tr = "";

			for (var i = 0; i < 6; i++) {
				var td = "";
				for (var j = 0; j < 7; j++) {
					if (curDate.getDate() == cal[i][j]) {
						td = td + "<td><p style='background: rgb(54,118,222); color: #fff;'>" + cal[i][j] + "</p></td>";
					} else {
						td = td + "<td><p>" + cal[i][j] + "</p></td>";
					}
				} temp_tr = temp_tr + "<tr>" + td + "</tr>";
			} tr = temp_tr;

			document.getElementById("view-calendar").innerHTML = tr;

			var scope = angular.element(document.getElementById("myCtrl")).scope();
			scope.$apply(function() {
				scope.getEventForCalendar('',cal,months[curDate.getMonth()],curDate.getFullYear());
				scope.getSelectChurches();
			});

			document.getElementById("previous-event-wrapper").innerHTML = "";
		}
	}
	xmlhttp.open("GET",path,true);
	xmlhttp.send();
}

function myRoute3(path) {
	$(".header-nav ul li").removeClass("active");
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new AtiveXObject("Microsoft.XMLHTTP");
	}
	
	xmlhttp.onreadystatechange = function () {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			document.getElementById("view-route").innerHTML = xmlhttp.responseText;
		}
	}
	xmlhttp.open("GET",path,true);
	xmlhttp.send();
}