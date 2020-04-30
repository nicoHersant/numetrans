<?php

require_once 'vendor/autoload.php';

$loader = new \Twig\Loader\FilesystemLoader('twig');
$twig = new \Twig\Environment($loader, [
    //'cache' => 'cache',
]);

$data = array(
    "title" => "Les dernières actualités",
    "page" => "news"
);

echo $twig->render('page/news.html.twig', $data);
