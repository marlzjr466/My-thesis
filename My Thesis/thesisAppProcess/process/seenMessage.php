<?php  
	include("../config/db.php");
	
	$output = array();

	$data = json_decode(file_get_contents("php://input"));
	if (count($data) > 0) {
		$friendID = $data->friendID;
		$userID = $data->userID;

		$sql = "UPDATE messages SET seen = 1 WHERE userID = '$friendID' AND friendID = '$userID'";
		if (mysqli_query($conn, $sql)) {
			$query = "SELECT * FROM messages WHERE userID = '$friendID' AND friendID = '$userID' AND seen = 0";
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