<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if the required fields are set
    if (isset($_POST['name'], $_POST['email'], $_POST['start_date'], $_POST['group_size'], $_POST['communication'])) {
        
        // Get form data
        $name = $_POST['name'];
        $email = $_POST['email'];
        $start_date = $_POST['start_date'];
        $group_size = $_POST['group_size'];
        $communication_methods = implode(', ', $_POST['communication']); // Store as a comma-separated string
        $accommodation = $_POST['accommodation_type'] ?? ''; // Optional
        $special_requests = $_POST['special_requests'] ?? ''; // Optional
        
        // Get package details (hidden fields)
        $package_name = $_POST['package_name'] ?? ''; // Hidden input
        $price = $_POST['package_price'] ?? ''; // Hidden input for price
        
        // Combine country code and phone number
        $country_code = $_POST['country_code'] ?? ''; // Optional
        $phone = $_POST['phone'] ?? ''; // Optional
        $whatsapp_number = $country_code . ' ' . $phone;

        // Database connection details
        $servername = "localhost";
        $username = "root"; // Change to your database username
        $password = ""; // Change to your database password
        $dbname = "plan_your_tour"; // Change to your database name

        try {
            // Create a PDO connection
            $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // SQL query to insert form data into the database
            $stmt = $conn->prepare("INSERT INTO trip_requests (name, email, start_date, group_size, communication_methods, whatsapp_number, accommodation, special_requests, package_name, price, created_at)
                                    VALUES (:name, :email, :start_date, :group_size, :communication_methods, :whatsapp_number, :accommodation, :special_requests, :package_name, :price, NOW())");

            // Bind parameters to prevent SQL injection
            $stmt->bindParam(':name', $name);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':start_date', $start_date);
            $stmt->bindParam(':group_size', $group_size);
            $stmt->bindParam(':communication_methods', $communication_methods);
            $stmt->bindParam(':whatsapp_number', $whatsapp_number);
            $stmt->bindParam(':accommodation', $accommodation);
            $stmt->bindParam(':special_requests', $special_requests);
            $stmt->bindParam(':package_name', $package_name);
            $stmt->bindParam(':price', $price);

            // Execute the query
            $stmt->execute();
            
            // Return a success message in JSON format
            echo json_encode(['success' => true, 'message' => 'Request submitted successfully!']);
        } catch (PDOException $e) {
            echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
        }

        // Close connection
        $conn = null;
    } else {
        echo json_encode(['success' => false, 'message' => 'Required fields are missing.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
?>
