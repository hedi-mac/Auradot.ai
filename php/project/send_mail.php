<?php
// send_email.php

// Enable CORS headers for local testing; adjust for production environments.
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight (OPTIONS) request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

// Handle POST request
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Decode JSON data from request body
    $data = json_decode(file_get_contents("php://input"), true);
    $email = $data["email"] ?? "";
    $message = $data["message"] ?? "";

    // Validate email and message content
    if (filter_var($email, FILTER_VALIDATE_EMAIL) && !empty(trim($message))) {
        // Set recipient, subject, and headers
        $to = "hedimaac@gmail.com"; // Replace with your email address
        $subject = "New Message from Contact Form";
	$headers = "From: " . $email;

        // Send email
        if (mail($to, $subject, $message, $headers)) {
            echo json_encode(["status" => "success", "message" => "Email sent successfully"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Failed to send email", "to" => $to, "subject" => $subject, "message_data" => $message]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid email or empty message"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
}
?>
