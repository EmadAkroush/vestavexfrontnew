<template>
  <section class="addfunds-wrapper relative min-h-screen overflow-hidden">

    <!--  Glow background  -->
    <div class="glow glow-1"></div>
    <div class="glow glow-2"></div>

    <!-- HEADER -->
    <header class="text-center pt-14 relative z-10">
      <p class="eyebrow">VESTAVEX</p>
      <h2 class="title">Add Funds</h2>
      <p class="subtitle">
        Secure blockchain deposits with real-time verification.
      </p>
    </header>

    <!-- MAIN CARD -->
    <div class="main-card relative z-10 mx-auto mt-12 max-w-2xl glass-card">

      <!-- STEPPER -->
      <div class="stepper">
        <div
          v-for="(step, index) in steps"
          :key="index"
          class="step"
        >
          <div
            class="circle"
            :class="currentStep >= index + 1 ? 'active' : ''"
          >
            <i :class="step.icon"></i>
          </div>
          <p :class="currentStep >= index + 1 ? 'label active' : 'label'">
            {{ step.label }}
          </p>

          <!-- line -->
          <div
            v-if="index < steps.length - 1"
            class="line"
            :class="currentStep > index + 1 ? 'active' : ''"
          ></div>
        </div>
      </div>

      <!-- STEP 1 -->
      <div v-if="currentStep === 1" class="step-body">
        <h3 class="step-title"><i class="mdi mdi-wallet-outline"></i> Select Network & Amount</h3>

        <div class="network-grid">
          <div
            v-for="network in networks"
            :key="network.name"
            @click="selected = network"
            class="network-card"
            :class="selected?.name === network.name ? 'active' : ''"
          >
            <img :src="network.icon" class="net-logo" />
            <p>{{ network.name }}</p>
          </div>
        </div>

        <label class="input-label">Amount (USD)</label>
        <input
          v-model="amount"
          type="number"
          min="50"
          class="input-box"
          placeholder="Enter amount (min $50)"
        />

        <button class="btn-primary w-full" :disabled="!selected || amount < 50" @click="nextStep">
          Continue <i class="mdi mdi-arrow-right-bold"></i>
        </button>
      </div>

      <!-- STEP 2 -->
      <div v-else-if="currentStep === 2" class="step-body text-center">
        <img :src="selected.icon" class="network-big" />

        <h3 class="step-title">{{ selected.name }} Payment</h3>

        <p class="info-text">
          Send exactly <strong class="amount">${{ amount }}</strong> to the wallet below:
        </p>

        <div class="address-box">
          <p>{{ generatedAddress }}</p>
        </div>

        <button class="btn-outline w-full mb-3" @click="copyAddress">
          <i class="mdi mdi-content-copy"></i> Copy Address
        </button>

        <button class="btn-primary w-full" @click="nextStep">
          I’ve Paid <i class="mdi mdi-check-circle"></i>
        </button>

        <p class="note">Confirmation may take up to 5 minutes.</p>
      </div>

      <!-- STEP 3 -->
      <div v-else class="step-body text-center">
        <i class="mdi mdi-timer-sand text-5xl text-green-400"></i>
        <h3 class="step-title">Payment Verification</h3>

        <p class="info-text">
          Verifying your <strong class="amount">${{ amount }}</strong> deposit via
          <strong>{{ selected.name }}</strong>.
        </p>

        <ProgressBar :value="progress" class="w-full mb-4" />

        <button
          v-if="progress >= 100"
          class="btn-primary w-full"
          @click="goToDashboard"
        >
          Go to Dashboard <i class="mdi mdi-arrow-right"></i>
        </button>
      </div>

    </div>

  </section>
</template>

<script setup>
import { ref } from "vue";
import ProgressBar from "primevue/progressbar";
import { useRouter } from "vue-router";

const router = useRouter();

const currentStep = ref(1);
const selected = ref(null);
const amount = ref(null);
const progress = ref(0);
const generatedAddress = ref("0xA1B2C3D4E5F678901234567890ABCDEF12345678");

const steps = [
  { label: "Network", icon: "mdi mdi-wallet-outline" },
  { label: "Payment", icon: "mdi mdi-currency-usd" },
  { label: "Verify", icon: "mdi mdi-shield-check-outline" },
];

const networks = [
  { name: "TRON (TRC20)", icon: "https://cryptologos.cc/logos/tron-trx-logo.png" },
  { name: "USDT", icon: "https://cryptologos.cc/logos/tether-usdt-logo.png" },
  { name: "ETH (ERC20)", icon: "https://cryptologos.cc/logos/ethereum-eth-logo.png" },
  { name: "BTC", icon: "https://cryptologos.cc/logos/bitcoin-btc-logo.png" },
];

function nextStep() {
  currentStep.value++;

  if (currentStep.value === 3) {
    progress.value = 0;
    const timer = setInterval(() => {
      if (progress.value >= 100) clearInterval(timer);
      else progress.value += 8;
    }, 400);
  }
}

function copyAddress() {
  navigator.clipboard.writeText(generatedAddress.value);
  alert("Wallet address copied.");
}

function goToDashboard() {
  router.push("/account");
}
</script>

<style lang="scss" scoped>

/* ---------------- GLOBAL WRAPPER ---------------- */
.addfunds-wrapper {
  background: linear-gradient(180deg, #071114, #020404);
  padding-bottom: 80px;
  color: #dff7e8;
}

/* STATIC GLOWS (same style as Bundles page) */
.glow {
  position: absolute;
  width: 480px;
  height: 480px;
  filter: blur(120px);
  opacity: 0.2;
  z-index: 0;
}
.glow-1 {
  top: -80px;
  left: -120px;
  background: rgba(0, 255, 170, 0.25);
}
.glow-2 {
  bottom: -120px;
  right: -100px;
  background: rgba(0, 180, 255, 0.2);
}

/* ---------------- HEADER ---------------- */
.eyebrow {
  color: #72fdd6;
  letter-spacing: 0.28em;
  font-size: 0.85rem;
  text-transform: uppercase;
}
.title {
  font-size: 2.6rem;
  font-weight: 800;
  background: linear-gradient(90deg, #66ffd0, #a8fff4, #fffbe8);
  -webkit-background-clip: text;
  color: transparent;
}
.subtitle {
  color: #a8dccb;
  margin-top: 6px;
}

/* ---------------- GLASS MAIN CARD ---------------- */
.glass-card {
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(18px);
  padding: 28px;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.5);
  border: 1px solid rgba(255,255,255,0.08);
}

/* ---------------- STEPPER ---------------- */
.stepper {
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-bottom: 28px;
}

.step {
  position: relative;
  text-align: center;
  flex: 1;
}

.circle {
  width: 46px;
  height: 46px;
  margin: 0 auto;
  border-radius: 50%;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #7fdeca;
  transition: 0.3s;
}
.circle.active {
  background: linear-gradient(90deg, #00d99a, #00ffd0);
  color: #001c12;
  font-weight: 900;
  border: none;
}

.label {
  margin-top: 6px;
  font-size: 0.8rem;
  opacity: 0.6;
}
.label.active {
  opacity: 1;
  color: #8fffe0;
}

.line {
  position: absolute;
  top: 22px;
  left: calc(50% + 28px);
  width: calc(100% - 56px);
  height: 3px;
  background: rgba(255,255,255,0.1);
}
.line.active {
  background: #00ffc3;
}

/* ---------------- STEP CONTENT ---------------- */
.step-title {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: #c8fff0;
}

/* network cards */
.network-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  margin-bottom: 18px;
}
.network-card {
  padding: 14px;
  background: rgba(255,255,255,0.05);
  border-radius: 14px;
  text-align: center;
  border: 1px solid rgba(255,255,255,0.08);
  cursor: pointer;
  transition: 0.3s;
  color: #bff6e5;
}
.network-card:hover {
  background: rgba(255,255,255,0.12);
}
.network-card.active {
  border-color: #00ffc3;
  background: rgba(0,255,200,0.12);
  color: #eafffa;
}
.net-logo {
  width: 36px;
  height: 36px;
  margin-bottom: 6px;
}

/* inputs */
.input-label {
  margin-top: 10px;
  margin-bottom: 4px;
  color: #a3e3ce;
}
.input-box {
  width: 100%;
  padding: 10px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 10px;
  color: #eafff4;
}

/* wallet box */
.address-box {
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.12);
  padding: 12px;
  border-radius: 10px;
  font-family: monospace;
  word-break: break-word;
  margin-bottom: 12px;
}

/* text */
.info-text {
  color: #bdf7e4;
  margin-bottom: 14px;
}
.amount {
  color: #39ffb2;
}

/* buttons */
.btn-primary {
  background: linear-gradient(90deg, #00d99a, #00ffcf);
  color: #001d13;
  padding: 12px;
  border-radius: 12px;
  font-weight: 700;
  transition: 0.3s;
}
.btn-primary:hover {
  transform: scale(1.02);
}

.btn-outline {
  background: transparent;
  border: 1px solid #00ffcf;
  color: #00ffcf;
  padding: 12px;
  border-radius: 12px;
  font-weight: 600;
}

/* note */
.note {
  font-size: 0.7rem;
  opacity: 0.6;
  margin-top: 8px;
}

/* mobile fixes */
@media (max-width: 650px) {
  .network-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
