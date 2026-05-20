<?php
// sidebar.php - Shared sidebar component
$currentPage = basename($_SERVER['PHP_SELF']);
?>
<div class="sidebar">
    <div class="sidebar-logo">
        <h1>SAVEX</h1>
        <div class="logo-sub">LED Lighting Solution..</div>
    </div>
    <ul class="nav-list">
        <li class="nav-item <?php echo $currentPage === 'dashboard.php' ? 'active' : ''; ?>">
            <a href="dashboard.php"><i class="fa-solid fa-chart-line"></i> Dashboard</a>
        </li>
        <li class="nav-item <?php echo $currentPage === 'manage-categories.php' ? 'active' : ''; ?>">
            <a href="manage-categories.php"><i class="fa-solid fa-tags"></i> Categories</a>
        </li>
        <li class="nav-item <?php echo $currentPage === 'manage-products.php' ? 'active' : ''; ?>">
            <a href="manage-products.php"><i class="fa-solid fa-box-open"></i> Products</a>
        </li>
        <li class="nav-item <?php echo $currentPage === 'manage-posts.php' ? 'active' : ''; ?>">
            <a href="manage-posts.php"><i class="fa-solid fa-newspaper"></i> Blog Posts</a>
        </li>
        <li class="nav-item <?php echo $currentPage === 'manage-users.php' ? 'active' : ''; ?>">
            <a href="manage-users.php"><i class="fa-solid fa-users"></i> Users</a>
        </li>
        <li class="nav-item <?php echo $currentPage === 'manage-inquiries.php' ? 'active' : ''; ?>">
            <a href="manage-inquiries.php"><i class="fa-solid fa-envelope-open-text"></i> Contact Mail</a>
        </li>
        <li class="nav-item <?php echo $currentPage === 'manage-comments.php' ? 'active' : ''; ?>">
            <a href="manage-comments.php"><i class="fa-solid fa-comments"></i> Blog Comments</a>
        </li>
    </ul>
    <div class="sidebar-footer">
        <div class="admin-info">
            <i class="fa-solid fa-user-shield"></i>
            <span><?php echo isset($_SESSION['admin_username']) ? htmlspecialchars($_SESSION['admin_username']) : 'Admin'; ?></span>
        </div>
        <a href="logout.php" class="btn-logout"><i class="fa-solid fa-right-from-bracket"></i> Logout</a>
    </div>
</div>
