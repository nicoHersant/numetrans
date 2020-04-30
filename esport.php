<?php

require_once 'vendor/autoload.php';

$loader = new \Twig\Loader\FilesystemLoader('twig');
$twig = new \Twig\Environment($loader, [
    //'cache' => 'cache',
]);

$data = array(
    "title" => "Numelops, construisons ensemble l'Esport de demain",
    "page" => "esport"
);

echo $twig->render('page/esport.html.twig', $data);
