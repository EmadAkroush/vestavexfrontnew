<template>
  <div class="aboutus">
    <Head>
      <Title> </Title>
      <Meta name="description" content="" />
    </Head>
    <div class="sec1">
      <div class="mt-4">
        <nuxt-link to="/">
          <span style="color: #0b6d20"> home / </span>
        </nuxt-link>
        <span>add funds</span>
      </div>
    </div>
    <div class="max-w-xl mx-auto p-6">
      <!-- Title -->
      <h2 class="text-2xl font-bold text-center mb-4">Crypto Payment</h2>
      <p class="text-sm text-gray-500 text-center mb-6">
        Minimum deposit is <span class="font-semibold">$50</span>. Deposits
        below this will not be processed.
      </p>

      <!-- Network Selection -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div
          v-for="network in networks"
          :key="network.name"
          @click="selected = network.name"
          class="cursor-pointer flex flex-col items-center p-4 border rounded-xl transition hover:shadow-md"
          :class="
            selected === network.name
              ? 'border-green-500 bg-green-50'
              : 'border-gray-300'
          "
        >
          <img :src="network.icon" alt="network logo" class="w-10 h-10 mb-2" />
          <p class="text-sm font-semibold">{{ network.name }}</p>
        </div>
      </div>

      <!-- Deposit Form -->
      <div class="bg-white shadow-md rounded-xl p-4">
        <label class="block text-sm font-medium mb-2">Enter Amount (USD)</label>
        <InputText
          v-model="amount"
          placeholder="e.g. 100"
          class="w-full mb-4"
        />

        <Button
          label="Proceed to Pay"
          class="w-full"
          :disabled="!selected || amount < 10"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.aboutus {
  background-color: #f9fbfc;
  .sec1 {
    padding: 10px 80px 80px 80px;
  }
  .arow {
    width: 14px;
    height: 14px;
  }
}
@media only screen and (max-width: 650px) {
  .aboutus {
    padding: 10px 10px;
  }
}
</style>

<script setup>
import { ref } from "vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";

const amount = ref(null);
const selected = ref(null);

const networks = [
  { name: "TRON", icon: "https://cryptologos.cc/logos/tron-trx-logo.png" },
  { name: "USDT", icon: "https://cryptologos.cc/logos/tether-usdt-logo.png" },
  { name: "ETH", icon: "https://cryptologos.cc/logos/ethereum-eth-logo.png" },
  { name: "BTC", icon: "https://cryptologos.cc/logos/bitcoin-btc-logo.png" },
];
</script>
