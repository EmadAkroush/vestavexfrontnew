<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    <Card
      v-for="item in items"
      :key="item.title"
      :item="item"
      @details="$emit('details', item)"
      @invest="$emit('invest', item)"
    />
  </div>
</template>

<script setup>
defineProps({
  items: Array,
});
</script>
