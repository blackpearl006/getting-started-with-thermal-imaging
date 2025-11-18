/**
 * Thermal Dataset Discovery - Vue 3 Application
 * Phase 3: Enhanced Features & UI Polish
 *
 * Features:
 * - Lazy loading with caching
 * - Hash-based URL routing (deep linking)
 * - Search functionality
 * - Sorting options
 * - Keyboard navigation
 * - Enhanced markdown parsing
 * - Smooth transitions
 */

const { createApp } = Vue;

// ============================================
// UTILITIES
// ============================================

/**
 * Enhanced Markdown Parser
 * Supports: **bold**, *italic*, [links](url), `code`
 */
const parseMarkdown = (text) => {
  if (!text) return '';
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/\n/g, '<br>');
};

/**
 * Debounce function for search
 */
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// ============================================
// SECTION COMPONENTS
// ============================================

// Overview Section Component
const OverviewSection = {
  props: ['section'],
  template: `
    <div>
      <h2 class="section-title">{{ section.title }}</h2>
      <div class="section-content">
        <template v-for="(item, index) in section.content" :key="index">
          <p v-if="item.type === 'paragraph'" v-html="parseMarkdown(item.text)"></p>
          <div v-else-if="item.type === 'highlight'" class="highlight-box">
            <p v-html="parseMarkdown(item.text)"></p>
          </div>
        </template>
      </div>
    </div>
  `,
  methods: { parseMarkdown }
};

// Specifications Section Component
const SpecificationsSection = {
  props: ['section'],
  template: `
    <div>
      <h2 class="section-title">{{ section.title }}</h2>
      <div class="params-grid">
        <div class="param-card" v-for="(param, index) in section.params" :key="index">
          <div class="param-label">{{ param.label }}</div>
          <div class="param-value">{{ param.value }}</div>
        </div>
      </div>
    </div>
  `
};

// Protocols Section Component
const ProtocolsSection = {
  props: ['section'],
  template: `
    <div>
      <h2 class="section-title">{{ section.title }}</h2>
      <div class="section-content" v-if="section.description">
        <p v-html="parseMarkdown(section.description)"></p>
      </div>
      <div class="protocols-grid">
        <div class="protocol-card" v-for="(protocol, index) in section.protocols" :key="index">
          <div class="protocol-title">{{ protocol.title }}</div>
          <div class="protocol-desc" v-html="parseMarkdown(protocol.description)"></div>
        </div>
      </div>
    </div>
  `,
  methods: { parseMarkdown }
};

// List Section Component
const ListSection = {
  props: ['section'],
  template: `
    <div>
      <h2 class="section-title">{{ section.title }}</h2>
      <div class="section-content">
        <p v-if="section.description" v-html="parseMarkdown(section.description)"></p>
        <ul>
          <li v-for="(item, index) in section.items" :key="index" v-html="parseMarkdown(item)"></li>
        </ul>
      </div>
    </div>
  `,
  methods: { parseMarkdown }
};

// Table Section Component
const TableSection = {
  props: ['section'],
  template: `
    <div>
      <h2 class="section-title">{{ section.title }}</h2>
      <div class="section-content">
        <p v-if="section.description" v-html="parseMarkdown(section.description)"></p>
        <table class="comparison-table">
          <thead>
            <tr>
              <th v-for="(header, index) in section.table.headers" :key="index">{{ header }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, rowIndex) in section.table.rows" :key="rowIndex">
              <td v-for="(cell, cellIndex) in row" :key="cellIndex">{{ cell }}</td>
            </tr>
          </tbody>
        </table>
        <div v-if="section.note" class="highlight-box" style="margin-top: 20px;">
          <p v-html="parseMarkdown(section.note.text)"></p>
        </div>
      </div>
    </div>
  `,
  methods: { parseMarkdown }
};

// Links Section Component
const LinksSection = {
  props: ['section'],
  template: `
    <div>
      <h2 class="section-title">{{ section.title }}</h2>
      <div class="section-content">
        <p v-if="section.description" v-html="parseMarkdown(section.description)"></p>
        <ul class="link-list">
          <li v-for="(link, index) in section.links" :key="index">
            <a :href="link.url" target="_blank" rel="noopener noreferrer">{{ link.text }}</a>
          </li>
        </ul>
        <div v-if="section.note" class="highlight-box" style="margin-top: 20px;">
          <p v-html="parseMarkdown(section.note.text)"></p>
        </div>
      </div>
    </div>
  `,
  methods: { parseMarkdown }
};

// ============================================
// MAIN VUE APPLICATION
// ============================================

const app = createApp({
  components: {
    'overview-section': OverviewSection,
    'specifications-section': SpecificationsSection,
    'protocols-section': ProtocolsSection,
    'list-section': ListSection,
    'table-section': TableSection,
    'links-section': LinksSection
  },

  data() {
    return {
      datasetCards: [],          // Lightweight cards (loaded on mount)
      datasetCache: {},          // Full datasets cache { id: fullData }
      currentView: 'dashboard',  // 'dashboard' or 'detail'
      currentDatasetId: null,    // Current dataset ID in detail view
      filterCategory: 'all',     // Filter: 'all', 'medical-breast', 'research', etc.
      sortBy: 'category',        // Sort: 'category', 'title', 'newest'
      searchQuery: '',           // Search query string
      theme: localStorage.getItem('theme') || 'dark',
      showFilters: false,        // Show/hide filter bar
      loading: true,             // Initial loading state
      detailLoading: false,      // Detail view loading state
      error: null                // Error message
    };
  },

  async mounted() {
    await this.loadDatasetCards();
    this.applyTheme();
    this.initRouting();
    this.initKeyboardNav();
    console.log('✅ Loaded dataset cards:', this.datasetCards.length);
  },

  methods: {
    /**
     * Load lightweight cards for dashboard (initial load)
     */
    async loadDatasetCards() {
      this.loading = true;
      this.error = null;

      try {
        const response = await fetch('data/datasets-cards.json');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        this.datasetCards = await response.json();
        this.loading = false;

        console.log('✅ Loaded dataset cards:', this.datasetCards.length);
        console.log('📦 Cards size:', (JSON.stringify(this.datasetCards).length / 1024).toFixed(1) + 'KB');
      } catch (error) {
        this.error = 'Failed to load datasets. Please try again.';
        this.loading = false;
        console.error('❌ Error loading dataset cards:', error);
      }
    },

    /**
     * Load full dataset details (lazy load)
     */
    async loadDatasetDetail(datasetId) {
      // Check cache first
      if (this.datasetCache[datasetId]) {
        console.log('✅ Loaded from cache:', datasetId);
        return this.datasetCache[datasetId];
      }

      // Fetch full dataset
      this.detailLoading = true;

      try {
        const response = await fetch(`data/datasets/${datasetId}.json`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const fullData = await response.json();
        this.datasetCache[datasetId] = fullData;

        console.log('✅ Loaded dataset:', datasetId);
        console.log('📦 Dataset size:', (JSON.stringify(fullData).length / 1024).toFixed(1) + 'KB');

        return fullData;
      } catch (error) {
        console.error('❌ Failed to load dataset:', datasetId, error);
        return null;
      } finally {
        this.detailLoading = false;
      }
    },

    /**
     * Navigate to detail view
     */
    async showDetail(datasetId) {
      await this.loadDatasetDetail(datasetId);
      this.currentDatasetId = datasetId;
      this.currentView = 'detail';
      window.location.hash = `#dataset/${datasetId}`;
      this.smoothScrollToTop();
    },

    /**
     * Navigate back to dashboard
     */
    showDashboard() {
      this.currentView = 'dashboard';
      this.currentDatasetId = null;
      window.location.hash = '';
      this.smoothScrollToTop();
    },

    /**
     * Smooth scroll to top
     */
    smoothScrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },

    /**
     * Initialize hash-based routing
     */
    initRouting() {
      // Handle initial hash
      const hash = window.location.hash;
      if (hash.startsWith('#dataset/')) {
        const datasetId = hash.replace('#dataset/', '');
        if (this.datasetCards.find(d => d.id === datasetId)) {
          this.showDetail(datasetId);
        }
      }

      // Handle hash changes
      window.addEventListener('hashchange', () => {
        const hash = window.location.hash;
        if (hash.startsWith('#dataset/')) {
          const datasetId = hash.replace('#dataset/', '');
          if (this.datasetCards.find(d => d.id === datasetId)) {
            this.showDetail(datasetId);
          }
        } else if (hash === '') {
          this.showDashboard();
        }
      });

      console.log('✅ Hash-based routing initialized');
    },

    /**
     * Initialize keyboard navigation
     */
    initKeyboardNav() {
      document.addEventListener('keydown', (e) => {
        // Escape key - go back to dashboard
        if (e.key === 'Escape' && this.currentView === 'detail') {
          this.showDashboard();
        }

        // Ctrl/Cmd + K - focus search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
          e.preventDefault();
          this.$refs.searchInput?.focus();
        }

        // Ctrl/Cmd + / - toggle filters
        if ((e.ctrlKey || e.metaKey) && e.key === '/') {
          e.preventDefault();
          this.showFilters = !this.showFilters;
        }
      });

      console.log('✅ Keyboard navigation initialized');
      console.log('   - ESC: Back to dashboard');
      console.log('   - Ctrl/Cmd + K: Focus search');
      console.log('   - Ctrl/Cmd + /: Toggle filters');
    },

    /**
     * Apply theme to document
     */
    applyTheme() {
      document.body.setAttribute('data-theme', this.theme);
    },

    /**
     * Toggle dark/light theme
     */
    toggleTheme() {
      this.theme = this.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', this.theme);
      this.applyTheme();
      console.log('🎨 Theme changed to:', this.theme);
    },

    /**
     * Clear search
     */
    clearSearch() {
      this.searchQuery = '';
    },

    /**
     * Get badge CSS class for category
     */
    getBadgeClass(category) {
      const categoryMap = {
        'medical-breast': 'badge-medical',
        'medical-other': 'badge-medical',
        'medical': 'badge-medical',
        'research': 'badge-research',
        'surveillance': 'badge-surveillance'
      };
      return categoryMap[category] || 'badge-research';
    },

    /**
     * Get human-readable category label
     */
    getCategoryLabel(category) {
      const labels = {
        'medical-breast': 'Medical - Breast',
        'medical-other': 'Medical - Other',
        'research': 'Research',
        'surveillance': 'Surveillance'
      };
      return labels[category] || category;
    },

    /**
     * Count datasets by category
     */
    countByCategory(category) {
      return this.datasetCards.filter(d => d.category === category).length;
    },

    /**
     * Get section component name based on type
     */
    getSectionComponent(type) {
      const componentMap = {
        'overview': 'overview-section',
        'specifications': 'specifications-section',
        'protocols': 'protocols-section',
        'list': 'list-section',
        'table': 'table-section',
        'links': 'links-section'
      };
      return componentMap[type] || 'div';
    },

    /**
     * Share dataset (copy URL to clipboard)
     */
    async shareDataset(datasetId) {
      const url = `${window.location.origin}${window.location.pathname}#dataset/${datasetId}`;
      try {
        await navigator.clipboard.writeText(url);
        console.log('✅ Link copied to clipboard:', url);
        // You could add a toast notification here
      } catch (err) {
        console.error('❌ Failed to copy link:', err);
      }
    }
  },

  computed: {
    /**
     * Filtered and sorted datasets
     */
    filteredDatasets() {
      let datasets = this.datasetCards;

      // Apply category filter
      if (this.filterCategory !== 'all') {
        datasets = datasets.filter(d => d.category === this.filterCategory);
      }

      // Apply search filter
      if (this.searchQuery.trim()) {
        const query = this.searchQuery.toLowerCase();
        datasets = datasets.filter(d => {
          return (
            d.title.toLowerCase().includes(query) ||
            d.subtitle.toLowerCase().includes(query) ||
            d.card.description.toLowerCase().includes(query) ||
            d.card.tags.some(tag => tag.toLowerCase().includes(query))
          );
        });
      }

      // Apply sorting
      if (this.sortBy === 'title') {
        datasets = [...datasets].sort((a, b) => a.title.localeCompare(b.title));
      } else if (this.sortBy === 'category') {
        datasets = [...datasets].sort((a, b) => {
          if (a.category !== b.category) {
            return a.category.localeCompare(b.category);
          }
          return a.title.localeCompare(b.title);
        });
      }

      return datasets;
    },

    /**
     * Current dataset being viewed in detail
     */
    currentDataset() {
      return this.datasetCache[this.currentDatasetId] || null;
    },

    /**
     * Search results count
     */
    searchResultsCount() {
      if (!this.searchQuery.trim()) return null;
      return this.filteredDatasets.length;
    }
  }
});

// Mount the app
app.mount('#app');

// Expose app instance to window for debugging
window.app = app;

console.log('🚀 Thermal Dataset Discovery app initialized');
console.log('💡 Debug commands:');
console.log('   app.datasetCards.length           // Number of cards loaded');
console.log('   app.datasetCache                  // Cached full datasets');
console.log('   app.showDetail("dmrir")           // Load a dataset');
console.log('   app.filterCategory = "research"   // Change filter');
console.log('   app.sortBy = "title"              // Change sort');
console.log('   app.searchQuery = "pose"          // Search datasets');
console.log('   app.toggleTheme()                 // Toggle theme');
console.log('');
console.log('⌨️  Keyboard shortcuts:');
console.log('   ESC               // Back to dashboard');
console.log('   Ctrl/Cmd + K      // Focus search');
console.log('   Ctrl/Cmd + /      // Toggle filters');
