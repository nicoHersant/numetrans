<?php

// mail ( string $to , string $subject , string $message [, mixed $additional_headers [, string $additional_parameters ]] )

$to      = 'nicolas.hersant@gmail.com';
$subject = 'test email';
$message = 'Hi ! this is a test.';
$headers = array(
    'From'          => 'numelops@gmail.com',
    'Reply-To'      => 'nicolas.hersant@gmail.com',
    'Content-type'  => 'text/plain',
);

$success = mail($to, $subject, $message, $headers);
if (!$success) {
    $errorMessage = error_get_last()['message'];
}
