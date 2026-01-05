<template>
  <div class="portfolio px-6 py-10 space-y-12">
    <!-- ===== Header ===== -->
    <div class="text-center">
      <h1 class="text-3xl font-bold text-green-700">My Investment Portfolio</h1>
      <p class="text-gray-600 mt-2">
        Track your bundles, monitor profits, and manage your investments efficiently.
      </p>
    </div>

    <!-- ===== Summary Cards ===== -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="stat-card">
        <i class="mdi mdi-cash-multiple text-green-600 text-3xl"></i>
        <div>
          <p class="text-gray-500 text-sm">Total Invested</p>
          <h3 class="text-2xl font-bold text-green-700">${{ totalInvested }}</h3>
        </div>
      </div>

      <!-- <div class="stat-card">
        <i class="mdi mdi-trending-up text-blue-600 text-3xl"></i>
        <div>
          <p class="text-gray-500 text-sm">Expected Returns</p>
          <h3 class="text-2xl font-bold text-blue-700">${{ totalReturns }}</h3>
        </div>
      </div> -->
<!-- 
      <div class="stat-card">
        <i class="mdi mdi-wallet-outline text-purple-600 text-3xl"></i>
        <div>
          <p class="text-gray-500 text-sm">Current Profit</p>
          <h3 class="text-2xl font-bold text-purple-700">${{ totalProfit }}</h3>
        </div>
      </div> -->

      <div class="stat-card">
        <i class="mdi mdi-chart-line text-yellow-600 text-3xl"></i>
        <div>
          <p class="text-gray-500 text-sm">Active Bundles</p>
          <h3 class="text-2xl font-bold text-yellow-700">{{ portfolio.length }}</h3>
        </div>
      </div>
    </div>

    <!-- ===== Performance Chart ===== -->
    <div class="bg-white shadow-lg rounded-2xl p-6">
      <h2 class="text-lg font-semibold text-green-700 mb-4 flex items-center gap-2">
        <i class="mdi mdi-finance text-green-600 text-2xl"></i> Portfolio Performance
      </h2>
      <Chart type="line" :data="chartData" :options="chartOptions" class="h-64" />
    </div>

    <!-- ===== Active Investments ===== -->
    <div>
      <h2 class="text-xl font-bold text-green-700 mb-4">Active Investments</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <Card
          v-for="(item, index) in portfolio"
          :key="index"
          class="shadow-lg relative border border-gray-100 rounded-2xl hover:shadow-xl transition-all"
        >
          <template #title>
            <div class="flex justify-between items-center">
              <h3 class="font-semibold text-green-700">Bundle #{{ index + 1 }}</h3>
              <span class="text-xs text-gray-400">{{ item.type }}</span>
            </div>
          </template>

          <template #content>
            <div class="text-sm text-gray-700 space-y-2">
              <p>Invested: <span class="font-semibold text-green-700">${{ item.amount }}</span></p>
              <p>Profit Rate: <span class="font-semibold">{{ item.profit }}% / month</span></p>
              <p>Date of purchase: <span class="font-semibold">{{ item.start }} </span></p>
              <div class="mt-3">
                <div class="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Progress</span>
                  <span>{{ item.progress }}%</span>
                </div>
                <ProgressBar :value="item.progress" />
              </div>
            </div>
          </template>

          <template #footer>
            <div class="flex flex-wrap gap-2">
              <Button
                label="Details"
                icon="mdi mdi-eye-outline"
                class="p-button-sm p-button-outlined"
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
    <div class="bg-white shadow-lg rounded-2xl p-6">
      <h2 class="text-lg font-semibold text-green-700 mb-4 flex items-center gap-2">
        <i class="mdi mdi-chart-pie text-green-600 text-2xl"></i> Portfolio Analytics
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
              class="flex justify-between border-b pb-2 cursor-pointer transition hover:bg-green-50 p-2 rounded-md"
              :class="{ 'bg-green-100': selectedPlan === item.type }"
              @click="selectedPlan = item.type"
            >
              <span class="font-medium text-gray-700">{{ item.type }}</span>
              <span class="font-bold text-green-600">${{ item.amount }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Dynamic Plan Details -->
      <transition name="expand">
        <div
          v-if="selectedDetails"
          class="mt-6 border-t pt-4 bg-gray-50 p-4 rounded-xl shadow-inner"
        >
          <h3 class="font-semibold text-green-700 mb-2 flex items-center gap-2">
            <i class="mdi mdi-information-outline text-green-600"></i>
            {{ selectedPlan }} Details
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div
              v-for="(item, i) in selectedDetails"
              :key="i"
              class="p-3 rounded-lg bg-white shadow-sm border cursor-pointer hover:border-green-500 transition"
              @click="openPlanModal(item)"
            >
              <p class="text-sm text-gray-700">Invested: <span class="font-semibold text-green-700">${{ item.amount }}</span></p>
              <p class="text-sm text-gray-700">Profit Rate: <span class="font-semibold">{{ item.profit }}%</span></p>
              <p class="text-sm text-gray-700">Duration: <span class="font-semibold">{{ item.start }} → {{ item.end }}</span></p>
              <p class="text-sm text-gray-700">Progress: <span class="font-semibold">{{ item.progress }}%</span></p>
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
    >
      <div class="space-y-3">
        <label>Amount (USD)</label>
        <InputNumber
          v-model="investAmount"
          mode="currency"
          currency="USD"
          locale="en-US"
          class="w-full"
        />

     
      </div>

      <template #footer>
        <div class="flex justify-end gap-3">
          <Button
            label="Cancel"
            class="p-button-text"
            @click="visibleInvest = false"
          />
          <Button
            label="Confirm"
            class="p-button-success"
            @click="confirmInvestment"
          />
        </div>
      </template>
    </Dialog>

    <!-- ===== Modal: Plan Details ===== -->
    <Dialog v-model:visible="showModal" modal header="Plan Details" class="max-w-lg w-full">
      <div class="space-y-3">
        <h3 class="text-xl font-bold text-green-700">{{ modalData.type }}</h3>
        <p class="text-sm text-gray-600">
          Duration: <span class="font-semibold">{{ modalData.start }} → {{ modalData.end }}</span>
        </p>
        <p>Invested Amount: <span class="font-semibold text-green-700">${{ modalData.amount }}</span></p>
        <p>Profit Rate: <span class="font-semibold">{{ modalData.profit }}% / month</span></p>
        <p>Progress: <span class="font-semibold">{{ modalData.progress }}%</span></p>

        <ProgressBar :value="modalData.progress" class="mt-3" />
      </div>

      <template #footer>
        <div class="flex justify-between w-full">
          <Button     @click="openInvestDialog(selectedBundle)"   label="Reinvest" icon="mdi mdi-repeat" class="p-button-success" />
          
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
import { useToast } from "primevue/usetoast"
import Card from "primevue/card"
import Chart from "primevue/chart"
import ProgressBar from "primevue/progressbar"
import Dialog from "primevue/dialog"
import Button from "primevue/button"

const toast = useToast()
const { authUser } = useAuth()

const portfolio = ref([])
const loading = ref(true)
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
    if (!authUser.value?.user?.id) return

    const res = await $fetch("/api/investments/my", {
      method: "POST",
      body: {
        userId: authUser.value.user.id,
      },
    })
   console.log("dddd" , res );
   
    // 🔁 Map backend data to UI format
    portfolio.value = res.map((inv) => ({
      id: inv._id,
      type: inv.package?.name + " Plan",
      amount: inv.amount,
      profit: inv.package?.monthRate || 0,
      progress: calculateProgress(inv),
      start: formatDate(inv.createdAt),
      end: calculateEndDate(inv.createdAt),
    }))
  } catch (e) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Failed to load investments",
      life: 3000,
    })
  } finally {
    loading.value = false
  }
})

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
  return new Date(date).toISOString().split("T")[0]
}

function calculateEndDate(start) {
  const d = new Date(start)
  d.setMonth(d.getMonth() + 6)
  return d.toISOString().split("T")[0]
}

// ===== Computed Totals =====
const totalInvested = computed(() =>
  portfolio.value.reduce((a, b) => a + b.amount, 0)
)

const totalProfit = computed(() =>
  portfolio.value.reduce(
    (a, b) => a + (b.amount * b.profit) / 100,
    0
  )
)

const totalReturns = computed(() => totalInvested.value + totalProfit.value)

// ===== Charts (داینامیک) =====
const chartData = computed(() => ({
  labels: portfolio.value.map((p, i) => `Plan ${i + 1}`),
  datasets: [
    {
      label: "Earnings",
      data: portfolio.value.map(
        (p) => (p.amount * p.profit) / 100
      ),
      borderColor: "#10b981",
      backgroundColor: "rgba(16,185,129,0.15)",
      fill: true,
      tension: 0.4,
    },
  ],
}))

const chartOptions = {
  plugins: { legend: { display: false } },
}

// ===== Pie Chart =====
const pieData = computed(() => ({
  labels: portfolio.value.map((p) => p.type),
  datasets: [
    {
      data: portfolio.value.map((p) => p.amount),
      backgroundColor: ["#f59e0b", "#3b82f6", "#10b981"],
    },
  ],
}))

const pieOptions = {
  plugins: {
    legend: { position: "bottom" },
  },
}

// ===== Modal =====
const showModal = ref(false)
const modalData = ref({})

const openPlanModal = (item) => {
  modalData.value = item
  showModal.value = true
}
</script>


<style lang="scss" scoped>
.portfolio {
  background-color: #f9fbfc;

  .stat-card {
    @apply flex items-center gap-4 bg-white p-5 rounded-xl shadow-sm transition-all hover:shadow-md;
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
}
</style>
