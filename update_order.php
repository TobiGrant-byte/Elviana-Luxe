<?php
// update_order.php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    if (!isset($data['order_id']) || !isset($data['status'])) {
        echo json_encode(['success' => false, 'error' => 'Missing data']);
        exit;
    }
    
    $ordersFile = 'orders.json';
    
    if (!file_exists($ordersFile)) {
        echo json_encode(['success' => false, 'error' => 'No orders file']);
        exit;
    }
    
    $orders = json_decode(file_get_contents($ordersFile), true);
    
    // Find and update order
    $updated = false;
    foreach ($orders as &$order) {
        if ($order['id'] === $data['order_id']) {
            $order['status'] = $data['status'];
            $updated = true;
            break;
        }
    }
    
    if ($updated && file_put_contents($ordersFile, json_encode($orders, JSON_PRETTY_PRINT))) {
        echo json_encode(['success' => true, 'message' => 'Order updated']);
    } else {
        echo json_encode(['success' => false, 'error' => 'Order not found or update failed']);
    }
    
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid request']);
}
?>