#!/usr/bin/env bash
set -euo pipefail

# Deployment Retry Script
# Runs the full build and deployment sequence with clear progress indicators

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
FRONTEND_DIR="$PROJECT_ROOT/frontend"

echo "=========================================="
echo "  Deployment Retry Script"
echo "=========================================="
echo ""

# Step 1: Clean install dependencies
echo "Step 1/4: Installing dependencies..."
cd "$FRONTEND_DIR"
pnpm install --frozen-lockfile
echo "✓ Dependencies installed"
echo ""

# Step 2: Generate backend bindings
echo "Step 2/4: Generating backend bindings..."
cd "$PROJECT_ROOT"
dfx generate backend
echo "✓ Backend bindings generated"
echo ""

# Step 3: Build frontend
echo "Step 3/4: Building frontend..."
cd "$FRONTEND_DIR"
pnpm run build:skip-bindings
echo "✓ Frontend built"
echo ""

# Step 4: Deploy canisters
echo "Step 4/4: Deploying canisters..."
cd "$PROJECT_ROOT"
dfx deploy
echo "✓ Canisters deployed"
echo ""

echo "=========================================="
echo "  Deployment Complete!"
echo "=========================================="
echo ""
echo "Next steps:"
echo "1. Verify frontend canister URL is accessible"
echo "2. Check browser console for errors"
echo "3. Test login and admin functionality"
echo ""
echo "Frontend canister URL:"
dfx canister id frontend 2>/dev/null && echo "https://$(dfx canister id frontend).icp0.io" || echo "(run 'dfx canister id frontend' to get URL)"
echo ""
