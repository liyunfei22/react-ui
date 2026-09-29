<script setup lang="ts">
defineProps<{
  title?: string
  desc?: string
}>()
</script>

<template>
  <div class="demo-block">
    <div class="demo-block__preview">
      <slot />
    </div>
    <div v-if="title || desc" class="demo-block__meta">
      <span v-if="title" class="demo-block__title">{{ title }}</span>
      <span v-if="desc" class="demo-block__desc">{{ desc }}</span>
    </div>
  </div>
</template>