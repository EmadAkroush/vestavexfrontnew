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

    <!-- dialogs (use your existing PrimeVue dialogs or replace) -->
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
        <!-- Row -->
        <div class="info-row">
          <i class="mdi mdi-cash text-green-400"></i>
          <span class="label">Invest Range</span>
          <span class="value">{{ selectedBundle.range }} </span>
        </div>

        <div class="info-row">
          <i class="mdi mdi-bank-transfer text-green-400"></i>
          <span class="label">Min Withdrawal</span>
          <span class="value">$50</span>
        </div>

        <div class="info-row">
          <i class="mdi mdi-chart-line text-green-400"></i>
          <span class="label">Monthly Return</span>
          <span class="value">{{ selectedBundle.monthRate }}%</span>
        </div>

        <div class="info-row">
          <i class="mdi mdi-percent-outline text-green-400"></i>
          <span class="label">Max Cap</span>
          <span class="value">{{ selectedBundle.maxCap }}%</span>
        </div>

        <!-- EXPLANATION BOX -->
        <!-- EXPLANATION BOX -->
        <div class="explain-box">
          <h4>📌 Max Cap 300%</h4>
          <p>
            The maximum earning limit for each bundle includes the total of:
          </p>
          <ul>
            <li>✔ Monthly returns from the bundle</li>
            <li>✔ Network earnings (Binary Income)</li>
          </ul>
          <p>
            This means once your total profit reaches <strong>300%</strong> of
            your invested amount, the bundle has reached its cap and must be
            renewed.
          </p>
        </div>
      </div>

      <!-- FOOTER -->
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
import { ref, onMounted, onBeforeUnmount } from "vue";

let gsap; // module reference

// UI state (dialogs etc.)
const visibleDetails = ref(false);
const visibleInvest = ref(false);
const selectedBundle = ref(null);
const investAmount = ref(null);
const selectedPayment = ref(null);
const bundles = ref(null);
const { authUser } = useAuth();

const paymentMethods = [
  { label: "Crypto (USDT / BTC / ETH)", value: "crypto" },
  { label: "Card", value: "card" },
  { label: "Bank", value: "bank" },
];

onMounted(async () => {
  try {
    const data = await $fetch(`api/packages`);
    bundles.value = data;
    console.log("data", bundles.value);
  } catch (err) {
    console.error("❌ Failed to fetch plans:", err);
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
  if (!authUser.value) {
    return navigateTo("/login");
  }
  selectedBundle.value = item;
  visibleInvest.value = true;
}
function confirmInvestment() {
  if (!investAmount.value || !selectedPayment.value) {
    alert("Please enter amount and select payment method");
    return;
  }
  alert(`Invested ${investAmount.value} in ${selectedBundle.value.title}`);
  visibleInvest.value = false;
}

/* ---------- GSAP card hover micro-interactions (dynamic import) ---------- */
async function enableGSAP() {
  const mod = await import("gsap");
  gsap = mod.default || mod;
  // add simple hover scale/shadow handled in CSS + small gsap tweak on enter
  const cards = Array.from(document.querySelectorAll(".bundle-card"));
  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      gsap.to(card, { scale: 1.03, duration: 0.35, ease: "power3.out" });
    });
    card.addEventListener("mouseleave", () => {
      gsap.to(card, { scale: 1, duration: 0.5, ease: "power3.out" });
      gsap.to(card.querySelector(".card-body"), {
        x: 0,
        y: 0,
        rotationX: 0,
        rotationY: 0,
        duration: 0.6,
        ease: "power3.out",
      });
    });
  });
}

onMounted(async () => {
  // enable GSAP interactions without blocking render (dynamic import)
  try {
    await enableGSAP();
  } catch (e) {
    // fine if no GSAP — fallback to CSS hover
  }

  window.addEventListener("resize", onResize);
});
</script>

<style scoped lang="scss">
/* root section */
/* ---- GLASS CARD DIALOG ---- */
.glass-dialog .p-dialog-content {
  background: rgba(255, 255, 255, 0.08) !important;
  backdrop-filter: blur(22px);
  border-radius: 22px;
  padding: 0 !important;
}

/* HEADER */
.glass-header {
  padding: 24px 20px 10px;
  text-align: center;
  background: linear-gradient(
    135deg,
    rgba(0, 255, 190, 0.25),
    rgba(0, 255, 130, 0.15)
  );
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 22px 22px 0 0;
}

.glass-header h3 {
  font-size: 26px;
  color: #00ffc3;
  font-weight: 700;
}

.glass-header .subtitle {
  color: #e0e0e0;
  font-size: 14px;
}

/* CONTENT */
.glass-content {
  padding: 22px;
}

.info-row {
  display: grid;
  grid-template-columns: 30px 1fr auto;
  align-items: center;
  padding: 12px 0;
  color: #e6e6e6;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.info-row .label {
  color: #bfbfbf;
  font-size: 14px;
}

.info-row .value {
  font-weight: 600;
  color: #00ffbf;
}

/* Explanation Box */
.explain-box {
  margin-top: 20px;
  background: rgba(0, 255, 180, 0.06);
  border: 1px solid rgba(0, 255, 180, 0.15);
  padding: 16px;
  border-radius: 14px;
}

.explain-box h4 {
  color: #00ffc3;
  margin-bottom: 6px;
}

.explain-box ul {
  margin: 8px 0;
  padding-left: 18px;
  color: #dcdcdc;
  font-size: 14px;
}

/* FOOTER */
.dialog-footer {
  padding: 15px 20px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  background: rgba(255, 255, 255, 0.04);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0 0 22px 22px;
}

.bundles-wrapper {
  position: relative;
  min-height: 100vh;
  background: linear-gradient(180deg, #0e1513, #0c0f0e);
  z-index: 5; /* ✔ محتوا بالای canvas */
}

.three-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw !important;
  height: 100vh !important;
  pointer-events: none;
  z-index: 0;
}

.bundles-wrapper {
  position: relative;
  padding: 60px 0 100px;
  background: linear-gradient(180deg, #071114 0%, #06110f 40%, #020403 100%);
  color: #dbeee4;
  overflow: hidden;
}

/* soft static glows */
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
  background: radial-gradient(circle, rgba(0, 255, 180, 0.14), transparent 40%);
}
.glow-right {
  right: -6%;
  bottom: -8%;
  background: radial-gradient(
    circle,
    rgba(60, 200, 255, 0.12),
    transparent 40%
  );
}

/* grid */
.grid-wrap {
  z-index: 10;
}

/* body rows */

.card-body .row span {
  font-size: 0.88rem;
  color: #9adfc9;
}

/* progress */
.progress-wrap {
  margin-top: 12px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #00ffd0, #2af7e0);
  box-shadow: 0 6px 18px rgba(0, 255, 190, 0.12);
  transition: width 0.9s cubic-bezier(0.2, 0.9, 0.25, 1);
}
.progress-label {
  font-size: 12px;
  margin-top: 6px;
  color: #9adfc9;
}

/* dialog/primevue styling fallback */
.p-dialog .p-dialog-header {
  background: linear-gradient(90deg, #00b682, #00fcd1);
  color: white;
}

/* small screens */
@media (max-width: 768px) {
  .bundle-card {
    min-height: 220px;
    padding: 14px;
  }
}
</style>
