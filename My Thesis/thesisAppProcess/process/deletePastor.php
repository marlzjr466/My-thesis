<?php  
	include("../config/db.php");
	
	$data = json_decode(file_get_contents("php://input"));
	if (count($data) > 0) {
		$id = $data->id;

		$query = "DELETE FROM pastor WHERE id = '$id'";
		if(mysqli_query($conn, $query)) {
			echo "Success";
		} else {
			echo "Error";
		}
	}
?>