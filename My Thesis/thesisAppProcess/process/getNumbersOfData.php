<?php  
	include("../config/db.php");
	
	$output = array();
	$ministry = array();
	$church = array();
	$eventActive = array();
	$eventPrevious = array();
	$pastor = array();

	$query = "SELECT * FROM ministry";
	$result = mysqli_query($conn, $query);
	if (mysqli_num_rows($result) > 0) {
		while($row = mysqli_fetch_array($result)) {
			$ministry[] = $row;
		}
	}

	$query2 = "SELECT * FROM church";
	$result2 = mysqli_query($conn, $query2);
	if (mysqli_num_rows($result2) > 0) {
		while($row = mysqli_fetch_array($result2)) {
			$church[] = $row;
		}
	}

	$query3 = "SELECT * FROM event WHERE status = 1 AND approve = 1 AND active = 0";
	$result3 = mysqli_query($conn, $query3);
	if (mysqli_num_rows($result3) > 0) {
		while($row = mysqli_fetch_array($result3)) {
			$eventPrevious[] = $row;
		}
	}

	$query4 = "SELECT * FROM pastor order by firstname";
	$result4 = mysqli_query($conn, $query4);
	if (mysqli_num_rows($result4) > 0) {
		while($row = mysqli_fetch_array($result4)) {
			$pastor[] = $row;
		}
	}

	$query6 = "SELECT * FROM event WHERE status = 0 AND approve = 1 AND active = 1";
	$result6 = mysqli_query($conn, $query6);
	if (mysqli_num_rows($result6) > 0) {
		while($row = mysqli_fetch_array($result6)) {
			$eventActive[] = $row;
		}
	}

	$output = array('ministryNumber' => sizeof($ministry),
					'churchNumber' => sizeof($church),
					'eventActiveNumber' => sizeof($eventActive),
					'eventPreviousNumber' => sizeof($eventPrevious),
					'pastorNumber' => sizeof($pastor)
					);

	echo json_encode($output);
?>