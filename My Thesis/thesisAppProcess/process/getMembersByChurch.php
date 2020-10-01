<?php  
	include("../config/db.php");

	$output = array();
	$churchmember = array();
	$delegates = array();
	$data = json_decode(file_get_contents("php://input"));
	if (count($data) > 0) {
		$churchID = $data->churchID;
		
		$query = "SELECT * FROM churchmember WHERE churchID = '$churchID' AND officialmember = 1 order by firstname";
		$result = mysqli_query($conn, $query);
		if (mysqli_num_rows($result) > 0) {
			while($row = mysqli_fetch_array($result)) {
				$churchmember[] = $row;
			}
		}

		$query2 = "SELECT * FROM delegates";
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
	 }
?>