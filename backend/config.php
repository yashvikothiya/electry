<?php
// config.php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'savex_db');

// Enable CORS so the React Frontend can communicate with the APIs
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

// Global session start helper
function start_secure_session() {
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }
}

// Redirect if user is not logged in as admin
function require_admin() {
    start_secure_session();
    if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
        header("Location: login.php");
        exit();
    }
}

try {
    $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4", DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ]);
} catch (PDOException $e) {
    // If standard request, return JSON error
    if (strpos($_SERVER['REQUEST_URI'], '/api/') !== false) {
        header("Content-Type: application/json; charset=UTF-8");
        http_response_code(500);
        echo json_encode(["error" => "Database connection failed: " . $e->getMessage()]);
        exit();
    } else {
        // Otherwise, show clean HTML error page
        die("<div style='font-family:sans-serif;padding:30px;background:#FDF2F2;border-radius:10px;color:#E31E24;margin:50px auto;max-width:600px;'>
                <h3 style='margin-top:0;'>Database Connection Error</h3>
                <p>Could not connect to the database. Please ensure MySQL is running in XAMPP and you have executed <code>schema.sql</code>.</p>
                <p style='font-size:12px;color:#555;'>Error details: {$e->getMessage()}</p>
             </div>");
    }
}
