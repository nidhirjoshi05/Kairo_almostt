# Mental Health & Wellness Platform

## Overview
A personal companion application for emotional wellness and mental health support. Built as a frontend-only Single Page Application (SPA) with React and TypeScript.

**Current State**: Fully configured and running in Replit environment
**Last Updated**: October 29, 2025

## Project Architecture

### Tech Stack
- **Frontend**: React 18 + TypeScript + Vite
- **UI Components**: Radix UI + Tailwind CSS
- **State Management**: TanStack Query + React Context
- **Routing**: Wouter (client-side routing)
- **Build Tool**: Vite 5

### Project Structure
```
.
├── client/               # React frontend (SPA)
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── contexts/    # React contexts (PlanContext)
│   │   ├── hooks/       # Custom hooks
│   │   ├── lib/         # Utilities
│   │   └── pages/       # Route pages (not-found)
│   └── index.html       # Entry HTML
├── shared/              # Shared types (legacy, not used)
│   └── schema.ts        # Database schema definitions
└── attached_assets/     # Static assets and images
```

**Note**: This is a frontend-only application. There is no backend server or database integration. All data is managed client-side using React state and context.

## Configuration

### Development
- **Dev Server Port**: 5000
- **Host**: 0.0.0.0 (configured for Replit proxy)
- **HMR Port**: 443 (for Replit's HTTPS proxy)
- **Build Output**: dist/public/

### Key Files
- `vite.config.ts`: Vite configuration with Replit-specific plugins
- `package.json`: Dependencies and scripts
- `tsconfig.json`: TypeScript configuration
- `tailwind.config.ts`: Tailwind CSS configuration

## Setup and Running

### Initial Setup
1. Dependencies installed via `npm install`
2. Workflow "Server" configured to run `npm run dev` on port 5000
3. Deployment configured for Replit Autoscale

### Available Scripts
- `npm run dev`: Start Vite development server
- `npm run build`: Build for production
- `npm start`: Preview production build
- `npm run check`: Type check with TypeScript

### Data Management
This is a frontend-only SPA with no backend. All application state is managed client-side using:
- React Context (PlanContext for plan selection)
- Local component state
- TanStack Query for data fetching patterns

## Deployment
Configured for Replit Autoscale deployment:
- **Build**: `npm run build` (outputs to dist/public/)
- **Run**: `npm start` (Vite preview server)
- **Target**: Autoscale (frontend-only SPA)

## Features
Based on the components structure, the app includes:
- Landing page with journey start
- Authentication system
- Dual plan options (Free/Pro)
- **Psychological Assessments** - Scientifically validated tests
  - PANAS Scale (20 items) - Positive and Negative Affect measurement (free for all)
  - EIS-HPD (34 items) - Emotional Intelligence Scale with 10-factor breakdown (Pro only)
  - Interactive results with gauges, charts, and radar visualizations
  - Freemium gating: EIS-HPD results require Pro upgrade
- Mood tracking
- Journal entries
- Calendar view
- Crisis support
- AI-powered vent room
- Healing circles
- Therapist matching and booking
- Daily tips
- Profile dashboard

## Recent Changes
**October 29, 2025** - Fresh GitHub Import Setup
- Imported project from GitHub as fresh clone to Replit environment
- Installed all npm dependencies (478 packages)
- Applied security fixes with `npm audit fix` (addressed 3 vulnerabilities)
- Created `.gitignore` with Node.js best practices
- Fixed vite.config.ts to remove hardcoded allowedHosts (enables Replit proxy to work correctly)
- Configured "Server" workflow to run `npm run dev` on port 5000
- Configured deployment for Replit Autoscale (build: npm run build, run: npm start)
- Verified production build works correctly (960 kB bundle)
- Verified dev server starts successfully on port 5000
- All LSP errors resolved

**October 28, 2025**

### Therapist Matching Questionnaire (Latest)
- Created comprehensive multi-step therapist matching questionnaire (`/therapist-matching`)
  - **Step 1: The Basics** - Session type and availability preferences
  - **Step 2: What's on your mind?** - Therapy concerns and prior experience (12 concern areas)
  - **Step 3: Your Therapy Style** - Therapist approach and focus preferences
  - **Step 4: Therapist Preferences** - Gender preference (100% optional)
- Features:
  - Beautiful animated multi-step form with progress tracking
  - Validation requiring completion of each step before proceeding
  - Back/Next navigation with smooth scrolling
  - Mobile-responsive design matching existing branding
  - "Show My Matches" submission redirects to therapist directory
  - Seamless integration with existing header/footer
- Updated Pro Plan Dashboard:
  - "Start Matching Process" button now navigates to dedicated questionnaire page
  - Removed inline matching component for cleaner UX
  - Therapists tab properly handles URL parameters

### Assessment System Improvements
- **Modified Free & Pro Dashboards:**
  - Removed embedded EQ assessment from home pages
  - Added prominent assessment cards encouraging users to take tests
  - Cards feature gradient backgrounds, brain icons, and clear CTAs
  - Clicking cards navigates to dedicated `/assessments` page
- **Assessments Page Redesign:**
  - Users can now take PANAS and EIS tests independently
  - Each test has its own submit button
  - Results display immediately below the respective test
  - Smooth scroll to results after submission
  - No longer requires completing both tests simultaneously

### Psychological Assessments Feature
- Implemented comprehensive Psychological Assessments feature
  - Created Assessments.tsx component with PANAS and EIS-HPD questionnaires
  - Implemented scoring algorithms for both tests with proper normative data
  - Built interactive results visualizations (gauges, progress bars, radar charts, factor tables)
  - Enforced freemium boundary: PANAS results free, EIS-HPD results Pro-only with upgrade CTA
  - Added Assessments navigation link to both Free and Pro dashboards
  - Configured /assessments route in App.tsx

### Initial Setup
- Updated branding with transparent Kairo logo across landing and auth pages
- Fixed login page back button positioning for professional appearance
- GitHub import completed and configured for Replit
- Created missing `shared/schema.ts` for database types
- Configured Vite to allow all hosts (required for Replit proxy)
- Set up PostgreSQL database and pushed schema
- Configured workflow to run development server on port 5000
- Set up deployment configuration for production
