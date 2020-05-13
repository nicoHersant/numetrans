<?php

require_once '../vendor/autoload.php';

$loader = new \Twig\Loader\FilesystemLoader('../twig');
$twig = new \Twig\Environment($loader, [
    //'cache' => 'cache',
]);

$action = (isset($_GET['action'])) ? $_GET['action'] : "";

$data = array(
    "action" => $action
);

echo $twig->render('block/admin.html.twig', $data);