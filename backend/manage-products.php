<?php
// manage-products.php
require_once 'config.php';
require_admin();

$success = $error = '';
$action = isset($_GET['action']) ? $_GET['action'] : 'list';
$editItem = null;

// Create tables if not exist
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

// Upload directory
$uploadDir = __DIR__ . '/uploads/';
if (!file_exists($uploadDir)) mkdir($uploadDir, 0777, true);

// DELETE
if ($action === 'delete' && isset($_GET['id'])) {
    try {
        $stmt = $pdo->prepare("SELECT image_url FROM products WHERE id = ?");
        $stmt->execute([(int)$_GET['id']]);
        $img = $stmt->fetch();
        if ($img && strpos($img['image_url'], '/uploads/') !== false) {
            $f = $uploadDir . basename($img['image_url']);
            if (file_exists($f)) unlink($f);
        }
        $pdo->prepare("DELETE FROM products WHERE id = ?")->execute([(int)$_GET['id']]);
        $success = 'Product deleted successfully.';
        $action = 'list';
    } catch (PDOException $e) { $error = $e->getMessage(); }
}

// EDIT LOADER
if ($action === 'edit' && isset($_GET['id'])) {
    $stmt = $pdo->prepare("SELECT * FROM products WHERE id = ?");
    $stmt->execute([(int)$_GET['id']]);
    $editItem = $stmt->fetch();
    if (!$editItem) { $error = 'Product not found.'; $action = 'list'; }
}

// POST HANDLER
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name']);
    $category_id = !empty($_POST['category_id']) ? (int)$_POST['category_id'] : null;
    $description = trim($_POST['description']);
    $wattage = trim($_POST['wattage']);
    $voltage = trim($_POST['voltage']);
    $price = !empty($_POST['price']) ? (float)$_POST['price'] : null;
    $stock_status = $_POST['stock_status'];
    $status = $_POST['status'];
    $post_id = isset($_POST['id']) ? (int)$_POST['id'] : 0;

    $image_url = $_POST['existing_image'] ?? '';

    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $fileName = time() . '_' . basename($_FILES['image']['name']);
        if (move_uploaded_file($_FILES['image']['tmp_name'], $uploadDir . $fileName)) {
            $image_url = 'http://localhost/yashvi/electry/backend/uploads/' . $fileName;
        }
    }

    if (empty($name)) {
        $error = 'Product name is required.';
    } else {
        try {
            if ($post_id > 0) {
                $pdo->prepare("UPDATE products SET name=?, category_id=?, description=?, wattage=?, voltage=?, price=?, stock_status=?, image_url=?, status=? WHERE id=?")
                    ->execute([$name, $category_id, $description, $wattage, $voltage, $price, $stock_status, $image_url, $status, $post_id]);
                $success = 'Product updated!';
            } else {
                $pdo->prepare("INSERT INTO products (name, category_id, description, wattage, voltage, price, stock_status, image_url, status) VALUES (?,?,?,?,?,?,?,?,?)")
                    ->execute([$name, $category_id, $description, $wattage, $voltage, $price, $stock_status, $image_url, $status]);
                $success = 'Product added!';
            }
            $action = 'list';
        } catch (PDOException $e) { $error = $e->getMessage(); }
    }
}

// Fetch
$items = $pdo->query("SELECT p.*, c.name as cat_name FROM products p LEFT JOIN categories c ON p.category_id = c.id ORDER BY p.id DESC")->fetchAll();
$categories = $pdo->query("SELECT * FROM categories WHERE status='active' ORDER BY name")->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SaveX Admin — Products</title>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="shared-style.css">
</head>
<body>

<?php include 'sidebar.php'; ?>

<div class="main-content">
    <div class="page-header">
        <h2><i class="fa-solid fa-box-open" style="color:var(--brand-red); margin-right:10px;"></i>Products</h2>
        <?php if ($action === 'list'): ?>
            <a href="?action=add" class="btn-primary"><i class="fa-solid fa-plus"></i> Add Product</a>
        <?php endif; ?>
    </div>

    <?php if ($success): ?><div class="alert alert-success"><i class="fa-solid fa-circle-check"></i> <?= htmlspecialchars($success) ?></div><?php endif; ?>
    <?php if ($error): ?><div class="alert alert-error"><i class="fa-solid fa-circle-exclamation"></i> <?= htmlspecialchars($error) ?></div><?php endif; ?>

    <?php if ($action === 'add' || $action === 'edit'): ?>
    <div class="panel-card">
        <div class="panel-header">
            <h3><?= $action === 'edit' ? 'Edit Product' : 'Add New Product' ?></h3>
        </div>
        <form method="POST" enctype="multipart/form-data">
            <?php if ($editItem): ?>
                <input type="hidden" name="id" value="<?= $editItem['id'] ?>">
                <input type="hidden" name="existing_image" value="<?= htmlspecialchars($editItem['image_url'] ?? '') ?>">
            <?php endif; ?>

            <div class="form-grid">
                <div class="form-group">
                    <label>Product Name *</label>
                    <input type="text" name="name" class="form-control" placeholder="e.g. LED Bulb 9W" value="<?= $editItem ? htmlspecialchars($editItem['name']) : '' ?>" required>
                </div>
                <div class="form-group">
                    <label>Category</label>
                    <select name="category_id" class="form-control">
                        <option value="">-- Select Category --</option>
                        <?php foreach ($categories as $cat): ?>
                            <option value="<?= $cat['id'] ?>" <?= ($editItem && $editItem['category_id'] == $cat['id']) ? 'selected' : '' ?>>
                                <?= htmlspecialchars($cat['name']) ?>
                            </option>
                        <?php endforeach; ?>
                    </select>
                </div>
            </div>

            <div class="form-grid-3">
                <div class="form-group">
                    <label>Wattage</label>
                    <input type="text" name="wattage" class="form-control" placeholder="e.g. 9W, 15W" value="<?= $editItem ? htmlspecialchars($editItem['wattage']) : '' ?>">
                </div>
                <div class="form-group">
                    <label>Voltage</label>
                    <input type="text" name="voltage" class="form-control" placeholder="e.g. 220V" value="<?= $editItem ? htmlspecialchars($editItem['voltage']) : '' ?>">
                </div>
                <div class="form-group">
                    <label>Price (₹)</label>
                    <input type="number" name="price" step="0.01" class="form-control" placeholder="0.00" value="<?= $editItem ? htmlspecialchars($editItem['price']) : '' ?>">
                </div>
            </div>

            <div class="form-group">
                <label>Description</label>
                <textarea name="description" class="form-control" placeholder="Product features and specifications..."><?= $editItem ? htmlspecialchars($editItem['description']) : '' ?></textarea>
            </div>

            <div class="form-grid">
                <div class="form-group">
                    <label>Product Image</label>
                    <input type="file" name="image" class="form-control" accept="image/*" <?= !$editItem ? 'required' : '' ?>>
                    <?php if ($editItem && $editItem['image_url']): ?>
                        <p style="font-size:12px;color:var(--text-muted);margin-top:6px;">Current: <a href="<?= htmlspecialchars($editItem['image_url']) ?>" target="_blank" style="color:var(--brand-red);">View Image</a></p>
                    <?php endif; ?>
                </div>
                <div class="form-grid" style="gap:15px;">
                    <div class="form-group">
                        <label>Stock Status</label>
                        <select name="stock_status" class="form-control">
                            <option value="in_stock" <?= ($editItem && $editItem['stock_status']==='in_stock') ? 'selected' : '' ?>>In Stock</option>
                            <option value="out_of_stock" <?= ($editItem && $editItem['stock_status']==='out_of_stock') ? 'selected' : '' ?>>Out of Stock</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Visibility</label>
                        <select name="status" class="form-control">
                            <option value="active" <?= ($editItem && $editItem['status']==='active') ? 'selected' : '' ?>>Published</option>
                            <option value="draft" <?= ($editItem && $editItem['status']==='draft') ? 'selected' : '' ?>>Draft</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="form-actions">
                <button type="submit" class="btn-primary"><i class="fa-solid fa-save"></i> <?= $action === 'edit' ? 'Update' : 'Add' ?> Product</button>
                <a href="manage-products.php" class="btn-secondary"><i class="fa-solid fa-xmark"></i> Cancel</a>
            </div>
        </form>
    </div>

    <?php else: ?>
    <div class="panel-card">
        <div class="panel-header">
            <h3>All Products <span style="font-size:14px;font-weight:400;color:var(--text-muted);">(<?= count($items) ?> total)</span></h3>
        </div>
        <?php if (count($items) > 0): ?>
        <table class="data-table">
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Wattage</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Status</th>
                    <th style="text-align:right;">Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($items as $item): ?>
                <tr>
                    <td>
                        <div class="item-with-img">
                            <?php if ($item['image_url']): ?>
                                <img src="<?= htmlspecialchars($item['image_url']) ?>" class="thumb-img" onerror="this.style.display='none'">
                            <?php endif; ?>
                            <div>
                                <div class="item-name"><?= htmlspecialchars($item['name']) ?></div>
                                <?php if ($item['voltage']): ?><div class="item-sub"><?= htmlspecialchars($item['voltage']) ?></div><?php endif; ?>
                            </div>
                        </div>
                    </td>
                    <td><span class="badge badge-blue"><?= htmlspecialchars($item['cat_name'] ?? 'Uncategorized') ?></span></td>
                    <td style="font-weight:600;"><?= htmlspecialchars($item['wattage'] ?? '—') ?></td>
                    <td style="font-weight:700;color:var(--brand-green);"><?= $item['price'] ? '₹' . number_format($item['price'], 2) : '—' ?></td>
                    <td>
                        <span class="badge <?= $item['stock_status']==='in_stock' ? 'badge-green' : 'badge-red' ?>">
                            <?= $item['stock_status']==='in_stock' ? 'In Stock' : 'Out of Stock' ?>
                        </span>
                    </td>
                    <td>
                        <span class="badge <?= $item['status']==='active' ? 'badge-green' : 'badge-gray' ?>">
                            <?= ucfirst($item['status']) ?>
                        </span>
                    </td>
                    <td>
                        <div class="action-btns" style="justify-content:flex-end;">
                            <a href="?action=edit&id=<?= $item['id'] ?>" class="btn-icon edit"><i class="fa-solid fa-pen"></i></a>
                            <a href="?action=delete&id=<?= $item['id'] ?>" class="btn-icon delete" onclick="return confirm('Delete this product?')"><i class="fa-solid fa-trash-can"></i></a>
                        </div>
                    </td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
        <?php else: ?>
        <div class="empty-state">
            <i class="fa-solid fa-box-open"></i>
            <p>No products yet. <a href="?action=add" style="color:var(--brand-red);font-weight:700;">Add your first product →</a></p>
        </div>
        <?php endif; ?>
    </div>
    <?php endif; ?>
</div>
</body>
</html>
