<?php
require 'conn.php';
$roomId = $_POST['room_id'];

$result =$mysql -> query("SELECT * FROM `roome` WHERE `UserRoomId`= '$roomId' ")->fetch_assoc();
$result =$result['NameUser1'];
if (!empty($result)) {
echo '3';
} else {
echo '4';
}


$mysql->close();
?>