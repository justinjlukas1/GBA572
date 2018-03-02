<?php 

$ini_array = parse_ini_file("config.ini");

$DB_HOST = $ini_array["host"];
$DB_USER = $ini_array["username"];
$DB_PASS = $ini_array["password"];

$mysqli = new mysqli($DB_HOST, $DB_USER, $DB_PASS);
$query = "SELECT Server_ID, Interface, ECS_ID, Status FROM vms_inventory.asn_server_site";

$myArray = array();
if ($result = $mysqli->query($query)) {

    $dataTable = array(
        'cols' => array(
            // each column needs an entry here, like this:
            array('type' => 'number', 'label' => 'Server_ID'), 
            array('type' => 'number', 'label' => 'Interface'),
            array('type' => 'number', 'label' => 'ECS_ID'),
            array('type' => 'string', 'label' => 'Status')//,
            //array('type' => 'date', 'label' => 'Added'),
            //array('type' => 'date', 'label' => 'Changed'),
        )
    );

    while($row = $result->fetch_array(MYSQL_ASSOC)) {
        $dataTable['rows'][] = array(
            'c' => array (
                array('v' => $row['Server_ID']), 
                array('v' => $row['Interface']),
                array('v' => $row['ECS_ID']),
                array('v' => $row['Status'])//,
                //array('v' => $row['Added']),
                //array('v' => $row['Changed']),
             )
        );
            //$myArray[] = $row;
    }
    echo json_encode($dataTable);
}

$result->close();
$mysqli->close();
?>