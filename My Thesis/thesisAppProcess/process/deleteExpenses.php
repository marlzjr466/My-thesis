<?php  
	include("../config/db.php");
	
	$data = json_decode(file_get_contents("php://input"));
	if (count($data) > 0) {
		$id = $data->id;

		$query = "DELETE FROM eventexpenses WHERE id = '$id'";
		if(mysqli_query($conn, $query)) {
			echo 1;
		} else {
			echo "Error";
		}
	}
?>