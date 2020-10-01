<?php 
	header ("Access-Control-Allow-Headers: *");
	header ("Access-Control-Allow-Origin: *");
	header ("Access-Control-Expose-Headers: Content-Length, X-JSON");
	header ("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
	

	date_default_timezone_set("Asia/Manila");
	$dated = date("Y-m-d",strtotime("now"));
	$hourMin = date("H:i ",strtotime("now"));

	
	$conn = new mysqli("localhost", "root", "", "thesisapp");


?>