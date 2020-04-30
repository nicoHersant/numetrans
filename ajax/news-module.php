<?php

include_once '../functions/check-text-input.php';

$idNews = isset($_POST['id-news']) ? checkInput($_POST['id-news']) : 0;
$title = isset($_POST['title']) ? checkInput($_POST['title']) : "";
$image = isset($_FILES['image']) ? $_FILES['image'] : null;
$placement = isset($_POST['image-placement']) ? checkInput($_POST['image-placement']) : 0;
$description = isset($_POST['description']) ? checkInput($_POST['description']) : "";
$archivage = isset($_POST['id-news']) ? 2 : 0;

$error = array();
$textError = "";
$imageError = array();
$imageTextError = "";

if (empty($archivage)){
    if (empty($title)){
        $error[] = "titre";
    }
    if (empty($image)){
        $error[] = "image";
    }
    else{
        $imageName = $image['name'];
        $imageSize = $image['size'] / 1000000; //mo
        $imageType = $image['type'];
        $imageErrorFile = $image['error'];

        if ($imageErrorFile !== "0"){
            $imageError[] = "un problème est survenu avec le fichier";
        }
        else{
            if ($imageSize > 2){
                $imageError[] = "l'image ne doit pas excéder 2mo";
            }
            if ($imageType !== "image/jpeg" && $imageType !== "image/jpg" && $imageType !== "image/png"){
                $imageError[] = "uniquement les fichiers jpeg/jpg/png sont acceptés";
            }
        }

        $imageTextError = implode(", ", $error);
        $imageTextError = ucfirst($imageTextError);
        $pos = strrpos($imageTextError, ", ");
        if (!empty($imageTextError)) {
            $imageTextError = substr_replace($imageTextError, " et ", $pos, strlen($imageTextError)).substr($imageTextError, $pos+2);
        }
    }
    if (empty($description)){
        $error[] = "description";
    }

    $textError = implode(", ", $error);
    $textError = ucfirst($textError);

    if (!empty($textError)) {
        if (count($error) > 1) {
            $pos = strrpos($textError, ", ");
            $textError = substr_replace($textError, " et ", $pos, strlen($textError)).substr($textError, $pos+2);
        }
        $textError .= " requis.";
    }

    if (!empty($imageTextError)){
        $textError .= $imageTextError.".";
    }
}


if (count($error) > 0){
    echo json_encode(array(
        "success" => false,
        "info" => $textError
    ));
}
else{
    include "../functions/connexion.php";

    if (empty($archivage)){
        $uploadDir = '../assets/medias/news/';
        $fileName = $_FILES['image']['name'];
        $extension = explode(".", $fileName);
        $extension = $extension[count($extension)-1];
        $tmpFileName = md5(basename($fileName . microtime()));
        $uploadFile = $uploadDir . $tmpFileName . "." . $extension;

        if (move_uploaded_file($_FILES['image']['tmp_name'], $uploadFile)) {
            if (!empty($idNews) && empty($archivage)){
                try{
                    $stmt = $connexion->prepare("
                        UPDATE news 
                        SET 
                            title = :title, 
                            image = :image, 
                            image_placemen = :image_placement, 
                            description = :description,
                            modified_date = :date
                        WHERE id_news = :id_news 
                    ");
                    $stmt->bindParam(':title', $title);
                    $stmt->bindParam(':image', $imageName);
                    $stmt->bindParam(':image_placement', $placement);
                    $stmt->bindParam(':description', $description);
                    $stmt->bindParam(':date', date('Y-m-d H:i:s'));
                    $stmt->bindParam(':id_news', $idNews);

                    $stmt->execute();

                    echo json_encode(array(
                        "success" => true,
                        "info" => "Modification effectuée."
                    ));
                }
                catch(Exception $e){
                    echo json_encode(array(
                        "success" => false,
                        "info" => "Erreur PDO : ".$e->getMessage()
                    ));
                }
            }
            elseif (!empty($idNews) && !empty($archivage)){
                try{
                    $stmt = $connexion->prepare("
                        UPDATE news 
                        SET 
                            state = :state,
                            deleted_date = :date
                        WHERE id_news = :id_news 
                    ");
                    $stmt->bindParam(':state', $archivage);
                    $stmt->bindParam(':date', date('Y-m-d H:i:s'));
                    $stmt->bindParam(':id_news', $idNews);

                    $stmt->execute();

                    echo json_encode(array(
                        "success" => true,
                        "info" => "Archivage effectué."
                    ));
                }
                catch(Exception $e){
                    echo json_encode(array(
                        "success" => false,
                        "info" => "Erreur PDO : ".$e->getMessage()
                    ));
                }
            }
            else{
                try{
                    $stmt = $connexion->prepare("
                        INSERT INTO news (title, image, image_placement, description) 
                        VALUES (:title, :image, :image_placement, :description)
                    ");
                    $stmt->bindParam(':title', $title);
                    $stmt->bindParam(':image', $imageName);
                    $stmt->bindParam(':image_placement', $placement);
                    $stmt->bindParam(':description', $description);

                    $stmt->execute();

                    echo json_encode(array(
                        "success" => true,
                        "info" => "Insertion effectuée."
                    ));
                }
                catch(Exception $e){
                    echo json_encode(array(
                        "success" => false,
                        "info" => "Erreur PDO : ".$e->getMessage()
                    ));
                }
            }
        } else {
            echo json_encode(array(
                "success" => false,
                "info" => "L'image provoque une erreur."
            ));
        }
    }

    
}


