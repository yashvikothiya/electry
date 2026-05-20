<?php
// reset-password.php - Run this ONCE to fix your admin password

define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'savex_db');

$newPassword = 'Admin@123'; // Your new password

try {
    $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4", DB_USER, DB_PASS);
    
    // Generate a fresh secure hash
    $hash = password_hash($newPassword, PASSWORD_BCRYPT);
    
    // Update the admin password
    $stmt = $pdo->prepare("UPDATE admins SET password_hash = ? WHERE username = 'admin'");
    $stmt->execute([$hash]);
    
    echo "<div style='font-family:sans-serif; padding:40px; max-width:500px; margin:50px auto; background:#E7F0E9; border-radius:16px; text-align:center;'>
            <h2 style='color:#10271D;'>✅ Password Updated!</h2>
            <p style='font-size:18px; color:#333;'>Your admin credentials are now:</p>
            <div style='background:white; padding:20px; border-radius:12px; margin-top:20px;'>
                <p style='margin:8px 0;'><strong>Username:</strong> admin</p>
                <p style='margin:8px 0;'><strong>Password:</strong> Admin@123</p>
            </div>
            <a href='login.php' style='display:inline-block; margin-top:25px; background:#10271D; color:white; padding:14px 30px; border-radius:100px; text-decoration:none; font-weight:700;'>Go to Login Page</a>
            <p style='margin-top:20px; font-size:13px; color:#666;'>⚠️ Delete this file after logging in!</p>
          </div>";

} catch (PDOException $e) {
    echo "<div style='font-family:sans-serif; padding:30px; background:#FDF2F2; border-radius:10px; color:#E31E24; margin:50px auto; max-width:500px;'>
            <h3>Database Error</h3>
            <p>" . $e->getMessage() . "</p>
          </div>";
}
?>
