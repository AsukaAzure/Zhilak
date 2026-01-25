import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { db } from '@/lib/supabase';
import { toast } from 'sonner';
import { useAuth } from './useAuth';

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string | null;
  product_name: string;
  product_price: number;
  quantity: number;
}

export interface Order {
  id: string;
  user_id: string | null;
  status: 'pending' | 'completed';
  full_name: string;
  phone: string;
  email: string;
  shipping_address: string;
  subtotal: number;
  discount: number;
  total: number;
  coupon_id: string | null;
  created_at: string;
  order_items?: OrderItem[];
}

export const useOrders = (userId?: string) => {
  const { isAdmin } = useAuth();
  
  return useQuery({
    queryKey: ['orders', userId, isAdmin],
    queryFn: async () => {
      let query = db
        .from('orders')
        .select(`
          *,
          order_items(*)
        `)
        .order('created_at', { ascending: false });
      
      if (userId && !isAdmin) {
        query = query.eq('user_id', userId);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data as Order[];
    },
    enabled: !!userId || isAdmin,
  });
};

export const useAdminOrders = () => {
  return useQuery({
    queryKey: ['admin-orders'],
    queryFn: async () => {
      const { data, error } = await db
        .from('orders')
        .select(`
          *,
          order_items(*)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Order[];
    },
  });
};

export const useUserOrders = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  return useQuery({
    queryKey: ['user-orders', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await db
        .from('orders')
        .select(`
          *,
          order_items(*)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Order[];
    },
    enabled: !!user,
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ 
      order, 
      items 
    }: { 
      order: Omit<Order, 'id' | 'created_at' | 'order_items'>; 
      items: { product_id: string | null; product_name: string; product_price: number; quantity: number }[] 
    }) => {
      // Create order
      const { data: orderData, error: orderError } = await db
        .from('orders')
        .insert(order)
        .select()
        .single();
      
      if (orderError) throw orderError;
      if (!orderData) throw new Error('Failed to create order');
      
      // Create order items
      const orderItems = items.map(item => ({
        ...item,
        order_id: orderData.id,
      }));
      
      const { error: itemsError } = await db
        .from('order_items')
        .insert(orderItems);
      
      if (itemsError) throw itemsError;
      
      return orderData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['user-orders'] });
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
    },
    onError: (error: Error) => {
      toast.error('Failed to create order: ' + error.message);
    },
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ orderId, status }: { orderId: string; status: 'pending' | 'completed' }) => {
      const { data, error } = await db
        .from('orders')
        .update({ status })
        .eq('id', orderId)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      // Immediately invalidate all order queries for real-time sync
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['user-orders'] });
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
    },
    onError: (error: Error) => {
      toast.error('Failed to update order: ' + error.message);
    },
  });
};
