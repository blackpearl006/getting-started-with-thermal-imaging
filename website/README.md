# Thermal Dataset Discovery Website

A dynamic, high-performance Vue.js website for discovering thermal imaging datasets with optimized lazy loading.

## 🚀 Features

- **Optimized Lazy Loading**: Load only 8.7KB of card data initially, full datasets (4-11KB each) on demand
- **90% Performance Gain**: Initial load reduced from 80.5KB to 8.7KB
- **Smart Caching**: Datasets loaded once and cached in memory
- **Category Filtering**: Filter by Medical, Research, or Surveillance datasets
- **Dark/Light Theme**: Theme preference persisted in localStorage
- **Responsive Design**: Apple-inspired design that works on all devices
- **9 Curated Datasets**: Medical, research, and surveillance applications

## 📊 Performance Metrics

| Metric | Value |
|--------|-------|
| Initial Load | 8.7KB (cards only) |
| Full Dataset Size | 80.5KB (all 9 datasets) |
| Performance Gain | 90% reduction |
| Datasets Count | 9 |
| Card Size Range | 0.8-0.9KB each |
| Full Dataset Range | 4.5-11.2KB each |

## 🏗️ Project Structure

```
website/
├── index.html                      # Main Vue.js SPA
├── package.json                    # Dependencies
├── README.md                       # This file
│
├── assets/
│   ├── css/
│   │   └── main.css               # Extracted styles (Apple-inspired)
│   └── js/
│       └── app.js                 # Vue 3 app with lazy loading
│
├── data/
│   ├── datasets-cards.json        # Lightweight index (8.7KB)
│   ├── build-metadata.json        # Build statistics
│   └── datasets/
│       ├── dmrir.json             # Full dataset (9.1KB)
│       ├── mendeley.json          # Full dataset (9.6KB)
│       ├── openthermalpose.json   # Full dataset (10.0KB)
│       ├── openthermalpose2.json  # Full dataset (4.5KB)
│       ├── faceoral.json          # Full dataset (10.4KB)
│       ├── lwirpose.json          # Full dataset (6.2KB)
│       ├── iphpdt.json            # Full dataset (10.3KB)
│       ├── pop.json               # Full dataset (11.2KB)
│       ├── kaggle-thermal.json    # Full dataset (9.3KB)
│       ├── dmrir.yaml             # Source YAML
│       └── ... (other YAML files)
│
└── scripts/
    └── yaml-to-json.js            # Build script (YAML → JSON)
```

## 🛠️ Setup & Development

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Build JSON files from YAML
npm run build

# 3. Serve the website (use any local server)
# Option A: Python
python3 -m http.server 8000

# Option B: Node.js http-server
npx http-server -p 8000

# Option C: VS Code Live Server extension
# Just right-click index.html > Open with Live Server
```

### Access

Open browser to: `http://localhost:8000`

## 📝 Adding New Datasets

### Step 1: Create YAML File

Copy the template and fill in your dataset information:

```bash
cp data/_template.yaml data/datasets/your-dataset.yaml
```

Edit `your-dataset.yaml` following the comprehensive template documentation.

### Step 2: Build

Regenerate JSON files:

```bash
npm run build
```

The build script will:
- ✅ Validate YAML syntax
- ✅ Generate individual dataset JSON file
- ✅ Update datasets-cards.json
- ✅ Update build-metadata.json
- ✅ Display performance metrics

### Step 3: Verify

Check that your dataset appears on the dashboard and detail view works correctly.

## 🎨 Dataset Schema

Each dataset YAML file contains:

### Card Data (Dashboard)
- `id`: Unique identifier (lowercase-with-dashes)
- `title`: Display name
- `subtitle`: Short description
- `category`: medical-breast, medical-other, research, surveillance
- `card.description`: 2-3 sentence overview
- `card.stats`: 1-3 statistics (Images, Subjects, etc.)
- `card.tags`: 3-6 descriptive tags
- `card.links`: Primary (external) and secondary (detail view)

### Detail Data (Full View)
- `detail.header`: Badges and metadata
- `detail.sections`: Array of section objects

### Section Types

1. **Overview**: Paragraphs with markdown + highlight boxes
2. **Specifications**: Parameter grid (4-12 items)
3. **Protocols**: Methodology cards (2-4 steps)
4. **List**: Bulleted content with markdown
5. **Table**: Comparison/results tables
6. **Links**: Access URLs with citation info

## 🧪 Testing & Debugging

### Browser Console Commands

```javascript
// Check loaded cards
app.datasetCards.length              // Should be 9

// Check cache (empty initially)
app.datasetCache                     // {}

// Load a dataset
app.showDetail('dmrir')              // Loads dmrir.json

// Check cache (now populated)
app.datasetCache.dmrir               // Full dataset object

// Load again (from cache)
app.showDetail('dmrir')              // Console: "✅ Loaded from cache: dmrir"

// Change filter
app.filterCategory = 'research'      // Show only research datasets

// Toggle theme
app.toggleTheme()                    // Switch dark/light mode
```

### Performance Testing

Open DevTools > Network tab:
1. **Initial load**: Should only fetch `datasets-cards.json` (8.7KB)
2. **Click dataset**: Should fetch individual JSON (e.g., `dmrir.json` 9.1KB)
3. **Click same dataset again**: No network request (cached)

### Expected Console Output

```
🚀 Thermal Dataset Discovery app initialized
💡 Debug commands:
   app.datasetCards.length           // Number of cards loaded
   app.datasetCache                  // Cached full datasets
   app.showDetail("dmrir")           // Load a dataset
   app.filterCategory = "research"   // Change filter
   app.toggleTheme()                 // Toggle theme
✅ Loaded dataset cards: 9
📦 Cards size: 8.7KB
```

When clicking a dataset:
```
✅ Loaded dataset: dmrir
📦 Dataset size: 9.1KB
```

When clicking the same dataset again:
```
✅ Loaded from cache: dmrir
```

## 📦 Build Script

The `scripts/yaml-to-json.js` build script:

1. **Reads all YAML files** from `data/datasets/`
2. **Extracts card data** (id, title, subtitle, category, card)
3. **Generates datasets-cards.json** with lightweight index
4. **Generates individual JSON files** with full dataset data
5. **Calculates performance metrics**
6. **Creates build-metadata.json** with statistics

### Build Output Example

```
🚀 Starting YAML to JSON conversion...

📁 Found 9 dataset files:
   - dmrir.yaml
   - faceoral.yaml
   ... (7 more)

✅ dmrir                Card: 0.9KB  Full: 9.1KB
✅ faceoral             Card: 0.9KB  Full: 10.4KB
... (7 more)

📊 Build Summary:
────────────────────────────────────────────────────────────
✅ Generated datasets-cards.json: 8.7KB
✅ Generated 9 individual dataset JSON files
📦 Total card data size: 8.0KB
📦 Total full data size: 80.5KB
🚀 Performance gain: 90% reduction in initial load
────────────────────────────────────────────────────────────
```

## 🎯 Vue.js Architecture

### Data Flow

```
1. App Mount
   ↓
2. loadDatasetCards() → fetch('data/datasets-cards.json')
   ↓
3. Dashboard renders with card data
   ↓
4. User clicks "View Details"
   ↓
5. loadDatasetDetail(id) → check cache
   ├─ If cached: return immediately
   └─ If not: fetch('data/datasets/{id}.json') → cache it
   ↓
6. Detail view renders with full data
```

### Key Vue Features

- **Reactive Data**: `datasetCards`, `datasetCache`, `currentView`
- **Computed Properties**: `filteredDatasets`, `currentDataset`
- **Methods**: Lazy loading, caching, theme management
- **Components**: Section renderers (overview, specs, protocols, list, table, links)
- **Lifecycle**: `mounted()` hook loads cards on startup

## 🌐 Deployment

### GitHub Pages

1. **Build JSON files**:
   ```bash
   npm run build
   ```

2. **Commit all files**:
   ```bash
   git add .
   git commit -m "Build dataset discovery website"
   git push origin main
   ```

3. **Enable GitHub Pages**:
   - Go to repository Settings > Pages
   - Source: Deploy from branch `main` / `website` folder
   - Save

4. **Access**:
   - Your site will be at: `https://username.github.io/repo-name/`

### Custom Domain

Add `CNAME` file to website root with your domain name.

## 📄 License

MIT License - Feel free to use and modify.

## 🙏 Acknowledgments

- **9 Thermal Imaging Datasets** curated and documented
- **Vue 3** for reactive UI framework
- **Apple Design Guidelines** for UI/UX inspiration

## 🐛 Troubleshooting

### YAML Build Errors

```bash
# Validate YAML syntax
npm run build

# Check for common issues:
# - Tabs instead of spaces (use spaces only)
# - Missing required fields (id, title, subtitle, category)
# - Incorrect indentation
```

### Datasets Not Loading

1. Check browser console for errors
2. Verify `datasets-cards.json` exists
3. Check individual dataset JSON files exist
4. Ensure local server is running
5. Check file paths are correct (case-sensitive)

### Theme Not Persisting

- Check browser localStorage support
- Verify no errors in console
- Try clearing localStorage and reloading

## 📚 Resources

- [Vue 3 Documentation](https://vuejs.org/)
- [YAML Syntax](https://yaml.org/)
- [Project Plan](plan.md)
- [Dataset Template](data/_template.yaml)

---

**Built with Vue 3 • Optimized for Performance • Apple-Inspired Design**
