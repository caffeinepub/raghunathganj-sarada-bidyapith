#!/usr/bin/env bash
set -euo pipefail

# Full Logging Deployment Wrapper
# Runs retry-deploy.sh with complete stdout/stderr capture to timestamped log file

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
FRONTEND_DIR="$PROJECT_ROOT/frontend"
LOGS_DIR="$FRONTEND_DIR/deploy-logs"

# Create logs directory if it doesn't exist
mkdir -p "$LOGS_DIR"

# Generate timestamp for log file
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
LOG_FILE="$LOGS_DIR/deploy-$TIMESTAMP.log"

echo "=========================================="
echo "  Full Logging Deployment Wrapper"
echo "=========================================="
echo ""
echo "Log file: $LOG_FILE"
echo ""
echo "Starting deployment with full logging..."
echo ""

# Run retry-deploy.sh with tee to capture output while streaming to console
# Use exec to replace shell process and preserve exit code
exec > >(tee -a "$LOG_FILE") 2>&1

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Deployment started"
echo ""

# Run the retry deploy script
if "$SCRIPT_DIR/retry-deploy.sh"; then
    EXIT_CODE=0
    echo ""
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] Deployment completed successfully"
else
    EXIT_CODE=$?
    echo ""
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] Deployment failed with exit code: $EXIT_CODE"
fi

echo ""
echo "=========================================="
echo "  Log saved to: $LOG_FILE"
echo "=========================================="

exit $EXIT_CODE
