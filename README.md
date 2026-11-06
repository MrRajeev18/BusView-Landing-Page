# BusView — Smart School Transportation Platform

> **"Every Journey, Within Your View."**  
> Developed & Operated by **Seniorbit OPC Private Limited**

BusView is a modern, reliable SaaS platform designed to make school transportation transparent, manageable, and convenient for schools and parents.

---

## 🚌 Product Overview

BusView connects three key stakeholders into a unified digital experience:
1. **Schools & School Management**: Principals, transport coordinators, and administrative committees supervise active buses, route progress, driver compliance, and historical trip logs from a centralized command center.
2. **Parents & Guardians**: Working parents track their child's assigned school bus in real time on an interactive street map with dynamic Estimated Arrival Times (ETAs) and driver contacts.
3. **School Bus Drivers**: A simple, high-contrast, distraction-free driver interface to start trips and broadcast secure location updates with zero road distractions.

---

## 🎨 Brand Identity & Design System

- **Primary Blue**: `#1264E8`
- **Deep Navy**: `#101D35`
- **White**: `#FFFFFF`
- **Light Blue**: `#EFF5FF`
- **Secondary Teal**: `#12CBA5`
- **Neutral Background**: `#F7F9FC`
- **Typography**: Inter & Plus Jakarta Sans
- **Visual Tone**: Professional SaaS, institutional trust, clean layouts, realistic product visuals, micro-interactions, WCAG AA accessible contrast.

---

## 🚀 Website Structure & Pages

| Page | File | Description |
| :--- | :--- | :--- |
| **Home** | `index.html` | Complete 12-section marketing website with hero live tracking simulation, problem statement, solution overview, feature grid, interactive UI showcase tabs, free pilot invitation, FAQ accordion, and enquiry form. |
| **For Schools** | `for-schools.html` | Institutional deep-dive for school principals and transport managers with live command console preview and audit benefits. |
| **For Parents** | `for-parents.html` | Parent experience page highlighting roadside wait elimination, live route progression, and student peace of mind. |
| **Features** | `features.html` | Complete breakdown of core capabilities (Live Tracking, ETA, Parent UI, School Dashboard, Driver Broadcast) + clearly labeled Planned Innovations roadmap. |
| **How It Works** | `how-it-works.html` | 3-Step implementation walkthrough (School Setup &rarr; Location Sharing &rarr; Connected Visibility). |
| **About Us** | `about.html` | Introduction to Seniorbit OPC Private Limited, company mission, and technology principles. |
| **Free Pilot** | `pilot.html` | Dedicated institutional pilot enrollment page with eligibility terms and application form. |
| **Privacy Policy** | `privacy.html` | Institutional data protection policy, role-based location access, and student privacy governance. |
| **Terms** | `terms.html` | Terms of service, driver road safety guidelines, and pilot commitments. |

---

## 🛠️ Tech Stack & Key Implementations

- **Framework**: Vite 5 + Vanilla ES Modules + HTML5 + CSS3 (Zero heavy runtime dependencies).
- **Interactive Live Map Simulator**: Real-time vector SVG canvas with dynamic coordinate interpolation, speed telemetry fluctuations, active bus marker, and ETA updates.
- **Product Interface Showcase**: Interactive tabbed switcher toggling high-fidelity mockups of Parent Mobile Tracking, School Admin Command Center, and Driver Console.
- **School Enquiry & Pilot Application**: Full client-side form validation (email, phone, bus fleet size, designation), state handling, simulated persistent local storage, and instant confirmation receipt generation.
- **SEO & Schema.org**: Fully integrated JSON-LD structured data for `Organization` and `SoftwareApplication`, Open Graph tags, Twitter cards, and clean URLs.
- **Deployment Ready**: Optimized for Vercel with clean URL rewrite rules (`vercel.json`).

---

## 💻 Local Development & Build

### 1. Run Development Server
```bash
npm run dev
```

### 2. Build for Production
```bash
npm run build
```
Production assets are generated in the `dist/` directory, including clean subdirectories (`for-schools/index.html`, `pilot/index.html`, etc.) for direct clean URL hosting on Vercel, Netlify, or any static host.

### 3. Preview Production Build
```bash
npm run preview
```

---

## 📄 Corporate Attribution

**BusView** is a proprietary software platform developed by **Seniorbit OPC Private Limited**.  
Copyright &copy; 2026 Seniorbit OPC Private Limited. All rights reserved.
