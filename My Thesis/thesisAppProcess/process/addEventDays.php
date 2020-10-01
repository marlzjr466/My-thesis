<?php  
	include("../config/db.php");

	$output = array();
	$data = json_decode(file_get_contents("php://input"));
	if (count($data) > 0) {
		$batchID = $data->batchID;
		$days = $data->days;

		for ($i = 1; $i <= $days; $i++) {
			$sql = "INSERT INTO eventdays(batchID,day) VALUES ('$batchID', '$i')";
			if (mysqli_query($conn, $sql)) {
				echo "Success";
			} else {
				echo "Error";
			}
		}
	}
?>