# CONTINUE PROJECT 002

## Project

Grażyna Nowak — Journey of Hope LP

## Task

Add a dual official fundraiser section to the existing landing page.

## Current Context

The website already has an existing `support` section near the end of the page.

It currently presents Grażyna's official support message and links to the Siepomaga fundraiser.

We are now adding a second official fundraiser option:

* Siepomaga
* 4Fund

The goal is not to redesign the full landing page.

The goal is to refine the current support section into a clean, premium, dual-fundraiser hub.

---

## Core UX Direction

Do not present the layout as:

```text
Left fundraiser image
Story text
Right fundraiser image
```

Instead, present it as:

```text
Story
↓
Choose your preferred official fundraiser
↓
Two equal fundraiser cards
```

The visitor should instantly understand:

> Here are the official ways to support Grażyna. Choose whichever platform is most convenient for you.

---

## Recommended Section Name

Rename the internal support architecture from:

```text
support
```

to:

```text
official-fundraisers
```

Suggested structure:

```html
<section class="section official-fundraisers" id="support">
  <div class="container">
    <div class="support-intro">
      ...
    </div>

    <div class="fundraiser-grid">
      <article class="fundraiser-card">
        ...
      </article>

      <article class="fundraiser-card">
        ...
      </article>
    </div>

    <p class="support-note">
      ...
    </p>
  </div>
</section>
```

Keep `id="support"` so existing navigation links continue working.

---

## Content Hierarchy

Use this hierarchy:

```text
OFFICIAL FUNDRAISERS

Support Grażyna's
Recovery

Grażyna needs specialist rehabilitation, ongoing care, and treatment. The costs are significant — too significant for one family to carry alone.

A small donation, a shared post, a message to a friend — all of it helps.

Choose the official fundraising platform that is most convenient for you.

[Fundraiser Cards]

This website does not process payments. All financial support goes directly through the official fundraiser platforms linked above.
```

---

## Fundraiser Card 1 — Siepomaga

### Label

🇵🇱 Official Polish Platform

### Title

Siepomaga

### Description

Official foundation fundraiser for Grażyna's treatment and rehabilitation.

### CTA

Support via Siepomaga →

### Link

https://www.siepomaga.pl/grazyna-nowak

### Image

Use existing Siepomaga screenshot/card asset already shown in the current section.

Suggested asset name:

```text
assets/images/fundraiser-siepomaga.jpeg
```

---

## Fundraiser Card 2 — 4Fund

### Label

🌍 International Donations

### Title

4Fund

### Description

Alternative international support option with QR and card payment access.

### CTA

Support via 4Fund →

### Link

https://4fund.com/6ff9r8

### Image

Use the new 4Fund screenshot/card asset.

Suggested asset name:

```text
assets/images/fundraiser-4fund.pdf
```

---

## Visual Rules

Both cards must feel equal.

Use:

```text
Same width
Same height
Same border radius
Same image treatment
Same shadow
Same button width
Same internal spacing
Same hover behavior
```

Do not make one card feel more important unless specifically requested later.

---

## Layout Direction

### Desktop

Recommended layout:

```text
                OFFICIAL FUNDRAISERS

          Support Grażyna's Recovery

              Emotional explanation

       Choose your preferred platform

┌────────────────────┐    ┌────────────────────┐
│     Siepomaga      │    │       4Fund        │
│     Screenshot     │    │     Screenshot     │
└────────────────────┘    └────────────────────┘

    Official Polish          International
      Platform                Donations

   Support via              Support via
   Siepomaga                4Fund
```

### Mobile

Stack vertically:

```text
Intro text
↓
Siepomaga card
↓
4Fund card
↓
Payment disclaimer
```

Do not force side-by-side cards on mobile.

---

## Styling Direction

Keep the existing visual language:

* Forest green background
* Warm rose CTA buttons
* Playfair Display headings
* Inter body text
* Premium editorial spacing
* Soft shadows
* Rounded cards
* Apple-like clarity
* Documentary emotional tone

Do not introduce loud colors or heavy effects.

---

## Micro Interactions

Add subtle hover polish:

```css
.fundraiser-card:hover {
  transform: translateY(-6px);
}

.fundraiser-card:hover img {
  transform: scale(1.02);
}

.fundraiser-card:hover .btn-support {
  filter: brightness(1.06);
}
```

Keep it gentle and premium.

---

## Accessibility Requirements

Each card must have:

* Clear alt text
* Real anchor links
* `target="_blank"`
* `rel="noopener"`
* Descriptive CTA text
* Keyboard focus state
* No clickable divs pretending to be buttons

Example:

```html
<a href="https://4fund.com/6ff9r8" target="_blank" rel="noopener" class="btn btn-support">
  Support via 4Fund →
</a>
```

---

## Implementation Instructions

Update only:

```text
index.html
style.css
script.js only if needed
```

Prefer HTML + CSS only.

Do not add unnecessary JavaScript.

Do not change unrelated sections.

Do not modify the hero, story, recovery timeline, family, auction, or hope sections.

Preserve the existing emotional copy unless needed for the dual-fundraiser clarity.

---

## Acceptance Criteria

The final result should:

* Show both official fundraiser platforms clearly
* Make Siepomaga and 4Fund feel equally intentional
* Preserve the emotional storytelling
* Improve donation clarity
* Work beautifully on desktop and mobile
* Keep existing navigation working
* Avoid payment processing language
* Make clear the website does not collect donations directly

---

## Final UX Message

The section should communicate:

> Grażyna has two official support paths available. Please choose the platform that is easiest for you and support her recovery directly through that official fundraiser.

---

---

# IMPLEMENTATION RULES

## Create

- HTML section
- Required CSS styling
- Minimal JavaScript only if needed (image modal or interaction)
- Maintain existing project performance
- Preserve mobile-first responsiveness
- Keep implementation consistent with the current project architecture

---

# OUTPUT

Update only:

- index.html
- style.css
- script.js *(only if required)*

No additional frameworks.

No external dependencies.

No redesign of unrelated sections.

Preserve the existing visual identity and storytelling.

---

# SUCCESS CRITERIA

✓ Two official fundraiser cards

✓ Equal visual hierarchy

✓ Fully responsive layout

✓ Accessible buttons and links

✓ Existing navigation preserved

✓ Premium documentary aesthetic maintained

✓ Ready for GitHub Pages deployment