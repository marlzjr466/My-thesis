<?php 
	include '../config/db.php';

	$output = array();

	$query3 = "SELECT * FROM event WHERE status = 1 AND approve = 1 AND active = 0 order by id desc";
	$result3 = mysqli_query($conn, $query3);
	if (mysqli_num_rows($result3) > 0) {
		while($row = mysqli_fetch_array($result3)) {
			$output[] = $row;
		}
	} echo json_encode($output);
?>