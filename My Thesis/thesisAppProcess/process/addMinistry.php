<?php  
	include("../config/db.php");

	$data = json_decode(file_get_contents("php://input"));
	if (count($data) > 0) {
		$name = mysqli_real_escape_string($conn, $data->name);
		$mission = mysqli_real_escape_string($conn, $data->desc);
		$vision = "1";
		$btn = mysqli_real_escape_string($conn, $data->btn);

		if ($btn == "ADD") {
			$sql = "INSERT INTO ministry(name,mission,vision) VALUES ('$name', '$mission', '$vision')";
			if (mysqli_query($conn, $sql)) {
				echo "Success";
			} else {
				echo "Error";
			}
		} else {
			$id = $data->id;
			$sql = "UPDATE ministry SET name = '$name', mission = '$mission', vision = '$vision' WHERE id = '$id'";
			if (mysqli_query($conn, $sql)) {
				echo "Success";
			} else {
				echo "Error";
			}
		}	
	}
?>