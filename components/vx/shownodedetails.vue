<template>
  <Dialog
    header="Node Details"
    v-model:visible="localVisible"
    :modal="true"
    :closable="true"
    class="max-w-2xl w-full vx-dialog"
  >

    <div v-if="node">
      <!-- ================= HEADER ================= -->
      <div class="flex flex-col md:flex-row gap-4 mb-6 items-center">
        <img
          :src="node.data?.image"
          class="w-24 h-24 rounded-full shadow-md border border-indigo-500"
          :alt="node.data?.name"
        />

        <div class="flex flex-col text-center md:text-left">
          <div class="font-bold text-xl text-indigo-400">
            {{ node.data?.name || "—" }}
          </div>
   
          <div class="text-sm mt-1 text-indigo-500">
            VX Code:
            <span class="font-semibold text-indigo-300">
              {{ node.data?.vxCode || "—" }}
            </span>
          </div>
        </div>
      </div>

      <!-- ================= STATS GRID ================= -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <StatCard
          title="Left Volume"
          :value="node.data.leftVolume"
          :count="node.data.leftCount"
        />

        <StatCard
          title="Right Volume"
          :value="node.data.rightVolume"
          :count="node.data.rightCount"
        />

        <StatSimple
          title="totalTeamVolume (TTV)"
          :value="node.data.totalTeamVolume"
        />

        <StatSimple
          title="VX Balances (VX)"
          :value="node.data.referralBalance"
        />
      </div>

      <!-- ================= FOOTER ================= -->
      <div class="flex flex-wrap gap-2 justify-end">
        <Button
          label="Copy VX Code"
          icon="mdi mdi-content-copy"
          class="p-button-sm p-button-outlined vx-btn-outline"
          @click="emit('copy', node.data?.vxCode)"
        />

        <Button
          label="Close"
          icon="mdi mdi-close"
          class="p-button-secondary p-button-sm vx-btn-secondary"
          @click="localVisible = false"
        />
      </div>
    </div>
  </Dialog>
</template>

<script setup>
import { computed, defineComponent, h } from "vue";

/* ================= PROPS ================= */
const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  node: {
    type: Object,
    default: null,
  },
});

/* ================= EMITS ================= */
const emit = defineEmits(["update:visible", "copy"]);

/* ================= V-MODEL BRIDGE ================= */
const localVisible = computed({
  get: () => props.visible,
  set: (val) => emit("update:visible", val),
});

/* ================= SUB COMPONENTS ================= */

/* ---- StatCard ---- */
const StatCard = defineComponent({
  props: {
    title: String,
    value: Number,
    count: Number,
  },
  setup(props) {
    return () =>
      h("div", { class: "stat-card" }, [
        h(
          "div",
          { class: "stat-title" },
          props.title
        ),
        h(
          "div",
          { class: "stat-value" },
          `$${(props.value || 0).toLocaleString("en-US")}`
        ),
        h(
          "div",
          { class: "stat-count" },
          `Members: ${(props.count || 0).toLocaleString("en-US")}`
        ),
      ]);
  },
});

/* ---- StatSimple ---- */
const StatSimple = defineComponent({
  props: {
    title: String,
    value: Number,
  },
  setup(props) {
    return () =>
      h("div", { class: "stat-card" }, [
        h(
          "div",
          { class: "stat-title" },
          props.title
        ),
        h(
          "div",
          { class: "stat-value" },
          `$${(props.value || 0).toLocaleString("en-US")}`
        ),
      ]);
  },
});
</script>

<style scoped>
/* ===== Dialog Dark Theme ===== */
:deep(.vx-dialog .p-dialog) {
  background: #0F172A !important;
  border: 1px solid #4F46E5;
  border-radius: 18px;
}

:deep(.vx-dialog .p-dialog-header) {
  background: linear-gradient(90deg, #2563EB, #4F46E5);
  color: white !important;
  border-bottom: 1px solid #4F46E5;
}

:deep(.vx-dialog .p-dialog-content) {
  background: #020617 !important;
  color: #C7D2FE !important;
}

/* ===== Stat Cards ===== */
.stat-card {
  background: linear-gradient(135deg, #020617, #0F172A);
  border: 1px solid #4F46E5;
  border-radius: 14px;
  padding: 16px;
  box-shadow: 0 10px 30px rgba(79, 70, 229, 0.15);
}

.stat-title {
  font-size: 11px;
  text-transform: uppercase;
  color: #7C3AED;
  margin-bottom: 4px;
  letter-spacing: 0.5px;
}

.stat-value {
  font-size: 18px;
  font-weight: 700;
  color: #C7D2FE;
}

.stat-count {
  font-size: 12px;
  color: #94A3B8;
}

/* ===== Buttons ===== */
.vx-btn-outline {
  border-color: #4F46E5 !important;
  color: #C7D2FE !important;
}

.vx-btn-outline:hover {
  background: #4F46E5 !important;
  color: white !important;
}

.vx-btn-secondary {
  background: #1E1B4B !important;
  border: 1px solid #4F46E5 !important;
  color: #C7D2FE !important;
}

.vx-btn-secondary:hover {
  background: #4F46E5 !important;
  color: white !important;
}
</style>
