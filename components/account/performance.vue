<template>
  <div class="dashboard space-y-10 p-4 sm:p-8">
    <!-- ===== Header Section ===== -->
    <div class="text-center mb-6">
      <h1 class="text-3xl font-bold text-white">Welcome Back, Investor 👋</h1>
      <p class="text-gray-300 mt-2">
        Track your financial growth, portfolio, and VX rewards — all in one
        place.
      </p>
    </div>
    <!-- ===== Stats Overview (Modern Dark) ===== -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Main Balance -->
      <div class="card-box gradient-blue flex items-center gap-4">
        <div class="icon-box bg-blue-600 text-white">
          <i class="mdi mdi-cash-multiple text-3xl"></i>
        </div>
        <div>
          <p class="text-gray-200 text-sm">Main Balance</p>
          <h3 class="text-2xl font-bold text-white">
            ${{ balances.mainBalance }}
          </h3>
        </div>
      </div>

      <!-- Profits Wallet -->
      <div class="card-box gradient-teal flex flex-col justify-between p-4">
        <div class="flex items-center gap-4 mb-3">
          <div class="icon-box bg-teal-600 text-white">
            <i class="mdi mdi-chart-line text-3xl"></i>
          </div>
          <div>
            <p class="text-gray-200 text-sm">Profits Balances</p>
            <h3 class="text-2xl font-bold text-white">
              ${{ balances.profitBalance }}
            </h3>
          </div>
        </div>
        <Button
          label="Transfer to Main Balance"
          icon="mdi mdi-arrow-right-bold"
          class="p-button-sm p-button-outlined border-white text-white w-full"
          @click="transferToMain('profit')"
          :loading="loadingTransfer === 'profit'"
        />
      </div>

      <!-- VX Balances -->
      <div class="card-box gradient-yellow flex flex-col justify-between p-4">
        <div class="flex items-center gap-4 mb-3">
          <div class="icon-box bg-yellow-600 text-white">
            <i class="mdi mdi-account-group text-3xl"></i>
          </div>
          <div>
            <p class="text-gray-200 text-sm">VX Balances</p>
            <h3 class="text-2xl font-bold text-white">
              ${{ balances.referralBalance }}
            </h3>
          </div>
        </div>
        <Button
          label="Transfer to Main Balance"
          icon="mdi mdi-arrow-right-bold"
          class="p-button-sm p-button-outlined border-white text-white w-full"
          @click="transferToMain('referral')"
          :loading="loadingTransfer === 'referral'"
        />
      </div>

      <!-- VX Wallet -->
      <div class="card-box gradient-purple flex items-center gap-4">
        <div class="icon-box bg-purple-600 text-white">
          <i class="mdi mdi-wallet-outline text-3xl"></i>
        </div>
        <div>
          <p class="text-gray-200 text-sm">Withdrawal Total</p>
          <h3 class="text-2xl font-bold text-white">
            ${{ balances.withdrawalTotalBalance }}
          </h3>
        </div>
      </div>
    </div>



    <!-- ===== Charts Section ===== -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Profits Chart -->
      <Card class="shadow-md gradient-card">
        <template #title class="text-white font-semibold">
          Profits Balances</template
        >
        <template #content>
          <Chart type="line" :data="profitChart" :options="lineOptions" />
        </template>
      </Card>

      <!-- VX Chart -->
      <Card class="shadow-md gradient-card">
        <template #title class="text-white font-semibold">
          VX Balances</template
        >
        <template #content>
          <Chart type="line" :data="vxChart" :options="lineOptions" />
        </template>
      </Card>
    </div>

    <!-- ===== Referral & Activity Section ===== -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Referral Overview -->
      <Card class="shadow-md gradient-card">
        <template #title class="text-white font-semibold"
          >Referral Overview</template
        >
        <template #content>
          <div class="flex flex-col gap-4">
            <div class="flex justify-between items-center">
              <span class="text-gray-200">Total Referrals</span>
              <span class="font-semibold text-white">{{
                referral?.counts?.totalCount
              }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-200">Total Investment</span>
              <span class="font-semibold text-white"
                >${{ referral?.volumes?.leftVolume }}</span
              >
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-200">Left Volume</span>
              <span class="font-semibold text-white"
                >${{ referral?.volumes?.rightVolume }}</span
              >
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-200">Right Volume</span>
              <span class="font-semibold text-white">$560</span>
            </div>

            <Button
              label="Invite More"
              icon="mdi mdi-account-plus-outline"
              class="p-button-success mt-2"
              :loading="inviteLoading"
              @click="handleInvite"
            />
          </div>
        </template>
      </Card>

      <!-- Recent Activity -->
      <Card class="shadow-md gradient-card">
        <template #title class="text-white font-semibold"
          >Recent Activity</template
        >
        <template #content>
          <ul v-if="activities.length" class="divide-y divide-gray-700 text-sm">
            <li
              v-for="(item, index) in activities"
              :key="index"
              class="py-3 flex justify-between items-center hover:bg-gray-800/30 px-2 rounded transition"
            >
              <div class="flex items-center gap-3">
                <i :class="`${item.icon} ${item.color} text-xl`"></i>
                <span class="font-medium text-white">{{ item.action }}</span>
              </div>
              <span class="text-gray-400 text-xs whitespace-nowrap">{{
                item.date
              }}</span>
            </li>
          </ul>

          <div v-else class="text-center text-gray-400 py-6">
            No recent activity
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed, watch } from "vue";
import Card from "primevue/card";
import Chart from "primevue/chart";
import Button from "primevue/button";
import { useToast } from "primevue/usetoast";
const { authUser } = useAuth();
const inviteLoading = ref(false);

// ✅ Reactive states
const balances = ref({
  mainBalance: 0,
  maxCapBalance: 0,
  withdrawalTotalBalance: 0,
  profitBalance: 0,
  referralBalance: 0,
  bonusBalance: 0,
});
const profitChart = ref({
  labels: null,
  datasets: [],
});
const vxChart = ref({
  labels: null,
  datasets: [],
});
const referral = ref();
const vxCode = ref();

const toast = useToast();
const activities = ref([]);

/* ======================
   ✅ API Calls (Backend)
   ====================== */

async function handleInvite() {
  // ⛔ اکانت فعال نیست
  if (!vxCode.value) {
    toast.add({
      severity: "warn",
      summary: "Account Not Active",
      detail: "Please activate your account to get your referral link.",
      life: 4000,
    });
    return;
  }

  // ✅ کپی به کلیپ‌بورد
  await navigator.clipboard.writeText(vxCode);

  toast.add({
    severity: "success",
    summary: "Copied!",
    detail: "Your referral code has been copied to clipboard.",
    life: 3000,
  });
}

async function fetchRecentActivities() {
  if (!authUser.value?.user?.id) return;

  const res = await $fetch("/api/transactions/my", {
    method: "POST",
    body: {
      userId: authUser.value.user.id,
    },
  });

  // فقط ۴ تای آخر (جدیدترین)
  activities.value = res.slice(0, 4).map(mapTransactionToActivity);
}

function mapTransactionToActivity(tx) {
  const typeMap = {
    deposit: {
      icon: "mdi mdi-cash-plus",
      label: "Deposit Added",
      color: "text-green-600",
    },
    investment: {
      icon: "mdi mdi-chart-line",
      label: "Investment Started",
      color: "text-blue-600",
    },
    "investment-upgrade": {
      icon: "mdi mdi-arrow-up-bold",
      label: "Investment Upgraded",
      color: "text-indigo-600",
    },
    profit: {
      icon: "mdi mdi-cash-multiple",
      label: "Profit Earned",
      color: "text-emerald-600",
    },
    "binary-profit": {
      icon: "mdi mdi-account-group",
      label: "Binary Bonus",
      color: "text-purple-600",
    },
    withdraw: {
      icon: "mdi mdi-cash-minus",
      label: "Withdrawal",
      color: "text-red-500",
    },
  };

  const meta = typeMap[tx.type] || {
    icon: "mdi mdi-swap-horizontal",
    label: tx.type,
    color: "text-gray-500",
  };

  return {
    icon: meta.icon,
    color: meta.color,
    action: `${meta.label} • $${tx.amount}`,
    date: timeAgo(tx.createdAt),
  };
}

function timeAgo(date) {
  const seconds = Math.floor((Date.now() - new Date(date)) / 1000);

  if (seconds < 60) return `${seconds} seconds ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  return `${Math.floor(seconds / 86400)} days ago`;
}

async function fetchBalances() {
  try {
    const userId = authUser.value?.user?.id;
    if (!userId) return;
    const res = await $fetch("/api/balances", {
      method: "POST",
      body: { userId },
    });
    balances.value = res;
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error loading balances",
      detail: error?.data?.message || "Failed to fetch balances",
      life: 4000,
    });
  }
}

async function fetchProfitChart() {
  const userId = authUser.value?.user?.id;
  if (!userId) return;

  const res = await $fetch("/api/transactions/profit", {
    method: "POST",
    body: { userId },
  });

  profitChart.value = {
    labels: res.labels,
    datasets: [
      {
        label: "Profit ($)",
        data: res.data,
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59,130,246,0.15)",
        tension: 0.4,
        fill: true,
      },
    ],
  };
}

async function fetchVXChart() {
  const userId = authUser.value?.user?.id;
  if (!userId) return;

  const res = await $fetch("/api/transactions/vxchart", {
    method: "POST",
    body: { userId },
  });

  vxChart.value = {
    labels: res.labels,
    datasets: [
      {
        label: "VX Earnings",
        data: res.data,
        borderColor: "#8b5cf6",
        backgroundColor: "rgba(139,92,246,0.15)",
        tension: 0.4,
        fill: true,
      },
    ],
  };
}

async function loadReferralTree() {
  try {
    const userId = authUser.value?.user?.id;
    referral.value = await $fetch("/api/referrals/node", {
      method: "POST",
      body: {
        userId,
      },
    });
    vxCode.value = referral.value?.vxCode;
    console.log("node ", referral.value);

    // 🛡️ ایمن‌سازی
  } catch (e) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Failed to load referral tree",
      life: 3000,
    });
  }
}

const lineOptions = {
  plugins: {
    legend: { display: false },
  },
  scales: {
    y: { grid: { color: "#f3f4f6" } },
    x: { grid: { display: false } },
  },
};

/* ==========================
   ✅ Transfer to Main Logic
   ========================== */
const loadingTransfer = ref(null);
async function transferToMain(type) {
  try {
    loadingTransfer.value = type;
    const userId = authUser.value.user.id;

    let endpoint = "";
    if (type === "profit") endpoint = "/api/activity/transferprofit";
    else if (type === "referral") endpoint = "/api/activity/transferreferral";
    else if (type === "bonus") endpoint = "/api/activity/transferbonus";

    const res = await $fetch(endpoint, {
      method: "POST",
      body: { userId, amount: balances.value[`${type}Balance`] },
    });

    toast.add({
      severity: "success",
      summary: "Transfer Successful",
      detail: res.message || "Funds moved to Main Balance",
      life: 4000,
    });

    fetchBalances();
  } catch (err) {
    toast.add({
      severity: "error",
      summary: "Transfer Failed",
      detail: err?.data?.message || "Unable to transfer balance",
      life: 4000,
    });
  } finally {
    loadingTransfer.value = null;
  }
}

/* ======================
   ✅ Ensure balances are fetched
   - Try fetch on mount if authUser is ready
   - Watch authUser and fetch once user becomes available
   ====================== */
onMounted(() => {
  if (authUser?.value?.user?.id) {
    fetchBalances();
    fetchProfitChart();
    fetchVXChart();
    loadReferralTree();
    fetchRecentActivities(); // ✅
  }
});

watch(
  () => authUser.value,
  (newVal) => {
    if (newVal?.user?.id) fetchBalances();
  },
  (val) => {
    if (val?.user?.id) fetchRecentActivities();
  },
);
</script>

<style lang="scss" scoped>
.dashboard {
 
  .card-box {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    border-radius: 1rem;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.4);
    transition: all 0.3s ease;
  }
  .card-box:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.6);
  }
  .icon-box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    color: white;
  }

  /* Gradient Cards */
  .gradient-blue {
    background: linear-gradient(135deg, #3b82f6, #60a5fa);
  }
  .gradient-teal {
    background: linear-gradient(135deg, #14b8a6, #22d3ee);
  }
  .gradient-yellow {
    background: linear-gradient(135deg, #facc15, #fde68a);
  }
  .gradient-purple {
    background: linear-gradient(135deg, #8b5cf6, #c084fc);
  }

  .gradient-card {
    background: linear-gradient(135deg, #1f1f2f, #2b2b3c);
    border-radius: 1rem;
    color: white;
  }
}

/* Chart global overrides for white lines/text on dark background */
canvas {
  color: white !important;
}
</style>
