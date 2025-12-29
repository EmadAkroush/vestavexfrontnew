<template>
  <!-- Chart Container with Pan & Zoom -->
  <div
    ref="chartWrapper"
    class="relative overflow-auto bg-white shadow rounded p-4 touch-pan-y touch-pan-x"
    style="width: 100%; height: 80vh"
    @wheel.prevent="emit('wheel', $event)"
    @mousedown="emit('mousedown', $event)"
    @mousemove="emit('mousemove', $event)"
    @mouseup="emit('mouseup')"
    @mouseleave="emit('mouseleave')"
    @touchstart="emit('touchstart', $event)"
    @touchmove="emit('touchmove', $event)"
    @touchend="emit('touchend')"
  >
    <div
      class="transform-origin-top-left transition-transform duration-75 ease-in-out"
      :style="{
        transform: `translate(${translate.x}px, ${translate.y}px) scale(${zoom})`,
      }"
    >
      <OrganizationChart
        v-model:selectionKeys="selection"
        :value="data"
        collapsible
        selectionMode="multiple"
      >
        <template #person="slotProps">
          <div
            class="flex flex-col items-center text-center p-2 border border-gray-200 rounded-lg bg-slate-50 shadow-sm hover:shadow-md"
          >
            <img
              :alt="slotProps.node.data.name"
              :src="slotProps.node.data.image"
              class="mb-2 w-14 h-14 rounded-full object-cover"
            />
            <div class="font-semibold">{{ slotProps.node.data.name }}</div>
            <div class="text-xs text-gray-500">
              {{ slotProps.node.data.title }}
            </div>
            <div class="mt-2 flex gap-1">
              <Button
                icon="mdi mdi-content-copy"
                class="p-button-sm"
                @click="emit('copy', slotProps.node.data.vxCode)"
              />
              <Button
                icon="mdi mdi-information-outline"
                class="p-button-sm"
                @click="emit('node-click', slotProps.node)"
              />
            </div>
          </div>
        </template>
      </OrganizationChart>
    </div>
  </div>
</template>

<script setup>
defineProps({
  data: Object,
  zoom: Number,
  translate: Object,
  selection: Object,
})

const emit = defineEmits([
  "wheel",
  "mousedown",
  "mousemove",
  "mouseup",
  "mouseleave",
  "touchstart",
  "touchmove",
  "touchend",
  "node-click",
  "copy",
])
</script>
