<?php
// Turn on error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database credentials
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "plan_your_tour";

// Create a connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get raw POST data and decode JSON
$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

// Debugging: Log the raw data received (optional)
error_log("Received JSON data: " . $rawData);

if (!$data) {
    echo json_encode(["success" => false, "message" => "Invalid JSON input"]);
    exit();
}

// Retrieve data from JSON
$full_name = $data['name'] ?? '';
$email = $data['email'] ?? '';
$phone_number = $data['phone'] ?? '';
$communication_preferences = $data['communication'] ?? '';
$travelers = $data['travelers'] ?? 1;
$travel_date = $data['travelDate'] ?? '';
$tour_preferences = $data['tourPreferences'] ?? '';
$additional_notes = $data['notes'] ?? '';
$accommodation_tier = $data['accommodation'] ?? 'No accommodation selected';

// Validate required fields
if (empty($full_name) || empty($email) || empty($travel_date) || empty($tour_preferences)) {
    echo json_encode(["success" => false, "message" => "Please fill in all required fields."]);
    exit();
}

// Prepare SQL query
$stmt = $conn->prepare("INSERT INTO bookings (full_name, email, phone_number, communication_preferences, travelers, travel_date, tour_preferences, additional_notes, accommodation_tier) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssissss", $full_name, $email, $phone_number, $communication_preferences, $travelers, $travel_date, $tour_preferences, $additional_notes, $accommodation_tier);

// Execute query
if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Booking successfully saved!"]);
} else {
    echo json_encode(["success" => false, "message" => "Error: " . $stmt->error]);
}

// Close connection
$stmt->close();
$conn->close();
?>
