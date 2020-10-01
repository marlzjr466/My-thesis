<?php  
	include("../config/db.php");

	$coordinator = array();
	$eventUpcoming = array();
	$eventActive = array();
	$eventPrevious = array();
	$ministry = array();
	$output = array();

	$query = "SELECT * FROM users WHERE id > 1";
	$result = mysqli_query($conn, $query);
	if (mysqli_num_rows($result) > 0) {
		while($row = mysqli_fetch_array($result)) {
			$coordinator[] = $row;
		}
	}

	$query2 = "SELECT * FROM ministry";
	$result2 = mysqli_query($conn, $query2);
	if (mysqli_num_rows($result2) > 0) {
		while($row = mysqli_fetch_array($result2)) {
			$ministry[] = $row;
		}
	} 

	$query3 = "SELECT * FROM event WHERE status = 1 AND approve = 1 AND active = 0";
	$result3 = mysqli_query($conn, $query3);
	if (mysqli_num_rows($result3) > 0) {
		while($row = mysqli_fetch_array($result3)) {
			$eventPrevious[] = $row;
		}
	}

	$query5 = "SELECT * FROM event WHERE status = 0 AND approve = 1 AND active = 0";
	$result5 = mysqli_query($conn, $query5);
	if (mysqli_num_rows($result5) > 0) {
		while($row = mysqli_fetch_array($result5)) {
			$eventUpcoming[] = $row;
		}
	}

	$query6 = "SELECT * FROM event WHERE status = 0 AND approve = 1 AND active = 1";
	$result6 = mysqli_query($conn, $query6);
	if (mysqli_num_rows($result6) > 0) {
		while($row = mysqli_fetch_array($result6)) {
			$eventActive[] = $row;
		}
	}

	$output = array('coordinator' => $coordinator,
					'previousEvent' => $eventPrevious,
					'upcomingEvent' => $eventUpcoming,
					'activeEvent' => $eventActive,
					'ministry' => $ministry
					);

	echo json_encode($output);
?>