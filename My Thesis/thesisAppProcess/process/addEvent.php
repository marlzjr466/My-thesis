<?php  
	include("../config/db.php");

	$data = json_decode(file_get_contents("php://input"));
	if (count($data) > 0) {
		$dateStart = mysqli_real_escape_string($conn, $data->dateStart);
		$dateEnd = mysqli_real_escape_string($conn, $data->dateEnd);
		$fee = $data->fee;
		$theme = mysqli_real_escape_string($conn, $data->theme);
		$address = mysqli_real_escape_string($conn, $data->address);
		$speaker = mysqli_real_escape_string($conn, $data->speaker);
		$host = $data->host;
		$ministry = $data->ministry;
		$image = mysqli_real_escape_string($conn, $data->image);
		$btn = mysqli_real_escape_string($conn, $data->btn);

		if ($btn == "CREATE") {
			$sql = "INSERT INTO event(dateStart,dateEnd,registrationFee,theme,address,speaker,hostChurch,ministryID,image) VALUES ('$dateStart', '$dateEnd', '$fee', '$theme', '$address', '$speaker', '$host', '$ministry', '$image')";
			if (mysqli_query($conn, $sql)) {
				$query = "SELECT * FROM event ORDER BY id DESC LIMIT 1";
				$result = mysqli_query($conn, $query);
				if (mysqli_num_rows($result) > 0) {
					while($row = mysqli_fetch_array($result)) {
						$eventID = $row['id'];
						$query2 = "INSERT INTO notification(eventID,ministryID) VALUES ('$eventID', '$ministry')";
						if (mysqli_query($conn, $query2)) {
							echo 1;
						}
					}
				}
			} else {
				echo "Error";
			}
		 } else {
			$id = $data->id;
			$sql = "UPDATE event SET dateStart = '$dateStart', dateEnd = '$dateEnd', registrationFee = '$fee', theme = '$theme', address = '$address', speaker = '$speaker', hostChurch = '$host', ministryID = '$ministry', image = '$image' WHERE id = '$id'";
			if (mysqli_query($conn, $sql)) {
				echo "Success";
			} else {
				echo "Error";
			}
		 }	
	}
?>

