<?php  
	include("../config/db.php");

	$output = array();
	$data = json_decode(file_get_contents("php://input"));
	if (count($data) > 0) {
		$userID = $data->id;
		$toChurch = $data->toChurch;
		$reason = mysqli_real_escape_string($conn, $data->reason);

		$query = "SELECT * FROM churchmember WHERE id = '$userID'";
		$result = mysqli_query($conn, $query);
		if (mysqli_num_rows($result) > 0) {
			while($row = mysqli_fetch_array($result)) {
				$fromChurch = $row['churchID'];
				$sql = "INSERT INTO transferrequest(toChurchID,fromChurchID,userID,reason) VALUES ('$toChurch', '$fromChurch', '$userID', '$reason')";
				if (mysqli_query($conn, $sql)) {
					echo "Success";
				} else {
					echo mysqli_error($conn);
				}
			}
		} else {
			echo "statusZero";
		}
	}
?>