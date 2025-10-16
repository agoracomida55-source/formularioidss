/*
  # Add RLS Policies for Representatives Table

  ## Overview
  This migration adds the necessary Row Level Security policies to allow public read access
  to active representatives, which is required for the registration form to validate IDs.

  ## Changes
    1. Create policy for public SELECT access to active representatives
    2. Create policies for authenticated users to manage representatives

  ## Security
    - Public users can only read active representatives (needed for form validation)
    - Only authenticated users can insert, update, or delete representatives
    - RLS is already enabled on the table

  ## Important Notes
    - Without these policies, the table is completely locked down even though RLS is enabled
    - This was causing the "access blocked" error on the registration form
*/

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can read active representatives" ON representatives;
DROP POLICY IF EXISTS "Authenticated users can insert representatives" ON representatives;
DROP POLICY IF EXISTS "Authenticated users can update representatives" ON representatives;
DROP POLICY IF EXISTS "Authenticated users can delete representatives" ON representatives;

-- Allow anyone to read active representatives (needed for form validation)
CREATE POLICY "Anyone can read active representatives"
  ON representatives
  FOR SELECT
  USING (active = true);

-- Only authenticated users can insert representatives
CREATE POLICY "Authenticated users can insert representatives"
  ON representatives
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Only authenticated users can update representatives
CREATE POLICY "Authenticated users can update representatives"
  ON representatives
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Only authenticated users can delete representatives
CREATE POLICY "Authenticated users can delete representatives"
  ON representatives
  FOR DELETE
  TO authenticated
  USING (true);
