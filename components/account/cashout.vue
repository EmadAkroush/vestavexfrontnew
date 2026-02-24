<template>
  <div class="cashout px-4 sm:px-16 py-10 max-w-3xl mx-auto space-y-8">
    <!-- ===== Step Progress Bar ===== -->
    <div class="relative flex items-center justify-between mb-8">
      <div
        v-for="(stepItem, index) in steps"
        :key="index"
        class="flex flex-col items-center relative"
      >
        <div
          class="step-circle"
          :class="{
            active: currentStep > index,
            current: currentStep === index,
          }"
        >
          {{ index + 1 }}
        </div>

        <span
          class="mt-2 text-xs sm:text-sm font-medium"
          :class="currentStep >= index ? 'text-[#C7D2FE]' : 'text-gray-500'"
        >
          {{ stepItem.label }}
        </span>

        <div
          v-if="index < steps.length - 1"
          class="step-line"
          :class="{ activeLine: currentStep > index }"
        ></div>
      </div>
    </div>

    <transition name="fade">
      <div v-if="currentStep === 0">
        <Card class="custom-card">
          <template #title>
            <span class="card-title">Enter Amount</span>
          </template>

          <template #content>
            <!-- اگر ولت تنظیم نشده -->
            <div v-if="!walletAllowed" class="mb-4 text-red-400 text-sm">
              ⚠ You must set your wallet address in your profile before
              requesting withdrawal.
            </div>

            <!-- Input + MAX -->
            <div class="flex gap-2 items-center">
              <InputNumber
                v-model="amount"
                mode="currency"
                currency="USD"
                locale="en-US"
                class="w-full custom-input"
                :max="balances.withdrawalTotalBalance"
                :disabled="!walletAllowed"
              />

              <Button
                label="MAX"
                class="max-btn"
                @click="setMaxAmount"
                :disabled="!walletAllowed || !balances.withdrawalTotalBalance"
              />
            </div>

            <!-- Balance -->
            <div class="flex justify-between text-xs mt-2">
              <span class="text-gray-400">Available Balance:</span>
              <span class="text-green-400 font-semibold">
                ${{ balances.withdrawalTotalBalance?.toLocaleString() }}
              </span>
            </div>

            <p class="text-xs text-gray-400 mt-2">
              Min withdrawal: $50 | Fee: 5%
            </p>
          </template>
        </Card>

        <div class="flex justify-end mt-6">
          <Button
            label="Next"
            icon="mdi mdi-arrow-right"
            class="primary-btn px-6 py-2"
            :disabled="
              !walletAllowed ||
              !amount ||
              amount < 50 ||
              amount > balances.withdrawalTotalBalance
            "
            @click="nextStep"
          />
        </div>
      </div>
    </transition>

 

    <!-- ===== Step 3 ===== -->
    <transition name="fade">
      <div v-if="currentStep === 1">
        <Card class="custom-card">
          <template #title>
            <span class="card-title">Choose Withdrawal Method</span>
          </template>
          <template #content>
            <div
              class="method-box"
              :class="{ selected: method === 'crypto' }"
              @click="method = 'crypto'"
            >
              <i class="mdi mdi-bitcoin text-[#2563EB] text-2xl"></i>
              <span>Crypto</span>
            </div>

            <div v-if="method === 'crypto'" class="mt-5">
              <Dropdown
                v-model="selectedCryptoWallet"
                :options="userWallets"
                optionLabel="name"
                placeholder="Select your crypto wallet"
                class="w-full custom-dropdown"
              />
            </div>
          </template>
        </Card>

        <div class="flex justify-between mt-6">
          <Button
            label="Back"
            icon="mdi mdi-arrow-left"
            class="outline-btn"
            @click="prevStep"
          />
          <Button
            label="Confirm Cashout"
            icon="mdi mdi-check"
            class="primary-btn px-6 py-2"
            :loading="loading"
            :disabled="
              !method || (method === 'crypto' && !selectedCryptoWallet)
            "
            @click="completeCashout"
          />
        </div>
      </div>
    </transition>

    <!-- ===== Step 4 ===== -->
    <transition name="fade">
      <div v-if="currentStep === 2" class="text-center py-10">
        <i
          class="mdi mdi-check-circle-outline text-[#7C3AED] text-6xl mb-4"
        ></i>

        <h2 class="text-2xl font-bold text-[#C7D2FE]">
          Cashout Request Submitted
        </h2>

        <p class="text-gray-400 mt-2">
          Your withdrawal request is being processed.
        </p>

        <div class="transaction-box">
          <p class="text-sm text-gray-400 mb-1">Transaction ID</p>
          <p class="text-lg font-mono font-semibold text-[#2563EB]">
            {{ transactionId }}
          </p>
        </div>

        <Button
          label="Back to Dashboard"
          icon="mdi mdi-view-dashboard"
          class="outline-btn mt-8"
          @click="resetSteps"
        />
      </div>
    </transition>
  </div>
</template>

<script setup>
import Card from "primevue/card";
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import InputNumber from "primevue/inputnumber";
import { ref, onMounted, computed } from "vue";

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

/* ===== State ===== */
const currentStep = ref(0);
const selectedWallet = ref(null);
const amount = ref(null);
const method = ref(null);
const selectedCryptoWallet = ref(null);
const transactionId = ref("");
const loading = ref(false);
const walletAllowed = ref(false); // 🟢 ولت اجازه برداشت

/* ===== Wallets from API ===== */


function setMaxAmount() {
  amount.value = balances.value.withdrawalTotalBalance || 0;
}

const userWallets = [{ name: "main Wallet - TRC20", network: "TRON" }];

const steps = [
  { label: "Enter Amount" },
  { label: "Withdrawal Method" },
  { label: "Confirmation" },
];

/* ===== Navigation ===== */
const nextStep = () => currentStep.value++;
const prevStep = () => currentStep.value--;

// 🟢 بررسی ولت قبل از شروع
onMounted(async () => {
  try {
    const userId = authUser.value?.user?.id;
    if (!userId) {
      errorMessage.value = "Please login to continue.";
      return;
    }

    const user = await $fetch("/api/account/find", {
      method: "POST",
      body: { id: userId },
    });

    if (user.wallet && user.wallet.trim() !== "") {
      walletAllowed.value = true;
    } else {
      walletAllowed.value = false;
      errorMessage.value =
        "You must set your wallet address before requesting withdrawal.";
      toast.add({
        severity: "warn",
        summary: "Wallet Required",
        detail:
          "Please set your wallet address in your profile before withdrawing.",
        life: 5000,
      });
    }
  } catch (err) {
    console.error("❌ Wallet Check Error:", err);
    walletAllowed.value = false;
  }
});

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

/* ===== Submit Withdrawal ===== */
const completeCashout = async () => {
  try {
    loading.value = true;

    const res = await $fetch("/api/transactions/withdraw", {
      method: "POST",
      body: {
        userId: authUser.value.user.id,
        amount: amount.value,
      },
    });
    console.log("res", res);

    transactionId.value = res._id;
    nextStep();
  } catch (err) {
    console.log("res", err);
    alert(err?.data?.message || "Withdrawal failed");
  } finally {
    loading.value = false;
  }
};

/* ===== Reset ===== */
const resetSteps = () => {
  currentStep.value = 0;
  selectedWallet.value = null;
  amount.value = null;
  method.value = null;
  selectedCryptoWallet.value = null;
  transactionId.value = "";
};

onMounted(() => {
  if (authUser?.value?.user?.id) {
    fetchBalances();
  }
});
</script>

<style lang="scss" scoped>

.max-btn {
  background: linear-gradient(135deg,#2563EB,#7C3AED);
  border: none;
  color: white;
  font-size: 12px;
  padding: 6px 12px;
  height: 38px;
}

.max-btn:hover {
  opacity: 0.9;
}ّ


.cashout {
  min-height: 100vh;
  color: #c7d2fe;
}

/* Step */
.step-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #4f46e5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #4f46e5;
  background: #1e293b;
  z-index: 10;
}

.step-circle.active {
  background: linear-gradient(135deg, #2563eb, #7c3aed);
  border: none;
  color: white;
}

.step-circle.current {
  border: 2px solid #2563eb;
  color: #2563eb;
}

.step-line {
  position: absolute;
  top: 20px;
  left: 50%;
  width: 100%;
  height: 2px;
  background: #1e293b;
  z-index: 0;
}

.step-line.activeLine {
  background: #2563eb;
}

/* Cards */
.custom-card {
  background: #1e293b;
  border: 1px solid #4f46e5;
  border-radius: 16px;
  color: #c7d2fe;
}

.card-title {
  color: #c7d2fe;
  font-weight: 600;
}

/* Buttons */
.primary-btn {
  background: linear-gradient(135deg, #2563eb, #7c3aed);
  border: none;
  color: white;
}

.primary-btn:hover {
  opacity: 0.9;
}

.outline-btn {
  border: 1px solid #4f46e5;
  background: transparent;
  color: #c7d2fe;
}

.outline-btn:hover {
  border: 1px solid #4f46e5;
  background: #2563eb;
  color: #c7d2fe;
}

/* Method box */
.method-box {
  border: 1px solid #4f46e5;
  padding: 16px;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  gap: 8px;
  align-items: center;
  background: #0f172a;
  transition: all 0.2s;
}

.method-box.selected {
  background: linear-gradient(135deg, #2563eb, #7c3aed);
  border: none;
  color: white;
}

/* Transaction Box */
.transaction-box {
  margin-top: 24px;
  background: #1e293b;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #4f46e5;
}

/* Inputs */
.custom-input :deep(.p-inputtext),
.custom-dropdown :deep(.p-inputtext) {
  background: #0f172a;
  border: 1px solid #4f46e5;
  color: #c7d2fe;
}

/* Fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
