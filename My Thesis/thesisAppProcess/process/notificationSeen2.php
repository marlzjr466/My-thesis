<?php  
	include("../config/db.php");

	$output = array();
	$data = json_decode(file_get_contents("php://input"));
	if (count($data) > 0) {
		$ministryID = $data->ministryID;

		 $sql = "UPDATE notification SET seencoordinator = 1 WHERE ministryID = '$ministryID'";
		if (mysqli_query($conn, $sql)) {
			echo "Success";
		} else {
			echo "Error";
		}
	}
?>