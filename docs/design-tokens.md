# Where2Studios — Design Tokens

> Extracted from `src/index.css` and `tailwind.config.ts`. All values are exact.

---

## Color System (M3)

All colors are stored as HSL channel values in CSS custom properties and consumed via `hsl(var(--token))`.

### Core Palette

| Token | HSL Channels | Hex | Usage |
|---|---|---|---|
| `--m3-primary` | `43 80% 51%` | `#E09E24` | Golden Yellow — buttons, links, accents |
| `--m3-on-primary` | `72 31% 6%` | `#14180A` | Text on primary surfaces |
| `--m3-secondary` | `6 90% 37%` | `#AE200C` | Brick Red — destructive, error states |
| `--m3-on-secondary` | `0 0% 100%` | `#FFFFFF` | Text on secondary surfaces |

### Backgrounds & Surfaces

| Token | HSL Channels | Hex | Usage |
|---|---|---|---|
| `--m3-background` | `40 100% 99%` | `#FFFBF5` | Page background (cream) |
| `--m3-on-background` | `72 31% 6%` | `#14180A` | Body text |
| `--m3-surface` | `0 0% 100%` | `#FFFFFF` | Cards, elevated surfaces |
| `--m3-surface-variant` | `40 100% 97%` | `#FFF8EE` | Tonal cards, inputs, muted backgrounds |
| `--m3-on-surface` | `72 31% 6%` | `#14180A` | Text on any surface |

### Dark Surfaces

| Token | HSL Channels | Hex | Usage |
|---|---|---|---|
| `--m3-surface-dark` | `72 31% 6%` | `#14180A` | Dark sections, footer, hero overlays |
| `--m3-on-dark` | `0 0% 100%` | `#FFFFFF` | Text on dark surfaces |

### Outline

| Token | Value | Usage |
|---|---|---|
| `--m3-outline` | `72 31% 6% / 0.12` | Borders, dividers (12% opacity near-black) |

### Legacy Brand Colors (compatibility)

| Variable | Value |
|---|---|
| `--brick-red` | `#AE200C` |
| `--golden-yellow` | `#E09E24` |
| `--near-black` | `#14180A` |
| `--cream-highlight` | `#EBC37E` |

### Dark Mode Overrides (`.dark`)

| Token | Dark HSL |
|---|---|
| `--m3-background` | `72 31% 6%` |
| `--m3-on-background` | `40 100% 99%` |
| `--m3-surface` | `72 20% 10%` |
| `--m3-surface-variant` | `72 15% 14%` |
| `--m3-on-surface` | `40 100% 99%` |
| `--m3-surface-dark` | `0 0% 0%` |
| `--m3-on-dark` | `40 100% 99%` |

---

## Typography

### Font Stack

| Role | Family | Tailwind Class |
|---|---|---|
| Headings / Display | `'Fredoka', sans-serif` | `font-fredoka` or `font-display` |
| Body / Labels | `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif` | `font-sans` (default) |
| Buttons | `'Fredoka', sans-serif` | Inherited from `.m3-filled-button` etc. |

### Type Scale

| Element | Font | Size | Weight | Line Height | Letter Spacing |
|---|---|---|---|---|---|
| `h1` (Display) | Fredoka | `clamp(3rem, 5vw, 4.5rem)` | 600 | 1.1 | -0.01em |
| `h2` (Headline) | Fredoka | `clamp(2.25rem, 4vw, 3.5rem)` | 600 | 1.15 | -0.01em |
| `h3` (Title) | Fredoka | `clamp(1.5rem, 3vw, 2.25rem)` | 500 | 1.2 | 0 |
| `h4` (Subtitle) | Fredoka | `clamp(1.25rem, 2vw, 1.5rem)` | 500 | 1.25 | 0 |
| `p` (Body) | Inter | `1.0625rem` (17px) | 400 | 1.6 | 0 |
| `label` | Inter | `0.75rem` (12px) | 600 | 1.5 | 0.05em, uppercase |
| `button` | Fredoka | `1rem` (16px) | 500 | 1.5 | — |
| `input` | Inter | `1rem` (16px) | 400 | 1.5 | — |

### Base Font Size

| Breakpoint | `--font-size` |
|---|---|
| Default | `17px` |
| ≥ 1440px | `18px` |

### Eyebrow Labels (convention)

```
text-xs font-semibold uppercase tracking-widest text-m3-primary
```

---

## Elevation & Shadows

| Token | Value |
|---|---|
| `--shadow-sm` | `0 1px 3px hsl(72 31% 6% / 0.06), 0 1px 2px hsl(72 31% 6% / 0.08)` |
| `--shadow-md` | `0 4px 12px hsl(72 31% 6% / 0.08), 0 2px 4px hsl(72 31% 6% / 0.06)` |
| `--shadow-lg` | `0 8px 28px hsl(72 31% 6% / 0.12), 0 4px 10px hsl(72 31% 6% / 0.08)` |
| `--shadow-xl` | `0 20px 50px hsl(72 31% 6% / 0.16), 0 8px 20px hsl(72 31% 6% / 0.10)` |

---

## Border Radius

| Token | Value |
|---|---|
| `--radius` (base) | `1rem` (16px) |
| `--radius-sm` | `calc(var(--radius) - 4px)` → 12px |
| `--radius-md` | `calc(var(--radius) - 2px)` → 14px |
| `--radius-lg` | `var(--radius)` → 16px |
| `--radius-xl` | `calc(var(--radius) + 4px)` → 20px |

---

## Component Tokens

### Cards

| Class | Background | Border | Shadow | Hover |
|---|---|---|---|---|
| `.m3-elevated-card` | `hsl(--m3-surface)` | none | `--shadow-md` | `--shadow-lg` |
| `.m3-outlined-card` | `hsl(--m3-surface)` | `1px solid hsl(--m3-outline)` | none | — |
| `.m3-tonal-card` | `hsl(--m3-surface-variant)` | none | none | — |

All cards use `border-radius: var(--radius)` and `transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)`.

### Buttons

| Class | Background | Text | Padding | Border Radius |
|---|---|---|---|---|
| `.m3-filled-button` | `hsl(--m3-primary)` | `hsl(--m3-on-primary)` | `12px 24px` | `980px` (pill) |
| `.m3-outlined-button` | `transparent` | `hsl(--m3-on-surface)` | `12px 24px` | `980px` (pill) |
| `.m3-text-button` | `transparent` | `hsl(--m3-on-surface)` | `8px 16px` | `8px` |

- Filled hover: `brightness(1.05)` + `--shadow-md`
- Filled active: `scale(0.98)`
- Outlined hover: `bg → hsl(--m3-surface-variant)`
- Text hover: `bg → hsl(--m3-on-surface / 0.08)`

All buttons use `transition: all 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)`.

### Filter Chips

| Class | Background | Text | Padding | Border Radius |
|---|---|---|---|---|
| `.m3-filter-chip-active` | `hsl(--m3-surface-variant)` | `hsl(--m3-on-surface)` | `8px 16px` | `8px` |
| `.m3-filter-chip-inactive` | `transparent` | `hsl(--m3-on-surface / 0.85)` | `8px 16px` | `8px` |

---

## Section Spacing

| Class | Padding |
|---|---|
| `.section-spacing` | `clamp(4rem, 10vw, 8rem) 0` |
| `.section-spacing-tight` | `clamp(2rem, 6vw, 4rem) 0` |
| Typical section (inline) | `py-16 sm:py-20` or `py-16 sm:py-24` |
| Footer bottom padding | `pb-24 sm:pb-28` (clearance for FloatingCTA) |

---

## Container

| Breakpoint | Max Width |
|---|---|
| sm | `40rem` (640px) |
| md | `48rem` (768px) |
| lg | `64rem` (1024px) |
| xl | `80rem` (1280px) |
| 2xl | `96rem` (1536px) |

Padding: `calc(var(--spacing) * 4)` — typically overridden inline with `px-4 sm:px-8 lg:px-12`.

---

## Animations

| Name | Duration | Easing |
|---|---|---|
| `fade-in-up` | 0.8s | `cubic-bezier(0.25, 0.1, 0.25, 1)` |
| `fade-in` | 0.6s | `cubic-bezier(0.25, 0.1, 0.25, 1)` |
| `scale-in` | 0.5s | `cubic-bezier(0.25, 0.1, 0.25, 1)` |
| `accordion-down/up` | 0.2s | `ease-out` |

Custom easing token: `transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1)` via `ease-smooth`.

`prefers-reduced-motion: reduce` disables all animations and transitions.

---

## Tailwind Usage

Always use semantic M3 classes — never raw color values in components:

```tsx
// ✅ Correct
<div className="bg-m3-surface text-m3-on-surface">
<button className="m3-filled-button">Book a Startup Call</button>

// ❌ Wrong
<div className="bg-white text-gray-900">
<button className="bg-yellow-500 text-black">Book a Call</button>
```
