# DESIGN SYSTEM

**Feel:** premium, calm, credible, readable. Restrained palette, generous whitespace.

## Colors (light; dark optional)
| Token | Hex | Use |
|---|---|---|
| primary | #1F4FD8 | Primary actions, links |
| primaryDark | #163A9E | Pressed |
| accent | #14B88A | Progress/success |
| ink | #12171F | Primary text |
| inkMuted | #5B6575 | Secondary text |
| surface | #FFFFFF | Cards |
| background | #F6F7F9 | App bg |
| border | #E3E6EB | Dividers |
| warning | #E0A100 | Warnings/pending |
| danger | #D64545 | Errors |
| info | #2E7DD7 | Info |
Check all text pairs ≥ 4.5:1.

## Typography
Inter (or system). Display 28/34 bold · H1 24/30 · H2 20/26 · Body 16/24 · Story body 17/27 · Caption 13/18 · Button 16 semibold. Story pages use comfortable line length.

## Spacing / Radius / Elevation
Spacing scale 4, 8, 12, 16, 24, 32, 48. Radius: 8 inputs, 16 cards, 24 sheets, full pills. Elevation: subtle shadow level 1 (cards), 2 (sheets).

## Status Chips
Draft (gray) · Under Review (amber) · Changes Requested (orange) · Available for Funding (blue) · Funded (green) · Promoting (purple) · Completed (teal) · Rejected/Failed (red) · Refund Pending (amber). Always icon + text.

## Iconography
One set (Lucide/Feather via `@expo/vector-icons` or lucide-react-native), 20/24 px, 1.75 stroke.

## Imagery
High-quality seeded images with consistent 16:9 covers; blurhash placeholders; alt text for each.

## Interaction
Pressed state 0.97 scale/opacity; skeleton shimmer; accordion 200 ms; progress bar animates on mount; toasts 3s.
