<?php  
	include("../config/db.php");

	$data = json_decode(file_get_contents("php://input"));
	if (count($data) > 0) {
			$id = $data->id;
			$sql = "UPDATE event SET approve = 1 WHERE id = '$id'";
			if (mysqli_query($conn, $sql)) {
				$sql2 = "UPDATE notification SET approve = 1 WHERE eventID = '$id'";
				if (mysqli_query($conn, $sql2)) {
					echo "Success";
				} else {
					echo "Error";
				}
			} else {
				echo "Error";
			}
	}
?>