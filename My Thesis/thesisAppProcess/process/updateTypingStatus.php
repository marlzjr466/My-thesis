<?php  
	include("../config/db.php");

	$data = json_decode(file_get_contents("php://input"));
	if (count($data) > 0) {
		$status = $data->status;
		$userID = $data->userID;

		$sql = "UPDATE users SET typing = '$status' WHERE id = '$userID'";
		if (mysqli_query($conn, $sql)) {
			echo "Success";
		} else {
			echo "Error";
		}
	}
?>