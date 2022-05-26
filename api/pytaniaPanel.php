<?php

require 'connect.php';

$categorydata=json_decode(file_get_contents("php://input"));
if($categorydata!=null){
    $category=$categorydata->kategoria;

    $pytania = [];
    $sql = "SELECT * FROM pytania where kategoria = '$category'";

    if($result = mysqli_query($con,$sql))
    {
        $r = 0;
        while($row = mysqli_fetch_assoc($result))
        {
            $pytania[$r]['id']    = $row['id_pytania'];
            $pytania[$r]['kategoria'] = $row['kategoria'];
            $pytania[$r]['tresc'] = $row['tresc'];
            $pytania[$r]['odp1']    = $row['odp1'];
            $pytania[$r]['odp2'] = $row['odp2'];
            $pytania[$r]['odp3'] = $row['odp3'];
            $pytania[$r]['odp4'] = $row['odp4'];
            $pytania[$r]['prawidlowa'] = $row['prawidlowa'];
            $r++;
        }
            
        echo json_encode($pytania);
    }else
    {
        http_response_code(404);
    }
}
?>