# Improve Infoblocks + Intro (Hybrid)

## Goal
Improve visual hierarchy and readability of intro + infoblocks while preserving current copy and flow.

## Scope
- `app/intro/page.tsx`
- `components/quiz/info-interstitial.tsx`
- `components/quiz/info-card.tsx`

## Planned Changes
1. **Intro card hierarchy**
   - Add compact eyebrow/trust line above title.
   - Improve title/body rhythm and spacing.
   - Add simple bullet-style promise list for faster scanning.
2. **Info interstitial polish**
   - Add optional metadata row (`eyebrow` + `highlight`) while keeping API backward compatible.
   - Improve title line-height and paragraph contrast.
   - Tighten bullet spacing and icon alignment.
3. **Info card consistency**
   - Slightly refine icon/text spacing and density.
   - Keep existing color variants while improving readability.

## Constraints
- Keep existing navigation and step behavior.
- Preserve content meaning and current personalization logic.
- Maintain responsiveness and accessibility.

## Verification
- Typecheck/lint edited files.
- Sanity-check `/intro` and quiz info interstitial steps.
