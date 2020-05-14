<?php

include_once '../functions/check-text-input.php';

// mail ( string $to , string $subject , string $message [, mixed $additional_headers [, string $additional_parameters ]] )
if( !empty( $_POST ) ){
  // récupération des variables
  $name     = $_POST['name'] ? checkInput($_POST['name']) : exit;
  $email    = $_POST['email'] ? checkInput($_POST['email']) : exit;
  $message  = $_POST['message'] ? checkInput($_POST['message']) : exit;
  // constitution du mail
  $to      = 'nicolas.hersant@gmail.com';
  $subject = 'email from numelops.com form';
  $headers = array(
    'From'          => 'numelops@gmail.com',
    'Reply-To'      => $email,
    'Content-type'  => 'text/plain',
  );
  // envoi du mail
  $success = mail($to, $subject, $message, $headers);
  // gestion des erreurs et redirection
  if (!$success) {
    $log  = "Infos: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").PHP_EOL.
            "Error: ".error_get_last()['message'].PHP_EOL.
            "User: ".$name." ".$email.PHP_EOL.
            "-------------------------".PHP_EOL;
    file_put_contents('../logs/log_'.date("j.n.Y").'.log', $log, FILE_APPEND);
    header("Location: /?status=error");
    exit;
  }else{
    header("Location: /?status=success");
    exit;
  }
}
