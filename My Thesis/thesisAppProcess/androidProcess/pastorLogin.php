<?php  
	include("../config/db.php");

	$output = array();
	$noAccount = false;

	$data = json_decode(file_get_contents("php://input"));
	if (count($data) > 0) {
		$accessCode = mysqli_real_escape_string($conn, $data->accessCode);

		$query = "SELECT * FROM pastor";
		$result = mysqli_query($conn, $query);
		if (mysqli_num_rows($result) > 0) {
			while($row = mysqli_fetch_array($result)) {
				if ($row['code'] == $accessCode) {
					$id = $row['id'];
					$sql = "UPDATE pastor SET status = 1 WHERE id = '$id'";
					if (mysqli_query($conn, $sql)) {
						// echo "Success";
					}

					$output[] = $row;
					$noAccount = false;
					break;
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