# Deployment Retry Runbook

This document describes the exact command sequence to re-run the full build and deployment process for the current revision.

## Prerequisites

Before running the deployment, ensure:

1. **Node.js and pnpm installed**: Verify with `node --version` and `pnpm --version`
2. **DFX installed**: Verify with `dfx --version` (Internet Computer SDK)
3. **Clean workspace**: No uncommitted changes that might affect the build
4. **Network connectivity**: Stable internet connection for canister deployment

## Deployment Steps

The deployment process consists of the following steps:

### 1. Clean Install Dependencies
