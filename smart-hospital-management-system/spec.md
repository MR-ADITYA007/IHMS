# Specification

## Summary
**Goal:** Build a responsive Smart Hospital landing page and a role-based login page, with a minimal Motoko backend stub.

**Planned changes:**
- Landing page at `/` with a hero section (headline "Next-Generation Healthcare Management", "Book an Appointment" primary CTA, red "EMERGENCY: Find Nearest Hospital" secondary CTA, hero background image), key features section (four feature cards: Lightning-Fast Records, AI-Powered Scheduling, Real-Time Emergency Routing, Flawless Resource Management), and a footer with navigation links, contact info, and a Login link
- Role-based login page at `/login` with a centered, minimalist design featuring a Patient / Doctor / Admin tab selector, email and password fields, and a submit button; active tab is visually highlighted
- Client-side routing connecting `/` and `/login`; "Book an Appointment" CTA navigates to `/login` pre-selecting the Patient role; footer Login link navigates to `/login`
- Minimal Motoko backend actor in `backend/main.mo` exposing a `ping` query function
- Medical-blue, clean-white, and soft-gray color theme throughout

**User-visible outcome:** Users can visit the landing page, explore the hospital's feature highlights, and navigate to a role-based login page where they can select Patient, Doctor, or Admin before submitting credentials.
