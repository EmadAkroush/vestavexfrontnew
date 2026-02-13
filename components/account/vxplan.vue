<template>
  <div class="vx-plan-page">
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

    <!-- Zoom Buttons -->
    <div class="my-2 flex gap-2">
      <Button
        icon="mdi mdi-magnify-minus"
        class="zoom-btn"
        @click="zoomOut"
      />
      <Button
        icon="mdi mdi-magnify-plus"
        class="zoom-btn"
        @click="zoomIn"
      />
    </div>

    <!-- Chart Container -->
    <div
      ref="chartWrapper"
      class="chart-wrapper"
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
          <!-- Person Node -->
          <template #person="slotProps">
            <div class="node-card">
              <img
                :alt="slotProps.node.data.name"
                :src="slotProps.node.data.image"
                class="node-avatar"
              />

              <div class="node-name">
                {{ slotProps.node.data.name }}
              </div>

              <div class="node-email">
                {{ slotProps.node.data.title }}
              </div>

              <div class="node-actions">
                <Button
                  icon="mdi mdi-content-copy"
                  class="node-btn"
                  @click="copyCode(slotProps.node.data.vxCode)"
                />
                <Button
                  icon="mdi mdi-information-outline"
                  class="node-btn"
                  @click="openNodeDetails(slotProps.node)"
                />
              </div>
            </div>
          </template>

          <template #default="slotProps">
            <div class="default-node">
              {{ slotProps.node.label }}
            </div>
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
      // 👤 User Info
      name: node.name,
      title: node.email,
      vxCode: node.vxCode,

      // 💰 Balances (اگر خواستی بعداً استفاده کنی)
      mainBalance: node.balances?.main ?? 0,
      profitBalance: node.balances?.profit ?? 0,
      referralBalance: node.balances?.referral ?? 0,

      // 🧮 Binary Volumes
      leftVolume: node.volumes?.leftVolume ?? 0,
      rightVolume: node.volumes?.rightVolume ?? 0,
      totalTeamVolume: node.volumes?.totalTeamVolume ?? 0,

      // 👥 Binary Counts ✅
      leftCount: node.counts?.leftCount ?? 0,
      rightCount: node.counts?.rightCount ?? 0,
      totalCount: node.counts?.totalCount ?? 0,

      // 🖼 Avatar
      image: "https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png",
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
    console.log("node ", res);

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
.vx-plan-page {

  min-height: 100vh;
  padding: 20px;
}

/* Chart Wrapper */
.chart-wrapper {
  width: 100%;
  height: 80vh;
  overflow: auto;
  background: linear-gradient(135deg, #0F172A, #020617);
  border: 1px solid #4F46E5;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 20px 60px rgba(79, 70, 229, 0.15);
}

/* Node Card */
.node-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: #020617;
  border: 1px solid #4F46E5;
  border-radius: 14px;
  padding: 12px;
  transition: all 0.2s ease;
  color: #C7D2FE;
}

.node-card:hover {
  background: #4F46E5;
  transform: translateY(-2px);
}

/* Avatar */
.node-avatar {
  width: 56px;
  height: 56px;
  border-radius: 999px;
  object-fit: cover;
  margin-bottom: 6px;
  border: 2px solid #4F46E5;
}

/* Texts */
.node-name {
  font-weight: 600;
  color: #C7D2FE;
}

.node-email {
  font-size: 12px;
  color: #94A3B8;
}

/* Actions */
.node-actions {
  display: flex;
  gap: 6px;
  margin-top: 8px;
}

.node-btn {
  background: rgba(79, 70, 229, 0.15) !important;
  border: none !important;
  color: #C7D2FE !important;
  border-radius: 10px !important;
}

.node-btn:hover {
  background: #4F46E5 !important;
  color: white !important;
}

/* Zoom Buttons */
.zoom-btn {
  background: #4F46E5 !important;
  border: none !important;
  color: white !important;
}

.zoom-btn:hover {
  background: #7C3AED !important;
}

/* Default Node */
.default-node {
  padding: 6px;
  font-weight: 500;
  color: #C7D2FE;
}

/* Organization Chart Lines */
::v-deep(.p-organizationchart-line-down),
::v-deep(.p-organizationchart-line-left),
::v-deep(.p-organizationchart-line-right) {
  border-color: #4F46E5 !important;
}
</style>