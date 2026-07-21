# GitHub Pages Setup Guide

This guide will help you publish your Thermal Imaging Dataset Discovery website using GitHub Pages - **no build process or complex setup required!**

## Quick Setup (3 Simple Steps)

### Step 1: Enable GitHub Pages

1. Go to your repository on GitHub: `https://github.com/blackpearl006/getting-started-with-thermal-imaging`
2. Click on **Settings** (top menu)
3. Scroll down and click **Pages** in the left sidebar
4. Under **Source**, select:
   - **Branch:** `main` (or your default branch)
   - **Folder:** `/website`
5. Click **Save**

### Step 2: Wait for Deployment

- GitHub will automatically deploy your site
- This usually takes 1-3 minutes
- You'll see a message: "Your site is ready to be published at..."
- Once complete, it will show: "Your site is live at..."

### Step 3: Access Your Website

Your website will be available at:
```
https://blackpearl006.github.io/getting-started-with-thermal-imaging/
```

That's it! Your thermal imaging dataset discovery website is now live.

---

## File Structure

Your website files are located in the `/website` directory:

```
getting-started-with-thermal-imaging/
├── website/
│   ├── index.html          # Main discovery page (your thermal dataset website)
│   ├── design.html         # Original design template
│   └── ...other files
└── GITHUB_PAGES_SETUP.md   # This file
```

---

## Making Updates

### To Update Your Website:

1. **Edit the file locally:**
   - Open `website/index.html` in your editor
   - Make your changes

2. **Commit and push:**
   ```bash
   git add website/index.html
   git commit -m "Update thermal dataset discovery page"
   git push origin main
   ```

3. **Wait for automatic deployment:**
   - GitHub Pages automatically rebuilds your site
   - Changes appear in 1-3 minutes

---

## Customization Tips

### Adding New Datasets

To add a new thermal imaging dataset, copy one of the existing dataset cards in `index.html`:

```html
<div class="dataset-card medical">
    <div class="badge-row">
        <span class="badge badge-medical">Medical</span>
        <span class="badge badge-public">Public</span>
    </div>
    <div class="dataset-header">
        <div>
            <h3 class="dataset-title">Your Dataset Name</h3>
        </div>
    </div>
    <p class="dataset-focus">Dataset description goes here...</p>
    <div class="dataset-stats">
        <!-- Add your statistics -->
    </div>
    <div style="display: flex; justify-content: flex-end;">
        <a href="YOUR_DATASET_URL" target="_blank" class="access-button" style="background: var(--red);">
            <svg viewBox="0 0 24 24"><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>
            Access Dataset
        </a>
    </div>
</div>
```

### Dataset Card Types

Use these classes for different dataset categories:
- `dataset-card medical` - Red accent for medical datasets
- `dataset-card pose` - Blue accent for pose/body thermal datasets
- `dataset-card specialized` - Purple accent for specialized applications

### Badge Types

Available badge styles:
- `badge-medical` - Medical datasets
- `badge-pose` - Human pose datasets
- `badge-specialized` - Specialized applications
- `badge-public` - Publicly accessible
- `badge-request` - Requires access request

---

## Troubleshooting

### Website Not Loading?

1. **Check GitHub Pages settings:**
   - Go to Settings → Pages
   - Verify the source is set to `/website` folder
   - Make sure the branch is correct

2. **Wait a bit longer:**
   - First deployment can take up to 10 minutes
   - Refresh the page after waiting

3. **Check the deployment status:**
   - Go to the **Actions** tab in your repository
   - Look for "pages build and deployment"
   - Click on it to see if there are any errors

### 404 Error?

- Make sure `index.html` is in the `/website` directory
- Check that the file is named exactly `index.html` (lowercase)
- Verify your GitHub Pages source is set to `/website` folder

### Changes Not Appearing?

- Clear your browser cache (Ctrl+F5 or Cmd+Shift+R)
- Wait 2-3 minutes for GitHub to rebuild
- Check the Actions tab for deployment status

---

## Custom Domain (Optional)

If you want to use a custom domain like `thermal-datasets.yourname.com`:

1. Buy a domain from any domain registrar
2. In your domain settings, add a CNAME record pointing to:
   ```
   blackpearl006.github.io
   ```
3. In your repository Settings → Pages:
   - Enter your custom domain
   - Click Save
4. Wait for DNS propagation (can take up to 48 hours)

---

## Additional Features

### Dark/Light Theme

The website includes a built-in theme toggle:
- Click the sun/moon icon in the top right
- Theme preference is not saved (reloads to dark mode)
- To change default theme, edit line in `index.html`:
  ```javascript
  // Set initial theme to light instead
  document.body.setAttribute('data-theme', 'light');
  ```

### Mobile Responsive

The website is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

No additional configuration needed!

---

## Resources

- **GitHub Pages Documentation:** https://docs.github.com/en/pages
- **GitHub Pages Troubleshooting:** https://docs.github.com/en/pages/getting-started-with-github-pages/troubleshooting-404-errors-for-github-pages-sites
- **HTML/CSS/JS Reference:** https://developer.mozilla.org/

---

## Support

If you encounter issues:

1. Check the GitHub Pages status: https://www.githubstatus.com/
2. Review GitHub Pages documentation
3. Check repository Actions tab for build errors
4. Ensure all files are committed and pushed to the correct branch

---

## Summary

Publishing with GitHub Pages is simple:
1. **Enable GitHub Pages** in repository settings (source: `/website` folder)
2. **Wait** for automatic deployment (1-3 minutes)
3. **Visit** your live website!

No build tools, no npm, no complex setup - just pure HTML, CSS, and JavaScript served directly from your repository.

**Your website URL:**
```
https://blackpearl006.github.io/getting-started-with-thermal-imaging/
```

Happy publishing! 🚀
