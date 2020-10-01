<?php  
	include("../config/db.php");
	
	$output = array();
	$establish = array();
	$sovereign = array();
	$pioneering = array();
	$all = array();

	$query = "SELECT * FROM church WHERE status = 'Establish' order by name ";
	$result = mysqli_query($conn, $query);
	if (mysqli_num_rows($result) > 0) {
		while($row = mysqli_fetch_array($result)) {
			$establish[] = $row;
		}
	}

	$query2 = "SELECT * FROM church WHERE status = 'Sovereign' order by name ";
	$result2 = mysqli_query($conn, $query2);
	if (mysqli_num_rows($result2) > 0) {
		while($row = mysqli_fetch_array($result2)) {
			$sovereign[] = $row;
		}
	}

	$query3 = "SELECT * FROM church WHERE status = 'Pioneering' order by name ";
	$result3 = mysqli_query($conn, $query3);
	if (mysqli_num_rows($result3) > 0) {
		while($row = mysqli_fetch_array($result3)) {
			$pioneering[] = $row;
		}
	}

	$query4 = "SELECT * FROM church order by name ";
	$result4 = mysqli_query($conn, $query4);
	if (mysqli_num_rows($result4) > 0) {
		while($row = mysqli_fetch_array($result4)) {
			$all[] = $row;
		}
	}

	$output = array('establishChurch' => $establish,
					'sovereignChurch' => $sovereign,
					'pioneeringChurch' => $pioneering,
					'allChurch' => $all
				);

	echo json_encode($output);
?>