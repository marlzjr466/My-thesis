<?php  
	include("../config/db.php");

	$output = array();
	$myArray = array();
	$data = json_decode(file_get_contents("php://input"));
	if (count($data) > 0) {
		$daysID = $data->days;
		$daysString = mysqli_real_escape_string($conn, $data->daysString);
		// echo $daysID;
		if ($daysString != 'none') {
			$sql = "UPDATE activitiesdays SET daysID = '$daysString' WHERE id = 1";
			if (mysqli_query($conn, $sql)) {
			} else {}
		}

		for ($i = 0; $i < count($daysID); $i++) { 
			$x = (int)$daysID[$i];
			$query = "SELECT * FROM eventActivities WHERE eventDaysID = '$x' order by startTime";
			$result = mysqli_query($conn, $query);
			if (mysqli_num_rows($result) > 0) {
				while($row = mysqli_fetch_array($result)) {
						$myArray[] = $row;
				} $output[$i] = $myArray;
			} $myArray = [];
		}	
		 echo json_encode($output);
	 }
?>