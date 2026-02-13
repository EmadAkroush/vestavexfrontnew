<template>
  <div
    class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 vx-header"
  >
    <!-- Title -->
    <div>
      <h1 class="text-2xl font-bold title-text">VX Plan — Team & Binary Overview</h1>
      <p class="text-sm subtitle-text">
        Manage your VX team structure, earnings, and capacity (3x rule)
      </p>
    </div>

    <!-- Actions -->
    <div class="flex items-center gap-3 flex-wrap">
      <Button
        icon="mdi mdi-magnify-minus"
        class="p-button-rounded vx-btn-circle"
        @click="$emit('zoom-out')"
      />
      <Button
        icon="mdi mdi-magnify-plus"
        class="p-button-rounded vx-btn-circle"
        @click="$emit('zoom-in')"
      />
      <Button
        icon="mdi mdi-restore"
        class="p-button-rounded vx-btn-circle"
        @click="$emit('reset-zoom')"
      />

      <Button
        label="Activate VX Code ($5)"
        icon="mdi mdi-key"
        class="p-button-warning vx-btn-activate"
        @click="$emit('activate')"
      />
    </div>
  </div>
</template>

<script setup>
defineEmits(["zoom-in", "zoom-out", "reset-zoom", "topup", "activate"]);
</script>

<style scoped>
.vx-header {
  background: linear-gradient(135deg, #020617, #0F172A);
  border: 1px solid #4F46E5;
  border-radius: 16px;
  padding: 18px 20px;
  box-shadow: 0 15px 40px rgba(79, 70, 229, 0.15);
}

.title-text {
  color: #C7D2FE;
}

.subtitle-text {
  color: #94A3B8;
}

/* ===== Circle Icon Buttons ===== */
.vx-btn-circle {
  background: #020617 !important;
  border: 1px solid #4F46E5 !important;
  color: #C7D2FE !important;
}

.vx-btn-circle:hover {
  background: #4F46E5 !important;
  color: #ffffff !important;
  box-shadow: 0 0 12px rgba(79, 70, 229, 0.4);
}

/* ===== Activate Button ===== */
.vx-btn-activate {
  background: linear-gradient(90deg, #2563EB, #4F46E5) !important;
  border: none !important;
  color: #ffffff !important;
  font-weight: 600;
}

.vx-btn-activate:hover {
  background: linear-gradient(90deg, #4F46E5, #7C3AED) !important;
  box-shadow: 0 0 16px rgba(124, 58, 237, 0.45);
}
</style>
