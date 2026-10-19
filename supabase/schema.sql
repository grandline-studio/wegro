-- ==============================================================================
-- WeGro Finance — Production Database Schema (Supabase / PostgreSQL)
-- ==============================================================================

-- 1. Site Content (JSON Document Storage with versioning)
CREATE TABLE IF NOT EXISTS site_content (
  id TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by TEXT
);

-- 2. Complaint Board Data (SEBI Statutory Filing Data)
CREATE TABLE IF NOT EXISTS complaint_data (
  id TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  month_ending TEXT NOT NULL,
  is_draft BOOLEAN DEFAULT FALSE,
  last_published_at TIMESTAMPTZ,
  published_by TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Policy Pages
CREATE TABLE IF NOT EXISTS policy_pages (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  last_updated TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Annual Compliance Audit Reports
CREATE TABLE IF NOT EXISTS audit_reports (
  id TEXT PRIMARY KEY,
  financial_year TEXT NOT NULL,
  status TEXT NOT NULL,
  report_url TEXT,
  adverse_findings TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Investor Callback Leads (Encrypted PII at rest)
CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  product_service TEXT,
  message TEXT,
  pan TEXT,
  dob TEXT,
  consent_given BOOLEAN DEFAULT FALSE,
  consent_timestamp TIMESTAMPTZ,
  status TEXT DEFAULT 'New', -- 'New' | 'Contacted' | 'Closed'
  internal_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Platform Settings
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Admin Users (Bcrypt password hashes, must_change_password enforcement)
CREATE TABLE IF NOT EXISTS admin_users (
  id TEXT PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  must_change_password BOOLEAN DEFAULT TRUE,
  role TEXT DEFAULT 'superadmin',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Immutable Audit Log Trail
CREATE TABLE IF NOT EXISTS audit_log (
  id TEXT PRIMARY KEY,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  user_id TEXT NOT NULL,
  username TEXT NOT NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT,
  summary TEXT NOT NULL,
  changes JSONB,
  ip_address TEXT
);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_complaint_data_month ON complaint_data(month_ending);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_log_timestamp ON audit_log(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_audit_log_user ON audit_log(user_id);

-- Row Level Security (RLS) Enablement
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE complaint_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE policy_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

-- Public Read Policies for Public Site Content
CREATE POLICY "Public read site_content" ON site_content FOR SELECT USING (true);
CREATE POLICY "Public read published complaint_data" ON complaint_data FOR SELECT USING (is_draft = false);
CREATE POLICY "Public read policy_pages" ON policy_pages FOR SELECT USING (true);
CREATE POLICY "Public read audit_reports" ON audit_reports FOR SELECT USING (true);
CREATE POLICY "Public insert leads" ON leads FOR INSERT WITH CHECK (true);

-- Service Role Full Access (Admin Dashboard via Backend / Service Role Key)
CREATE POLICY "Service role full access site_content" ON site_content FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access complaint_data" ON complaint_data FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access policy_pages" ON policy_pages FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access audit_reports" ON audit_reports FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access leads" ON leads FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access settings" ON settings FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access admin_users" ON admin_users FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access audit_log" ON audit_log FOR ALL USING (auth.role() = 'service_role');
