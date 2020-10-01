<?php  
	include("../config/db.php");

	$data = json_decode(file_get_contents("php://input"));

	if (count($data) > 0) {
		$userID = $data->userID;

		$sql = "UPDATE users SET status = 0 WHERE id = '$userID'";
		if (mysqli_query($conn, $sql)) {
			echo "Success";
		} else {
			echo "Error";
		}
	}
?>