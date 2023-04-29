<?php
require 'conn.php';
$roomId = $_POST['room_id'];
$Nick = $_POST['nick_name'];
$InputValue = $_POST['Text_In_Mess'];
$allMess = $mysql->query("SELECT * FROM `roome` WHERE `UserRoomId`= '$roomId' ")->fetch_assoc() ;
$count = $allMess['Count'];
$count++;
$mysql -> query("UPDATE `roome` SET `Count`='$count' WHERE `UserRoomId`= '$roomId'");
$MessInRoom = $allMess['MessInRoom'];
$MessInRoom = json_decode($MessInRoom,true);
$messnumber = 'message' . $count;
$MessInRoom[$messnumber] = array(
'Nick' => $Nick,
'Text' => $InputValue,
'Type' => 'Text'
);
$MessInRoom = json_encode($MessInRoom,JSON_UNESCAPED_UNICODE);
print_r($MessInRoom);
$mysql -> query("UPDATE `roome` SET `MessInRoom`='$MessInRoom' WHERE `UserRoomId`= '$roomId'");
$mysql->close();
?>