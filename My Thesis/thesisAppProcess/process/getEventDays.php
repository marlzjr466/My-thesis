<?php  
	include("../config/db.php");

	$eventDays = array();
	$eventActivities = array();
	$output = array();

	$data = json_decode(file_get_contents("php://input"));
	if (count($data) > 0) {
		$batchID = $data->batchID;

		$query = "SELECT * FROM eventdays WHERE batchID = '$batchID' order by day ASC";
		$result = mysqli_query($conn, $query);
		if (mysqli_num_rows($result) > 0) {
			while($row = mysqli_fetch_array($result)) {
				$eventDays[] = $row;
			}
		} else {
			echo "statusZero";
		}

		for ($i = 0; $i < sizeof($eventDays); $i++) { 
			$id = $eventDays[$i]['id'];
			$query2 = "SELECT * FROM eventActivities WHERE eventDaysID = '$id' order by startTime";
			$result2 = mysqli_query($conn, $query2);
			if (mysqli_num_rows($result2) > 0) {
				while($row = mysqli_fetch_array($result2)) {
						$eventActivities[$i][] = $row;
				} 
			} 
		}

		$output = array('eventDays' => $eventDays, 'eventActivities' => $eventActivities);
		 echo json_encode($output);
	}
?>