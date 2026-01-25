import { useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { Search, Eye } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useAdminOrders, useUpdateOrderStatus } from '@/hooks/useOrders';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const statusColors = {
  pending: 'bg-yellow-500/10 text-yellow-500',
  completed: 'bg-green-500/10 text-green-500',
};

const AdminOrders = () => {
  const queryClient = useQueryClient();
  const { data: orders, isLoading } = useAdminOrders();
  const updateOrderStatus = useUpdateOrderStatus();
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedOrder = orders?.find((o) => o.id === selectedOrderId);

  const filteredOrders = orders?.filter((order) =>
    order.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.id.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  // Real-time subscription for order updates
  useEffect(() => {
    const channel = supabase
      .channel('admin-orders-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders',
        },
        () => {
          // Invalidate and refetch orders when any change occurs
          queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  const handleStatusChange = async (orderId: string, newStatus: 'pending' | 'completed') => {
    try {
      await updateOrderStatus.mutateAsync({ orderId, status: newStatus });
      toast.success('Order status updated');
    } catch (error) {
      toast.error('Failed to update order status');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <AdminLayout>
      <div className="space-y-6 md:space-y-8">
        {/* Header */}
        <div>
          <h1 className="font-serif text-2xl md:text-3xl text-foreground">Orders</h1>
          <p className="text-muted-foreground mt-1 text-sm md:text-base">View and manage customer orders</p>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 luxury-input"
          />
        </div>

        {isLoading ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">Loading orders...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No orders found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Orders List */}
            <div className="lg:col-span-2 space-y-4">
              {filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className={`bg-card border border-border/50 p-4 md:p-6 space-y-3 md:space-y-4 hover:border-primary/30 transition-colors cursor-pointer ${
                    selectedOrderId === order.id ? 'border-primary/50' : ''
                  }`}
                  onClick={() => setSelectedOrderId(order.id)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <p className="font-medium text-foreground">
                        {order.id.slice(0, 8).toUpperCase()}
                      </p>
                      <p className="text-sm text-muted-foreground">{order.full_name}</p>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full w-fit ${statusColors[order.status]}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {(order as any).order_items?.length || 0} item(s)
                    </span>
                    <span className="text-primary font-medium">{formatPrice(order.total)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{formatDate(order.created_at)}</p>
                </div>
              ))}
            </div>

            {/* Order Details */}
            <div className="lg:col-span-1">
              {selectedOrder ? (
                <div className="sticky top-8 bg-card border border-border/50 p-4 md:p-6 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h3 className="font-serif text-xl text-foreground">Order Details</h3>
                    <Select
                      value={selectedOrder.status}
                      onValueChange={(value: 'pending' | 'completed') =>
                        handleStatusChange(selectedOrder.id, value)
                      }
                    >
                      <SelectTrigger className={`w-full sm:w-32 ${statusColors[selectedOrder.status]}`}>
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
                        {selectedOrder.id.slice(0, 8).toUpperCase()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                        Customer
                      </p>
                      <p className="text-sm text-foreground">{selectedOrder.full_name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                        Email
                      </p>
                      <p className="text-sm text-foreground break-all">{selectedOrder.email}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                        Phone
                      </p>
                      <p className="text-sm text-foreground">{selectedOrder.phone}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                        Address
                      </p>
                      <p className="text-sm text-foreground">{selectedOrder.shipping_address}</p>
                    </div>
                  </div>

                  <div className="luxury-divider !mx-0 !w-full" />

                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
                      Items
                    </p>
                    <div className="space-y-3">
                      {(selectedOrder as any).order_items?.map((item: any, index: number) => (
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

                  {selectedOrder.discount && selectedOrder.discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="text-foreground">{formatPrice(selectedOrder.subtotal)}</span>
                    </div>
                  )}

                  {selectedOrder.discount && selectedOrder.discount > 0 && (
                    <div className="flex justify-between text-sm text-green-500">
                      <span>Discount</span>
                      <span>-{formatPrice(selectedOrder.discount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-foreground font-medium">Total</span>
                    <span className="text-primary text-lg font-medium">{formatPrice(selectedOrder.total)}</span>
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
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;
