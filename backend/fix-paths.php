<?php
// fix-paths.php
require_once 'config.php';

try {
    // Fix products table
    $stmt1 = $pdo->prepare("UPDATE products SET image_url = REPLACE(image_url, 'http://localhost/yashvi/uploads/', 'http://localhost/yashvi/electry/backend/uploads/')");
    $stmt1->execute();
    $affected1 = $stmt1->rowCount();
    
    // Fix blog_posts table
    $stmt2 = $pdo->prepare("UPDATE blog_posts SET image_url = REPLACE(image_url, 'http://localhost/savex-backend/uploads/', 'http://localhost/yashvi/electry/backend/uploads/')");
    $stmt2->execute();
    $affected2 = $stmt2->rowCount();
    
    echo json_encode([
        "success" => true,
        "message" => "Successfully updated paths.",
        "products_updated" => $affected1,
        "posts_updated" => $affected2
    ]);
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
