<?php
require_once 'Database.php';
require_once 'User.php';

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['email']) && isset($data['password'])) {
    $email = $data['email'];
    $password = $data['password'];

    $userModel = new User();
    $user = $userModel->login($email);

    if ($user && password_verify($password, $user['password'])) {
        echo json_encode(['message' => 'Connexion réussie']);
    } else {
        echo json_encode(['message' => 'Identifiants incorrects']);
    }
} else {
    echo json_encode(['message' => 'Données manquantes']);
}
?>
