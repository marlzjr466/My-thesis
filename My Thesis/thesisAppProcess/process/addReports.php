<?php  
	include("../config/db.php");

	$data = json_decode(file_get_contents("php://input"));
	if (count($data) > 0) {
		$activeID = $data->id;
		$purpose = mysqli_real_escape_string($conn, $data->purpose);
		$price = $data->price;

		$sql = "INSERT INTO report(eventID,purpose,price) VALUES ('$activeID', '$purpose', '$price')";
		if (mysqli_query($conn, $sql)) {
			echo "Success";
		} else {
			echo "Error";
		}
	}
?>