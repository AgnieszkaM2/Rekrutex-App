<?php
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


require 'connect.php';

//http_response_code(404);

$resultdata=json_decode(file_get_contents("php://input"));
if($resultdata!=null){
    /*
    $id=$resultdata->id;
    $wynik=$resultdata->wynik;
    

    $sql = "UPDATE uzytkownicy set wynik = '$wynik' where id_uzytkownicy = '$id'";
    if($result = mysqli_query($con,$sql))
    {
       echo json_encode($result);

    }else
    {
        http_response_code(404);
    } 
    */
    
    $id=$resultdata->id;
    $f_name=$resultdata->f_name;
    $l_name=$resultdata->l_name;
    $tresc=$resultdata->tresc;
    $plik=$resultdata->plik;
    
    $myfile=fopen("../CV/testCV.txt","w");
    fwrite($myfile,$id);
    fwrite($myfile,$f_name);
    fwrite($myfile,$l_name);
    fwrite($myfile,"\n");
    fwrite($myfile,$tresc);
    fwrite($myfile,"\n");
    fwrite($myfile,$plik);
    fclose($myfile);
    /*
    $sql = "insert into test_table (id_test,int_test,string_test,bool_test) values (3,12,'dwanascie',true);";
    if($result = mysqli_query($con,$sql))
    {
       echo json_encode($result);

    }else
    {
        http_response_code(404);
    } */
    
}
?>