# Specification

## Summary
**Goal:** Replace the site header logo with the newly uploaded logo image.

**Planned changes:**
- Generate an optimized, round-cropped, transparent PNG logo at 512x512 from the uploaded file and save it to `frontend/public/assets/generated/school-logo-uploaded.dim_512x512.png`.
- Update the site header to use the static asset at `/assets/generated/school-logo-uploaded.dim_512x512.png` on both desktop and mobile navigation.

**User-visible outcome:** The header displays the updated school logo consistently across desktop and mobile views.
