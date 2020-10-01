

window.onload = function() {
	var widthSize = window.innerWidth;
	var heightSize = window.innerHeight;
	
	alert(widthSize + " - " + heightSize);

	document.getElementById('mainContainer').style.width = widthSize + "px";
	document.getElementById('mainContainer').style.height = heightSize + "px";
}

$(document).ready(function() {
	$(window).resize(function() {
		var widthSize = window.innerWidth;
		var heightSize = window.innerHeight;

		document.getElementById('mainContainer').style.width = widthSize + "px";
		document.getElementById('mainContainer').style.height = heightSize + "px";
	})
});