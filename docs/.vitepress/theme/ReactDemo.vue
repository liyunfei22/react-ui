<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import type { Root } from 'react-dom/client'
import type { ComponentType } from 'react'

const props = defineProps<{ demo: ComponentType }>()

const el = ref<HTMLDivElement>()
let root: Root | null = null

const render = () => {
  if (!el.value) return
  if (!root) root = createRoot(el.value)
  root.render(createElement(props.demo))
}

onMounted(render)
watch(() => props.demo, render)
onBeforeUnmount(() => root?.unmount())
</script>

<template>
  <div ref="el" class="react-demo" />
</template>