<?php

require 'connect.php';

$categorydata=json_decode(file_get_contents("php://input"));
if($categorydata!=null){
    $category=$categorydata->kategoria;

    $wyniki = [];
    $sql = "SELECT uzytkownicy.imie, uzytkownicy.nazwisko, wyniki.wynik, wyniki.kategoria, wyniki.czas FROM uzytkownicy, wyniki where id_uzytkownicy = uzytkownik_id AND wyniki.kategoria = '$category'";

    if($result = mysqli_query($con,$sql))
    {
        $r = 0;
        while($row = mysqli_fetch_assoc($result))
        {
            $wyniki[$r]['imie']    = $row['imie'];
            $wyniki[$r]['nazwisko'] = $row['nazwisko'];
            $wyniki[$r]['wynik'] = $row['wynik'];
            $wyniki[$r]['kategoria']    = $row['kategoria'];
            $wyniki[$r]['czas'] = $row['czas'];
            $r++;
        }
            
        echo json_encode($wyniki);
    }else
    {
        http_response_code(404);
    }
}
?>