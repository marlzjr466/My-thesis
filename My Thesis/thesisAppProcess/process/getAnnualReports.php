<?php  
	include("../config/db.php");
	
	$data = json_decode(file_get_contents("php://input"));
	$output = array();$event = array();
	$numberOfDelegates = array();
	$eventExpenses = array();
	$temp = array();
	$temp2 = 0;
	$delegates = array();
	$eventID = 0;

	if (count($data) > 0) {
		$year = mysqli_real_escape_string($conn, $data->year);

		$query = "SELECT * FROM event WHERE status = 1 AND approve = 1 AND active = 0";
		$result = mysqli_query($conn, $query);
		if (mysqli_num_rows($result) > 0) {
			while($row = mysqli_fetch_array($result)) {
				$x = explode('-',$row['dateStart']);
				if ($x[0] == $year) {
					$event[] = $row;
					$delegates[] = $row['id'];
				} 
			}
		} 

		for ($i = 0; $i < sizeof($delegates); $i++) {
			$eventID = $delegates[$i];
			$query2 = "SELECT * FROM delegates WHERE eventID = $eventID";
			$result2 = mysqli_query($conn, $query2);
			if (mysqli_num_rows($result2) > 0) {
				while($row = mysqli_fetch_array($result2)) {
					$temp[] = $row;
				}
			} $numberOfDelegates[] = sizeof($temp);

			$query3 = "SELECT * FROM eventexpenses WHERE eventID = $eventID";
			$result3 = mysqli_query($conn, $query3);
			if (mysqli_num_rows($result3) > 0) {
				while($row = mysqli_fetch_array($result3)) {
					$temp2 += (float)$row['price'];
				}
				$eventExpenses[] = (float)$temp2;
			} 
		}
			
		$output = array(
			'event' => $event,
			'numberOfDelegates' => $numberOfDelegates,
			'expenses' => $eventExpenses
		); echo json_encode($output);
	}
?>