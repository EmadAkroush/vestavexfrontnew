<template>
  <div class=" space-y-6">
    <h2 class="text-xl font-bold mb-4">Transaction History</h2>

    <Card class="shadow-md">
      <template #content>
        <DataTable
          :value="transactions"
          paginator
          :rows="5"
          stripedRows
          responsiveLayout="scroll"
          class="text-sm"
        >
          <Column field="date" header="Date" sortable></Column>
          <Column field="type" header="Type" sortable></Column>
          <Column field="amount" header="Amount" sortable></Column>
          <Column field="status" header="Status">
            <template #body="slotProps">
              <span
                class="px-2 py-1 text-xs font-semibold rounded-full"
                :class="{
                  'bg-green-100 text-green-700': slotProps.data.status === 'Completed',
                  'bg-yellow-100 text-yellow-700': slotProps.data.status === 'Pending',
                  'bg-red-100 text-red-700': slotProps.data.status === 'Failed',
                }"
              >
                {{ slotProps.data.status }}
              </span>
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>
  </div>
</template>

<script setup>
import Card from "primevue/card"
import DataTable from "primevue/datatable"
import Column from "primevue/column"

const transactions = [
  { date: "2025-09-01", type: "Cashout", amount: "$250", status: "Completed" },
  { date: "2025-08-15", type: "Top-Up", amount: "$500", status: "Completed" },
  { date: "2025-08-01", type: "Profit Payout", amount: "$120", status: "Completed" },
  { date: "2025-07-20", type: "Cashout", amount: "$300", status: "Pending" },
  { date: "2025-07-01", type: "Profit Payout", amount: "$100", status: "Completed" },
  { date: "2025-06-15", type: "Top-Up", amount: "$400", status: "Failed" },
]
</script>
