<template>
  <div class="">
    <!-- Header / Actions -->
    <div
      class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6"
    >
      <div>
        <h1 class="text-2xl font-bold">VX Plan — Team & Binary Overview</h1>
        <p class="text-sm text-gray-500">
          Manage your VX team structure, earnings, and capacity (10x rule)
        </p>
      </div>

      <div class="flex items-center gap-3 flex-wrap">
        <Button
          icon="mdi mdi-magnify-minus"
          class="p-button-rounded"
          @click="zoomOut"
        />
        <Button
          icon="mdi mdi-magnify-plus"
          class="p-button-rounded"
          @click="zoomIn"
        />
        <Button
          icon="mdi mdi-restore"
          class="p-button-rounded"
          @click="resetZoom"
        />
        <Button
          label="Top-Up"
          icon="mdi mdi-wallet"
          @click="showTopUp = true"
        />
        <Button
          label="Activate VX Code ($5)"
          icon="mdi mdi-key"
          class="p-button-warning"
          @click="onActivateClick"
        />
     
      </div>
    </div>

    <!-- Summary cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div class="bg-white shadow rounded p-4">
        <div class="text-xs uppercase text-gray-500">Account</div>
        <div class="text-xl font-semibold">
          {{ root.data.name }} ({{ root.key }})
        </div>
        <div class="text-sm text-gray-600">{{ root.data.title }}</div>
      </div>

      <div class="bg-white shadow rounded p-4">
        <div class="text-xs uppercase text-gray-500">Total Team Volume</div>
        <div class="text-xl font-semibold">
          ${{ totalTeamVolume.toLocaleString("en-US") }}
        </div>
        <div class="text-sm text-gray-600">
          {{ totalTeamCount.toLocaleString("en-US") }} members
        </div>
      </div>

      <div class="bg-white shadow rounded p-4">
        <div class="text-xs uppercase text-gray-500">
          Account Capacity (10x)
        </div>
        <div class="text-xl font-semibold">
          ${{ accountCapacity.toLocaleString("en-US") }}
        </div>
        <div class="text-sm text-gray-600">
          Used: ${{ usedCapacity.toLocaleString("en-US") }} / Remaining: ${{
            (accountCapacity - usedCapacity).toLocaleString("en-US")
          }}
        </div>
      </div>

      <div class="bg-white shadow rounded p-4">
        <div class="text-xs uppercase text-gray-500">Flush Out (Burned)</div>
        <div class="text-xl font-semibold text-red-500">
          ${{ flushOut.toLocaleString("en-US") }}
        </div>
        <div class="text-sm text-gray-600">
          Cycles: {{ vxcCount.toLocaleString("en-US") }}
        </div>
      </div>
    </div>

    <!-- Chart Container with Pan & Zoom -->
    <div
      ref="chartWrapper"
      class="relative overflow-auto bg-white shadow rounded p-4 touch-pan-y touch-pan-x"
      style="width: 100%; height: 80vh"
      @wheel.prevent="handleWheel"
      @mousedown="startPan"
      @mousemove="doPan"
      @mouseup="endPan"
      @mouseleave="endPan"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    >
      <div
        ref="chartContainer"
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
                  @click="copyCode(slotProps.node.data.vxCode)"
                />
                <Button
                  icon="mdi mdi-information-outline"
                  class="p-button-sm"
                  @click="openNodeDetails(slotProps.node)"
                />
              </div>
            </div>
          </template>
          <template #default="slotProps">
            <div class="p-2 font-medium">{{ slotProps.node.label }}</div>
          </template>
        </OrganizationChart>
      </div>
    </div>

    <Dialog
      header="Node Details"
      v-model:visible="showNodeDetails"
      :modal="true"
      :closable="true"
      class="max-w-2xl w-full"
    >
      <div v-if="selectedNode">
        <!-- Header Info -->
        <div class="flex flex-col md:flex-row gap-4 mb-6 items-center">
          <img
            :src="selectedNode.data?.image"
            class="w-24 h-24 rounded-full shadow-md border border-gray-200"
            :alt="selectedNode.data?.name"
          />
          <div class="flex flex-col text-center md:text-left">
            <div class="font-bold text-xl">{{ selectedNode.data?.name }}</div>
            <div class="text-gray-600 text-sm">
              {{ selectedNode.data?.title }}
            </div>
            <div class="text-sm mt-1">
              VX Code:
              <span class="font-semibold">{{ selectedNode.data?.vxCode }}</span>
            </div>
          </div>
        </div>

        <!-- Node Stats Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div class="bg-slate-50 rounded-lg p-4 shadow-sm">
            <div class="text-xs uppercase text-gray-500 mb-1">Left Volume</div>
            <div class="text-lg font-semibold">
              ${{ selectedNode.left?.toLocaleString("en-US") || "0" }}
            </div>
            <div class="text-xs text-gray-500">
              Members:
              {{ selectedNode.leftCount?.toLocaleString("en-US") || "0" }}
            </div>
          </div>

          <div class="bg-slate-50 rounded-lg p-4 shadow-sm">
            <div class="text-xs uppercase text-gray-500 mb-1">Right Volume</div>
            <div class="text-lg font-semibold">
              ${{ selectedNode.right?.toLocaleString("en-US") || "0" }}
            </div>
            <div class="text-xs text-gray-500">
              Members:
              {{ selectedNode.rightCount?.toLocaleString("en-US") || "0" }}
            </div>
          </div>

          <div class="bg-slate-50 rounded-lg p-4 shadow-sm">
            <div class="text-xs uppercase text-gray-500 mb-1">
              Active Cycles (VXC)
            </div>
            <div class="text-lg font-semibold">
              {{ selectedNode.vxc?.toLocaleString("en-US") || "0" }}
            </div>
          </div>

          <div class="bg-slate-50 rounded-lg p-4 shadow-sm">
            <div class="text-xs uppercase text-gray-500 mb-1">
              Account Capacity (10x)
            </div>
            <div class="text-lg font-semibold">
              ${{ getNodeCapacity(selectedNode).toLocaleString("en-US") }}
            </div>
            <div class="text-xs text-gray-500">
              Used: ${{ selectedNode.used?.toLocaleString("en-US") || "0" }} /
              Remaining: ${{
                (
                  getNodeCapacity(selectedNode) - (selectedNode.used || 0)
                ).toLocaleString("en-US")
              }}
            </div>
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="flex flex-wrap gap-2 justify-end">
          <Button
            label="Top-Up"
            icon="mdi mdi-plus"
            class="p-button-sm"
            @click="handleTopUp"
          />
          <Button
            label="Copy VX Code"
            icon="mdi mdi-content-copy"
            class="p-button-sm p-button-outlined"
            @click="copyCode(selectedNode.data?.vxCode)"
          />
          <Button
            label="Close"
            icon="mdi mdi-close"
            class="p-button-secondary p-button-sm"
            @click="showNodeDetails = false"
          />
        </div>
      </div>
    </Dialog>

    <!-- TopUp Dialog -->
    <Dialog header="Top Up" v-model:visible="showTopUp" :modal="true">
      <div class="space-y-3">
        <div class="text-sm">Minimum deposit: $50</div>
        <InputNumber
          v-model="topUpAmount"
          :min="50"
          :showButtons="true"
          mode="currency"
          currency="USD"
          locale="en-US"
        />
        <div class="flex gap-2">
          <Button label="Confirm" icon="mdi mdi-check" @click="confirmTopUp" />
          <Button
            label="Cancel"
            class="p-button-secondary"
            @click="() => (showTopUp = false)"
          />
        </div>
      </div>
    </Dialog>

    <Toast />
  </div>
</template>



<script setup>
import { ref, computed, onMounted } from "vue";
import { useToast } from "primevue/usetoast";

const toast = useToast();

/* =========================
   SAFE DEFAULT TREE
========================= */
const emptyTree = {
  key: "root",
  type: "person",
  data: {
    name: "Loading...",
    title: "",
    vxCode: "",
    image: "https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png",
  },
  children: [],
};

/* =========================
   STATE
========================= */
const data = ref({ ...emptyTree });
const root = ref({ ...emptyTree });
const selection = ref({});

const showNodeDetails = ref(false);
const selectedNode = ref(null);

const totalTeamVolume = ref(0);
const totalTeamCount = ref(0);
const accountBalance = ref(0);
const usedCapacity = ref(0);
const flushOut = ref(0);
const vxcCount = ref(0);

const showTopUp = ref(false);
const topUpAmount = ref(50);

/* =========================
   COMPUTED
========================= */
const accountCapacity = computed(() => accountBalance.value * 10);

/* =========================
   API CALLS
========================= */
async function loadReferralTree() {
  try {
    const res = await $fetch("/api/referrals/node", {
      method: "POST",
      body: {},
    });

    // 🛡️ ایمن‌سازی
    if (!res || !res.data) {
      data.value = { ...emptyTree };
      root.value = { ...emptyTree };
      return;
    }

    data.value = res;
    root.value = res;
  } catch (e) {
    console.error(e);
    data.value = { ...emptyTree };
    root.value = { ...emptyTree };

    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Failed to load referral tree",
      life: 3000,
    });
  }
}

async function loadStats() {
  try {
    const res = await $fetch("/api/referrals/stats", {
      method: "POST",
      body: {
        investmentAmount: 0,
      },
    });

    totalTeamVolume.value = res?.totalTeamVolume || 0;
    totalTeamCount.value = res?.totalMembers || 0;
    usedCapacity.value = res?.usedCapacity || 0;
    flushOut.value = res?.flushOut || 0;
    vxcCount.value = res?.vxc || 0;
    accountBalance.value = res?.baseInvestment || 0;
  } catch (e) {
    console.error(e);
  }
}

async function loadEarnings() {
  try {
    const res = await $fetch("/api/referrals/earnings", {
      method: "POST",
      body: {},
    });
    console.log("Earnings:", res);
  } catch (e) {
    console.error(e);
  }
}

/* =========================
   NODE DETAILS
========================= */
function openNodeDetails(node) {
  if (!node) return;

  selectedNode.value = {
    ...node,
    left: node.leftVolume || 0,
    right: node.rightVolume || 0,
    leftCount: node.leftCount || 0,
    rightCount: node.rightCount || 0,
    vxc: node.vxc || 0,
    used: node.usedCapacity || 0,
  };

  showNodeDetails.value = true;
}

/* =========================
   HELPERS
========================= */
function copyCode(code) {
  if (!code) return;

  navigator.clipboard.writeText(code);
  toast.add({
    severity: "success",
    summary: "Copied",
    detail: `VX Code ${code} copied`,
    life: 2000,
  });
}

function getNodeCapacity(node) {
  const base = node?.data?.baseInvestment || 0;
  return base * 10;
}

/* =========================
   ACTIONS
========================= */
function onActivateClick() {
  if (accountBalance.value < 5) {
    toast.add({
      severity: "warn",
      summary: "Insufficient Balance",
      detail: "Please top-up first",
      life: 3000,
    });
    return;
  }

  accountBalance.value -= 5;

  toast.add({
    severity: "success",
    summary: "Activated",
    detail: "VX Code activated successfully",
    life: 3000,
  });
}

function confirmTopUp() {
  if (topUpAmount.value < 50) {
    toast.add({
      severity: "warn",
      summary: "Invalid Amount",
      detail: "Minimum top-up is $50",
      life: 3000,
    });
    return;
  }

  accountBalance.value += topUpAmount.value;
  showTopUp.value = false;
}

/* =========================
   ZOOM & PAN
========================= */
const zoom = ref(1);
const translate = ref({ x: 0, y: 0 });
const isPanning = ref(false);
const panStart = ref({ x: 0, y: 0 });

const zoomIn = () => (zoom.value = Math.min(zoom.value + 0.1, 3));
const zoomOut = () => (zoom.value = Math.max(zoom.value - 0.1, 0.4));
const resetZoom = () => {
  zoom.value = 1;
  translate.value = { x: 0, y: 0 };
};

const startPan = (e) => {
  isPanning.value = true;
  panStart.value = {
    x: e.clientX - translate.value.x,
    y: e.clientY - translate.value.y,
  };
};

const doPan = (e) => {
  if (!isPanning.value) return;
  translate.value = {
    x: e.clientX - panStart.value.x,
    y: e.clientY - panStart.value.y,
  };
};

const endPan = () => (isPanning.value = false);

/* =========================
   INIT
========================= */
onMounted(async () => {
  await loadReferralTree();
  await loadStats();
  await loadEarnings();
});
</script>
<style scoped>
.p-organizationchart .p-organizationchart-node {
  border-radius: 8px;
  cursor: grab;
}
.p-organizationchart .p-organizationchart-node:active {
  cursor: grabbing;
}
</style>
