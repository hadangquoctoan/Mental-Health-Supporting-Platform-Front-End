---
version: alpha
name: Equilibra Landing
description: Subdued mental-health landing with floating capsule navigation, Lora headings and Be Vietnam Pro text
colors:
  primary: "#24685d"
  mist: "#e4ede8"
  surface: "#e1ebe6"
  surface-strong: "#dcebe5"
  navigation: "#f0f5f1"
  ink: "#173e37"
  ink-soft: "#526b63"
  teal-deep: "#174b43"
  teal-pale: "#c8ded5"
  line: "#c9dcd5"
  coral: "#b34f46"
  coral-pale: "#f2d8d3"
  on-primary: "#f3faf7"
  preview: "#eaf1ed"
  footer: "#123932"
  focus: "#bb6b38"
  brand-dot: "#c7774e"
typography:
  display:
    fontFamily: 'Lora, Georgia, serif'
    fontWeight: 400
    lineHeight: 1.18
  headline:
    fontFamily: 'Lora, Georgia, serif'
    fontWeight: 400
    lineHeight: 1.25
  body:
    fontFamily: '"Be Vietnam Pro", "Segoe UI", Arial, sans-serif'
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  navigation:
    fontFamily: '"Be Vietnam Pro", "Segoe UI", Arial, sans-serif'
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.5
  wordmark:
    fontFamily: 'Lora, Georgia, serif'
    fontSize: "1.5rem"
    fontWeight: 600
rounded:
  navigation: "999px"
  mobile-menu: "24px"
  control: "12px"
  preview: "14px"
  photo: "160px 18px 18px 18px"
  photo-phone: "105px 14px 14px 14px"
  circle: "50%"
---

# Design System: Equilibra Landing

## Direction

A quiet room with a clear window. Muted green-gray surfaces and deep teal text support calm reading. The forest photograph provides the organic focal point, while the interactive check-in preview introduces a concrete product action.

The update requested on 2026-10-18 replaces Times New Roman on the landing with Be Vietnam Pro for text and controls, and Lora for headings and the wordmark. The navigation is a floating capsule with space above and beside it.

## Typography

- Be Vietnam Pro: Vietnamese body copy, navigation, controls and feature titles; weights 400, 500, 600 and 700.
- Lora: hero and section headings, preview heading and wordmark; variable weights with restrained emphasis.
- Both fonts load through next/font/google with latin and vietnamese subsets and display swap. Next.js serves downloaded font assets locally to visitors.
- Font variables are scoped to LandingPage. Its loading overlay inherits the same fonts; other application routes retain their current typography.
- Use relaxed line-height for Vietnamese diacritics. Keep navigation labels on one line and allow descriptive copy to wrap naturally.

## Colors

Mist Green (#e4ede8) is the main background. The floating navigation uses a lighter green-tinted surface (#f0f5f1), an Eucalyptus Line border (#c9dcd5) and a restrained shadow. Deep teal (#24685d) identifies actions; darker green (#173e37) carries headings and navigation.

Muted coral (#b34f46) remains reserved for urgent support. Keep the page background tinted instead of pure white, and retain visible focus outlines.

## Navigation

- Desktop: centered capsule, maximum width 1160px, 16px from the top, sticky during scroll. Main links sit between the wordmark and login/register actions.
- The capsule uses a 999px radius and a minimum height of 76px. The registration button follows the capsule shape.
- At 900px and below, the main links move into a mobile menu. The menu is a separate rounded panel 12px below the capsule, with a bounded height and vertical scrolling.
- At 620px and below, the capsule sits 12px from the top with 16px side gutters. Login and registration remain available in the opened menu.
- Escape closes the menu and returns focus to its toggle. Outside clicks and selecting links close it. Hiding the mobile panel on desktop prevents a resize from exposing a duplicate menu.
- In-page scroll offsets include the capsule height and its top spacing. Native anchors retain clearance through scroll-margin-top.

## Layout and controls

The content shell remains 1160px maximum, with 24px side gutters on larger screens and 16px on phones. The hero keeps its text/image composition and overlapping check-in preview. Narrow screens use one content column.

Keep the existing open sections, thin dividers and asymmetric compositions. Controls use 12px corners; the check-in preview uses 14px corners. Capsule rounding is reserved for navigation and its registration actions.

The check-in illustration does not store health data. Maintain radio keyboard behavior, readable labels and enough room for five mood choices on narrow screens. FAQ uses native details/summary behavior.

## Motion and loading

Keep Lenis scrolling, subtle heading reveals and reduced-motion support. The loading overlay closes when fonts and the hero image are ready, offers a skip button, and has a no-JavaScript fallback.

## Content rules

- Use clear Vietnamese copy directed at people seeking support.
- Preserve clinical disclaimers and direct access to the 115 emergency number.
- Do not advertise unimplemented reminders, automatic SOS or clinical outcomes.
- Keep implementation details out of public-facing copy.

## Verification status

The navigation and typography update is implemented but has not been verified in a running browser. Type-check, lint, build and dev-server commands were blocked by the automatic approval service because its model was temporarily unavailable. Previous successful checks from 2026-10-14 do not validate this update.
