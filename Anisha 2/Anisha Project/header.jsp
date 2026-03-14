<%@page isELIgnored="false" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create Mock Test - StudyHub</title>
    <link rel="stylesheet" type="text/css" href="styles.css">
</head>
<body>
    <!-- Navigation Bar -->
    <nav class="navbar">
        <div class="nav-container">
            <div class="logo-section">
                <div class="logo">
                    <div class="logo-icon"></div>
                    <span class="logo-text">StudyHub Admin</span>
                </div>
            </div>
            <div class="nav-menu">
                <ul class="nav-list">
                    <li><a href="#" class="nav-link active">Dashboard</a></li>
                    <li><a href="#" onclick="showSection('subjects')" class="nav-link">Subjects</a></li>
                    <li><a href="#" onclick="showSection('mocktests')" class="nav-link">Mocktests</a></li>
                    <li><a href="#" onclick="showSection('news')" class="nav-link">News Updates</a></li>
                </ul>
            </div>
            <div class="nav-buttons">
                <button class="btn-logout" onclick="logout()">Logout</button>
            </div>
        </div>
    </nav>
    <div class="admin-container">
        <aside class="admin-sidebar">
            <ul class="admin-menu">
                <li><a href="#" class="admin-menu-link">Dashboard</a></li>
                <li><a href="#" class="admin-menu-link">Subjects</a></li>
                <li><a href="#" class="admin-menu-link">Mocktests</a></li>
                <li><a href="#" class="admin-menu-link">News Updates</a></li>
            </ul>
        </aside>
        <main class="admin-content">