<?php
// get-post.php
header("Content-Type: application/json; charset=UTF-8");
require_once 'config.php';

if (!isset($_GET['id'])) {
    http_response_code(400);
    echo json_encode(["error" => "Post ID is required"]);
    exit;
}

try {
    $id = (int)$_GET['id'];
    $stmt = $pdo->prepare("SELECT * FROM blog_posts WHERE id = ?");
    $stmt->execute([$id]);
    $post = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($post) {
        echo json_encode($post);
    } else {
        http_response_code(404);
        echo json_encode(["error" => "Post not found"]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Failed to fetch post: " . $e->getMessage()]);
}
