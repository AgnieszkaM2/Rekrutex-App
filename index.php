<html>
    <head>
        <style>
            
        </style>
        
    </head>
    <script></script>
    <body>
        <h1>REKRUTEX PHP</h1>
        
        <?php        
        print("PHP działa.<br>");
        $baza=mysqli_connect("remotemysql.com","XtKYx97kfB","rt9JC3srMC","XtKYx97kfB");
        if (mysqli_connect_errno())
        {echo "Wystąpił błąd połączenia z bazą";}

        $wynik = mysqli_query($baza,"SELECT * FROM pytania");

        while($row = mysqli_fetch_array($wynik))
        {echo $row['kategoria'] . " " . $row['tresc']; echo "<br>"; }
        mysqli_close($baza);
        ?>
    </body>
    <script>
        
    </script>
</html>