<?php

$ini_array = parse_ini_file("config.ini");

$DB_HOST = $ini_array["host"];
$DB_USER = $ini_array["username"];
$DB_PASS = $ini_array["password"];

$mysqli = new mysqli($DB_HOST, $DB_USER, $DB_PASS);

// Set up statuses and generic query to fill
$statuses = array("%Approved%", "%Waiting%", "%Hold%", "%Rejected%");
$query1 = "SELECT COUNT(*) as count1 FROM vms_request.dat_request WHERE Status LIKE ?";

// Initialize final data with correct headers
$dataTable = array(
    'cols' => array(
        // each column needs an entry here, like this:
        array('type' => 'string', 'label' => 'Location'),
        array('type' => 'number', 'label' => 'Approved'),
        array('type' => 'number', 'label' => 'Waiting'),
        array('type' => 'number', 'label' => 'Hold'),
        array('type' => 'number', 'label' => 'Rejected')
    )
);

// Create empty results array to store data produced
$results = array();
$count = 0;

// Loop through the various statuses, binding each to the prepared query in the where clause
foreach ($statuses as $status)
{
    /* create a prepared statement */
    if ($stmt = mysqli_prepare($mysqli, $query1)) {

        // bind parameters for markers, to bind multiple, add another ?, s, and variable to bind
        mysqli_stmt_bind_param($stmt, "s", $status);

        // execute query 
        mysqli_stmt_execute($stmt);

        // bind result variables
        mysqli_stmt_bind_result($stmt, $res);

        // fetch value 
        mysqli_stmt_fetch($stmt);

        // store results in array
        $results[$count++] = $res; 

        // close statement 
        mysqli_stmt_close($stmt);
    }
}

$dataTable['rows'][] = array(
    'c' => array (
        array('v' => "Global"),
        array('v' => $results[0]),
        array('v' => $results[1]),
        array('v' => $results[2]),
        array('v' => $results[3])
        )
);

echo json_encode($dataTable);

mysqli_close($mysqli);

?>

