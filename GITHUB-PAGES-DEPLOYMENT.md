# 🚀 GitHub Pages Deployment Guide

Complete step-by-step guide to deploy the Thermal Dataset Discovery website to GitHub Pages.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Repository Setup](#repository-setup)
3. [Build & Prepare](#build--prepare)
4. [Deploy to GitHub Pages](#deploy-to-github-pages)
5. [Verify Deployment](#verify-deployment)
6. [Custom Domain (Optional)](#custom-domain-optional)
7. [Troubleshooting](#troubleshooting)
8. [Automated Deployment with GitHub Actions](#automated-deployment-with-github-actions)

---

## Prerequisites

Before deploying, ensure you have:

- [x] Git installed and configured
- [x] GitHub account created
- [x] Node.js installed (for building the project)
- [x] All datasets converted to YAML format
- [x] Project files ready in the repository

**Check your setup:**
```bash
git --version          # Should show git version
node --version         # Should show node version
npm --version          # Should show npm version
```

---

## Repository Setup

### Step 1: Initialize Git Repository (if not already done)

```bash
# Navigate to project directory
cd /path/to/getting-started-with-thermal-imaging

# Initialize git (if not already initialized)
git init

# Check status
git status
```

### Step 2: Create GitHub Repository

**Option A: Via GitHub Web Interface**

1. Go to [GitHub](https://github.com)
2. Click the **+** icon in the top-right corner
3. Select **New repository**
4. Repository settings:
   - **Name:** `thermal-dataset-discovery` (or your preferred name)
   - **Description:** "Discover curated thermal imaging datasets for research"
   - **Visibility:** Public (required for free GitHub Pages)
   - **Initialize:** Leave unchecked (you already have files)
5. Click **Create repository**

**Option B: Via GitHub CLI**

```bash
# Install GitHub CLI if not already installed
# macOS: brew install gh
# Windows: winget install --id GitHub.cli

# Authenticate
gh auth login

# Create repository
gh repo create thermal-dataset-discovery --public --description "Discover curated thermal imaging datasets for research"
```

### Step 3: Connect Local Repository to GitHub

```bash
# Add remote origin (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/thermal-dataset-discovery.git

# Verify remote
git remote -v
```

---

## Build & Prepare

### Step 1: Install Dependencies

```bash
# Install required npm packages
npm install
```

**Expected output:**
```
added 2 packages, and audited 3 packages in 1s
found 0 vulnerabilities
```

### Step 2: Build Dataset JSON Files

```bash
# Convert YAML to JSON
npm run build
```

**Expected output:**
```
🚀 Starting YAML to JSON conversion...
📁 Found 10 dataset files
✅ dmrir                Card: 0.9KB  Full: 9.1KB
✅ faceoral             Card: 0.9KB  Full: 10.4KB
...
✅ Build complete!
```

### Step 3: Verify Build Output

```bash
# Check that JSON files were generated
ls -lh data/datasets/*.json
ls -lh data/datasets-cards.json
```

You should see:
- `data/datasets-cards.json` (9-10KB)
- `data/datasets/*.json` (9-10 files, 4-11KB each)

### Step 4: Test Locally (Optional but Recommended)

```bash
# Start local server
python3 -m http.server 8000

# Open in browser
# Visit: http://localhost:8000
```

**Verify:**
- [x] All datasets load correctly
- [x] Search works
- [x] Filters work
- [x] Detail views load
- [x] Theme toggle works
- [x] No console errors

**Stop server:** Press `Ctrl+C`

---

## Deploy to GitHub Pages

### Step 1: Stage All Files

```bash
# Check what will be committed
git status

# Add all files
git add .

# Verify staged files
git status
```

**What should be committed:**
```
✅ index.html
✅ assets/
✅ data/
✅ scripts/
✅ package.json
✅ .gitignore
✅ .nojekyll
✅ README.md
✅ Documentation files (*.md)
```

**What should be ignored (already in .gitignore):**
```
❌ node_modules/
❌ .DS_Store
❌ *.log
```

### Step 2: Create Initial Commit

```bash
# Commit with descriptive message
git commit -m "Initial commit: Thermal Dataset Discovery website

- 10 curated thermal imaging datasets
- Vue.js dynamic website with lazy loading
- Search, filter, and sort functionality
- Dark/light theme support
- 90% performance optimization
- Full documentation included
"
```

### Step 3: Push to GitHub

```bash
# Push to main branch
git push -u origin main
```

**If you encounter authentication issues:**
```bash
# Use personal access token (recommended)
# Generate token at: https://github.com/settings/tokens
# Use token as password when prompted
```

### Step 4: Enable GitHub Pages

**Via GitHub Web Interface:**

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll to **Pages** section in the left sidebar
4. Under **Source**, select:
   - **Branch:** `main`
   - **Folder:** `/ (root)`
5. Click **Save**

**Via GitHub CLI:**

```bash
# Enable GitHub Pages
gh repo edit --enable-pages --pages-branch main
```

### Step 5: Wait for Deployment

GitHub Pages deployment takes 1-3 minutes. You'll see:

```
✅ Your site is live at https://YOUR_USERNAME.github.io/thermal-dataset-discovery/
```

---

## Verify Deployment

### Step 1: Check Deployment Status

**Via GitHub Web Interface:**

1. Go to **Settings** → **Pages**
2. Look for green checkmark: "Your site is published at..."

**Via GitHub CLI:**

```bash
# Check deployment status
gh api repos/YOUR_USERNAME/thermal-dataset-discovery/pages
```

### Step 2: Visit Your Live Website

```bash
# Open in browser
open https://YOUR_USERNAME.github.io/thermal-dataset-discovery/

# Or manually visit the URL
```

### Step 3: Verify Functionality

**Checklist:**
- [x] Website loads successfully
- [x] All 10 datasets appear on dashboard
- [x] Click a dataset → Detail view loads
- [x] Search functionality works
- [x] Filter by category works
- [x] Sort options work
- [x] Theme toggle works (dark/light)
- [x] Share links work (copy URL)
- [x] Browser back button works
- [x] Mobile responsive design works
- [x] All external links open correctly

---

## Custom Domain (Optional)

### Prerequisites

- Custom domain purchased (e.g., `thermaldatasets.com`)
- Access to DNS settings

### Step 1: Configure DNS

Add these DNS records at your domain registrar:

**For apex domain (thermaldatasets.com):**
```
Type: A
Name: @
Value: 185.199.108.153
Value: 185.199.109.153
Value: 185.199.110.153
Value: 185.199.111.153
```

**For www subdomain (www.thermaldatasets.com):**
```
Type: CNAME
Name: www
Value: YOUR_USERNAME.github.io
```

### Step 2: Configure GitHub Pages

1. Go to **Settings** → **Pages**
2. Under **Custom domain**, enter: `thermaldatasets.com`
3. Click **Save**
4. Wait for DNS check (may take up to 24 hours)
5. Enable **Enforce HTTPS** (recommended)

### Step 3: Update CNAME File

```bash
# Create CNAME file in repository root
echo "thermaldatasets.com" > CNAME

# Commit and push
git add CNAME
git commit -m "Add custom domain"
git push
```

---

## Troubleshooting

### Issue: 404 Error on Deployment

**Symptoms:** Homepage shows 404 error

**Solutions:**

1. **Check GitHub Pages settings:**
   - Branch: `main`
   - Folder: `/ (root)`

2. **Verify index.html exists:**
   ```bash
   ls -l index.html
   ```

3. **Check .nojekyll file exists:**
   ```bash
   ls -la .nojekyll
   ```

   If missing:
   ```bash
   touch .nojekyll
   git add .nojekyll
   git commit -m "Add .nojekyll file"
   git push
   ```

### Issue: Datasets Not Loading

**Symptoms:** Dashboard is empty or shows "Loading..."

**Solutions:**

1. **Check JSON files were committed:**
   ```bash
   git ls-files data/datasets/*.json
   ```

2. **Verify build was run:**
   ```bash
   ls -lh data/datasets-cards.json
   ```

3. **Check browser console for errors:**
   - Open DevTools (F12)
   - Look for 404 errors on JSON files
   - Check CORS errors

4. **Rebuild and redeploy:**
   ```bash
   npm run build
   git add data/
   git commit -m "Update dataset JSON files"
   git push
   ```

### Issue: CSS/JavaScript Not Loading

**Symptoms:** Unstyled page or no interactivity

**Solutions:**

1. **Check file paths are relative:**
   - ✅ `assets/css/main.css`
   - ❌ `/assets/css/main.css`

2. **Verify files are committed:**
   ```bash
   git ls-files assets/
   ```

3. **Check browser console:**
   - Look for 404 errors
   - Check for MIME type errors

### Issue: Theme Not Persisting

**Symptoms:** Theme resets on page refresh

**Solution:** Check localStorage is enabled in browser settings

### Issue: Search Not Working

**Symptoms:** Typing in search bar doesn't filter datasets

**Solutions:**

1. **Check browser console for JavaScript errors**

2. **Verify Vue is loading:**
   - Open DevTools → Network tab
   - Look for Vue CDN request
   - Check it loaded successfully

3. **Clear browser cache:**
   ```bash
   # Hard refresh
   Ctrl+Shift+R (Windows/Linux)
   Cmd+Shift+R (Mac)
   ```

### Issue: Deployment Taking Too Long

**Symptoms:** Deployment stuck for >5 minutes

**Solutions:**

1. **Check GitHub Status:**
   - Visit: https://www.githubstatus.com/

2. **Cancel and retry deployment:**
   - Go to repository **Actions** tab
   - Cancel running workflow
   - Push a new commit to trigger rebuild

3. **Contact GitHub Support:**
   - If issue persists >1 hour

---

## Automated Deployment with GitHub Actions

Automate the build and deployment process with GitHub Actions.

### Step 1: Create Workflow File

```bash
# Create GitHub Actions directory
mkdir -p .github/workflows

# Create workflow file
touch .github/workflows/deploy.yml
```

### Step 2: Configure Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Build datasets
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: '.'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Step 3: Commit and Push

```bash
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Actions deployment workflow"
git push
```

### Step 4: Enable GitHub Actions

1. Go to **Settings** → **Pages**
2. Under **Source**, select:
   - **Source:** GitHub Actions

### Step 5: Verify Automated Deployment

1. Go to **Actions** tab
2. You should see "Deploy to GitHub Pages" workflow running
3. Wait for completion (usually <1 minute)
4. Check deployment at your GitHub Pages URL

**Benefits of GitHub Actions:**
- ✅ Automatic deployment on every push
- ✅ Consistent build environment
- ✅ Build logs for debugging
- ✅ Can trigger manual deployments
- ✅ No local build required

---

## Post-Deployment Checklist

After successful deployment:

- [ ] Bookmark your live URL
- [ ] Test all features on live site
- [ ] Test on multiple browsers
- [ ] Test on mobile devices
- [ ] Update README with live URL
- [ ] Share with colleagues/community
- [ ] Set up analytics (optional)
- [ ] Monitor for issues
- [ ] Plan future dataset additions

---

## Updating the Website

### Adding New Datasets

1. **Create YAML file:**
   ```bash
   cp data/_template.yaml data/datasets/new-dataset.yaml
   # Edit new-dataset.yaml with your data
   ```

2. **Build JSON:**
   ```bash
   npm run build
   ```

3. **Test locally:**
   ```bash
   python3 -m http.server 8000
   # Verify new dataset appears
   ```

4. **Deploy:**
   ```bash
   git add data/
   git commit -m "Add new-dataset to collection"
   git push
   ```

5. **Wait for deployment** (1-3 minutes)

6. **Verify live** at your GitHub Pages URL

### Updating Existing Datasets

1. **Edit YAML file:**
   ```bash
   # Edit the dataset YAML
   vim data/datasets/dataset-id.yaml
   ```

2. **Rebuild:**
   ```bash
   npm run build
   ```

3. **Commit and deploy:**
   ```bash
   git add data/
   git commit -m "Update dataset-id information"
   git push
   ```

---

## Additional Resources

### GitHub Pages Documentation
- [GitHub Pages Quickstart](https://docs.github.com/en/pages/quickstart)
- [Custom Domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [Troubleshooting](https://docs.github.com/en/pages/getting-started-with-github-pages/troubleshooting-jekyll-build-errors-for-github-pages-sites)

### Project Documentation
- [README.md](README.md) - Complete project documentation
- [PHASE3.md](PHASE3.md) - Feature documentation
- [PROJECT-COMPLETE.md](PROJECT-COMPLETE.md) - Project summary
- [COMPREHENSIVE-REVIEW.md](COMPREHENSIVE-REVIEW.md) - Code quality review

### Analytics Setup (Optional)

**Google Analytics:**
```html
<!-- Add to index.html before </head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

**Plausible Analytics (Privacy-focused):**
```html
<!-- Add to index.html before </head> -->
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
```

---

## Quick Reference

### Essential Commands

```bash
# Install dependencies
npm install

# Build datasets
npm run build

# Test locally
python3 -m http.server 8000

# Git workflow
git add .
git commit -m "Description of changes"
git push

# Check deployment status
gh api repos/YOUR_USERNAME/thermal-dataset-discovery/pages
```

### Important URLs

```
GitHub Repository:
https://github.com/YOUR_USERNAME/thermal-dataset-discovery

GitHub Pages Website:
https://YOUR_USERNAME.github.io/thermal-dataset-discovery/

Repository Settings:
https://github.com/YOUR_USERNAME/thermal-dataset-discovery/settings

GitHub Pages Settings:
https://github.com/YOUR_USERNAME/thermal-dataset-discovery/settings/pages

Actions (Deployments):
https://github.com/YOUR_USERNAME/thermal-dataset-discovery/actions
```

---

## Success! 🎉

Your Thermal Dataset Discovery website is now live on GitHub Pages!

**Next Steps:**
1. Share the URL with your research community
2. Add more datasets as they become available
3. Monitor usage and feedback
4. Consider adding analytics
5. Keep datasets up to date

**Need Help?**
- Check [Troubleshooting](#troubleshooting) section
- Review [GitHub Pages Documentation](https://docs.github.com/en/pages)
- Open an issue on GitHub
- Contact project maintainers

---

**Deployed with:** GitHub Pages • Built with: Vue 3 • Optimized with: Lazy Loading 🚀
