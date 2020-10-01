<?php  
	include("../config/db.php");

	$output = array();
	$data = json_decode(file_get_contents("php://input"));
	if (count($data) > 0) {
		$pastorID = $data->id;

		$query = "SELECT * FROM pastor WHERE id = '$pastorID'";
		$result = mysqli_query($conn, $query);
		if (mysqli_num_rows($result) > 0) {
			while($row = mysqli_fetch_array($result)) {
					$output[] = $row;
			}
			echo json_encode($output);
		} else {
			echo "statusZero";
		}
	}
?>