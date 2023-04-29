<?php
require 'conn.php';
$roomId = $_POST['room_id'];
$Nick = $_POST['nick_name'];
$InputValue = $_POST['Text_In_Mess'];
$Photo_Url = $_POST['photo'];
$allMess = $mysql->query("SELECT * FROM `roome` WHERE `UserRoomId`= '$roomId' ")->fetch_assoc() ;
$count = $allMess['Count'];
$count++;
$mysql -> query("UPDATE `roome` SET `Count`='$count' WHERE `UserRoomId`= '$roomId'");
$MessInRoom = $allMess['MessInRoom'];
$MessInRoom = json_decode($MessInRoom,true);
$messnumber = 'message' . $count;
$Photo_Url = str_replace('\\' , '\\\\\\\\' , $Photo_Url );
$MessInRoom[$messnumber] = array(
'Nick' => $Nick,
'Text' => $InputValue,
'photo_url' =>strval($Photo_Url),
'Type' => 'Photo'
);
$MessInRoom = json_encode($MessInRoom,JSON_UNESCAPED_UNICODE);
print_r($MessInRoom);
$mysql -> query("UPDATE `roome` SET `MessInRoom`='$MessInRoom' WHERE `UserRoomId`= '$roomId'");
// print_r($messnumber);
print_r($MessInRoom);
$mysql->close();

?>

