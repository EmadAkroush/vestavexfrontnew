<template>
  <section class="addfunds-wrapper min-h-screen relative overflow-hidden">
    <!-- HEADER -->
    <header class="text-center pt-14">
      <p class="eyebrow">VXBUSINESS</p>
      <h2 class="title">Add Funds</h2>
      <p class="subtitle">USDT Payment on BNB Chain</p>
    </header>

    <div class="main-card glass-card mx-auto mt-12 max-w-xl">
      <!-- STEP 1: Connect Wallet -->
      <div v-if="step === 1">
        <h3 class="step-title">1. Connect Wallet</h3>
        <button class="btn-primary w-full" @click="connectWallet">
          <i class="mdi mdi-wallet"></i>
          Connect Wallet
        </button>
        <p v-if="walletAddress" class="wallet-info mt-3">
          Connected: {{ shortAddress }}
        </p>
        <p v-if="error" class="text-red-500 mt-3">{{ error }}</p>
      </div>

      <!-- STEP 2: Enter Amount -->
      <div v-if="step === 2" class="mt-6">
        <h3 class="step-title">2. Enter Amount (USDT)</h3>

        <input
          v-model.number="amount"
          type="number"
          min="10"
          step="0.01"
          class="input-box mt-3"
          placeholder="Amount (USDT)"
        />

        <button
          class="btn-primary w-full mt-4"
          :disabled="!amount || amount < 10 || loading"
          @click="sendPayment"
        >
          Pay with USDT
        </button>

        <p v-if="error" class="text-red-500 mt-3">{{ error }}</p>
      </div>

      <!-- STEP 3: Success -->
      <div v-if="step === 3" class="text-center mt-6">
        <i class="mdi mdi-check-circle text-5xl text-green-400"></i>
        <h3 class="step-title mt-3">Payment Sent</h3>
        <p class="info-text mt-2">Transaction Hash:</p>
        <p class="tx break-all">{{ txHash }}</p>
        <p class="mt-2 text-sm text-gray-500">
          Your payment is being confirmed on the blockchain.
        </p>
      </div>

      <!-- Loading Overlay -->
      <div
        v-if="loading"
        class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      >
        <p class="text-white text-lg">Processing...</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ethers } from 'ethers'
const { authUser } = useAuth()
// ---------------- STATE ----------------
const step = ref(1)
const walletAddress = ref(null)
const amount = ref(null)
const txHash = ref(null)
const paymentId = ref(null)

const error = ref(null)
const loading = ref(false)

// ---------------- CONSTANTS ----------------
const BNB_CHAIN_ID = 56
const USDT_ADDRESS = '0x55d398326f99059fF775485246999027B3197955'

const ERC20_ABI = [
  'function transfer(address to, uint amount)',
  'function decimals() view returns (uint8)',
  'function balanceOf(address owner) view returns (uint)',
]

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
      throw new Error('Wallet not found')
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
    await provider.send('eth_requestAccounts', [])
    const signer = provider.getSigner()

    walletAddress.value = await signer.getAddress()
    step.value = 2
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

// ---------------- CREATE PAYMENT (BACKEND) ----------------
const createPayment = async () => {
  if (!amount.value || amount.value <= 0) {
    error.value = 'Invalid amount'
    return
  }

  loading.value = true
  error.value = null

  try {
    const res = await $fetch('/api/payment/addfunds', {
      method: 'POST',
      body: {
        userId: authUser.value.user.id, // از auth خودت بگیر
        amountUsd: amount.value,
      },
    })

    paymentId.value = res.paymentId

    return res
  } catch (e) {
    error.value = e.data?.message || e.message
    throw e
  } finally {
    loading.value = false
  }
}

// ---------------- SEND USDT ----------------
const sendPayment = async () => {
  loading.value = true
  error.value = null

  try {
    // 1️⃣ create payment in backend
    const payment = await createPayment()

    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
    const signer = provider.getSigner()

    // 2️⃣ check network
    const network = await provider.getNetwork()
    if (network.chainId !== BNB_CHAIN_ID) {
      throw new Error('Please switch to BNB Chain')
    }

    // 3️⃣ send USDT
    const usdt = new ethers.Contract(USDT_ADDRESS, ERC20_ABI, signer)
    const decimals = await usdt.decimals()
    const amountWei = ethers.utils.parseUnits(
      amount.value.toString(),
      decimals,
    )

    const balance = await usdt.balanceOf(walletAddress.value)
    if (balance.lt(amountWei)) {
      throw new Error('Insufficient USDT balance')
    }

    const tx = await usdt.transfer(payment.receiver, amountWei)
    const receipt = await tx.wait()

    txHash.value = receipt.transactionHash

    // 4️⃣ submit txHash to backend
    await $fetch('/api/payment/submit-tx', {
      method: 'POST',
      body: {
        paymentId: paymentId.value,
        txHash: txHash.value,
        fromAddress: walletAddress.value,
      },
    })

    step.value = 3
  } catch (e) {
    console.error(e)
    error.value = e.reason || e.message || 'Payment failed'
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
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(18px);
  padding: 28px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.input-box {
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
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
