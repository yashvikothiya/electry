<?php
// fix-admin.php - Complete Setup & Fix Script
// Place this file in C:\xampp\htdocs\backend\ and open in browser

$host = 'localhost';
$user = 'root';
$pass = '';
$dbname = 'savex_db';

$newUsername = 'admin';
$newPassword = 'savex2024';

echo "<!DOCTYPE html><html><head>
<title>SaveX Admin Fix</title>
<link href='https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800&display=swap' rel='stylesheet'>
<style>
  body { font-family: Outfit, sans-serif; background: #E7F0E9; margin: 0; padding: 30px; }
  .card { background: white; border-radius: 20px; padding: 35px; max-width: 650px; margin: 0 auto; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
  h2 { color: #10271D; margin-top: 0; }
  .step { background: #f8fafb; border-left: 4px solid #10271D; padding: 15px 20px; border-radius: 0 12px 12px 0; margin: 15px 0; font-size: 15px; }
  .step.ok { border-color: #107C41; background: #E6F6ED; color: #107C41; }
  .step.err { border-color: #E31E24; background: #FDF2F2; color: #E31E24; }
  .creds { background: #10271D; color: white; border-radius: 14px; padding: 25px 30px; margin: 25px 0; }
  .creds p { margin: 8px 0; font-size: 17px; }
  .btn { display: inline-block; background: #10271D; color: white; padding: 14px 35px; border-radius: 100px; text-decoration: none; font-weight: 700; font-size: 16px; margin-top: 10px; }
  .btn:hover { background: #E31E24; }
</style>
</head><body><div class='card'>";

echo "<h2>🔧 SaveX Admin — Auto Fix Tool</h2>";

// Step 1: Database Connection
try {
    $pdo = new PDO("mysql:host=$host;charset=utf8mb4", $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
    echo "<div class='step ok'>✅ Step 1: MySQL connection successful!</div>";
} catch (Exception $e) {
    echo "<div class='step err'>❌ Step 1 FAILED: Cannot connect to MySQL. Is XAMPP running?<br><small>" . $e->getMessage() . "</small></div></div></body></html>";
    exit();
}

// Step 2: Create Database if not exists
try {
    $pdo->exec("CREATE DATABASE IF NOT EXISTS `$dbname` DEFAULT CHARACTER SET utf8mb4");
    $pdo->exec("USE `$dbname`");
    echo "<div class='step ok'>✅ Step 2: Database '$dbname' is ready!</div>";
} catch (Exception $e) {
    echo "<div class='step err'>❌ Step 2 FAILED: " . $e->getMessage() . "</div></div></body></html>";
    exit();
}

// Step 3: Create tables if not exists
try {
    $pdo->exec("CREATE TABLE IF NOT EXISTS admins (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        email VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB");

    $pdo->exec("CREATE TABLE IF NOT EXISTS blog_posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(50) NOT NULL DEFAULT 'GREEN POWER',
        post_date VARCHAR(50) NOT NULL,
        image_url VARCHAR(255) NOT NULL,
        slug VARCHAR(100) NOT NULL UNIQUE,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB");

    $pdo->exec("CREATE TABLE IF NOT EXISTS contact_inquiries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(20),
        subject VARCHAR(255),
        message TEXT NOT NULL,
        status VARCHAR(20) DEFAULT 'unread',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB");

    echo "<div class='step ok'>✅ Step 3: All tables created/verified!</div>";
} catch (Exception $e) {
    echo "<div class='step err'>❌ Step 3 FAILED: " . $e->getMessage() . "</div></div></body></html>";
    exit();
}

// Step 4: Create/Update Admin with fresh password hash
try {
    $hash = password_hash($newPassword, PASSWORD_BCRYPT);

    // Delete old admin and re-insert fresh
    $pdo->exec("DELETE FROM admins WHERE username = 'admin'");
    $stmt = $pdo->prepare("INSERT INTO admins (username, password_hash, email) VALUES (?, ?, ?)");
    $stmt->execute([$newUsername, $hash, 'admin@savexelectricals.com']);

    // Verify the hash immediately
    $checkStmt = $pdo->prepare("SELECT * FROM admins WHERE username = ?");
    $checkStmt->execute([$newUsername]);
    $row = $checkStmt->fetch(PDO::FETCH_ASSOC);

    if ($row && password_verify($newPassword, $row['password_hash'])) {
        echo "<div class='step ok'>✅ Step 4: Admin account created & verified! Login will work!</div>";
    } else {
        echo "<div class='step err'>❌ Step 4: Hash verification failed. PHP version issue.</div></div></body></html>";
        exit();
    }
} catch (Exception $e) {
    echo "<div class='step err'>❌ Step 4 FAILED: " . $e->getMessage() . "</div></div></body></html>";
    exit();
}

// All good - show credentials
echo "<div class='creds'>
    <p>🎉 <strong>Setup Complete! Your Login Credentials:</strong></p>
    <p>👤 <strong>Username:</strong> admin</p>
    <p>🔑 <strong>Password:</strong> savex2024</p>
  </div>
  <a href='login.php' class='btn'>Open Admin Login →</a>
  <p style='margin-top:20px; font-size:13px; color:#666;'>⚠️ Delete this file after logging in for security!</p>
</div></body></html>";
?>
