<?php
// Load composer autoloader
require_once(__DIR__ . '/vendor/autoload.php');

// Instance Pico
$pico = new Pico(
    __DIR__,    // root dir
    'config/',  // config dir
    'plugins/', // plugins dir
    'themes/'   // themes dir
);

try {
    // Run Pico
    echo $pico->run();
} catch (Exception $e) {
    // Log the error
    error_log($e->getMessage());
    // Display a user-friendly message
    echo "Sorry, there was an error processing the page. Please try again later.";
}
