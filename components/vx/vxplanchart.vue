<template>
  <div
    class="relative overflow-auto bg-white shadow rounded p-4"
    style="height: 80vh"
    @mousedown="startPan"
    @mousemove="doPan"
    @mouseup="endPan"
    @mouseleave="endPan"
  >
    <div
      class="transform-origin-top-left"
      :style="{ transform: `translate(${translate.x}px, ${translate.y}px) scale(${zoom})` }"
    >
      <OrganizationChart
        :value="data"
        v-model:selectionKeys="selection"
        selectionMode="multiple"
        collapsible
      >
        <template #person="{ node }">
          <div class="p-2 text-center bg-slate-50 rounded shadow">
            <div class="font-semibold">{{ node.data.name }}</div>
            <div class="text-xs">{{ node.data.vxCode }}</div>
            <Button
              icon="mdi mdi-information-outline"
              class="p-button-sm mt-2"
              @click="$emit('node-click', node)"
            />
          </div>
        </template>
      </OrganizationChart>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  data: Object,
  zoom: Number,
  translate: Object
});

const selection = ref({});

const isPanning = ref(false);
const panStart = ref({ x: 0, y: 0 });

const startPan = (e) => {
  isPanning.value = true;
  panStart.value = { x: e.clientX, y: e.clientY };
};

const doPan = (e) => {
  if (!isPanning.value) return;
};

const endPan = () => (isPanning.value = false);
</script>
