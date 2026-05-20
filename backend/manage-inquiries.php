<?php
// manage-inquiries.php
require_once 'config.php';
require_admin();

$success = '';
$error = '';

$action = isset($_GET['action']) ? $_GET['action'] : 'list';

// 1. Mark as Read/Unread
if ($action === 'toggle_status' && isset($_GET['id'])) {
    try {
        $id = (int)$_GET['id'];
        $stmtStatus = $pdo->prepare("SELECT status FROM contact_inquiries WHERE id = ?");
        $stmtStatus->execute([$id]);
        $inquiry = $stmtStatus->fetch();
        if ($inquiry) {
            $newStatus = $inquiry['status'] === 'unread' ? 'read' : 'unread';
            $stmtUpdate = $pdo->prepare("UPDATE contact_inquiries SET status = ? WHERE id = ?");
            $stmtUpdate->execute([$newStatus, $id]);
            $success = 'Message marked as ' . $newStatus . '.';
        }
        $action = 'list';
    } catch (PDOException $e) {
        $error = 'Failed to update message: ' . $e->getMessage();
    }
}

// 2. DELETE Message
if ($action === 'delete' && isset($_GET['id'])) {
    try {
        $id = (int)$_GET['id'];
        $stmtDel = $pdo->prepare("DELETE FROM contact_inquiries WHERE id = ?");
        $stmtDel->execute([$id]);
        $success = 'Message deleted successfully.';
        $action = 'list';
    } catch (PDOException $e) {
        $error = 'Failed to delete message: ' . $e->getMessage();
    }
}

// Fetch all inquiries
try {
    $stmtAll = $pdo->query("SELECT * FROM contact_inquiries ORDER BY id DESC");
    $inquiries = $stmtAll->fetchAll();
} catch (PDOException $e) {
    die("Database query error: " . $e->getMessage());
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SaveX Electronics — Contact Mailbox</title>
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
        .panel-header h3 {
            font-size: 22px;
            font-weight: 700;
            color: var(--brand-green);
            margin: 0 0 30px;
            border-bottom: 1px solid var(--border-light);
            padding-bottom: 20px;
        }

        /* Listing Tables */
        .data-table {
            width: 100%;
            border-collapse: collapse;
        }
        .data-table th, .data-table td {
            text-align: left;
            padding: 18px 12px;
            border-bottom: 1px solid var(--border-light);
            vertical-align: top;
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
        .inquiry-sender {
            font-weight: 700;
            color: var(--brand-green);
            margin-bottom: 4px;
        }
        .inquiry-contacts {
            font-size: 13px;
            color: var(--text-muted);
        }
        .inquiry-subject {
            font-weight: 700;
            color: var(--text-dark);
            margin-bottom: 5px;
        }
        .inquiry-message {
            color: #4A5568;
            font-size: 14px;
            line-height: 1.6;
            white-space: pre-wrap;
            max-width: 500px;
        }
        .badge.unread {
            background-color: #FDF2F2;
            color: var(--brand-red);
            padding: 6px 12px;
            border-radius: 100px;
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
        }
        .badge.read {
            background-color: #F1F5F9;
            color: var(--text-muted);
            padding: 6px 12px;
            border-radius: 100px;
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
        }
        .action-btns {
            display: flex;
            gap: 12px;
        }
        .btn-status-act, .btn-del-act {
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
        .btn-status-act {
            background-color: #E7F0E9;
            color: var(--brand-green);
        }
        .btn-status-act:hover {
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
</head>
<body>

    <!-- Sidebar Navigation -->
    <div class="sidebar">
        <div class="sidebar-logo">
            <h1>SAVEX</h1>
            <div class="logo-sub">LED Lighting Solution..</div>
        </div>
        <ul class="nav-list">
            <li class="nav-item">
                <a href="dashboard.php"><i class="fa-solid fa-chart-line"></i> Dashboard</a>
            </li>
            <li class="nav-item">
                <a href="manage-posts.php"><i class="fa-solid fa-newspaper"></i> Manage Posts</a>
            </li>
            <li class="nav-item active">
                <a href="manage-inquiries.php"><i class="fa-solid fa-envelope-open-text"></i> Contact Mail</a>
            </li>
        </ul>
        <div class="sidebar-footer">
            <a href="logout.php" class="btn-logout"><i class="fa-solid fa-right-from-bracket"></i> Logout</a>
        </div>
    </div>

    <!-- Main Content -->
    <div class="main-content">
        <div class="header-title">
            <h2>Contact Mailbox</h2>
        </div>

        <?php if (!empty($success)): ?>
            <div class="alert alert-success"><i class="fa-solid fa-circle-check"></i> <?php echo htmlspecialchars($success); ?></div>
        <?php endif; ?>

        <?php if (!empty($error)): ?>
            <div class="alert alert-error"><i class="fa-solid fa-circle-exclamation"></i> <?php echo htmlspecialchars($error); ?></div>
        <?php endif; ?>

        <!-- Listing Table Panel -->
        <div class="panel-card">
            <div class="panel-header" style="border:none; margin-bottom:0; padding-bottom:0;">
                <h3>Customer Messages</h3>
            </div>

            <?php if (count($inquiries) > 0): ?>
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Sender & Contact</th>
                            <th>Inquiry Subject & Message</th>
                            <th>Status</th>
                            <th>Received At</th>
                            <th style="text-align:right;">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($inquiries as $inquiry): ?>
                            <tr>
                                <td>
                                    <div class="inquiry-sender"><?php echo htmlspecialchars($inquiry['name']); ?></div>
                                    <div class="inquiry-contacts">
                                        <div><i class="fa-solid fa-envelope" style="width:16px;"></i> <?php echo htmlspecialchars($inquiry['email']); ?></div>
                                        <?php if (!empty($inquiry['phone'])): ?>
                                            <div><i class="fa-solid fa-phone" style="width:16px;"></i> <?php echo htmlspecialchars($inquiry['phone']); ?></div>
                                        <?php endif; ?>
                                    </div>
                                </td>
                                <td>
                                    <div class="inquiry-subject"><?php echo htmlspecialchars($inquiry['subject'] ?: 'No Subject'); ?></div>
                                    <div class="inquiry-message"><?php echo htmlspecialchars($inquiry['message']); ?></div>
                                </td>
                                <td>
                                    <span class="badge <?php echo htmlspecialchars($inquiry['status']); ?>">
                                        <?php echo htmlspecialchars($inquiry['status']); ?>
                                    </span>
                                </td>
                                <td>
                                    <div style="font-size:14px; color:var(--text-muted); font-weight:600;">
                                        <?php echo date('M d, Y', strtotime($inquiry['created_at'])); ?>
                                    </div>
                                    <div style="font-size:12px; color:var(--text-muted);">
                                        <?php echo date('H:i A', strtotime($inquiry['created_at'])); ?>
                                    </div>
                                </td>
                                <td>
                                    <div class="action-btns" style="justify-content:flex-end;">
                                        <a href="manage-inquiries.php?action=toggle_status&id=<?php echo $inquiry['id']; ?>" class="btn-status-act" title="<?php echo $inquiry['status'] === 'unread' ? 'Mark as Read' : 'Mark as Unread'; ?>">
                                            <i class="fa-solid <?php echo $inquiry['status'] === 'unread' ? 'fa-envelope-open' : 'fa-envelope'; ?>"></i>
                                        </a>
                                        <a href="manage-inquiries.php?action=delete&id=<?php echo $inquiry['id']; ?>" class="btn-del-act" title="Delete" onclick="return confirm('Are you sure you want to permanently delete this inquiry?');">
                                            <i class="fa-solid fa-trash-can"></i>
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            <?php else: ?>
                <p style="color:var(--text-muted);font-size:15px;padding-top:20px;">Your contact mailbox is currently empty.</p>
            <?php endif; ?>
        </div>
    </div>
</body>
</html>
