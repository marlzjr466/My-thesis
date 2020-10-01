<?php  
	include("../config/db.php");

	$eventID = 0;
	$data = json_decode(file_get_contents("php://input"));
	if (count($data) > 0) {
		$churchID = $data->churchID;
		$fullname = $data->fullname;
		
		$query = "SELECT * FROM event WHERE status = 0 AND approve = 1 AND active = 1";
		$result = mysqli_query($conn, $query);
		if (mysqli_num_rows($result) > 0) {
			while($row = mysqli_fetch_array($result)) {
				$eventID = $row['id'];
			}
		}
		
		$sql = "INSERT INTO eventvisitor(churchID,eventID,fullname) VALUES ('$churchID', '$eventID', '$fullname')";
		if (mysqli_query($conn, $sql)) {
			echo "Success";
		} else {
			echo "Error";
		}
	 }
?>