<template>
  <section class="addfunds-wrapper min-h-screen relative overflow-hidden">
    <!-- HEADER -->
    <header class="text-center pt-14">
      <p class="eyebrow">VXBUSINESS</p>
      <h2 class="title">Add Funds</h2>
      <p class="subtitle">Direct Web3 wallet payment</p>
    </header>
    <div class="main-card glass-card mx-auto mt-12 max-w-xl">
      <!-- STEP 1 -->
      <div v-if="step === 1">
        <h3 class="step-title">1. Connect Wallet</h3>
        <button class="btn-primary w-full" @click="connectWallet">
          <i class="mdi mdi-wallet"></i>
          Connect Wallet
        </button>
        <p v-if="walletAddress" class="wallet-info mt-3">
          {{ shortAddress }}
        </p>
        <p v-if="error" class="text-red-500 mt-3">{{ error }}</p>
      </div>
      <!-- STEP 2 -->
      <div v-if="step === 2" class="mt-6">
        <h3 class="step-title">2. Select Network & Amount</h3>
        <select v-model="selectedNetwork" class="input-box">
          <option disabled value="">Select Network</option>
          <option v-for="n in networks" :key="n.chainId" :value="n">
            {{ n.name }}
          </option>
        </select>
        <input
          v-model.number="amount"
          type="number"
          min="10"
          step="0.01"
          class="input-box mt-3"
          placeholder="Amount (USD)"
        />
        <button
          class="btn-primary w-full mt-4"
          :disabled="!selectedNetwork || !amount || amount < 10"
          @click="sendPayment"
        >
          Pay Now
        </button>
        <p v-if="error" class="text-red-500 mt-3">{{ error }}</p>
      </div>
      <!-- STEP 3 -->
      <div v-if="step === 3" class="text-center mt-6">
        <i class="mdi mdi-check-circle text-5xl text-green-400"></i>
        <h3 class="step-title mt-3">Payment Sent</h3>
        <p class="info-text mt-2">Transaction Hash:</p>
        <p class="tx break-all">{{ txHash }}</p>
      </div>
      <!-- Loading Overlay -->
      <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <p class="text-white text-lg">Processing...</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ethers } from 'ethers'

// ---------------- STATE ----------------
const step = ref(1)
const walletAddress = ref(null)
const selectedNetwork = ref(null)
const amount = ref(null)
const txHash = ref(null)
const error = ref(null)
const loading = ref(false)

// ---------------- NETWORKS ----------------
const networks = ref([
  { chainId: 1, name: 'Ethereum Mainnet', symbol: 'ETH' },
  { chainId: 137, name: 'Polygon', symbol: 'MATIC' },
  { chainId: 42161, name: 'Arbitrum One', symbol: 'ETH' }
])

// ---------------- COMPUTED ----------------
const shortAddress = computed(() => {
  if (!walletAddress.value) return ''
  return `${walletAddress.value.slice(0, 6)}...${walletAddress.value.slice(-4)}`
})

// ---------------- CONNECT WALLET ----------------
const connectWallet = async () => {
  loading.value = true
  error.value = null

  try {
    if (!window.ethereum) {
      throw new Error('MetaMask یا Web3 Wallet پیدا نشد')
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
    await provider.send('eth_requestAccounts', [])

    const signer = provider.getSigner()
    walletAddress.value = await signer.getAddress()
    step.value = 2
  } catch (e) {
    error.value = e.message || 'خطا در اتصال کیف پول'
  } finally {
    loading.value = false
  }
}

// ---------------- SEND PAYMENT ----------------
const sendPayment = async () => {
  loading.value = true
  error.value = null
  txHash.value = null

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
    const signer = provider.getSigner()

    const network = await provider.getNetwork()
    if (network.chainId !== Number(selectedNetwork.value.chainId)) {
      throw new Error(
        `لطفاً شبکه کیف پول را روی ${selectedNetwork.value.name} تغییر دهید`
      )
    }

    // ✅ آدرس واقعی بیزینس (حتماً عوض کن)
    const receiver = '0x1234567890abcdef1234567890abcdef12345678'

    if (!ethers.utils.isAddress(receiver)) {
      throw new Error('آدرس مقصد معتبر نیست')
    }

    // ⚠️ فقط تست – قیمت واقعی بعداً با oracle
    const nativePriceUSD = 2000
    const nativeAmount = amount.value / nativePriceUSD
    const value = ethers.utils.parseEther(nativeAmount.toString())

    const tx = await signer.sendTransaction({
      to: receiver,
      value
    })

    const receipt = await tx.wait()
    txHash.value = receipt.transactionHash
    step.value = 3
  } catch (e) {
    console.error(e)
    error.value = e.reason || e.message || 'پرداخت ناموفق بود'
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
/* ---------------- GLOBAL WRAPPER ---------------- */
.addfunds-wrapper {
  background: linear-gradient(
    180deg,
    #061a15 0%,
    #03211c 35%,
    #021412 70%,
    #000807 100%
  );

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
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.08);
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
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
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
  background: rgba(255, 255, 255, 0.1);
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
  background: rgba(255, 255, 255, 0.05);
  border-radius: 14px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.08);
  cursor: pointer;
  transition: 0.3s;
  color: #bff6e5;
}
.network-card:hover {
  background: rgba(255, 255, 255, 0.12);
}
.network-card.active {
  border-color: #00ffc3;
  background: rgba(0, 255, 200, 0.12);
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
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 10px;
  color: #eafff4;
}

/* wallet box */
.address-box {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
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

.addfunds-wrapper {
  background: linear-gradient(180deg, #061a15, #000b09);
  color: #dff7e8;
}

.glass-card {
  background: rgba(255,255,255,0.06);
  backdrop-filter: blur(18px);
  padding: 28px;
  border-radius: 20px;
  border: 1px solid rgba(255,255,255,0.1);
}

.input-box {
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.15);
  color: #fff;
}

.btn-primary {
  background: linear-gradient(90deg, #00d99a, #00ffd0);
  padding: 12px;
  border-radius: 14px;
  font-weight: 700;
}

.wallet-info {
  margin-top: 8px;
  font-size: 0.8rem;
  color: #7fffd4;
}

.tx {
  font-family: monospace;
  font-size: 0.75rem;
  opacity: 0.7;
}


/* mobile fixes */
@media (max-width: 650px) {
  .network-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>