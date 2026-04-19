# Island Construction Services (ICS) Website Modernization Plan

## 1) Recommended Platform and Build Approach

### Recommendation
Use **WordPress (rebuild)** with a lightweight block-based theme and custom reusable sections.

### Why WordPress over Webflow for ICS
- Easier long-term ownership for a local operations/admin team.
- Flexible content editing for services, fleet, and project highlights.
- Strong SEO and form tooling without complex engineering.
- Straightforward handoff to any local Bermudian web partner if needed.

### Technical stack (simple and maintainable)
- WordPress + performant custom theme.
- ACF (or native blocks) for structured service pages.
- Gravity Forms or WPForms for quote and material order forms.
- Image optimization plugin (WebP, lazy loading, responsive sizes).
- Cloudflare CDN + caching plugin.

---

## 2) Proposed Site Map (Intent-Based)

## Home
- Hero + primary calls to action
- Service category overview
- Fleet and capability highlights
- Project/case highlights
- Company credibility section
- Contact strip + quick quote CTA

## Services (Hub)
- Construction and Excavation
- Crane and Heavy Equipment Services
- Container and Haulage
- Aggregates and Quarry
- ICS Tires
- Environmental and Specialist Services

## Service Detail Pages (one template)
- Construction and Excavation
- Crane and Heavy Equipment Services
- Container and Haulage
- Aggregates and Quarry
- ICS Tires
- Environmental and Specialist Services

## Fleet and Equipment
- Cranes
- Trucks and haulage fleet
- Excavation and demolition machinery
- Lift equipment

## Projects
- Featured projects (lightweight case highlights)
- Filters by service type (optional)

## Material Orders
- Product list guidance
- Enquiry/order form by material type and volume
- Delivery/pickup preferences

## About ICS
- Company history (1961 to present)
- Leadership
- Safety and compliance
- Community presence

## Contact
- Main enquiry form
- One-tap call actions
- Location, hours, map

## Optional utility pages
- Careers
- Privacy policy

---

## 3) Homepage Wireframe / Layout Outline

## A. Sticky Header
- ICS logo left
- Navigation center/right: Services, Fleet, Projects, About, Contact
- Utility actions right: `Call 441-236-3011`, `Request a Quote`
- Mobile: hamburger + persistent call button

## B. Hero (Full Width)
- Background: real ICS fleet/jobsite photo or short compressed video loop
- Headline: "Bermuda's Heavy-Industry Partner for Over 60 Years"
- Subhead: Excavation, crane services, haulage, quarry aggregates, and specialist support from one trusted local team.
- Primary CTA: Request a Quote
- Secondary CTA: Explore Services
- Trust stats row below CTA:
  - Established 1961
  - 60+ years local operation
  - Residential, commercial, and government clients

## C. Service Intent Cards (6-up desktop / stacked mobile)
- Construction and Excavation
- Crane and Heavy Equipment Services
- Container and Haulage
- Aggregates and Quarry
- ICS Tires
- Environmental and Specialist Services
Each card includes: short descriptor + link to service page.

## D. Why ICS (Credibility Band)
- Local Bermudian expertise
- Multi-division capability
- Reliable delivery and scheduling
- Experienced equipment operators

## E. Fleet and Equipment Showcase
- Visual gallery strip (cranes, trucks, excavation)
- 3 feature blocks with metrics/capabilities
- CTA: View Fleet and Equipment

## F. Project Highlights
- 3 compact project cards
- Each card: challenge, ICS solution, service used, image
- CTA: View More Projects

## G. Quote Funnel Banner
- Headline: "Planning work in Bermuda? Let's scope it quickly."
- Mini form fields: service type, name, phone/email
- CTA: Submit Enquiry

## H. Footer
- Contact details, hours, location
- Quick links
- Social links
- Secondary CTA button

---

## 4) Sample Modern Homepage Copy

## Hero copy
**Headline**
Bermuda's Heavy-Industry Partner for Over 60 Years

**Subheadline**
Island Construction Services delivers excavation, cranes, haulage, quarry aggregates, and specialist site support with the scale and reliability major projects demand.

**CTA buttons**
- Request a Quote
- Our Services

## Value proposition section
Built in Bermuda. Trusted across Bermuda.
From residential groundwork to complex commercial and government operations, ICS provides coordinated heavy-services support through one experienced local team.

## Services intro
Everything you need to move a project forward.
Choose the service area below and connect directly with the right ICS team.

## Quote strip
Need pricing or availability fast?
Tell us what you need and we will route your enquiry to the correct division.

---

## 5) Service Page Template Structure (Reusable)

## 1. Service Hero
- Service title
- One-line value statement
- Supporting image
- CTAs: Request a Quote / Call Now

## 2. Overview
- 2-3 short paragraphs focused on outcomes
- Typical client types served

## 3. Capabilities List
- Bullet list of specific operations
- Mention equipment/fleet where relevant

## 4. Typical Use Cases
- Residential example
- Commercial example
- Government/infrastructure example

## 5. Fleet/Equipment Snapshot
- 3-6 visuals with captions
- Optional technical specs download

## 6. Project Highlight
- One concise case card with result-oriented language

## 7. Enquiry CTA Block
- Short form with hidden service field preselected
- Phone fallback for urgent jobs

## 8. FAQs (SEO + conversion)
- 4-6 practical questions (coverage area, timing, safety, material availability)

---

## 6) Recommended Component List

- Sticky header with utility CTA
- Hero (image/video + trust stats)
- Intent-based service cards grid
- Credibility icon/value row
- Fleet gallery carousel (swipe on mobile)
- Project highlight cards
- Request a Quote form (multi-step optional)
- Material order enquiry form
- One-tap call floating button (mobile)
- Testimonial/partner logo row (optional)
- Contact/location strip
- Footer with quick links and social

---

## 7) Structured Request a Quote Form (Fields)

- Service required (dropdown)
- Project type (Residential / Commercial / Government)
- Site location (Bermuda parish)
- Desired start timeframe
- Scope details (textarea)
- Name
- Company (optional)
- Phone
- Email
- Preferred contact method
- File upload (optional photos/plans)

Form behavior:
- Smart routing by selected service category.
- Success message with expected response time.
- Trigger email notification to relevant ICS division.

---

## 8) Material Order Enquiry (Improved)

Fields:
- Material type (sand/screenings/5-8 rock/soil/gabion/etc.)
- Quantity and unit
- Delivery or pickup
- Required date
- Site address
- Access notes
- Contact details

UX notes:
- Keep form short and practical.
- Add clear note: "Order confirmation is provided by phone/email after review."

---

## 9) SEO Structure (Bermuda Focus)

Core on-page targets:
- construction services Bermuda
- excavation Bermuda
- crane services Bermuda
- container haulage Bermuda
- quarry aggregates Bermuda
- tires Bermuda

Execution:
- Unique meta title and description per service page.
- H1 aligned with service intent.
- Internal links between related service pages.
- Local business schema + service schema.
- Fast, compressed media and descriptive alt text.

---

## 10) Visual Direction (Modern, Professional, Trustworthy)

- Palette: ICS yellow and deep navy with generous white space.
- Typography: strong condensed display for headings + clean sans-serif body.
- Layout: wide sections, clear spacing, strong card hierarchy.
- Motion: minimal and purposeful (fade-in + subtle hover only).
- Photography: prioritize authentic fleet and on-site imagery.

---

## 11) Implementation Phases

## Phase 1 (2-3 weeks)
- IA and wireframes
- Visual system and component design
- Homepage and service template approval

## Phase 2 (3-4 weeks)
- WordPress theme build
- Core page build (Home, Services, Contact, Quote, Material Orders)
- Form routing and mobile QA

## Phase 3 (1-2 weeks)
- Content entry and imagery optimization
- SEO basics and performance tuning
- Launch and monitoring

---

## 12) KPI Targets After Launch

- Increase quote form submissions
- Increase mobile call clicks
- Lower homepage bounce rate
- Increase service page time-on-page
- Improve ranking for Bermuda heavy-service search terms
