# 📚 Dataset Addition Guide

Complete workflow for adding new thermal imaging datasets to the discovery platform.

---

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Prerequisites](#prerequisites)
3. [Step-by-Step Workflow](#step-by-step-workflow)
4. [YAML Schema Reference](#yaml-schema-reference)
5. [Section Types Guide](#section-types-guide)
6. [Testing Your Dataset](#testing-your-dataset)
7. [Best Practices](#best-practices)
8. [Examples](#examples)
9. [Troubleshooting](#troubleshooting)
10. [Validation Checklist](#validation-checklist)

---

## Quick Start

**TL;DR - 5 Minutes to Add a Dataset:**

```bash
# 1. Copy template
cp data/_template.yaml data/datasets/my-dataset.yaml

# 2. Edit with your dataset information
# Use your favorite text editor

# 3. Build JSON files
npm run build

# 4. Test locally
python3 -m http.server 8000
# Visit http://localhost:8000

# 5. Deploy (if satisfied)
git add data/
git commit -m "Add my-dataset to collection"
git push
```

---

## Prerequisites

### Required Software

- **Text Editor:** VS Code, Sublime, vim, or any YAML-compatible editor
- **Node.js & npm:** For building JSON files
- **Git:** For version control and deployment

**Check your setup:**
```bash
node --version    # v14+ required
npm --version     # v6+ required
git --version     # Any recent version
```

### Required Knowledge

- **Basic YAML syntax** - Indentation, lists, key-value pairs
- **Dataset information** - Technical specs, access links, citations
- **Markdown basics** (optional) - For formatting text content

### Dataset Information Checklist

Before starting, gather:

- [ ] Dataset name and subtitle
- [ ] Category (medical-breast, medical-other, research, surveillance)
- [ ] Short description (2-3 sentences)
- [ ] Key statistics (image count, subjects, year, etc.)
- [ ] Tags/keywords (3-8 relevant terms)
- [ ] Primary access link
- [ ] Technical specifications (camera, resolution, etc.)
- [ ] Citation information
- [ ] Contact details (optional)

---

## Step-by-Step Workflow

### Step 1: Copy the Template

```bash
# Navigate to project directory
cd /path/to/getting-started-with-thermal-imaging

# Copy template with meaningful ID
cp data/_template.yaml data/datasets/your-dataset-id.yaml
```

**Choosing a dataset ID:**
- Use lowercase letters and hyphens only
- Keep it short but descriptive (2-3 words)
- Examples: `dmrir`, `openthermalpose`, `lwirpose`
- Avoid: spaces, underscores, special characters

### Step 2: Open Template in Editor

```bash
# VS Code
code data/datasets/your-dataset-id.yaml

# Vim
vim data/datasets/your-dataset-id.yaml

# Sublime
subl data/datasets/your-dataset-id.yaml
```

### Step 3: Fill in Basic Information

**Start with the required fields:**

```yaml
# Update these first
id: "your-dataset-id"              # Must match filename
title: "Your Dataset Name"         # Display title
subtitle: "Brief descriptive subtitle"
category: "research"               # Choose from: medical-breast, medical-other, research, surveillance
```

**Categories explained:**
- `medical-breast` - Breast cancer/thermography datasets
- `medical-other` - Other medical applications
- `research` - General research, pose estimation, etc.
- `surveillance` - Security, monitoring applications

### Step 4: Create Card Information

The "card" section appears on the main dashboard:

```yaml
card:
  description: |
    A concise 2-4 sentence description of your dataset.
    Highlight the most important features and use cases.
    This appears on the dashboard cards.

  stats:
    - label: "Images"
      value: "1,000+"
    - label: "Subjects"
      value: "50"
    - label: "Year"
      value: "2024"
    # Add 2-4 relevant statistics

  tags:
    - "Primary Topic"
    - "Application Area"
    - "Camera Type"
    - "Key Feature"
    # Add 3-8 relevant tags

  links:
    primary:
      text: "Access Dataset"
      url: "https://example.com/dataset"
    secondary:                      # Optional
      text: "Documentation"
      url: "https://example.com/docs"
```

### Step 5: Add Detail Header

This appears at the top of the detail view:

```yaml
detail:
  header:
    badges:
      - type: "research"           # Matches category
        text: "Research Dataset"
      - type: "public"             # Optional: public, restricted, etc.
        text: "Public Access"

    meta:
      - label: "Institution"
        value: "Your University"
      - label: "Year"
        value: "2024"
      - label: "License"
        value: "CC BY 4.0"
      - label: "Contact"
        value: "email@example.com"
```

### Step 6: Add Content Sections

Add detailed information using different section types:

```yaml
detail:
  sections:
    # Section 1: Overview (always first)
    - type: "overview"
      title: "Overview"
      content:
        - type: "paragraph"
          text: "Detailed description of your dataset..."

    # Section 2: Specifications
    - type: "specifications"
      title: "Technical Specifications"
      content:
        - label: "Camera Model"
          value: "FLIR Model X"
        - label: "Resolution"
          value: "640 × 480 pixels"

    # Section 3: More sections as needed
    # See "Section Types Guide" below
```

### Step 7: Build JSON Files

```bash
# Run the build script
npm run build
```

**Expected output:**
```
🚀 Starting YAML to JSON conversion...
📁 Found 11 dataset files:
   - your-dataset-id.yaml
   ...
✅ your-dataset-id     Card: 0.9KB  Full: 8.5KB
...
✅ Build complete!
```

**If you see errors:**
- Check YAML syntax (indentation, quotes, colons)
- Verify all required fields are present
- Look for special characters that need escaping

### Step 8: Test Locally

```bash
# Start local server
python3 -m http.server 8000

# Open browser
open http://localhost:8000
```

**Test checklist:**
- [ ] Dataset appears on dashboard
- [ ] Card shows correct title, subtitle, description
- [ ] Tags and stats display properly
- [ ] Clicking "View Details" opens detail view
- [ ] All sections render correctly
- [ ] External links work
- [ ] No console errors (F12 → Console tab)

### Step 9: Commit Changes

```bash
# Stage your changes
git add data/datasets/your-dataset-id.yaml
git add data/datasets/your-dataset-id.json
git add data/datasets-cards.json

# Commit with descriptive message
git commit -m "Add your-dataset-id to dataset collection

- [Brief description of dataset]
- [Key features or statistics]
- [Any special notes]
"

# Push to repository
git push
```

### Step 10: Deploy (GitHub Pages)

If using GitHub Pages, deployment happens automatically:

1. **Push triggers deployment** (wait 1-3 minutes)
2. **Check GitHub Actions** tab for deployment status
3. **Visit live site** to verify

**Manual verification:**
```bash
# Visit your GitHub Pages URL
https://YOUR_USERNAME.github.io/thermal-dataset-discovery/
```

---

## YAML Schema Reference

### Complete Structure

```yaml
# ============================================
# REQUIRED FIELDS
# ============================================

id: "unique-dataset-id"                    # REQUIRED: Matches filename
title: "Dataset Display Title"             # REQUIRED
subtitle: "Brief subtitle"                 # REQUIRED
category: "research"                       # REQUIRED: medical-breast|medical-other|research|surveillance

# ============================================
# CARD SECTION (Dashboard Display)
# ============================================

card:
  description: |                           # REQUIRED: 2-4 sentences
    Multi-line description of the dataset.
    Appears on dashboard cards.

  stats:                                   # REQUIRED: 2-4 items
    - label: "Stat Name"
      value: "Stat Value"

  tags:                                    # REQUIRED: 3-8 items
    - "Tag 1"
    - "Tag 2"

  links:
    primary:                               # REQUIRED
      text: "Button Text"
      url: "https://example.com"
    secondary:                             # OPTIONAL
      text: "Secondary Link"
      url: "https://example.com"

# ============================================
# DETAIL SECTION (Detail View)
# ============================================

detail:
  header:
    badges:                                # OPTIONAL but recommended
      - type: "category-type"
        text: "Badge Text"

    meta:                                  # OPTIONAL but recommended
      - label: "Label"
        value: "Value"

  sections:                                # REQUIRED: 1+ sections
    - type: "overview|specifications|protocols|list|table|links"
      title: "Section Title"
      content: [...]                       # Structure depends on type
```

---

## Section Types Guide

### 1. Overview Section

**Best for:** Descriptions, background, methodology

```yaml
- type: "overview"
  title: "Overview"
  content:
    - type: "paragraph"
      text: "Your paragraph text here. Can use **bold** and *italic* markdown."

    - type: "list"
      items:
        - "Bullet point one"
        - "Bullet point two"
        - "Bullet point three"
```

**Markdown support:**
- `**bold**` → **bold**
- `*italic*` → *italic*
- `` `code` `` → `code`
- `[link](url)` → [link](url)

### 2. Specifications Section

**Best for:** Technical details, equipment specs

```yaml
- type: "specifications"
  title: "Technical Specifications"
  content:
    - label: "Camera Model"
      value: "FLIR E95"
    - label: "Resolution"
      value: "464 × 348 pixels"
    - label: "Thermal Sensitivity"
      value: "<30 mK @ 30°C"
    - label: "Temperature Range"
      value: "-20°C to 1500°C"
```

**Displays as:** Two-column layout (label | value)

### 3. Protocols Section

**Best for:** Acquisition procedures, methodologies

```yaml
- type: "protocols"
  title: "Data Acquisition Protocol"
  content:
    steps:
      - "Step 1: Preparation phase"
      - "Step 2: Data capture"
      - "Step 3: Quality verification"
    notes:
      - "Important consideration 1"
      - "Important consideration 2"
```

**Displays as:** Numbered steps + bulleted notes

### 4. List Section

**Best for:** Features, statistics, key points

```yaml
- type: "list"
  title: "Dataset Features"
  content:
    items:
      - "**Total Images:** 1,000+"
      - "**Subjects:** 50 (balanced demographics)"
      - "**Annotations:** Fully annotated"
      - "**Format:** TIFF (16-bit) + JPEG"
```

**Tip:** Use markdown for emphasis in list items

### 5. Table Section

**Best for:** Structured data, file listings, comparisons

```yaml
- type: "table"
  title: "Dataset Contents"
  content:
    headers:
      - "Directory"
      - "Contents"
      - "Count"
      - "Format"
    rows:
      - cells:
          - "`/thermal/`"
          - "Raw thermal images"
          - "1,000"
          - "TIFF"
      - cells:
          - "`/visual/`"
          - "RGB images"
          - "1,000"
          - "JPEG"
```

**Displays as:** Responsive HTML table

### 6. Links Section

**Best for:** Downloads, resources, external references

```yaml
- type: "links"
  title: "Downloads & Resources"
  content:
    - text: "📦 Full Dataset (ZIP, 2.3 GB)"
      url: "https://example.com/dataset.zip"
    - text: "📄 Dataset Paper (PDF)"
      url: "https://example.com/paper.pdf"
    - text: "💻 Python Scripts (GitHub)"
      url: "https://github.com/example/scripts"
    - text: "📊 Sample Data (100 images)"
      url: "https://example.com/sample"
```

**Tip:** Use emojis for visual distinction

---

## Testing Your Dataset

### Automated Validation

The build script automatically validates:
- ✅ Valid YAML syntax
- ✅ Required fields present
- ✅ Proper data structure
- ✅ No duplicate IDs

**If build fails:**
```bash
npm run build
# Look for error message indicating:
# - Line number with syntax error
# - Missing required field
# - Invalid structure
```

### Manual Testing Checklist

#### Dashboard View
- [ ] Dataset card appears
- [ ] Title and subtitle correct
- [ ] Description displays properly
- [ ] Statistics show correctly
- [ ] Tags are visible and clickable
- [ ] Primary button works
- [ ] Secondary link works (if present)

#### Detail View
- [ ] "View Details" opens detail view
- [ ] Header badges display
- [ ] Metadata shows correctly
- [ ] All sections render
- [ ] Content formatting correct
- [ ] Tables are readable
- [ ] Links open correctly (new tab)
- [ ] Markdown renders properly

#### Functionality
- [ ] Search finds your dataset (title, tags, description)
- [ ] Category filter includes your dataset
- [ ] Sorting works (category, alphabetical)
- [ ] Browser back button returns to dashboard
- [ ] URL routing works (`#dataset/your-id`)
- [ ] Theme toggle works on detail view

#### Cross-Browser Testing
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari
- [ ] Mobile Chrome
- [ ] Mobile Safari

---

## Best Practices

### Content Writing

**DO:**
- ✅ Write clear, concise descriptions
- ✅ Use active voice
- ✅ Include specific numbers and statistics
- ✅ Cite original papers and sources
- ✅ Provide context and use cases
- ✅ Keep descriptions focused (2-4 sentences for cards)

**DON'T:**
- ❌ Use jargon without explanation
- ❌ Write overly long paragraphs
- ❌ Duplicate content between sections
- ❌ Use vague terms like "many" or "various"
- ❌ Include unverified information
- ❌ Forget to proofread

### YAML Formatting

**DO:**
- ✅ Use 2 spaces for indentation
- ✅ Quote URLs and text with special characters
- ✅ Use `|` for multi-line text
- ✅ Keep arrays consistently formatted
- ✅ Add comments for clarity
- ✅ Follow the template structure

**DON'T:**
- ❌ Mix spaces and tabs
- ❌ Use inconsistent indentation
- ❌ Leave trailing whitespace
- ❌ Use unescaped special characters
- ❌ Create deeply nested structures
- ❌ Duplicate keys

### Organization

**Recommended Section Order:**

1. **Overview** - What is this dataset?
2. **Specifications** - Technical details
3. **Protocols** - How was it collected?
4. **Statistics/Features** - What's included?
5. **File Structure** - How is it organized?
6. **Downloads** - Where to get it?
7. **Applications** - What can you do with it?
8. **Citation** - How to cite it?
9. **Contact** - Who to reach out to?

**Tip:** Not all datasets need all sections. Use what makes sense.

---

## Examples

### Minimal Example

```yaml
id: "simple-dataset"
title: "Simple Thermal Dataset"
subtitle: "Basic Example"
category: "research"

card:
  description: |
    A simple dataset demonstrating the minimum required fields.
    Contains basic thermal images for testing purposes.

  stats:
    - label: "Images"
      value: "100"
    - label: "Year"
      value: "2024"

  tags:
    - "Research"
    - "Basic"
    - "FLIR"

  links:
    primary:
      text: "Access Dataset"
      url: "https://example.com/dataset"

detail:
  header:
    badges:
      - type: "research"
        text: "Research"
    meta:
      - label: "Institution"
        value: "Example University"

  sections:
    - type: "overview"
      title: "Overview"
      content:
        - type: "paragraph"
          text: "This is a simple dataset for demonstration purposes."
```

### Comprehensive Example

See `data/datasets/test-dataset.yaml` for a full example demonstrating:
- All 6 section types
- Complex content structures
- Multiple badges and metadata
- Markdown formatting
- Best practices implementation

### Real-World Examples

**Medical Dataset:**
```bash
cat data/datasets/dmrir.yaml
```

**Research Dataset:**
```bash
cat data/datasets/openthermalpose.yaml
```

**Surveillance Dataset:**
```bash
cat data/datasets/pop.yaml
```

---

## Troubleshooting

### Build Errors

#### Error: "Invalid YAML syntax"

**Problem:** YAML parser can't understand your file

**Solutions:**
1. Check indentation (must be 2 spaces, not tabs)
2. Verify colons have space after them (`key: value`)
3. Quote strings with special characters
4. Use online YAML validator: https://www.yamllint.com/

#### Error: "Missing required field: [field]"

**Problem:** Required field is missing or misspelled

**Solutions:**
1. Compare with template for correct field names
2. Check spelling and capitalization
3. Ensure field is at correct indentation level

#### Error: "Duplicate dataset ID"

**Problem:** Another dataset has the same ID

**Solutions:**
1. Choose a unique ID
2. Check existing datasets: `ls data/datasets/*.yaml`
3. Update both `id` field and filename

### Display Issues

#### Dataset not appearing on dashboard

**Checks:**
1. Was build successful? `npm run build`
2. Is JSON file created? `ls data/datasets/your-id.json`
3. Is ID in cards file? `grep your-id data/datasets-cards.json`
4. Did you refresh browser? (Hard refresh: Ctrl+Shift+R)
5. Check browser console for errors (F12)

#### Content not rendering correctly

**Checks:**
1. Verify markdown syntax
2. Check for unclosed quotes or brackets
3. Ensure section types are spelled correctly
4. Validate JSON was generated correctly
5. Test in different browser

#### Links not working

**Checks:**
1. URLs start with `http://` or `https://`
2. URLs are quoted in YAML
3. No trailing spaces in URLs
4. URLs are accessible (not blocked/private)

---

## Validation Checklist

### Before Building

- [ ] Unique dataset ID chosen
- [ ] Filename matches ID
- [ ] All required fields filled
- [ ] Category is one of: medical-breast, medical-other, research, surveillance
- [ ] Description is 2-4 sentences
- [ ] 2-4 statistics provided
- [ ] 3-8 tags added
- [ ] Primary link is valid URL
- [ ] At least one detail section created

### After Building

- [ ] `npm run build` completes without errors
- [ ] JSON file created in `data/datasets/`
- [ ] Dataset appears in `data/datasets-cards.json`
- [ ] File sizes reasonable (card ~1KB, full ~5-10KB)

### Before Committing

- [ ] Tested locally (http://localhost:8000)
- [ ] Dataset appears on dashboard
- [ ] Detail view loads correctly
- [ ] All links work
- [ ] No console errors
- [ ] Search finds dataset
- [ ] Filter includes dataset
- [ ] Mobile view looks good
- [ ] Both themes tested (dark/light)

### Before Deploying

- [ ] Commit message is descriptive
- [ ] Only necessary files staged
- [ ] No sensitive data included
- [ ] Documentation updated (if needed)
- [ ] CHANGELOG.md updated (if exists)

---

## Advanced Topics

### Multi-Language Support

Currently not implemented, but could be added:

```yaml
# Future feature
title:
  en: "English Title"
  es: "Título en Español"
```

### Custom Metadata

Add custom fields to the `meta` section:

```yaml
meta:
  - label: "DOI"
    value: "10.1234/dataset.123"
  - label: "Version"
    value: "v2.0"
  - label: "Last Updated"
    value: "2024-01-15"
```

### Rich Content

Use markdown for enhanced formatting:

```yaml
- type: "paragraph"
  text: |
    This dataset includes **1,000+ images** captured using *FLIR E95* cameras.
    Access the `documentation.pdf` for details.
    [Download sample](https://example.com/sample).
```

---

## Quick Reference

### Essential Commands

```bash
# Copy template
cp data/_template.yaml data/datasets/DATASET-ID.yaml

# Build JSON
npm run build

# Test locally
python3 -m http.server 8000

# Deploy
git add data/ && git commit -m "Add DATASET-ID" && git push
```

### File Locations

```
data/
├── _template.yaml              # Copy this to start
├── datasets-cards.json         # Generated: Dashboard index
├── build-metadata.json         # Generated: Build stats
└── datasets/
    ├── your-dataset.yaml       # Your source file
    └── your-dataset.json       # Generated from YAML
```

### Required Field Summary

```yaml
id: "..."                       # Unique identifier
title: "..."                    # Display name
subtitle: "..."                 # Brief tagline
category: "..."                 # One of 4 categories
card.description: "..."         # 2-4 sentences
card.stats: [...]               # 2-4 statistics
card.tags: [...]                # 3-8 tags
card.links.primary: {...}       # Access link
detail.sections: [...]          # 1+ sections
```

---

## Getting Help

### Resources

- **Template:** `data/_template.yaml` - Comprehensive template with inline docs
- **Examples:** `data/datasets/*.yaml` - 10 real-world examples
- **Schema:** This guide - Complete reference
- **Test Dataset:** `data/datasets/test-dataset.yaml` - Demonstrates all features

### Common Questions

**Q: How long should the description be?**
A: Card description: 2-4 sentences. Detail sections: As needed, but keep focused.

**Q: Can I include images?**
A: Not currently. Use links to external images or documentation.

**Q: How many tags should I add?**
A: 3-8 tags. Focus on most relevant keywords for search.

**Q: What if my dataset doesn't have all specifications?**
A: Only include what you have. Not all sections are required.

**Q: Can I update a dataset later?**
A: Yes! Edit the YAML, rebuild, and redeploy.

### Support

- **GitHub Issues:** [Report problems or request features](https://github.com/YOUR_USERNAME/thermal-dataset-discovery/issues)
- **Discussions:** [Ask questions or share ideas](https://github.com/YOUR_USERNAME/thermal-dataset-discovery/discussions)
- **Documentation:** Check README.md, PHASE3.md, PROJECT-COMPLETE.md

---

## Success! 🎉

You've successfully added a new dataset to the Thermal Dataset Discovery platform!

**What's Next:**
1. Share your dataset with the research community
2. Monitor usage and feedback
3. Update dataset information as needed
4. Add more datasets
5. Contribute improvements to the platform

**Thank you for contributing to the thermal imaging research community!** 🔥📸

---

**Last Updated:** 2025-11-18
**Version:** 1.0
**Maintainers:** Project Contributors
