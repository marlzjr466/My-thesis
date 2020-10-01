<?php  
	include("../config/db.php");

	$output = array();

	$query = "SELECT * FROM event WHERE status = 1 AND approve = 1 AND active = 0";
	$result = mysqli_query($conn, $query);
	if (mysqli_num_rows($result) > 0) {
		while($row = mysqli_fetch_array($result)) {
			$output[] = $row;
		}
	} 

	echo json_encode($output);
?>