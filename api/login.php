<?php

require 'connect.php';

$logindata=json_decode(file_get_contents("php://input"));
$uzytkownik=[];

if($logindata!=null){
    $errors="";

    $param_login=$logindata->login;
    $param_password=$logindata->haslo;
    
    $sql="SELECT login, haslo FROM uzytkownicy where login='$param_login'";
    if($result = mysqli_query($con,$sql))
    {
        $res= mysqli_fetch_array($result);
        $password = $res[1];
        if(password_verify($param_password, $password))
        {
            $sql2="SELECT id_uzytkownicy, login, haslo, imie, nazwisko, nr_telefonu, email, wynik, czyadministrator FROM uzytkownicy where login='$param_login'";
            if($data = mysqli_query($con,$sql2))
            {
                $row  = mysqli_fetch_array($data);
                if(is_array($row)) {
                    $uzytkownik['id']    = $row['id_uzytkownicy'];
                    $uzytkownik['login'] = $row['login'];
                    $uzytkownik['haslo'] = $row['haslo'];
                    $uzytkownik['imie']    = $row['imie'];
                    $uzytkownik['nazwisko'] = $row['nazwisko'];
                    $uzytkownik['nr_telefonu'] = $row['nr_telefonu'];
                    $uzytkownik['email'] = $row['email'];
                    $uzytkownik['wynik'] = $row['wynik'];
                    $uzytkownik['czy_administrator'] = $row['czyadministrator'];
                }
              
            }

            echo json_encode($uzytkownik);

        }else
        {
          http_response_code(404);
        }    
        
    }else
    {
      http_response_code(404);
    }
}
?>