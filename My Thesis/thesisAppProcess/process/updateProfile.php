<?php  
	include("../config/db.php");

	$data = json_decode(file_get_contents("php://input"));
	if (count($data) > 0) {
		$firstname = mysqli_real_escape_string($conn, $data->fname);
		$middlename = mysqli_real_escape_string($conn, $data->mname);
		$lastname = mysqli_real_escape_string($conn, $data->lname);
		$contact = mysqli_real_escape_string($conn, $data->contact);
		$gender = mysqli_real_escape_string($conn, $data->gender);
		$address = mysqli_real_escape_string($conn, $data->address);
		$bday = mysqli_real_escape_string($conn, $data->bday);
		$cover = mysqli_real_escape_string($conn, $data->cover);
		$image = mysqli_real_escape_string($conn, $data->image);
		$username = mysqli_real_escape_string($conn, $data->username);
		$password = mysqli_real_escape_string($conn, $data->password);
		$id = $data->userID;

		$sql = "UPDATE users SET firstname = '$firstname', middlename = '$middlename', lastname = '$lastname', gender = '$gender', bday = '$bday', username = '$username', password = '$password', address = '$address', contactNo = '$contact', image = '$image', cover = '$cover' WHERE id = '$id'";
		if (mysqli_query($conn, $sql)) {
			echo 1;
		} else {
			echo "Error";
		}
	}
?>

