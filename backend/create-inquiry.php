<?php
// create-inquiry.php
header("Content-Type: application/json; charset=UTF-8");
require_once 'config.php';

// Handle OPTIONS preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Only POST requests are allowed"]);
    exit();
}

// Get JSON input or fallback to POST variables
$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    $input = $_POST;
}

$name = isset($input['name']) ? trim($input['name']) : '';
$company = isset($input['company']) ? trim($input['company']) : '';
$email = isset($input['email']) ? trim($input['email']) : '';
$phone = isset($input['phone']) ? trim($input['phone']) : '';
$subject = isset($input['subject']) ? trim($input['subject']) : '';
$message = isset($input['message']) ? trim($input['message']) : '';

// Validation
if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(["error" => "Name, Email, and Message are required fields."]);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["error" => "Please enter a valid email address."]);
    exit();
}

try {
    $stmt = $pdo->prepare("INSERT INTO contact_inquiries (name, company, email, phone, subject, message, status, created_at) VALUES (?, ?, ?, ?, ?, ?, 'unread', NOW())");
    $stmt->execute([$name, $company, $email, $phone, $subject, $message]);
    
    echo json_encode(["success" => true, "message" => "Your inquiry has been submitted successfully."]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Failed to submit inquiry: " . $e->getMessage()]);
}
?>
