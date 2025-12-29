<template>
  <div
    class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6"
  >
    <!-- Title -->
    <div>
      <h1 class="text-2xl font-bold">VX Plan — Team & Binary Overview</h1>
      <p class="text-sm text-gray-500">
        Manage your VX team structure, earnings, and capacity (3x rule)
      </p>
    </div>

    <!-- Actions -->
    <div class="flex items-center gap-3 flex-wrap">
      <Button
        icon="mdi mdi-magnify-minus"
        class="p-button-rounded"
        @click="$emit('zoom-out')"
      />
      <Button
        icon="mdi mdi-magnify-plus"
        class="p-button-rounded"
        @click="$emit('zoom-in')"
      />
      <Button
        icon="mdi mdi-restore"
        class="p-button-rounded"
        @click="$emit('reset-zoom')"
      />



      <Button
        label="Activate VX Code ($5)"
        icon="mdi mdi-key"
        class="p-button-warning"
        @click="$emit('activate')"
      />
    </div>
  </div>
</template>

<script setup>
defineEmits(["zoom-in", "zoom-out", "reset-zoom", "topup", "activate"]);
</script>
