<?php
// manage-comments.php
require_once 'config.php';
require_admin();

$success = '';
$error = '';
$action = isset($_GET['action']) ? $_GET['action'] : 'list';

if ($action === 'delete' && isset($_GET['id'])) {
    try {
        $id = (int)$_GET['id'];
        $stmtDel = $pdo->prepare("DELETE FROM blog_comments WHERE id = ?");
        $stmtDel->execute([$id]);
        $success = 'Comment deleted successfully.';
        $action = 'list';
    } catch (PDOException $e) {
        $error = 'Failed to delete comment: ' . $e->getMessage();
    }
}

try {
    $stmtAll = $pdo->query("SELECT bc.*, bp.title AS post_title FROM blog_comments bc LEFT JOIN blog_posts bp ON bc.post_id = bp.id ORDER BY bc.created_at DESC");
    $comments = $stmtAll->fetchAll();
} catch (PDOException $e) {
    die("Database query error: " . $e->getMessage());
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SaveX Admin — Blog Comments</title>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="shared-style.css">
</head>
<body>

<?php include 'sidebar.php'; ?>

<div class="main-content">
    <div class="page-header">
        <div>
            <h2>Blog Comments</h2>
            <p style="color:var(--text-muted);font-size:15px;margin-top:4px;">Manage comments submitted by readers from the blog post pages.</p>
        </div>
        <div style="font-size:13px;color:var(--text-muted);"><?php echo date('l, d F Y'); ?></div>
    </div>

    <?php if ($success): ?>
        <div class="alert success"><?php echo htmlspecialchars($success); ?></div>
    <?php endif; ?>
    <?php if ($error): ?>
        <div class="alert error"><?php echo htmlspecialchars($error); ?></div>
    <?php endif; ?>

    <div class="panel-card">
        <div class="panel-header">
            <h3>Recent Comments</h3>
            <a href="manage-comments.php" style="font-size:13px;font-weight:700;color:var(--brand-red);text-decoration:none;">Refresh</a>
        </div>
        <?php if (count($comments) === 0): ?>
            <div class="empty-state" style="padding:30px;"><i class="fa-solid fa-comments"></i><p>No comments have been submitted yet.</p></div>
        <?php else: ?>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Post</th>
                        <th>Commenter</th>
                        <th>Comment</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($comments as $comment): ?>
                        <tr class="comment-row">
                            <td><?php echo $comment['id']; ?></td>
                            <td><?php echo htmlspecialchars($comment['post_title'] ?: 'Unknown Post'); ?></td>
                            <td>
                                <strong><?php echo htmlspecialchars($comment['name']); ?></strong><br>
                                <small><?php echo htmlspecialchars($comment['email']); ?></small>
                            </td>
                            <td><?php echo nl2br(htmlspecialchars(strlen($comment['comment']) > 120 ? substr($comment['comment'], 0, 120) . '...' : $comment['comment'])); ?></td>
                            <td><?php echo date('d M Y, H:i', strtotime($comment['created_at'])); ?></td>
                            <td>
                                <div class="action-btns">
                                    <a class="btn-icon delete" href="manage-comments.php?action=delete&id=<?php echo $comment['id']; ?>" title="Delete comment" onclick="return confirm('Delete this comment permanently?');">
                                        <i class="fa-solid fa-trash-can"></i>
                                    </a>
                                </div>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        <?php endif; ?>
    </div>
</div>

</body>
</html>
