<?php
// delete_order.php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    if (!isset($data['order_id'])) {
        echo json_encode(['success' => false, 'error' => 'Missing order ID']);
        exit;
    }
    
    $ordersFile = 'orders.json';
    
    if (!file_exists($ordersFile)) {
        echo json_encode(['success' => false, 'error' => 'No orders file']);
        exit;
    }
    
    $orders = json_decode(file_get_contents($ordersFile), true);
    $originalCount = count($orders);
    
    // Filter out the order to delete
    $newOrders = array_filter($orders, function($order) use ($data) {
        return $order['id'] !== $data['order_id'];
    });
    
    // Reset array keys
    $newOrders = array_values($newOrders);
    
    if (count($newOrders) < $originalCount && file_put_contents($ordersFile, json_encode($newOrders, JSON_PRETTY_PRINT))) {
        echo json_encode([
            'success' => true, 
            'message' => 'Order deleted',
            'remaining' => count($newOrders)
        ]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Order not found or delete failed']);
    }
    
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid request']);
}
?>