# Comprehensive Prompt for Claude Code: Dynamic Thermal Dataset Discovery Website

## **CONTEXT & GOAL**

I have a static HTML thermal dataset discovery website (`thermal-dataset-discovery.html`) with 9 datasets. I want to transform this into a **dynamic, reactive Vue.js website** that:

1. Reads dataset information from **YAML/JSON files** (one file per dataset)
2. Uses a **template-based approach** - adding a new dataset only requires creating a new YAML file
3. Maintains **all current functionality** (filtering, detail views, theme toggle, responsive design)
4. Preserves the **Apple-inspired aesthetic** exactly as is
5. Deploys to **GitHub Pages** for hosting
6. Is **fully reactive** - no page reloads when navigating

---

# 📋 PHASE 1: Project Architecture & Data Schema Design

## Task 1.1: Create Project Structure

Create the following directory structure:

```
thermal-dataset-discovery/
├── index.html                      # Main Vue.js entry point
├── README.md                       # Documentation
├── .gitignore                     # Git ignore file
├── package.json                   # Dependencies (if using build tools)
│
├── assets/
│   ├── css/
│   │   └── styles.css            # All styles from current HTML
│   └── js/
│       ├── app.js                # Main Vue app
│       └── components/           # Vue components
│           ├── DatasetCard.js
│           ├── DatasetDetail.js
│           ├── FilterBar.js
│           └── Header.js
│
├── data/
│   ├── datasets/                 # Individual dataset YAML files
│   │   ├── dmrir.yaml
│   │   ├── mendeley.yaml
│   │   ├── openthermalpose.yaml
│   │   ├── openthermalpose2.yaml
│   │   ├── faceoral.yaml
│   │   ├── lwirpose.yaml
│   │   ├── iphpdt.yaml
│   │   ├── pop.yaml
│   │   └── kaggle.yaml
│   │
│   └── _template.yaml            # Template for new datasets
│
└── docs/                         # GitHub Pages folder (if needed)
```

## Task 1.2: Design YAML Schema

Create a comprehensive YAML schema that captures ALL information types from the current website. The schema should support:

### **Core Metadata**
```yaml
id: "dmrir"                        # Unique identifier (used in URLs)
title: "DMR-IR"                    # Display name
subtitle: "Database for Mastology Research"
category: "medical-breast"         # Options: medical-breast, medical-other, research, surveillance
```

### **Card Display (Dashboard View)**
```yaml
card:
  description: "Short description for card (2-3 sentences)"
  
  stats:                           # Flexible: 1-3 stats
    - label: "Images"
      value: "5,860+"
    - label: "Patients"  
      value: "293"
    - label: "Protocol"
      value: "DIT"
  
  tags:                            # Array of tags
    - "Breast Cancer"
    - "Dynamic Thermography"
    - "Clinical Data"
    
  links:
    primary:
      text: "Access Dataset"
      url: "https://visual.ic.uff.br/dmi/"
    secondary:
      text: "View Details"
      action: "show-detail"        # Triggers detail view
```

### **Detail View Structure**
```yaml
detail:
  header:
    badges:
      - type: "medical"            # Types: medical, research, surveillance
        text: "Medical - Breast Cancer"
    
    meta:                          # 2-4 meta items
      - label: "Institution"
        value: "Federal University Fluminense, Brazil"
      - label: "Year Released"
        value: "2012"
      - label: "License"
        value: "Ethics Committee Approved"
      - label: "Access"
        value: "Public"
  
  sections:                        # Array of content sections
    - type: "overview"             # Section type determines rendering
      title: "Overview"
      content:                     # Can be markdown or HTML
        - type: "paragraph"
          text: "The DMR-IR dataset is..."
        - type: "paragraph"
          text: "Created by..."
        - type: "highlight"        # Colored highlight box
          text: "**Key Achievement:** Studies using this dataset..."
    
    - type: "specifications"       # Renders as parameter cards
      title: "Dataset Specifications"
      params:                      # 4-8 parameter cards
        - label: "Total Patients"
          value: "293"
        - label: "Total Images"
          value: "5,860"
        # ... more params
    
    - type: "protocols"            # Renders as protocol grid
      title: "Dynamic Thermography Protocol"
      description: "The dataset uses..."
      protocols:                   # 2-4 protocol cards
        - title: "1. Cooling Phase"
          description: "Electric fan used to cool..."
        - title: "2. Sequential Imaging"
          description: "20 frontal infrared images..."
    
    - type: "list"                 # Simple bullet list section
      title: "Dataset Contents"
      items:
        - "**Infrared Images:** 20 sequential thermal images..."
        - "**Temperature Matrices:** Numerical temperature data..."
    
    - type: "table"                # Renders as comparison table
      title: "Research Impact & Performance"
      description: "The DMR-IR dataset has been..."
      table:
        headers:
          - "Study"
          - "Method"
          - "Accuracy"
          - "Key Feature"
        rows:
          - ["Silva et al. (2020)", "SVM + Feature Engineering", "100%", "Texture analysis"]
          - ["Deep Learning (2022)", "U-Net + CNN", "99.33%", "Auto segmentation"]
    
    - type: "links"                # Renders as link list
      title: "Access & Citation"
      description: "Dataset access information:"
      links:
        - text: "DMR-IR Database Portal (Official)"
          url: "https://visual.ic.uff.br/dmi/"
        - text: "Kaggle Mirror Version"
          url: "https://kaggle.com/..."
      note:                        # Optional highlight note
        type: "highlight"
        text: "**Citation:** When using this dataset..."
```

### **Design Requirements for Schema**

1. **Flexible Stats Display**: If a dataset has 1 stat, center it. If 2, use 2 columns. If 3+, show first 3 in grid.

2. **Section Type System**: Each section type has specific rendering:
   - `overview` → Paragraphs with optional highlights
   - `specifications` → Grid of parameter cards
   - `protocols` → Protocol grid (2-4 cards)
   - `list` → Bullet points with markdown support
   - `table` → Responsive comparison table
   - `links` → Link list with optional description

3. **Markdown Support**: All text fields should support basic markdown (**bold**, _italic_, `code`, [links](url))

4. **Extensibility**: Easy to add new section types without breaking existing datasets

---

# 📋 PHASE 2: Vue.js Implementation

## Task 2.1: Set Up Vue.js Application

**Requirements:**
- Use Vue 3 (CDN version for simplicity, no build tools)
- Single-file approach OR component-based (your choice)
- No page reloads - all navigation via Vue Router or state management

**Implementation Checklist:**
```javascript
// app.js structure
const app = Vue.createApp({
  data() {
    return {
      datasets: [],           // Loaded from YAML files
      currentView: 'dashboard', // 'dashboard' or 'detail'
      currentDataset: null,
      filterCategory: 'all',
      theme: 'dark',
      showFilters: false
    }
  },
  
  async mounted() {
    // Load all dataset YAML files
    await this.loadDatasets();
  },
  
  methods: {
    async loadDatasets() {
      // Load and parse YAML files
      // Hint: Use js-yaml library or convert to JSON
    },
    
    showDetail(datasetId) {
      // Navigate to detail view
    },
    
    showDashboard() {
      // Navigate back to dashboard
    },
    
    filterDatasets(category) {
      // Filter datasets by category
    },
    
    toggleTheme() {
      // Toggle dark/light theme
    }
  }
});
```

## Task 2.2: Create Vue Components

### Component 1: DatasetCard.vue (or DatasetCard.js)
```javascript
// Renders individual dataset card on dashboard
// Props: dataset object
// Emits: @click → triggers detail view
// Features:
// - Dynamic stat count (1-3)
// - Tag display
// - Category badge
// - Hover effects
```

### Component 2: DatasetDetail.vue
```javascript
// Renders full dataset detail page
// Props: dataset object
// Features:
// - Back button
// - Header with badges and meta
// - Dynamic section rendering based on type
// - Support for all section types (overview, specs, protocols, table, links)
```

### Component 3: FilterBar.vue
```javascript
// Renders filter chips
// Props: categories array
// Emits: @filter-change
// Features:
// - Active state management
// - Smooth transitions
```

### Component 4: SectionRenderer.vue
```javascript
// Dynamically renders sections based on type
// Props: section object
// Features:
// - Switch/case for different section types
// - Markdown parsing for text
// - Responsive tables
// - Protocol/param grids
```

## Task 2.3: YAML Loading Strategy

**Option A: Pre-convert to JSON** (Recommended for GitHub Pages)
```javascript
// Build script to convert YAML → JSON
// Load JSON files dynamically
fetch('data/datasets/dmrir.json')
  .then(r => r.json())
  .then(data => { /* use data */ })
```

**Option B: Load YAML directly**
```javascript
// Use js-yaml library
import jsyaml from 'js-yaml';
fetch('data/datasets/dmrir.yaml')
  .then(r => r.text())
  .then(text => jsyaml.load(text))
```

**Option C: Bundle all datasets**
```javascript
// Create datasets-index.json with all datasets
// Single fetch on load
fetch('data/datasets-index.json')
  .then(r => r.json())
  .then(datasets => this.datasets = datasets)
```

**Your Task:** Implement the most suitable loading strategy and explain why you chose it.

---

# 📋 PHASE 3: Styling & Theme Management

## Task 3.1: Extract and Organize CSS

**Requirements:**
1. Extract ALL CSS from the current HTML file into `assets/css/styles.css`
2. Maintain the exact same visual appearance
3. Ensure all CSS variables for theming work correctly
4. Keep responsive design intact

**CSS Organization:**
```css
/* styles.css structure */

/* 1. CSS Variables for theming */
:root { /* light theme vars */ }
[data-theme="dark"] { /* dark theme vars */ }

/* 2. Base styles */
* { margin: 0; padding: 0; box-sizing: border-box; }
body { /* ... */ }

/* 3. Layout components */
.container { /* ... */ }
header { /* ... */ }

/* 4. Dashboard components */
.datasets-grid { /* ... */ }
.dataset-card { /* ... */ }
.filter-bar { /* ... */ }

/* 5. Detail view components */
.detail-view { /* ... */ }
.section { /* ... */ }
.param-card { /* ... */ }

/* 6. Utility classes */
.highlight-box { /* ... */ }
.comparison-table { /* ... */ }

/* 7. Responsive breakpoints */
@media (max-width: 768px) { /* ... */ }
```

## Task 3.2: Vue-Specific Class Bindings

Convert static classes to dynamic Vue bindings:

```javascript
// Example conversions needed:

// Static:
<div class="dataset-card hidden">

// Vue:
<div 
  class="dataset-card" 
  :class="{ hidden: !isVisible(dataset.category) }"
>

// Static:
<div class="detail-view active">

// Vue:
<div 
  class="detail-view" 
  :class="{ active: currentView === 'detail' }"
>
```

---

# 📋 PHASE 4: Routing & State Management

## Task 4.1: Implement Client-Side Routing

**Without Vue Router (Simple):**
```javascript
// Use hash-based routing
// URLs: /#/datasets/dmrir

data() {
  return {
    currentRoute: window.location.hash
  }
},

mounted() {
  window.addEventListener('hashchange', () => {
    this.currentRoute = window.location.hash;
    this.handleRouteChange();
  });
},

methods: {
  handleRouteChange() {
    // Parse hash and update view
    if (this.currentRoute.includes('/datasets/')) {
      const id = this.currentRoute.split('/').pop();
      this.showDetail(id);
    } else {
      this.showDashboard();
    }
  }
}
```

**With Vue Router (Advanced):**
```javascript
// Define routes
const routes = [
  { path: '/', component: Dashboard },
  { path: '/datasets/:id', component: DatasetDetail }
]

// Use <router-link> and <router-view>
```

**Your Task:** Implement routing so:
- Dashboard: `/` or `/#/`
- Detail views: `/datasets/dmrir` or `/#/datasets/dmrir`
- Back button works correctly
- Direct URL navigation works
- Browser back/forward buttons work

## Task 4.2: State Management

Implement clean state management for:
- Current view (dashboard/detail)
- Current dataset
- Filter state
- Theme preference (persist to localStorage)

```javascript
// State structure
state: {
  datasets: [],
  currentView: 'dashboard',
  currentDatasetId: null,
  filters: {
    category: 'all',
    visible: false
  },
  theme: localStorage.getItem('theme') || 'dark'
},

// Getters
currentDataset() {
  return this.datasets.find(d => d.id === this.currentDatasetId);
},

filteredDatasets() {
  if (this.filters.category === 'all') return this.datasets;
  return this.datasets.filter(d => d.category === this.filters.category);
}
```

---

# 📋 PHASE 5: Template System & Documentation

## Task 5.1: Create Template YAML File

Create `data/_template.yaml` with comprehensive documentation:

```yaml
# ============================================
# THERMAL DATASET DISCOVERY - DATASET TEMPLATE
# ============================================
#
# INSTRUCTIONS:
# 1. Copy this template to data/datasets/your-dataset-id.yaml
# 2. Fill in all required fields (marked with *)
# 3. Optional fields can be omitted
# 4. Follow the examples for each field type
#
# TIPS:
# - Use lowercase-with-dashes for IDs
# - Keep descriptions concise for cards (2-3 sentences)
# - Use markdown in content sections
# - Test with different stat counts (1, 2, 3+)
#
# ============================================

# --- CORE METADATA (Required) ---
id: "your-dataset-id"              # * Unique ID (lowercase-with-dashes)
title: "Your Dataset Name"         # * Display title
subtitle: "Short descriptive subtitle" # * Appears under title
category: "medical-breast"         # * Options: medical-breast, medical-other, research, surveillance

# --- CARD DISPLAY (Required) ---
card:
  description: |                   # * 2-3 sentences for dashboard card
    Brief description of the dataset. What makes it unique or valuable.
    Keep this concise and engaging.
  
  stats:                          # * 1-3 statistics (more than 3 = show first 3)
    - label: "Images"             # * Stat label
      value: "1,000+"             # * Stat value (can include units)
    - label: "Subjects"           # Optional second stat
      value: "100"
    # - label: "Third Stat"       # Optional third stat (uncomment if needed)
    #   value: "Value"
  
  tags:                           # * At least 2 tags, maximum ~6
    - "Tag 1"
    - "Tag 2"
    - "Tag 3"
  
  links:
    primary:                      # * Primary action button
      text: "Access Dataset"
      url: "https://example.com/dataset"
    secondary:                    # * Secondary button
      text: "View Details"
      action: "show-detail"       # Always "show-detail" for detail view

# --- DETAIL VIEW (Required) ---
detail:
  header:
    badges:                       # * 1-2 category badges
      - type: "medical"           # Options: medical, research, surveillance
        text: "Medical - Breast Cancer"
    
    meta:                         # * 2-4 metadata items
      - label: "Institution"
        value: "University Name"
      - label: "Year Released"
        value: "2024"
      - label: "License"
        value: "Open Access"
      # Add more as needed
  
  sections:                       # * Array of content sections
    
    # SECTION TYPE 1: Overview (narrative text)
    - type: "overview"
      title: "Overview"
      content:
        - type: "paragraph"
          text: |
            Main description paragraph. Can include **markdown** formatting.
            Multiple sentences explaining the dataset.
        
        - type: "paragraph"
          text: "Another paragraph with more details."
        
        - type: "highlight"       # Optional colored box
          text: |
            **Key Achievement:** Important highlight or achievement.
            Use this sparingly for emphasis.
    
    # SECTION TYPE 2: Specifications (parameter grid)
    - type: "specifications"
      title: "Dataset Specifications"
      params:                     # 4-12 parameter cards
        - label: "Parameter 1"
          value: "Value 1"
        - label: "Parameter 2"
          value: "Value 2"
        # Add more parameters as needed
    
    # SECTION TYPE 3: Protocols (protocol cards)
    - type: "protocols"
      title: "Section Title"
      description: "Optional introductory text."
      protocols:                  # 2-4 protocol cards
        - title: "Step 1: Title"
          description: "Description of this step or protocol."
        - title: "Step 2: Title"
          description: "Description of next step."
    
    # SECTION TYPE 4: List (bullet points)
    - type: "list"
      title: "List Section Title"
      description: "Optional introduction."  # Optional
      items:
        - "**Item 1:** Description with markdown support"
        - "**Item 2:** Another item"
        - "Sub-items use regular bullets"
    
    # SECTION TYPE 5: Table (comparison table)
    - type: "table"
      title: "Comparison Table"
      description: "Optional table description."
      table:
        headers:                  # Column headers
          - "Column 1"
          - "Column 2"
          - "Column 3"
        rows:                     # Data rows
          - ["Row 1 Col 1", "Row 1 Col 2", "Row 1 Col 3"]
          - ["Row 2 Col 1", "Row 2 Col 2", "Row 2 Col 3"]
    
    # SECTION TYPE 6: Links (link list)
    - type: "links"
      title: "Access & Resources"
      description: "Where to find this dataset:"
      links:
        - text: "Primary Link"
          url: "https://example.com"
        - text: "Secondary Link"
          url: "https://example.com/docs"
      note:                       # Optional highlight
        type: "highlight"
        text: "**Note:** Important information about access."

# ============================================
# VALIDATION CHECKLIST
# ============================================
# Before committing your YAML file:
# ☐ ID is unique and lowercase-with-dashes
# ☐ All required (*) fields are filled
# ☐ Stats count is 1-3 (if more, only first 3 show)
# ☐ Tags are relevant and concise
# ☐ At least one overview section
# ☐ At least one specifications section
# ☐ All URLs are valid and accessible
# ☐ Markdown formatting is correct
# ☐ File is valid YAML (no syntax errors)
```

## Task 5.2: Create Comprehensive README.md

```markdown
# Thermal Dataset Discovery

Dynamic, reactive website for discovering thermal imaging datasets.

## 🎯 Adding a New Dataset

1. **Copy the template:**
   ```bash
   cp data/_template.yaml data/datasets/your-dataset-id.yaml
   ```

2. **Fill in the details** following the template instructions

3. **Validate YAML syntax:**
   ```bash
   # Use online validator or:
   python -c "import yaml; yaml.safe_load(open('data/datasets/your-dataset-id.yaml'))"
   ```

4. **Test locally** (if using development server)

5. **Commit and push** - changes appear automatically on GitHub Pages

## 📁 Project Structure

[Include full structure diagram]

## 🎨 Customization

### Adding a New Section Type

[Instructions for developers]

### Modifying Styles

[Instructions for CSS changes]

## 🚀 Development

### Local Development
[Setup instructions]

### GitHub Pages Deployment
[Deployment steps]

## 📊 Current Datasets

[Auto-generate list from existing YAMLs]
```

---

# 📋 PHASE 6: Testing & Optimization

## Task 6.1: Implement Error Handling

```javascript
// Handle missing datasets
// Handle malformed YAML
// Handle network errors
// Show user-friendly error messages

try {
  await this.loadDatasets();
} catch (error) {
  console.error('Failed to load datasets:', error);
  this.showError('Unable to load datasets. Please refresh the page.');
}
```

## Task 6.2: Performance Optimization

- Lazy load dataset details (only load YAML when detail view is opened)
- Cache loaded datasets
- Optimize images (if any are added later)
- Minify CSS/JS for production

## Task 6.3: Accessibility

- Ensure all interactive elements are keyboard accessible
- Add proper ARIA labels
- Test with screen readers
- Maintain focus management during navigation

---

# 📋 PHASE 7: GitHub Pages Deployment

## Task 7.1: Configure for GitHub Pages

1. Create `docs/` folder or use root
2. Set up GitHub Actions for auto-build (if using build tools)
3. Configure YAML → JSON conversion (if needed)
4. Test on GitHub Pages URL

## Task 7.2: CI/CD Setup (Optional)

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Convert YAML to JSON
        run: |
          # Script to convert all YAMLs to JSON
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

---

# 🎯 FINAL DELIVERABLES CHECKLIST

When the project is complete, you should have:

- [ ] Vue.js application with all functionality from original HTML
- [ ] YAML-based dataset storage (one file per dataset)
- [ ] Comprehensive template file with documentation
- [ ] All 9 existing datasets converted to YAML
- [ ] Filtering works correctly
- [ ] Detail view navigation works
- [ ] Theme toggle works and persists
- [ ] Responsive design maintained
- [ ] GitHub Pages deployment working
- [ ] README with clear instructions for adding datasets
- [ ] No visual differences from original design
- [ ] All links and interactions functional
- [ ] Error handling implemented
- [ ] Loading states for data fetching

---

# 💡 SUGGESTED APPROACH FOR CLAUDE CODE

Start with this conversation:

```
I have a static HTML website for thermal imaging datasets that I want to convert to a dynamic Vue.js application using YAML data files. 

PHASE 1: Let's start by:
1. Creating the project structure
2. Designing a comprehensive YAML schema that captures all the data from my current HTML
3. Creating a template YAML file with full documentation

Please analyze the current HTML structure and propose a complete YAML schema that handles all these section types: overview paragraphs, specification grids, protocol cards, tables, lists, and link sections. The schema should be flexible enough that I can add new datasets just by creating a new YAML file.

```

Then proceed through phases 2-7 systematically!
