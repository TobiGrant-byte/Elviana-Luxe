<?php
// save_order.php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the POST data
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    // Validate data
    if (!isset($data['customer']) || !isset($data['items'])) {
        echo json_encode(['success' => false, 'error' => 'Invalid data']);
        exit;
    }
    
    // Create order object
    $order = [
        'id' => 'ELV' . time() . rand(100, 999),
        'date' => date('Y-m-d H:i:s'),
        'customer' => $data['customer'],
        'items' => $data['items'],
        'total' => $data['total'],
        'status' => 'pending'
    ];
    
    // Get existing orders
    $ordersFile = 'orders.json';
    $orders = [];
    
    if (file_exists($ordersFile)) {
        $orders = json_decode(file_get_contents($ordersFile), true);
        if (!is_array($orders)) {
            $orders = [];
        }
    }
    
    // Add new order
    $orders[] = $order;
    
    // Save to file
    if (file_put_contents($ordersFile, json_encode($orders, JSON_PRETTY_PRINT))) {
        echo json_encode([
            'success' => true, 
            'order_id' => $order['id'],
            'message' => 'Order saved successfully'
        ]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Failed to save order']);
    }
    
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid request method']);
}
?>