<?php  
	include("../config/db.php");

	$data = json_decode(file_get_contents("php://input"));
	if (count($data) > 0) {
		$id = $data->id;
		$sql = "UPDATE event SET status = 1, active = 0 WHERE id = '$id'";
		if (mysqli_query($conn, $sql)) {
			echo "Success";
		} else {
			echo "Error";
		}
	}
?>