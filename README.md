# Zhilak

Zhilak is a modern, feature-rich e-commerce platform built with Next.js, TypeScript, and Tailwind CSS. It provides a seamless shopping experience for users with a comprehensive admin dashboard for store management.

## Features

### For Customers
- **Product Discovery**: Browse products with detailed descriptions, images, and pricing
- **Shopping Cart**: Add, update, and remove items from your cart
- **Secure Checkout**: Streamlined checkout process
- **Order Management**: View order history and status
- **User Authentication**: Secure login and account management

### For Admins
- **Dashboard**: Overview of store performance
- **Product Management**: Create, edit, and delete products
- **Order Management**: Track and manage customer orders
- **Category Management**: Organize products into categories
- **User Management**: Manage customer accounts

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **State Management**: React Context API
- **Forms**: React Hook Form + Zod
- **Data Fetching**: React Server Components
- **Authentication**: NextAuth.js (simulated for this demo)

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd zhilak
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Project Structure

```
zhilak/
├── app/                     # Next.js App Router pages
│   ├── (customer)/          # Customer-facing routes
│   │   ├── page.tsx         # Home page
│   │   ├── products/        # Product listing
│   │   ├── cart/            # Shopping cart
│   │   └── checkout/        # Checkout process
│   ├── (admin)/             # Admin dashboard routes
│   │   ├── dashboard/       # Dashboard overview
│   │   ├── products/        # Product management
│   │   ├── orders/          # Order management
│   │   └── categories/      # Category management
│   └── api/                 # API routes
├── components/              # Reusable UI components
│   ├── ui/                  # shadcn/ui components
│   ├── customer/            # Customer-specific components
│   └── admin/               # Admin-specific components
├── lib/                     # Utility functions and helpers
├── data/                    # Mock data and constants
├── styles/                  # Global styles
└── public/                  # Static assets
```

## Development

### Running in Development Mode
```bash
npm run dev
```

The app will start on `http://localhost:3000`.

### Building for Production
```bash
npm run build
```

### Starting Production Server
```bash
npm run start
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you encounter any issues, please open an issue in the repository.
