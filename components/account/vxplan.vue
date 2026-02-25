<template>
  <div class="vx-plan-page">
    <!-- Header / Actions -->

    <VxPlanHeaderActions
      @zoom-in="zoomIn"
      @zoom-out="zoomOut"
      @reset-zoom="resetZoom"
      :isVxActive="isVxActive"
      :vxCode="vxCode"
      @activate="onActivateClick"
    />

    <!-- Summary cards -->
    <VXPlanSummary
      :root="root"
      :userInfo="userinfo"
    />

    <!-- Zoom Buttons -->
    <div class="my-2 flex gap-2">
      <Button icon="mdi mdi-magnify-minus" class="zoom-btn" @click="zoomOut" />
      <Button icon="mdi mdi-magnify-plus" class="zoom-btn" @click="zoomIn" />

      <Button icon="mdi mdi-restore" class="zoom-btn" @click="resetZoom" />
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

const userinfo = ref();

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
const accountBalance = ref(0);


const isVxActive = ref(false);
const vxCode = ref("");

/* =========================
   COMPUTED
========================= */

/* =========================
   API CALLS
========================= */

// 🟢 Load current user data from backend
onMounted(async () => {
  try {
   

    const userId = authUser.value?.user?.id;
    if (!userId) {
      toast.add({
        severity: "warn",
        summary: "Not Logged In",
        detail: "Please log in to view your account.",
        life: 3000,
      });
      return;
    }

    const user = await $fetch("/api/account/find", {
      method: "POST",
      body: { id: userId },
    });

 

    console.log("user", user);
    if (user) {
      isVxActive.value = user.activeVxCode;
      vxCode.value = user.vxCode || "";
      userinfo.value = user
    }

  
  } catch (err) {
    console.error("Profile load error:", err);
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Failed to load user data.",
      life: 4000,
    });
  } finally {

  }
});



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
  padding: 0px;
}

/* Chart Wrapper */
.chart-wrapper {
  width: 100%;
  height: 80vh;
  overflow: auto;
  background: linear-gradient(135deg, #0f172a, #020617);
  border: 1px solid #4f46e5;
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
  border: 1px solid #4f46e5;
  border-radius: 14px;
  padding: 12px;
  transition: all 0.2s ease;
  color: #c7d2fe;
}

.node-card:hover {
  background: #4f46e5;
  transform: translateY(-2px);
}

/* Avatar */
.node-avatar {
  width: 56px;
  height: 56px;
  border-radius: 999px;
  object-fit: cover;
  margin-bottom: 6px;
  border: 2px solid #4f46e5;
}

/* Texts */
.node-name {
  font-weight: 600;
  color: #c7d2fe;
}

.node-email {
  font-size: 12px;
  color: #94a3b8;
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
  color: #c7d2fe !important;
  border-radius: 10px !important;
}

.node-btn:hover {
  background: #4f46e5 !important;
  color: white !important;
}

/* Zoom Buttons */
.zoom-btn {
  background: #4f46e5 !important;
  border: none !important;
  color: white !important;
}

.zoom-btn:hover {
  background: #7c3aed !important;
}

/* Default Node */
.default-node {
  padding: 6px;
  font-weight: 500;
  color: #c7d2fe;
}

/* Organization Chart Lines */
::v-deep(.p-organizationchart-line-down),
::v-deep(.p-organizationchart-line-left),
::v-deep(.p-organizationchart-line-right) {
  border-color: #4f46e5 !important;
}
</style>
