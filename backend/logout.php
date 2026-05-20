<?php
// logout.php
require_once 'config.php';
start_secure_session();

$_SESSION = [];
session_destroy();

header("Location: login.php");
exit();
