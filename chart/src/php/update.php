<?php
$conn = new mysqli("localhost", "root", "", "charts");
$result = mysqli_query($conn, "UPDATE chart_vals SET `value`='" . $_POST["value"] . "', `illness`='" . $_POST["illness"] . "' WHERE `day` = '" . $_POST["day"] . "'");

header('Content-type: application/json');

echo json_encode($_POST);
