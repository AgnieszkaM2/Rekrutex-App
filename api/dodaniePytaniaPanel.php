<?php
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'connect.php';

$pytaniedata=json_decode(file_get_contents("php://input"));
if($pytaniedata!=null){
    $kategoria=$pytaniedata->kategoria;
    $tresc=$pytaniedata->tresc;
    $odp1=$pytaniedata->odp1;
    $odp2=$pytaniedata->odp2;
    $odp3=$pytaniedata->odp3;
    $odp4=$pytaniedata->odp4;
    $poprawna=$pytaniedata->odp4;
    $prawidlowa=$pytaniedata->prawidlowa;

    $sql2 = "SELECT kategoria, tresc FROM pytania where (kategoria='$kategoria' and tresc ='$tresc')";
    $res = mysqli_query($con,$sql2);
    $row = mysqli_fetch_array($res);
    if(is_array($row)){
      http_response_code(400);
    }else{
      $sql = "INSERT INTO pytania(kategoria, tresc, odp1, odp2, odp3, odp4, poprawna, prawidlowa) VALUES('$kategoria', '$tresc', '$odp1', '$odp2', '$odp3', '$odp4', '$poprawna', '$prawidlowa')";
      if($result = mysqli_query($con,$sql))
      {
          echo json_encode($result);

      }else
      {
        http_response_code(404);
      } 
    }
}
?>