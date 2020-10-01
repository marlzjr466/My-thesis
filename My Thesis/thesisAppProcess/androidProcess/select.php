<?php  
	include("../config/db.php");
	
	$output = array();
	$church = array();
	$department = array();

	$query = "SELECT * FROM church";
	$result = mysqli_query($conn, $query);
	if (mysqli_num_rows($result) > 0) {
		while($row = mysqli_fetch_array($result)) {
			$church[] = $row;
		}
	}

	$query2 = "SELECT * FROM ministry WHERE name != 'Sectional' AND name != 'Pastors Kids' order by name";
	$result2 = mysqli_query($conn, $query2);
	if (mysqli_num_rows($result2) > 0) {
		while($row = mysqli_fetch_array($result2)) {
			$department[] = $row;
		}
	}

	$output = array('churchList' => $church, 
					'departmentList' => $department
					);

	echo json_encode($output);
?>