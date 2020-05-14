<?php
session_start();

$admin = false;
if (isset($_SESSION['admin'])){
    $admin = true;
}

require_once 'vendor/autoload.php';

$loader = new \Twig\Loader\FilesystemLoader('twig');
$twig = new \Twig\Environment($loader, [
    //'cache' => 'cache',
]);

$data = array(
    "admin" => $admin,
    "title" => "Numelops, construisons ensemble l'Esport de demain",
    "page" => "esport"
);

echo $twig->render('page/esport.html.twig', $data);
