<template>
  <section class="bundles-wrapper relative overflow-hidden min-h-screen">
    <!-- 3D background canvas (full-bleed) -->
    <BundlesThreeBackground />

    <!-- soft radial glows -->
    <div class="glow glow-left" aria-hidden="true"></div>
    <div class="glow glow-right" aria-hidden="true"></div>

    <!-- header -->
    <BundlesHeader />

    <!-- grid -->
    <BundlesGrid
      :items="bundles"
      @details="openDialog"
      @invest="openInvestDialog"
    />

    <!-- DETAILS DIALOG -->
    <Dialog
      v-model:visible="visibleDetails"
      modal
      :style="{ width: '95%', maxWidth: '520px' }"
      :dismissableMask="true"
      class="glass-dialog"
    >
      <div class="glass-header">
        <h3>{{ selectedBundle?.name }} Bundle</h3>
        <p class="subtitle">Premium Investment Information</p>
      </div>

      <div class="glass-content">
        <div class="info-row">
          <i class="mdi mdi-cash text-indigo-400"></i>
          <span class="label">Invest Range</span>
          <span class="value">{{ selectedBundle.range }}</span>
        </div>

        <div class="info-row">
          <i class="mdi mdi-bank-transfer text-indigo-400"></i>
          <span class="label">Min Withdrawal</span>
          <span class="value">$50</span>
        </div>

        <div class="info-row">
          <i class="mdi mdi-chart-line text-indigo-400"></i>
          <span class="label">Monthly Return</span>
          <span class="value">{{ selectedBundle.monthRate }}%</span>
        </div>

        <div class="info-row">
          <i class="mdi mdi-percent-outline text-indigo-400"></i>
          <span class="label">Max Cap</span>
          <span class="value">{{ selectedBundle.maxCap }}%</span>
        </div>

        <div class="explain-box">
          <h4>📌 Max Cap 300%</h4>
          <p>The maximum earning limit for each bundle includes the total of:</p>
          <ul>
            <li>✔ Monthly returns from the bundle</li>
            <li>✔ Network earnings (Binary Income)</li>
          </ul>
          <p>
            This means once your total profit reaches
            <strong>300%</strong> of your invested amount, the bundle has
            reached its cap and must be renewed.
          </p>
        </div>
      </div>

      <template #footer>
        <div class="dialog-footer">
          <Button
            label="Close"
            class="p-button-text"
            @click="visibleDetails = false"
          />
          <Button
            label="Invest Now"
            class="p-button-success"
            @click="openInvestDialog(selectedBundle)"
          />
        </div>
      </template>
    </Dialog>

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
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useToast } from "primevue/usetoast";
const toast = useToast();

const visibleDetails = ref(false);
const visibleInvest = ref(false);
const selectedBundle = ref(null);
const investAmount = ref(null);
const selectedPayment = ref(null);
const bundles = ref([]);
const loading = ref(true);

const { authUser } = useAuth();
const router = useRouter();

onMounted(async () => {
  try {
    const data = await $fetch(`/api/packages`);
    bundles.value = data;
  } catch (err) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Failed to load plans.",
      life: 3000,
    });
  } finally {
    loading.value = false;
  }
});

function openDialog(item) {
  selectedBundle.value = item;
  visibleDetails.value = true;
}

function openInvestDialog(item) {
  console.log("ITEM from grid:", item);
  if (!authUser.value) return router.push("/login");
  selectedBundle.value = item;
  visibleInvest.value = true;
}

async function confirmInvestment() {
  if (!investAmount.value) {
    toast.add({
      severity: "warn",
      summary: "Missing Info",
      detail: "Please enter amount",
      life: 3000,
    });
    return;
  }

  const rangeText = selectedBundle.value?.range;
  if (rangeText) {
    const numbers = rangeText.match(/\d+/g)?.map(Number);
    if (numbers && numbers.length >= 2) {
      const min = numbers[0];
      const max = numbers[1];
      if (investAmount.value < min || investAmount.value > max) {
        toast.add({
          severity: "warn",
          summary: "Invalid Amount",
          detail: `Investment amount must be between $${min} and $${max}`,
          life: 3000,
        });
        return;
      }
    }
  }

  try {
    const payload = {
      userId: authUser.value?.user?.id,
      package_id: selectedBundle.value._id,
      amount: investAmount.value,
    };

    console.log("Investment Payload:", payload);

    await $fetch("/api/investments", {
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
    toast.add({
      severity: "error",
      summary: "Investment Failed",
      detail: e?.data?.message || "Server Error",
      life: 4000,
    });
  }
}
</script>

<style scoped lang="scss">
.glass-dialog .p-dialog-content {
  background: rgba(99, 102, 241, 0.08) !important;
  backdrop-filter: blur(22px);
  border-radius: 22px;
  padding: 0 !important;
}

.glass-header {
  padding: 24px 20px 10px;
  text-align: center;
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.35),
    rgba(139, 92, 246, 0.25)
  );
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 22px 22px 0 0;
}

.glass-header h3 {
  font-size: 26px;
  color: #818cf8;
  font-weight: 700;
}

.glass-header .subtitle {
  color: #c7d2fe;
  font-size: 14px;
}

.glass-content {
  padding: 22px;
}

.info-row {
  display: grid;
  grid-template-columns: 30px 1fr auto;
  align-items: center;
  padding: 12px 0;
  color: #e0e7ff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.info-row .label {
  color: #a5b4fc;
  font-size: 14px;
}

.info-row .value {
  font-weight: 600;
  color: #8b5cf6;
}

.explain-box {
  margin-top: 20px;
  background: rgba(99, 102, 241, 0.08);
  border: 1px solid rgba(139, 92, 246, 0.25);
  padding: 16px;
  border-radius: 14px;
}

.explain-box h4 {
  color: #a78bfa;
  margin-bottom: 6px;
}

.explain-box ul {
  margin: 8px 0;
  padding-left: 18px;
  color: #c7d2fe;
  font-size: 14px;
}

.dialog-footer {
  padding: 15px 20px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  background: rgba(99, 102, 241, 0.05);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0 0 22px 22px;
}

.bundles-wrapper {
  position: relative;
  min-height: 100vh;
  background: linear-gradient(180deg, #0b1020, #050814);
  z-index: 5;
  padding: 60px 0 100px;
  color: #e0e7ff;
  overflow: hidden;
}

.glow {
  position: absolute;
  width: 480px;
  height: 480px;
  filter: blur(80px);
  opacity: 0.32;
  z-index: 0;
}
.glow-left {
  left: -8%;
  top: -6%;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.25), transparent 40%);
}
.glow-right {
  right: -6%;
  bottom: -8%;
  background: radial-gradient(circle, rgba(139, 92, 246, 0.25), transparent 40%);
}

.card-body .row span {
  font-size: 0.88rem;
  color: #a5b4fc;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #6366f1, #8b5cf6);
  box-shadow: 0 6px 18px rgba(99, 102, 241, 0.25);
  transition: width 0.9s cubic-bezier(0.2, 0.9, 0.25, 1);
}

.progress-label {
  font-size: 12px;
  margin-top: 6px;
  color: #a5b4fc;
}

.p-dialog .p-dialog-header {
  background: linear-gradient(90deg, #6366f1, #8b5cf6);
  color: white;
}

@media (max-width: 768px) {
  .bundle-card {
    min-height: 220px;
    padding: 14px;
  }
}
</style>
