<?php  
	include("../config/db.php");

	$data = json_decode(file_get_contents("php://input"));

	if (count($data) > 0) {
		$userID = $data->id;

		$sql = "UPDATE pastor SET status = 0 WHERE id = '$userID'";
		if (mysqli_query($conn, $sql)) {
			echo "Success";
		} else {
			echo "Error";
		}
	}
?>