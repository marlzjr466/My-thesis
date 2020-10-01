<?php  
	include("../config/db.php");
	
	$data = json_decode(file_get_contents("php://input"));
	if (count($data) > 0) {
		$id = $data->id;

		$query = "DELETE FROM ministry WHERE id = '$id'";
		if(mysqli_query($conn, $query)) {
			 echo "Success";
			// echo mysqli_error($conn);
		} else {
			echo "Error";
		}
	}
?>