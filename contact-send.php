<?php
// Handles the contact form; returns JSON for fetch(), or redirects without JS.
$to = 'design@jonwretlind.com';
$isAjax = ($_SERVER['HTTP_X_REQUESTED_WITH'] ?? '') === 'XMLHttpRequest';

function respond($ok, $msg, $isAjax, $code = 200) {
    if ($isAjax) {
        http_response_code($code);
        header('Content-Type: application/json');
        echo json_encode(['ok' => $ok, 'message' => $msg]);
    } else {
        header('Content-Type: text/plain; charset=utf-8');
        http_response_code($code);
        echo $msg;
    }
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') respond(false, 'Invalid request.', $isAjax, 405);
if (!empty($_POST['website'])) respond(true, 'Thanks! Your message was sent.', $isAjax); // honeypot

$name = trim(preg_replace('/[\r\n]+/', ' ', $_POST['name'] ?? ''));
$email = trim($_POST['email'] ?? '');
$message = trim($_POST['message'] ?? '');

if ($name === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(false, 'Please fill in your name, a valid email and a message.', $isAjax, 422);
}
if (strlen($name) > 100 || strlen($message) > 5000) respond(false, 'Message too long.', $isAjax, 422);

$subject = 'Website contact from ' . $name;
$body = "Name: $name\nEmail: $email\n\n$message\n";
$headers = [
    'From' => 'Website <' . $to . '>',
    'Reply-To' => $name . ' <' . $email . '>',
    'Content-Type' => 'text/plain; charset=UTF-8',
];
$sent = @mail($to, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, $headers);
respond($sent, $sent ? 'Thanks! Your message was sent.' : 'Sorry, the message could not be sent. Please email me directly.', $isAjax, $sent ? 200 : 500);