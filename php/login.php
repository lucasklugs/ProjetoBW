<?php

include 'connection.php';

session_start();

if($_SERVER["Request_method"] === 'post'){
    $email = $_POST['email'];
    $password = $_POST['password'];

    $sql = "select * from user where email_user = ? and password_user  = ?";

    $stmt = $conexao -> prepare($sql);
    $stmt -> bind_param('ss', $email, $password);
    $stmt -> execute();
    }
?>