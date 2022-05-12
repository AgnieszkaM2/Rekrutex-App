<?php
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


require 'connect.php';

$resultdata=json_decode(file_get_contents("php://input"));
if($resultdata!=null){
    $wynik=$resultdata->wynik;
    $id=$resultdata->id;

    $sql = "UPDATE uzytkownicy set wynik = '$wynik' where id_uzytkownicy = '$id'";
    if($result = mysqli_query($con,$sql))
    {
       echo json_encode($result);

    }else
    {
        http_response_code(404);
    } 

}
?>