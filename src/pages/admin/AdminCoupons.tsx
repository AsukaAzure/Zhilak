import { useState } from 'react';
import AdminLayout from './AdminLayout';
import { Search, Plus, Pencil, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useCoupons, useCreateCoupon, useUpdateCoupon, useDeleteCoupon, type Coupon } from '@/hooks/useCoupons';
import { toast } from 'sonner';

interface CouponFormData {
  code: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: string;
  is_active: boolean;
}

const AdminCoupons = () => {
  const { data: coupons, isLoading } = useCoupons();
  const createCoupon = useCreateCoupon();
  const updateCoupon = useUpdateCoupon();
  const deleteCoupon = useDeleteCoupon();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCouponId, setEditingCouponId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [formData, setFormData] = useState<CouponFormData>({
    code: '',
    discount_type: 'percentage',
    discount_value: '',
    is_active: true,
  });

  const resetForm = () => {
    setFormData({
      code: '',
      discount_type: 'percentage',
      discount_value: '',
      is_active: true,
    });
    setEditingCouponId(null);
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (coupon: Coupon) => {
    setFormData({
      code: coupon.code,
      discount_type: coupon.discount_type as 'percentage' | 'fixed',
      discount_value: coupon.discount_value.toString(),
      is_active: coupon.is_active ?? true,
    });
    setEditingCouponId(coupon.id);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.code.trim()) {
      toast.error('Coupon code is required');
      return;
    }

    if (!formData.discount_value || parseFloat(formData.discount_value) <= 0) {
      toast.error('Valid discount value is required');
      return;
    }

    try {
      const couponData = {
        code: formData.code.trim().toUpperCase(),
        discount_type: formData.discount_type,
        discount_value: parseFloat(formData.discount_value),
        is_active: formData.is_active,
      };

      if (editingCouponId) {
        await updateCoupon.mutateAsync({ id: editingCouponId, ...couponData });
        toast.success('Coupon updated successfully');
      } else {
        await createCoupon.mutateAsync(couponData);
        toast.success('Coupon created successfully');
      }

      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      toast.error('Failed to save coupon');
    }
  };

  const handleDelete = async (couponId: string) => {
    if (window.confirm('Are you sure you want to delete this coupon?')) {
      try {
        await deleteCoupon.mutateAsync(couponId);
        toast.success('Coupon deleted successfully');
      } catch (error) {
        toast.error('Failed to delete coupon');
      }
    }
  };

  const filteredCoupons = coupons?.filter((coupon) =>
    coupon.code.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl text-foreground">Coupons</h1>
            <p className="text-muted-foreground mt-1">Manage discount coupons</p>
          </div>
          <Button variant="luxury" onClick={openAddModal}>
            <Plus className="w-4 h-4 mr-2" />
            Add Coupon
          </Button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search coupons..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 luxury-input"
          />
        </div>

        {/* Coupons Table */}
        {isLoading ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">Loading coupons...</p>
          </div>
        ) : filteredCoupons.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No coupons found</p>
          </div>
        ) : (
          <div className="bg-card border border-border/50 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Code</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Discount</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Usage</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-right p-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCoupons.map((coupon) => (
                  <tr
                    key={coupon.id}
                    className="border-b border-border/50 last:border-0 hover:bg-secondary/50 transition-colors"
                  >
                    <td className="p-4">
                      <span className="text-sm font-mono text-primary">{coupon.code}</span>
                    </td>
                    <td className="p-4 text-sm text-foreground">
                      {coupon.discount_type === 'percentage'
                        ? `${coupon.discount_value}%`
                        : `$${coupon.discount_value}`}
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">
                      {coupon.usage_count || 0} uses
                    </td>
                    <td className="p-4">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${coupon.is_active
                          ? 'bg-green-500/10 text-green-500'
                          : 'bg-muted text-muted-foreground'
                          }`}
                      >
                        {coupon.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditModal(coupon)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleDelete(coupon.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Add/Edit Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-md bg-card border-border">
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl">
                {editingCouponId ? 'Edit Coupon' : 'Add New Coupon'}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Code */}
              <div className="space-y-2">
                <Label htmlFor="code" className="text-muted-foreground">
                  Coupon Code *
                </Label>
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) => setFormData((prev) => ({ ...prev, code: e.target.value.toUpperCase() }))}
                  className="luxury-input font-mono"
                  placeholder="SUMMER20"
                />
              </div>

              {/* Discount Type */}
              <div className="space-y-2">
                <Label className="text-muted-foreground">Discount Type</Label>
                <Select
                  value={formData.discount_type}
                  onValueChange={(value: 'percentage' | 'fixed') =>
                    setFormData((prev) => ({ ...prev, discount_type: value }))
                  }
                >
                  <SelectTrigger className="luxury-input">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage (%)</SelectItem>
                    <SelectItem value="fixed">Fixed Amount ($)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Discount Value */}
              <div className="space-y-2">
                <Label htmlFor="discount_value" className="text-muted-foreground">
                  Discount Value *
                </Label>
                <Input
                  id="discount_value"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.discount_value}
                  onChange={(e) => setFormData((prev) => ({ ...prev, discount_value: e.target.value }))}
                  className="luxury-input"
                  placeholder={formData.discount_type === 'percentage' ? '20' : '50.00'}
                />
              </div>

              {/* Active Toggle */}
              <div className="flex items-center justify-between">
                <Label htmlFor="is_active" className="text-muted-foreground">
                  Active
                </Label>
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, is_active: checked }))}
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="luxury"
                  className="flex-1"
                  disabled={createCoupon.isPending || updateCoupon.isPending}
                >
                  {createCoupon.isPending || updateCoupon.isPending
                    ? 'Saving...'
                    : editingCouponId
                      ? 'Update Coupon'
                      : 'Add Coupon'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminCoupons;
