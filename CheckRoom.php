<?php
require 'conn.php';
$roomId = $_POST['room_id'];

$result =$mysql -> query("SELECT * FROM `roome` WHERE `UserRoomId`= '$roomId' ")->fetch_assoc();

if (!empty($result)) {
echo 'Room_have';
} else {
echo 'Romm_dont_have';
}


$mysql->close();
?>