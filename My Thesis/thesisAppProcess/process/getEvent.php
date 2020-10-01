<?php  
	include("../config/db.php");
	
	$ministry = array();
	$church = array();
	$event = array();
	$eventApprove = array();
	$eventActive = array();
	$event2 = array();
	$output = array();

	$query = "SELECT * FROM ministry order by name";
	$result = mysqli_query($conn, $query);
	if (mysqli_num_rows($result) > 0) {
		while($row = mysqli_fetch_array($result)) {
			$ministry[] = $row;
		}
	}

	$query2 = "SELECT * FROM church order by name";
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
			$event[] = $row;
		}
	}

	$query4 = "SELECT * FROM event WHERE status = 0 AND approve = 0 AND active = 0 order by id desc";
	$result4 = mysqli_query($conn, $query4);
	if (mysqli_num_rows($result4) > 0) {
		while($row = mysqli_fetch_array($result4)) {
			$event2[] = $row;
		}
	}

	$query5 = "SELECT * FROM event WHERE status = 0 AND approve = 1 AND active = 0";
	$result5 = mysqli_query($conn, $query5);
	if (mysqli_num_rows($result5) > 0) {
		while($row = mysqli_fetch_array($result5)) {
			$eventApprove[] = $row;
		}
	}

	$query6 = "SELECT * FROM event WHERE status = 0 AND approve = 1 AND active = 1";
	$result6 = mysqli_query($conn, $query6);
	if (mysqli_num_rows($result6) > 0) {
		while($row = mysqli_fetch_array($result6)) {
			$eventActive[] = $row;
		}
	}

	$output = array('ministryData' => $ministry,
					'churchData' => $church,
					'eventData' => $event,
					'eventData2' => $event2,
					'eventApproveData' => $eventApprove,
					'eventActiveData' => $eventActive
					);

	echo json_encode($output);
?>