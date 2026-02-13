<?php
// upload.php

// Ensure the request is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo 'Method Not Allowed';
    exit;
}

// Ensure a file was uploaded
if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo 'No file uploaded or upload error';
    exit;
}

// Configure upload directory
$uploadDir = __DIR__ . '/profiles/images/';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

// Sanitize filename
$originalName = basename($_FILES['file']['name']);
$filename = preg_replace('/[^a-zA-Z0-9._-]/', '_', $originalName);
$destination = $uploadDir . $filename;

// Move uploaded file to destination
if (!move_uploaded_file($_FILES['file']['tmp_name'], $destination)) {
    http_response_code(500);
    echo 'Failed to write file to filesystem';
    exit;
}

http_response_code(200);
echo 'File uploaded successfully';
?>