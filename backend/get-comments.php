<?php
// get-comments.php
header("Content-Type: application/json; charset=UTF-8");
require_once 'config.php';

$post_id = isset($_GET['post_id']) ? (int)$_GET['post_id'] : 0;
$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 0;

if ($post_id <= 0) {
    http_response_code(400);
    echo json_encode(["error" => "Post ID is required."]);
    exit();
}

try {
    $sql = "SELECT bc.id, bc.post_id, bc.name, bc.email, bc.comment, bc.status, bc.created_at, bp.title AS post_title
            FROM blog_comments bc
            LEFT JOIN blog_posts bp ON bc.post_id = bp.id
            WHERE bc.post_id = ?
            ORDER BY bc.created_at DESC";
    if ($limit > 0) {
        $sql .= " LIMIT " . $limit;
    }

    $stmt = $pdo->prepare($sql);
    $stmt->execute([$post_id]);
    $comments = $stmt->fetchAll();
    echo json_encode($comments);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Failed to fetch comments: " . $e->getMessage()]);
}
