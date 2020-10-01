<?php  
	include("../config/db.php");

	$output = array();
	$data = json_decode(file_get_contents("php://input"));
	if (count($data) > 0) {
		$userID = $data->id;

		$query = "SELECT * FROM church WHERE hostPastorID = '$userID'";
		$result = mysqli_query($conn, $query);
		if (mysqli_num_rows($result) > 0) {
			while($row = mysqli_fetch_array($result)) {
				$id = $row['id'];
				$query2 = "SELECT * FROM churchmember WHERE churchID = '$id' AND officialmember = 0 order by firstname";
				$result2 = mysqli_query($conn, $query2);
				if (mysqli_num_rows($result2) > 0) {
					while($row2 = mysqli_fetch_array($result2)) {
							$output[] = $row2;
					} 
					 echo json_encode($output);
				}
			}
		}

				
	}
?>