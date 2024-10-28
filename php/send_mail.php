<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';
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

    // Check if email and message are provided
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["error" => "Invalid email address."]);
        exit;
    }

    // Create a new PHPMailer instance
    $mail = new PHPMailer(true);

    try {  
        // Server configuration
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com'; // Specify the SMTP server
        $mail->SMTPAuth = true;
        $mail->Username = 'hedimaac@gmail.com'; // Your email address
        $mail->Password = 'eaegdkvfpqobdcmp'; // Your email password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587; // Connection port

        // Recipients
        $mail->setFrom('hedimaac@gmail.com', 'Mailer');
        $mail->addAddress($email); // Use the email from the JSON data

        // Email content
        $mail->isHTML(true);
        $mail->Subject = 'Test Email';
        $mail->Body    = $message; // Use the message from the JSON data
        $mail->AltBody = strip_tags($message); // Plain text alternative

        $mail->send();
        echo json_encode(["status" => "success", "message" => "Email sent successfully"]);
    } catch (Exception $e) {
        echo json_encode(["status" => "error", "message" => "Failed to send email", "to" => $to, "subject" => $subject, "message_data" => $message]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method. Please send a POST request."]);
}
?>
