# Specification

## Summary
**Goal:** Retry the build and deployment for the current app revision and ensure it completes successfully, or provide complete error output if it fails again.

**Planned changes:**
- Re-run the full build and deployment process for the current frontend and backend revision.
- If deployment fails, capture and surface the complete deployment output, including the failing step and full error/stack message.

**User-visible outcome:** The application is successfully deployed and reachable; if not, the full deployment failure details are available to diagnose in a follow-up change.
