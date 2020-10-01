<?php  
	include("../config/db.php");

	$eventID = 0;
	$data = json_decode(file_get_contents("php://input"));
	if (count($data) > 0) {
		$churchID = $data->churchID;
		$ids = $data->ids;
		
		$query = "SELECT * FROM event WHERE status = 0 AND approve = 1 AND active = 1";
		$result = mysqli_query($conn, $query);
		if (mysqli_num_rows($result) > 0) {
			while($row = mysqli_fetch_array($result)) {
				$eventID = $row['id'];
			}
		}
		
		for ($i = 0; $i < sizeof($ids); $i++) {
			$id = $ids[$i];
			$sql = "INSERT INTO delegates(memberID,eventID,churchID,pending) VALUES ('$id', '$eventID', '$churchID', 1)";
			if (mysqli_query($conn, $sql)) {
				if ($i == (sizeof($ids)-1)) {
					echo "Success";
				}
			} else {
				if ($i == (sizeof($ids)-1)) {
					echo "Error";
				}
			}
		}
	 }
?>