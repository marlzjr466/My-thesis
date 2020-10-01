<?php  
	include("../config/db.php");
	
	$output = array();

	$data = json_decode(file_get_contents("php://input"));
	if (count($data) > 0) {
		$friendID = $data->friendID;
		$userID = $data->userID;

		$query = "SELECT * FROM messages WHERE (userID = '$userID' AND friendID = '$friendID') OR (userID = '$friendID' AND friendID = '$userID') order by id";
		$result = mysqli_query($conn, $query);
		if (mysqli_num_rows($result) > 0) {
			while($row = mysqli_fetch_array($result)) {
				$output[] = $row;
			}
			echo json_encode($output);
		}
	}

		
?>