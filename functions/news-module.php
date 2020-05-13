<?php

require_once '../vendor/autoload.php';

$loader = new \Twig\Loader\FilesystemLoader('../twig');
$twig = new \Twig\Environment($loader, [
    //'cache' => 'cache',
]);

$idNews = (isset($_GET['id-news'])) ? $_GET['id-news'] : 0;
$action = (isset($_GET['action'])) ? $_GET['action'] : null;

include "../functions/connexion.php";

if (!empty($idNews)) {
    $stmt = $connexion->prepare("
        SELECT 
            title,
            image,
            image_placement,
            description 
        FROM news
        WHERE id_news = :id_news
    ");

    $stmt->execute(
        array(
            'id_news' => $idNews
        )
    );

    $news = $stmt->fetch();
}

$data = array(
    "news" => $news,
    "id_news" => $idNews,
    "action" => $action
);

echo $twig->render('block/news-module.html.twig', $data);