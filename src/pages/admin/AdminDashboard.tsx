import AdminLayout from './AdminLayout';
import { Users, ShoppingBag, Package, DollarSign } from 'lucide-react';

const stats = [
  { name: 'Total Users', value: '1,234', icon: Users, change: '+12%' },
  { name: 'Total Orders', value: '567', icon: ShoppingBag, change: '+8%' },
  { name: 'Products', value: '89', icon: Package, change: '+3' },
  { name: 'Revenue', value: '$45,678', icon: DollarSign, change: '+15%' },
];

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="font-serif text-3xl text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome to Maison Noir admin panel</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.name}
                className="bg-card border border-border/50 p-6 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <Icon className="w-5 h-5 text-primary" />
                  <span className="text-xs text-primary">{stat.change}</span>
                </div>
                <div>
                  <p className="text-3xl font-serif text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.name}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <div className="bg-card border border-border/50 p-6">
            <h3 className="font-serif text-xl text-foreground mb-4">Recent Orders</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
                  <div>
                    <p className="text-sm text-foreground">Order #{1000 + i}</p>
                    <p className="text-xs text-muted-foreground">Customer Name</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-primary">${(Math.random() * 500 + 100).toFixed(0)}</p>
                    <p className="text-xs text-muted-foreground">Processing</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Low Stock Alert */}
          <div className="bg-card border border-border/50 p-6">
            <h3 className="font-serif text-xl text-foreground mb-4">Low Stock Alert</h3>
            <div className="space-y-4">
              {[
                { name: 'Cèdre Mystique', stock: 5 },
                { name: 'Velvet Night', stock: 8 },
                { name: 'Cashmere Wrap', stock: 3 },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
                  <p className="text-sm text-foreground">{item.name}</p>
                  <span className="text-xs px-2 py-1 bg-destructive/10 text-destructive rounded">
                    {item.stock} left
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
