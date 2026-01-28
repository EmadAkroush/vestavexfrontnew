<template>
  <Dialog
    header="Node Details"
    v-model:visible="localVisible"
    :modal="true"
    :closable="true"
    class="max-w-2xl w-full"
  >

    <div v-if="node">
      <!-- ================= HEADER ================= -->
      <div class="flex flex-col md:flex-row gap-4 mb-6 items-center">
        <img
          :src="node.data?.image"
          class="w-24 h-24 rounded-full shadow-md border border-gray-200"
          :alt="node.data?.name"
        />

        <div class="flex flex-col text-center md:text-left">
          <div class="font-bold text-xl">
            {{ node.data?.name || "—" }}
          </div>
   
          <div class="text-sm mt-1">
            VX Code:
            <span class="font-semibold">
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
          class="p-button-sm p-button-outlined"
          @click="emit('copy', node.data?.vxCode)"
        />

        <Button
          label="Close"
          icon="mdi mdi-close"
          class="p-button-secondary p-button-sm"
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
      h("div", { class: "bg-slate-50 rounded-lg p-4 shadow-sm" }, [
        h(
          "div",
          { class: "text-xs uppercase text-gray-500 mb-1" },
          props.title
        ),
        h(
          "div",
          { class: "text-lg font-semibold" },
          `$${(props.value || 0).toLocaleString("en-US")}`
        ),
        h(
          "div",
          { class: "text-xs text-gray-500" },
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
      h("div", { class: "bg-slate-50 rounded-lg p-4 shadow-sm" }, [
        h(
          "div",
          { class: "text-xs uppercase text-gray-500 mb-1" },
          props.title
        ),
        h(
          "div",
          { class: "text-lg font-semibold" },
          `$${(props.value || 0).toLocaleString("en-US")}`
        ),
      ]);
  },
});


</script>
