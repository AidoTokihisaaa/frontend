<?php
// Connexion à la base de données (modifiez les informations si nécessaire)
$host = 'localhost';  // Utilisez 127.0.0.1 au lieu de localhost
$db = 'shopping_list'; // Nom de la base de données
$user = 'root';        // Utilisateur de la base de données
$pass = '';            // Mot de passe de l'utilisateur (vide pour XAMPP)

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erreur de connexion : " . $e->getMessage());
}

// Chemin vers le fichier JSON
$filePath = __DIR__ . '/products.json'; // Utilisation de __DIR__ pour référence le répertoire actuel

// Vérification si le fichier existe
if (!file_exists($filePath)) {
    die("Le fichier JSON est introuvable.");
}

// Lire et décoder le fichier JSON
$jsonData = file_get_contents($filePath);
$products = json_decode($jsonData, true);

// Vérifier si le fichier JSON a été correctement décodé
if ($products === null) {
    die('Erreur lors de la lecture du fichier JSON.');
}

// Insérer les produits dans la base de données
foreach ($products as $product) {
    // Vérification si le produit existe déjà dans la base de données
    $query = "SELECT COUNT(*) FROM items WHERE id = :id";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':id', $product['id']);
    $stmt->execute();
    $count = $stmt->fetchColumn();

    // Si le produit existe déjà, on l'ignore
    if ($count > 0) {
        echo "Produit " . $product['name'] . " déjà existant, ignoré.<br>";
        continue;
    }

    // Préparer la requête d'insertion
    $query = "INSERT INTO items (id, name, category, price, weight, description) 
              VALUES (:id, :name, :category, :price, :weight, :description)";
    $stmt = $pdo->prepare($query);

    // Lier les paramètres
    $stmt->bindParam(':id', $product['id']);
    $stmt->bindParam(':name', $product['name']);
    $stmt->bindParam(':category', $product['category']);
    $stmt->bindParam(':price', $product['price']);
    $stmt->bindParam(':weight', $product['weight']);
    $stmt->bindParam(':description', $product['description']);

    // Exécuter la requête
    try {
        $stmt->execute();
        echo "Produit " . $product['name'] . " ajouté avec succès.<br>";
    } catch (PDOException $e) {
        echo "Erreur lors de l'insertion du produit " . $product['name'] . ": " . $e->getMessage() . "<br>";
    }
}

// Confirmation de l'importation
echo "Les produits ont été ajoutés à la base de données avec succès.";
?>