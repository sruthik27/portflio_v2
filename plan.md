## Complete Design & Experience Document
---

> **Philosophy:** This portfolio is not a webpage. It is a _live operational command center_ that happens to describe a person. Every pixel should feel functional. Every animation should feel earned. The visitor should feel like they've been granted access to a mission control room — not handed a résumé.

---
## TABLE OF CONTENTS

1. [Tech Stack Recommendation](https://claude.ai/chat/a1d427dc-13b0-4a29-9347-58117c65492b#1-tech-stack-recommendation)
2. [Design System](https://claude.ai/chat/a1d427dc-13b0-4a29-9347-58117c65492b#2-design-system)
3. [Global Layout Architecture](https://claude.ai/chat/a1d427dc-13b0-4a29-9347-58117c65492b#3-global-layout-architecture)
4. [Experience Flow — First Visit](https://claude.ai/chat/a1d427dc-13b0-4a29-9347-58117c65492b#4-experience-flow--first-visit)
5. [Section-by-Section Specification](https://claude.ai/chat/a1d427dc-13b0-4a29-9347-58117c65492b#5-section-by-section-specification)
    - 5.1 Boot Sequence (+ Visitor Handshake)
    - 5.2 Persistent Top Bar (+ Audio Toggle)
    - 5.3 Persistent Side Navigation (+ Executive Mode Toggle)
    - 5.4 Hero — System Status Overview
    - 5.5 About — Kernel Info
    - 5.6 Skills — Service Health Monitor
    - 5.7 Experience — Change Management Log
    - 5.8 Projects — Deployment Registry
    - 5.9 Certifications — Security Clearances
    - 5.10 Education — Firmware Modules
    - 5.11 Syslog Feed — Interactive Activity Log
    - 5.12 Contact — Establish Connection
    - 5.13 Infrastructure — Live Architecture Diagram ← NEW
6. [Executive Mode — Full Specification](https://claude.ai/chat/a1d427dc-13b0-4a29-9347-58117c65492b#6-executive-mode--full-specification)
7. [Ambient Audio System](https://claude.ai/chat/a1d427dc-13b0-4a29-9347-58117c65492b#7-ambient-audio-system)
8. [Motion & Animation Principles](https://claude.ai/chat/a1d427dc-13b0-4a29-9347-58117c65492b#8-motion--animation-principles)
9. [Micro-Interactions Catalog](https://claude.ai/chat/a1d427dc-13b0-4a29-9347-58117c65492b#9-micro-interactions-catalog)
10. [Easter Eggs & Hidden Features](https://claude.ai/chat/a1d427dc-13b0-4a29-9347-58117c65492b#10-easter-eggs--hidden-features)
11. [Responsive Behavior](https://claude.ai/chat/a1d427dc-13b0-4a29-9347-58117c65492b#11-responsive-behavior)
12. [Accessibility](https://claude.ai/chat/a1d427dc-13b0-4a29-9347-58117c65492b#12-accessibility)
13. [Performance Budget](https://claude.ai/chat/a1d427dc-13b0-4a29-9347-58117c65492b#13-performance-budget)

---

## 1. TECH STACK RECOMMENDATION

### Primary Choice: **SvelteKit**

Svelte is the ideal choice for this project. Reasons:

- **Zero runtime overhead** — compiled away, critical for smooth 60fps animations
- **Native reactive stores** — perfect for live uptime counters, syslog feeds, clock ticking, and Executive Mode state
- **Svelte transitions/animations** — `fly`, `fade`, `draw` are built-in and buttery
- **`svelte/motion`** — spring and tweened values make number animations trivial
- **Smaller bundle** — everything is canvas, animation, and interactivity; you want lean JS
- **No virtual DOM diffing** — real DOM updates mean no jank in complex animated dashboards

### Supporting Libraries

|Library|Purpose|
|---|---|
|`three.js`|Particle network background (node topology)|
|`d3.js`|EKG line, bandwidth graph, skill bars, sparklines, syslog scroll|
|`gsap`|Boot sequence orchestration, Executive Mode layout morphing|
|`canvas-confetti`|Easter egg celebrations|
|`tone.js`|Ambient audio system (Web Audio API wrapper)|
|`ip-api.com`|Free IP geolocation for visitor handshake (no key needed)|
|`@sveltejs/adapter-static`|Deploy as pure static site|

### Hosting

**Cloudflare Pages** (preferred over Vercel for this project). Reasons:

- Cloudflare Pages is free with unlimited bandwidth
- Cloudflare CDN + edge network is a portfolio talking point for the Infrastructure diagram
- Workers at the edge = you can accurately diagram your own deployment
- Sub-50ms global response time you can show off live

---

## 2. DESIGN SYSTEM

### 2.1 Color Palette

```
Background Hierarchy
──────────────────────────────────────────────────────────
--void:         #040710    Page background. Pure near-black.
--panel:        #070d1a    Panel surfaces. Slightly lifted.
--panel-raised: #0b1223    Hover states, active panels.
--panel-inset:  #050c17    Inner wells, input backgrounds.

Border Hierarchy
──────────────────────────────────────────────────────────
--border-subtle:  #0f1e35   Barely-there dividers
--border:         #152038   Standard borders
--border-active:  #1e3260   Hover/focus borders
--border-bright:  #2a4580   Accent borders, selected state

Semantic Colors
──────────────────────────────────────────────────────────
--green:        #00ff88    HEALTHY / ONLINE / SUCCESS / EXPERT
--green-glow:   rgba(0,255,136,0.12)
--green-border: rgba(0,255,136,0.22)

--cyan:         #00d4ff    PRIMARY ACCENT / LINKS / INFO
--cyan-glow:    rgba(0,212,255,0.12)
--cyan-border:  rgba(0,212,255,0.22)

--amber:        #ffb347    WARNING / RENEWAL NEEDED / CAUTION
--amber-glow:   rgba(255,179,71,0.12)

--red:          #ff4560    CRITICAL / ALERT / ERROR
--red-glow:     rgba(255,69,96,0.12)

--purple:       #a855f7    AI / ML / SPECIAL CAPABILITIES
--purple-glow:  rgba(168,85,247,0.12)

Text Hierarchy
──────────────────────────────────────────────────────────
--text-bright:  #ffffff    Highest emphasis (names, hero)
--text-primary: #dceeff    Normal body text
--text-secondary:#8ab0cc   Labels, descriptions
--text-muted:   #4a6a88    Secondary labels
--text-dim:     #2d4a68    Placeholder, decorative text
```

### Executive Mode Colors (separate palette, see § 6)

```
--exec-bg:          #f4f5f7
--exec-surface:     #ffffff
--exec-border:      #d1d9e0
--exec-text:        #1a2332
--exec-text-sub:    #4a5568
--exec-accent:      #0066cc
--exec-green:       #0d7040
```

### 2.2 Typography

```
Display / Titles:
  Font: "Chakra Petch" (Google Fonts)
  Weights: 300, 400, 600, 700
  Character: Military-geometric. Designed to look like instrumentation.
  Use for: Section headers, company names, your name, panel titles

Mono / Data / Body:
  Font: "JetBrains Mono" (Google Fonts)
  Weights: 300, 400, 500, 700
  Character: Premium coding font. Ligatures. Feels native to terminals.
  Use for: All labels, values, descriptions, code, stats, everything else

Executive Mode:
  Headers: "Inter" or "DM Sans" — clean, professional
  Body: "DM Sans" — readable, neutral
  Never bleed NOC fonts into Executive Mode.
```

### 2.3 Type Scale

```
Display Hero Name:     clamp(2.8rem, 5vw, 4.2rem)   Chakra Petch 700
Section Titles:        1.0rem                         Chakra Petch 600
Panel Titles:          0.72rem                        Chakra Petch 600
Body / Descriptions:   0.66rem                        JetBrains Mono 400
Labels / Keys:         0.58rem                        JetBrains Mono 400
Micro Labels:          0.52rem                        JetBrains Mono 400
Top Bar:               0.62rem                        JetBrains Mono 400
```

### 2.4 Spacing System

Use an 8px base grid. All spacing values: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64.

Panels have: `padding: 20px` (inner content) and `gap: 16px` (between panels).

### 2.5 Border & Shadow Language

```
Panel default:   border: 1px solid var(--border)
Panel hover:     border: 1px solid var(--border-active)
                 box-shadow: 0 0 30px rgba(0,0,0,0.4), 0 0 1px rgba(0,212,255,0.05)
Panel active:    border: 1px solid var(--cyan-border)
                 box-shadow: 0 0 24px rgba(0,212,255,0.06)

Left accent bar: Every panel has a 2px left border in its semantic color.
                 Green panels: border-left: 2px solid var(--green)
                 Cyan panels:  border-left: 2px solid var(--cyan)
                 Amber panels: border-left: 2px solid var(--amber)

Corner cut:      ALL panels have a subtle corner cut effect:
                 clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)
                 This gives a military chamfered corner look.

Glow on hover:   text-shadow: 0 0 20px currentColor (on colored values like stats)
```

---

## 3. GLOBAL LAYOUT ARCHITECTURE

```
┌─────────────────────────────────────────────────────────────────┐
│  TOP BAR (fixed, 46px)                              [🔊] [⏻ EXEC]│
├──────┬──────────────────────────────────────────────────────────┤
│      │                                                           │
│ SIDE │  MAIN CONTENT AREA                                        │
│ NAV  │  (scrollable, sections stack vertically)                  │
│(54px)│                                                           │
│fixed │  max-width: 1440px, centered                             │
│      │  padding: 0 28px                                          │
│      │                                                           │
└──────┴──────────────────────────────────────────────────────────┘
```

**Background layer (z-index: 0):** Three.js canvas — particle network topology **Scanline layer (z-index: 1):** CSS repeating-gradient overlay, subtle CRT effect **Content layer (z-index: 2+):** All panels and UI **Topbar/Sidenav (z-index: 100):** Always on top **Boot overlay (z-index: 9999):** Covers everything on load

**Global state store (Svelte writable store):**

```javascript
{
  executiveMode: false,       // NOC vs Executive layout
  audioEnabled: false,        // opt-in audio
  visitorCity: null,          // from IP geolocation
  visitorISP: null,           // from IP geolocation
  bootComplete: false,        // boot sequence done
  idleTimer: 0,               // ms since last interaction
  activeSection: 'hero'       // for sidenav highlight
}
```

---

## 4. EXPERIENCE FLOW — FIRST VISIT

### 4.1 Visitor-Aware Network Handshake

**Before the boot sequence renders its lines**, fire a `fetch` to `http://ip-api.com/json/` (free, no API key, returns JSON with city, ISP, country, etc.). This is done in parallel with the boot sequence starting. By the time the relevant boot line is reached, the data is ready.

```javascript
// On app init, before boot renders
const geoData = await fetch('http://ip-api.com/json/')
  .then(r => r.json())
  .catch(() => ({ city: 'UNKNOWN_NODE', isp: 'UNKNOWN_ISP' }))
```

The boot line dynamically becomes:

```
[  OK  ]  Establishing route to guest node: Mumbai, IN — Jio Broadband
```

or

```
[  OK  ]  Establishing route to guest node: Bengaluru, IN — AWS EC2 (ap-south-1)
```

(If the visitor is on a VPN or cloud IP, showing their cloud provider's name is an even more impressive detail that a network engineer would appreciate.)

**Privacy note:** You are using a free, public API with no auth. No data is stored. No user tracking. Nothing is sent anywhere except the read-only IP lookup. Add a brief `<!-- IP geolocation for boot sequence only. Nothing stored. -->` comment in source as a nice touch.

**Fallback:** If the API times out (> 2s), the line shows: `[ OK ] Establishing route to guest node: EXTERNAL NETWORK` — graceful, never breaks.

### 4.2 Full Flow

```
User opens page
      │
      ▼
[PARALLEL: IP geolocation fetch fires immediately]
      │
      ▼
[BOOT SEQUENCE — 3.5 seconds]
Terminal lines load in with staggered delay.
Line 4 shows personalized city/ISP from IP lookup.
Progress bar fills.
CAREER_OS ASCII logo pulses.
      │
      ▼
[BOOT FADES OUT — 0.8s opacity transition]
      │
      ▼
[DASHBOARD FADES IN — staggered]
Top bar slides down from top (300ms)
Side nav slides in from left (350ms, 80ms delay)
Hero section panels animate in (staggered, 100ms between each)
      │
      ▼
[ALERT FLASH — 4 seconds after load]
Top-right alert: "⚑ HIGHLY SKILLED ENGINEER · AVAILABLE FOR OPPORTUNITIES"
Fades in, stays 5 seconds, fades out.
      │
      ▼
[FULLY INTERACTIVE DASHBOARD]
Uptime counter ticking every second.
EKG line pulsing.
Bandwidth graph animating.
Syslog entries auto-scrolling (expandable on click).
Clock updating.
      │
      ▼ (after 3 minutes idle)
[IDLE SETTLE MODE — see § 8 Motion Principles]
```

---

## 5. SECTION-BY-SECTION SPECIFICATION

---

### 5.1 BOOT SEQUENCE

**Duration:** ~3.5 seconds before auto-dismiss. **Background:** Pure #000000 — not void color, actual black. **Dismiss:** Clicking anywhere after 2s also dismisses it (add "PRESS ANY KEY" hint at bottom). **Session flag:** Store `sessionStorage.setItem('booted', '1')` on completion so returning visitors skip straight to dashboard.

**Layout:** Centered vertically and horizontally.

**Elements (top to bottom):**

1. **Logo** — `// CAREER_OS` in Chakra Petch 700, ~1.8rem, cyan color, glowing text-shadow. Fades in first over 400ms.
    
2. **Terminal lines block** — monospace, green `#00ff88`, 0.68rem, left-aligned, fixed width (~560px). Lines appear one by one, ~120ms stagger. Brief cursor blink between some lines.
    

```
CAREER_OS v9.4 — BOOTING...
──────────────────────────────────────────────────────────
[  OK  ]  Loading identity module............... sruthik.issac
[  OK  ]  Verifying credentials................. AWS-SAA · CCNA · AZ-900
[  OK  ]  Resolving hostname.................... sruthikissac.dev
[  OK  ]  Establishing route to guest node...... [CITY, COUNTRY — ISP]  ← DYNAMIC
[  OK  ]  Mounting experience volume............ 2024-02 → present
[  OK  ]  Loading skill clusters................ 68 services detected
[  OK  ]  Initializing networking stack......... CCNA · AI_FOR_NETWORKING
[  OK  ]  Connecting to HPE Aruba node.......... chennai.hpe.aruba.in
[  OK  ]  Activating cloud modules.............. AWS · AZURE · K8S
[  OK  ]  Loading AI/ML subsystems.............. LANGCHAIN · AGENTS · GENAI
[ WARN ]  34 certifications found............... some require renewal check
[  OK  ]  Starting project registry............. 9 deployments indexed
[  OK  ]  Uptime counter initialized............ Feb 1, 2024 → now
[  OK  ]  Ambient audio module.................. LOADED (muted — user opt-in)
[  OK  ]  All systems nominal.
──────────────────────────────────────────────────────────
CAREER_OS ready. Establishing secure session...
```

3. **Progress bar** — full width of text block, 3px height, fills over ~2.8s, cyan→green gradient, glowing box-shadow.
    
4. **Fade to dashboard** — the whole boot overlay fades to opacity 0, then `display: none`.
    

**The personalized line (line 4):**

- If geolocation resolved: `[ OK ] Establishing route to guest node...... Mumbai, IN — Jio`
- If on cloud IP: `[ OK ] Establishing route to guest node...... AWS EC2 (ap-south-1)`
- If failed/timeout: `[ OK ] Establishing route to guest node...... EXTERNAL NETWORK`
- The city/ISP value should type in character-by-character with a very fast ~30ms/char typewriter effect — as if it's being resolved live.

---

### 5.2 PERSISTENT TOP BAR

**Height:** 46px **Position:** Fixed top, full width **Background:** `rgba(4, 7, 16, 0.97)` with `backdrop-filter: blur(14px)` **Border-bottom:** 1px solid `var(--border)` **Font:** JetBrains Mono 400, 0.62rem, letter-spacing: 0.06em

**Left side (fixed items):**

```
[LOGO: SRUTHIK.ISSAC]  |  [● ONLINE]  ·  [HPE: CLOUD ENGINEER]  ·  [UPTIME: 2Y 1M 4D]  ·  [CERTS: 34]  ·  [NODE: Chennai · IN]
```

**Right side (actions):**

```
[⌨ CTRL+K]   [🔊]   [HH:MM:SS IST]   [⏻ EXECUTIVE MODE]   [ALERT BANNER]
```

**Audio Toggle (🔊):**

- Icon: small speaker icon. Default state: muted (crossed-out or dimmed).
- Hover tooltip: `AMBIENT AUDIO · CLICK TO ENABLE`
- On click: activates audio system (see § 7). Icon becomes active/lit.
- State persists in `localStorage` across sessions.
- Visual: 16×16px icon. When active, subtle pulsing glow.

**Executive Mode Toggle:**

- Styled as a small hardware-style flip switch or a physical-feeling push button.
- Label: `EXEC MODE` in tiny uppercase.
- Left = NOC (current state indicator: `◉ NOC`), right = `◉ EXEC`.
- On toggle: full-page layout morphing animation (see § 6).
- The toggle itself has a satisfying click feel — achieved with a CSS `transform: scale(0.92)` on mousedown.
- If audio is enabled, plays the `click` sound on toggle.

**Alert banner:** Appears 4s after load. `background: var(--red-glow)`, text: `⚑ HIGHLY SKILLED ENGINEER · AVAILABLE FOR OPPORTUNITIES`. Auto-dismisses after 8 seconds.

---

### 5.3 PERSISTENT SIDE NAVIGATION

**Width:** 54px **Position:** Fixed left, below topbar **Background:** `rgba(4, 7, 16, 0.97)` with `backdrop-filter: blur(14px)` **Border-right:** 1px solid `var(--border)`

**Nav items (icon buttons):**

```
⌂  STATUS (hero)
◉  ABOUT
⬡  SKILLS
─── divider ───
≡  EXPERIENCE
⊞  PROJECTS
─── divider ───
◈  CERTS
◫  EDUCATION
─── divider ───
≣  SYSLOG
⇝  CONTACT
─── divider ───
⛧  INFRA  ← NEW (Infrastructure diagram)
```

Each nav item:

- 38×38px, centered icon (~1rem)
- Default: `color: var(--text-dim)`, transparent background
- Hover: `color: var(--cyan)`, `background: var(--cyan-glow)`, `border: 1px solid var(--cyan-border)`
- Active (current section in viewport): Same as hover but persistent, determined by IntersectionObserver
- Tooltip: Appears to the right on hover, panel style with sharp corners

The `⛧ INFRA` item at the bottom should have a subtle amber glow — it feels special, like a restricted area. Tooltip: `INFRASTRUCTURE · META`.

---

### 5.4 HERO — SYSTEM STATUS OVERVIEW

**Section ID:** `#hero` **Full viewport height on load.** Background has a subtle radial gradient bloom: `radial-gradient(ellipse 60% 40% at 50% 0%, rgba(0,212,255,0.03) 0%, transparent 70%)`.

**Layout:** 2-column grid (`1.4fr 1fr`) with `gap: 22px`.

---

#### LEFT COLUMN

**Eyebrow tag:** `OPERATOR_ID · HPE-ARUBA-CE-001 · MADURAI → CHENNAI`

**Name (H1):** `SRUTHIK ISSAC` Chakra Petch 700, ~3.8rem. Pure white.

**Glitch effect:** On an interval (every ~7s), the name flickers with a CSS glitch animation — brief horizontal offset in cyan and red on the before/after pseudo-elements. The name itself stays stable; only the glitch layers appear momentarily. Duration: ~200ms. Should feel like a monitor artifact, not a gimmick. **Disabled in Executive Mode and when `prefers-reduced-motion` is set.**

**Role line:** `CLOUD ENGINEER @ HEWLETT PACKARD ENTERPRISE · AWS SAA · CCNA`

**Certification badges (horizontal row):**

```
[● AWS SOLUTIONS ARCHITECT]   — green theme
[● CCNA CERTIFIED]             — green theme
[◈ AZURE FUNDAMENTALS]         — cyan theme
[◈ AWS AI PRACTITIONER]        — cyan theme
[⚑ AI FOR NETWORKING]          — amber theme
[◈ ETHICAL HACKER]             — red/amber theme
```

**Hero Stats Row:**

```
CAREER UPTIME     CERTIFICATIONS    PROJECTS SHIPPED   SLA / RELIABILITY
[live counter]    34 ACTIVE         9 SYSTEMS          99.9%
```

**Availability indicator:** `● AVAILABILITY · OPEN TO OPPORTUNITIES · RESPONSE TIME: <24H`

**EKG Canvas:** A `<canvas>` element, 100% wide, ~56px tall. Draws a heartbeat/EKG waveform continuously scrolling left. Color: `var(--green)`, opacity 0.7.

**Idle Settle Behavior:** After 3 minutes of no interaction, the EKG waveform's amplitude slowly decreases by 40% and the frame rate drops to 15fps. Any mouse movement immediately restores it. This prevents the continuous canvas animation from becoming a visual distraction when someone is actually reading.

---

#### RIGHT COLUMN

**Uptime Panel:** Career start Feb 1, 2024. Live counter: `Y YEARS · M MONTHS · D DAYS · HH:MM:SS`. Below: animated career momentum line chart.

**Status Rows (6 rows):**

```
[●G]  CLOUD PLATFORMS     AWS · AZURE · HPE ARUBA · OPERATIONAL
[●G]  NETWORKING STACK    CCNA CERTIFIED · NOMINAL
[●G]  SECURITY POSTURE    ETHICAL HACKER CERT · SECURED
[●C]  AI/ML MODULES       LANGCHAIN · AGENTS · ACTIVE
[●G]  FULL-STACK ENGINE   REACT · NODE · PYTHON · GO · READY
[●G]  DATABASE CLUSTER    PG · MONGO · REDIS · ARANGODB · UP
```

---

### 5.5 ABOUT — KERNEL INFO

**Section tag:** `§ 01 // SYSTEM OVERVIEW`

Single full-width panel. Terminal `systeminfo` readout. Lines animate in on scroll-enter with ~100ms stagger, mimicking live terminal output.

```
OPERATOR:              Sruthik Issac
DESIGNATION:           Cloud Engineer — Hewlett Packard Enterprise, Aruba Networks
KERNEL:                Cloud Architecture · Networking · Full-Stack Dev · AI Agents
SPECIALIZATIONS:       Aruba Cloud Solutions · AWS · Kubernetes · LangChain · REST APIs
ORIGIN_NODE:           Madurai, Tamil Nadu, India
CURRENT_NODE:          Chennai, Tamil Nadu, India
LANGUAGES:             Python · JavaScript · TypeScript · Go · Java · C · C# · SQL · Dart
FRAMEWORKS:            React · Node.js · Django · Flask · ASP.NET · LangChain · Apollo
DATABASES:             PostgreSQL · MongoDB · Redis · ArangoDB · ClickHouse
TOOLS:                 Figma · Kubernetes · Docker · Kafka · Git
PORTFOLIO:             sruthik2016.pythonanywhere.com ↗
LINKEDIN:              linkedin.com/in/sruthikissac-5b9119198 ↗
PHILOSOPHY:            Build resilient systems. Keep learning. Ship things that matter.
STATUS:                ● ONLINE — All systems nominal. Ready for next mission█
```

---

### 5.6 SKILLS — SERVICE HEALTH MONITOR

**Section tag:** `§ 02 // SERVICE HEALTH MONITOR` **Layout:** 2×2 grid of cluster panels.

Skill bars animate from 0 to target width when the section enters the viewport (IntersectionObserver, 1.4s cubic-bezier ease, 60ms stagger between items).

**Hover tooltips (desktop) / Tap toggles (mobile):** On desktop, hovering a skill item shows the "packet inspection" tooltip. On mobile, tapping the item toggles the tooltip open/closed. Tapping elsewhere dismisses it. Never rely on hover-only interaction patterns.

**The 4 Clusters:**

**Cluster 1: ☁ CLOUD & INFRASTRUCTURE** (green accent)

```
● AWS (Solutions Architect SAA-C03)     90%  — Expert · Certified
● HPE Aruba Networks                    88%  — Expert · Current Daily Work
● Kubernetes (+ HPE Ezmeral)            82%  — Expert · HPE Certified
◉ Microsoft Azure (AZ-900)              74%  — Proficient · Certified
◉ Serverless Architecture               78%  — Proficient · AWS Lambda
◉ Solution Architecture & Design        85%  — Proficient · AWS SAA
```

**Cluster 2: 🌐 NETWORKING & SECURITY** (green accent)

```
● Computer Networking (CCNA Jan 2026)   92%  — Expert · Cisco Certified
● Cybersecurity (Cisco Certified)       80%  — Expert · Cisco Certified
● Ethical Hacking (Cisco Certified)     78%  — Expert · Cisco Certified
◉ AI for Networking (Cisco Jul 2025)    76%  — Proficient · Cisco Certified
◉ Network Devices & Configuration       84%  — Proficient · Cisco Certified
◉ REST APIs / GraphQL                   86%  — Proficient · Apollo Certified
```

**Cluster 3: ⌨ PROGRAMMING LANGUAGES** (cyan accent)

```
● Python                                92%  — Expert · HackerRank Certified
● JavaScript / TypeScript               90%  — Expert · Full-Stack Daily Use
◉ Java (Concurrent + Parallel)          80%  — Proficient · Udemy Certified
◉ Go (Golang)                           68%  — Proficient · HackerRank Certified
◉ C / C# / .NET                         72%  — Proficient · HackerRank Certified
◉ SQL / PL-SQL                          86%  — Proficient · ZTM + HackerRank Certified
▪ Dart / Flutter                        64%  — Familiar · Android projects
```

**Cluster 4: ◈ AI, DATABASES & FULL-STACK** (purple accent)

```
● LangChain / AI Agents (Certified)     82%  — Expert · LangChain Academy
● AWS AI Practitioner (Certified)       84%  — Expert · AWS Certified
◉ React.js / Node.js                    88%  — Proficient · Daily Use
◉ MongoDB / ArangoDB (Certified)        79%  — Proficient · Both Certified
◉ Redis (Streams + Java, Certified)     77%  — Proficient · Redis Certified
◉ PostgreSQL / ClickHouse               80%  — Proficient · ClickHouse Certified
◉ Django / Flask / ASP.NET              80%  — Proficient · Multiple Projects
```

---

### 5.7 EXPERIENCE — CHANGE MANAGEMENT LOG

**Section tag:** `§ 03 // CHANGE MANAGEMENT LOG`

Vertical timeline styled like a network change management system. Glowing vertical line gradient (cyan→green) runs down the left.

**Entry 1 — Current Role:**

```
CHANGE-0002  [● PRODUCTION]  [● ACTIVE — ONGOING]

HEWLETT PACKARD ENTERPRISE
Cloud Engineer — Aruba Networks

NODE: Chennai, Tamil Nadu, India
STARTED: Sep 2024   DURATION: [live counter] ongoing   STATUS: LIVE

ACTIONS:
▸ Developing cloud solutions with Aruba Networks within HPE
▸ Building and maintaining cloud infrastructure at scale
▸ Applying AWS, networking, and containerization in production

IMPACT: HIGH · Zero downtime maintained
```

Timeline dot: Pulsing animation (live/current). Green accent bar.

**Entry 2 — Internship:**

```
CHANGE-0001  [● STAGING]  [✓ COMPLETED]

HEWLETT PACKARD ENTERPRISE
Cloud Developer Intern

NODE: Chennai, Tamil Nadu, India
STARTED: Feb 2024   FINISHED: Aug 2024   DURATION: 7 months

ACTIONS:
▸ Cloud development internship — foundation for full-time role
▸ Contributed to cloud platform projects within HPE

IMPACT: MEDIUM — Successfully converted to full-time employment
```

---

### 5.8 PROJECTS — DEPLOYMENT REGISTRY

**Section tag:** `§ 04 // DEPLOYMENT REGISTRY` **Layout:** `grid-template-columns: repeat(auto-fill, minmax(300px, 1fr))`, gap 16px.

**SyncRoom** (featured card): spans 2 columns on ≥1200px screens. Has `FEATURED DEPLOYMENT` badge. Its sparkline is animated and glowing cyan.

**All 9 Projects:**

|#|Name|Year|Status|Description|
|---|---|---|---|---|
|1|SyncRoom|2024|LIVE|Real-time collaborative music platform. Create rooms, sync audio with friends live. syncroomnow.com|
|2|SkyNotes|2025|LIVE|Chrome extension — floating sticky notes per webpage|
|3|CTM|2024|ARCHIVED|CLI task manager — lightweight terminal todo tool|
|4|Stylo|2023|LIVE|Browser extension — customize Google Search & ChatGPT UI|
|5|MixnMatch|2023|ARCHIVED|UI color tool — AI-powered foreground/background combinations with WCAG scoring|
|6|Care In Cure|2023|ARCHIVED|Health platform — library of ailments, home remedies, community contributions|
|7|Passcheck|2019|ARCHIVED|Password security tool — checks against known data breach lists|
|8|Spectrum Split|2023|ARCHIVED|PDF utility — splits B&W and color pages into separate PDFs|
|9|Funtopia|2021|ARCHIVED|WhatsApp sticker app — classic cartoon nostalgia sticker packs|

**Card footer sparklines:** Each card has a tiny (60×18px) D3 sparkline. Random but plausible data. For LIVE projects: slightly upward trend. For ARCHIVED: flat or historical curve. Purely decorative — adds "live monitoring" feel.

**Hover effect:** `translateY(-3px)` + border brightens + deeper shadow + corner-cut glow.

---

### 5.9 CERTIFICATIONS — SECURITY CLEARANCES

**Section tag:** `§ 05 // SECURITY CLEARANCES`

**Filter tabs (top):**

```
[ALL 34]  [CISCO 7]  [AWS 2]  [MICROSOFT 1]  [HPE 2]  [HACKERRANK 6]  [OTHER]
```

Smooth hide/show on filter. Tabs have active state with cyan underline.

**Grid:** `repeat(auto-fill, minmax(260px, 1fr))`.

**Verify Interaction (desktop hover + mobile tap):** On click/tap: `QUERYING AUTHORITY...` → `VALIDATING TOKEN...` → `✓ CLEARANCE CONFIRMED` (border flashes green) → button becomes `[↗ VIEW CREDENTIAL]`.

**Key certs to spotlight:**

- AWS SAA-C03: Gold shimmer border
- CCNA (Jan 2026): Pulsing border — freshest cert
- AWS AI Practitioner (Apr 2028 expiry): Purple accent
- AI for Networking Cisco (Jul 2028 expiry): Amber accent

---

### 5.10 EDUCATION — FIRMWARE MODULES

**Section tag:** `§ 06 // FIRMWARE & TRAINING MODULES` **Layout:** 2 columns.

**Entry 1:** Thiagarajar College of Engineering → B.E. Computer Science, Nov 2020 – Jun 2024, Madurai. **Entry 2:** Rotary Laharry Matriculation HSS → HSC, Jun 2004 – Mar 2019, Madurai.

Styled as firmware module readouts with `MODULE / VERSION / DURATION / STATUS / LOCATION` rows.

---

### 5.11 SYSLOG FEED — INTERACTIVE ACTIVITY LOG

**Section tag:** `§ 07 // SYSTEM ACTIVITY LOG` **Layout:** Full-width panel. Fixed height ~320px. Auto-scrolls upward at ~25px/s. Pauses on hover.

**Upgrade from v1.0:** Log entries are now clickable. When a user clicks any entry, the log feed pauses and that entry expands in-place like an accordion, revealing a JSON metadata block.

---

**Log Entry Format (collapsed):**

```
2026-01-12    [SUCCESS]   CERT_ACQUIRED: CCNA — Cisco Systems
```

**Log Entry Expanded (on click/tap):**

```
2026-01-12    [SUCCESS]   CERT_ACQUIRED: CCNA — Cisco Systems   [▲ COLLAPSE]

             {
               "event":       "CERTIFICATION_ACQUIRED",
               "title":       "CCNA",
               "authority":   "Cisco Systems",
               "issued":      "2026-01-12",
               "expires":     "2029-01-12",
               "license":     "073c7620b7db4b31b30a48c5838d36a7",
               "credential":  "https://credly.com/badges/9ed33757...",
               "skills_added": ["Routing", "Switching", "TCP/IP", "BGP",
                                "OSPF", "Network Security", "WAN Protocols"],
               "tier":        "ASSOCIATE",
               "status":      "ACTIVE"
             }
```

The JSON block uses syntax highlighting:

- Keys: `var(--cyan)`
- String values: `var(--green)`
- Numbers/dates: `var(--amber)`
- Brackets/commas: `var(--text-dim)`
- Background: `var(--panel-inset)` with a faint left border in the event's semantic color

**Controls in panel header:**

```
SYSTEM ACTIVITY LOG    [● LIVE]    [▶ PAUSE / ■ RESUME]    [▼ EXPAND ALL]
```

**Full syslog entries (newest first):**

```
2026-01-15    [SUCCESS]   CERT_ACQUIRED: LangChain Essentials — LangChain Academy
2026-01-15    [SUCCESS]   CERT_ACQUIRED: Building GenAI Apps — MongoDB University
2026-01-12    [SUCCESS]   CERT_ACQUIRED: CCNA — Cisco Systems (exp. Jan 2029)
2025-07-20    [SUCCESS]   CERT_ACQUIRED: AI for Networking — Cisco (exp. Jul 2028)
2025-04-10    [SUCCESS]   CERT_ACQUIRED: AWS AI Practitioner — Amazon Web Services
2025-01-10    [INFO]      PROJECT_DEPLOYED: SkyNotes Chrome Extension → production
2024-12-01    [SUCCESS]   PROJECT_DEPLOYED: SyncRoom (syncroomnow.com) → live
2024-10-08    [UPGRADE]   CERT_ACQUIRED: AWS Solutions Architect – Associate (SAA-C03)
2024-10-01    [INFO]      PROJECT_DEPLOYED: CTM (Command Line Task Manager) → published
2024-09-01    [SUCCESS]   DEPLOYMENT: Full-time Cloud Engineer role @ HPE · Aruba Networks
2024-08-01    [NOTICE]    ROTATION: Cloud Developer Intern → Cloud Engineer · HPE
2024-06-15    [SUCCESS]   CERT_ACQUIRED: Cisco Ethical Hacker
2024-06-10    [SUCCESS]   CERT_ACQUIRED: ClickHouse Developer Certified
2024-06-01    [UPGRADE]   GRADUATION: B.E. Computer Science · Thiagarajar College Engineering
2024-02-01    [INFO]      DEPLOYMENT: Cloud Developer Internship @ HPE commenced
2023-12-01    [INFO]      PROJECT_DEPLOYED: Stylo Browser Extension → Chrome Web Store
2023-11-01    [SUCCESS]   CERT_ACQUIRED: Complete Web Developer — Zero To Mastery Academy
2023-08-15    [SUCCESS]   PROJECT_COMPLETED: MixnMatch (UI color + AI tool)
2023-07-01    [SUCCESS]   CERT_ACQUIRED: Web & Mobile Designer UX — Zero To Mastery
2023-06-15    [SUCCESS]   PROJECT_COMPLETED: Care In Cure (health platform)
2023-05-01    [SUCCESS]   CERT_ACQUIRED: Complete SQL Bootcamp — Zero To Mastery
2023-03-01    [SUCCESS]   CERT_ACQUIRED: CCNA: Introduction to Networks — Cisco
2022-10-01    [SUCCESS]   CERT_ACQUIRED: Cloud Computing — IIT Kharagpur (NPTEL)
```

---

### 5.12 CONTACT — ESTABLISH CONNECTION

**Section tag:** `§ 08 // ESTABLISH CONNECTION` **Layout:** 2-column grid (`1fr 1fr`).

#### LEFT: Traceroute Panel

**Trigger:** Fires automatically when section enters viewport (once). Or user can click `[▶ RE-RUN TRACE]` to replay.

**Mobile behavior:** On mobile, since there's no hover/viewport animation trigger issue, the trace fires on tap of a `[▶ INITIATE TRACEROUTE]` button that's visible immediately.

```
TRACEROUTE TO: sruthik.issac // career_endpoint

Initiating route discovery...

1.   visitor.browser.local                   1 ms    ████
2.   isp-backbone-node-01.net               14 ms    ████
3.   global-internet-exchange.ix            31 ms    ████
4.   india-gateway.in                       58 ms    ████
5.   chennai.datacenter.hpe.aruba.local     72 ms    ████
6.   sruthik.issac.engineer                  ✓ ms    REACHED

──────────────────────────────────────────────────────
DESTINATION REACHED · CONNECTION ESTABLISHED ✓
LATENCY: OPTIMAL · PACKET LOSS: 0%
```

Each hop appears with ~400ms delay. Final line causes border to flash green once.

Below: `[✉ COMPOSE MESSAGE →]` expands minimal terminal-styled form.

#### RIGHT: Peer Node Registry

```
PRIMARY EMAIL          sruthikissac2016@gmail.com        [→ CONNECT]
PROFESSIONAL NETWORK   linkedin.com/in/sruthikissac...   [→ OPEN]
PERSONAL PORTFOLIO     sruthik2016.pythonanywhere.com    [→ VISIT]
PHONE NODE             +91 73735 22116                   [→ DIAL]
LOCATION NODE          Madurai / Chennai · Tamil Nadu
```

---

### 5.13 INFRASTRUCTURE — LIVE ARCHITECTURE DIAGRAM ← NEW

**Section tag:** `§ 09 // PORTFOLIO INFRASTRUCTURE` **Side nav icon:** `⛧` with amber accent (feels like a "restricted" or special area)

**Concept:** The portfolio's own hosting infrastructure is rendered as a live, interactive isometric diagram. You are not just _telling_ them you know cloud deployments — you are _showing them the live deployment they are currently using._ The medium becomes the message.

---

**Diagram Layout (isometric 2.5D style using SVG or canvas):**

```
                    ┌─────────────────────────────────────┐
                    │      VISITOR BROWSER                │
                    │      [Your detected city]           │
                    └──────────────┬──────────────────────┘
                                   │  HTTPS request
                                   ▼
                    ┌─────────────────────────────────────┐
                    │      CLOUDFLARE GLOBAL CDN          │
                    │      Edge Network · 200+ PoPs       │
                    │      DDoS Protection · WAF          │
                    └──────┬──────────────┬───────────────┘
                           │              │
                    DNS    │              │  Static Assets (cached)
                    Resolve│              │  (JS, CSS, Fonts, Images)
                           ▼              ▼
                    ┌───────────┐   ┌───────────────────────────┐
                    │ Cloudflare│   │   Cloudflare Pages        │
                    │ DNS       │   │   Edge Worker             │
                    │ (Anycast) │   │   SvelteKit SSG Output    │
                    └───────────┘   └─────────────┬─────────────┘
                                                  │
                                                  │  CI/CD Trigger
                                                  ▼
                                   ┌─────────────────────────┐
                                   │   GitHub Repository     │
                                   │   main branch           │
                                   │   Auto-deploy on push   │
                                   └─────────────────────────┘
```

**Implementation options (choose one):**

**Option A — SVG isometric diagram (recommended):** Hand-craft an SVG with isometric "server rack" / "box" visual language. Style each component as a 3D-ish isometric box with the component name on its face. Animate connecting lines with `stroke-dashoffset`. On hover over each box, a tooltip panel appears with details. This is the highest-quality option and is fully accessible.

**Option B — Three.js 3D nodes:** Render each infrastructure component as a 3D node with connecting lines. Orbit controls let the visitor rotate the diagram. More immersive but heavier.

**Recommended: Option A.** Cleaner, faster, more professional.

---

**Each node is interactive. Hovering/tapping shows a panel:**

**Cloudflare CDN node:**

```
SERVICE:      Cloudflare CDN
ROLE:         Global content delivery · DDoS protection · WAF
PoPs:         250+ edge locations worldwide
CACHE HIT:    ~95% of requests served from edge
LATENCY:      < 50ms to most users globally
STATUS:       ● OPERATIONAL
```

**Cloudflare Pages node:**

```
SERVICE:      Cloudflare Pages (Edge Hosting)
ROLE:         Static site hosting · Serverless functions
BUILD:        SvelteKit (adapter-static output)
DEPLOY:       Automatic on git push to main
BUILD TIME:   < 45 seconds
UPTIME SLA:   99.99%
STATUS:       ● OPERATIONAL
```

**GitHub node:**

```
SERVICE:      GitHub (Source Control + CI/CD)
REPO:         sruthikissac/portfolio
PIPELINE:     Push → Cloudflare Pages build hook
BRANCH:       main (protected)
LAST DEPLOY:  [live, pulled from Cloudflare Pages API or hardcoded]
STATUS:       ● OPERATIONAL
```

**Visitor Browser node (dynamic):**

```
SERVICE:      Guest Browser
DETECTED:     [visitor city from IP geolocation — reused from boot]
PROTOCOL:     HTTPS · TLS 1.3
CACHE:        Static assets cached at Cloudflare edge
ROUND TRIP:   [estimated from user's detected region]
```

---

**Live stats panel (below the diagram):**

Show real or mock-real numbers that are plausible and impressive:

```
┌──────────────────────────────────────────────────────────────────┐
│  LIVE DEPLOYMENT METRICS                                         │
├──────────────┬──────────────┬──────────────┬─────────────────────┤
│  UPTIME      │  CDN REGIONS │  BUILD TIME  │  LIGHTHOUSE SCORE   │
│  99.99%      │  250+ PoPs   │  ~45s        │  ● 100 / 100        │
└──────────────┴──────────────┴──────────────┴─────────────────────┘
```

The Lighthouse score is real — you should aim for a 100/100 performance score given the optimization budget in this doc.

---

**Section intent — why this exists:**

A recruiter or hiring manager sees this and understands immediately:

- You don't just deploy to Netlify and call it done
- You understand CDN, DNS, CI/CD pipelines as real infrastructure
- You understand the layers between a user's browser and a deployed application
- Your portfolio IS your portfolio piece for cloud/infra skills

---

## 6. EXECUTIVE MODE — FULL SPECIFICATION ← NEW

**Trigger:** Toggle button in top bar (right side). Keyboard shortcut: `Alt+E`.

**Core idea:** A non-technical HR recruiter or executive might feel overwhelmed by the NOC aesthetic and just want clear, readable information. This mode shows extreme UX empathy — "I can build incredibly complex themed interfaces AND I know when to strip it all back for clarity."

---

### 6.1 Transition Animation

When Executive Mode is activated (NOC → Exec):

1. **Screen flash:** Very brief (80ms) white flash — like switching monitors.
2. **Particles fade out:** Three.js background fades to opacity 0 over 400ms.
3. **Scanlines disappear:** Overlay fades out.
4. **Color crossfade:** CSS custom properties transition from dark palette to light palette. Use a `<style>` tag injection or Svelte store + `transition: background 500ms, color 500ms` on `body`.
5. **Fonts swap:** JetBrains Mono → DM Sans for body text. Chakra Petch stays for headings (it still looks clean in light mode).
6. **Layout reflow:** Panels lose their left-accent bars, chamfered corners, glow effects. Borders become subtle `#d1d9e0`. Spacing increases. Text size increases slightly.
7. **Top bar label changes:** `◉ NOC MODE` → `◉ EXEC MODE` with a clean, minimal style.

When switching back (Exec → NOC): same in reverse. The `⊞` on the screen flash is green.

Total transition: ~600ms. Uses GSAP or CSS custom property transitions.

---

### 6.2 Executive Mode Layout

**Global:** White/off-white background. Clean sans-serif. Professional. Generous spacing.

**Top bar:** Simplified. White background with a thin bottom border. Logo in dark text. Minimal items.

**Side nav:** Hidden. Replace with a horizontal anchor link bar below the top bar.

**Hero:**

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│   SRUTHIK ISSAC                                                  │
│   Cloud Engineer · HPE Aruba Networks                            │
│                                                                  │
│   Chennai, Tamil Nadu, India · sruthikissac2016@gmail.com        │
│   linkedin.com/in/sruthikissac-5b9119198                         │
│                                                                  │
│   AWS Certified Solutions Architect · CCNA · Azure Fundamentals  │
│   AWS AI Practitioner · Cisco Ethical Hacker                     │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

Clean. Big name. Clear title. Contact inline.

**Skills:** Simple two-column grid of skill categories as text lists. No skill bars, no dots.

**Experience:** Clean timeline. Company, title, dates, bullet points. Looks like a real résumé.

**Certifications:** Simple table: Authority | Certification Name | Date | Status.

**Projects:** Card grid with just name, one-line description, and a link. No sparklines, no status badges.

**Contact:** Clean contact card with all endpoints listed. No traceroute animation.

---

### 6.3 "Download PDF Résumé" in Executive Mode

In Executive Mode, a prominent `[↓ DOWNLOAD PDF RÉSUMÉ]` button appears in the hero section. This button is hidden in NOC mode (it's accessible via the command palette in NOC mode as `DOWNLOAD RESUME [R]`).

The PDF should be a clean, pre-generated PDF version of the résumé — not a browser-print of the page. Generate it once, store in `/static/resume-sruthik-issac.pdf`.

---

## 7. AMBIENT AUDIO SYSTEM ← NEW

**Philosophy:** Audio is the most powerful differentiator in web experiences, and almost nobody uses it thoughtfully. Done right, it makes the portfolio feel like a real place. Done wrong, it's obnoxious. The rules here are strict.

### 7.1 Rules

1. **Always default to muted.** Never auto-play. This is non-negotiable — browsers block it anyway, and it would break the experience.
2. **Opt-in is explicit.** User clicks the speaker icon. A small toast says `AMBIENT AUDIO ENABLED · CLICK TO MUTE`.
3. **Volume is gentle.** Background hum at ~8% volume. Sound effects at ~20% volume. These feel like ambient details, not features.
4. **Respect `prefers-reduced-motion`.** If this is set, disable audio entirely — users who prefer reduced motion are often sensitive to sensory overload broadly.
5. **Persist preference.** Store in `localStorage`. User shouldn't have to re-enable on every visit.
6. **Executive Mode:** Audio is automatically muted when switching to Executive Mode.

### 7.2 Sound Design Spec

Use **Tone.js** (Web Audio API wrapper) to synthesize these sounds. Do not use audio files — synthesize everything programmatically. This is lighter (no downloads) and is itself a technical flex.

**Background Hum:**

```javascript
// Deep, low-frequency ambient drone
// Like a server room, filtered through walls
const hum = new Tone.Oscillator({
  frequency: 55,    // A1 — deep bass hum
  type: 'sine',
}).connect(new Tone.AutoFilter({
  frequency: '8n',
  depth: 0.3,
  baseFrequency: 60,
  octaves: 1,
})).toDestination();

hum.volume.value = -42;  // -42dB = very quiet
// Fade in over 3 seconds when enabled
hum.start();
```

**Navigation click:**

```javascript
// Brief, soft mechanical click
// Like a relay or switch — not a mouse click
const clickSynth = new Tone.MembraneSynth({
  pitchDecay: 0.008,
  octaves: 1,
  envelope: { attack: 0.001, decay: 0.08, sustain: 0, release: 0.05 }
}).toDestination();
clickSynth.volume.value = -28;

// Triggered on: nav item click, button click, filter tab click
clickSynth.triggerAttackRelease('C1', '32n');
```

**Data processing trill (boot sequence):**

```javascript
// Rapid ascending arpeggio during boot
// Each terminal line completing triggers one note
const bootSynth = new Tone.Synth({
  oscillator: { type: 'square' },
  envelope: { attack: 0.001, decay: 0.05, sustain: 0, release: 0.02 },
}).toDestination();
bootSynth.volume.value = -32;

// Notes: C5, E5, G5, B5 — one per boot line
```

**Certification verify success chime:**

```javascript
// 3-note ascending confirmation tone
// Like a system success ping
const chime = new Tone.PolySynth(Tone.Synth, {
  oscillator: { type: 'triangle' },
  envelope: { attack: 0.02, decay: 0.3, sustain: 0, release: 0.8 }
}).toDestination();
chime.volume.value = -20;

// Play: ['C5', 'E5', 'G5'] staggered 80ms
```

**Executive Mode toggle:**

```javascript
// Deeper, two-tone click — like a physical hardware switch
// NOC → Exec: low-to-high pitch
// Exec → NOC: high-to-low pitch
```

**Alert dismiss:**

```javascript
// Single soft descending tone — alert resolved
```

### 7.3 Speaker Icon States

```
◻  AUDIO: OFF    — Icon dimmed, crossed-out line
▶  AUDIO: ON     — Icon lit, subtle volume wave animation
```

Tooltip on hover: `AMBIENT AUDIO · [ON/OFF] · CLICK TO TOGGLE`

---

## 8. MOTION & ANIMATION PRINCIPLES

### Core Rules

1. **Purpose over decoration.** Every animation communicates something (loading, status, activity).
2. **Subtle, not loud.** The dashboard should feel alive, not distracting.
3. **60fps minimum.** Use `transform` and `opacity` only. Never `width`, `top`, `left`, `margin`.
4. **Respect `prefers-reduced-motion`.** Disable ALL continuous animations. Keep only instant state changes (no transitions at all, not just "reduced" transitions — full stop).
5. **Cognitive load management.** More than 3 simultaneous moving elements is too many. The EKG, particles, and uptime counter are the only things that should move simultaneously when idle. Syslog only scrolls when visible.

### Idle Settle Mode (NEW)

After **3 minutes** of zero mouse movement or interaction:

- EKG waveform: amplitude slowly decreases 40%, refresh rate drops to 15fps
- Three.js particles: speed reduces by 60%, new connection lines stop forming
- Bandwidth graph: freezes on last value (no new data points appended)
- Syslog: scroll speed halves
- Topbar uptime counter: still ticks (it's essential data, not decoration)
- Topbar shows subtle amber dim overlay: `⚑ SESSION IDLE`

On any mouse movement or keypress: everything instantly restores to full activity within 200ms.

**Rationale:** When someone is actually reading your achievements, the moving elements compete for attention. Settling gives their eyes a resting environment. This is the difference between a good portfolio and a great one.

### Timing Tokens

```
--fast:     150ms   Micro interactions (button hover color)
--normal:   250ms   State changes (border color, glow)
--slow:     400ms   Panel entrances, transitions
--crawl:    800ms   Complex sequences, boot lines
--ease:     cubic-bezier(0.4, 0, 0.2, 1)      Standard
--spring:   cubic-bezier(0.34, 1.56, 0.64, 1)  Slight overshoot
--exit:     cubic-bezier(0.4, 0, 1, 1)          Quick exits
```

### Scroll Reveal

IntersectionObserver with `threshold: 0.1`. When section enters viewport:

- Panels: `opacity: 0 → 1` + `translateY(20px → 0)` over 500ms
- Stagger child elements: 60ms between each

---

## 9. MICRO-INTERACTIONS CATALOG

|Element|Trigger|Response|Mobile Version|
|---|---|---|---|
|Nav items|Hover|Color + glow fade-in|Tap toggles active state|
|Panel cards|Hover|`translateY(-3px)` + border brightens|No lift on mobile|
|Skill bars|Section enters viewport|Bars animate 0→value|Same (IntersectionObserver works)|
|Skill item|Hover|Tooltip appears|Tap toggles tooltip; tap elsewhere dismisses|
|Cert `VERIFY` button|Click/tap|Multi-step text animation|Same|
|Cert filter tabs|Click/tap|Cards filter with fade|Same|
|Syslog entry|Click/tap|JSON accordion expands, feed pauses|Same|
|Traceroute|Viewport enter|Hop animation fires once|Tap button to trigger|
|Name|Every 7s (not idle)|Glitch flicker 200ms|Same (CSS interval)|
|Status rows|Hover|Row background lifts|No hover state needed|
|Timeline entries|Hover|Shadow deepens|No hover state|
|Hero badges|Hover|Glow bloom|No hover state|
|Topbar alert|Auto (4s)|Fade in; dismiss after 8s|Same|
|Executive Mode toggle|Click/tap|Full layout morph 600ms|Same|
|Audio toggle|Click/tap|Icon state + audio start/stop|Same|
|Syslog PAUSE button|Click/tap|Scroll stops, button changes|Same|
|Infrastructure nodes|Hover|Detail panel appears|Tap to show/hide panel|
|Boot visitor line|On geolocation resolve|Typewriter character-by-character|Same|

---

## 10. EASTER EGGS & HIDDEN FEATURES

### 10.1 Command Palette (Ctrl+K / Cmd+K)

Floating overlay, keyboard navigable.

```
> _

─── NAVIGATION ──────────────────────────────────────
→ STATUS (Hero)                               [1]
→ ABOUT / KERNEL INFO                         [2]
→ SKILLS / SERVICES                           [3]
→ EXPERIENCE                                  [4]
→ PROJECTS                                    [5]
→ CERTIFICATIONS                              [6]
→ EDUCATION                                   [7]
→ SYSLOG                                      [8]
→ CONTACT                                     [9]
→ INFRASTRUCTURE                              [0]

─── ACTIONS ──────────────────────────────────────────
→ DOWNLOAD RESUME                             [R]
→ OPEN LINKEDIN                               [L]
→ TOGGLE EXECUTIVE MODE                       [E]
→ TOGGLE AUDIO                                [A]
→ TOGGLE CRT SCANLINES                        [S]
→ TOGGLE PARTICLE BACKGROUND                  [P]
```

### 10.2 `sudo hire-me` Global Keypress

Capture global keystrokes (without focused input). When sequence completes:

1. Terminal overlay flashes:
    
    ```
    [sudo] password for recruiter: ••••••••Authenticating...✓ Permission granted. Excellent choice.Initiating onboarding sequence...
    ```
    
2. Brief green screen flash
3. Confetti fires (canvas-confetti)
4. Contact section scrolls into view
5. Audio: boot success chime plays

### 10.3 Konami Code (↑↑↓↓←→←→BA)

- Screen color scheme shifts to amber/green "night vision" for 5 seconds
- Toast: `NIGHT VISION MODE ACTIVATED · SIGNAL: STRONG`
- Audio: distinctive 3-note sequence if audio enabled

### 10.4 Footer Meta Panel

Tiny `CAREER_OS v9.4` in footer. Click → modal with site meta:

```
CAREER_OS // META INFORMATION

Tech Stack:    SvelteKit · Three.js · D3.js · Tone.js
Infrastructure: Cloudflare Pages · Cloudflare CDN · GitHub Actions
Design:        NOC Dashboard · JetBrains Mono · Chakra Petch
Built by:      Sruthik Issac
Lighthouse:    ● 100 / 100 (Performance · Accessibility · SEO)
Site Uptime:   [counter since launch date]
Last Deploy:   [date]
Visitor Node:  [their city from IP geolocation — reused]
```

### 10.5 Inactivity Mode (3 minutes idle)

- Topbar shows amber: `⚑ SESSION IDLE · AWAITING INPUT`
- Animations settle (see § 8)
- Any interaction immediately restores everything

---

## 11. RESPONSIVE BEHAVIOR

### Breakpoints

```
Desktop:   > 1200px    Full 2-column layout, side nav visible, all features
Tablet:    768-1200px  Reduced side nav (icons only), some 1-col sections
Mobile:    < 768px     No side nav, bottom tab bar, everything 1-col
```

### Mobile-Specific Rules

**Navigation:** Side nav becomes a **bottom tab bar** with 5 most important sections: `⌂ Home | ⬡ Skills | ≡ Experience | ◈ Certs | ⇝ Contact` Full nav accessible via a `···` More button.

**Hover → Tap mappings (critical):**

- Skill tooltips: Tap to toggle open. Second tap closes. Background tap closes.
- Traceroute: Show a `[▶ INITIATE TRACE]` button immediately. Don't wait for IntersectionObserver.
- Infrastructure node details: Tap to toggle detail panel.
- All hover-state visual lifts (`translateY(-3px)`): Remove entirely on mobile. Use `active:` state instead for feedback.
- Syslog accordion: Tap to expand. Same as desktop.
- Cert verify: Same tap as desktop.

**Top bar on mobile:** Show only logo + pulse dot + clock. Hide all center items. Keep audio and exec mode toggles in a `···` overflow menu.

**Performance on mobile:**

- Three.js particles: Max 40 nodes (vs 80 on desktop), capped at 24fps
- Scanlines: Disabled on mobile
- EKG canvas: Disabled on mobile (show a static waveform image instead)
- Bandwidth graph: Disabled on mobile
- Background canvas: Optional — detect if device is mid-tier and skip entirely

---

## 12. ACCESSIBILITY

- All interactive elements keyboard-navigable (Tab order logical, left-right, top-bottom)
- Color is never the only indicator — always pair with text or icon
- Canvas elements: `aria-hidden="true"` (all decorative)
- Section landmarks: `<main>`, `<nav aria-label="Sections">`, `<section aria-label="...">`
- Skip link: `<a href="#main" class="skip-link">Skip to content</a>` — visually hidden until focused
- `prefers-reduced-motion`: Disables ALL `@keyframes`, ALL continuous canvas animations, ALL transitions. Only instant state changes remain. This is a strict rule — not "reduce" but "eliminate." Users who set this flag often have vestibular disorders.
- `prefers-color-scheme: light`: Automatically activate Executive Mode. The NOC dark theme is an opt-in experience, not imposed on users who prefer light mode.
- Contrast: All text passes WCAG AA. Primary (#dceeff on #07091a) = 12.6:1 — AAA. Executive Mode text (#1a2332 on #f4f5f7) = 15.2:1 — AAA.
- Focus rings: Custom `box-shadow: 0 0 0 2px var(--cyan)` on all focusable elements. Visible in both NOC and Executive Mode.
- Font size: Nothing below 10px rendered text (0.52rem at 16px base). Micro labels only for purely decorative/redundant text.
- Audio: Always muted by default. Audio toggle has clear label and keyboard access. No audio-only information — everything audio communicates is also visual.

---

## 13. PERFORMANCE BUDGET

|Asset|Target|
|---|---|
|JavaScript (initial)|< 120 KB gzip|
|CSS|< 20 KB gzip|
|Fonts (subset)|< 50 KB total|
|Three.js|Lazy load after boot completes|
|D3.js|Lazy load per section|
|Tone.js|Lazy load only on audio opt-in|
|Total initial load|< 200 KB|
|First Contentful Paint|< 1.0s|
|Time to Interactive|< 2.0s|
|Animation target FPS|60fps desktop, 30fps mobile|
|Lighthouse score|100 / 100 / 100 / 100|

### Optimization Notes

- Subset Google Fonts: Only load characters used (`text=` URL param or self-host with `fonttools`)
- Three.js: `import * as THREE from 'three'` only after boot overlay fades out
- D3: Per-section dynamic imports triggered by IntersectionObserver
- Tone.js: Dynamic import only when user opts in to audio — `await import('tone')`
- Skill bars, syslog, EKG, bandwidth graph: Only run `requestAnimationFrame` loops when the element is in the viewport
- `will-change: transform` only on actively animating elements, removed after animation ends
- Cloudflare Pages automatically: Brotli compression, HTTP/3, edge caching, image optimization
- IP geolocation: Cache result in `sessionStorage` so it's only fetched once per session

---

## APPENDIX A — CONTENT REFERENCE

### Personal Details

```
Name:       Sruthik Issac
Email:      sruthikissac2016@gmail.com
Phone:      +91 73735 22116
Location:   Madurai → Chennai, Tamil Nadu, India
LinkedIn:   linkedin.com/in/sruthikissac-5b9119198
Portfolio:  sruthik2016.pythonanywhere.com
```

### Career Timeline

```
Jun 2004 – Mar 2019    Rotary Laharry Matriculation HSS (School)
Nov 2020 – Jun 2024    Thiagarajar College of Engineering (B.E. CS)
Feb 2024 – Aug 2024    HPE — Cloud Developer Intern
Sep 2024 – present     HPE — Cloud Engineer (Aruba Networks)
```

### Certification Count by Authority

```
Cisco:           7   (Networking Basics, CCNA Intro, CCNA, Cybersecurity,
                      Ethical Hacker, AI for Networking, Networking Devices)
AWS:             2   (Solutions Architect Associate, AI Practitioner)
Microsoft:       1   (Azure Fundamentals AZ-900)
HackerRank:      6   (Python, Problem Solving, SQL, C#, Go, REST API)
Zero To Mastery: 3   (SQL Bootcamp, Web Developer, UX/UI Designer)
Udemy:           2   (TypeScript+React, Java Concurrency)
HPE:             2   (Open Source Tools + Ezmeral, Kubernetes Containers)
Google:          1   (Bits and Bytes of Networking — Coursera)
IIT Kharagpur:   1   (Cloud Computing — NPTEL)
Confluent:       1   (Confluent Fundamentals)
Redis:           2   (Redis for Java, Redis Streams)
Apollo:          1   (GraphQL Developer Associate)
ArangoDB:        1   (ArangoDB Certified Professional)
ClickHouse:      1   (ClickHouse Developer)
MongoDB:         1   (Building GenAI Apps)
LangChain:       1   (LangChain Essentials)
TOTAL:          34
```

---

## APPENDIX B — ANIMATION TIMING CHEAT SHEET

```
Boot sequence total:              3.5s
  Logo fade-in:                   0 → 400ms
  IP geolocation fetch:           fires at 0ms (parallel)
  Terminal lines:                 400ms → 3000ms (stagger: 115ms/line)
  Line 4 typewriter (visitor):    character-by-character, 30ms/char
  Progress bar:                   500ms → 3300ms
  Fade to dashboard:              3300ms → 4100ms

Dashboard entrance:
  Top bar slide-down:             0ms after boot → 300ms
  Side nav slide-in:              80ms delay → 380ms
  Hero left col:                  200ms delay → 700ms (stagger: 100ms)
  Hero right col:                 300ms delay → 800ms
  Alert banner:                   4000ms after load

Scroll-triggered (per section):
  Section header:                 0ms (instant on visibility)
  First panel row:                0ms
  Subsequent rows:                60ms stagger
  Skill bars fill:                100ms delay then 1400ms duration

Syslog JSON accordion:
  Open:  max-height 0→auto over 300ms + opacity 0→1
  Close: opacity 1→0 then max-height auto→0 over 250ms

Executive Mode transition:
  Screen flash:                   80ms
  Particles fade:                 400ms
  Color crossfade:                500ms
  Font swap:                      instant (class change)
  Total:                          ~600ms

Continuous (looping):
  Pulse dot:                      1500ms ease-in-out infinite
  EKG waveform:                   continuous canvas (settles at 3min idle)
  Uptime counter:                 1000ms setInterval
  Syslog scroll:                  continuous ~25px/s (settles at 3min idle)
  Bandwidth graph:                200ms data interval (freezes at 3min idle)

Audio fade-in on enable:          3000ms (background hum)
Audio fade-out on disable:        1500ms
```

---

## APPENDIX C — IMPLEMENTATION PRIORITY ORDER

Build in this sequence to always have something impressive to show:

```
Phase 1 — Core Foundation (Week 1-2)
  ✓ SvelteKit project setup + Cloudflare Pages deploy
  ✓ Design system (CSS variables, fonts, base panel styles)
  ✓ Topbar + Side nav (static, no interactivity yet)
  ✓ Hero section (static, no animations yet)
  ✓ About section

Phase 2 — Animations & Life (Week 3-4)
  ✓ Boot sequence (with IP geolocation)
  ✓ Uptime counter (live ticking)
  ✓ Three.js particle background
  ✓ EKG canvas
  ✓ Scroll reveal (IntersectionObserver)
  ✓ Skill bar animations

Phase 3 — All Sections (Week 5-7)
  ✓ Skills section (all 4 clusters + tooltips)
  ✓ Experience timeline
  ✓ Projects grid (all 9 cards + sparklines)
  ✓ Certifications (all 34 + filter + verify interaction)
  ✓ Education
  ✓ Syslog (scrolling + accordion)
  ✓ Contact (traceroute + peer registry)

Phase 4 — Power Features (Week 8-10)
  ✓ Infrastructure diagram (SVG isometric)
  ✓ Executive Mode (full layout morph)
  ✓ Ambient audio system (Tone.js)
  ✓ Command palette (Ctrl+K)
  ✓ Idle settle mode

Phase 5 — Polish & Easter Eggs (Week 11-12)
  ✓ sudo hire-me
  ✓ Konami code
  ✓ Footer meta panel
  ✓ Mobile responsiveness + hover→tap mappings
  ✓ Accessibility audit
  ✓ Performance audit → Lighthouse 100
  ✓ prefers-reduced-motion testing
  ✓ PDF résumé generation
```

---

_End of Design Document — Version 2.0_ _Build with obsession. Ship with pride. Every detail is a signature._