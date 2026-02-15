-- Create payment method and status types
CREATE TYPE public.payment_method AS ENUM ('cod', 'online');
CREATE TYPE public.payment_status AS ENUM ('pending', 'paid', 'failed');

-- Add columns to orders table
ALTER TABLE public.orders 
ADD COLUMN payment_method payment_method NOT NULL DEFAULT 'cod',
ADD COLUMN payment_status payment_status NOT NULL DEFAULT 'pending';

-- Add comment to document the columns
COMMENT ON COLUMN public.orders.payment_method IS 'Payment method: cod or online';
COMMENT ON COLUMN public.orders.payment_status IS 'Payment status: pending, paid, or failed';
