/*
  # Enable RLS on Representatives Table

  ## Overview
  This migration enables Row Level Security on the representatives table.
  RLS was previously disabled despite having policies defined, creating a security vulnerability.

  ## Security Changes
    - Enable RLS on representatives table
    - Existing policies will automatically take effect once RLS is enabled:
      - Public users can read active representatives
      - Authenticated users can manage representatives

  ## Important Notes
    - This fixes a critical security issue where the table was publicly accessible without restrictions
    - All existing policies remain unchanged and will now be enforced
*/

ALTER TABLE representatives ENABLE ROW LEVEL SECURITY;
