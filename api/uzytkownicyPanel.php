<?php

require 'connect.php';
    
$uzytkownicy = [];
$sql = "SELECT id_uzytkownicy, login, haslo, imie, nazwisko, nr_telefonu, email, wynik, czyadministrator FROM uzytkownicy";

if($result = mysqli_query($con,$sql))
{
  $r = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $uzytkownicy[$r]['id'] = $row['id_uzytkownicy'];
    $uzytkownicy[$r]['login'] = $row['login'];
    $uzytkownicy[$r]['haslo'] = $row['haslo'];
    $uzytkownicy[$r]['imie']    = $row['imie'];
    $uzytkownicy[$r]['nazwisko'] = $row['nazwisko'];
    $uzytkownicy[$r]['nr_telefonu'] = $row['nr_telefonu'];
    $uzytkownicy[$r]['email'] = $row['email'];
    $uzytkownicy[$r]['wynik'] = $row['wynik'];
    $uzytkownicy[$r]['czy_administrator'] = $row['czyadministrator'];
    $r++;
  }
    
  echo json_encode($uzytkownicy);
}else
{
  http_response_code(404);
}
?>