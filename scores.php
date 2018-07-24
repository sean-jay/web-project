<!DOCTYPE html>
  <html>
    <head></head>
    <body>
      <?php
      $servername = "localhost";
      $username = "root";
      $dbname = "endersgame";
      $password = "password";
      $conn = new mysqli($servername, $username, $password, $dbname);
      if($conn){
        echo "connected";
      }
      $id = $_POST['id'];
      $score = $_POST['score'];
      $sql = "INSERT INTO highscores (id, score) VALUES ('$id', '$score')";
      if (mysqli_query($conn, $sql)){
          echo "new record made";
      } else {
          echo "ERROR";
      }
      mysqli_close($conn);
      ?>
    </body>
</html>
