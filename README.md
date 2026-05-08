<div align="center">

# Rahul Singh — Portfolio

**SAP ABAP Lead Consultant · React Developer · AI Enthusiast**

[![Portfolio](https://img.shields.io/badge/🌐_Live_Portfolio-rahulsinghsap.netlify.app-0078D4?style=for-the-badge)](https://rahulsinghsap.netlify.app)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-rahul--singh--sap--abap-0A66C2?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/rahul-singh-sap-abap)
[![TypeScript](https://img.shields.io/badge/TypeScript-98%25-3178C6?style=for-the-badge&logo=typescript)](https://github.com/rahulmsingh337/Rahul_port)
[![Netlify](https://img.shields.io/badge/Deployed_on-Netlify-00C7B7?style=for-the-badge&logo=netlify)](https://rahulsinghsap.netlify.app)

</div>

---

## About This Portfolio

Personal portfolio website for **Rahul Singh** — SAP ABAP Lead Consultant with 5+ years of enterprise experience at Accenture and Infosys. The site showcases professional experience, certifications, key projects, and includes a Gemini AI-powered interface for interactive exploration.

Built with modern React tooling, smooth Framer Motion animations, and backed by Firebase — because even a SAP consultant's portfolio should have clean architecture.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 19 + TypeScript |
| **Build Tool** | Vite 6 |
| **Styling** | Tailwind CSS v4 |
| **Animations** | Framer Motion |
| **AI Integration** | Google Gemini API (`@google/genai`) |
| **Backend** | Express.js |
| **Database / Auth** | Firebase v12 |
| **Forms** | React Hook Form + Zod |
| **Deployment** | Netlify |
| **CI/CD** | GitHub Actions |

---

## Getting Started

### Prerequisites

- Node.js (v18+)
- A [Google Gemini API key](https://aistudio.google.com/app/apikey)
- A Firebase project (for contact form / backend features)

### Local Setup

```bash
# Clone the repo
git clone https://github.com/rahulmsingh337/Rahul_port.git
cd Rahul_port

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env.local
# Add your GEMINI_API_KEY and APP_URL to .env.local

# Start the dev server
npm run dev
```

App runs at `http://localhost:3000`

### Available Scripts

```bash
npm run dev       # Start dev server (port 3000)
npm run build     # Production build
npm run preview   # Preview production build locally
npm run lint      # TypeScript type check
npm run clean     # Remove dist/
```

---

## Project Structure

```
Rahul_port/
├── src/                    # React app source
├── public/                 # Static assets
├── .github/workflows/      # CI/CD pipelines
├── .env.example            # Environment variable template
├── firebase-blueprint.json # Firebase project config
├── firestore.rules         # Firestore security rules
├── netlify.toml            # Netlify deployment config
├── vite.config.ts          # Vite configuration
└── tsconfig.json           # TypeScript configuration
```

---

## Deployment

The portfolio auto-deploys to [Netlify](https://rahulsinghsap.netlify.app) on every push to `main` via the configured `netlify.toml`.

To deploy your own fork:

1. Import the repo into [Netlify](https://app.netlify.com)
2. Set `GEMINI_API_KEY` and `APP_URL` as environment variables in Netlify dashboard
3. Build command: `npm run build` | Publish directory: `dist`

---

## About Rahul

**Rahul Singh** is an SAP ABAP Lead Consultant currently at **Accenture** (Noida, India), with prior experience at **Infosys**. He specializes in:

- **ECC → S/4HANA Migration** — HANA remediation, SmartShift, custom code adaptation
- **Modern SAP Development** — RAP (Managed & Unmanaged), CDS Views, OData V4, SAP Fiori
- **ABAP Cloud** — Clean Core compliance, ATC/SCI checks, SAP BTP
- **Integration** — ALE/IDocs, RFCs, BAPIs, external API integration

**Certifications:** SAP Certified Back-End Developer (ABAP Cloud · C_ABAPD_2601), SAP ALE IDocs, SAP Cloud Platform

**Awards:** Unit Rise Award (Rookie of the Quarter), Best Performer – EAS SAP Unit, ACE COE Performer Award, 5× Unit Rise Awards, 16× INSTA Rewards

---

## Contact

| Channel | Link |
|---|---|
| 🌐 Portfolio | [rahulsinghsap.netlify.app](https://rahulsinghsap.netlify.app) |
| 💼 LinkedIn | [linkedin.com/in/rahul-singh-sap-abap](https://linkedin.com/in/rahul-singh-sap-abap) |
| 💬 WhatsApp | [+91 89898 05836](https://wa.me/918989805836) |
| 📸 Instagram | [@squatile3375](https://www.instagram.com/squatile3375/) |

---

<div align="center">

*Open to challenging SAP ABAP, S/4HANA, ABAP Cloud, and RAP-focused roles involving enterprise transformation and clean-core adoption.*

</div>
