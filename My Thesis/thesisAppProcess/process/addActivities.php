<?php  
	include("../config/db.php");

	$data = json_decode(file_get_contents("php://input"));
	if (count($data) > 0) {
		$day = mysqli_real_escape_string($conn, $data->day);
		$start = mysqli_real_escape_string($conn, $data->start);
		$end = mysqli_real_escape_string($conn, $data->end);
		$desc = mysqli_real_escape_string($conn, $data->desc);
		$incharge = mysqli_real_escape_string($conn, $data->incharge);

		$finalStart = date("h:i A",strtotime($start));
		$finalEnd = date("h:i A",strtotime($end));

		// if ($btn == "ADD") {
			$sql = "INSERT INTO eventactivities(eventDaysID,startTime,endTime,description,inCharge) VALUES ('$day', '$finalStart', '$finalEnd', '$desc', '$incharge')";
			if (mysqli_query($conn, $sql)) {
				echo "Success";
			} else {
				echo "Error";
			}
		 // } else {
			// $id = $data->id;
			// $sql = "UPDATE church SET name = '$name', address = '$address', status = '$type', mission = '$mission', vision = '$vision', hostPastorID = '$pastorID', image = '$image' WHERE id = '$id'";
			// if (mysqli_query($conn, $sql)) {
			// 	echo "Success";
			// } else {
			// 	echo "Error";
			// }
		 // }	
	}
?>