<?php  
	include("../config/db.php");

	$data = json_decode(file_get_contents("php://input"));
	if (count($data) > 0) {
		$firstname = mysqli_real_escape_string($conn, $data->firstname);
		$lastname = mysqli_real_escape_string($conn, $data->lastname);
		$church = $data->church;
		$ministry = $data->department;
		$contact = mysqli_real_escape_string($conn, $data->contact);
		$username = mysqli_real_escape_string($conn, $data->username);
		$password = mysqli_real_escape_string($conn, $data->password);

		$sql = "INSERT INTO churchmember(firstname,lastname,contact,ministryID,churchID,username,password) VALUES ('$firstname', '$lastname', '$contact', '$ministry', '$church', '$username', '$password')";
		if (mysqli_query($conn, $sql)) {
			echo "Success";
		} else {
			echo mysqli_error($conn);
		}

	}
?>