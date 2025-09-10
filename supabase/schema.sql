-- Create cash flow forecast table
CREATE TABLE IF NOT EXISTS cash_flow_forecast (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date DATE NOT NULL,
  net_cash_flow DECIMAL(10,2) NOT NULL,
  runway_days INTEGER NOT NULL,
  inflow DECIMAL(10,2) NOT NULL,
  outflow DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create RLS policies
-- Anyone can read forecasted data
ALTER TABLE cash_flow_forecast ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read cash_flow_forecast data" 
ON cash_flow_forecast FOR SELECT 
USING (true);

-- Only authenticated users can modify data
CREATE POLICY "Only authenticated users can insert cash_flow_forecast" 
ON cash_flow_forecast FOR INSERT 
TO authenticated
USING (true);

-- Sample data insertion
INSERT INTO cash_flow_forecast (date, net_cash_flow, runway_days, inflow, outflow)
VALUES 
  ('2025-08-01', 150000, 90, 200000, 50000),
  ('2025-08-08', 155000, 92, 210000, 55000),
  ('2025-08-15', 160000, 94, 215000, 55000),
  ('2025-08-22', 158000, 93, 208000, 50000),
  ('2025-08-29', 162000, 95, 220000, 58000),
  ('2025-09-05', 167000, 97, 225000, 58000),
  ('2025-09-09', 172000, 99, 230000, 58000)
ON CONFLICT (date) DO NOTHING;
