<?php  
	include("../config/db.php");

	$output = array();
	$coordinator = array();
	$notification = array();
	$event = array();

	$query = "SELECT * FROM notification WHERE approve = 1 order by id desc limit 10";
	$result = mysqli_query($conn, $query);
	if (mysqli_num_rows($result) > 0) {
		while($row = mysqli_fetch_array($result)) {
			$notification[] = $row;

			$id = $row['ministryID'];
			$query2 = "SELECT * FROM users WHERE id = 1";
			$result2 = mysqli_query($conn, $query2);
			if (mysqli_num_rows($result2) > 0) {
				while($row2 = mysqli_fetch_array($result2)) {
					$coordinator[] = $row2;
				}
			}

			$query3 = "SELECT * FROM event order by id desc limit 1";
			$result3 = mysqli_query($conn, $query3);
			if (mysqli_num_rows($result3) > 0) {
				while($row3 = mysqli_fetch_array($result3)) {
					$event[] = $row3;
				}
			}
		}
	}

	$output = array('coordinator' => $coordinator,
					'notification' => $notification,
					'event' => $event
					);
	echo json_encode($output);
?>