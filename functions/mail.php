<?php

// mail ( string $to , string $subject , string $message [, mixed $additional_headers [, string $additional_parameters ]] )

if( $_POST['name'] ){
  $name = $_POST['name'] ;
  $email = $_POST['email'] ? $_POST['email'] : die();
  $message = $_POST['message'] ?$_POST['message']  : die();

  $to      = 'nicolas.hersant@gmail.com';
  $subject = 'email from numelops.com form';
  $message = $message;
  $headers = array(
    'From'          => 'numelops@gmail.com',
    'Reply-To'      => ,
    'Content-type'  => 'text/plain',
  );
  var_dump($to, $subject, $message, $headers);
  $success = mail($to, $subject, $message, $headers);
  if (!$success) {
    $log  = "Infos: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").PHP_EOL.
            "Error: ".error_get_last()['message'].PHP_EOL.
            "User: ".$name." ".$email.PHP_EOL.
            "-------------------------".PHP_EOL;
    file_put_contents('../logs/log_'.date("j.n.Y").'.log', $log, FILE_APPEND);
  }
}
