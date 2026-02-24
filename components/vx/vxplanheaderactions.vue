<template>
  <div
    class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 vx-header"
  >
    <!-- Title -->
    <div>
      <h1 class="text-2xl font-bold title-text">
        VX Plan — Team & Binary Overview
      </h1>
      <p class="text-sm subtitle-text">
        Manage your VX team structure, earnings, and capacity (3x rule)
      </p>
    </div>

    <!-- Actions -->
    <div class="flex items-center gap-3 flex-wrap">
      <!-- اگر فعال نیست -->
      <Button
        v-if="!isVxActive"
        label="Activate VX Code ($5)"
        icon="mdi mdi-key"
        class="p-button-warning vx-btn-activate"
        @click="$emit('activate')"
      />

      <!-- اگر فعال شده -->
      <Button
        v-else
        label="Copy VX Code"
        icon="mdi mdi-content-copy"
        class="vx-btn-copy"
        @click="copyCode"
      />
    </div>
  </div>
</template>

<script setup>
import { useToast } from "primevue/usetoast";
const toast = useToast();

const props = defineProps({
  isVxActive: Boolean,
  vxCode: String,
});

defineEmits(["zoom-in", "zoom-out", "reset-zoom", "topup", "activate"]);

function copyCode() {
  if (!props.vxCode) return;

  navigator.clipboard.writeText(props.vxCode);

  toast.add({
    severity: "success",
    summary: "Copied",
    detail: "VX Code copied successfully",
    life: 2500,
  });
}
</script>

<style scoped>
.vx-header {
  background: linear-gradient(135deg, #020617, #0f172a);
  border: 1px solid #4f46e5;
  border-radius: 16px;
  padding: 18px 20px;
  box-shadow: 0 15px 40px rgba(79, 70, 229, 0.15);
}

.title-text {
  color: #c7d2fe;
}

.subtitle-text {
  color: #94a3b8;
}

/* ===== Circle Icon Buttons ===== */
.vx-btn-circle {
  background: #020617 !important;
  border: 1px solid #4f46e5 !important;
  color: #c7d2fe !important;
}

.vx-btn-circle:hover {
  background: #4f46e5 !important;
  color: #ffffff !important;
  box-shadow: 0 0 12px rgba(79, 70, 229, 0.4);
}

/* ===== Activate Button ===== */
.vx-btn-activate {
  background: linear-gradient(90deg, #2563eb, #4f46e5) !important;
  border: none !important;
  color: #ffffff !important;
  font-weight: 600;
}

.vx-btn-activate:hover {
  background: linear-gradient(90deg, #4f46e5, #7c3aed) !important;
  box-shadow: 0 0 16px rgba(124, 58, 237, 0.45);
}

.vx-btn-copy {
  background: linear-gradient(90deg, #2563eb, #4f46e5) !important;
  border: none !important;
  color: white !important;
  font-weight: 600;
}

.vx-btn-copy:hover {
  background: linear-gradient(90deg, #4f46e5, #7c3aed) !important;
  box-shadow: 0 0 16px rgba(16, 185, 129, 0.4);
}
</style>
