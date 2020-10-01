<?php  
	include("../config/db.php");

	$eventID = 0;
	$data = json_decode(file_get_contents("php://input"));
	if (count($data) > 0) {
		$ids = $data->ids;
		
		for ($i = 0; $i < sizeof($ids); $i++) {
			$id = $ids[$i];
			$sql = "UPDATE delegates SET pending = 1 WHERE memberID = '$id'";
			if (mysqli_query($conn, $sql)) {
				if ($i == (sizeof($ids)-1)) {
					echo "Success";
				}
			} else {
				if ($i == (sizeof($ids)-1)) {
					echo "Error";
				}
			}
		}
	 }
?>