import AdminLayout from './AdminLayout';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', orders: 5, joined: '2024-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', orders: 12, joined: '2024-02-20' },
  { id: 3, name: 'Robert Johnson', email: 'robert@example.com', orders: 3, joined: '2024-03-10' },
  { id: 4, name: 'Emily Davis', email: 'emily@example.com', orders: 8, joined: '2024-03-25' },
  { id: 5, name: 'Michael Brown', email: 'michael@example.com', orders: 1, joined: '2024-04-01' },
];

const AdminUsers = () => {
  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl text-foreground">Users</h1>
            <p className="text-muted-foreground mt-1">Manage registered user accounts</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            className="pl-10 luxury-input"
          />
        </div>

        {/* Users Table */}
        <div className="bg-card border border-border/50 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Name</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Email</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Orders</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Joined</th>
              </tr>
            </thead>
            <tbody>
              {mockUsers.map((user) => (
                <tr key={user.id} className="border-b border-border/50 last:border-0 hover:bg-secondary/50 transition-colors">
                  <td className="p-4 text-sm text-foreground">{user.name}</td>
                  <td className="p-4 text-sm text-muted-foreground">{user.email}</td>
                  <td className="p-4 text-sm text-foreground">{user.orders}</td>
                  <td className="p-4 text-sm text-muted-foreground">{user.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
