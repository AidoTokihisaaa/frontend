<?php
require_once 'Database.php';
require_once 'User.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type, Authorization");


if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['email']) && isset($data['password'])) {
    $email = $data['email'];
    $password = password_hash($data['password'], PASSWORD_BCRYPT); 
    $userModel = new User();
    $result = $userModel->register($email, $password);
    
    if ($result) {
        echo json_encode(['message' => 'Inscription réussie']);
    } else {
        echo json_encode(['message' => 'Erreur d\'inscription']);
    }
} else {
    echo json_encode(['message' => 'Données manquantes']);
}
?>
