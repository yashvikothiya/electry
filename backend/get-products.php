<?php
// get-products.php
header("Content-Type: application/json; charset=UTF-8");
require_once 'config.php';

try {
    // Fetch all active products with their category details
    $sql = "SELECT p.*, c.name as category_name 
            FROM products p 
            LEFT JOIN categories c ON p.category_id = c.id 
            WHERE p.status='active' 
            ORDER BY p.id DESC";
            
    $stmt = $pdo->query($sql);
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($products);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Failed to fetch products: " . $e->getMessage()]);
}
