
<template>
  <div class="p-6 space-y-6">
   <!-- Portfolio Header -->
    <h2 class="text-xl font-bold mb-4">My Portfolio</h2>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card class="shadow-md">
        <template #title>Total Invested</template>
        <template #content>
          <p class="text-2xl font-bold text-green-600">${{ 1000  }}</p>
        </template>
      </Card>
      <Card class="shadow-md">
        <template #title>Expected Returns</template>
        <template #content>
          <p class="text-2xl font-bold text-blue-600">$1000.002</p>
        </template>
      </Card>
      <Card class="shadow-md">
        <template #title>Active Positions</template>
        <template #content>
          <p class="text-2xl font-bold text-purple-600">{{ portfolio.length }}</p>
        </template>
      </Card>
    </div>
  
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <Card
      v-for="(item, index) in portfolio"
      :key="index"
      class="shadow-lg relative"
    >
      <template #title>Investment #{{ index + 1 }}</template>

      <template #content>
        <p class="text-sm text-gray-600">
          Amount: <span class="font-bold">${{ item.amount }}</span>
        </p>
        <p class="text-sm text-gray-600">
          Start: <span class="font-semibold">{{ item.start }}</span>
        </p>
        <p class="text-sm text-gray-600">
          End: <span class="font-semibold">{{ item.end }}</span>
        </p>
        <p class="text-sm text-gray-600">
          Profit Rate: <span class="font-semibold">{{ item.profit }}% / month</span>
        </p>

        <!-- Progress -->
        <div class="mt-2">
          <p class="text-xs text-gray-500 mb-1">
            Progress: {{ item.progress }}%
          </p>
          <ProgressBar :value="item.progress" />
        </div>

        <!-- Expanded Details Section -->
        <transition name="expand">
          <div
            v-if="expandedCard === index"
            class="mt-4 p-3 rounded-md bg-gray-50 border text-center"
          >
            <p class="text-sm text-gray-700">
              <span class="font-semibold">Total Profit Earned:</span>
              <span class="text-green-600 font-bold">
                ${{ calcProfit(item) }}
              </span>
            </p>
          </div>
        </transition>
      </template>

      <template #footer>
        <div class="flex gap-2">
          <Button
            label="Details"
            class="p-button-sm p-button-outlined"
            @click="toggleDetails(index)"
          />
          <Button label="Renew" class="p-button-sm p-button-success" />
          <Button label="Upgrade" class="p-button-sm p-button-warning" />
        </div>
      </template>
    </Card>
  </div>
  </div>
</template>

<script setup>
import Card from "primevue/card"
import Button from "primevue/button"
import ProgressBar from "primevue/progressbar"
import { ref } from "vue"

const expandedCard = ref(null)

const toggleDetails = (index) => {
  expandedCard.value = expandedCard.value === index ? null : index
}

const portfolio = [
  { amount: 500, start: "2025-01-01", end: "2025-06-01", profit: 6, progress: 40 },
  { amount: 1000, start: "2025-02-15", end: "2025-08-15", profit: 5, progress: 25 },
  { amount: 2500, start: "2025-03-05", end: "2026-03-05", profit: 7, progress: 60 },
]

const calcProfit = (item) => {
  // مثال ساده: سود ماهانه × درصد پیشرفت (بر اساس مدت قرارداد)
  return ((item.amount * item.profit) / 100) * (item.progress / 100 * 12)
}
</script>

<style scoped>
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
  max-height: 200px;
  opacity: 1;
}
</style>
