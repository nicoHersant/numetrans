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

// archived news
$dateArchive = date("Y-m-d", strtotime("-2 months"));

$stmt = $connexion->prepare("
    SELECT 
        id_news,
        creation_date, 
        modified_date,
        title,
        image,
        image_placement,
        description 
    FROM news
    WHERE state = 0
    AND creation_date > :date_archive
    ORDER BY creation_date
");

$stmt->execute(
    array(
        'date_archive' => $dateArchive
    )
);

$archivedNews = $stmt->fetchAll();
//


$data = array(
    "page" => "news",
    "news" => $news,
    "archived_news" => $archivedNews,
);

echo $twig->render('page/news.html.twig', $data);
