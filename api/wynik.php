<?php
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


require 'connect.php';

$resultdata=json_decode(file_get_contents("php://input"));
if($resultdata!=null){
    
    
    $id=$resultdata->id;
    $wynik=$resultdata->wynik;
    $kategoria=$resultdata->kategoria;
    

    //$sql1 = "UPDATE uzytkownicy set wynik = '$wynik' where id_uzytkownicy = '$id'";
    $sql = "INSERT INTO wyniki(uzytkownik_id, kategoria, wynik) VALUES('$id', '$kategoria', '$wynik')";

    if($result = mysqli_query($con,$sql))
    {
       echo json_encode($result);

    }else
    {
        http_response_code(404);
    } 

}
?>