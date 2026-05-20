<?php
// manage-categories.php
require_once 'config.php';
require_admin();

$success = $error = '';
$action = isset($_GET['action']) ? $_GET['action'] : 'list';
$editItem = null;

// Create table if not exists
$pdo->exec("CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    icon VARCHAR(50) DEFAULT 'fa-tag',
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB");

// DELETE
if ($action === 'delete' && isset($_GET['id'])) {
    try {
        $pdo->prepare("DELETE FROM categories WHERE id = ?")->execute([(int)$_GET['id']]);
        $success = 'Category deleted successfully.';
        $action = 'list';
    } catch (PDOException $e) { $error = $e->getMessage(); }
}

// EDIT LOADER
if ($action === 'edit' && isset($_GET['id'])) {
    $stmt = $pdo->prepare("SELECT * FROM categories WHERE id = ?");
    $stmt->execute([(int)$_GET['id']]);
    $editItem = $stmt->fetch();
    if (!$editItem) { $error = 'Category not found.'; $action = 'list'; }
}

// POST HANDLER
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name']);
    $description = trim($_POST['description']);
    $icon = trim($_POST['icon']) ?: 'fa-tag';
    $status = $_POST['status'];
    $post_id = isset($_POST['id']) ? (int)$_POST['id'] : 0;
    $slug = strtolower(preg_replace('/[^A-Za-z0-9-]+/', '-', $name));

    if (empty($name)) {
        $error = 'Category name is required.';
    } else {
        try {
            if ($post_id > 0) {
                $pdo->prepare("UPDATE categories SET name=?, slug=?, description=?, icon=?, status=? WHERE id=?")
                    ->execute([$name, $slug, $description, $icon, $status, $post_id]);
                $success = 'Category updated successfully.';
            } else {
                $pdo->prepare("INSERT INTO categories (name, slug, description, icon, status) VALUES (?,?,?,?,?)")
                    ->execute([$name, $slug, $description, $icon, $status]);
                $success = 'Category created successfully.';
            }
            $action = 'list';
        } catch (PDOException $e) { $error = 'Error: ' . $e->getMessage(); }
    }
}

// Fetch all
$items = $pdo->query("SELECT * FROM categories ORDER BY id DESC")->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SaveX Admin — Categories</title>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="shared-style.css">
</head>
<body>

<?php include 'sidebar.php'; ?>

<div class="main-content">
    <div class="page-header">
        <h2><i class="fa-solid fa-tags" style="color:var(--brand-red); margin-right:10px;"></i>Categories</h2>
        <?php if ($action === 'list'): ?>
            <a href="?action=add" class="btn-primary"><i class="fa-solid fa-plus"></i> Add Category</a>
        <?php endif; ?>
    </div>

    <?php if ($success): ?><div class="alert alert-success"><i class="fa-solid fa-circle-check"></i> <?= htmlspecialchars($success) ?></div><?php endif; ?>
    <?php if ($error): ?><div class="alert alert-error"><i class="fa-solid fa-circle-exclamation"></i> <?= htmlspecialchars($error) ?></div><?php endif; ?>

    <?php if ($action === 'add' || $action === 'edit'): ?>
    <div class="panel-card">
        <div class="panel-header">
            <h3><?= $action === 'edit' ? 'Edit Category' : 'Add New Category' ?></h3>
        </div>
        <form method="POST">
            <?php if ($editItem): ?><input type="hidden" name="id" value="<?= $editItem['id'] ?>"><?php endif; ?>
            <div class="form-grid">
                <div class="form-group">
                    <label>Category Name *</label>
                    <input type="text" name="name" class="form-control" placeholder="e.g. Indoor Lighting" value="<?= $editItem ? htmlspecialchars($editItem['name']) : '' ?>" required>
                </div>
                <div class="form-group">
                    <label>FontAwesome Icon Class</label>
                    <input type="text" name="icon" class="form-control" placeholder="e.g. fa-lightbulb" value="<?= $editItem ? htmlspecialchars($editItem['icon']) : 'fa-tag' ?>">
                </div>
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea name="description" class="form-control" placeholder="Brief description of this category..."><?= $editItem ? htmlspecialchars($editItem['description']) : '' ?></textarea>
            </div>
            <div class="form-group" style="max-width:250px;">
                <label>Status</label>
                <select name="status" class="form-control">
                    <option value="active" <?= ($editItem && $editItem['status']==='active') ? 'selected' : '' ?>>Active</option>
                    <option value="inactive" <?= ($editItem && $editItem['status']==='inactive') ? 'selected' : '' ?>>Inactive</option>
                </select>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn-primary"><i class="fa-solid fa-save"></i> <?= $action === 'edit' ? 'Update' : 'Create' ?> Category</button>
                <a href="manage-categories.php" class="btn-secondary"><i class="fa-solid fa-xmark"></i> Cancel</a>
            </div>
        </form>
    </div>

    <?php else: ?>
    <div class="panel-card">
        <div class="panel-header">
            <h3>All Categories <span style="font-size:14px;font-weight:400;color:var(--text-muted);">(<?= count($items) ?> total)</span></h3>
        </div>
        <?php if (count($items) > 0): ?>
        <table class="data-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Slug / URL</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th style="text-align:right;">Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($items as $i => $item): ?>
                <tr>
                    <td style="color:var(--text-muted);font-weight:600;"><?= $i+1 ?></td>
                    <td>
                        <div class="item-with-img">
                            <div style="width:38px;height:38px;background:var(--mint-bg);border-radius:10px;display:flex;align-items:center;justify-content:center;color:var(--brand-green);">
                                <i class="fa-solid <?= htmlspecialchars($item['icon']) ?>"></i>
                            </div>
                            <div>
                                <div class="item-name"><?= htmlspecialchars($item['name']) ?></div>
                            </div>
                        </div>
                    </td>
                    <td><code style="background:#F1F5F9;padding:4px 8px;border-radius:6px;font-size:12px;"><?= htmlspecialchars($item['slug']) ?></code></td>
                    <td style="color:var(--text-muted);font-size:14px;max-width:250px;"><?= htmlspecialchars(substr($item['description'] ?? '', 0, 70)) ?>...</td>
                    <td>
                        <span class="badge <?= $item['status'] === 'active' ? 'badge-green' : 'badge-gray' ?>">
                            <?= ucfirst($item['status']) ?>
                        </span>
                    </td>
                    <td>
                        <div class="action-btns" style="justify-content:flex-end;">
                            <a href="?action=edit&id=<?= $item['id'] ?>" class="btn-icon edit" title="Edit"><i class="fa-solid fa-pen"></i></a>
                            <a href="?action=delete&id=<?= $item['id'] ?>" class="btn-icon delete" title="Delete" onclick="return confirm('Delete this category?')"><i class="fa-solid fa-trash-can"></i></a>
                        </div>
                    </td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
        <?php else: ?>
        <div class="empty-state">
            <i class="fa-solid fa-tags"></i>
            <p>No categories yet. <a href="?action=add" style="color:var(--brand-red);font-weight:700;">Add your first category →</a></p>
        </div>
        <?php endif; ?>
    </div>
    <?php endif; ?>
</div>
</body>
</html>
