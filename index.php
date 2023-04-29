<?php 
require 'conn.php';
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Авторизация</title>
  </head>
  <body>
    <div class="centering"> 
       
      <div class="roomlist">
        <div class="roomitem">
            <form action="room.php" class="createroom" method="post">
            <span>Введите имя</span> <br />
            <input type="text" name="name1" id="name1" placeholder="Имя" /> <br />
            <span>Введите номер комнаты</span> <br />
            <div class ="RoomCreateBlock"> 
             <input type="text" class="roomidcreate" id="room_id" name="room_id" placeholder="Желаемый номер конаты"  /> <br />
             <a class="generationNumberRoom">Rnd </a> 
            </div>
            <input type="hidden" value="1" name="UserCreateOrConnect"> 
            <a class="CreateNewRoom">Создать АЙТИ</a>
          </form>
        </div>
        <div class="roomitem">
            <form action="room.php" class="EnterRoomForm" method="post">
            <span>Введите имя</span> <br />
            <input type="text" name="name2" id="name2" placeholder="Имя" /> <br />
            <span>Введите номер комнаты</span> <br />
            <input type="text" class="roomidenter" id="room_id" name="room_id" placeholder="Введите номер комнаты" /> <br />
            <input type="hidden" value="2" name="UserCreateOrConnect" class="user2Creator">
            <a class="EnterRoom">Войти в АЙТИ</a>
          </form>
        </div>
      </div>
    </div>
     <div id="div_for_checkBox">
        <input type="checkbox" name="" id="polit_check">
        <a href="polit2.pdf">Политика конфиденциальности</a>
      </div>
    <link rel="stylesheet" href="style.css" />
    <script>
 
    </script>
        <link rel="stylesheet" href="darktheme.css">
        
    <script src="script.js"></script>
  </body>
</html>