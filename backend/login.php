<?php
// login.php
require_once 'config.php';
start_secure_session();

// If already logged in, redirect to dashboard (Disabled to always show login form first as requested)
/*
if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true) {
    header("Location: dashboard.php");
    exit();
}
*/


$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username']);
    $password = $_POST['password'];

    if (!empty($username) && !empty($password)) {
        $stmt = $pdo->prepare("SELECT * FROM admins WHERE username = ?");
        $stmt->execute([$username]);
        $admin = $stmt->fetch();

        if ($admin && password_verify($password, $admin['password_hash'])) {
            $_SESSION['admin_logged_in'] = true;
            $_SESSION['admin_id'] = $admin['id'];
            $_SESSION['admin_username'] = $admin['username'];
            header("Location: dashboard.php");
            exit();
        } else {
            $error = 'Invalid username or password.';
        }
    } else {
        $error = 'Please fill in all fields.';
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SaveX Electronics — Admin Portal</title>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap" rel="stylesheet">
    <style>
        :root {
            --brand-green: #10271D;
            --brand-red: #E31E24;
            --mint-bg: #E7F0E9;
            --white: #FFFFFF;
        }
        body {
            font-family: 'Outfit', sans-serif;
            background-color: var(--mint-bg);
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
        }
        .login-card {
            background-color: var(--white);
            padding: 50px 40px;
            border-radius: 24px;
            box-shadow: 0 15px 45px rgba(16, 39, 29, 0.08);
            width: 100%;
            max-width: 440px;
            box-sizing: border-box;
            text-align: center;
            border: 1px solid rgba(16, 39, 29, 0.05);
        }
        .logo-wrap {
            margin-bottom: 25px;
        }
        .logo-text {
            font-size: 32px;
            font-weight: 800;
            color: var(--brand-green);
            margin: 0;
            letter-spacing: -0.5px;
        }
        .logo-sub {
            font-size: 11px;
            font-weight: 700;
            color: var(--brand-red);
            letter-spacing: 2px;
            text-transform: uppercase;
            margin-top: -3px;
        }
        h2 {
            color: var(--brand-green);
            font-size: 22px;
            font-weight: 600;
            margin: 0 0 30px;
        }
        .error-msg {
            color: var(--brand-red);
            background-color: #FDF2F2;
            padding: 14px 20px;
            border-radius: 12px;
            font-size: 14px;
            margin-bottom: 25px;
            font-weight: 600;
            border: 1px solid rgba(227, 30, 36, 0.1);
            text-align: left;
        }
        .form-group {
            margin-bottom: 22px;
            text-align: left;
        }
        .form-group label {
            display: block;
            font-weight: 600;
            margin-bottom: 8px;
            color: var(--brand-green);
            font-size: 14px;
        }
        .form-control {
            width: 100%;
            padding: 15px 20px;
            border: 1px solid rgba(16, 39, 29, 0.12);
            border-radius: 12px;
            font-size: 15px;
            box-sizing: border-box;
            outline: none;
            transition: all 0.3s ease;
            font-family: inherit;
        }
        .form-control:focus {
            border-color: var(--brand-green);
            box-shadow: 0 0 0 3px rgba(16, 39, 29, 0.05);
        }
        .btn-submit {
            background-color: var(--brand-green);
            color: var(--white);
            width: 100%;
            padding: 16px;
            border: none;
            border-radius: 100px;
            font-size: 16px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-top: 10px;
            font-family: inherit;
        }
        .btn-submit:hover {
            background-color: var(--brand-red);
            box-shadow: 0 8px 20px rgba(227, 30, 36, 0.2);
        }
    </style>
</head>
<body>
    <div class="login-card">
        <div class="logo-wrap">
            <h1 class="logo-text">SAVEX</h1>
            <div class="logo-sub">LED Lighting Solution..</div>
        </div>
        <h2>Admin Portal</h2>
        
        <?php if (!empty($error)): ?>
            <div class="error-msg"><?php echo htmlspecialchars($error); ?></div>
        <?php endif; ?>

        <form action="" method="POST">
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" id="username" name="username" class="form-control" placeholder="Enter admin username" required autocomplete="username">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" class="form-control" placeholder="Enter account password" required autocomplete="current-password">
            </div>
            <button type="submit" class="btn-submit">Login to Dashboard</button>
        </form>
    </div>
</body>
</html>
