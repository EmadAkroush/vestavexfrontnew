<template>
  <div class="dashboard space-y-10 p-4 sm:p-8">
    <!-- ===== Header Section ===== -->
    <div class="text-center mb-6">
      <h1 class="text-3xl font-bold text-green-700">
        Welcome Back, Investor 👋
      </h1>
      <p class="text-gray-500 mt-2">
        Track your financial growth, portfolio, and VX rewards — all in one
        place.
      </p>
    </div>

    <!-- ===== Stats Overview ===== -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Total Balance -->
      <div class="card-box">
        <div class="icon-box bg-green-100 text-green-600">
          <i class="mdi mdi-cash-multiple text-3xl"></i>
        </div>
        <div>
          <p class="text-gray-500 text-sm">Main Balance</p>
          <h3 class="text-2xl font-bold text-green-700">
            ${{ balances.mainBalance }}
          </h3>
        </div>
      </div>

      <!-- Profits Wallet -->
      <div class="card-box">
        <div class="icon-box bg-blue-100 text-blue-600">
          <i class="mdi mdi-chart-line text-3xl"></i>
        </div>
        <div>
          <p class="text-gray-500 text-sm">Profits Balances</p>
          <h3 class="text-2xl font-bold text-blue-700">
            ${{ balances.profitBalance }}
          </h3>
        </div>
      </div>

      <!-- VX Wallet -->
      <div class="card-box">
        <div class="icon-box bg-purple-100 text-purple-600">
          <i class="mdi mdi-wallet-outline text-3xl"></i>
        </div>
        <div>
          <p class="text-gray-500 text-sm">VX Balances</p>
          <h3 class="text-2xl font-bold text-purple-700">
            ${{ balances.referralBalance }}
          </h3>
        </div>
      </div>

      <!-- Binary Bonus -->
      <div class="card-box">
        <div class="icon-box bg-yellow-100 text-yellow-600">
          <i class="mdi mdi-account-group text-3xl"></i>
        </div>
        <div>
          <p class="text-gray-500 text-sm">maxCap Balances</p>
          <h3 class="text-2xl font-bold text-yellow-700">
            ${{ balances.maxCapBalance }}
          </h3>
        </div>
      </div>
    </div>

    <!-- ===== Charts Section ===== -->

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Profits Balances -->
      <Card class="shadow-md">
        <template #title> Profits Balances</template>
        <template #content>
          <Chart type="line" :data="profitChart" :options="lineOptions" />
        </template>
      </Card>

      <!-- Profits Balances -->
      <Card class="shadow-md">
        <template #title> VX Balances</template>
        <template #content>
          <Chart type="line" :data="vxChart" :options="lineOptions" />
        </template>
      </Card>
    </div>

    <!-- ===== Referral & Activity Section ===== -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Referral Overview -->
      <Card class="shadow-md">
        <template #title>Referral Overview</template>
        <template #content>
          <div class="flex flex-col gap-4">
            <div class="flex justify-between items-center">
              <span class="text-gray-500">Total Referrals</span>
              <span class="font-semibold text-green-700">{{ referral?.counts?.totalCount }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-500">Total Invesstment</span>
              <span class="font-semibold text-green-700">${{ referral?.volumes?.leftVolume }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-500">Left Volume</span>
              <span class="font-semibold text-green-700">${{ referral?.volumes?.rightVolume }}</span>
            </div>
              <div class="flex justify-between items-center">
              <span class="text-gray-500">Right Volume</span>
              <span class="font-semibold text-green-700">$560</span>
            </div>

            <Button
              label="Invite More"
              icon="mdi mdi-account-plus-outline"
              class="p-button-success mt-2"
            />
          </div>
        </template>
      </Card>

      <!-- Recent Activity -->
      <Card class="shadow-md">
        <template #title>Recent Activity</template>
        <template #content>
          <ul class="divide-y divide-gray-200 text-sm">
            <li
              v-for="(item, index) in activities"
              :key="index"
              class="py-3 flex justify-between"
            >
              <div class="flex items-center gap-3">
                <i :class="item.icon + ' text-xl text-green-600'"></i>
                <span>{{ item.action }}</span>
              </div>
              <span class="text-gray-500">{{ item.date }}</span>
            </li>
          </ul>
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

const toast = useToast();

/* ======================
   ✅ API Calls (Backend)
   ====================== */

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
    console.log("node " , referral.value);
    
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

const activities = [
  { icon: "mdi mdi-cash-plus", action: "Deposit Added", date: "2h ago" },
  { icon: "mdi mdi-chart-line", action: "Profit Earned", date: "5h ago" },
  {
    icon: "mdi mdi-wallet-outline",
    action: "VX Reward Credited",
    date: "1d ago",
  },
  {
    icon: "mdi mdi-cash-minus",
    action: "Withdrawal Requested",
    date: "2d ago",
  },
];

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
    loadReferralTree()
  }
});

watch(
  () => authUser.value,
  (newVal) => {
    if (newVal?.user?.id) fetchBalances();
  }
);
</script>

<style lang="scss" scoped>
.dashboard {
  background-color: #f9fbfc;
  .card-box {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.2rem;
    background: #fff;
    border-radius: 1rem;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    transition: all 0.2s ease;
  }
  .card-box:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
  }
  .icon-box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
}
</style>
