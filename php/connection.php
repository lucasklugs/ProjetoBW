<?php

$host = 'localhost';
$user = 'root';
$password = 'root';
$banco = 'brownow';

$connection = new mysqli($host, $user, $password, $banco);

if($connection -> connect_error){
    die("erro na conexão com o banco de dados: " .$connection->connect_error);
}
?>