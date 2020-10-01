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
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			document.getElementById("view-route").innerHTML = xmlhttp.responseText;
		}
	}
	xmlhttp.open("GET",path,true);
	xmlhttp.send();
} 