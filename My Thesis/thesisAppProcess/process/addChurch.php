<?php  
	include("../config/db.php");

	$data = json_decode(file_get_contents("php://input"));
	if (count($data) > 0) {
		$name = mysqli_real_escape_string($conn, $data->name);
		$address = mysqli_real_escape_string($conn, $data->address);
		$pastorID = mysqli_real_escape_string($conn, $data->pastorID);
		$type = mysqli_real_escape_string($conn, $data->type);
		$mission = mysqli_real_escape_string($conn, $data->mission);
		$vision = mysqli_real_escape_string($conn, $data->vision);
		$image = mysqli_real_escape_string($conn, $data->image);
		$btn = mysqli_real_escape_string($conn, $data->btn);

		if ($btn == "ADD") {
			$sql = "INSERT INTO church(name,address,status,mission,vision,hostPastorID,image) VALUES ('$name', '$address', '$type', '$mission', '$vision', '$pastorID', '$image')";
			if (mysqli_query($conn, $sql)) {
				echo "Success";
			} else {
				echo "Error";
			}
		 } else {
			$id = $data->id;
			$sql = "UPDATE church SET name = '$name', address = '$address', status = '$type', mission = '$mission', vision = '$vision', hostPastorID = '$pastorID', image = '$image' WHERE id = '$id'";
			if (mysqli_query($conn, $sql)) {
				echo "Success";
			} else {
				echo "Error";
			}
		 }	
	}
?>