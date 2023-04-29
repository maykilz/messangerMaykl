let CreateRoom =  document.querySelector('.CreateNewRoom'); 
let FormCreteRoom = document.querySelector('.createroom'); 
let EnterRoomForm = document.querySelector('.EnterRoomForm');
let EnterRoom  = document.querySelector('.EnterRoom'); 
let generationNumberRoom = document.querySelector('.generationNumberRoom');
const politCheck = document.getElementById("polit_check");
let UserNameValue = document.querySelector('#name1'); 
let UserNameValue2 =  document.querySelector('#name2'); 
if (!localStorage.getItem("politlocal")) {
    localStorage.setItem("politlocal", 0);
  }
  if (localStorage.politlocal != "1" && localStorage.politlocal != "0") {
    localStorage.politlocal = "0";
  }
  if(localStorage.getItem("politlocal") == "1") {
    document.getElementById("polit_check").checked = true;
  }
UserNameValue.addEventListener('input', SetLocalStorageOne);
UserNameValue2.addEventListener('input', SetLocalStorageTwo);
function SetLocalStorageOne() { 
  localStorage.setItem('usernameNicks', document.querySelector('#name1').value); 
} 
function SetLocalStorageTwo() { 
  localStorage.setItem('usernameNicks', document.querySelector('#name2').value); 
}  

const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  
generationNumberRoom.addEventListener('click', function(evt) {
 function CheckRoomIds() {
    let RandomId =  random(1, 99999999);
    var xhr = new XMLHttpRequest();  
    let bodyXHRDelete = 'room_id=' + RandomId;
    xhr.open('post', 'CheckRoom.php');    
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
       if (xhr.response == 'Room_have') {
         CheckRoomIds();
       }
       else {
           if (xhr.response == 'Romm_dont_have') {  
             document.querySelector('.roomidcreate').value = RandomId; 
           }
       }
    }  
     xhr.send(bodyXHRDelete);
     
 }
 CheckRoomIds();
})

CreateRoom.addEventListener('click', function(evt) {  
    if(politCheck.checked) {
        localStorage.setItem('politlocal', 1);
    evt.preventDefault();
     var xhr = new XMLHttpRequest(); 
     let roomId  = document.querySelector('.roomidcreate').value;  
     let bodyXHRDelete = 'room_id=' + roomId;
     xhr.open('post', 'CheckRoom.php');    
     xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
     xhr.onload = function() {
        if (xhr.response == 'Room_have') {
            alert('Извините комната с таким номером занята');
        }
        else {
            if (xhr.response == 'Romm_dont_have') { 
                UserConnects( FormCreteRoom.submit()); 
            }
        }
     }  
      xhr.send(bodyXHRDelete);
    }else{
        alert("Примите политику конфиденциальности!")
    }
});


EnterRoom.addEventListener('click', function(evt) { 
    if(politCheck.checked) {
        localStorage.setItem('politlocal', 1);
    evt.preventDefault();
     var xhr = new XMLHttpRequest(); 
     let roomId  = document.querySelector('.roomidenter').value;  
     let bodyXHREnter = 'room_id=' + roomId;
     xhr.open('post', 'CheckRoom.php');    
     xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
     xhr.onload = function() {
        if (xhr.response == 'Room_have') { 
            var xhrNew = new XMLHttpRequest();   
            xhrNew.open('post', 'CheckTwoUser.php');    
            xhrNew.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhrNew.onload = function() {  
                let ResponseCheckUser = xhrNew.response.split(/\s+/).join('');  
                if (ResponseCheckUser== "1") { 
                    xhrNew.open('post', 'CheckOneUser.php');
                    xhrNew.onload = function() {
                        ResponseCheckUser = xhrNew.response.split(/\s+/).join('');  
                        if (ResponseCheckUser== "3") { 
                            alert('Комната занята');
                        }
                        else {
                            if (ResponseCheckUser== "4") { 
                                let user2Creator = document.querySelector('.user2Creator');
                                user2Creator.value = 1; 
                                UserConnects( EnterRoomForm.submit());
                            }  
                        }
                    }
                    xhrNew.send(bodyXHREnter); 
                }
                else {
                    if (ResponseCheckUser =="2") {    
                        UserConnects( EnterRoomForm.submit());
                    }
                }
             }  
             xhrNew.send(bodyXHREnter); 
 
        }
        else {
            if (xhr.response == 'Romm_dont_have') {  
             alert('Извините комната с таким номером не существует');
            }
        }
     }  
      xhr.send(  bodyXHREnter);
    }else{
        alert("Примите политику конфиденциальности!")
    }
});



function UserConnects(fnc) { 
    var xhrNew = new XMLHttpRequest();    
    
    let roomId  = document.querySelector('.roomidcreate').value;  
    let bodyXHRConnect = 'room_id=' + roomId + '&nick_name=' + localStorage.usernameNicks;
    xhrNew.open('get', 'UserConnects.php' ); 
    xhrNew.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhrNew.onload = function () { 
        fnc;
    }
    xhrNew.send(bodyXHRConnect); 
  
}