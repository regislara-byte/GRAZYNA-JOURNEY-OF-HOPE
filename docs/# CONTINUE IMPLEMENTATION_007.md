# CONTINUE IMPLEMENTATION_007

Project:
LL-OPTICALV2

Current Status:
EYLOTL Motion System is being adjusted after real-device testing.

Observation:
Desktop and mobile landscape are usable, but the hero must still follow the original EYLOTL Hero Guide:

- Full character should remain visible when possible.
- No unnecessary cropping of hands, feet, glasses, or thumbs-up.
- Text must remain readable.
- Mobile portrait and landscape need different behavior.
- Motion layers must still work after layout correction.

Current issue:
The previous `background-size: cover` approach fixed gray gutters but conflicts with the Hero Guide because it crops EYLOTL too aggressively on some screens.

New direction:
Use a character-aware responsive strategy.

Requirements:
- Prefer `contain` or carefully controlled sizing where full EYLOTL visibility matters.
- Use warm ambient background color to fill empty space instead of gray gutters.
- Keep EYLOTL anchored right/bottom where appropriate.
- Preserve text layout and CTA.
- Keep blink overlay aligned with EYLOTL eye.
- Keep motion subtle.
- Keep prefers-reduced-motion support.
- No HTML changes unless absolutely necessary.
- CSS-first fix.

Device rules:
Desktop:
- EYLOTL should dominate but not collide with text.
- Full character should remain mostly visible.

Mobile landscape:
- Prioritize readable nav, CTA, hero text, and strong EYLOTL crop.
- No broken layout.

Mobile portrait:
- Prioritize full mascot visibility more than zoom.
- Character can scale down.
- Avoid cropping feet/hands if possible.

Task:
Finalize the style.css responsive hero rules after your current edits.

Required output:
1. Summary of what changed.
2. Confirm which files changed.
3. Confirm desktop behavior.
4. Confirm mobile landscape behavior.
5. Confirm mobile portrait behavior.
6. Confirm motion layers still work.
7. Confirm no text changes.

Additional Requirements:

Maintain performance.

Maintain mobile-first responsiveness.

Keep code consistent with existing project architecture.

Output:

Updated:

- index.html
- style.css

Status:
BUILD FINAL PATCH ✅