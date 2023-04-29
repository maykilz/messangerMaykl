<?php
require 'conn.php';
$roomId = $_POST['room_id'];
$allMess = $mysql->query("SELECT * FROM `roome` WHERE `UserRoomId`= '$roomId' ")->fetch_assoc() ;
$MessInRoom = $allMess['MessInRoom'];
print_r($MessInRoom);
$mysql->close();
?>