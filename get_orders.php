<?php
// get_orders.php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$ordersFile = 'orders.json';

if (file_exists($ordersFile)) {
    $orders = json_decode(file_get_contents($ordersFile), true);
    
    if (is_array($orders)) {
        // Sort by date (newest first)
        usort($orders, function($a, $b) {
            return strtotime($b['date']) - strtotime($a['date']);
        });
        
        echo json_encode([
            'success' => true, 
            'orders' => $orders,
            'count' => count($orders)
        ]);
    } else {
        echo json_encode(['success' => true, 'orders' => [], 'count' => 0]);
    }
} else {
    echo json_encode(['success' => true, 'orders' => [], 'count' => 0]);
}
?>