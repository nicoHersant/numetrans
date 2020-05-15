<?php
session_start();

$admin = false;
if (isset($_SESSION['admin'])){
    $admin = true;
}

require_once 'vendor/autoload.php';

$loader = new \Twig\Loader\FilesystemLoader('twig');
$twig = new \Twig\Environment($loader, [
    'cache' => 'cache',
]);

$data = array(
    "admin" => $admin,
    "title" => "Bienvenue sur le nouveau site de Numelops !",
    "page" => "home",
    "GET" => $_GET
);

echo $twig->render('page/home.html.twig', $data);
