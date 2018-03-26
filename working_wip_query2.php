<?php

/* 
 * This query is for a stacked bar chart. Each bar represents a status, each segment of the bar represents a region
 */

$ini_array = parse_ini_file("config.ini");

$DB_HOST = $ini_array["host"];
$DB_USER = $ini_array["username"];
$DB_PASS = $ini_array["password"];

$mysqli = new mysqli($DB_HOST, $DB_USER, $DB_PASS);

// Set up statuses and generic query to fill
$statuses = array("Approved", "Waiting", "Hold", "Rejected");
// not using regions right now
$regions = array("Global");
$query1 = "SELECT COUNT(*) as count1 FROM vms_request.dat_request WHERE Status LIKE ?";

// Initialize final data with correct headers
$dataTable = array(
    'cols' => array(
        // each column needs an entry here, like this:
        array('type' => 'string', 'label' => 'Status'),
        array('type' => 'number', 'label' => 'Global')
    )
);

// Create empty results array to store data produced
$results = array();
//$count = 0;

// Loop through the various statuses, binding each to the prepared query in the where clause
foreach ($statuses as $status)
{
    $count = 0;
    /* create a prepared statement */
    if ($stmt = mysqli_prepare($mysqli, $query1)) {

        $currentStatus = "%" . $status . "%";

        // bind parameters for markers, to bind multiple, add another ?, s, and variable to bind
        mysqli_stmt_bind_param($stmt, "s", $currentStatus);

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

    $dataTable['rows'][] = array(
        'c' => array (
            array('v' => $status),
            array('v' => $results[0])
            )
    );
}

echo json_encode($dataTable);

mysqli_close($mysqli);

?>

