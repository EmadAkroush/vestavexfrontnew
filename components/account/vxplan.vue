<template>
  <div class="">
    <!-- Header / Actions -->

    <VxPlanHeaderActions
      @zoom-in="zoomIn"
      @zoom-out="zoomOut"
      @reset-zoom="resetZoom"
      @activate="onActivateClick"
    />

    <!-- Summary cards -->
    <VXPlanSummary
      :root="root"
      :totalTeamVolume="totalTeamVolume"
      :totalTeamCount="totalTeamCount"
      :accountCapacity="accountCapacity"
      :usedCapacity="usedCapacity"
      :flushOut="flushOut"
      :vxcCount="vxcCount"
    />

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

    <VXNodeDetailsDialog
      v-model:visible="showNodeDetails"
      :node="selectedNode"
      @copy="copyCode"
    />

    <Toast />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useToast } from "primevue/usetoast";
const { authUser } = useAuth();
const toast = useToast();
const userId = authUser.value?.user?.id;
import VxPlanHeaderActions from "@/components/vx/vxplanheaderactions.vue";
import VXPlanSummary from "@/components/vx/vxplansummary.vue";
import VXNodeDetailsDialog from "@/components/vx/shownodedetails.vue";


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
const accountCapacity = ref(0);

/* =========================
   COMPUTED
========================= */


/* =========================
   API CALLS
========================= */

function mapNode(node) {
  if (!node) return null;

  return {
    key: node.id,
    type: "person",

    data: {
      name: node.name,
      title: node.email,
      vxCode: node.vxCode,

      // 🧮 Binary Volumes
      leftVolume: node.volumes?.leftVolume ?? 0,
      rightVolume: node.volumes?.rightVolume ?? 0,
      totalTeamVolume: node.volumes?.totalTeamVolume ?? 0,

      image:
        "https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png",
    },

    children: [
      node.left ? mapNode(node.left) : null,
      node.right ? mapNode(node.right) : null,
    ].filter(Boolean),
  };
}








async function loadReferralTree() {
  try {
    const res = await $fetch("/api/referrals/node", {
      method: "POST",
      body: {
        userId,
      },
    });
    console.log("node " , res);
    
    // 🛡️ ایمن‌سازی
    if (!res) {
      data.value = { ...emptyTree };
      root.value = { ...emptyTree };
      return;
    }
  const mapped = mapNode(res);

    root.value = mapped;
    data.value = mapped; // یا [mapped] اگر آرایه خواستی
  } catch (e) {

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
      body: { userId },
    });

    totalTeamVolume.value = res.totalTeamVolume;
    totalTeamCount.value = res.totalMembers;
    usedCapacity.value = res.usedCapacity;
    flushOut.value = res.flushOut;
    vxcCount.value = res.vxc;
    accountBalance.value = res.baseInvestment;
    accountCapacity.value = res.accountCapacity;


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
  return base * 3;
}

/* =========================
   ACTIONS
========================= */
async function onActivateClick() {
  try {
    const res = await $fetch("/api/referrals/activatevxcode", {
      method: "POST",
      body: { userId },
    });

    if (!res.success) {
      // 🔴 قبلاً خریداری شده
      if (res.code === "ALREADY_ACTIVE") {
        toast.add({
          severity: "info",
          summary: "Already Activated",
          detail: "Your VX Code has already been activated.",
          life: 3000,
        });
        return;
      }

      // 🟠 موجودی کم
      if (res.code === "INSUFFICIENT_BALANCE") {
        toast.add({
          severity: "warn",
          summary: "Insufficient Balance",
          detail: "Please top-up your account to activate VX Code.",
          life: 3000,
        });
        return;
      }

      // fallback
      toast.add({
        severity: "warn",
        summary: "Warning",
        detail: res.message || "Activation failed",
        life: 3000,
      });
      return;
    }



    // ✅ موفق
    accountBalance.value = res.balance;

    toast.add({
      severity: "success",
      summary: "Activated",
      detail: res.message,
      life: 3000,
    });

      // 🔁 خیلی مهم
    await loadReferralTree();
    await loadStats();
  } catch (e) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Activation failed. Please try again.",
      life: 3000,
    });
  }
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
