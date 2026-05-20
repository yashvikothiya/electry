<?php
require_once 'config.php';
$stmt = $pdo->query("SELECT id, username, email FROM admins");
$admins = $stmt->fetchAll();
echo "<pre>";
print_r($admins);
echo "</pre>";
?>
