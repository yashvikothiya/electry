<?php
// manage-users.php
require_once 'config.php';
require_admin();

$success = $error = '';
$action = isset($_GET['action']) ? $_GET['action'] : 'list';
$editItem = null;

// Ensure standard users table exists
try {
    $pdo->exec("CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        email VARCHAR(100) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB");
} catch (PDOException $e) {
    $error = "Database error: " . $e->getMessage();
}

// DELETE user
if ($action === 'delete' && isset($_GET['id'])) {
    $delId = (int)$_GET['id'];
    try {
        $pdo->prepare("DELETE FROM users WHERE id = ?")->execute([$delId]);
        $success = 'User deleted successfully.';
    } catch (PDOException $e) { 
        $error = $e->getMessage(); 
    }
    $action = 'list';
}

// EDIT LOADER
if ($action === 'edit' && isset($_GET['id'])) {
    $stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");
    $stmt->execute([(int)$_GET['id']]);
    $editItem = $stmt->fetch();
    if (!$editItem) { 
        $error = 'User not found.'; 
        $action = 'list'; 
    }
}

// POST HANDLER (Add/Edit)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username']);
    $email = trim($_POST['email']);
    $password = $_POST['password'];
    $post_id = isset($_POST['id']) ? (int)$_POST['id'] : 0;

    if (empty($username) || empty($email)) {
        $error = 'Username and Email are required.';
    } elseif ($post_id === 0 && empty($password)) {
        $error = 'Password is required for new users.';
    } else {
        try {
            if ($post_id > 0) {
                if (!empty($password)) {
                    $hash = password_hash($password, PASSWORD_BCRYPT);
                    $pdo->prepare("UPDATE users SET username=?, email=?, password_hash=? WHERE id=?")
                        ->execute([$username, $email, $hash, $post_id]);
                } else {
                    $pdo->prepare("UPDATE users SET username=?, email=? WHERE id=?")
                        ->execute([$username, $email, $post_id]);
                }
                $success = 'User details updated successfully!';
            } else {
                $hash = password_hash($password, PASSWORD_BCRYPT);
                $pdo->prepare("INSERT INTO users (username, email, password_hash) VALUES (?,?,?)")
                    ->execute([$username, $email, $hash]);
                $success = 'New user created successfully!';
            }
            $action = 'list';
        } catch (PDOException $e) { 
            $error = 'Error: ' . $e->getMessage(); 
        }
    }
}

// Fetch all standard users
$items = [];
try {
    $items = $pdo->query("SELECT * FROM users ORDER BY id DESC")->fetchAll();
} catch (PDOException $e) {
    $error = "Failed to fetch users: " . $e->getMessage();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SaveX Admin — Users</title>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="shared-style.css">
</head>
<body>

<?php include 'sidebar.php'; ?>

<div class="main-content">
    <div class="page-header">
        <h2><i class="fa-solid fa-user" style="color:var(--brand-red); margin-right:10px;"></i>Website Users</h2>
        <?php if ($action === 'list'): ?>
            <a href="?action=add" class="btn-primary"><i class="fa-solid fa-user-plus"></i> Add User</a>
        <?php endif; ?>
    </div>

    <?php if ($success): ?><div class="alert alert-success"><i class="fa-solid fa-circle-check"></i> <?= htmlspecialchars($success) ?></div><?php endif; ?>
    <?php if ($error): ?><div class="alert alert-error"><i class="fa-solid fa-circle-exclamation"></i> <?= htmlspecialchars($error) ?></div><?php endif; ?>

    <?php if ($action === 'add' || $action === 'edit'): ?>
    <div class="panel-card">
        <div class="panel-header">
            <h3><?= $action === 'edit' ? 'Edit User Details' : 'Add New User' ?></h3>
        </div>
        <form method="POST" style="max-width:600px;">
            <?php if ($editItem): ?><input type="hidden" name="id" value="<?= $editItem['id'] ?>"><?php endif; ?>
            
            <div class="form-group">
                <label>Username *</label>
                <input type="text" name="username" class="form-control" placeholder="Enter username" value="<?= $editItem ? htmlspecialchars($editItem['username']) : '' ?>" required>
            </div>
            <div class="form-group">
                <label>Email Address *</label>
                <input type="email" name="email" class="form-control" placeholder="Enter email address" value="<?= $editItem ? htmlspecialchars($editItem['email']) : '' ?>" required>
            </div>
            <div class="form-group">
                <label><?= $editItem ? 'New Password (leave blank to keep current)' : 'Password *' ?></label>
                <input type="password" name="password" class="form-control" placeholder="<?= $editItem ? 'Leave blank to keep unchanged' : 'Enter password' ?>" <?= !$editItem ? 'required' : '' ?>>
            </div>

            <div class="form-actions">
                <button type="submit" class="btn-primary"><i class="fa-solid fa-save"></i> <?= $action === 'edit' ? 'Update' : 'Create' ?> User</button>
                <a href="manage-users.php" class="btn-secondary"><i class="fa-solid fa-xmark"></i> Cancel</a>
            </div>
        </form>
    </div>

    <?php else: ?>
    <div class="panel-card">
        <div class="panel-header">
            <h3>All Registered Users <span style="font-size:14px;font-weight:400;color:var(--text-muted);">(<?= count($items) ?> total)</span></h3>
        </div>
        
        <?php if (count($items) > 0): ?>
        <table class="data-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>User</th>
                    <th>Email Address</th>
                    <th>Registered Date</th>
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
                            <div style="width:40px;height:40px;background:var(--mint-bg);border-radius:50%;display:flex;align-items:center;justify-content:center;color:var(--brand-green);font-weight:800;font-size:16px;">
                                <?= strtoupper(substr($item['username'], 0, 1)) ?>
                            </div>
                            <div>
                                <div class="item-name"><?= htmlspecialchars($item['username']) ?></div>
                                <div class="item-sub">Standard User</div>
                            </div>
                        </div>
                    </td>
                    <td style="color:var(--text-muted);"><?= htmlspecialchars($item['email']) ?></td>
                    <td style="color:var(--text-muted);font-size:14px;"><?= date('M d, Y', strtotime($item['created_at'])) ?></td>
                    <td><span class="badge badge-green"><i class="fa-solid fa-user-check" style="font-size:9px;margin-right:4px;"></i> Active</span></td>
                    <td>
                        <div class="action-btns" style="justify-content:flex-end;">
                            <a href="?action=edit&id=<?= $item['id'] ?>" class="btn-icon edit" title="Edit"><i class="fa-solid fa-pen"></i></a>
                            <a href="?action=delete&id=<?= $item['id'] ?>" class="btn-icon delete" title="Delete" onclick="return confirm('Delete this user account?')"><i class="fa-solid fa-trash-can"></i></a>
                        </div>
                    </td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
        <?php else: ?>
        <div style="text-align:center; padding: 40px; color: var(--text-muted);">
            <i class="fa-solid fa-user-slash" style="font-size:40px; margin-bottom:15px; display:block;"></i>
            <p>No registered users found. <a href="?action=add" style="color:var(--brand-red); font-weight:600;">Add a user manually</a>.</p>
        </div>
        <?php endif; ?>
    </div>
    <?php endif; ?>
</div>
</body>
</html>

