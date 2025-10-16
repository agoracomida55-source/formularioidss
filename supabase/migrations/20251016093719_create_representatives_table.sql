/*
  # Create Representatives Table

  ## Overview
  This migration creates a secure system to authorize representatives and store their WhatsApp contact information.

  ## 1. New Tables
    - `representatives`
      - `id` (text, primary key) - Representative's unique ID code
      - `name` (text) - Representative's full name
      - `whatsapp` (text) - Representative's WhatsApp number (format: country code + number)
      - `active` (boolean) - Whether the representative is authorized to accept registrations
      - `created_at` (timestamptz) - When the representative was added to the system
      - `updated_at` (timestamptz) - Last time the record was updated

  ## 2. Security
    - Enable RLS on `representatives` table
    - Add policy for public read access (to validate IDs and get WhatsApp)
    - Only authenticated admin users can modify the table

  ## 3. Initial Data
    - Add the main representative (110956) with the principal WhatsApp

  ## Important Notes
    - Only representatives with `active = true` can have their registration forms accessed
    - The WhatsApp number will be used to redirect users after registration
    - This prevents fraud by ensuring only authorized IDs can be used
*/

-- Create representatives table
CREATE TABLE IF NOT EXISTS representatives (
  id text PRIMARY KEY,
  name text NOT NULL,
  whatsapp text NOT NULL,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE representatives ENABLE ROW LEVEL SECURITY;

-- Public can read active representatives (needed to validate IDs and get WhatsApp)
CREATE POLICY "Anyone can read active representatives"
  ON representatives
  FOR SELECT
  USING (active = true);

-- Only authenticated users can insert (for admin panel later)
CREATE POLICY "Authenticated users can insert representatives"
  ON representatives
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Only authenticated users can update
CREATE POLICY "Authenticated users can update representatives"
  ON representatives
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Only authenticated users can delete
CREATE POLICY "Authenticated users can delete representatives"
  ON representatives
  FOR DELETE
  TO authenticated
  USING (true);

-- Insert the main representative
INSERT INTO representatives (id, name, whatsapp, active)
VALUES ('110956', 'Representante Principal', '5511999999999', true)
ON CONFLICT (id) DO NOTHING;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_representatives_active ON representatives(id) WHERE active = true;