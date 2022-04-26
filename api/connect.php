<?php
define('DB_HOST', 'remotemysql.com');
define('DB_USER', 'XtKYx97kfB');
define('DB_PASS', 'rt9JC3srMC');
define('DB_NAME', 'XtKYx97kfB');

// Connect with the database.
function connect()
{
  $connect = mysqli_connect(DB_HOST ,DB_USER ,DB_PASS ,DB_NAME);

  if (mysqli_connect_errno($connect)) {
    die("Failed to connect:" . mysqli_connect_error());
  }

  mysqli_set_charset($connect, "utf8");

  return $connect;
}

$con = connect();