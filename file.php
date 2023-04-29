<?php
require 'conn.php';

$InputPhoto = $_FILES['file'];
$uploadOk = 1;

if(!empty($_FILES['file']['name'])) {
$PhonteName = time() . '_' . $InputPhoto['name'];
$ImgDir = __DIR__ . '/img/' . $PhonteName;

if(!move_uploaded_file($InputPhoto['tmp_name'], $ImgDir)){
print_r("Хуита с файлом");
} else {
print_r('/img/' . $PhonteName);
}
}

$mysql->close();
?>