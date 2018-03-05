<?php

$ini_array = parse_ini_file("config.ini");

$DB_HOST = $ini_array["host"];
$DB_USER = $ini_array["username"];
$DB_PASS = $ini_array["password"];

$mysqli = new mysqli($DB_HOST, $DB_USER, $DB_PASS);
$query = "SELECT * FROM vms_inventory.asn_server_site";

$myArray = array();
if ($result = $mysqli->query($query)) {

  $rows = array();
     while($r = mysql_fetch_assoc($result)) {
       $rows['object_name'][] = $r;
     }

   print json_encode($rows);

echo json_encode($rows);
    //echo json_encode($myArray);
}

$result->close();
$mysqli->close();
?>
