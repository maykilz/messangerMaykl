let roomid =  document.querySelector('#val_room_id').value;

let formsendmessage = document.querySelector('.sendmessageform');



let nickNameuth = localStorage.usernameNicks;  
var myDiv = document.getElementById("mess_box");
myDiv.scrollTop = myDiv.scrollHeight; 
window.onload = function() {
    var myDiv = document.getElementById("mess_box");
    myDiv.scrollTop = myDiv.scrollHeight;
  };
 
let sendbuttonMessage = document.querySelector('.submitnewmessage');
let inputNewMessage = document.querySelector('.newmessageinput');
let messabox = document.querySelector('#mess_box');
let BackupMessages; 
let NewMessage = '';  
let photoBool = 0; 
let photoSrcSend = '';
let urls = 'http://maykilaliev.ru/NewMessangerDesignUI/';
let RendorMessages = function(messages){  
  let messagesJSON = JSON.parse(messages); 
  for (let prop in messagesJSON) {
    let MessageR = messagesJSON[prop];  
let myNewElement = document.createElement("div"); 
    if (MessageR.Type == 'Photo'){
        let imgUrl =  MessageR.photo_url ;
        console.log(imgUrl);

 
        console.log(MessageR.photo_url);
        let imgElement = document.createElement('img');
        imgElement.classList.add('imgMessage');
        imgElement.src = '';
        imgElement.src =urls +  imgUrl;
 
          
        myNewElement.appendChild(imgElement);
    }
    let spanmessage = document.createElement("span"); 
    spanmessage.innerHTML = `<span class="namesender"> ${MessageR.Nick}<span>  <br><span class="messagesended"> ${MessageR.Text } <span> `;
 
    myNewElement.appendChild(spanmessage); 
    myNewElement.classList.add('newmessage');  
    if (MessageR.Nick == nickNameuth) {  
        myNewElement.classList.add('bmessanger');
    }
    messabox.appendChild(myNewElement); 
  } 
  var myDiv = document.getElementById("mess_box");
  myDiv.scrollTop = myDiv.scrollHeight;
}

window.onload = function() { 
    LoadAllMessages();
}

function LoadAllMessages() { 
    let XHR =  new XMLHttpRequest();
    let bodyXHR  = 'room_id=' + roomid;
    XHR.onload = function() {  if ((XHR.response !='' ) && (XHR.response != BackupMessages)) { 
        messabox.innerHTML = '';RendorMessages(XHR.response) ;      BackupMessages = XHR.response; } };
    XHR.open('post', 'get_allmessage.php');  
    XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); 
    XHR.send(bodyXHR);
}

sendbuttonMessage.addEventListener('click', function() { 
    sendmessage(); 
});


inputNewMessage.addEventListener('keydown', function(evt) { 
    if (evt.keyCode == 13) { 
        sendmessage();
    }
})

function CreateMessagesDOM ( ) { 
    let spanmessage = document.createElement("span"); 
    let myNewElement = document.createElement("div"); 
    if (photoBool ==1) {
        let img = document.createElement("img");

        img.src = photoSrcSend;
        console.log(photoSrcSend);
        myNewElement.appendChild(img);
    }
    spanmessage.innerHTML = `<span  class="namesender"> ${nickNameuth}<span>  <br><span  class="messagesended"> ${NewMessage} <span> `;
 
    myNewElement.appendChild(spanmessage);
    myNewElement.classList.add('newmessage');
    myNewElement.classList.add('bmessanger');
    messabox.appendChild(myNewElement); 

}
function sendmessage( ) {  
    NewMessage = document.querySelector('.newmessageinput').value;
    var fileInput = document.getElementById('file');
    var file = fileInput.files[0];

    var xhr = new XMLHttpRequest();
    if (file !=undefined) { 
        var XHRFIle = new XMLHttpRequest();
        var formData = new FormData();  
        formData.append('room_id', roomid);
        formData.append('nick_name', nickNameuth);
        formData.append('Text_In_Mess', NewMessage);
        formData.append('file', file);
        XHRFIle.onload = function() {    
        bodyXHR = 'room_id=' + roomid + '&nick_name=' + nickNameuth + '&Text_In_Mess=' +  NewMessage  +'&photo='+XHRFIle.response;
        photoSrcSend = '';
        photoSrcSend = XHRFIle.response;
            xhr.open('post', 'SendImage.php', true );
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); 
            xhr.send(bodyXHR); 
            photoBool =1;
            console.log(photoBool);
          CreateMessagesDOM();  
          document.querySelector('.newmessageinput').value ='';  
          document.getElementById('file').value = '';
        }
        // Настраиваем его для отправки данных на сервер
        XHRFIle.open('POST', 'file.php', true);
    
        // Отправляем данные на сервер
        XHRFIle.send(formData);
    }
    else {
        SendTxtMessage('room_id=' + roomid + '&nick_name=' + nickNameuth + '&Text_In_Mess=' + NewMessage);
        photoBool=0;
        console.log(photoBool);
    }


    function SendTxtMessage(Body) { 
     //   bodyXHR = 'room_id=' + roomid + '&nick_name=' + nickNameuth + '&Text_In_Mess=' +'&dir_img='+XHRFIle.response;
        xhr.open('post', 'all.php', true );
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); 
            xhr.send(Body); 
            CreateMessagesDOM();  
            document.querySelector('.newmessageinput').value =''; 

    }
    

    function SendImages(Body) { 
         bodyXHR = 'room_id=' + roomid + '&nick_name=' + nickNameuth + '&Text_In_Mess=' +'&dir_img='+XHRFIle.response;
           xhr.open('post', 'all.php', true );
            
   
       }

    function SendImgMessage(Body) { 
     //   bodyXHR = 'room_id=' + roomid + '&nick_name=' + nickNameuth + '&Text_In_Mess=' +'&dir_img='+XHRFIle.response;
        xhr.open('post', 'SendImage.php', true );
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); 
            xhr.send(Body); 
            CreateMessagesDOM();  
            document.querySelector('.newmessageinput').value =''; 

    }
    

 
 
 } 

setInterval(function() { 
    LoadAllMessages();
}, 10000); 

let exitRoom = document.querySelector('.exitroom'); 
let deleteModal =  document.querySelector('#delet_div');
let backRoom = document.querySelector('#backroom'); 
exitRoom.addEventListener('click' , function() { 
    deleteModal.style.visibility = 'visible';  
});
backRoom.addEventListener('click', function() { 
    deleteModal.style.visibility = 'hidden';  
})
let exitbuttonMessage = document.getElementById('button_exit');
exitbuttonMessage.addEventListener('click', function() {  
    let XHR =  new XMLHttpRequest();
    let bodyXHR  = 'room_id=' + roomid + '&nick_name=' + nickNameuth;
    XHR.onload =  function()  { 
     window.location = 'index.php'; 
    }
    XHR.open('post', 'exitUser.php');  
    XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); 
    XHR.send(bodyXHR);
});

 

let youname = document.querySelector('#youname');
youname.innerHTML = 'Ваше имя: '+  nickNameuth ; 

 