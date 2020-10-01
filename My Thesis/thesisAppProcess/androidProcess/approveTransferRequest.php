<?php  
	include("../config/db.php");

	$data = json_decode(file_get_contents("php://input"));
	if (count($data) > 0) {
		$id = $data->id;
		$sql = "UPDATE transferrequest SET approve = 1 WHERE id = '$id'";
		if (mysqli_query($conn, $sql)) {
			$query = "SELECT * FROM transferrequest WHERE id = '$id'";
			$result = mysqli_query($conn, $query);
			if (mysqli_num_rows($result) > 0) {
				while($row = mysqli_fetch_array($result)) {
					$churchID = $row['toChurchID'];
					$userID = $row['userID'];
					$sql2 = "UPDATE churchmember SET churchID = '$churchID', officialmember = 0 WHERE id = '$userID'";
					if (mysqli_query($conn, $sql2)) {
						echo "Success";
					}
				}
			}
		} else {
			echo "Error";
		}	
	}
?>