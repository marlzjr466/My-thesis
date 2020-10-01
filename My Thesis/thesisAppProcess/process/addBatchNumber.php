<?php  
	include("../config/db.php");
	$output = array();
	$data = json_decode(file_get_contents("php://input"));
	if (count($data) > 0) {
		$userID = $data->userID;
		$friendID = $data->friendID;

		$sql = "INSERT INTO batchNumber(userID,friendID) VALUES ('$userID', '$friendID')";
		if (mysqli_query($conn, $sql)) {

			$query = "SELECT * FROM batchnumber order by batchNumber desc";
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