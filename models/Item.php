<?php
require_once __DIR__ . '/../config/Database.php';

class Item {
    private $conn;

    public function __construct() {
        $this->conn = Database::getConnection();
    }

    public function getList() {
        $query = "SELECT * FROM items";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getById($id) {
        $query = "SELECT * FROM items WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function add($name, $quantity) {
        $query = "INSERT INTO items (name, quantity) VALUES (:name, :quantity)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':quantity', $quantity);
        return $stmt->execute();
    }

    public function update($id, $name, $quantity) {
        $query = "UPDATE items SET name = :name, quantity = :quantity WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':quantity', $quantity);
        return $stmt->execute();
    }

    public function deleteById($id) {
        $query = "DELETE FROM items WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        return $stmt->execute();
    }
}
?>
