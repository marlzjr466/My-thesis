<?php  
	include("../config/db.php");

	$data = json_decode(file_get_contents("php://input"));
	if (count($data) > 0) {
		$item = mysqli_real_escape_string($conn, $data->item);
		$price = mysqli_real_escape_string($conn, $data->price);
		$btn = mysqli_real_escape_string($conn, $data->btn);
		$eventID = 0;

		$query = "SELECT * FROM event WHERE status = 0 AND approve = 1 AND active = 1";
		$result = mysqli_query($conn, $query);
		if (mysqli_num_rows($result) > 0) {
			while($row = mysqli_fetch_array($result)) {
				$eventID = $row['id'];
			}
		}

		if ($btn == "Add Expenses") {
			$sql = "INSERT INTO eventexpenses(eventID,description,price) VALUES ('$eventID', '$item', '$price')";
			if (mysqli_query($conn, $sql)) {
				echo 1;
			} else {
				echo "Error";
			}
		 } else {
			$id = $data->id;
			$sql = "UPDATE eventexpenses SET description = '$item', price = '$price' WHERE id = '$id'";
			if (mysqli_query($conn, $sql)) {
				echo 1;
			} else {
				echo "Error";
			}
		}	
	}
?>