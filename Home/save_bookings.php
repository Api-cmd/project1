<?php
// Turn on error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database credentials
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "website_data";

// Create a connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get raw POST data
$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

// Retrieve data from JSON
$full_name = $data['name'] ?? '';
$email = $data['email'] ?? '';
$phone_number = $data['phone'] ?? '';
$communication = $data['communication'] ?? ''; // Get communication preferences
$tour_package = $data['tour-package'] ?? '';
$travelers = $data['travelers'] ?? 1;
$travel_date = $data['travel-date'] ?? '';
$accommodation = $data['accommodation'] ?? ''; // Get accommodation selection (string)

// Process communication preferences if it's an array or a string
if (is_array($communication)) {
    $communication = implode(", ", $communication); // Convert array to comma-separated string
}

// Validate required fields
if (empty($full_name) || empty($email) || empty($tour_package) || empty($travel_date)) {
    die("Please fill in all required fields.");
}

// Prepare SQL query
$stmt = $conn->prepare("INSERT INTO bookings (full_name, email, phone_number, communication_preferences, tour_package, travelers, travel_date, accommodation_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sssssiss", $full_name, $email, $phone_number, $communication, $tour_package, $travelers, $travel_date, $accommodation);

// Execute query
if ($stmt->execute()) {
    echo "Booking successfully saved!";
} else {
    echo "Error: " . $stmt->error;
}

// Close connection
$stmt->close();
$conn->close();
