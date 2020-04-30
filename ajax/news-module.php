<?php

include_once '../functions/check-text-input.php';

$title = checkInput($_POST['title']);
$image = $_FILES['image'];
$placement = checkInput($_POST['image-placement']);
$description = checkInput($_POST['description']);


var_dump($title);
var_dump($image);
var_dump($placement);
var_dump($description);

$error = array();
$text_error = "";

if (!empty($title)){
    $error[] = "titre";
}
if (!empty($image)){
    $error[] = "image";
}
if (!empty($description)){
    $error[] = "description";
}

$text_error = implode(", ", $error);
$text_error = ucfirst($text_error);
$pos = strrpos($text_error, ", ");
if (!empty($text_error)) {
    $text_error = substr_replace($text_error, " et ", $pos, strlen($text_error)).substr($text_error, $pos+2);
    $text_error .= " requis.";
}


var_dump($text_error);die();

if (count($error) > 0){
    echo json_encode(array(
        "success" => false,
        "error" => $text_error
    ));
}


