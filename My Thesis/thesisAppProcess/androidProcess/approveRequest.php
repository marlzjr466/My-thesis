<?php  
	include("../config/db.php");
	
	$output = array();

	$data = json_decode(file_get_contents("php://input"));
	if (count($data) > 0) {
		$id = $data->id;

		$sql = "UPDATE churchmember SET officialmember = 1 WHERE id = '$id'";
		if (mysqli_query($conn, $sql)) {
			echo "Success";
		} else {
			echo "Error";
		}	
	}
?>