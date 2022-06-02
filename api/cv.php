<?php
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

header("Access-Control-Allow-Origin: *");

require 'connect.php';

//http_response_code(404);

$resultdata=json_decode(file_get_contents("php://input"));
if($resultdata!=null){

    $id=$resultdata->id;
    $f_name=$resultdata->f_name;
    $l_name=$resultdata->l_name;
    $tresc=$resultdata->tresc;
    $plik=$resultdata->plik;
    $kategoria=$resultdata->kategoria;
    
    //czy jest folder
    
    
    
    //zapisz plik na serwerze...

    $sciezka="../CV/".$id.'/'.$kategoria;
    $data=date("Ymd_His");
    
    mkdir("../CV/".$id);
    mkdir("../CV/".$id."/".$kategoria);
    

    //...i wyslij email do kadr, wskazujac link do pliku CV na naszym serwerze
    
    
    
    $myfile=fopen("../CV/testCV.txt","w");
    fwrite($myfile,$id);
    fwrite($myfile,PHP_EOL );
    fwrite($myfile,$f_name);
    fwrite($myfile,PHP_EOL );
    fwrite($myfile,$l_name);
    fwrite($myfile,PHP_EOL );
    fwrite($myfile,$tresc);
    fwrite($myfile,PHP_EOL );
    fwrite($myfile,$plik);
    fwrite($myfile,PHP_EOL );
    fwrite($myfile,$kategoria);
    fwrite($myfile,PHP_EOL );
    fwrite($myfile,$sciezka."/email_".$data.".txt");
    fwrite($myfile,PHP_EOL );
    fwrite($myfile,"testcc");
    fclose($myfile);
    
    
    
    $myfile=fopen($sciezka."/email_".$data.".txt","w");
    fwrite($myfile,"Od:\t");
    fwrite($myfile,$f_name);
    fwrite($myfile," ");
    fwrite($myfile,$l_name);
    fwrite($myfile,PHP_EOL );
    
    fwrite($myfile,"Dnia:\t");
    fwrite($myfile,date("Y.m.d H:i:s"));
    fwrite($myfile,PHP_EOL );
    fwrite($myfile,PHP_EOL );
    
    fwrite($myfile,$tresc);
    fwrite($myfile,PHP_EOL );
    fclose($myfile);
    //

    
    
    
    
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