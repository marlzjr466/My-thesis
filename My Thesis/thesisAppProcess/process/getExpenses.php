<?php  
	include("../config/db.php");
	
	$output = array();

	$eventID = 0;

	$query = "SELECT * FROM event WHERE status = 0 AND approve = 1 AND active = 1";
	$result = mysqli_query($conn, $query);
	if (mysqli_num_rows($result) > 0) {
		while($row = mysqli_fetch_array($result)) {
			$eventID = $row['id'];
		}
	}

	$query = "SELECT * FROM eventexpenses WHERE eventID = 0";
	$result = mysqli_query($conn, $query);
	if (mysqli_num_rows($result) > 0) {
		while($row = mysqli_fetch_array($result)) {
			$output[] = $row;
		}
		echo json_encode($output);
	}
?>