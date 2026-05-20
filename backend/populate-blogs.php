<?php
// populate-blogs.php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
require_once 'config.php';

$posts = [
    [
        'title' => "An opportunity for energy Independence",
        'category' => "Technologies",
        'post_date' => "November 17, 2022",
        'image_url' => "https://savexelectricals.com/wp-content/uploads/2022/11/post-image4-1290x725.jpg",
        'content' => "Q uroin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed eget viverra egestas nisi in consequat. Fusce sodales augue a eiusm od tempor incididunt ut labore. Consectetur adipiscing elit, sed do eiusmod tempor incididunt."
    ],
    [
        'title' => "How to make solar work for any home",
        'category' => "Technologies",
        'post_date' => "November 17, 2022",
        'image_url' => "http://localhost/yashvi/electry/backend/uploads/battery_storage.png",
        'content' => "Q uroin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed eget viverra egestas nisi in consequat. Fusce sodales augue a eiusm od tempor incididunt ut labore. Consectetur adipiscing elit, sed do eiusmod tempor."
    ],
    [
        'title' => "Solar energy and the modern smart home",
        'category' => "Technologies",
        'post_date' => "November 17, 2022",
        'image_url' => "http://localhost/yashvi/electry/backend/uploads/blog1.png",
        'content' => "Q uroin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed eget viverra egestas nisi in consequat. Fusce sodales augue a eiusm od tempor incididunt ut labore. Consectetur adipiscing elit, sed do."
    ],
    [
        'title' => "How to find the best solar companies in California",
        'category' => "Technologies",
        'post_date' => "November 17, 2022",
        'image_url' => "https://savexelectricals.com/wp-content/uploads/2022/11/portfolio-image4.jpg",
        'content' => "Q uroin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed eget viverra egestas nisi in consequat. Fusce sodales augue a eiusm od tempor incididunt ut labore. Consectetur adipiscing elit, sed do eiusmod."
    ],
    [
        'title' => "Quote Post",
        'category' => "Technologies",
        'post_date' => "November 17, 2022",
        'image_url' => "http://localhost/yashvi/electry/backend/uploads/blog2.png",
        'content' => "Dipiscing elit, sed do eiusmod tempor incidunt ut labore adipiscing et dolore magna minim totam rem iste natus sit aliqua. Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium."
    ],
    [
        'title' => "Do you need a roof to go solar?",
        'category' => "Solar Power",
        'post_date' => "November 16, 2022",
        'image_url' => "https://savexelectricals.com/wp-content/uploads/2022/11/portfolio-image5-840x473.jpg",
        'content' => "Q uroin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed eget viverra egestas nisi in consequat. Fusce sodales augue a eiusm od tempor incididunt ut labore. Consectetur adipiscing."
    ],
    [
        'title' => "Solar for schools: savings and a better future",
        'category' => "Solar Power",
        'post_date' => "November 16, 2022",
        'image_url' => "https://savexelectricals.com/wp-content/uploads/2022/11/portfolio-image3-840x473.jpg",
        'content' => "Q uroin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed eget viverra egestas nisi in consequat. Fusce sodales augue a eiusm od tempor incididunt ut labore. Consectetur adipiscing elit, sed do."
    ],
    [
        'title' => "How a solar battery protects your home",
        'category' => "Solar Power",
        'post_date' => "November 16, 2022",
        'image_url' => "https://savexelectricals.com/wp-content/uploads/2022/11/portfolio-image2-840x473.jpg",
        'content' => "Q uroin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed eget viverra egestas nisi in consequat. Fusce sodales augue a eiusm od tempor incididunt ut labore. Consectetur adipiscing."
    ],
    [
        'title' => "Who is advancing solar technology today?",
        'category' => "SOLAR POWER",
        'post_date' => "November 16, 2022",
        'image_url' => "http://localhost/yashvi/electry/backend/uploads/windfarm_hills.png",
        'content' => "Q uroin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed eget viverra egestas nisi in consequat. Fusce sodales augue a eiusm od tempor incididunt ut labore. Consectetur adipiscing elit, sed do eiusmod."
    ],
    [
        'title' => "What factors affect the cost of a business going solar?",
        'category' => "Solar Power",
        'post_date' => "November 16, 2022",
        'image_url' => "https://savexelectricals.com/wp-content/uploads/2022/11/post-image8-1290x725.jpg",
        'content' => "Q uroin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed eget viverra egestas nisi in consequat. Fusce sodales augue a eiusm od tempor incididunt ut labore. Consectetur adipiscing elit, sed do."
    ],
    [
        'title' => "Are solar batteries worth the investment?",
        'category' => "Solar Power",
        'post_date' => "November 16, 2022",
        'image_url' => "https://savexelectricals.com/wp-content/uploads/2020/04/post-image2-1024x683.jpg",
        'content' => "Q uroin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed eget viverra egestas nisi in consequat. Fusce sodales augue a eiusm od tempor incididunt ut labore. Consectetur adipiscing elit, sed do."
    ],
    [
        'title' => "How to find a solar company near me",
        'category' => "SOLAR POWER",
        'post_date' => "November 16, 2022",
        'image_url' => "https://savexelectricals.com/wp-content/uploads/2020/04/service-image9-1024x683.jpg",
        'content' => "Q uroin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed eget viverra egestas nisi in consequat. Fusce sodales augue a eiusm od tempor incididunt ut labore. Consectetur adipiscing elit."
    ],
    [
        'title' => "Commercial solar power systems: a guide",
        'category' => "Solar Power",
        'post_date' => "November 16, 2022",
        'image_url' => "https://savexelectricals.com/wp-content/uploads/2020/04/service-image8-1024x683.jpg",
        'content' => "Q uroin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed eget viverra egestas nisi in consequat. Fusce sodales augue a eiusm od tempor incididunt ut labore. Consectetur adipiscing elit."
    ],
    [
        'title' => "Become a solar energy expert in 6 simple steps",
        'category' => "Solar Power",
        'post_date' => "November 16, 2022",
        'image_url' => "https://savexelectricals.com/wp-content/uploads/2022/11/typography-image2-1024x683.jpg",
        'content' => "Q uroin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed eget viverra egestas nisi in consequat. Fusce sodales augue a eiusm od tempor incididunt ut labore. Consectetur adipiscing."
    ],
    [
        'title' => "What effects does hydropower have on the environment?",
        'category' => "Hydropower",
        'post_date' => "November 16, 2022",
        'image_url' => "https://savexelectricals.com/wp-content/uploads/2022/11/post-image11-1290x725.jpg",
        'content' => "Q uroin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed eget viverra egestas nisi in consequat. Fusce sodales augue a eiusm od tempor incididunt ut labore. Consectetur adipiscing."
    ],
    [
        'title' => "Facts about the potential of hydroelectric power",
        'category' => "Hydropower",
        'post_date' => "November 16, 2022",
        'image_url' => "https://savexelectricals.com/wp-content/uploads/2022/11/post-image10-1290x725.jpg",
        'content' => "Q uroin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed eget viverra egestas nisi in consequat. Fusce sodales augue a eiusm od tempor incididunt ut labore. Consectetur adipiscing."
    ],
    [
        'title' => "How sustainable hydropower can promote biodiversity",
        'category' => "Hydropower",
        'post_date' => "November 16, 2022",
        'image_url' => "https://savexelectricals.com/wp-content/uploads/2022/11/post-image9-1290x725.jpg",
        'content' => "Q uroin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed eget viverra egestas nisi in consequat. Fusce sodales augue a eiusm od tempor incididunt ut labore. Consectetur adipiscing."
    ],
    [
        'title' => "Rising prices: the time for solar is now!",
        'category' => "Green Power",
        'post_date' => "November 10, 2022",
        'image_url' => "https://savexelectricals.com/wp-content/uploads/2022/11/post-image8-1290x725.jpg",
        'content' => "Q uroin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed eget viverra egestas nisi in consequat. Fusce sodales augue a eiusm od tempor incididunt ut labore. Consectetur adipiscing."
    ],
    [
        'title' => "Understanding the current solar tariffs",
        'category' => "Green Power",
        'post_date' => "November 10, 2022",
        'image_url' => "https://savexelectricals.com/wp-content/uploads/2022/11/post-image7-1024x1024.jpg",
        'content' => "Q uroin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed eget viverra egestas nisi in consequat. Fusce sodales augue a eiusm od tempor incididunt ut labore. Consectetur adipiscing."
    ],
    [
        'title' => "Is your smart home ready for summer?",
        'category' => "Green Power",
        'post_date' => "November 10, 2022",
        'image_url' => "https://savexelectricals.com/wp-content/uploads/2022/11/post-image6-1290x725.jpg",
        'content' => "Q uroin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed eget viverra egestas nisi in consequat. Fusce sodales augue a eiusm od tempor incididunt ut labore. Consectetur adipiscing."
    ],
    [
        'title' => "Is solar worth it? Find out this summer!",
        'category' => "Green Power",
        'post_date' => "November 10, 2022",
        'image_url' => "https://savexelectricals.com/wp-content/uploads/2022/11/post-image5-1290x725.jpg",
        'content' => "Q uroin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed eget viverra egestas nisi in consequat. Fusce sodales augue a eiusm od tempor incididunt ut labore. Consectetur adipiscing."
    ],
    [
        'title' => "How many solar panels do you need?",
        'category' => "Energy",
        'post_date' => "April 12, 2020",
        'image_url' => "https://savexelectricals.com/wp-content/uploads/2020/04/post-image1-1290x725.jpg",
        'content' => "Quroin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed eget viverra egestas nisi in consequat. Fusce sodales augue a eiusm od tempor incididunt ut labore. Consectetur adipiscing elit."
    ],
    [
        'title' => "What are the profits of solar energy?",
        'category' => "Energy",
        'post_date' => "April 12, 2020",
        'image_url' => "https://savexelectricals.com/wp-content/uploads/2022/11/post-image3-1290x725.jpg",
        'content' => "Quroin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed eget viverra egestas nisi in consequat. Fusce sodales augue a eiusm od tempor incididunt ut labore. Consectetur adipiscing elit."
    ],
    [
        'title' => "Tips to reduce your home's energy use",
        'category' => "Energy",
        'post_date' => "April 12, 2020",
        'image_url' => "https://savexelectricals.com/wp-content/uploads/2022/11/post-image4-1290x725.jpg",
        'content' => "Quroin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed eget viverra egestas nisi in consequat. Fusce sodales augue a eiusm od tempor incididunt ut labore. Consectetur adipiscing."
    ],
    [
        'title' => "Harnessing the power of solar panels",
        'category' => "News",
        'post_date' => "April 11, 2020",
        'image_url' => "https://savexelectricals.com/wp-content/uploads/2024/06/post-vb1-1024x765.jpg",
        'content' => "Q uroin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed eget viverra egestas nisi in consequat. Fusce sodales augue a eiusm od tempor incididunt ut labore. Consectetur adipiscing."
    ],
    [
        'title' => "Solar power is making renewable energy",
        'category' => "News",
        'post_date' => "April 10, 2020",
        'image_url' => "https://savexelectricals.com/wp-content/uploads/2024/06/post-vb2-1024x765.jpg",
        'content' => "Q uroin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed eget viverra egestas nisi in consequat. Fusce sodales augue a eiusm od tempor incididunt ut labore. Consectetur adipiscing."
    ],
    [
        'title' => "The environmental impact of wind turbines",
        'category' => "News",
        'post_date' => "April 9, 2020",
        'image_url' => "https://savexelectricals.com/wp-content/uploads/2024/06/post-vb3-1024x765.jpg",
        'content' => "Q uroin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed eget viverra egestas nisi in consequat. Fusce sodales augue a eiusm od tempor incididunt ut labore. Consectetur adipiscing."
    ],
    [
        'title' => "Which energy is the better investment?",
        'category' => "News",
        'post_date' => "April 8, 2020",
        'image_url' => "https://savexelectricals.com/wp-content/uploads/2024/06/post-vb4-1024x765.jpg",
        'content' => "Q uroin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed eget viverra egestas nisi in consequat. Fusce sodales augue a eiusm od tempor incididunt ut labore. Consectetur adipiscing."
    ]
];

$added = 0;
$skipped = 0;

try {
    foreach ($posts as $post) {
        $slug = strtolower(preg_replace('/[^A-Za-z0-9-]+/', '-', $post['title']));
        $slug = trim($slug, '-');

        // Check if exists
        $stmt = $pdo->prepare("SELECT COUNT(*) FROM blog_posts WHERE slug = ? OR title = ?");
        $stmt->execute([$slug, $post['title']]);
        if ($stmt->fetchColumn() == 0) {
            $insert = $pdo->prepare("INSERT INTO blog_posts (title, category, post_date, image_url, slug, content) VALUES (?, ?, ?, ?, ?, ?)");
            $insert->execute([
                $post['title'],
                $post['category'],
                $post['post_date'],
                $post['image_url'],
                $slug,
                $post['content']
            ]);
            $added++;
        } else {
            $skipped++;
        }
    }
    echo json_encode([
        'status' => 'success',
        'message' => "Successfully populated blog posts. Added: $added, Skipped: $skipped"
    ]);
} catch (PDOException $e) {
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}
