import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { type Order, type OrderItem } from '@/hooks/useOrders';

interface OrderDetailsProps {
    order: Order;
    onStatusChange: (orderId: string, newStatus: 'pending' | 'completed') => void;
    statusColors: Record<string, string>;
    formatPrice: (price: number) => string;
}

const OrderDetails = ({ order, onStatusChange, statusColors, formatPrice }: OrderDetailsProps) => {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h3 className="font-serif text-xl text-foreground">Order Details</h3>
                <Select
                    value={order.status}
                    onValueChange={(value: 'pending' | 'completed') =>
                        onStatusChange(order.id, value)
                    }
                >
                    <SelectTrigger className={`w-full sm:w-32 ${statusColors[order.status]}`}>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-4">
                <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                        Order ID
                    </p>
                    <p className="text-sm text-foreground font-mono">
                        {order.id.slice(0, 8).toUpperCase()}
                    </p>
                </div>
                <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                        Customer
                    </p>
                    <p className="text-sm text-foreground">{order.full_name}</p>
                </div>
                <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                        Email
                    </p>
                    <p className="text-sm text-foreground break-all">{order.email}</p>
                </div>
                <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                        Phone
                    </p>
                    <p className="text-sm text-foreground">{order.phone}</p>
                </div>
                <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                        Address
                    </p>
                    <p className="text-sm text-foreground">{order.shipping_address}</p>
                </div>
            </div>

            <div className="luxury-divider !mx-0 !w-full" />

            <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
                    Items
                </p>
                <div className="space-y-3">
                    {order.order_items?.map((item: OrderItem, index: number) => (
                        <div key={index} className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                                {item.product_name} × {item.quantity}
                            </span>
                            <span className="text-foreground">
                                {formatPrice(item.product_price * item.quantity)}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="luxury-divider !mx-0 !w-full" />

            {order.discount && order.discount > 0 && (
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">{formatPrice(order.subtotal)}</span>
                </div>
            )}

            {order.discount && order.discount > 0 && (
                <div className="flex justify-between text-sm text-green-500">
                    <span>Discount</span>
                    <span>-{formatPrice(order.discount)}</span>
                </div>
            )}

            <div className="flex justify-between">
                <span className="text-foreground font-medium">Total</span>
                <span className="text-primary text-lg font-medium">{formatPrice(order.total)}</span>
            </div>
        </div>
    );
};

export default OrderDetails;
