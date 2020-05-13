<?php
try {
    $connexion = new PDO('mysql:host=localhost;dbname=numelops_asso_trans;charset=utf8', 'num_user', 'HtVj4f3pGtw2BC8mzgDwxj');
} catch (Exception $e) {
    die('Erreur : ' . $e->getMessage());
}
