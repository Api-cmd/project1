<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database connection parameters
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "plan_your_tour";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check for connection errors
if ($conn->connect_error) {
    die("Database Connection Failed: " . $conn->connect_error);
}

// Get raw POST data
$rawData = file_get_contents("php://input");

// Log the raw data for debugging
file_put_contents("debug_log.txt", "Raw Data: " . $rawData . PHP_EOL, FILE_APPEND);

$data = json_decode($rawData, true);

// Log the decoded data for debugging
file_put_contents("debug_log.txt", "Decoded Data: " . print_r($data, true) . PHP_EOL, FILE_APPEND);

// Extract data
$full_name = $data['name'] ?? '';
$email = $data['email'] ?? '';
$phone_number = $data['phone'] ?? '';
$communication = $data['communication'] ?? '';
$travelers = $data['travelers'] ?? 1;
$travel_date = $data['travel-date'] ?? '';
$tour_preferences = $data['tour-preference'] ?? '';
$accommodation = $data['accommodation'] ?? '';
$additional_notes = $data['notes'] ?? '';
$rating = $data['rating'] ?? '';
$feedback = $data['feedback'] ?? '';

// Log extracted data
file_put_contents("debug_log.txt", "Extracted Data: " . print_r([
    'full_name' => $full_name,
    'email' => $email,
    'phone_number' => $phone_number,
    'communication' => $communication,
    'travelers' => $travelers,
    'travel_date' => $travel_date,
    'tour_preferences' => $tour_preferences,
    'accommodation' => $accommodation,
    'additional_notes' => $additional_notes,
    'rating' => $rating,
    'feedback' => $feedback,
], true) . PHP_EOL, FILE_APPEND);

// Check for required fields
if (empty($full_name) || empty($email) || empty($travel_date)) {
    die("Error: Missing required fields.");
}

// Prepare the SQL query to insert data
$stmt = $conn->prepare("INSERT INTO bookings (full_name, email, phone_number, communication_preferences, travelers, travel_date, tour_preferences, accommodation_tier, additional_notes, rating, feedback) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

if (!$stmt) {
    die("SQL Error: " . $conn->error);
}

// Bind parameters (ensure correct data types)
$stmt->bind_param("ssssissssss", $full_name, $email, $phone_number, $communication, $travelers, $travel_date, $tour_preferences, $accommodation, $additional_notes, $rating, $feedback);

// Execute the query
if ($stmt->execute()) {
    echo "Success: Booking saved.";
} else {
    die("Database Error: " . $stmt->error);
}

// Close the prepared statement and connection
$stmt->close();
$conn->close();
?>
