<?php
session_start();

include_once 'check-text-input.php';

$action = (isset($_POST['action'])) ? checkInput($_POST['action']) : "";
$login = (isset($_POST['login'])) ? checkInput($_POST['login']) : "";
$password = (isset($_POST['password'])) ? checkInput($_POST['password']) : "";

$error = array();
$textError = "";
if ($action === "connexion") {
    if (empty($login)) {
        $error[] = "identifiant";
    }
    if (empty($password)) {
        $error[] = "mot de passe";
    }

    $textError = implode(", ", $error);
    $textError = ucfirst($textError);

    if (!empty($textError)) {
        if (count($error) > 1) {
            $pos = strrpos($textError, ", ");
            $textError = substr_replace($textError, " et ", $pos, strlen($textError)) . substr($textError, $pos + 2);
        }
        $textError .= " requis.";
    }

    if (!empty($imageTextError)) {
        $textError .= $imageTextError . ".";
    }

    if (count($error) > 0) {
        echo json_encode(array(
            "success" => false,
            "info" => $textError
        ));
    } else {
        include "connexion.php";

        $stmt = $connexion->prepare("
            SELECT 
                id_user,
                password
            FROM user
            WHERE login = :login
            LIMIT 1
        ");

        $stmt->execute(
            array(
                'login' => $login
            )
        );

        $user = $stmt->fetch();

        $verifyPassword = false;
        if ($user){
            $verifyPassword = password_verify($password, $user['password']);
        }
        if ($verifyPassword){
            $_SESSION["admin"] = true;
            $_SESSION["user"] = $user['id_user'];

            echo json_encode(array(
                "success" => true,
                "info" => "Connexion..."
            ));
        }
        else{
            echo json_encode(array(
                "success" => false,
                "info" => "Identifiants incorrects."
            ));
        }
    }
}
elseif ($action === "deconnexion"){
    session_destroy();

    echo json_encode(array(
        "success" => true,
        "info" => "Déconnexion..."
    ));
}