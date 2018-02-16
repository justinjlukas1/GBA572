<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
        <HEAD>
        <TITLE> Database Query</TITLE>
        </HEAD>
        <BODY>
                <h1>
                <?php

                $ini_array = parse_ini_file("config.ini");

                $DB_HOST = $ini_array["host"];
                $DB_USER = $ini_array["username"];
                $DB_PASS = $ini_array["password"];

                $mysqli = new mysqli($DB_HOST, $DB_USER, $DB_PASS);

                if (mysqli_connect_errno()) {
                        printf("Connect failed: %s\n", mysqli_connect_error());
                        exit();
                }
                $table = $_POST['name'];
                echo "<h3><b>$table</b></h3>";
                echo "<table border = 1 cellpadding = 3 cellspacing = 3>";

                $query = "SELECT * FROM vms_inventory.asn_server_site";
                $result = $mysqli->query($query) or die($mysqli->error.__LINE__);

                if($result->num_rows > 0) {
                        while($row = $result->fetch_assoc()) {
                                echo "<br>";
                                echo  stripslashes($row['Server_ID']);
                                echo " | ";
                                echo stripslashes($row['Interface']);
                                echo " | ";
                                echo stripslashes($row['ECS_ID']);
                                echo " | ";
                                echo stripslashes($row['Status']);

                        }
                }
                else {
                        echo 'NO RESULTS';
                }
                echo "</table>";
                echo "<br/><br/>";
                mysqli_close($mysqli);


                ?>
                </h1>
        </BODY>
</HTML>