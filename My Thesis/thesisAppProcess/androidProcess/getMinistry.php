<?php  
	include("../config/db.php");

	$output = array();
	$ministry = array();
	$coordinator = array();

	$query = "SELECT * FROM ministry order by name";
	$result = mysqli_query($conn, $query);
	if (mysqli_num_rows($result) > 0) {
		while($row = mysqli_fetch_array($result)) {
			$ministry[] = $row;
		}
	} 

	$query2 = "SELECT * FROM users WHERE id > 'Administrator' order by firstname";
	$result2 = mysqli_query($conn, $query2);
	if (mysqli_num_rows($result2) > 0) {
		while($row = mysqli_fetch_array($result2)) {
			$coordinator[] = $row;
		}
	} 

	$output = array('ministry' => $ministry, 
					'coordinator' => $coordinator
					);

	echo json_encode($output);
?>