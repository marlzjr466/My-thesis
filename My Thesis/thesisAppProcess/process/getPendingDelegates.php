<?php  
	include("../config/db.php");

	$output = array();
	$churchmember = array();
	$delegates = array();
		
	$query = "SELECT * FROM churchmember order by firstname";
	$result = mysqli_query($conn, $query);
	if (mysqli_num_rows($result) > 0) {
		while($row = mysqli_fetch_array($result)) {
			$churchmember[] = $row;
		}
	}

	$query2 = "SELECT * FROM delegates WHERE pending = 0";
	$result2 = mysqli_query($conn, $query2);
	if (mysqli_num_rows($result2) > 0) {
		while($row = mysqli_fetch_array($result2)) {
			$delegates[] = $row;
		}
	}
	
	$output = array('churchMember' => $churchmember,
					'delegates' => $delegates
					);
	echo json_encode($output);
?>