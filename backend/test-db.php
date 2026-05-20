<?php
// test-db.php
header("Content-Type: application/json; charset=UTF-8");
require_once 'config.php';

try {
    $products = $pdo->query("SELECT * FROM products")->fetchAll(PDO::FETCH_ASSOC);
    $categories = $pdo->query("SELECT * FROM categories")->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode([
        "products" => $products,
        "categories" => $categories
    ], JSON_PRETTY_PRINT);
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
