<?php
// get-posts.php
header("Content-Type: application/json; charset=UTF-8");
require_once 'config.php';

try {
    // Fetch all blog posts ordered by created_at DESC, id ASC
    $stmt = $pdo->query("SELECT * FROM blog_posts ORDER BY created_at DESC, id ASC");
    $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($posts);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Failed to fetch posts: " . $e->getMessage()]);
}
