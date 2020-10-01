<?php  
	include("../config/db.php");

	$data = json_decode(file_get_contents("php://input"));
	if (count($data) > 0) {
		$userID = $data->userID;
		$friendID = $data->friendID;
		$message = mysqli_real_escape_string($conn, $data->message);
		$dated = mysqli_real_escape_string($conn, $data->dated);
		$batchNumber = $data->batchNumber;

		$sql = "INSERT INTO messages(userID,friendID,message,datedTime,batchID) VALUES ('$userID', '$friendID', '$message', '$dated', '$batchNumber')";
		if (mysqli_query($conn, $sql)) {
			echo "Success";
		} else {
			echo mysqli_error($conn);
		}
	}
?>