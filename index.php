<?php

require_once 'vendor/autoload.php';

$loader = new \Twig\Loader\FilesystemLoader('twig');
$twig = new \Twig\Environment($loader, [
    //'cache' => 'cache',
]);

$data = array(
    "bienvenue" => "Bienvenue sur le nouveau site de Numelops !"
);

echo $twig->render('index.html.twig', $data);
