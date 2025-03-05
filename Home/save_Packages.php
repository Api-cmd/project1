<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "plan_your_tour";

function sanitizeInput($data) {
    return htmlspecialchars(strip_tags(trim($data)));
}

$response = ['success' => false, 'message' => '', 'data' => null];

try {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Invalid request method. Please use POST.');
    }

    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
        throw new Exception("Database connection failed: " . $conn->connect_error);
    }

    $name = sanitizeInput($_POST['name'] ?? '');
    $email = sanitizeInput($_POST['email'] ?? '');
    $expectations = sanitizeInput($_POST['Adventure_Expectations'] ?? '');

    if (empty($name) || empty($email)) {
        throw new Exception('Name and Email are required.');
    }

    $createTable = "CREATE TABLE IF NOT EXISTS adventure_booking (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        Adventure_Expectations TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";

    if (!$conn->query($createTable)) {
        throw new Exception("Error creating table: " . $conn->error);
    }

    $stmt = $conn->prepare("INSERT INTO adventure_booking (name, email, Adventure_Expectations) VALUES (?, ?, ?)");
    if (!$stmt) {
        throw new Exception("Prepare failed: " . $conn->error);
    }

    $stmt->bind_param("sss", $name, $email, $expectations);
    if (!$stmt->execute()) {
        throw new Exception("Error saving booking: " . $stmt->error);
    }

    $response['success'] = true;
    $response['message'] = 'Thank you for booking your adventure with us!';
    $response['data'] = [
        'booking_id' => $stmt->insert_id,
        'name' => $name,
        'email' => $email
    ];

    $stmt->close();
    $conn->close();
} catch (Exception $e) {
    $response['success'] = false;
    $response['message'] = $e->getMessage(); 
}

echo json_encode($response);
?>
