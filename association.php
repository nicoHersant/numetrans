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
    "title" => "Numelops, l'équipe avant tout",
    "page" => "association"
);

echo $twig->render('page/association.html.twig', $data);
