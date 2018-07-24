<!DOCTYPE html>
  <html>
    <head>
    <link rel="stylesheet" type="text/css" href="scoreboard.css">
    <body>
        <?php
        $servername = "localhost";
        $username = "root";
        $dbname = "endersgame";
        $password = "password";
        $conn = new mysqli($servername, $username, $password, $dbname);
        $sql = "SELECT * FROM highscores ORDER BY score DESC LIMIT 5";
        $result = mysqli_query($conn, $sql);
        ?>
        <table id="leaderboard">
          <tr>
            <th>Initials</th>
            <th>Score</th>
          </tr>
          <?php
            for($i = 0; $i < 5; ++$i){
              $row = mysqli_fetch_assoc($result);
              echo "<tr>" .
                      "<td>$row[id]</td> <td> $row[score]</td>" .
                   "</tr>";
            }
            ?>
        </table>
        <form action="https://localhost/final/Final.php">
          <input type="submit" value="Return to Game">
        </form>
    </body>
    </head>
  </html>
