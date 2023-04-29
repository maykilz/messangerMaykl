
<?php
require 'conn.php';
$roomId =  $_POST['room_id'];

$result =$mysql -> query("SELECT * FROM `roome` WHERE `UserRoomId`= '$roomId' ")->fetch_assoc();
$result =$result['NameUser2'];
if (!empty($result)) {
echo'1';
} else {
echo'2';
}


$mysql->close();
?>
