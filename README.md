# 🏛️ WeGro Finance — Secure Institutional Governance & Admin Dashboard

> **SEBI-Regulated Research Analyst & Investment Advisory Portal**  
> SEBI Registration No.: `INH000014289` | BSE Membership No.: `6782` | CIN: `U67190MH2023PTC402198`

---

## ⚠️ CRITICAL SECURITY NOTICE — DEFAULT CREDENTIALS

> **IMPORTANT:** The default credentials below are provided **STRICTLY FOR LOCAL DEVELOPMENT AND TESTING**.
> 
> - **Default Admin ID:** `admin`
> - **Default Password:** `wegro@123`
>
> On first login, the system enforces a mandatory password change screen (`mustChangePassword: true`). **You must set strong environment variables (`ADMIN_ID`, `ADMIN_PASSWORD`, `ADMIN_JWT_SECRET`) and change the administrative credentials before deploying to a live production environment.**

---

## 📖 Table of Contents

1. [Architecture & Tech Stack](#architecture--tech-stack)
2. [Content Model & Zero-Visual-Regression Guarantee](#content-model)
3. [Local Setup & Quickstart](#local-setup--quickstart)
4. [Environment Variables Reference](#environment-variables)
5. [Storage Adapters: Local JSON vs. Supabase](#storage-adapters)
6. [Deploying to Vercel](#deploying-to-vercel)
7. [Connecting Supabase (PostgreSQL)](#connecting-supabase)
8. [Non-Technical Client User Guide](#client-guide)
9. [Content Model Hierarchy Map](#content-map)

---

<a name="architecture--tech-stack"></a>
## 1. Architecture & Tech Stack

The application is structured into two completely isolated environments:
1. **Public Site (`/`, `/about`, `/services`, `/pricing`, `/complaints`, `/contact`, `/legal/*`):**
   - High-performance, SEO-optimized public portal.
   - Dynamic data integration powered by `ContentProvider` and `useSiteContent()` / `useComplaintData()`.
   - Layout, typography, and styling remain strictly locked to maintain corporate brand fidelity.
2. **Institutional Admin Portal (`/admin`):**
   - Cryptographically secured with JOSE JWT session tokens (2-hour idle timeout).
   - Rate-limited login (5 failed attempts per 15-minute sliding window).
   - Audit logging of every change (who, when, previous state, new state).
   - Protected with `noindex, nofollow` to prevent search engine indexing.

---

<a name="content-model"></a>
## 2. Content Model & Zero-Visual-Regression Guarantee

Every hard-coded string on the public site has been decoupled into typed schemas:
- **Global Settings:** Brand name, regulatory registrations (SEBI, BSE, CIN), registered office, principal place of business, universal single-source risk warning, designated compliance officer profile, and 4-tier grievance escalation matrix.
- **Page Contents:** Home, About, Services, Pricing, Contact — each containing headings, body text, stats, repeatable cards, and section visibility toggles.
- **Policy Pages:** Statutory Disclaimer, Disclosures, Terms & Conditions, Privacy Policy, Investor Charter, and Short-Term Investment Risk.
- **Complaint Board:** Full SEBI Master Circular statutory format (Section 1 monthly table, Section 2 historical disposal trends, Section 3 annual compliance audit reports).

---

<a name="local-setup--quickstart"></a>
## 3. Local Setup & Quickstart

### Prerequisites
- Node.js 18.0.0 or higher
- npm or pnpm

### Installation Steps

```bash
# 1. Clone repository
git clone https://github.com/wegrofinance/wegro.git
cd wegro

# 2. Install dependencies
npm install

# 3. Create your local environment file
cp .env.example .env

# 4. Seed local database (generates initial data in data/db/)
npm run seed

# 5. Start the local development server
npm run dev
```

Visit the application:
- **Public Website:** `http://localhost:5173/`
- **Admin Portal:** `http://localhost:5173/admin`
- **Login Credentials:** ID: `admin` | Password: `wegro@123`

---

<a name="environment-variables"></a>
## 4. Environment Variables Reference

Create a `.env` file at the root of the project with the following keys:

| Variable | Description | Default (Dev) | Production Recommendation |
|---|---|---|---|
| `ADMIN_ID` | Master admin login identifier | `admin` | Custom secure ID |
| `ADMIN_PASSWORD` | Initial admin password | `wegro@123` | High-entropy password |
| `ADMIN_JWT_SECRET` | Signing secret for session JWTs | `wegro-secret...` | Minimum 32-character random string |
| `STORAGE_ADAPTER` | Active database adapter | `json` | `supabase` |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project API URL | *Empty* | `https://[id].supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous public key | *Empty* | Supabase Anon Key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role secret | *Empty* | Supabase Service Role Secret |
| `NEXT_PUBLIC_SITE_URL` | Canonical public URL | `http://localhost:5173` | `https://wegrofinance.com` |

---

<a name="storage-adapters"></a>
## 5. Storage Adapters: Local JSON vs. Supabase

The platform implements the **Storage Adapter Pattern** (`StorageAdapter` interface in `src/content/storage/types.ts`):

1. **`JsonStorageAdapter` (Development Only):**
   - Stores data in `data/db/*.json` on the local disk.
   - Includes automatic browser `localStorage` mirror for testing.
   - **⚠️ Caution:** Serverless environments like Vercel have read-only, ephemeral filesystems. Do NOT use the JSON adapter in production!
2. **`SupabaseStorageAdapter` (Production Default):**
   - Backed by managed PostgreSQL in Supabase.
   - Supports atomic transactions, Row Level Security (RLS), and on-demand cache revalidation.

---

<a name="deploying-to-vercel"></a>
## 6. Deploying to Vercel

1. Push your repository to GitHub, GitLab, or Bitbucket.
2. Log into the [Vercel Dashboard](https://vercel.com) and click **"Add New Project"**.
3. Import your repository.
4. In the **Environment Variables** section, add:
   - `STORAGE_ADAPTER=supabase`
   - `ADMIN_ID=[Your Production Admin ID]`
   - `ADMIN_PASSWORD=[Your Initial Admin Password]`
   - `ADMIN_JWT_SECRET=[Your 32+ char Secret]`
   - `NEXT_PUBLIC_SUPABASE_URL=[Your Supabase URL]`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY=[Your Supabase Anon Key]`
   - `SUPABASE_SERVICE_ROLE_KEY=[Your Supabase Service Role Key]`
5. Click **"Deploy"**.

---

<a name="connecting-supabase"></a>
## 7. Connecting Supabase (PostgreSQL)

1. Create a free project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** in the Supabase Dashboard.
3. Open `supabase/schema.sql` from this repository, paste the contents into the SQL Editor, and click **"Run"**.
   - This creates all 8 tables (`site_content`, `complaint_data`, `leads`, `policy_pages`, `audit_reports`, `settings`, `admin_users`, `audit_log`) with security indexes and RLS policies.
4. Copy your project URL and keys from **Settings -> API**:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role secret` → `SUPABASE_SERVICE_ROLE_KEY`
5. Set `STORAGE_ADAPTER=supabase` in your environment.

---

<a name="client-guide"></a>
## 8. Non-Technical Client User Guide

### 8.1 Accessing the Admin
Navigate to `/admin` on your website. Enter your designated Admin ID and Password. On your very first login, you will be prompted to set a new password.

### 8.2 The Complaint Board Editor (SEBI Statutory Filing)
1. **Header Details:** Update the "Data for the Month Ending" date and certified compliance officer name.
2. **Section 1 Table (Current Month by Source):**
   - Click any cell to update figures (Carried Forward, Received, Resolved, Pending > 3 Months).
   - By default, **Total Pending** is calculated automatically (`Carried Forward + Received - Resolved`).
   - If you need to make an official adjustment, click the **Manual Override Toggle** on that row to unlock direct manual entry. Overridden cells are marked with an orange indicator.
   - The editor checks for common filing issues (e.g. Resolved count greater than total active cases) and displays helpful **Audit Warnings** before saving.
3. **"Start New Month" Quick Action:**
   - At the beginning of a new month, click **"Start New Month"**.
   - The system automatically rolls the current month's pending cases into the new month's carried-forward balance and archives the previous month into historical trends.
4. **Draft vs. Publish:**
   - Click **"Save Draft"** while preparing numbers.
   - Once reviewed and certified, click **"Publish to Public Site"**. Only published data is shown to public investors.

### 8.3 Investor Leads Management
- View inquiries submitted through public callback forms.
- **PII Protection:** Investor PAN and Date of Birth are masked (e.g. `ABCDE••••F`) on the table to comply with Indian data privacy standards. Click the eye icon (`👁`) to reveal details.
- Update inquiry status (`New`, `Contacted`, `Closed`) and save internal notes.
- Click **"Export CSV"** to download the complete lead register for compliance audits.

### 8.4 Policy Pages & Legal Disclosures
- Edit statutory text for Disclaimer, Disclosures, Terms, Privacy Policy, and Investor Charter.
- Saving automatically updates the **"Last updated on [Date]"** stamp shown publicly.

---

<a name="content-map"></a>
## 9. Content Model Hierarchy Map

```
WeGro Content System
├── Global (`global`)
│   ├── siteName, tagline, riskWarning (Universal single source)
│   ├── regulatory (SEBI Reg No, BSE Membership No, CIN, Registered Office, SCORES & ODR Links)
│   ├── complianceOfficer (Name, Designation, Email, Phone, Address, Working Hours)
│   ├── escalationSteps (4-Tier Matrix: Desk -> Compliance Officer -> SCORES -> SMART ODR)
│   └── socialLinks (Twitter, LinkedIn, Telegram, YouTube)
├── Home (`home`)
│   ├── hero (Badge, Heading, Subheading, CTAs)
│   ├── stats (Asset Classes, Risk-Reward, SEBI Compliance, Resolution Rate)
│   ├── features (Quantitative Models, Fiduciary Discipline, Risk Calibration)
│   └── sectionVisibility (Toggles for Hero, Stats, Features, Callout, FAQ)
├── Services (`services`)
│   ├── hero (Badge, Heading, Subheading)
│   ├── services (Id, Name, Category, Description, Horizon, Risk Level, Min Capital, Features)
│   └── sectionVisibility (Hero, ServiceList, RiskNotice)
├── Pricing (`pricing`)
│   ├── hero (Badge, Heading, Subheading)
│   ├── plans (Id, Name, Price, Billing Period, Description, Features, IsPopular)
│   └── sectionVisibility (Hero, Plans, FeeDisclosure)
├── About (`about`)
│   ├── hero (Badge, Heading, Subheading)
│   ├── story, mission
│   ├── team (Name, Designation, Experience)
│   └── sectionVisibility (Hero, Story, Team, ComplianceValues)
├── Contact (`contact`)
│   ├── heading, subheading, address, phone, email, hours
│   └── sectionVisibility (Header, Details, Form, Map)
├── Policy Pages (`policies`)
│   └── [Disclaimer, Disclosure, Terms, Privacy, Investor Charter, Short-Term Risk]
└── Complaint Board (`complaint_board`)
    ├── header (Eyebrow, Title, Description, Footnote, Compliance Officer, Month Ending)
    ├── section1 (Columns, Source Rows, Grand Total, Calculated Formulas, Overrides)
    ├── section2 (Monthly Trends 6-Mo, Financial Year Trends 3-FY)
    └── section3 (Annual Compliance Audit Reports: FY, Status, PDF URL, Adverse Findings)
```
