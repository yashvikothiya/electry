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
    slug VARCHAR(255),
    category_id INT,
    short_description TEXT,
    description TEXT,
    features TEXT,
    specifications TEXT,
    applications TEXT,
    price DECIMAL(10,2),
    stock_status VARCHAR(20) DEFAULT 'in_stock',
    image_url VARCHAR(500),
    gallery_urls TEXT,
    pdf_brochure_url VARCHAR(500),
    seo_title VARCHAR(255),
    seo_description TEXT,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
) ENGINE=InnoDB");

$pdo->exec("ALTER TABLE products ADD COLUMN IF NOT EXISTS slug VARCHAR(255)");
$pdo->exec("ALTER TABLE products ADD COLUMN IF NOT EXISTS short_description TEXT");
$pdo->exec("ALTER TABLE products ADD COLUMN IF NOT EXISTS features TEXT");
$pdo->exec("ALTER TABLE products ADD COLUMN IF NOT EXISTS specifications TEXT");
$pdo->exec("ALTER TABLE products ADD COLUMN IF NOT EXISTS applications TEXT");
$pdo->exec("ALTER TABLE products ADD COLUMN IF NOT EXISTS gallery_urls TEXT");
$pdo->exec("ALTER TABLE products ADD COLUMN IF NOT EXISTS pdf_brochure_url VARCHAR(500)");
$pdo->exec("ALTER TABLE products ADD COLUMN IF NOT EXISTS seo_title VARCHAR(255)");
$pdo->exec("ALTER TABLE products ADD COLUMN IF NOT EXISTS seo_description TEXT");

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

// VIEW LOADER
$viewItem = null;
if ($action === 'view' && isset($_GET['id'])) {
    $stmt = $pdo->prepare("SELECT p.*, c.name as cat_name FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE p.id = ?");
    $stmt->execute([(int)$_GET['id']]);
    $viewItem = $stmt->fetch();
    if (!$viewItem) { $error = 'Product not found.'; $action = 'list'; }
}

// POST HANDLER
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name']);
    $slug = trim($_POST['slug']);
    $category_id = !empty($_POST['category_id']) ? (int)$_POST['category_id'] : null;
    $short_description = trim($_POST['short_description']);
    $description = trim($_POST['description']);
    $features = trim($_POST['features']);
    $specifications = trim($_POST['specifications']);
    $applications = trim($_POST['applications']);
    $seo_title = trim($_POST['seo_title']);
    $seo_description = trim($_POST['seo_description']);
    $price = !empty($_POST['price']) ? (float)$_POST['price'] : null;
    $stock_status = $_POST['stock_status'];
    $status = $_POST['status'];
    $post_id = isset($_POST['id']) ? (int)$_POST['id'] : 0;

    $image_url = $_POST['existing_image'] ?? '';
    $gallery_urls = $_POST['existing_gallery'] ?? '[]';
    $pdf_brochure_url = $_POST['existing_pdf'] ?? '';

    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $fileName = time() . '_' . basename($_FILES['image']['name']);
        if (move_uploaded_file($_FILES['image']['tmp_name'], $uploadDir . $fileName)) {
            $image_url = 'http://localhost/yashvi/electry/backend/uploads/' . $fileName;
        }
    }

    $galleryList = json_decode($gallery_urls, true);
    if (!is_array($galleryList)) { $galleryList = []; }
    if (isset($_FILES['gallery_images'])) {
        foreach ($_FILES['gallery_images']['tmp_name'] as $index => $tmpName) {
            if ($_FILES['gallery_images']['error'][$index] === UPLOAD_ERR_OK && is_uploaded_file($tmpName)) {
                $galleryName = time() . '_' . basename($_FILES['gallery_images']['name'][$index]);
                if (move_uploaded_file($tmpName, $uploadDir . $galleryName)) {
                    $galleryList[] = 'http://localhost/yashvi/electry/backend/uploads/' . $galleryName;
                }
            }
        }
    }
    $gallery_urls = json_encode(array_values(array_unique($galleryList)));

    if (isset($_FILES['pdf_brochure']) && $_FILES['pdf_brochure']['error'] === UPLOAD_ERR_OK) {
        $fileName = time() . '_' . basename($_FILES['pdf_brochure']['name']);
        if (move_uploaded_file($_FILES['pdf_brochure']['tmp_name'], $uploadDir . $fileName)) {
            $pdf_brochure_url = 'http://localhost/yashvi/electry/backend/uploads/' . $fileName;
        }
    }

    if (empty($name)) {
        $error = 'Product name is required.';
    } else {
        try {
            if ($post_id > 0) {
                $pdo->prepare("UPDATE products SET name=?, slug=?, category_id=?, short_description=?, description=?, features=?, specifications=?, applications=?, seo_title=?, seo_description=?, price=?, stock_status=?, image_url=?, gallery_urls=?, pdf_brochure_url=?, status=? WHERE id=?")
                    ->execute([$name, $slug, $category_id, $short_description, $description, $features, $specifications, $applications, $seo_title, $seo_description, $price, $stock_status, $image_url, $gallery_urls, $pdf_brochure_url, $status, $post_id]);
                $success = 'Product updated!';
            } else {
                $pdo->prepare("INSERT INTO products (name, slug, category_id, short_description, description, features, specifications, applications, seo_title, seo_description, price, stock_status, image_url, gallery_urls, pdf_brochure_url, status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)")
                    ->execute([$name, $slug, $category_id, $short_description, $description, $features, $specifications, $applications, $seo_title, $seo_description, $price, $stock_status, $image_url, $gallery_urls, $pdf_brochure_url, $status]);
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
                    <label>Slug</label>
                    <input type="text" name="slug" class="form-control" placeholder="e.g. led-bulb-9w" value="<?= $editItem ? htmlspecialchars($editItem['slug']) : '' ?>">
                </div>
            </div>

            <div class="form-grid">
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
                <div class="form-group">
                    <label>Short Description</label>
                    <textarea name="short_description" class="form-control" placeholder="Short summary of this product..."><?= $editItem ? htmlspecialchars($editItem['short_description']) : '' ?></textarea>
                </div>
            </div>

            <div class="form-group">
                <label>Full Description</label>
                <textarea name="description" class="form-control" placeholder="Complete product details, specifications, benefits..."><?= $editItem ? htmlspecialchars($editItem['description']) : '' ?></textarea>
            </div>

            <div class="form-grid">
                <div class="form-group">
                    <label>Features</label>
                    <textarea name="features" class="form-control" placeholder="List product features separated by commas or line breaks..."><?= $editItem ? htmlspecialchars($editItem['features']) : '' ?></textarea>
                </div>
                <div class="form-group">
                    <label>Specifications</label>
                    <textarea name="specifications" class="form-control" placeholder="Technical specifications and details..."><?= $editItem ? htmlspecialchars($editItem['specifications']) : '' ?></textarea>
                </div>
            </div>

            <div class="form-group">
                <label>Applications</label>
                <textarea name="applications" class="form-control" placeholder="Where this product can be used..."><?= $editItem ? htmlspecialchars($editItem['applications']) : '' ?></textarea>
            </div>

            <div class="form-grid-3">
                <div class="form-group">
                    <label>Price (₹)</label>
                    <input type="number" name="price" step="0.01" class="form-control" placeholder="0.00" value="<?= $editItem ? htmlspecialchars($editItem['price']) : '' ?>">
                </div>
                <div class="form-group">
                    <label>Stock Status</label>
                    <select name="stock_status" class="form-control">
                        <option value="in_stock" <?= ($editItem && $editItem['stock_status']==='in_stock') ? 'selected' : '' ?>>In Stock</option>
                        <option value="out_of_stock" <?= ($editItem && $editItem['stock_status']==='out_of_stock') ? 'selected' : '' ?>>Out of Stock</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Status</label>
                    <select name="status" class="form-control">
                        <option value="active" <?= ($editItem && $editItem['status']==='active') ? 'selected' : '' ?>>Published</option>
                        <option value="draft" <?= ($editItem && $editItem['status']==='draft') ? 'selected' : '' ?>>Draft</option>
                    </select>
                </div>
            </div>

            <div class="form-grid">
                <div class="form-group">
                    <label>Main Image</label>
                    <input type="file" name="image" class="form-control" accept="image/*" <?= !$editItem ? 'required' : '' ?> />
                    <?php if ($editItem && $editItem['image_url']): ?>
                        <p style="font-size:12px;color:var(--text-muted);margin-top:6px;">Current: <a href="<?= htmlspecialchars($editItem['image_url']) ?>" target="_blank" style="color:var(--brand-red);">View Image</a></p>
                    <?php endif; ?>
                </div>
                <div class="form-group">
                    <label>Gallery Images</label>
                    <input type="file" name="gallery_images[]" class="form-control" accept="image/*" multiple>
                    <?php if ($editItem && !empty($editItem['gallery_urls'])):
                        $galleryList = json_decode($editItem['gallery_urls'], true) ?: [];
                    ?>
                        <div style="margin-top:10px;display:flex;flex-wrap:wrap;gap:10px;">
                            <?php foreach ($galleryList as $galleryUrl): ?>
                                <a href="<?= htmlspecialchars($galleryUrl) ?>" target="_blank" style="font-size:12px;color:var(--brand-green);">View</a>
                            <?php endforeach; ?>
                        </div>
                        <input type="hidden" name="existing_gallery" value='<?= htmlspecialchars(json_encode($galleryList), ENT_QUOTES) ?>'>
                    <?php endif; ?>
                </div>
            </div>

            <div class="form-group">
                <label>PDF Brochure</label>
                <input type="file" name="pdf_brochure" class="form-control" accept="application/pdf">
                <?php if ($editItem && !empty($editItem['pdf_brochure_url'])): ?>
                    <p style="font-size:12px;color:var(--text-muted);margin-top:6px;">Current brochure: <a href="<?= htmlspecialchars($editItem['pdf_brochure_url']) ?>" target="_blank" style="color:var(--brand-red);">Download PDF</a></p>
                    <input type="hidden" name="existing_pdf" value="<?= htmlspecialchars($editItem['pdf_brochure_url']) ?>">
                <?php endif; ?>
            </div>

            <div class="form-group">
                <label>SEO Title</label>
                <input type="text" name="seo_title" class="form-control" placeholder="SEO page title" value="<?= $editItem ? htmlspecialchars($editItem['seo_title']) : '' ?>">
            </div>
            <div class="form-group">
                <label>SEO Description</label>
                <textarea name="seo_description" class="form-control" placeholder="SEO meta description..."><?= $editItem ? htmlspecialchars($editItem['seo_description']) : '' ?></textarea>
            </div>

            <div class="form-actions">
                <button type="submit" class="btn-primary"><i class="fa-solid fa-save"></i> <?= $action === 'edit' ? 'Update' : 'Add' ?> Product</button>
                <a href="manage-products.php" class="btn-secondary"><i class="fa-solid fa-xmark"></i> Cancel</a>
            </div>
        </form>
    </div>

    <?php elseif ($action === 'view' && $viewItem): ?>
    <div class="panel-card">
        <div class="panel-header" style="display:flex;justify-content:space-between;align-items:center;">
            <div>
                <h3>View Product</h3>
                <p style="color:var(--text-muted);margin:4px 0 0;">Details for <?= htmlspecialchars($viewItem['name']) ?></p>
            </div>
            <div class="action-btns">
                <a href="?action=edit&id=<?= $viewItem['id'] ?>" class="btn-icon edit" title="Edit"><i class="fa-solid fa-pen"></i></a>
                <a href="manage-products.php" class="btn-icon" style="background:#F8FAFC;color:#475569;" title="Back"><i class="fa-solid fa-arrow-left"></i></a>
            </div>
        </div>
        <div class="view-grid" style="display:grid;grid-template-columns:280px 1fr;gap:25px;">
            <div class="panel-card" style="padding:20px;">
                <?php if ($viewItem['image_url']): ?>
                    <img src="<?= htmlspecialchars($viewItem['image_url']) ?>" style="width:100%;border-radius:16px;object-fit:cover;max-height:380px;" onerror="this.style.display='none'">
                <?php else: ?>
                    <div class="thumb-placeholder" style="width:100%;height:320px;display:flex;align-items:center;justify-content:center;font-size:28px;color:var(--text-muted);">No Image</div>
                <?php endif; ?>
            </div>
            <div>
                <div style="display:flex;gap:16px;flex-wrap:wrap;margin-bottom:18px;">
                    <span class="badge badge-blue"><?= htmlspecialchars($viewItem['cat_name'] ?? 'Uncategorized') ?></span>
                    <span class="badge <?= $viewItem['status']==='active' ? 'badge-green' : 'badge-gray' ?>"><?= ucfirst($viewItem['status']) ?></span>
                    <span class="badge <?= $viewItem['stock_status']==='in_stock' ? 'badge-green' : 'badge-red' ?>"><?= $viewItem['stock_status'] === 'in_stock' ? 'In Stock' : 'Out of Stock' ?></span>
                </div>
                <h3 style="margin-top:0;"> <?= htmlspecialchars($viewItem['name']) ?></h3>
                <p style="margin:0 0 18px;color:var(--text-muted);"> <?= nl2br(htmlspecialchars($viewItem['description'] ?: 'No description added yet.')) ?></p>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:18px;">
                    <div style="background:#F8FAFC;border-radius:14px;padding:18px;">
                        <strong>Wattage</strong>
                        <div style="margin-top:8px;color:var(--text-muted);"> <?= htmlspecialchars($viewItem['wattage'] ?: 'N/A') ?></div>
                    </div>
                    <div style="background:#F8FAFC;border-radius:14px;padding:18px;">
                        <strong>Voltage</strong>
                        <div style="margin-top:8px;color:var(--text-muted);"> <?= htmlspecialchars($viewItem['voltage'] ?: 'N/A') ?></div>
                    </div>
                    <div style="background:#F8FAFC;border-radius:14px;padding:18px;">
                        <strong>Price</strong>
                        <div style="margin-top:8px;color:var(--text-muted);"> <?= $viewItem['price'] ? '₹' . number_format($viewItem['price'], 2) : 'N/A' ?></div>
                    </div>
                    <div style="background:#F8FAFC;border-radius:14px;padding:18px;">
                        <strong>Added On</strong>
                        <div style="margin-top:8px;color:var(--text-muted);"> <?= htmlspecialchars(date('d M Y', strtotime($viewItem['created_at']))) ?></div>
                    </div>
                </div>
            </div>
        </div>
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
                    <th style="width:100px;">Image</th>
                    <th>Product Name</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th style="text-align:right; width:140px;">Action</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($items as $item): ?>
                <tr>
                    <td>
                        <?php if ($item['image_url']): ?>
                            <img src="<?= htmlspecialchars($item['image_url']) ?>" class="thumb-img" onerror="this.style.display='none'">
                        <?php else: ?>
                            <div class="thumb-placeholder"><i class="fa-solid fa-image"></i></div>
                        <?php endif; ?>
                    </td>
                    <td>
                        <div>
                            <div class="item-name"><?= htmlspecialchars($item['name']) ?></div>
                            <div class="item-sub"><?= htmlspecialchars($item['voltage'] ?: ($item['wattage'] ?: 'No details')) ?></div>
                        </div>
                    </td>
                    <td><span class="badge badge-blue"><?= htmlspecialchars($item['cat_name'] ?? 'Uncategorized') ?></span></td>
                    <td>
                        <span class="badge <?= $item['status']==='active' ? 'badge-green' : 'badge-gray' ?>">
                            <?= ucfirst($item['status']) ?>
                        </span>
                    </td>
                    <td>
                        <div class="action-btns" style="justify-content:flex-end;">
                            <a href="?action=view&id=<?= $item['id'] ?>" class="btn-icon view" title="View"><i class="fa-solid fa-eye"></i></a>
                            <a href="?action=edit&id=<?= $item['id'] ?>" class="btn-icon edit" title="Edit"><i class="fa-solid fa-pen"></i></a>
                            <a href="?action=delete&id=<?= $item['id'] ?>" class="btn-icon delete" title="Delete" onclick="return confirm('Delete this product?')"><i class="fa-solid fa-trash-can"></i></a>
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
