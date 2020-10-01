<?php  
	include("../config/db.php");

	$output = array();
	$transferRequest = array();
	$church = array();
	$user = array();

	$data = json_decode(file_get_contents("php://input"));
	if (count($data) > 0) {
		$userID = $data->id;

		$query = "SELECT * FROM church WHERE hostPastorID = '$userID'";
		$result = mysqli_query($conn, $query);
		if (mysqli_num_rows($result) > 0) {
			while($row = mysqli_fetch_array($result)) {
				$id = $row['id'];
				$query2 = "SELECT * FROM transferrequest WHERE fromChurchID = '$id' AND approve = 0";
				$result2 = mysqli_query($conn, $query2);
				if (mysqli_num_rows($result2) > 0) {
					while($row2 = mysqli_fetch_array($result2)) {
						$transferRequest[] = $row2;

						$userID = $row2['userID'];

						$query3 = "SELECT * FROM churchmember WHERE id = '$userID'";
						$result3 = mysqli_query($conn, $query3);
						if (mysqli_num_rows($result3) > 0) {
							while($row3 = mysqli_fetch_array($result3)) {
								$user[] = $row3;
							} 
						}

						$churchID = $row2['toChurchID'];
						$query4 = "SELECT * FROM church WHERE id = '$churchID'";
						$result4 = mysqli_query($conn, $query4);
						if (mysqli_num_rows($result4) > 0) {
							while($row4 = mysqli_fetch_array($result4)) {
								$church[] = $row4;
							} 
						}
					} 
				}

				$output = array('transferRequest' => $transferRequest,
								'user' => $user,
								'church' => $church
								);
			}
		}	echo json_encode($output);	
	}
?>