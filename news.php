<?php

require_once 'vendor/autoload.php';

$loader = new \Twig\Loader\FilesystemLoader('twig');
$twig = new \Twig\Environment($loader, [
    //'cache' => 'cache',
]);

include "functions/connexion.php";

// news

$stmt = $connexion->query("
    SELECT
        id_news,
        creation_date,
        modified_date,
        title,
        image,
        image_placement,
        description
    FROM news
    WHERE state = 1
    ORDER BY creation_date
    LIMIT 9
");

$news = $stmt->fetchAll();

//


$data = array(
    "page" => "news",
    "news" => $news,
);

echo $twig->render('page/news.html.twig', $data);
