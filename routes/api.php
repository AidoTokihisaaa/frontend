<?php
require_once __DIR__ . '/../controllers/ItemController.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

$controller = new ItemController();

$request_method = $_SERVER["REQUEST_METHOD"];
$uri = explode('/', trim($_SERVER['REQUEST_URI'], '/'));

if ($uri[0] === 'api') {
    if ($request_method === 'GET' && isset($uri[1]) && is_numeric($uri[1])) {
        $controller->getById($uri[1]);
    } elseif ($request_method === 'GET') {
        $controller->getList();
    } elseif ($request_method === 'POST') {
        $controller->add();
    } elseif ($request_method === 'PUT' && isset($uri[1]) && is_numeric($uri[1])) {
        $controller->update($uri[1]);
    } elseif ($request_method === 'DELETE' && isset($uri[1]) && is_numeric($uri[1])) {
        $controller->deleteById($uri[1]);
    } else {
        Response::json(400, "Requête invalide");
    }
} else {
    Response::json(404, "Route non trouvée");
}
?>
