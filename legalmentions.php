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
    "title" => "Mentions Légales",
    "page" => "legalmentions"
);

echo $twig->render('page/legalmentions.html.twig', $data);
