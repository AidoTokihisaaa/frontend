<?php
require_once __DIR__ . '/../models/Item.php';
require_once __DIR__ . '/../views/Response.php';

class ItemController {
    private $itemModel;

    public function __construct() {
        $this->itemModel = new Item();
    }
    public function getList() {
        $items = $this->itemModel->getList();
        if ($items) {
            Response::json(200, "Liste récupérée avec succès", $items);
        } else {
            Response::json(404, "Aucun article trouvé");
        }
    }
    public function getById($id) {
        $item = $this->itemModel->getById($id);
        if ($item) {
            Response::json(200, "Élément trouvé", $item);
        } else {
            Response::json(404, "Élément non trouvé");
        }
    }
    public function add() {
        $data = json_decode(file_get_contents("php://input"), true);

        if (isset($data['name']) && isset($data['quantity']) && is_string($data['name']) && is_numeric($data['quantity']) && $data['quantity'] > 0) {
            $name = trim($data['name']);
            $quantity = (int) $data['quantity'];

            if ($this->itemModel->add($name, $quantity)) {
                Response::json(201, "Élément ajouté avec succès");
            } else {
                Response::json(500, "Erreur lors de l'ajout de l'élément");
            }
        } else {
            Response::json(400, "Données invalides : Le nom et la quantité doivent être valides");
        }
    }

    public function update($id) {
        $data = json_decode(file_get_contents("php://input"), true);

        if (isset($data['name']) && isset($data['quantity']) && is_string($data['name']) && is_numeric($data['quantity']) && $data['quantity'] > 0) {
            $name = trim($data['name']);
            $quantity = (int) $data['quantity'];

            if ($this->itemModel->update($id, $name, $quantity)) {
                Response::json(200, "Élément mis à jour avec succès");
            } else {
                Response::json(500, "Erreur lors de la mise à jour");
            }
        } else {
            Response::json(400, "Données invalides : Le nom et la quantité doivent être valides");
        }
    }

    public function deleteById($id) {
        if ($this->itemModel->deleteById($id)) {
            Response::json(200, "Élément supprimé avec succès");
        } else {
            Response::json(500, "Erreur lors de la suppression de l'élément");
        }
    }
}
?>
