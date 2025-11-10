# Git Configuration Guide

This document explains the Git configuration files and best practices for VIT_Mart.

## Files

### .gitignore
Controls which files and folders Git should NOT track.

**Why it's important:**
- Prevents committing sensitive data (.env, secrets)
- Excludes dependencies (node_modules - reinstalled via npm install)
- Ignores OS-specific files (.DS_Store, Thumbs.db)
- Prevents IDE configuration files from polluting repo
- Reduces repository size

**What's ignored:**

| Category | Examples | Reason |
|----------|----------|--------|
| Dependencies | `node_modules/` | Reinstalled via npm |
| Environment | `.env`, `.env.local` | Contains secrets |
| Build outputs | `dist/`, `build/` | Generated files |
| IDE files | `.vscode/`, `.idea/` | Personal settings |
| OS files | `.DS_Store`, `Thumbs.db` | OS specific |
| Logs | `*.log`, `npm-debug.log` | Not needed in repo |
| Cache | `.eslintcache`, `.cache/` | Temporary files |
| Lock files | `package-lock.json` | Optional (see notes) |

### .gitattributes
Ensures consistent line endings across different operating systems.

**Why it's important:**
- Windows uses CRLF (`\r\n`)
- Linux/Mac use LF (`\n`)
- Can cause merge conflicts if not normalized
- Makes code reviews cleaner

**What's configured:**
- Text files → LF (Linux/Mac standard)
- Batch files → CRLF (Windows standard)
- Binary files → No conversion

---

## Common Git Commands

### Checking what would be ignored
```bash
# See all ignored files
git status --ignored

# Dry-run (see what would be gitignored)
git clean -fdn
```

### If you accidentally committed files
```bash
# Remove from Git history (keep locally)
git rm --cached node_modules
git rm --cached .env

# Update .gitignore then commit
git add .gitignore
git commit -m "Add .gitignore"
```

### Forcing an ignored file to be tracked (if needed)
```bash
git add -f sensitive-file.txt
```

---

## Best Practices

### DO ✅
- ✅ Keep `.env.example` (template) in repo
- ✅ Keep `package-lock.json` for reproducible installs
- ✅ Ignore `.env` and `.env.local`
- ✅ Never commit secrets or API keys
- ✅ Review `.gitignore` regularly
- ✅ Keep lock files in repo

### DON'T ❌
- ❌ Don't commit `node_modules`
- ❌ Don't commit `.env` with real secrets
- ❌ Don't commit build outputs (`dist/`, `build/`)
- ❌ Don't commit `.log` files
- ❌ Don't commit IDE settings (usually)
- ❌ Don't commit OS files

---

## Setup Instructions

### For this project:

1. **Files already exist:**
   - ✅ `.gitignore` - Configured for Node.js projects
   - ✅ `.gitattributes` - Configured for consistent line endings
   - ✅ `.env.example` - Template for environment variables

2. **Create your `.env` file:**
   ```bash
   cp .env.example .env
   ```

3. **The `.env` file will be ignored** (not tracked by Git)

### For new projects:

1. **Create `.gitignore` first:**
   ```bash
   # Use GitHub's template
   curl https://raw.githubusercontent.com/github/gitignore/main/Node.gitignore > .gitignore
   ```

2. **Customize for your needs**

3. **Always add `.env` pattern:**
   ```
   .env
   .env.local
   .env.*.local
   ```

---

## Environment Variables

### Safe way to manage environment variables:

```
✅ INCLUDE in repo:
├── .env.example (template with dummy values)

❌ NEVER commit:
├── .env (actual values with real keys)
├── .env.production (production secrets)
```

### Example `.env.example`:
```
VITE_API_BASE_URL=https://api.example.com
VITE_API_KEY=your_api_key_here
VITE_DEBUG=false
```

### Your `.env` (not tracked):
```
VITE_API_BASE_URL=https://api.example.com
VITE_API_KEY=sk_live_actual_secret_key_123456
VITE_DEBUG=false
```

---

## Verifying Setup

### Check if .gitignore is working:

```bash
# Should show files that are ignored
git check-ignore -v .env node_modules/ .DS_Store

# Should return nothing if correctly ignored
git ls-files | grep node_modules
```

### Check git status:

```bash
# Should NOT show ignored files
git status

# Should show all files (including ignored)
git status --ignored
```

---

## Troubleshooting

### Problem: `.env` file keeps getting committed

**Solution:**
```bash
# Remove from Git tracking
git rm --cached .env

# Make sure .gitignore has .env
cat .gitignore | grep "^\.env$"

# Commit the change
git add .gitignore
git commit -m "Stop tracking .env file"
```

### Problem: `node_modules` in repository

**Solution:**
```bash
# Remove node_modules from history
git rm -r --cached node_modules

# Add to .gitignore
echo "node_modules/" >> .gitignore

# Commit
git add .gitignore
git commit -m "Remove node_modules from tracking"

# Reinstall locally
npm install
```

### Problem: Line ending issues (CRLF vs LF)

**Solution:**
```bash
# Ensure .gitattributes is committed
git add .gitattributes
git commit -m "Normalize line endings"

# Reset line endings
git rm --cached -r .
git reset --hard HEAD
```

---

## Resources

- [GitHub .gitignore templates](https://github.com/github/gitignore)
- [gitignore documentation](https://git-scm.com/docs/gitignore)
- [gitattributes documentation](https://git-scm.com/docs/gitattributes)
- [Securing secrets in Git](https://git-scm.com/book/en/v2/Git-Tools-Signing-Your-Work)

---

## Security Checklist

Before each commit:

- [ ] No `.env` file with real secrets
- [ ] No `node_modules` directory
- [ ] No API keys in code
- [ ] No passwords in commits
- [ ] No database credentials
- [ ] No authentication tokens
- [ ] Review with `git diff` before committing

```bash
# Safe commit workflow
git add .
git diff --cached       # Review changes
git commit -m "message"
git push
```

---

## Team Collaboration

### New team member setup:

```bash
# 1. Clone repository
git clone <repo-url>
cd VIT_Mart

# 2. Install dependencies
npm install

# 3. Create .env from template
cp .env.example .env

# 4. Add real values to .env (from team lead)
# - Never commit this file!
```

### Update .gitignore:

```bash
# If someone adds new files to ignore
git pull                # Get latest .gitignore
git status              # Verify ignored files
```

---

**Last Updated:** November 10, 2024
**Version:** 1.0
