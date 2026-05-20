<?php
// manage-posts.php
require_once 'config.php';
require_admin();

$success = '';
$error = '';

// Handle CRUD operations
$action = isset($_GET['action']) ? $_GET['action'] : 'list';
$editPost = null;

// Ensure upload directory exists
$uploadDir = __DIR__ . '/uploads/';
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

// 1. DELETE Action
if ($action === 'delete' && isset($_GET['id'])) {
    try {
        $id = (int)$_GET['id'];
        // Fetch image path to delete file from server
        $stmtImg = $pdo->prepare("SELECT image_url FROM blog_posts WHERE id = ?");
        $stmtImg->execute([$id]);
        $img = $stmtImg->fetch();
        if ($img && strpos($img['image_url'], 'backend/uploads/') !== false) {
            $fileName = basename($img['image_url']);
            if (file_exists($uploadDir . $fileName)) {
                unlink($uploadDir . $fileName);
            }
        }

        $stmtDel = $pdo->prepare("DELETE FROM blog_posts WHERE id = ?");
        $stmtDel->execute([$id]);
        $success = 'Article deleted successfully.';
        $action = 'list';
    } catch (PDOException $e) {
        $error = 'Failed to delete article: ' . $e->getMessage();
    }
}

// 2. EDIT Loader
if ($action === 'edit' && isset($_GET['id'])) {
    $stmtEdit = $pdo->prepare("SELECT * FROM blog_posts WHERE id = ?");
    $stmtEdit->execute([(int)$_GET['id']]);
    $editPost = $stmtEdit->fetch();
    if (!$editPost) {
        $error = 'Article not found.';
        $action = 'list';
    }
}

// 3. POST Form Handler (Add or Edit)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = trim($_POST['title']);
    $category = trim($_POST['category']);
    $post_date = trim($_POST['post_date']);
    $content = trim($_POST['content']);
    $post_id = isset($_POST['id']) ? (int)$_POST['id'] : 0;

    // Generate unique slug
    $slug = strtolower(preg_replace('/[^A-Za-z0-9-]+/', '-', $title));
    $slug = trim($slug, '-');

    // Handle File Upload
    $image_url = isset($_POST['existing_image']) ? $_POST['existing_image'] : '';
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $fileTmpPath = $_FILES['image']['tmp_name'];
        $fileName = time() . '_' . basename($_FILES['image']['name']);
        $destPath = $uploadDir . $fileName;

        if (move_uploaded_file($fileTmpPath, $destPath)) {
            // Setup relative URL path
            $image_url = 'http://localhost/yashvi/electry/backend/uploads/' . $fileName;
        } else {
            $error = 'Error moving the uploaded file.';
        }
    }

    if (empty($title) || empty($category) || empty($post_date) || empty($content) || empty($image_url)) {
        $error = 'All fields including image are required.';
    } else {
        try {
            if ($post_id > 0) {
                // Update - set created_at to NOW() so it floats to the top when updated
                $stmtUpdate = $pdo->prepare("UPDATE blog_posts SET title = ?, category = ?, post_date = ?, image_url = ?, slug = ?, content = ?, created_at = NOW() WHERE id = ?");
                $stmtUpdate->execute([$title, $category, $post_date, $image_url, $slug, $content, $post_id]);
                $success = 'Article updated successfully.';
            } else {
                // Create - uses default or NOW() for created_at
                $stmtInsert = $pdo->prepare("INSERT INTO blog_posts (title, category, post_date, image_url, slug, content, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())");
                $stmtInsert->execute([$title, $category, $post_date, $image_url, $slug, $content]);
                $success = 'Article published successfully.';
            }
            $action = 'list';
        } catch (PDOException $e) {
            $error = 'Database operations error: ' . $e->getMessage();
        }
    }
}

// Fetch all posts for list view
try {
    $stmtAll = $pdo->query("SELECT * FROM blog_posts ORDER BY created_at DESC, id ASC");
    $posts = $stmtAll->fetchAll();
} catch (PDOException $e) {
    die("Database query error: " . $e->getMessage());
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SaveX Electronics — Manage News</title>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root {
            --brand-green: #10271D;
            --brand-red: #E31E24;
            --mint-bg: #E7F0E9;
            --white: #FFFFFF;
            --text-dark: #333333;
            --text-muted: #666666;
            --border-light: #E2E8F0;
        }
        body {
            font-family: 'Outfit', sans-serif;
            background-color: var(--mint-bg);
            margin: 0;
            display: flex;
            min-height: 100vh;
            color: var(--text-dark);
        }
        /* Sidebar Styles */
        .sidebar {
            width: 280px;
            background-color: var(--brand-green);
            color: var(--white);
            display: flex;
            flex-direction: column;
            padding: 40px 20px;
            box-sizing: border-box;
            position: fixed;
            height: 100vh;
            left: 0;
            top: 0;
            z-index: 100;
        }
        .sidebar-logo {
            margin-bottom: 50px;
            text-align: center;
        }
        .sidebar-logo h1 {
            font-size: 32px;
            font-weight: 800;
            margin: 0;
            letter-spacing: -0.5px;
        }
        .sidebar-logo .logo-sub {
            font-size: 11px;
            font-weight: 700;
            color: var(--brand-red);
            letter-spacing: 2px;
            text-transform: uppercase;
        }
        .nav-list {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        .nav-item a {
            display: flex;
            align-items: center;
            gap: 15px;
            color: rgba(255, 255, 255, 0.7);
            text-decoration: none;
            padding: 16px 20px;
            border-radius: 14px;
            font-size: 16px;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        .nav-item a:hover, .nav-item.active a {
            color: var(--white);
            background-color: rgba(255, 255, 255, 0.08);
        }
        .nav-item.active a {
            border-left: 4px solid var(--brand-red);
            border-radius: 0 14px 14px 0;
        }
        .sidebar-footer {
            margin-top: auto;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            padding-top: 25px;
        }
        .btn-logout {
            display: flex;
            align-items: center;
            gap: 12px;
            color: #FF8F8F;
            text-decoration: none;
            font-weight: 600;
            font-size: 15px;
            transition: color 0.3s ease;
        }
        .btn-logout:hover {
            color: #FFAAAA;
        }

        /* Main Content Container */
        .main-content {
            margin-left: 280px;
            flex: 1;
            padding: 50px 60px;
            box-sizing: border-box;
        }
        .header-title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 40px;
        }
        .header-title h2 {
            font-size: 32px;
            font-weight: 800;
            color: var(--brand-green);
            margin: 0;
        }

        /* Alert Banners */
        .alert {
            padding: 15px 20px;
            border-radius: 12px;
            font-weight: 600;
            font-size: 15px;
            margin-bottom: 30px;
        }
        .alert-success {
            background-color: #E6F6ED;
            color: #107C41;
            border: 1px solid rgba(16, 124, 65, 0.1);
        }
        .alert-error {
            background-color: #FDF2F2;
            color: var(--brand-red);
            border: 1px solid rgba(227, 30, 36, 0.1);
        }

        .panel-card {
            background-color: var(--white);
            border-radius: 24px;
            padding: 40px;
            box-shadow: 0 10px 30px rgba(16, 39, 29, 0.03);
            border: 1px solid rgba(16, 39, 29, 0.03);
        }
        .panel-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            border-bottom: 1px solid var(--border-light);
            padding-bottom: 20px;
        }
        .panel-header h3 {
            font-size: 22px;
            font-weight: 700;
            color: var(--brand-green);
            margin: 0;
        }
        .btn-add {
            background-color: var(--brand-green);
            color: var(--white);
            padding: 12px 25px;
            border-radius: 100px;
            text-decoration: none;
            font-weight: 700;
            font-size: 14px;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            transition: all 0.3s ease;
        }
        .btn-add:hover {
            background-color: var(--brand-red);
            box-shadow: 0 6px 15px rgba(227, 30, 36, 0.2);
        }

        /* Form styling */
        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 25px;
            margin-bottom: 22px;
        }
        .form-group {
            margin-bottom: 22px;
        }
        .form-group label {
            display: block;
            font-weight: 700;
            color: var(--brand-green);
            margin-bottom: 10px;
            font-size: 14px;
        }
        .form-control {
            width: 100%;
            padding: 15px 20px;
            border: 1px solid var(--border-light);
            border-radius: 12px;
            font-size: 15px;
            box-sizing: border-box;
            outline: none;
            font-family: inherit;
            transition: border-color 0.3s ease;
        }
        .form-control:focus {
            border-color: var(--brand-green);
        }
        textarea.form-control {
            height: 200px;
            resize: vertical;
        }
        .form-actions {
            display: flex;
            gap: 15px;
            margin-top: 30px;
        }
        .btn-save {
            background-color: var(--brand-green);
            color: var(--white);
            border: none;
            padding: 14px 35px;
            border-radius: 100px;
            font-size: 15px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s ease;
            font-family: inherit;
        }
        .btn-save:hover {
            background-color: var(--brand-red);
        }
        .btn-cancel {
            background-color: #F1F5F9;
            color: var(--text-muted);
            border: none;
            padding: 14px 35px;
            border-radius: 100px;
            font-size: 15px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
            text-align: center;
            font-family: inherit;
        }
        .btn-cancel:hover {
            background-color: #E2E8F0;
        }

        /* Listing Tables */
        .data-table {
            width: 100%;
            border-collapse: collapse;
        }
        .data-table th, .data-table td {
            text-align: left;
            padding: 16px 12px;
            border-bottom: 1px solid var(--border-light);
        }
        .data-table th {
            font-weight: 700;
            color: var(--text-muted);
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .data-table td {
            font-size: 15px;
        }
        .post-row {
            display: flex;
            align-items: center;
            gap: 15px;
        }
        .post-img {
            width: 70px;
            height: 52px;
            border-radius: 8px;
            object-fit: cover;
            box-shadow: 0 4px 10px rgba(0,0,0,0.05);
        }
        .post-title {
            font-weight: 700;
            color: var(--brand-green);
        }
        .badge.category {
            background-color: var(--mint-bg);
            color: var(--brand-green);
            display: inline-block;
            padding: 6px 14px;
            border-radius: 100px;
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
        }
        .action-btns {
            display: flex;
            gap: 12px;
        }
        .btn-edit-act, .btn-del-act {
            width: 38px;
            height: 38px;
            border-radius: 50%;
            border: none;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
        }
        .btn-edit-act {
            background-color: #E7F0E9;
            color: var(--brand-green);
        }
        .btn-edit-act:hover {
            background-color: var(--brand-green);
            color: var(--white);
        }
        .btn-del-act {
            background-color: #FDF2F2;
            color: var(--brand-red);
        }
        .btn-del-act:hover {
            background-color: var(--brand-red);
            color: var(--white);
        }
    </style>
    <link rel="stylesheet" href="shared-style.css">
</head>
<body>

    <?php include 'sidebar.php'; ?>

    <!-- Main Content -->
    <div class="main-content">
        <div class="header-title">
            <h2>Blog & News Articles</h2>
        </div>

        <?php if (!empty($success)): ?>
            <div class="alert alert-success"><i class="fa-solid fa-circle-check"></i> <?php echo htmlspecialchars($success); ?></div>
        <?php endif; ?>

        <?php if (!empty($error)): ?>
            <div class="alert alert-error"><i class="fa-solid fa-circle-exclamation"></i> <?php echo htmlspecialchars($error); ?></div>
        <?php endif; ?>

        <!-- Form Editor Panel -->
        <?php if ($action === 'add' || $action === 'edit'): ?>
            <div class="panel-card">
                <div class="panel-header">
                    <h3><?php echo $action === 'edit' ? 'Edit Article' : 'Publish New Article'; ?></h3>
                </div>

                <form action="manage-posts.php" method="POST" enctype="multipart/form-data">
                    <?php if ($editPost): ?>
                        <input type="hidden" name="id" value="<?php echo $editPost['id']; ?>">
                        <input type="hidden" name="existing_image" value="<?php echo htmlspecialchars($editPost['image_url']); ?>">
                    <?php endif; ?>

                    <div class="form-group">
                        <label for="title">Article Title</label>
                        <input type="text" id="title" name="title" class="form-control" placeholder="Enter clean blog title" value="<?php echo $editPost ? htmlspecialchars($editPost['title']) : ''; ?>" required>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label for="category">Category</label>
                            <input type="text" id="category" name="category" class="form-control" placeholder="e.g. GREEN POWER" value="<?php echo $editPost ? htmlspecialchars($editPost['category']) : 'GREEN POWER'; ?>" required>
                        </div>
                        <div class="form-group">
                            <label for="post_date">Publish Date String</label>
                            <input type="text" id="post_date" name="post_date" class="form-control" placeholder="e.g. November 10, 2022" value="<?php echo $editPost ? htmlspecialchars($editPost['post_date']) : date('F d, Y'); ?>" required>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="image">Cover Image Upload</label>
                        <input type="file" id="image" name="image" class="form-control" accept="image/*" <?php echo $editPost ? '' : 'required'; ?>>
                        <?php if ($editPost): ?>
                            <p style="font-size:13px;color:var(--text-muted);margin-top:8px;">Current Image: <a href="<?php echo htmlspecialchars($editPost['image_url']); ?>" target="_blank">View Image</a></p>
                        <?php endif; ?>
                    </div>

                    <div class="form-group">
                        <label for="content">Article Body Content</label>
                        <textarea id="content" name="content" class="form-control" placeholder="Write full HTML or rich plain content here..." required><?php echo $editPost ? htmlspecialchars($editPost['content']) : ''; ?></textarea>
                    </div>

                    <div class="form-actions">
                        <button type="submit" class="btn-save"><?php echo $editPost ? 'Update Post' : 'Publish Article'; ?></button>
                        <a href="manage-posts.php" class="btn-cancel">Cancel</a>
                    </div>
                </form>
            </div>

        <!-- Listing Table Panel -->
        <?php else: ?>
            <div class="panel-card">
                <div class="panel-header">
                    <h3>Articles List</h3>
                    <a href="manage-posts.php?action=add" class="btn-add"><i class="fa-solid fa-plus"></i> Add New Article</a>
                </div>

                <?php if (count($posts) > 0): ?>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Cover & Title</th>
                                <th>Category</th>
                                <th>Publish Date</th>
                                <th style="text-align:right;">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($posts as $post): ?>
                                <tr>
                                    <td>
                                        <div class="post-row">
                                            <img src="<?php echo htmlspecialchars($post['image_url']); ?>" alt="" class="post-img" onerror="this.src='https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=100';">
                                            <span class="post-title"><?php echo htmlspecialchars($post['title']); ?></span>
                                        </div>
                                    </td>
                                    <td><span class="badge category"><?php echo htmlspecialchars($post['category']); ?></span></td>
                                    <td><?php echo htmlspecialchars($post['post_date']); ?></td>
                                    <td>
                                        <div class="action-btns" style="justify-content:flex-end;">
                                            <a href="manage-posts.php?action=edit&id=<?php echo $post['id']; ?>" class="btn-edit-act" title="Edit"><i class="fa-solid fa-pen"></i></a>
                                            <a href="manage-posts.php?action=delete&id=<?php echo $post['id']; ?>" class="btn-del-act" title="Delete" onclick="return confirm('Are you sure you want to permanently delete this article?');"><i class="fa-solid fa-trash-can"></i></a>
                                        </div>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                <?php else: ?>
                    <p style="color:var(--text-muted);font-size:15px;">No blog articles found. Click Add New Article to create one!</p>
                <?php endif; ?>
            </div>
        <?php endif; ?>
    </div>
</body>
</html>
