---
name: Academic Precision
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#43474d'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#74777e'
  outline-variant: '#c3c6ce'
  surface-tint: '#49607c'
  primary: '#00152a'
  on-primary: '#ffffff'
  primary-container: '#102a43'
  on-primary-container: '#7a92b0'
  inverse-primary: '#b0c9e8'
  secondary: '#006e2d'
  on-secondary: '#ffffff'
  secondary-container: '#7cf994'
  on-secondary-container: '#007230'
  tertiary: '#001626'
  on-tertiary: '#ffffff'
  tertiary-container: '#002b45'
  on-tertiary-container: '#2f96db'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d1e4ff'
  primary-fixed-dim: '#b0c9e8'
  on-primary-fixed: '#011d35'
  on-primary-fixed-variant: '#314863'
  secondary-fixed: '#7ffc97'
  secondary-fixed-dim: '#62df7d'
  on-secondary-fixed: '#002109'
  on-secondary-fixed-variant: '#005320'
  tertiary-fixed: '#cce5ff'
  tertiary-fixed-dim: '#93ccff'
  on-tertiary-fixed: '#001d31'
  on-tertiary-fixed-variant: '#004b73'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Inter
    fontSize: 26px
    fontWeight: '600'
    lineHeight: 34px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 22px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
  label-xs:
    fontFamily: Inter
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 12px
    letterSpacing: 0.06em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-mobile: 0.75rem
  margin: 1.5rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
---

## Brand & Style
The design system embodies a modern, high-clarity academic operating system tailored for university life. It marries the institutional gravitas of top-tier universities with the crisp, utility-first polish of modern productivity software (Linear, Notion) and modern fintech tools. 

Targeting university students, faculty, and administrative departments, the interface establishes an atmosphere of agency, momentum, and operational clarity. It reduces cognitive load during high-friction academic moments—course registration, CGPA tracking, lecture scheduling, and departmental notices—replacing chaotic bulletin boards with an ambient, reliable personal terminal.

The aesthetic philosophy centers on modern, functional minimalism:
- **Structural Transparency:** Layouts prioritize scannability with disciplined information density, deliberate micro-labels, and distinct priority status pills.
- **Academic Reliability:** Heavy reliance on structured data lists, clear tabular figures, and verified institution badges to impart trust and academic rigor.
- **Tactile Utility:** Micro-interactions mimic high-end productivity applications—snappy status toggles, clear keyline groupings, zero visual bloat, and purposeful visual cues.

## Colors
The palette leverages a deep institutional navy as its grounding authority, balanced by energetic botanical greens that signify progression, verified states, and campus life.

- **Primary (`#102A43`)**: Deep Oxford Navy. Used for primary brand marks, high-emphasis interactive surfaces, active bottom-navigation tabs, and primary action buttons.
- **Secondary (`#16A34A`)**: Campus Green. Represents active semesters, high academic standing, verified status badges, and affirmative primary triggers.
- **Tertiary (`#0284C7`)**: Sky Blue. Serves as an auxiliary accent for informational callouts, department tags, live timetable indicators, and portal synchronization states.
- **Neutral (`#64748B`)**: Slate Gray. Used across metadata, secondary body text, inactive icons, and neutral keylines.

### Additional Functional Colors
- **Canvas Base**: `#F8FAFC` (Slate 50) for effortless reading without stark clinical glare.
- **Surface**: `#FFFFFF` (Pure Crisp White) for card containers, modals, bottom sheets, and elevated elements.
- **Text Primary**: `#0F172A` (Slate 900) providing ultra-crisp typographic contrast.
- **Text Secondary / Muted**: `#64748B` (Slate 500) for subheads, time stamps, course codes, and captioning.
- **Borders & Dividers**: `#E2E8F0` (Slate 200) for structural low-contrast containment.
- **Success Tint**: `#DCFCE7` (Surface) paired with `#15803D` (Text).
- **Notice / Info Tint**: `#E0F2FE` (Surface) paired with `#0369A1` (Text).
- **Alert / Overdue**: `#EF4444` (Text) paired with `#FEE2E2` (Surface).

## Typography
Built around a single, highly legible workhorse typeface: **Inter**. The typographic scale focuses on compact vertical metrics, high x-height, and precise tabular figure support for academic scores, course codes, and unit loads.

### Application Guidelines
- **Micro-Labels & Meta Overlines:** Use `label-xs` and `label-sm` with uppercase transformations and subtle letter spacing (`0.04em` to `0.06em`) for departmental abbreviations, semester markers (e.g., `RAIN SEMESTER • 2024/2025`), and course codes (`CSC 301`).
- **Tabular Figures:** Always apply `font-feature-settings: "tnum" 1` for grade points, CGPA calculations, unit calculations, and live classroom clocks.
- **Negative Letter Spacing on Headlines:** Tighten display levels slightly (`-0.02em` to `-0.03em`) to deliver that confident, editorial tech appearance seen in high-end productivity suites.

## Layout & Spacing
The layout system is mobile-first, designed for one-handed operation on mid-to-large smartphones while cleanly expanding into multi-pane dashboard configurations on desktop viewports.

### Grid System & Form Factors
- **Mobile (`< 640px`)**: Single-column layout. Margin of `1rem` (16px), column gutter of `0.75rem` (12px). Fixed top contextual app bar and persistent bottom navigation bar (56px–64px height) padded with mobile device safe areas (`env(safe-area-inset-bottom)`).
- **Tablet (`640px – 1024px`)**: 6-column fluid grid. Margin of `1.5rem` (24px), gutters of `1rem` (16px). Bottom bar transitions to an adaptive vertical mini-rail on the left.
- **Desktop (`> 1024px`)**: 12-column layout with a fixed max-width container of `1280px`. Left sidebar navigation (240px width), centralized analytical feed (main column), and a contextual secondary panel (timetable overview, event reminders).

### Vertical Rhythm
- Stack elements using uniform spacing intervals (`space-sm` for related label-to-value pairings, `space-lg` between distinct card sections, and `space-xl` between master content clusters).
- Avoid erratic vertical stacking; group related metadata into distinct visual islands using 12px–16px inner padding.

## Elevation & Depth
This design system avoids heavy skeuomorphic drops and multi-colored blurred glows. Depth is defined through high-precision border keylines and faint, multi-stop ambient shadows.

### Elevation Hierarchy
- **Level 0 (Canvas Base)**: `#F8FAFC`. Completely flat.
- **Level 1 (Cards, Modules, Input Fields)**: `#FFFFFF` surface enclosed by a 1px border of `#E2E8F0`. Shadow: `0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 1px 2px -1px rgba(15, 23, 42, 0.02)`.
- **Level 2 (Interactive Floating Elements, Dropdowns, Segmented Tabs)**: `#FFFFFF` surface with `#E2E8F0` border. Shadow: `0 4px 6px -1px rgba(15, 23, 42, 0.06), 0 2px 4px -2px rgba(15, 23, 42, 0.04)`.
- **Level 3 (Modals, Bottom Sheets, Command Bar)**: `#FFFFFF` surface with `#CBD5E1` border. Shadow: `0 20px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)`. Accompanied by a 40% opacity slate scrim (`#0F172A66`) with a 4px backdrop blur.

## Shapes
Geometry emphasizes friendly utility combined with sharp, modern precision:

- **Base Radius (`0.5rem` / 8px)**: Applied to micro-components, standard inputs, small badges, inline tags, and context menus.
- **Large Radius (`rounded-lg`, `1rem` / 16px)**: The standard shape token for standard cards, feed items, lecture containers, and assignment modules.
- **Extra-Large Radius (`rounded-xl`, `1.5rem` / 24px)**: Used for mobile bottom sheets, high-level banner modules, and floating primary action dialogs.
- **Pill Shape (`9999px`)**: Reserved for verified indicator badges, academic standing indicators (e.g., "First Class Honors"), status tags ("Ongoing", "Submitted"), and bottom floating navigation containers.

## Components

### Buttons
- **Primary**: Solid Deep Navy (`#102A43`) background, `#FFFFFF` text, `rounded-xl`, 44px height for touch targets. Active state dims to `#0B1D2F`.
- **Accent**: Fresh Vibrant Green (`#16A34A`) background, `#FFFFFF` text, `rounded-xl`. Used for high-impact actions like "Pay Dues", "Register Course", or "Submit Assignment".
- **Secondary / Subtle**: `#FFFFFF` background, 1px keyline border `#E2E8F0`, `#0F172A` text. Hover/press state shifts to `#F1F5F9`.
- **Ghost**: Transparent background, `#64748B` text, shifts to `#F1F5F9` on interaction with `#0F172A` active text.

### Chips & Status Pills
- **Verified Badge**: Soft sky-blue or green tint surface (`#DCFCE7` or `#E0F2FE`), matching deep iconography/text (`#15803D` or `#0369A1`), pill radius (`9999px`), 24px height, with a 12px checkmark or institutional seal icon.
- **Priority & Stage Indicators**: 
  - *High / Critical*: `#FEE2E2` surface with `#B91C1C` text.
  - *In Progress*: `#FEF3C7` surface with `#B45309` text.
  - *Completed / Validated*: `#DCFCE7` surface with `#15803D` text.

### Form Inputs & Selectors
- **Input Fields**: Crisp white surface, 1px `#E2E8F0` border, 48px height, `rounded-xl`. Focus state utilizes a solid 2px outline in Deep Navy (`#102A43`) with 0 offset. Placeholder text in `#94A3B8`.
- **Checkboxes & Radios**: 20px size with 6px border-radius (checkbox) or circular (radio). Unchecked: 1.5px border `#CBD5E1`. Checked: Solid `#102A43` or `#16A34A` with white centered indicator.

### Cards & Structured Lists
- **Course & Grade Cards**: White background, 16px internal padding, `rounded-xl` corners, 1px `#E2E8F0` border. Top row houses course code (`label-md`, bold) and unit pill; middle row displays course title (`body-md`, semibold); bottom row details lecturer, venue, and lecture time in muted slate (`body-sm`).
- **Dense List Items**: Dividers rendered using 1px `#F1F5F9`. No full outer border when stacked in a unified card container.

### Bottom Navigation Bar (Mobile)
- Docked or floating pill structure (floating with 16px horizontal margins, 12px bottom clearance).
- Background: `#FFFFFF` with 80% opacity and 12px backdrop blur.
- Border: 1px `#E2E8F0`. Height: 60px.
- Icons: 24px Lucide/Feather style strokes. Inactive: `#64748B`. Active: `#102A43` paired with an active dot indicator in `#16A34A`.