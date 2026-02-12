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
        <p v-if="error" class="text-red-400 mt-3">{{ error }}</p>
      </div>

      <!-- STEP 2 -->
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
          :disabled="loading"
          @click="sendPayment"
        >
          <span v-if="!loading">Pay with USDT</span>
          <span v-else>Waiting for wallet confirmation...</span>
        </button>

        <p v-if="walletRequestSent" class="mt-3 text-sm text-yellow-300">
          Payment request sent to your wallet. Please confirm the transaction.
        </p>
      </div>

      <!-- STEP 3 -->
      <div v-if="step === 3" class="text-center mt-6">
        <i class="mdi mdi-check-circle text-5xl text-cyan-400"></i>
        <h3 class="step-title mt-3">Payment Sent</h3>
        <p class="info-text mt-2">Transaction Hash:</p>
        <p class="tx break-all">{{ txHash }}</p>
        <p class="mt-2 text-sm text-gray-400">
          Your payment is being confirmed on the blockchain.
        </p>
      </div>

      <div
        v-if="loading"
        class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50"
      >
        <p class="text-white text-lg">Processing...</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import { ethers } from "ethers";
const { authUser } = useAuth();
const walletRequestSent = ref(false);
definePageMeta({ middleware: "auth" });

const step = ref(1);
const walletAddress = ref(null);
const amount = ref(null);
const txHash = ref(null);
const paymentId = ref(null);
const error = ref(null);
const loading = ref(false);

const BNB_CHAIN_ID = 56;
const USDT_ADDRESS = "0x55d398326f99059fF775485246999027B3197955";

const ERC20_ABI = [
  "function transfer(address to, uint amount)",
  "function decimals() view returns (uint8)",
  "function balanceOf(address owner) view returns (uint)",
];

const shortAddress = computed(() => {
  if (!walletAddress.value) return "";
  return `${walletAddress.value.slice(0, 6)}...${walletAddress.value.slice(-4)}`;
});

const connectWallet = async () => {
  loading.value = true;
  error.value = null;
  try {
    if (!window.ethereum) {
      throw new Error("No crypto wallet found.");
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    walletAddress.value = await signer.getAddress();
    if (!walletAddress.value) throw new Error("Wallet connection failed");
    step.value = 2;
  } catch (e) {
    error.value = e.message || "Wallet connection was rejected";
  } finally {
    loading.value = false;
  }
};

const createPayment = async () => {
  if (!amount.value || amount.value <= 0) {
    error.value = "Invalid amount";
    return;
  }
  loading.value = true;
  error.value = null;
  try {
    const res = await $fetch("/api/payment/addfunds", {
      method: "POST",
      body: {
        userId: authUser.value.user.id,
        amountUsd: amount.value,
      },
    });
    paymentId.value = res.paymentId;
    return res;
  } catch (e) {
    error.value = e.data?.message || e.message;
    throw e;
  } finally {
    loading.value = false;
  }
};

const sendPayment = async () => {
  loading.value = true;
  walletRequestSent.value = false;
  error.value = null;
  try {
    const payment = await createPayment();
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    const signer = provider.getSigner();
    const network = await provider.getNetwork();
    if (network.chainId !== BNB_CHAIN_ID) {
      throw new Error("Please switch to BNB Chain");
    }
    const usdt = new ethers.Contract(USDT_ADDRESS, ERC20_ABI, signer);
    const decimals = await usdt.decimals();
    const amountWei = ethers.utils.parseUnits(
      amount.value.toString(),
      decimals
    );
    const balance = await usdt.balanceOf(walletAddress.value);
    if (balance.lt(amountWei)) {
      throw new Error("Insufficient USDT balance");
    }
    walletRequestSent.value = true;
    const tx = await usdt.transfer(payment.receiver, amountWei);
    const receipt = await tx.wait();
    txHash.value = receipt.transactionHash;

    await $fetch("/api/payment/submittx", {
      method: "POST",
      body: {
        paymentId: paymentId.value,
        txHash: txHash.value,
        fromAddress: walletAddress.value,
      },
    });

    step.value = 3;
  } catch (e) {
    error.value = e.reason || e.message || "Payment failed";
  } finally {
    loading.value = false;
    walletRequestSent.value = false;
  }
};
</script>

<style lang="scss" scoped>
.addfunds-wrapper {
  background: linear-gradient(180deg, #0f0c29, #1b1445, #090922);
  color: #e6f0ff;
  padding-bottom: 80px;
}

.eyebrow {
  color: #8ab4ff;
  letter-spacing: 0.28em;
  font-size: 0.85rem;
  text-transform: uppercase;
}

.title {
  font-size: 2.6rem;
  font-weight: 800;
  background: linear-gradient(90deg, #4facfe, #00f2fe, #a18cd1);
  -webkit-background-clip: text;
  color: transparent;
}

.subtitle {
  color: #b8c6ff;
  margin-top: 6px;
}

.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  padding: 28px;
  border-radius: 20px;
  border: 1px solid rgba(120, 150, 255, 0.3);
  box-shadow: 0 0 40px rgba(0, 200, 255, 0.2);
}

.step-title {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: #9ecbff;
}

.input-box {
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(120, 150, 255, 0.3);
  color: #fff;
}

.btn-primary {
  background: linear-gradient(90deg, #4facfe, #00f2fe);
  color: #00152e;
  padding: 12px;
  border-radius: 14px;
  font-weight: 700;
  transition: 0.3s;
}

.btn-primary:hover {
  transform: scale(1.03);
  box-shadow: 0 0 20px rgba(0, 200, 255, 0.6);
}

.wallet-info {
  margin-top: 8px;
  font-size: 0.8rem;
  color: #7fdfff;
}

.info-text {
  color: #b8c6ff;
}

.tx {
  font-family: monospace;
  font-size: 0.75rem;
  opacity: 0.7;
}
</style>
