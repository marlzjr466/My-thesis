<?php  
	include("../config/db.php");
	
	$output = array();

	$data = json_decode(file_get_contents("php://input"));
	if (count($data) > 0) {
		$id = $data->id;

		$sql = "UPDATE ministry SET assign = 1 WHERE id = '$id'";
		if (mysqli_query($conn, $sql)) {
			$query = "SELECT * FROM ministry WHERE id = '$id'";
			$result = mysqli_query($conn, $query);
			if (mysqli_num_rows($result) > 0) {
				while($row = mysqli_fetch_array($result)) {
					$output[] = $row;
				}
				echo json_encode($output);
			}
		} else {
			echo "Error";
		}	
	}
?>