<template>
  <div class=" space-b-8">
    <!-- ===== Dashboard Section ===== -->
    <div>
      <h2 class="text-xl font-bold mb-4">Dashboard Overview</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Total Balance -->
        <Card class="shadow-md">
          <template #title>Total Balance</template>
          <template #content>
            <p class="text-2xl font-bold text-green-600">$4,250</p>
          </template>
        </Card>

        <!-- Profits Wallet -->
        <Card class="shadow-md">
          <template #title>Profits Wallet</template>
          <template #content>
            <p class="text-2xl font-bold text-blue-600">$1,200</p>
            <p class="text-xs text-gray-500">Monthly + Total profits</p>
          </template>
        </Card>

        <!-- VX Wallet -->
        <Card class="shadow-md">
          <template #title>VX Wallet</template>
          <template #content>
            <p class="text-2xl font-bold text-purple-600">$780</p>
            <p class="text-xs text-gray-500">Commissions & rewards</p>
          </template>
        </Card>

        <!-- Top-Up -->
        <Card class="shadow-md flex flex-col justify-between">
          <template #title>Top-Up</template>
          <template #content>
            <p class="text-xs text-gray-500">10x rule investment boost</p>
          </template>
          <template #footer>
            <Button label="Add Funds" class="w-full" />
          </template>
        </Card>
      </div>
    </div>

    <!-- ===== Charts Section ===== -->
    <div>
      <h2 class="text-xl font-bold mb-4">Charts</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <template #title>Investment Progress</template>
          <template #content>
            <Chart type="doughnut" :data="investChart" />
          </template>
        </Card>

        <Card>
          <template #title>VX Plan (10x Rule)</template>
          <template #content>
            <Chart type="line" :data="vxChart" />
          </template>
        </Card>
      </div>
    </div>


    <!-- ===== Portfolio Section ===== -->

  </div>
</template>

<script setup>


const portfolio = [
  { amount: 500, expected: 1500, progress: 40 },
  { amount: 1000, expected: 4200, progress: 25 },
  { amount: 2500, expected: 8000, progress: 60 },
]

const investChart = {
  labels: ["Invested", "Remaining"],
  datasets: [
    {
      data: [60, 40],
      backgroundColor: ["#22c55e", "#e5e7eb"],
    },
  ],
}

const vxChart = {
  labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
  datasets: [
    {
      label: "Earnings",
      data: [200, 450, 700, 1000],
      borderColor: "#6366f1",
      fill: false,
    },
  ],
}
</script>

