<?php
// get-categories.php
header("Content-Type: application/json; charset=UTF-8");
require_once 'config.php';

try {
    // Fetch all active categories
    $stmt = $pdo->query("SELECT * FROM categories WHERE status='active' ORDER BY name ASC");
    $categories = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($categories);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Failed to fetch categories: " . $e->getMessage()]);
}
