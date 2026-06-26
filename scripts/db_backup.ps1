$ErrorActionPreference = "Stop"

# ==========================================
# 1. ARCHITECTURAL CONFIGURATION
# ==========================================
$DB_NAME     = "car_shop_dev"
$DB_USER     = "postgres"          # Match your packages/db/.env username
$DB_PASS     = "postgres"      # Match your packages/db/.env password
$BACKUP_DIR  = Join-Path $PSScriptRoot "..\backups"
$RETENTION   = 7                    # Maximum days to keep archives

if (!(Test-Path -Path $BACKUP_DIR)) {
    New-Item -ItemType Directory -Path $BACKUP_DIR | Out-Null
}

$TIMESTAMP   = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$TARGET_FILE = Join-Path $BACKUP_DIR "$DB_NAME-$TIMESTAMP.sql"

Write-Host "[INITIATING SNAPSHOT]: Target -> $TARGET_FILE" -ForegroundColor Cyan

# ==========================================
# 2. EXECUTE SILENT DUMP
# ==========================================
$env:PGPASSWORD = $DB_PASS

try {
    # -F p = Plain-text SQL (Human readable for easy git-diffing / manual inspection)
    & "C:\Program Files\PostgreSQL\18\bin\pg_dump.exe" -U $DB_USER -h localhost -p 5432 -F p -d $DB_NAME -f $TARGET_FILE

    Write-Host "[SNAPSHOT SECURED]: Database written to disk successfully." -ForegroundColor Green
} catch {
    Write-Host "[FATAL ERROR]: pg_dump failed. Verify PostgreSQL bare-metal service is active." -ForegroundColor Red
    exit 1
} finally {
    # Scrub credential from system memory immediately
    Remove-Item Env:\PGPASSWORD -ErrorAction SilentlyContinue
}

# ==========================================
# 3. RETENTION ENFORCEMENT SWEEP
# ==========================================
Write-Host "[SWEEPING OLD ARTIFACTS]: Enforcing $RETENTION-day retention limit..." -ForegroundColor Yellow
$ExpirationLimit = (Get-Date).AddDays(-$RETENTION)

Get-ChildItem -Path $BACKUP_DIR -Filter "*.sql" | Where-Object { $_.CreationTime -lt $ExpirationLimit } | ForEach-Object {
    Write-Host " -> Nuke authorized on expired snapshot: $($_.Name)" -ForegroundColor DarkGray
    Remove-Item $_.FullName -Force
}

Write-Host "[DISASTER RECOVERY CYCLE COMPLETE]" -ForegroundColor Green
