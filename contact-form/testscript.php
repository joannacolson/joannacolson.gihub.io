<?php
// To address
$to = "hello@joannacolson.com";

// The subject
$subject = "My test subject";

// The message
$message = "Line 1\r\nLine 2\r\nLine 3";

// In case any of our lines are larger than 70 characters, we should use wordwrap()
$message = wordwrap($message, 70, "\r\n");

// Additional headers. When sending an email, it must contain a From header
$headers = 'From: hello@joannacolson.com' . "\r\n" .
    'Reply-To: hello@joannacolson.com' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

// Send
mail($to, $subject, $message, $headers);
?>
