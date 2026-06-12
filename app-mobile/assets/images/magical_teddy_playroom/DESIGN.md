---
name: Magical Teddy Playroom
colors:
  surface: '#101418'
  surface-dim: '#101418'
  surface-bright: '#36393f'
  surface-container-lowest: '#0b0e13'
  surface-container-low: '#191c21'
  surface-container: '#1d2025'
  surface-container-high: '#272a2f'
  surface-container-highest: '#32353a'
  on-surface: '#e1e2e9'
  on-surface-variant: '#c1c7d3'
  inverse-surface: '#e1e2e9'
  inverse-on-surface: '#2e3036'
  outline: '#8b919d'
  outline-variant: '#414751'
  surface-tint: '#a4c9ff'
  primary: '#a4c9ff'
  on-primary: '#00315d'
  primary-container: '#4d93e5'
  on-primary-container: '#002a51'
  inverse-primary: '#0060ac'
  secondary: '#ffb77f'
  on-secondary: '#4e2600'
  secondary-container: '#6b3a0c'
  on-secondary-container: '#eba66f'
  tertiary: '#ffb953'
  on-tertiary: '#452b00'
  tertiary-container: '#c58305'
  on-tertiary-container: '#3c2500'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d4e3ff'
  primary-fixed-dim: '#a4c9ff'
  on-primary-fixed: '#001c39'
  on-primary-fixed-variant: '#004883'
  secondary-fixed: '#ffdcc4'
  secondary-fixed-dim: '#ffb77f'
  on-secondary-fixed: '#2f1500'
  on-secondary-fixed-variant: '#6b3a0c'
  tertiary-fixed: '#ffddb4'
  tertiary-fixed-dim: '#ffb953'
  on-tertiary-fixed: '#291800'
  on-tertiary-fixed-variant: '#633f00'
  background: '#101418'
  on-background: '#e1e2e9'
  surface-variant: '#32353a'
typography:
  display-lg:
    fontFamily: Quicksand
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -1px
  headline-lg:
    fontFamily: Quicksand
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Quicksand
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
  body-md:
    fontFamily: Nunito Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-bold:
    fontFamily: Quicksand
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 20px
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  base: 8px
  container-padding: 24px
  stack-gap: 16px
  margin-mobile: 20px
  margin-desktop: 64px
---

## Brand & Style

This design system is built to evoke the warmth and wonder of a high-end toy shop. It shifts away from technical, sharp aesthetics toward a **Tactile & Playful** style that feels safe, inviting, and magical for children and families. 

The visual narrative centers on "Soft Volume"—using gentle gradients, "squishy" physical metaphors, and cloud-like containers to create a sense of depth that feels like reaching into a physical toy box. The atmosphere is optimistic and high-energy, yet grounded by a sophisticated charcoal base that makes the vibrant toy colors "pop" without causing eye strain. Every interaction should feel like a reward, utilizing bouncy transitions and soft, rounded edges to reinforce the friendly brand personality.

## Colors

The palette balances a "Midnight Playroom" base with "Magic Toy" highlights. 

*   **Primary (Soft Blue):** Used for main actions and trust-building elements. It represents the sky and magical possibilities.
*   **Secondary (Warm Orange):** Used for excitement and secondary buttons. It provides a cozy, sunset-like warmth.
*   **Sunny Yellow:** Reserved for highlights, stars, and "win" states. It should be used sparingly to draw the eye to rewards.
*   **Teddy Brown:** Used for grounding elements, icons, and borders to provide a sense of organic material (fur/wood).
*   **Backgrounds:** We utilize a deep, soft charcoal (#2C3338) for the main application canvas. This allows the colorful white and pastel containers to feel luminous and distinctive.

## Typography

The typography strategy focuses on maximum legibility and friendliness. 
**Quicksand** is used for all "Display" and "Headline" roles. Its rounded terminals mimic the soft shapes of the UI. For long-form reading or technical details (like balances or instructions), **Nunito Sans** provides a slightly more structured but still humanist feel.

Headlines should always use a heavier weight (700) to stand out against colorful backgrounds. For mobile, we reduce scale slightly but maintain the heavy weight to ensure the "Playroom" energy is preserved on small screens.

## Layout & Spacing

The layout follows a **Fluid Grid** model with generous safe areas to accommodate "fat-finger" interactions common in child-friendly apps. 

- **The Bubble Model:** Content is housed in oversized white or light-gray cards with significant internal padding (24px).
- **Vertical Rhythm:** A consistent 16px gap between stacked components creates a breathable, organized flow.
- **Mobile First:** On mobile devices, we use a 2-column grid for game tiles and a single-column stack for featured promotions. 
- **Safe Zones:** High-priority buttons (like "Play Now") must have at least 12px of clear space around them to prevent accidental clicks.

## Elevation & Depth

We avoid harsh, realistic shadows in favor of **Soft Ambient Glows** and **Tonal Stacking**.

1.  **Level 0 (Canvas):** The dark charcoal background.
2.  **Level 1 (Clouds):** Large, white containers with a subtle 10% opacity blue shadow. These should feel like they are floating.
3.  **Level 2 (Interactions):** Buttons and chips use a "Pressed" effect. Instead of just getting darker, they should appear to sink into the container using an inner shadow, reinforcing the "squishy toy" metaphor.
4.  **Glassmorphism:** Use a light backdrop blur (12px) for navigation bars and overlays to maintain the magical, airy feel without losing sight of the playroom context below.

## Shapes

The shape language is strictly **Pill-shaped and Organic**. There are no sharp corners in the design system. 

All primary buttons use the maximum corner radius (pill). Secondary cards and containers use a minimum of 24px (rounded-xl) to maintain a "cloud-like" appearance. Icons should be enclosed in circular frames to mimic bubbles. This lack of sharp edges communicates safety and friendliness.

## Components

- **Buttons:** Large, high-contrast pills. Primary buttons use a gradient from Soft Blue to a slightly deeper shade to add "volume." They should have a "bounce" micro-interaction on hover/tap.
- **Game Cards:** Vertically oriented with 32px rounded corners. The image should take up the top 70% of the card, with a "Play" button overlapping the bottom edge of the image.
- **Progress Bars:** Designed to look like "Honey Jars" or "Stuffing Meters." They should be thick (12px+) and use the Sunny Yellow accent for the fill.
- **Input Fields:** Thick borders in Teddy Brown or Soft Blue. Backgrounds should be slightly off-white to distinguish from the container cards.
- **Chips/Badges:** Small "Bubble" style labels. If a user is a "Diamond Member," use a sparkle icon paired with a soft purple gradient.
- **Navigation:** A floating bottom bar with exaggerated icons that scale up when active, accompanied by a small "dot" indicator that looks like a teddy bear paw print.