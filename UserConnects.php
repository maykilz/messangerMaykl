<?php
require 'conn.php';
$roomId = $_POST['room_id'];
$Nick = $_POST['nick_name'];
$allMess = $mysql->query("SELECT * FROM `roome` WHERE `UserRoomId`= '$roomId' ")->fetch_assoc() ;
$count = $allMess['Count'];
$count++;
$mysql -> query("UPDATE `roome` SET `Count`='$count' WHERE `UserRoomId`= '$roomId'");
$MessInRoom = $allMess['MessInRoom'];
$MessInRoom = json_decode($MessInRoom,true);
$messnumber = 'message' . $count;
$txtmes = "Пользователь ". $Nick . "Подключился к чату";
$MessInRoom[$messnumber] = array(
'Nick' => "Система",
'Text' => $txtmes
);
$MessInRoom = json_encode($MessInRoom,JSON_UNESCAPED_UNICODE);
$mysql -> query("UPDATE `roome` SET `MessInRoom`='$MessInRoom' WHERE `UserRoomId`= '$roomId'");
$mysql->close();
?>