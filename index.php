<?php

require_once 'vendor/autoload.php';

$loader = new \Twig\Loader\FilesystemLoader('twig');
$twig = new \Twig\Environment($loader, [
    //'cache' => 'cache',
]);

$data = array(
    "title" => "Bienvenue sur le nouveau site de Numelops !",
    "page" => "home"
);

echo $twig->render('page/home.html.twig', $data);
