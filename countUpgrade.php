<?php

$ini_array = parse_ini_file("config.ini");

$DB_HOST = $ini_array["host"];
$DB_USER = $ini_array["username"];
$DB_PASS = $ini_array["password"];

$mysqli = new mysqli($DB_HOST, $DB_USER, $DB_PASS);
$query = "SELECT COUNT(Type) FROM vms_request.dat_request
WHERE Type = 'Upgrade';";

$myArray = array();
$result = $mysqli->query($query)
//here you can echo the result of query
echo $result[0];

$result->close();
$mysqli->close();
?>
