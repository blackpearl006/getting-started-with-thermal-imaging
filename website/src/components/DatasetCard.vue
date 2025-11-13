<template>
  <div class="dataset-card">
    <h3>{{ dataset.name }}</h3>
    <p class="description">{{ dataset.description }}</p>
    <div class="metadata">
      <span class="tag">{{ dataset.category }}</span>
      <span class="samples">{{ dataset.samples }} samples</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DatasetCard',
  props: {
    dataset: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.dataset-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1rem 0;
  transition: box-shadow 0.3s ease;
}

.dataset-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.dataset-card h3 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.description {
  color: #555;
  margin-bottom: 1rem;
}

.metadata {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.tag {
  background-color: #3498db;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.9rem;
}

.samples {
  color: #666;
  font-size: 0.9rem;
}
</style>
