<?php 
	header ("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization");
	header ("Access-Control-Allow-Origin: ". $_SERVER['HTTP_ORIGIN'] . "");
	header ("Access-Control-Allow-Credentials: true");
	header ("Access-Control-Expose-Headers: Content-Length, X-JSON");
	header ("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");

	if (!empty($_FILES)) {
		$path = '../uploadImages/'. $_FILES['file']['name'];

		if (move_uploaded_file($_FILES['file']['tmp_name'], $path)) {
			echo "File uploaded successfully!";
		} else {
			echo "File uploaded but not save!";
		}
	} else {
		echo "Some Error!";
	}
?>