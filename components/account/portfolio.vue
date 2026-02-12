<template>
  <div class="portfolio px-6 py-10 space-y-12">
    <!-- ===== Header ===== -->
    <div class="text-center">
      <h1 class="text-3xl font-bold text-[#C7D2FE]">My Investment Portfolio</h1>
      <p class="text-gray-300 mt-2">
        Track your bundles, monitor profits, and manage your investments
        efficiently.
      </p>
    </div>

    <!-- ===== Summary Cards ===== -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="stat-card gradient-blue">
        <i class="mdi mdi-cash-multiple text-white text-3xl"></i>
        <div>
          <p class="text-[#C7D2FE] text-sm">Total Invested</p>
          <h3 class="text-2xl font-bold text-white">${{ totalInvested }}</h3>
        </div>
      </div>

      <div class="stat-card gradient-purple">
        <i class="mdi mdi-chart-line text-white text-3xl"></i>
        <div>
          <p class="text-[#C7D2FE] text-sm">Active Bundles</p>
          <h3 class="text-2xl font-bold text-white">{{ portfolio.length }}</h3>
        </div>
      </div>
    </div>

    <!-- ===== Performance Chart ===== -->
    <div class="bg-[#0F172A] shadow-lg rounded-2xl p-6">
      <h2
        class="text-lg font-semibold text-[#C7D2FE] mb-4 flex items-center gap-2"
      >
        <i class="mdi mdi-finance text-[#2563EB] text-2xl"></i> Portfolio
        Performance
      </h2>
      <Chart
        type="line"
        :data="chartData"
        :options="chartOptions"
        class="h-64"
      />
    </div>

    <!-- ===== Active Investments ===== -->
    <div>
      <h2 class="text-xl font-bold text-[#C7D2FE] mb-4">Active Investments</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <Card
          v-for="(item, index) in portfolio"
          :key="index"
          class="shadow-lg relative border border-[#4F46E5] rounded-2xl hover:shadow-xl transition-all bg-[#0F172A]"
        >
          <template #title>
            <div class="flex justify-between items-center">
              <h3 class="font-semibold text-[#2563EB]">
                Bundle #{{ index + 1 }}
              </h3>
              <span class="text-xs text-gray-400">{{ item.type }}</span>
            </div>
          </template>

          <template #content>
            <div class="text-sm text-[#C7D2FE] space-y-2">
              <p>
                Invested:
                <span class="font-semibold text-[#2563EB]"
                  >${{ item.amount }}</span
                >
              </p>
              <p>
                Profit Rate:
                <span class="font-semibold text-[#7C3AED]"
                  >{{ item.profit }}% / month</span
                >
              </p>
              <p>
                Date of purchase:
                <span class="font-semibold text-[#C7D2FE]"
                  >{{ item.start }}
                </span>
              </p>
              <div class="mt-3">
                <div class="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Progress</span>
                  <span>{{ item.progress }}%</span>
                </div>
                <ProgressBar
                  :value="item.progress"
                  :style="{ backgroundColor: '#1F2937', height: '8px' }"
                  :class="'progress-bar-gradient'"
                />
              </div>
            </div>
          </template>

          <template #footer>
            <div class="flex flex-wrap gap-2">
              <Button
                label="Details"
                icon="mdi mdi-eye-outline"
                class="p-button-sm p-button-outlined text-white border-white"
                @click="openPlanModal(item)"
              />
              <Button
                label="Renew"
                icon="mdi mdi-refresh"
                class="p-button-sm p-button-success"
                @click="openInvestDialog(selectedBundle)"
              />
            </div>
          </template>
        </Card>
      </div>
    </div>

    <!-- ===== Interactive Analytics ===== -->
    <div class="bg-[#0F172A] shadow-lg rounded-2xl p-6">
      <h2
        class="text-lg font-semibold text-[#C7D2FE] mb-4 flex items-center gap-2"
      >
        <i class="mdi mdi-chart-pie text-[#4F46E5] text-2xl"></i> Portfolio
        Analytics
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <Chart
          type="pie"
          :data="pieData"
          :options="pieOptions"
          class="max-h-80"
          @select="onPieSelect"
        />
        <div>
          <ul class="space-y-3">
            <li
              v-for="(item, i) in portfolio"
              :key="i"
              class="flex justify-between border-b pb-2 cursor-pointer transition hover:bg-[#1F2937] p-2 rounded-md"
              :class="{ 'bg-[#2563EB]': selectedPlan === item.type }"
              @click="selectedPlan = item.type"
            >
              <span class="font-medium text-[#C7D2FE]">{{ item.type }}</span>
              <span class="font-bold text-[#2563EB]">${{ item.amount }}</span>
            </li>
          </ul>
        </div>
      </div>

      <transition name="expand">
        <div
          v-if="selectedDetails"
          class="mt-6 border-t pt-4 bg-[#0F172A] p-4 rounded-xl shadow-inner"
        >
          <h3 class="font-semibold text-[#C7D2FE] mb-2 flex items-center gap-2">
            <i class="mdi mdi-information-outline text-[#7C3AED]"></i>
            {{ selectedPlan }} Details
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div
              v-for="(item, i) in selectedDetails"
              :key="i"
              class="p-3 rounded-lg bg-[#1F2937] shadow-sm border cursor-pointer hover:border-[#2563EB] transition"
              @click="openPlanModal(item)"
            >
              <p class="text-sm text-[#C7D2FE]">
                Invested:
                <span class="font-semibold text-[#2563EB]"
                  >${{ item.amount }}</span
                >
              </p>
              <p class="text-sm text-[#C7D2FE]">
                Profit Rate:
                <span class="font-semibold text-[#7C3AED]"
                  >{{ item.profit }}%</span
                >
              </p>
              <p class="text-sm text-[#C7D2FE]">
                Duration:
                <span class="font-semibold"
                  >{{ item.start }} → {{ item.end }}</span
                >
              </p>
              <p class="text-sm text-[#C7D2FE]">
                Progress:
                <span class="font-semibold text-[#2563EB]"
                  >{{ item.progress }}%</span
                >
              </p>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <!-- INVEST DIALOG -->
    <Dialog
      v-model:visible="visibleInvest"
      modal
      :header="'Invest in ' + (selectedBundle?.title || '')"
      class="custom-dialog max-w-md w-full"
    >
      <div class="space-y-4">
        <label class="text-[#C7D2FE] font-medium">Amount (USD)</label>

        <InputNumber
          v-model="investAmount"
          mode="currency"
          currency="USD"
          locale="en-US"
          class="w-full custom-input"
        />
      </div>

      <template #footer>
        <div class="flex justify-end gap-3 w-full">
          <Button
            label="Cancel"
            class="cancel-btn"
            @click="visibleInvest = false"
          />
          <Button
            label="Confirm"
            class="confirm-btn"
            @click="confirmInvestment"
          />
        </div>
      </template>
    </Dialog>

    <!-- ===== Modal: Plan Details ===== -->
    <Dialog
      v-model:visible="showModal"
      modal
      header="Plan Details"
      class="custom-dialog max-w-lg w-full"
    >
      <div class="space-y-4">
        <h3 class="text-xl font-bold text-[#C7D2FE]">
          {{ modalData.type }}
        </h3>

        <p class="text-sm text-gray-400">
          Duration:
          <span class="font-semibold text-[#C7D2FE]">
            {{ modalData.start }} → {{ modalData.end }}
          </span>
        </p>

        <p class="text-[#C7D2FE]">
          Invested Amount:
          <span class="font-semibold text-[#2563EB]">
            ${{ modalData.amount }}
          </span>
        </p>

        <p class="text-[#C7D2FE]">
          Profit Rate:
          <span class="font-semibold text-[#7C3AED]">
            {{ modalData.profit }}% / month
          </span>
        </p>

        <p class="text-[#C7D2FE]">
          Progress:
          <span class="font-semibold text-[#4F46E5]">
            {{ modalData.progress }}%
          </span>
        </p>

        <ProgressBar :value="modalData.progress" class="mt-3 custom-progress" />
      </div>

      <template #footer>
        <div class="flex justify-between w-full">
          <Button
            @click="openInvestDialog(selectedBundle)"
            label="Reinvest"
            icon="mdi mdi-repeat"
            class="confirm-btn"
          />
        </div>
      </template>
    </Dialog>

    <!-- INVEST DIALOG & Modal Details همان نسخه قبلی با متن روشن و پس‌زمینه تاریک -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useToast } from "primevue/usetoast";
import Card from "primevue/card";
import Chart from "primevue/chart";
import ProgressBar from "primevue/progressbar";
import Dialog from "primevue/dialog";
import Button from "primevue/button";

const toast = useToast();
const { authUser } = useAuth();

const portfolio = ref([]);
const loading = ref(true);
const selectedBundle = ref(null);
const visibleInvest = ref(false);
const investAmount = ref(null);

function openInvestDialog(item) {
  console.log("ITEM from grid:", item);
  showModal.value = false;
  selectedBundle.value = item;
  visibleInvest.value = true;
}

async function confirmInvestment() {
  // ✅ amount required
  if (!investAmount.value) {
    toast.add({
      severity: "warn",
      summary: "Missing Info",
      detail: "Please enter amount",
      life: 3000,
    });
    return;
  }

  // ✅ Dynamic range from selectedBundle.range

  try {
    const payload = {
      userId: authUser.value?.user?.id,
      amount: investAmount.value,
    };

    console.log("Investment Payload:", payload);

    const res = await $fetch("/api/investments", {
      method: "POST",
      body: payload,
    });

    toast.add({
      severity: "success",
      summary: "Investment Submitted",
      detail: `Investment of $${investAmount.value} created`,
      life: 3500,
    });

    visibleInvest.value = false;
    investAmount.value = null;
    selectedPayment.value = null;
  } catch (e) {
    // toast.add({
    //   severity: "error",
    //   summary: "Investment Failed",
    //   detail: e?.data?.message || "Server Error",
    //   life: 4000,
    // });
  }
}

// ===== Fetch My Investments =====
onMounted(async () => {
  try {
    if (!authUser.value?.user?.id) return;

    const res = await $fetch("/api/investments/my", {
      method: "POST",
      body: {
        userId: authUser.value.user.id,
      },
    });
    console.log("dddd", res);

    // 🔁 Map backend data to UI format
    portfolio.value = res.map((inv) => ({
      id: inv._id,
      type: inv.package?.name + " Plan",
      amount: inv.amount,
      profit: inv.package?.monthRate || 0,
      progress: calculateProgress(inv),
      start: formatDate(inv.createdAt),
      end: calculateEndDate(inv.createdAt),
    }));
  } catch (e) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Failed to load investments",
      life: 3000,
    });
  } finally {
    loading.value = false;
  }
});

// ===== Helpers =====
function calculateProgress(inv) {
  const amount = Number(inv.amount || 0);

  const min = Number(inv.package?.minDeposit ?? 0);
  const max = Number(inv.package?.maxDeposit ?? 0);

  // 🛡️ اگر بازه معتبر نیست
  if (!min || !max || max <= min) return 0;

  // ⛔ کمتر از مین
  if (amount <= min) return 0;

  // ✅ بیشتر یا مساوی سقف
  if (amount >= max) return 100;

  // 🎯 محاسبه درصد واقعی
  const progress = ((amount - min) / (max - min)) * 100;

  return Math.round(progress);
}

function formatDate(date) {
  return new Date(date).toISOString().split("T")[0];
}

function calculateEndDate(start) {
  const d = new Date(start);
  d.setMonth(d.getMonth() + 6);
  return d.toISOString().split("T")[0];
}

// ===== Computed Totals =====
const totalInvested = computed(() =>
  portfolio.value.reduce((a, b) => a + b.amount, 0),
);

const totalProfit = computed(() =>
  portfolio.value.reduce((a, b) => a + (b.amount * b.profit) / 100, 0),
);

const totalReturns = computed(() => totalInvested.value + totalProfit.value);

// ===== Charts (داینامیک) =====
const chartData = computed(() => ({
  labels: portfolio.value.map((p, i) => `Plan ${i + 1}`),
  datasets: [
    {
      label: "Earnings",
      data: portfolio.value.map((p) => (p.amount * p.profit) / 100),
      borderColor: "#10b981",
      backgroundColor: "rgba(16,185,129,0.15)",
      fill: true,
      tension: 0.4,
    },
  ],
}));

const chartOptions = {
  plugins: { legend: { display: false } },
};

// ===== Pie Chart =====
const pieData = computed(() => ({
  labels: portfolio.value.map((p) => p.type),
  datasets: [
    {
      data: portfolio.value.map((p) => p.amount),
      backgroundColor: ["#f59e0b", "#3b82f6", "#10b981"],
    },
  ],
}));

const pieOptions = {
  plugins: {
    legend: { position: "bottom" },
  },
};

// ===== Modal =====
const showModal = ref(false);
const modalData = ref({});

const openPlanModal = (item) => {
  modalData.value = item;
  showModal.value = true;
};
</script>

<style lang="scss" scoped>

/* ===== Dialog Background ===== */
.custom-dialog :deep(.p-dialog) {
  background: #0F172A;
  border: 1px solid #4F46E5;
  border-radius: 16px;
}

.custom-dialog :deep(.p-dialog-header) {
  background: #0F172A;
  color: #C7D2FE;
  border-bottom: 1px solid #1E293B;
}

.custom-dialog :deep(.p-dialog-content) {
  background: #0F172A;
}

.custom-dialog :deep(.p-dialog-footer) {
  background: #0F172A;
  border-top: 1px solid #1E293B;
}

/* ===== Input Styling ===== */
.custom-input :deep(.p-inputtext) {
  background: #1E293B;
  border: 1px solid #4F46E5;
  color: #C7D2FE;
}

.custom-input :deep(.p-inputtext:focus) {
  border-color: #2563EB;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.3);
}

/* ===== Buttons ===== */
.confirm-btn {
  background: linear-gradient(135deg, #2563EB, #7C3AED);
  border: none;
  color: white;
}

.confirm-btn:hover {
  opacity: 0.9;
}

.cancel-btn {
  background: transparent;
  border: 1px solid #4F46E5;
  color: #C7D2FE;
}

.cancel-btn:hover {
  background: #1E293B;
}

/* ===== ProgressBar ===== */
.custom-progress :deep(.p-progressbar) {
  background: #1E293B;
  border-radius: 8px;
}

.custom-progress :deep(.p-progressbar-value) {
  background: linear-gradient(90deg, #2563EB, #7C3AED);
  border-radius: 8px;
}



.portfolio {

  .stat-card {
    @apply flex items-center gap-4 p-5 rounded-xl transition-all;
    background: #1f2937;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
  }

  .expand-enter-active,
  .expand-leave-active {
    transition: all 0.3s ease-in-out;
  }
  .expand-enter-from,
  .expand-leave-to {
    max-height: 0;
    opacity: 0;
  }
  .expand-enter-to,
  .expand-leave-from {
    max-height: 300px;
    opacity: 1;
  }

  /* Gradient Cards */
  .gradient-blue {
    background: linear-gradient(135deg, #2563eb, #4f46e5);
  }
  .gradient-purple {
    background: linear-gradient(135deg, #4f46e5, #7c3aed);
  }

  /* Progress Bar Custom */
  .progress-bar-gradient .p-progressbar-value {
    background: #2563eb !important;
  }
}
</style>
