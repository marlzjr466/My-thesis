<?php  
	include("../config/db.php");

	$output = array();
	$data = json_decode(file_get_contents("php://input"));
	if (count($data) > 0) {
		$userID = $data->id;

		$query = "SELECT * FROM churchmember WHERE id = '$userID'";
		$result = mysqli_query($conn, $query);
		if (mysqli_num_rows($result) > 0) {
			while($row = mysqli_fetch_array($result)) {
				$x = $row['churchID'];
				$query2 = "SELECT * FROM church WHERE id != '$x'";
				$result2 = mysqli_query($conn, $query2);
				if (mysqli_num_rows($result2) > 0) {
					while($row2 = mysqli_fetch_array($result2)) {
							$output[] = $row2;
					} 
					 echo json_encode($output);
				}
			}
		} else {
			echo "statusZero";
		}
	}
?>