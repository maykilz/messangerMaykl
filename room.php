<?php 
require 'conn.php';
$name = filter_var(trim($_POST['name1']),FILTER_SANITIZE_FULL_SPECIAL_CHARS);
$name2 = filter_var(trim($_POST['name2']),FILTER_SANITIZE_FULL_SPECIAL_CHARS);
$roomId = $_POST['room_id'];
$userId = $_POST['UserCreateOrConnect'];
$allMess = $mysql->query("SELECT * FROM `roome` WHERE `UserRoomId`= '$roomId' ")->fetch_assoc() ;
$allMess =$allMess['MessInRoom'];
$allMess = json_decode($allMess,true);

if($userId = 1){
    $sql = "SELECT * FROM `roome` WHERE `UserRoomId` = '$roomId'";
    $result = $mysql->query($sql);
    if ($result->num_rows > 0) {
    } else {

    $mysql -> query("INSERT INTO `roome` (`UserRoomId`, `NameUser1`) VALUES('$roomId','$name')");
    $allMess = [
    
    ];
    $allMess = json_encode($allMess,true);
    $mysql -> query("UPDATE `roome` SET `MessInRoom`='$allMess' WHERE `UserRoomId`='$roomId'");
    $mysql -> query("UPDATE `roome` SET `Count`='0' WHERE `UserRoomId`='$roomId'");
    $allMess = json_decode($allMess,true);
    }
    }
    if($userId = 2){
    $sql = "SELECT * FROM `roome` WHERE `UserRoomId` = '$roomId'";
    $result = $mysql->query($sql);
    if ($result->num_rows > 0) {
    $mysql -> query("UPDATE `roome` SET `NameUser2`='$name2' WHERE `UserRoomId`='$roomId'");

    } else {
    
    }
    }

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="room.css">
    <title>Document</title>
</head>
<body > 
    <div id="delet_div">
        <span id="span1">Вы действительно хотите выйти?</span>
        <div id="all_button_dlete">
            <button  id="button_exit">Выйти</button>
            <button id="backroom" >Назад</button>
        </div> 
    </div>
    <?php  if($roomId!=0) {
        echo    "
        <div id=\"content\">
        <div class=\"exitcontent\">
        <span id=\"youname\">Ваше имя:</span> <br/>
        <span id=\"numberroom\">Номер комнаты: ". $roomId ."        </span>

        <button class=\"exitroom\">Выйти из комнаты</button>

        </div>
  
        <div id=\"mess_box\">
           

        </div>
        <div id=\"input_div\">
        <div class=\"leftformblock\"> 

         
        <input type=\"text\" name=\"message\"  class=\"newmessageinput\">
        <input type=\"hidden\" id=\"room_id\" name=\"room_id\"  value=\"$roomId\"> 
        <div id=\"btn\">
<label for=\"file\" class=\"loadfilebutton\">Мой текст</label>
</div>
        <input type=\"file\" style=\"visibility:hidden;\"  id=\"file\" name=\"file\" accept=\"image/png, image/jpeg\">  
        </div>
              <input  class=\"submitnewmessage\"   value=\"Отправить\" >   
        </div>
    </div>
                ";
    } else{
        echo "
        <span>Ты шо ахуел какой 0</span>
            ";
    } ?>
    <input type="hidden" name="val_room_id" value="<?php echo $roomId ?>" id="val_room_id" > 
    <script src="ajax.js" async></script>
    <!-- <input type="submit" value="">
    <script src="script.js"></script> -->
    <!-- <input type="text " value=""> -->
 
</body>
</html>