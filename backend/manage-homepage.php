<?php
// manage-homepage.php
require_once 'config.php';
require_admin();

$dataFile = __DIR__ . '/data/homepage.json';
$success = '';
$error = '';

// Load existing data
$homepage = [];
if (file_exists($dataFile)) {
    $json = file_get_contents($dataFile);
    $homepage = json_decode($json, true) ?: [];
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Basic sanitization - collect posted fields
    $payload = [];
    $payload['hero'] = [
        'title' => trim($_POST['hero_title'] ?? ''),
        'subtitle' => trim($_POST['hero_subtitle'] ?? ''),
        'cta_text' => trim($_POST['hero_cta_text'] ?? ''),
        'cta_url' => trim($_POST['hero_cta_url'] ?? ''),
        'image_url' => trim($_POST['hero_image_url'] ?? ''),
    ];
    $payload['about'] = [
        'subtitle' => trim($_POST['about_subtitle'] ?? ''),
        'title' => trim($_POST['about_title'] ?? ''),
        'description' => trim($_POST['about_description'] ?? ''),
        'button_text' => trim($_POST['about_button_text'] ?? ''),
        'button_url' => trim($_POST['about_button_url'] ?? ''),
        'image_url' => trim($_POST['about_image_url'] ?? ''),
    ];
    $payload['why_choose'] = [
        'subtitle' => trim($_POST['why_subtitle'] ?? ''),
        'title' => trim($_POST['why_title'] ?? ''),
        'description' => trim($_POST['why_description'] ?? ''),
        'cards' => array_values(array_filter(array_map('trim', (array)$_POST['why_cards'] ?? [])))
    ];
    $payload['manufacturing'] = [
        'subtitle' => trim($_POST['mfg_subtitle'] ?? ''),
        'title' => trim($_POST['mfg_title'] ?? ''),
        'description' => trim($_POST['mfg_description'] ?? ''),
        'button_text' => trim($_POST['mfg_button_text'] ?? ''),
        'button_url' => trim($_POST['mfg_button_url'] ?? ''),
        'image_url_1' => trim($_POST['mfg_image_url_1'] ?? ''),
        'image_url_2' => trim($_POST['mfg_image_url_2'] ?? ''),
    ];
    $payload['factory_cta'] = [
        'subtitle' => trim($_POST['factory_subtitle'] ?? ''),
        'title' => trim($_POST['factory_title'] ?? ''),
        'button_text' => trim($_POST['factory_button_text'] ?? ''),
        'button_url' => trim($_POST['factory_button_url'] ?? ''),
        'background_image_url' => trim($_POST['factory_background_image_url'] ?? ''),
    ];
    $payload['blog_section'] = [
        'subtitle' => trim($_POST['blog_subtitle'] ?? ''),
        'title' => trim($_POST['blog_title'] ?? ''),
    ];
    $payload['contact_cta'] = [
        'subtitle' => trim($_POST['contact_subtitle'] ?? ''),
        'title' => trim($_POST['contact_title'] ?? ''),
        'button_text' => trim($_POST['contact_button_text'] ?? ''),
        'button_url' => trim($_POST['contact_button_url'] ?? ''),
    ];

    // Write to file
    try {
        if (!is_dir(dirname($dataFile))) {
            mkdir(dirname($dataFile), 0755, true);
        }
        file_put_contents($dataFile, json_encode($payload, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
        $success = 'Homepage content updated successfully.';
        $homepage = $payload;
    } catch (Exception $e) {
        $error = 'Failed to save homepage content: ' . $e->getMessage();
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>SaveX — Homepage Management</title>
    <link rel="stylesheet" href="shared-style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        body { font-family: 'Outfit', sans-serif; background:#F6FBF8; margin:0; min-height:100vh; }
        .main-content { margin-left:260px; padding:40px 50px; }
        .page-header { display:flex; flex-wrap:wrap; justify-content:space-between; gap:16px; align-items:flex-end; margin-bottom:30px; }
        .page-header h2 { margin:0; font-size:32px; font-weight:800; color:var(--brand-green); }
        .page-header p { margin:0; color:var(--text-muted); max-width:760px; }
        .panel { background:var(--white); padding:36px; border-radius:20px; box-shadow:var(--shadow); border:1px solid rgba(16,39,29,0.04); }
        .section { margin-bottom:32px; padding-bottom:30px; border-bottom:1px solid var(--border-light); }
        .section:last-child { border-bottom:none; }
        .section h3 { margin-bottom:10px; font-size:20px; color:var(--brand-green); }
        .section p { margin-top:0; margin-bottom:20px; color:var(--text-muted); }
        .field { margin-bottom:18px; }
        .field label { display:block; font-weight:700; color:var(--brand-green); font-size:13px; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:10px; }
        .field input[type=text], .field textarea { width:100%; padding:14px 16px; border:1.5px solid var(--border-light); border-radius:14px; background:#fff; color:var(--text-dark); font-size:15px; }
        .field textarea { min-height:120px; resize:vertical; }
        .row { display:grid; grid-template-columns:1fr 1fr; gap:24px; }
        .row .field { margin-bottom:0; }
        .note { display:block; margin-top:8px; color:var(--text-muted); font-size:13px; }
        .form-actions { text-align:right; margin-top:18px; }
        .btn { background:var(--brand-green); color:#fff; padding:14px 28px; border-radius:100px; border:none; cursor:pointer; font-weight:700; transition:all .2s ease; }
        .btn:hover { background:var(--brand-red); }
        @media (max-width: 900px) {
            .main-content { margin-left:0; padding:20px; }
            .row { grid-template-columns:1fr; }
        }
    </style>
</head>
<body>
    <?php include 'sidebar.php'; ?>
    <div class="container">
        <div class="main-content">
            <?php if ($success): ?>
                <div class="success"><?php echo htmlspecialchars($success); ?></div>
            <?php endif; ?>
            <?php if ($error): ?>
                <div class="error"><?php echo htmlspecialchars($error); ?></div>
            <?php endif; ?>

            <div class="page-header">
                <div>
                    <h2>Homepage Management</h2>
                    <p>Use this editor to update the homepage content blocks that appear on the live site.</p>
                </div>
            </div>
            <form method="POST">
                <div class="panel">
                    <div class="section">
                        <h3>Hero Banner</h3>
                        <p>Manage the homepage hero title, subtitle, CTA and hero image.</p>
                        <div class="field"><label>Title</label>
                            <input class="form-control" type="text" name="hero_title" value="<?php echo htmlspecialchars($homepage['hero']['title'] ?? ''); ?>"></div>
                        <div class="field"><label>Subtitle</label>
                            <input class="form-control" type="text" name="hero_subtitle" value="<?php echo htmlspecialchars($homepage['hero']['subtitle'] ?? ''); ?>"></div>
                        <div class="row">
                            <div class="field"><label>CTA Text</label>
                                <input class="form-control" type="text" name="hero_cta_text" value="<?php echo htmlspecialchars($homepage['hero']['cta_text'] ?? ''); ?>"></div>
                            <div class="field"><label>CTA URL</label>
                                <input class="form-control" type="text" name="hero_cta_url" value="<?php echo htmlspecialchars($homepage['hero']['cta_url'] ?? ''); ?>"></div>
                        </div>
                        <div class="field"><label>Hero Image URL</label>
                            <input class="form-control" type="text" name="hero_image_url" value="<?php echo htmlspecialchars($homepage['hero']['image_url'] ?? ''); ?>">
                            <span class="note">Optional: this can be used for a hero background or preview image.</span></div>
                    </div>

                    <div class="section">
                        <h3>About Section</h3>
                        <p>Update the homepage about block heading, text, button, and image.</p>
                        <div class="row">
                            <div class="field"><label>Subtitle</label>
                                <input type="text" name="about_subtitle" value="<?php echo htmlspecialchars($homepage['about']['subtitle'] ?? ''); ?>"></div>
                            <div class="field"><label>Title</label>
                                <input type="text" name="about_title" value="<?php echo htmlspecialchars($homepage['about']['title'] ?? ''); ?>"></div>
                        </div>
                        <div class="field"><label>Description</label>
                            <textarea name="about_description"><?php echo htmlspecialchars($homepage['about']['description'] ?? ''); ?></textarea></div>
                        <div class="row">
                            <div class="field"><label>Button Text</label>
                                <input type="text" name="about_button_text" value="<?php echo htmlspecialchars($homepage['about']['button_text'] ?? ''); ?>"></div>
                            <div class="field"><label>Button URL</label>
                                <input type="text" name="about_button_url" value="<?php echo htmlspecialchars($homepage['about']['button_url'] ?? ''); ?>"></div>
                        </div>
                        <div class="field"><label>Image URL</label>
                            <input type="text" name="about_image_url" value="<?php echo htmlspecialchars($homepage['about']['image_url'] ?? ''); ?>"></div>
                    </div>

                    <div class="section">
                        <h3>Why Choose Section</h3>
                        <p>Manage the heading and the benefit cards shown on the homepage.</p>
                        <div class="row">
                            <div class="field"><label>Subtitle</label>
                                <input type="text" name="why_subtitle" value="<?php echo htmlspecialchars($homepage['why_choose']['subtitle'] ?? ''); ?>"></div>
                            <div class="field"><label>Title</label>
                                <input type="text" name="why_title" value="<?php echo htmlspecialchars($homepage['why_choose']['title'] ?? ''); ?>"></div>
                        </div>
                        <div class="field"><label>Description</label>
                            <textarea name="why_description"><?php echo htmlspecialchars($homepage['why_choose']['description'] ?? ''); ?></textarea></div>
                        <div class="field"><label>Benefit Cards (one per line)</label>
                            <textarea name="why_cards"><?php echo htmlspecialchars(implode("\n", $homepage['why_choose']['cards'] ?? [])); ?></textarea>
                            <span class="note">Each line becomes one card on the homepage.</span></div>
                    </div>

                    <div class="section">
                        <h3>Manufacturing Section</h3>
                        <p>Update the manufacturing block text, button, and images.</p>
                        <div class="row">
                            <div class="field"><label>Subtitle</label>
                                <input type="text" name="mfg_subtitle" value="<?php echo htmlspecialchars($homepage['manufacturing']['subtitle'] ?? ''); ?>"></div>
                            <div class="field"><label>Title</label>
                                <input type="text" name="mfg_title" value="<?php echo htmlspecialchars($homepage['manufacturing']['title'] ?? ''); ?>"></div>
                        </div>
                        <div class="field"><label>Description</label>
                            <textarea name="mfg_description"><?php echo htmlspecialchars($homepage['manufacturing']['description'] ?? ''); ?></textarea></div>
                        <div class="row">
                            <div class="field"><label>Button Text</label>
                                <input type="text" name="mfg_button_text" value="<?php echo htmlspecialchars($homepage['manufacturing']['button_text'] ?? ''); ?>"></div>
                            <div class="field"><label>Button URL</label>
                                <input type="text" name="mfg_button_url" value="<?php echo htmlspecialchars($homepage['manufacturing']['button_url'] ?? ''); ?>"></div>
                        </div>
                        <div class="row">
                            <div class="field"><label>Image URL 1</label>
                                <input type="text" name="mfg_image_url_1" value="<?php echo htmlspecialchars($homepage['manufacturing']['image_url_1'] ?? ''); ?>"></div>
                            <div class="field"><label>Image URL 2</label>
                                <input type="text" name="mfg_image_url_2" value="<?php echo htmlspecialchars($homepage['manufacturing']['image_url_2'] ?? ''); ?>"></div>
                        </div>
                    </div>

                    <div class="section">
                        <h3>Factory CTA Section</h3>
                        <p>Manage the factory call-to-action block that appears before the blog section.</p>
                        <div class="row">
                            <div class="field"><label>Subtitle</label>
                                <input type="text" name="factory_subtitle" value="<?php echo htmlspecialchars($homepage['factory_cta']['subtitle'] ?? ''); ?>"></div>
                            <div class="field"><label>Title</label>
                                <input type="text" name="factory_title" value="<?php echo htmlspecialchars($homepage['factory_cta']['title'] ?? ''); ?>"></div>
                        </div>
                        <div class="row">
                            <div class="field"><label>Button Text</label>
                                <input type="text" name="factory_button_text" value="<?php echo htmlspecialchars($homepage['factory_cta']['button_text'] ?? ''); ?>"></div>
                            <div class="field"><label>Button URL</label>
                                <input type="text" name="factory_button_url" value="<?php echo htmlspecialchars($homepage['factory_cta']['button_url'] ?? ''); ?>"></div>
                        </div>
                        <div class="field"><label>Background Image URL</label>
                            <input type="text" name="factory_background_image_url" value="<?php echo htmlspecialchars($homepage['factory_cta']['background_image_url'] ?? ''); ?>"></div>
                    </div>

                    <div class="section">
                        <h3>Blog Section</h3>
                        <p>Update the blog section heading shown on the homepage.</p>
                        <div class="row">
                            <div class="field"><label>Subtitle</label>
                                <input type="text" name="blog_subtitle" value="<?php echo htmlspecialchars($homepage['blog_section']['subtitle'] ?? ''); ?>"></div>
                            <div class="field"><label>Title</label>
                                <input type="text" name="blog_title" value="<?php echo htmlspecialchars($homepage['blog_section']['title'] ?? ''); ?>"></div>
                        </div>
                    </div>

                    <div class="section">
                        <h3>Contact CTA</h3>
                        <p>Configure the contact call-to-action shown across the site.</p>
                        <div class="row">
                            <div class="field"><label>Subtitle</label>
                                <input type="text" name="contact_subtitle" value="<?php echo htmlspecialchars($homepage['contact_cta']['subtitle'] ?? ''); ?>"></div>
                            <div class="field"><label>Title</label>
                                <input type="text" name="contact_title" value="<?php echo htmlspecialchars($homepage['contact_cta']['title'] ?? ''); ?>"></div>
                        </div>
                        <div class="row">
                            <div class="field"><label>Button Text</label>
                                <input type="text" name="contact_button_text" value="<?php echo htmlspecialchars($homepage['contact_cta']['button_text'] ?? ''); ?>"></div>
                            <div class="field"><label>Button URL</label>
                                <input type="text" name="contact_button_url" value="<?php echo htmlspecialchars($homepage['contact_cta']['button_url'] ?? ''); ?>"></div>
                        </div>
                    </div>

                    <div style="text-align:right;">
                        <button class="btn" type="submit">Save Homepage</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</body>
</html>
