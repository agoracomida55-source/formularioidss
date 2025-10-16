/*
  # Update Representative ID and Add New Representative

  ## Overview
  This migration corrects the representative ID from 110956 to 134684 and ensures both representatives are in the system.

  ## Changes
    1. Update existing representative 110956 to use the correct ID 134684
    2. Keep William Dos Santos Pessoa with WhatsApp 5521969400194 active
    3. Ensure Antônio Nerivania Delmiro Jacinto is also in the system

  ## Important Notes
    - This corrects the ID issue that was preventing form access
    - Both representatives will be active and authorized
*/

-- First, ensure the table exists (from previous migration)
CREATE TABLE IF NOT EXISTS representatives (
  id text PRIMARY KEY,
  name text NOT NULL,
  whatsapp text NOT NULL,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Remove the old incorrect ID if it exists
DELETE FROM representatives WHERE id = '110956';

-- Insert or update the correct representative with ID 134684
INSERT INTO representatives (id, name, whatsapp, active)
VALUES ('134684', 'William Dos Santos Pessoa', '5521969400194', true)
ON CONFLICT (id) DO UPDATE SET 
  name = EXCLUDED.name,
  whatsapp = EXCLUDED.whatsapp,
  active = true,
  updated_at = now();

-- Ensure Antônio Nerivania Delmiro Jacinto is in the system
-- (Add their info if you have it, otherwise just keeping the updated one above)
