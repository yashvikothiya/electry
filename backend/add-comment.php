<?php
// add-comment.php
header("Content-Type: application/json; charset=UTF-8");
require_once 'config.php';

// Allow OPTIONS preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Only POST requests are allowed"]);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    $input = $_POST;
}

$name = isset($input['name']) ? trim($input['name']) : '';
$email = isset($input['email']) ? trim($input['email']) : '';
$comment = isset($input['comment']) ? trim($input['comment']) : '';
$post_id = isset($input['post_id']) ? (int)$input['post_id'] : 0;

if (empty($name) || empty($email) || empty($comment) || $post_id <= 0) {
    http_response_code(400);
    echo json_encode(["error" => "Name, Email, Comment and Post ID are required."]);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["error" => "Please enter a valid email address."]);
    exit();
}

try {
    $stmt = $pdo->prepare("INSERT INTO blog_comments (post_id, name, email, comment, status, created_at) VALUES (?, ?, ?, ?, 'new', NOW())");
    $stmt->execute([$post_id, $name, $email, $comment]);
    echo json_encode(["success" => true, "message" => "Your comment has been submitted successfully."]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Failed to submit comment: " . $e->getMessage()]);
}
