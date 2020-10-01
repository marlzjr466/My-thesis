<?php 
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