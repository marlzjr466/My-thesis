<?php  
	include("../config/db.php");

	$output = array();
	$noAccount = false;

	$data = json_decode(file_get_contents("php://input"));
	if (count($data) > 0) {
		$username = mysqli_real_escape_string($conn, $data->username);
		$password = mysqli_real_escape_string($conn, $data->password);

		$query = "SELECT * FROM churchmember";
		$result = mysqli_query($conn, $query);
		if (mysqli_num_rows($result) > 0) {
			while($row = mysqli_fetch_array($result)) {
				if ($row['username'] == $username && $row['password'] == $password) {
					if ($row['officialmember'] == 1) {
						$id = $row['id'];
						$sql = "UPDATE churchmember SET status = 1 WHERE id = '$id'";
						if (mysqli_query($conn, $sql)) {
							// echo "Success";
						}

						$output[] = $row;
						$noAccount = false;
						break;
					} else {
						echo "Not approve!";
					}
				}
				$noAccount = true;
			}
			if ($noAccount) {
				echo "No account found!";
			} else {
				echo json_encode($output);
			}
		} else {
			echo "statusZero";
		}
	}
?>