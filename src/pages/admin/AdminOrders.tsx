import AdminLayout from './AdminLayout';
import { Search, Eye } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface Order {
  id: string;
  customer: string;
  email: string;
  phone: string;
  address: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  date: string;
}

const mockOrders: Order[] = [
  {
    id: 'ORD-1001',
    customer: 'John Doe',
    email: 'john@example.com',
    phone: '+1 234 567 8900',
    address: '123 Main St, New York, NY 10001',
    items: [
      { name: 'Noir Absolu', quantity: 1, price: 450 },
      { name: 'Crystal Atomizer', quantity: 1, price: 280 },
    ],
    total: 730,
    status: 'processing',
    date: '2024-04-15',
  },
  {
    id: 'ORD-1002',
    customer: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1 987 654 3210',
    address: '456 Oak Ave, Los Angeles, CA 90001',
    items: [
      { name: 'Golden Elixir', quantity: 2, price: 520 },
    ],
    total: 1040,
    status: 'shipped',
    date: '2024-04-14',
  },
  {
    id: 'ORD-1003',
    customer: 'Robert Johnson',
    email: 'robert@example.com',
    phone: '+1 555 123 4567',
    address: '789 Pine Rd, Chicago, IL 60601',
    items: [
      { name: 'Silk Noir Robe', quantity: 1, price: 890 },
      { name: 'Leather Travel Case', quantity: 1, price: 320 },
    ],
    total: 1210,
    status: 'pending',
    date: '2024-04-16',
  },
];

const statusColors = {
  pending: 'bg-yellow-500/10 text-yellow-500',
  processing: 'bg-blue-500/10 text-blue-500',
  shipped: 'bg-purple-500/10 text-purple-500',
  delivered: 'bg-green-500/10 text-green-500',
};

const AdminOrders = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="font-serif text-3xl text-foreground">Orders</h1>
          <p className="text-muted-foreground mt-1">View and manage customer orders</p>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search orders..."
            className="pl-10 luxury-input"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Orders List */}
          <div className="lg:col-span-2 space-y-4">
            {mockOrders.map((order) => (
              <div
                key={order.id}
                className="bg-card border border-border/50 p-6 space-y-4 hover:border-primary/30 transition-colors cursor-pointer"
                onClick={() => setSelectedOrder(order)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.customer}</p>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full ${statusColors[order.status]}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{order.items.length} item(s)</span>
                  <span className="text-primary font-medium">${order.total}</span>
                </div>
                <p className="text-xs text-muted-foreground">{order.date}</p>
              </div>
            ))}
          </div>

          {/* Order Details */}
          <div className="lg:col-span-1">
            {selectedOrder ? (
              <div className="sticky top-8 bg-card border border-border/50 p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-xl text-foreground">Order Details</h3>
                  <span className={`text-xs px-3 py-1 rounded-full ${statusColors[selectedOrder.status]}`}>
                    {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Order ID</p>
                    <p className="text-sm text-foreground">{selectedOrder.id}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Customer</p>
                    <p className="text-sm text-foreground">{selectedOrder.customer}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Email</p>
                    <p className="text-sm text-foreground">{selectedOrder.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Phone</p>
                    <p className="text-sm text-foreground">{selectedOrder.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Address</p>
                    <p className="text-sm text-foreground">{selectedOrder.address}</p>
                  </div>
                </div>

                <div className="luxury-divider !mx-0 !w-full" />

                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Items</p>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {item.name} × {item.quantity}
                        </span>
                        <span className="text-foreground">${item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="luxury-divider !mx-0 !w-full" />

                <div className="flex justify-between">
                  <span className="text-foreground font-medium">Total</span>
                  <span className="text-primary text-lg font-medium">${selectedOrder.total}</span>
                </div>
              </div>
            ) : (
              <div className="bg-card border border-border/50 p-6 text-center">
                <Eye className="w-8 h-8 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground text-sm">Select an order to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;
