# 🚀 Busy Multicare Software — Admin Panel & Blog System
## Master Agent Prompt (No Backend Required)

> **Copy this entire prompt and paste it into any AI agent (Claude, GPT-4, Gemini, etc.) to build the full admin panel.**

---

## 📋 PROJECT OVERVIEW

Build a **complete, fully functional Admin Panel** for **Busy Multicare Software** (Nepal's #1 Accounting & Business Automation company). This is a **frontend-only, no-backend** system that uses `localStorage` for persistent data storage.

**Live Website:** https://busy-multicare-software.vercel.app/
**Brand Color:** `#1a56db` (primary blue)
**Company:** Busy Multicare Software Pvt. Ltd., Kathmandu, Nepal

---

## 🎯 WHAT TO BUILD

A **single self-contained HTML file** (or React JSX) that includes:

1. **Admin Login Page** — password-protected entry
2. **Dashboard** — stats overview with charts
3. **Blog Manager** — create, edit, delete blog posts with images
4. **Image Gallery Manager** — upload, organize, delete images
5. **Product/Service Manager** — manage software products listed on the site
6. **Testimonials Manager** — add/edit/delete customer testimonials
7. **Settings Panel** — site info, contact details, social links

Everything persists using `localStorage`. No server, no database, no API calls needed.

---

## 🖥️ TECH STACK

```
- Pure HTML + CSS + Vanilla JavaScript  (preferred for portability)
- OR: React JSX single file (if using Claude artifacts)
- Storage: window.localStorage  (key-value, JSON serialized)
- Images: Base64 encoded strings stored in localStorage
- Icons: Lucide icons via CDN  https://unpkg.com/lucide@latest
- Charts: Chart.js via CDN  https://cdn.jsdelivr.net/npm/chart.js
- Fonts: Google Fonts — use "Plus Jakarta Sans" for UI, "Playfair Display" for headings
```

---

## 🎨 DESIGN SYSTEM

### Colors
```css
--primary:        #1a56db;   /* Busy blue */
--primary-dark:   #1240a8;
--primary-light:  #e8f0fe;
--accent:         #f59e0b;   /* Warm amber */
--success:        #10b981;
--danger:         #ef4444;
--warning:        #f59e0b;
--bg:             #f8faff;
--surface:        #ffffff;
--surface-2:      #f1f5f9;
--border:         #e2e8f0;
--text:           #0f172a;
--text-muted:     #64748b;
--sidebar-bg:     #0f1f4d;   /* Deep navy */
--sidebar-text:   #c7d2fe;
```

### Typography
```css
font-family: 'Plus Jakarta Sans', sans-serif;  /* body */
font-family: 'Playfair Display', serif;        /* blog post titles */
```

### Layout
- **Sidebar** (260px wide, fixed, deep navy `#0f1f4d`) + **Main content area**
- Sidebar has logo, nav items with icons, user info at bottom
- Top bar with page title, search, notification bell, admin avatar
- Cards with `border-radius: 12px`, subtle `box-shadow`
- Responsive: sidebar collapses to icon-only on narrow screens

---

## 🔐 AUTH SYSTEM

```javascript
// Default credentials (admin can change in Settings)
const DEFAULT_CREDENTIALS = {
  username: "admin",
  password: "busy@2024"
};

// Store in localStorage
localStorage.setItem('bm_auth', JSON.stringify({ loggedIn: true, user: 'admin' }));
localStorage.setItem('bm_credentials', JSON.stringify({ username, password }));
```

- Show login page if not authenticated
- "Remember me" checkbox (stores session in localStorage)
- Logout button in sidebar footer

---

## 📰 BLOG MANAGER — Full Specification

This is the most important module. Build it with these features:

### Blog Post Data Structure
```javascript
{
  id: "post_" + Date.now(),
  title: "string",
  slug: "auto-generated-from-title",
  excerpt: "short description (max 160 chars)",
  content: "full HTML/markdown content",
  category: "News | Tutorial | Product Update | Case Study | Announcement",
  tags: ["tag1", "tag2"],
  status: "draft | published | scheduled",
  featuredImage: "base64 string OR external URL",
  author: "string",
  publishDate: "ISO date string",
  createdAt: "ISO date string",
  updatedAt: "ISO date string",
  views: 0,
  featured: false
}
```

### Blog List View
- Table with columns: Thumbnail, Title, Category, Status badge, Date, Views, Actions
- Filter bar: search input, category dropdown, status dropdown
- Bulk actions: select all, bulk delete, bulk publish
- Pagination (10 per page)
- Sort by: date, title, views, status
- Status badges: 🟢 Published (green), 🟡 Draft (yellow), 🔵 Scheduled (blue)

### Blog Create/Edit Form
```
Fields:
  [Title]           — text input, full width
  [Slug]            — auto-generated, editable
  [Category]        — dropdown
  [Tags]            — tag input (type and press Enter)
  [Status]          — Published / Draft / Scheduled toggle
  [Featured]        — checkbox toggle
  [Featured Image]  — drag & drop OR paste URL OR click to upload
                      Shows image preview after selection
  [Excerpt]         — textarea, 160 char limit with counter
  [Content]         — rich text area (implement a basic toolbar:
                       Bold, Italic, H2, H3, Link, Image, Bullet List)
  [Author]          — text input (pre-filled from settings)
  [Publish Date]    — date-time picker
  
Buttons:
  [Save Draft]  [Preview]  [Publish]  [Cancel]
```

### Image Handling in Blog
```javascript
// Convert uploaded file to base64
function fileToBase64(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.readAsDataURL(file);
  });
}

// Store image
localStorage.setItem('bm_img_' + imageId, base64String);

// Retrieve image
const imgSrc = localStorage.getItem('bm_img_' + imageId);
```

---

## 🖼️ IMAGE GALLERY MANAGER

### Image Data Structure
```javascript
{
  id: "img_" + Date.now(),
  name: "filename.jpg",
  alt: "alt text for accessibility",
  category: "Products | Team | Office | Blog | Marketing | Client",
  size: "123 KB",
  dimensions: "1200x630",
  data: "base64 string",
  uploadedAt: "ISO date string",
  usedIn: ["post_123", "post_456"]  // references
}
```

### Gallery View
- **Grid view** (default) — 3-4 columns, image cards with hover overlay showing name + actions
- **List view** toggle — table format
- Filter by category
- Search by filename or alt text
- Click image → opens lightbox modal with full preview + details panel
- Drag & drop upload zone (accepts: jpg, png, webp, gif, svg)
- Multi-select for bulk delete
- Show storage usage indicator: "Used: 2.4 MB / 5 MB" (localStorage limit awareness)

---

## 📦 PRODUCT/SERVICE MANAGER

### Product Data Structure
```javascript
{
  id: "prod_" + Date.now(),
  name: "Busy Accounting Software",
  tagline: "Nepal's #1 Accounting Solution",
  description: "long description",
  category: "Accounting | ERP | POS | Payroll | Inventory",
  price: { amount: 0, period: "monthly", currency: "NPR", label: "Contact for pricing" },
  features: ["feature1", "feature2"],
  image: "base64 or URL",
  status: "active | inactive",
  order: 1,
  badge: "Popular | New | Featured | null"
}
```

### UI Features
- Drag-to-reorder products (updates display order on main site)
- Inline editing for quick field updates
- Toggle active/inactive without opening full form

---

## ⭐ TESTIMONIALS MANAGER

### Testimonial Data Structure
```javascript
{
  id: "test_" + Date.now(),
  name: "Rajesh Shrestha",
  company: "Shrestha Traders Pvt. Ltd.",
  role: "Managing Director",
  avatar: "base64 or initials fallback",
  content: "testimonial text",
  rating: 5,  // 1-5
  product: "Busy Accounting Software",
  featured: true,
  status: "active | inactive",
  createdAt: "ISO date string"
}
```

---

## ⚙️ SETTINGS PANEL

Tabs:
1. **General** — Company name, tagline, logo upload, favicon
2. **Contact** — Phone, email, address, Google Maps embed URL
3. **Social Media** — Facebook, Twitter/X, LinkedIn, YouTube, Instagram URLs
4. **SEO** — Default meta title, meta description, keywords
5. **Admin Account** — Change username & password
6. **Data Management** — Export all data (JSON download), Import data, Reset to defaults

---

## 📊 DASHBOARD

### Stats Cards (top row)
```
[Total Blog Posts]  [Published Posts]  [Draft Posts]  [Total Images]
[Total Products]    [Testimonials]     [Page Views*]  [Last Updated]
```
*Page views: random seed stored in localStorage for demo

### Charts
- **Line chart** — Blog posts published per month (last 6 months) — Chart.js
- **Doughnut chart** — Posts by category breakdown — Chart.js
- **Bar chart** — Most viewed posts (top 5)

### Recent Activity Feed
- Last 10 actions with timestamp (create/edit/delete/publish)
- Stored in localStorage as action log

### Quick Actions
- `[+ New Blog Post]`  `[Upload Image]`  `[+ Add Testimonial]`

---

## 💾 LOCALSTORAGE SCHEMA

```javascript
// All keys used by the admin panel
const STORAGE_KEYS = {
  AUTH:           'bm_auth',           // session state
  CREDENTIALS:    'bm_credentials',   // login info
  SETTINGS:       'bm_settings',      // site settings
  BLOG_POSTS:     'bm_blog_posts',    // array of post objects
  IMAGES:         'bm_images',        // array of image metadata
  PRODUCTS:       'bm_products',      // array of product objects
  TESTIMONIALS:   'bm_testimonials',  // array of testimonials
  ACTIVITY_LOG:   'bm_activity',      // recent activity array (max 50)
};

// Helper functions to include
function getData(key) {
  try { return JSON.parse(localStorage.getItem(key)) || []; }
  catch { return []; }
}

function setData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function logActivity(action, target) {
  const log = getData(STORAGE_KEYS.ACTIVITY_LOG);
  log.unshift({ action, target, timestamp: new Date().toISOString() });
  setData(STORAGE_KEYS.ACTIVITY_LOG, log.slice(0, 50));
}
```

---

## 🗂️ NAVIGATION STRUCTURE

```
Sidebar Nav:
  📊  Dashboard
  ✍️  Blog Posts
        └─ All Posts
        └─ New Post
        └─ Categories
  🖼️  Media / Images
  📦  Products
  ⭐  Testimonials
  ⚙️  Settings
  🔗  [View Website ↗]   (opens main site in new tab)
  ─────────────────
  👤  Admin  [Logout]
```

---

## 🔔 TOAST NOTIFICATIONS

Implement a toast notification system:
```javascript
// Call anywhere in the app
showToast("Blog post published!", "success");
showToast("Are you sure?", "warning");
showToast("Image deleted.", "error");
showToast("Settings saved.", "info");
```

Toasts appear bottom-right, auto-dismiss after 3 seconds, stack if multiple.

---

## ✅ SEED DATA (Pre-populate on first load)

On first run (when localStorage is empty), seed with:

**3 Sample Blog Posts:**
```javascript
[
  {
    title: "How Busy Multicare Software is Transforming Accounting in Nepal",
    category: "News",
    status: "published",
    excerpt: "Discover how 10,000+ businesses across Nepal are streamlining their accounting operations...",
    featured: true
  },
  {
    title: "Top 5 Features of Our New POS System",
    category: "Product Update",
    status: "published",
    excerpt: "Our latest POS update brings powerful inventory sync, faster billing, and cloud backup..."
  },
  {
    title: "Getting Started with Payroll Management",
    category: "Tutorial",
    status: "draft",
    excerpt: "A step-by-step guide to setting up your payroll module in Busy Accounting Software..."
  }
]
```

**3 Sample Testimonials** from Nepali businesses.

**5 Sample Products**: Busy Accounting, ERP Suite, POS System, Payroll Module, Inventory Manager.

---

## 🧩 COMPONENT STRUCTURE (if building in React)

```
<App>
  ├── <LoginPage />
  └── <AdminLayout>
        ├── <Sidebar />
        ├── <TopBar />
        └── <MainContent>
              ├── <Dashboard />
              ├── <BlogList />
              ├── <BlogEditor />
              ├── <ImageGallery />
              ├── <ProductManager />
              ├── <TestimonialsManager />
              └── <Settings />
```

Use `useState` for current page routing (no react-router needed):
```javascript
const [currentPage, setCurrentPage] = useState('dashboard');
```

---

## 🚨 IMPORTANT CONSTRAINTS

1. **NO backend calls** — everything is localStorage only
2. **NO external API calls** — no fetch/axios to remote servers
3. **Single file output** — everything in one `.html` file (or one `.jsx`)
4. **Mobile responsive** — sidebar collapses on screens < 768px
5. **Image size warning** — warn user if image > 500KB (localStorage has ~5-10MB limit)
6. **Data export** — always provide JSON export so user can back up their data
7. **Nepali context** — use NPR for currency, Nepal for location references

---

## 📤 OUTPUT FORMAT

Deliver as:
- **Primary:** A single complete `admin-panel.html` file (self-contained, open in any browser)
- **Include:** Inline CSS (in `<style>` tag), inline JS (in `<script>` tag), CDN links for Chart.js and Lucide icons
- Do NOT use any build tools, npm, or compilation step
- Must work by simply double-clicking the HTML file or hosting on any static server

---

## 🔁 HOW BLOG CONNECTS TO MAIN WEBSITE

Since this is frontend-only, explain to the user in a `<!-- INTEGRATION NOTE -->` comment inside the HTML:

```html
<!--
  INTEGRATION NOTE:
  To connect this admin panel to the live website (busy-multicare-software.vercel.app),
  the main site needs to read from the same localStorage keys:
  
  window.localStorage.getItem('bm_blog_posts')   → renders blog listing
  window.localStorage.getItem('bm_products')     → renders products page
  window.localStorage.getItem('bm_testimonials') → renders testimonials section
  
  Both the admin panel and the main site must be served from the SAME domain/origin
  for localStorage to be shared. Options:
  1. Host admin at: https://busy-multicare-software.vercel.app/admin
  2. Use a shared backend (Firebase, Supabase) for production
  3. Export JSON from admin → commit to repo → site reads from JSON file
-->
```

---

*Built for Busy Multicare Software Pvt. Ltd., Kathmandu, Nepal 🇳🇵*
*Prompt version: 1.0 | Last updated: May 2026*
