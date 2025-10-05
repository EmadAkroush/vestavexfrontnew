<template>
  <div class="2rt space-y-6  mx-auto">
    <!-- Header -->
    <h2 class="text-xl font-bold mb-4">Cashout</h2>

    <!-- Wallet Selection -->
    <Card class="shadow-md">
      <template #title>Select Wallet</template>
      <template #content>
        <Dropdown
          v-model="selectedWallet"
          :options="wallets"
          optionLabel="label"
          placeholder="Choose your wallet"
          class="w-full"
        />
        <p v-if="selectedWallet" class="mt-3 text-sm text-gray-600">
          Balance: 
          <span class="font-bold text-green-600">
            ${{ selectedWallet.balance }}
          </span>
        </p>
      </template>
    </Card>

    <!-- Amount Input -->
    <Card class="shadow-md">
      <template #title>Enter Amount</template>
      <template #content>
        <InputNumber
          v-model="amount"
          mode="currency"
          currency="USD"
          locale="en-US"
          class="w-full"
        />
        <p class="text-xs text-gray-500 mt-2">
          Min withdrawal: $50 | Fee: 2%
        </p>
      </template>
    </Card>

    <!-- Method Selection -->
    <Card class="shadow-md">
      <template #title>Cashout Method</template>
      <template #content>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            class="border p-4 rounded-md cursor-pointer flex items-center gap-2"
            :class="method === 'crypto' ? 'border-green-500 bg-green-50' : 'border-gray-200'"
            @click="method = 'crypto'"
          >
            <i class="pi pi-bitcoin text-yellow-500 text-xl"></i>
            <span class="font-medium">Crypto (USDT, BTC)</span>
          </div>

          <!-- <div
            class="border p-4 rounded-md cursor-pointer flex items-center gap-2"
            :class="method === 'bank' ? 'border-green-500 bg-green-50' : 'border-gray-200'"
            @click="method = 'bank'"
          >
            <i class="pi pi-credit-card text-blue-500 text-xl"></i>
            <span class="font-medium">Bank Transfer</span>
          </div> -->
        </div>
      </template>
    </Card>

    <!-- Action -->
    <div class="text-center">
      <Button
        label="Request Cashout"
        class="px-6 py-2"
        :disabled="!selectedWallet || !amount || !method"
      />
    </div>
  </div>
</template>

<script setup>
import Card from "primevue/card"
import Button from "primevue/button"
import Dropdown from "primevue/dropdown"
import InputNumber from "primevue/inputnumber"
import { ref } from "vue"

const wallets = [
  { label: "Profits Wallet", balance: 1200 },
  { label: "VX Wallet", balance: 780 },
]

const selectedWallet = ref(null)
const amount = ref(null)
const method = ref(null)
</script>

