<?php
// populate.php
require_once 'config.php';

// Categories to add
$categories = [
    [
        'name' => 'LED Bulbs',
        'description' => 'Energy-efficient LED bulbs for standard fixtures.',
        'icon' => 'fa-lightbulb',
    ],
    [
        'name' => 'LED Tube Lights',
        'description' => 'Bright and uniform tube lights for home and office.',
        'icon' => 'fa-window-minimize',
    ],
    [
        'name' => 'Panel Lights',
        'description' => 'Sleek, recessed panel lights for modern interiors.',
        'icon' => 'fa-square',
    ],
    [
        'name' => 'Down Lights',
        'description' => 'Focused downlights for highlighting space and details.',
        'icon' => 'fa-circle-down',
    ],
    [
        'name' => 'Ceiling Lights',
        'description' => 'Stylish and ambient surface ceiling lights.',
        'icon' => 'fa-circle',
    ]
];

$added = 0;
$skipped = 0;

try {
    // Ensure table exists
    $pdo->exec("CREATE TABLE IF NOT EXISTS categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE,
        slug VARCHAR(100) NOT NULL UNIQUE,
        description TEXT,
        icon VARCHAR(50) DEFAULT 'fa-tag',
        status VARCHAR(20) DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB");

    $pdo->exec("CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category_id INT,
        description TEXT,
        wattage VARCHAR(50),
        voltage VARCHAR(50),
        price DECIMAL(10,2),
        stock_status VARCHAR(20) DEFAULT 'in_stock',
        image_url VARCHAR(500),
        status VARCHAR(20) DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
    ) ENGINE=InnoDB");

    foreach ($categories as $cat) {
        $slug = strtolower(preg_replace('/[^A-Za-z0-9-]+/', '-', $cat['name']));
        
        // Check if exists
        $stmt = $pdo->prepare("SELECT COUNT(*) FROM categories WHERE name = ?");
        $stmt->execute([$cat['name']]);
        if ($stmt->fetchColumn() == 0) {
            $insert = $pdo->prepare("INSERT INTO categories (name, slug, description, icon, status) VALUES (?, ?, ?, ?, 'active')");
            $insert->execute([$cat['name'], $slug, $cat['description'], $cat['icon']]);
            $added++;
        } else {
            $skipped++;
        }
    }
    
    echo json_encode([
        'status' => 'success',
        'message' => "Populated categories. Added: $added, Skipped (already exist): $skipped"
    ]);

} catch (PDOException $e) {
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}
