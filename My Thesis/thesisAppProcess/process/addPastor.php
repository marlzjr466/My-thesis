<?php  
	include("../config/db.php");

	$data = json_decode(file_get_contents("php://input"));
	if (count($data) > 0) {
		$fname = mysqli_real_escape_string($conn, $data->fname);
		$mname = mysqli_real_escape_string($conn, $data->mname);
		$lname = mysqli_real_escape_string($conn, $data->lname);
		$address = mysqli_real_escape_string($conn, $data->address);
		$contact = mysqli_real_escape_string($conn, $data->contact);
		$gender = mysqli_real_escape_string($conn, $data->gender);
		$bday = mysqli_real_escape_string($conn, $data->bday);
		$image = mysqli_real_escape_string($conn, $data->image);
		$btn = mysqli_real_escape_string($conn, $data->btn);
		$code = mysqli_real_escape_string($conn, $data->code);

		if ($btn == "ADD") {
			$sql = "INSERT INTO pastor(firstname,middlename,lastname,address,contactNo,code,gender,image,bday) VALUES ('$fname', '$mname', '$lname', '$address', '$contact', '$code', '$gender', '$image', '$bday')";
			if (mysqli_query($conn, $sql)) {
				echo "Success";
			} else {
				echo "Error";
			}
		 } else {
			$id = $data->id;
			$sql = "UPDATE pastor SET firstname = '$fname', middlename = '$mname', lastname = '$lname', address = '$address', contactNo = '$contact', gender = '$gender', image = '$image', bday = '$bday' WHERE id = '$id'";
			if (mysqli_query($conn, $sql)) {
				echo "Success";
			} else {
				echo "Error";
			}
		}	
	}
?>