# Webapps — Design System Reference
**v2.0 — Universal Component Guide**

> This is the single source of truth for every UI decision.
> Rules apply to every component you build — new or existing.
> If something isn't covered here, choose the simpler option. Never invent.

---

## 0. Conflict Resolution

When two rules conflict, resolve in this strict order:

```
1. Accessibility
2. Spacing consistency
3. Typography rules
4. Color tokens
5. Layout / grid
6. Motion
```

---

## 1. Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14+ (App Router) |
| Styling | Tailwind CSS |
| Components | React functional only |
| Font — Display | **Satoshi** → `font-display` |
| Font — Body | **Inter** → `font-sans` |
| Icons | Lucide React — stroke only, `strokeWidth={1.5}` |
| Animation | Tailwind transitions + Framer Motion (constrained, see Section 8) |

---

## 2. Color Tokens

Never use raw Tailwind color classes (`bg-gray-100`, `text-zinc-500` etc.).
Always use these hex values directly.

### Backgrounds

```
#F9F8F6   →  Primary background (page default, warm off-white)
#F3F2EF   →  Subtle background (alternating sections)
#EBEBЕ8   →  Muted (hover fills, disabled states, chips)
#0A0A0A   →  Inverse (dark sections, footer)
```

### Text

```
#0A0A0A   →  Primary   (headings, high-emphasis body)
#6B6B6B   →  Secondary (supporting copy, labels, meta)
#9A9A9A   →  Tertiary  (placeholders, disabled, timestamps)
#F9F8F6   →  Inverse   (any text on dark backgrounds)
```

### Borders

```
#E2E1DE   →  Default  (cards, dividers, inputs)
#C9C8C5   →  Strong   (focus rings, active borders)
```

### Accent

```
#2563EB   →  Blue  (default choice)
#D97706   →  Amber (alternative — pick one per project, never mix)
```

**Accent rules:**
- Use on primary buttons, active states, inline links, and key data callouts only.
- Never exceeds 10% of any component's visual area.
- Never on backgrounds or large surfaces.

---

## 3. Background Alternation

For page-level sections, strictly alternate. Never stack the same background twice.

```
Section (odd)   →  #F9F8F6
Section (even)  →  #F3F2EF
Inverse section →  #0A0A0A  (CTAs, footer — can appear at any position)
```

---

## 4. Typography

### Font Assignment

```
font-display (Satoshi)  →  All headings, eyebrows, nav items, labels
font-sans   (Inter)     →  All body copy, captions, UI text, inputs
```

Never swap these. A heading is always Satoshi. Body is always Inter.

### Type Scale

| Role | Size | Tailwind | Font | Weight |
|---|---|---|---|---|
| Hero | 72px | `text-[72px]` | display | bold |
| H1 | 48px | `text-[48px]` | display | bold |
| H2 | 36px | `text-4xl` | display | semibold |
| H3 | 24px | `text-2xl` | display | semibold |
| H4 | 18px | `text-lg` | display | medium |
| Body | 16px | `text-base` | sans | regular |
| Small | 14px | `text-sm` | sans | regular |
| XSmall | 12px | `text-xs` | sans | medium |

### Tracking + Leading

```
Hero / H1  →  tracking-[-0.03em]  leading-[1.08]
H2         →  tracking-[-0.02em]  leading-[1.15]
H3         →  tracking-[-0.01em]  leading-[1.25]
Body       →  tracking-[0]        leading-[1.7]
Small      →  tracking-[0.01em]   leading-[1.6]
Eyebrow    →  tracking-[0.08em]   leading-normal   uppercase
```

### Eyebrow Labels

Small labels that appear above section headings.

```
text-xs font-medium font-sans uppercase tracking-[0.08em] text-[#6B6B6B]
```

Always above an H2. Never accent-coloured. Never bold.

### Rules
- Emphasis = font-weight change only. Never use color for emphasis inside body text.
- Max ~12 words per heading line on desktop.
- Body copy max-width: `max-w-[640px]` — never let lines run longer.
- One H1 per page. Always in the hero.
- Never more than 2–3 lines per heading block.

---

## 5. Spacing

Use only these values. No arbitrary or in-between values.

```
4px   →  gap-1  / p-1  / m-1
8px   →  gap-2  / p-2  / m-2
12px  →  gap-3  / p-3  / m-3
16px  →  gap-4  / p-4  / m-4
24px  →  gap-6  / p-6  / m-6
32px  →  gap-8  / p-8  / m-8
48px  →  gap-12 / p-12 / m-12
64px  →  gap-16 / p-16 / m-16
80px  →  gap-20 / p-20 / m-20
96px  →  gap-24 / p-24 / m-24
128px →  gap-32 / p-32 / m-32
```

### Internal Component Rhythm

This sequence applies inside almost every component:

```
Eyebrow  →  mb-3
Heading  →  mb-4
Subtext  →  mb-10 or mb-12
CTA / action
```

### Section Padding

```
py-24 md:py-32
```

---

## 6. Layout

### Page Container

```
max-w-[1200px] mx-auto px-6 md:px-10 lg:px-12
```

### Grid

```
grid grid-cols-12 gap-x-6
```

### Common Column Patterns

```
Full width         →  col-span-12
Two equal halves   →  col-span-12 md:col-span-6
Thirds             →  col-span-12 md:col-span-4
Quarters           →  col-span-12 md:col-span-3
Narrow centered    →  col-span-12 md:col-span-8 mx-auto
Very narrow        →  col-span-12 md:col-span-6 mx-auto
```

### Alignment

```
Default   →  left-aligned
Centered  →  hero headings and standalone CTA blocks only
Right     →  never
```

---

## 7. Component Patterns

### Buttons

**Primary**
```
bg-[#0A0A0A] text-[#F9F8F6]
px-6 py-3 rounded-md
text-sm font-medium font-sans tracking-[0.01em]
hover:bg-[#1A1A1A]
transition-colors duration-150
focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]
```

**Secondary (Ghost)**
```
border border-[#0A0A0A] text-[#0A0A0A]
px-6 py-3 rounded-md
text-sm font-medium font-sans
hover:bg-[#0A0A0A] hover:text-[#F9F8F6]
transition-colors duration-150
```

**Text Link**
```
text-[#0A0A0A] text-sm font-medium
underline underline-offset-4 decoration-[#E2E1DE]
hover:decoration-[#0A0A0A]
transition-colors duration-150
```

**Inverse (on dark backgrounds)**
```
bg-[#F9F8F6] text-[#0A0A0A]
px-6 py-3 rounded-md
text-sm font-medium font-sans
hover:bg-[#E2E1DE]
transition-colors duration-150
```

Button groups: `gap-3` horizontal, `gap-2` stacked. Max 2 CTAs together.

---

### Cards

```
bg-[#F9F8F6] border border-[#E2E1DE] rounded-lg
p-6 md:p-8
hover:border-[#C9C8C5]
transition-colors duration-200
```

No box-shadow. Hover = border darkens only. No scale or lift.

Internal card rhythm:
```
Icon / media  →  mb-4
Heading (H3)  →  mb-2
Body copy     →  mb-5
Link / action
```

---

### Dividers

```
border-t border-[#E2E1DE] my-12 md:my-16
```

Use at section tops, between list items, between quote and attribution.

---

### Tags / Chips

```
bg-[#EBEBЕ8] text-[#6B6B6B]
text-xs font-medium font-sans
px-3 py-1 rounded-full
```

---

### Inputs

```
border border-[#E2E1DE] rounded-md
bg-[#F9F8F6] text-[#0A0A0A]
px-4 py-3 text-base font-sans
placeholder:text-[#9A9A9A]
focus:outline-none focus:border-[#C9C8C5] focus:ring-1 focus:ring-[#C9C8C5]
transition-colors duration-150
```

---

### Navigation

```
// Bar
sticky top-0 z-50
bg-[#F9F8F6]/90 backdrop-blur-sm
border-b border-[#E2E1DE]
py-4

// Logo
font-display font-bold text-base tracking-[-0.02em] text-[#0A0A0A]

// Nav links
font-sans text-sm font-medium text-[#6B6B6B]
hover:text-[#0A0A0A] transition-colors duration-150

// Active link
text-[#0A0A0A] font-semibold
```

---

### Accordion / FAQ items

```
// Wrapper per item
border-t border-[#E2E1DE] py-5

// Question
text-base font-semibold font-sans text-[#0A0A0A]

// Answer
text-base font-sans text-[#6B6B6B] leading-relaxed mt-3

// Chevron
16px Lucide ChevronDown
rotate-0 → rotate-180 on open
transition-transform duration-200

// Answer reveal
opacity-0 → opacity-100, duration 200ms
```

---

### Footer

```
// Wrapper
bg-[#0A0A0A] py-16 md:py-20

// Column headings
font-display text-sm font-semibold text-[#F9F8F6] mb-4

// Links
font-sans text-sm text-[#6B6B6B]
hover:text-[#F9F8F6] transition-colors duration-150

// Bottom bar
border-t border-[#F9F8F6]/10 pt-8 mt-16
text-xs text-[#6B6B6B]
```

---

## 8. Motion

### Rules
- Animate on **first viewport entry only** — never re-trigger.
- Animate groups/sections, not individual isolated elements.
- Navigation, footer, and inline text — no animation.
- Never animate layout properties (width, height, padding).

### Allowed Values

```
Property:   opacity (0 → 1) + translateY (16px → 0)
Duration:   400ms
Easing:     cubic-bezier(0.16, 1, 0.3, 1)
Stagger:    80ms between siblings

Hover transitions (Tailwind only):
  Buttons / links  →  duration-150
  Cards / borders  →  duration-200
```

### Not Allowed

```
❌ Bounce or spring overshoot
❌ Parallax
❌ Scroll hijacking
❌ Scale transforms on hover
❌ Re-triggering on scroll-back
❌ Any animation on nav or footer
```

---

## 9. Accessibility (Non-Negotiable)

- All interactive elements must have `:focus-visible` styles (see button specs above).
- Contrast: all defined token pairs pass WCAG AA — do not deviate from tokens.
- Semantic HTML always: `<section>`, `<nav>`, `<main>`, `<footer>`, `<article>`, `<h1>`–`<h3>`.
- One `<h1>` per page.
- Images always have descriptive `alt` text.
- Icon-only buttons always have `aria-label`.
- Accordions use `aria-expanded` and `aria-controls`.

---

## 10. Anti-Patterns

| ❌ Never | ✅ Instead |
|---|---|
| Gradients | Flat color tokens only |
| `bg-gray-*`, `text-zinc-*` | Use hex tokens directly |
| `box-shadow` on cards | Border darkens on hover |
| Pure `#FFFFFF` | `#F9F8F6` |
| Pure `#000000` | `#0A0A0A` |
| More than 2 fonts | Satoshi + Inter only |
| Default center alignment | Left-align except defined exceptions |
| Arbitrary spacing (`mt-[22px]`) | Only the spacing scale |
| Arbitrary font sizes | Only the defined scale |
| Decorative flourishes, quote marks | Typography alone |
| Emojis | Lucide icons, stroke only |
| `text-blue-500` for accent | `text-[#2563EB]` |
| Bounce / spring / parallax | Fade + translateY only |
| Inline styles | Tailwind classes only |
| Two identical adjacent section backgrounds | Strict alternation |
| Scale or lift on card hover | Border color change only |

---

## 11. Final Rule

> **Structure over decoration. Clarity over cleverness.**
>
> When in doubt — simpler is correct.
