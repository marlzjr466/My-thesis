function currentDateTime() {
	var today = new Date();

	var days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
	var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];

	var day = days[today.getDay()];
	var month = months[ today.getMonth() ];

	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	var ampm = '';

	var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    var t = setTimeout(currentDateTime, 500);
    var hrs = [12,13,14,15,16,17,18,19,20,21,22,23,24];
    var hourTemp = [12,1,2,3,4,5,6,7,8,9,10,11];
    if (h <= 11) {ampm = "AM";}
    else {
    	ampm = "PM";
	    for (var i = 0; i < hrs.length; i++) {
	    	if (h == hrs[i]) {
	    		h = hourTemp[i];
	    		break;
	    	}
	    }
    }
    document.getElementById("currentDateTime").innerHTML =  month + " " + dd + ", " + yyyy + "  " +  h + ":" + m + ":" + s + " " + ampm + " " + day;
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}	