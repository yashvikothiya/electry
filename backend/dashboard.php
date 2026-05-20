<?php
// dashboard.php
require_once 'config.php';
require_admin();

// Create all tables
$pdo->exec("CREATE TABLE IF NOT EXISTS categories (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100) NOT NULL UNIQUE, slug VARCHAR(100) NOT NULL UNIQUE, description TEXT, icon VARCHAR(50) DEFAULT 'fa-tag', status VARCHAR(20) DEFAULT 'active', created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP) ENGINE=InnoDB");
$pdo->exec("CREATE TABLE IF NOT EXISTS products (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, category_id INT, description TEXT, wattage VARCHAR(50), voltage VARCHAR(50), price DECIMAL(10,2), stock_status VARCHAR(20) DEFAULT 'in_stock', image_url VARCHAR(500), status VARCHAR(20) DEFAULT 'active', created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP) ENGINE=InnoDB");
$pdo->exec("CREATE TABLE IF NOT EXISTS blog_posts (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255) NOT NULL, category VARCHAR(50) DEFAULT 'GREEN POWER', post_date VARCHAR(50) NOT NULL, image_url VARCHAR(255) NOT NULL, slug VARCHAR(100) NOT NULL UNIQUE, content TEXT NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP) ENGINE=InnoDB");
$pdo->exec("CREATE TABLE IF NOT EXISTS contact_inquiries (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100) NOT NULL, email VARCHAR(100) NOT NULL, phone VARCHAR(20), subject VARCHAR(255), message TEXT NOT NULL, status VARCHAR(20) DEFAULT 'unread', created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP) ENGINE=InnoDB");

// Stats
$totalPosts     = $pdo->query("SELECT COUNT(*) FROM blog_posts")->fetchColumn();
$totalProducts  = $pdo->query("SELECT COUNT(*) FROM products")->fetchColumn();
$totalCats      = $pdo->query("SELECT COUNT(*) FROM categories")->fetchColumn();
$totalInquiries = $pdo->query("SELECT COUNT(*) FROM contact_inquiries")->fetchColumn();
$totalUnread    = $pdo->query("SELECT COUNT(*) FROM contact_inquiries WHERE status='unread'")->fetchColumn();
$totalAdmins    = $pdo->query("SELECT COUNT(*) FROM admins")->fetchColumn();

$recentProducts  = $pdo->query("SELECT * FROM products ORDER BY id DESC LIMIT 5")->fetchAll();
$recentInquiries = $pdo->query("SELECT * FROM contact_inquiries ORDER BY id DESC LIMIT 4")->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SaveX Admin — Dashboard</title>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="shared-style.css">
    <style>
        .quick-links { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin-bottom: 35px; }
        .quick-link-card {
            background: white;
            border-radius: 16px;
            padding: 20px;
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 14px;
            transition: all 0.2s ease;
            border: 1.5px solid transparent;
            box-shadow: 0 5px 15px rgba(0,0,0,0.03);
        }
        .quick-link-card:hover { border-color: var(--brand-green); transform: translateY(-2px); }
        .ql-icon { width: 46px; height: 46px; border-radius: 12px; background: var(--mint-bg); display: flex; align-items: center; justify-content: center; font-size: 18px; color: var(--brand-green); }
        .ql-text .ql-title { font-weight: 800; font-size: 15px; color: var(--brand-green); }
        .ql-text .ql-sub { font-size: 12px; color: var(--text-muted); margin-top: 2px; }
        .two-col { display: grid; grid-template-columns: 1.3fr 1fr; gap: 25px; }
    </style>
</head>
<body>

<?php include 'sidebar.php'; ?>

<div class="main-content">
    <div class="page-header">
        <div>
            <h2>Dashboard</h2>
            <p style="color:var(--text-muted);font-size:15px;margin-top:4px;">Welcome back, <strong style="color:var(--brand-green);"><?= htmlspecialchars($_SESSION['admin_username']) ?></strong> 👋</p>
        </div>
        <div style="font-size:13px;color:var(--text-muted);"><?= date('l, d F Y') ?></div>
    </div>

    <!-- Stats Grid -->
    <div class="stats-grid">
        <div class="stat-card">
            <div class="stat-info"><h3>Products</h3><p><?= $totalProducts ?></p></div>
            <div class="stat-icon"><i class="fa-solid fa-box-open"></i></div>
        </div>
        <div class="stat-card">
            <div class="stat-info"><h3>Categories</h3><p><?= $totalCats ?></p></div>
            <div class="stat-icon"><i class="fa-solid fa-tags"></i></div>
        </div>
        <div class="stat-card">
            <div class="stat-info"><h3>Blog Posts</h3><p><?= $totalPosts ?></p></div>
            <div class="stat-icon"><i class="fa-solid fa-newspaper"></i></div>
        </div>
        <div class="stat-card red">
            <div class="stat-info"><h3>Unread Mail</h3><p><?= $totalUnread ?></p></div>
            <div class="stat-icon"><i class="fa-solid fa-envelope"></i></div>
        </div>
    </div>

    <!-- Quick Links -->
    <div class="quick-links">
        <a href="manage-categories.php?action=add" class="quick-link-card">
            <div class="ql-icon"><i class="fa-solid fa-plus"></i></div>
            <div class="ql-text"><div class="ql-title">Add Category</div><div class="ql-sub">Create new group</div></div>
        </a>
        <a href="manage-products.php?action=add" class="quick-link-card">
            <div class="ql-icon"><i class="fa-solid fa-box-open"></i></div>
            <div class="ql-text"><div class="ql-title">Add Product</div><div class="ql-sub">List new LED item</div></div>
        </a>
        <a href="manage-posts.php?action=add" class="quick-link-card">
            <div class="ql-icon"><i class="fa-solid fa-pen-to-square"></i></div>
            <div class="ql-text"><div class="ql-title">Write Blog Post</div><div class="ql-sub">Publish news article</div></div>
        </a>
        <a href="manage-inquiries.php" class="quick-link-card">
            <div class="ql-icon" style="background:#FDF2F2;color:var(--brand-red);"><i class="fa-solid fa-envelope-open"></i></div>
            <div class="ql-text"><div class="ql-title">View Inbox</div><div class="ql-sub"><?= $totalUnread ?> unread messages</div></div>
        </a>
    </div>

    <!-- Two Column Panels -->
    <div class="two-col">
        <!-- Recent Products -->
        <div class="panel-card">
            <div class="panel-header">
                <h3>Recent Products</h3>
                <a href="manage-products.php" style="font-size:13px;font-weight:700;color:var(--brand-red);text-decoration:none;">View All →</a>
            </div>
            <?php if (count($recentProducts) > 0): ?>
            <table class="data-table">
                <thead>
                    <tr><th>Product</th><th>Stock</th><th>Price</th></tr>
                </thead>
                <tbody>
                    <?php foreach ($recentProducts as $p): ?>
                    <tr>
                        <td>
                            <div class="item-with-img">
                                <?php if ($p['image_url']): ?><img src="<?= htmlspecialchars($p['image_url']) ?>" class="thumb-img" onerror="this.style.display='none'"><?php endif; ?>
                                <span class="item-name" style="font-size:14px;"><?= htmlspecialchars($p['name']) ?></span>
                            </div>
                        </td>
                        <td><span class="badge <?= $p['stock_status']==='in_stock' ? 'badge-green' : 'badge-red' ?>" style="font-size:10px;"><?= $p['stock_status']==='in_stock' ? '✓ Stock' : '✗ Out' ?></span></td>
                        <td style="font-weight:700;font-size:14px;"><?= $p['price'] ? '₹'.number_format($p['price'],0) : '—' ?></td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
            <?php else: ?>
            <div class="empty-state" style="padding:30px;"><i class="fa-solid fa-box-open"></i><p>No products yet.</p></div>
            <?php endif; ?>
        </div>

        <!-- Recent Inquiries -->
        <div class="panel-card">
            <div class="panel-header">
                <h3>Recent Mail</h3>
                <a href="manage-inquiries.php" style="font-size:13px;font-weight:700;color:var(--brand-red);text-decoration:none;">View All →</a>
            </div>
            <?php if (count($recentInquiries) > 0): ?>
            <div style="display:flex;flex-direction:column;gap:18px;">
                <?php foreach ($recentInquiries as $inq): ?>
                <div style="border-bottom:1px solid var(--border-light);padding-bottom:15px;">
                    <div style="display:flex;justify-content:space-between;margin-bottom:5px;">
                        <span style="font-weight:700;font-size:14px;color:var(--brand-green);"><?= htmlspecialchars($inq['name']) ?></span>
                        <?php if ($inq['status']==='unread'): ?><span class="badge badge-red" style="font-size:9px;">New</span><?php endif; ?>
                    </div>
                    <div style="font-size:13px;font-weight:600;color:var(--text-dark);margin-bottom:3px;"><?= htmlspecialchars($inq['subject'] ?: 'No Subject') ?></div>
                    <div style="font-size:12px;color:var(--text-muted);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"><?= htmlspecialchars($inq['message']) ?></div>
                </div>
                <?php endforeach; ?>
            </div>
            <?php else: ?>
            <div class="empty-state" style="padding:30px;"><i class="fa-solid fa-inbox"></i><p>No messages yet.</p></div>
            <?php endif; ?>
        </div>
    </div>
</div>
</body>
</html>
