<?php

require 'connect.php';
    
$kategorie = [];
$sql = "SELECT DISTINCT kategoria FROM pytania";

if($result = mysqli_query($con,$sql))
{
  $r = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $kategorie[$r]['kategoria'] = $row['kategoria'];
    $r++;
  }
    
  echo json_encode($kategorie);
}else
{
  http_response_code(404);
}
?>