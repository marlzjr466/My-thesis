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
		$id = $data->id;

		if ($btn == "ADD") {
			$sql = "INSERT INTO pastor(name,address,status,mission,vision,hostPastorID,image) VALUES ('$name', '$address', '$type', '$mission', '$vision', '$pastorID', '$image')";
			if (mysqli_query($conn, $sql)) {
				echo "Success";
			} else {
				echo "Error";
			}
		//  } else {
		// 	$id = $data->id;
		// 	$sql = "UPDATE pastor SET firstname = '$fname', middlename = '$mname', lastname = '$lname', address = '$address', contactNo = '$contact', gender = '$gender', image = '$image', bday = '$bday' WHERE id = '$id'";
		// 	if (mysqli_query($conn, $sql)) {
		// 		echo "Success";
		// 	} else {
		// 		echo "Error";
		// 	}
		 }	
	}
?>