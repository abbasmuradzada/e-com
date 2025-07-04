export interface OrderResponse {
    orderId: string;
    total: string;
    status: 'PENDING' | 'COMPLETED';
    paymentId: string;
}
