<?php  
	include("../config/db.php");

	$data = json_decode(file_get_contents("php://input"));
	if (count($data) > 0) {
		$fname = mysqli_real_escape_string($conn, $data->fname);
		$mname = mysqli_real_escape_string($conn, $data->mname);
		$lname = mysqli_real_escape_string($conn, $data->lname);
		$password = mysqli_real_escape_string($conn, $data->password);
		$number = mysqli_real_escape_string($conn, $data->number);
		$ministry = mysqli_real_escape_string($conn, $data->ministry);
		$image = mysqli_real_escape_string($conn, $data->image);
		$position = mysqli_real_escape_string($conn, $data->position);
		
		$sql = "INSERT INTO users(firstname,middlename,lastname,password,contactNo,position,image,ministryID) VALUES ('$fname', '$mname', '$lname', '$password', '$number', '$position', '$image', '$ministry')";
		if (mysqli_query($conn, $sql)) {
			echo "Success";
		} else {
			echo "Error";
		}
		
	}
?>