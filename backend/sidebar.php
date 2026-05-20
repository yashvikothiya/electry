<?php
// sidebar.php - Shared sidebar component
$currentPage = basename($_SERVER['PHP_SELF']);
?>
<div class="sidebar">
    <button id="sidebarToggle" title="Toggle sidebar" style="background:transparent;border:none;color:rgba(255,255,255,0.9);font-size:18px;position:absolute;top:14px;right:14px;cursor:pointer;padding:8px;border-radius:8px;">
        <i class="fa-solid fa-bars"></i>
    </button>
    <div class="sidebar-logo">
        <h1>SAVEX</h1>
        <div class="logo-sub">LED Lighting Solution..</div>
    </div>
    <ul class="nav-list">
        <li class="nav-item <?php echo $currentPage === 'dashboard.php' ? 'active' : ''; ?>">
            <a href="dashboard.php"><i class="fa-solid fa-chart-line"></i> <span>Dashboard</span></a>
        </li>
        <li class="nav-item <?php echo $currentPage === 'manage-categories.php' ? 'active' : ''; ?>">
            <a href="manage-categories.php"><i class="fa-solid fa-tags"></i> <span>Categories</span></a>
        </li>
        <li class="nav-item <?php echo $currentPage === 'manage-products.php' ? 'active' : ''; ?>">
            <a href="manage-products.php"><i class="fa-solid fa-box-open"></i> <span>Products</span></a>
        </li>
        <li class="nav-item <?php echo $currentPage === 'manage-posts.php' ? 'active' : ''; ?>">
            <a href="manage-posts.php"><i class="fa-solid fa-newspaper"></i> <span>Blog Posts</span></a>
        </li>
        <li class="nav-item <?php echo $currentPage === 'manage-users.php' ? 'active' : ''; ?>">
            <a href="manage-users.php"><i class="fa-solid fa-users"></i> <span>Users</span></a>
        </li>
        <li class="nav-item <?php echo $currentPage === 'manage-inquiries.php' ? 'active' : ''; ?>">
            <a href="manage-inquiries.php"><i class="fa-solid fa-envelope-open-text"></i> <span>Contact Mail</span></a>
        </li>
        <li class="nav-item <?php echo $currentPage === 'manage-homepage.php' ? 'active' : ''; ?>">
            <a href="manage-homepage.php"><i class="fa-solid fa-house"></i> <span>Homepage Management</span></a>
        </li>
        <li class="nav-item <?php echo $currentPage === 'manage-comments.php' ? 'active' : ''; ?>">
            <a href="manage-comments.php"><i class="fa-solid fa-comments"></i> <span>Blog Comments</span></a>
        </li>
    </ul>
    <div class="sidebar-footer">
        <div class="admin-info">
            <i class="fa-solid fa-user-shield"></i>
            <span><?php echo isset($_SESSION['admin_username']) ? htmlspecialchars($_SESSION['admin_username']) : 'Admin'; ?></span>
        </div>
        <a href="logout.php" class="btn-logout"><i class="fa-solid fa-right-from-bracket"></i> <span>Logout</span></a>
    </div>
</div>
<script>
    (function(){
        var btn = document.getElementById('sidebarToggle');
        if(!btn) return;
        btn.addEventListener('click', function(){
            document.querySelector('.sidebar').classList.toggle('collapsed');
            document.querySelector('.main-content')?.classList.toggle('collapsed');
        });
    })();
</script>
