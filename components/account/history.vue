<template>
  <div class="history-page">
    <!-- Header -->
    <div class="header-section">
      <h2 class="page-title">Transaction History</h2>

      <div class="filters">
        <span class="p-input-icon-left">
          <i class="mdi mdi-magnify"></i>
          <InputText v-model="search" placeholder="Search..." />
        </span>

        <Dropdown
          v-model="selectedType"
          :options="typeOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="All Types"
        />

        <Dropdown
          v-model="selectedStatus"
          :options="statusOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="All Status"
        />

        <Calendar v-model="dateFrom" placeholder="From" showIcon />
        <Calendar v-model="dateTo" placeholder="To" showIcon />
      </div>
    </div>

    <!-- Table -->
    <Card class="main-card">
      <template #content>
        <DataTable
          :value="filteredTransactions"
          paginator
          :rows="6"
          responsiveLayout="scroll"
          stripedRows
          :rowHover="true"
        >
          <Column field="date" header="Date" sortable />

          <Column field="type" header="Type" sortable>
            <template #body="slotProps">
              <div class="type-cell">
                <i :class="typeIcon(slotProps.data.type)"></i>
                <span>{{ slotProps.data.type }}</span>
              </div>
            </template>
          </Column>

          <Column field="amount" header="Amount" sortable>
            <template #body="slotProps">
              <span class="amount-text">
                {{ slotProps.data.amount }}
              </span>
            </template>
          </Column>

          <Column field="status" header="Status">
            <template #body="slotProps">
              <span
                :class="['status-badge', slotProps.data.status.toLowerCase()]"
              >
                {{ slotProps.data.status }}
              </span>
            </template>
          </Column>

          <Column header="Action">
            <template #body="slotProps">
              <Button
                icon="mdi mdi-eye-outline"
                class="view-btn"
                @click="showDetails(slotProps.data)"
              />
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>
    <!-- Modal -->
    <Dialog
      v-model:visible="visible"
      modal
      header="Transaction Details"
      :style="{
        color: '#C7D2FE',
        borderRadius: '16px',
        border: '1px solid #4F46E5',
      }"
    >
      <div
        v-if="selectedTx"
        style="
          color: #535a60;
          line-height: 1.6;
          font-size: 14px;
          padding: 12px 0;
        "
        class="modal-content"
      >
        <p><strong>Date:</strong> {{ selectedTx.date }}</p>
        <p><strong>Type:</strong> {{ selectedTx.type }}</p>
        <p>
          <strong>Amount:</strong>
          <span style="color: #2563eb; font-weight: 600">{{
            selectedTx.amount
          }}</span>
        </p>
        <p><strong>Status:</strong> {{ selectedTx.status }}</p>
        <p><strong>Transaction ID:</strong> {{ selectedTx.id }}</p>
        <p><strong>Details:</strong> {{ selectedTx.details }}</p>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useToast } from "primevue/usetoast";
import Card from "primevue/card";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import Calendar from "primevue/calendar";

const toast = useToast();
const { authUser } = useAuth();

// --- Data
const transactions = ref([]);
const loading = ref(true);

// --- Fetch Transactions
onMounted(async () => {
  try {
    if (!authUser.value?.user?.id) return;

    const res = await $fetch("/api/transactions/my", {
      method: "POST",
      body: {
        userId: authUser.value.user.id,
      },
    });

    // 🔁 Map backend → UI
    transactions.value = res.map((tx) => ({
      id: tx._id,
      date: formatDate(tx.createdAt),
      type: mapType(tx.type),
      amount: `$${tx.amount}`,
      status: capitalize(tx.status),
      details: tx.note || "-",
    }));
  } catch (e) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Failed to load transactions",
      life: 3000,
    });
  } finally {
    loading.value = false;
  }
});

// --- Filters & Search
const search = ref("");
const selectedType = ref(null);
const selectedStatus = ref(null);
const dateFrom = ref(null);
const dateTo = ref(null);

const typeOptions = [
  { label: "Binary Profit", value: "binary-profit" },
  { label: "Vx Code Activation", value: "vx-code-activation" },
  { label: "Investment Upgrade", value: "investment-upgrade" },
  { label: "Cashout", value: "Cashout" },
  { label: "Top-Up", value: "Top-Up" },
  { label: "Profit Payout", value: "Profit Payout" },
  { label: "Investment", value: "Investment" },
];

const statusOptions = [
  { label: "Completed", value: "Completed" },
  { label: "Pending", value: "Pending" },
  { label: "Failed", value: "Failed" },
];

// --- Filtering Logic
const filteredTransactions = computed(() => {
  return transactions.value.filter((tx) => {
    const matchesSearch =
      !search.value ||
      tx.type.toLowerCase().includes(search.value.toLowerCase()) ||
      tx.amount.toLowerCase().includes(search.value.toLowerCase());

    const matchesType = !selectedType.value || tx.type === selectedType.value;
    const matchesStatus =
      !selectedStatus.value || tx.status === selectedStatus.value;

    const txDate = new Date(tx.date);
    const matchesDate =
      (!dateFrom.value || txDate >= new Date(dateFrom.value)) &&
      (!dateTo.value || txDate <= new Date(dateTo.value));

    return matchesSearch && matchesType && matchesStatus && matchesDate;
  });
});

// --- Helpers
const typeIcon = (type) => {
  switch (type) {
    case "Cashout":
      return "mdi mdi-wallet-outline text-green-600";
    case "Top-Up":
      return "mdi mdi-arrow-up-bold-circle-outline text-blue-500";
    case "Profit Payout":
      return "mdi mdi-chart-line text-purple-500";
    case "Investment":
      return "mdi mdi-briefcase-outline text-indigo-500";
    default:
      return "mdi mdi-cash";
  }
};

const statusClass = (status) => ({
  "bg-green-100 text-green-700": status === "Completed",
  "bg-yellow-100 text-yellow-700": status === "Pending",
  "bg-red-100 text-red-700": status === "Failed",
});

// --- Modal
const visible = ref(false);
const selectedTx = ref(null);

const showDetails = (tx) => {
  selectedTx.value = tx;
  visible.value = true;
};

// --- Utils
function formatDate(date) {
  return new Date(date).toISOString().split("T")[0];
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function mapType(type) {
  switch (type) {
    case "withdraw":
      return "Cashout";
    case "topup":
      return "Top-Up";
    case "profit":
      return "Profit Payout";
    case "investment":
      return "Investment";
    default:
      return type;
  }
}
</script>

<style scoped lang="scss">
/* ===== Page Background ===== */
.history-page {
  padding: 40px;
  min-height: 100vh;
}

/* ===== Header ===== */
.header-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
}

.page-title {
  font-size: 24px;
  font-weight: 700;
  color: #c7d2fe;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

/* ===== Card ===== */
.main-card {
  border-radius: 18px;
  border: 1px solid #2563eb;
  background: #0f172a;
  box-shadow: 0 10px 30px rgba(37, 99, 235, 0.2);
}

/* ===== Table Background FULL FIX ===== */
::v-deep(.p-datatable),
::v-deep(.p-datatable-wrapper),
::v-deep(.p-datatable-table),
::v-deep(.p-datatable-tbody),
::v-deep(.p-datatable-thead) {
  background: #0f172a !important;
  color: #c7d2fe !important;
}
/* ===== Table Hover Soft ===== */
::v-deep(.p-datatable-tbody > tr:hover) {
  background: rgba(37, 99, 235, 0.12) !important; /* #2563EB با opacity کم */
  color: #c7d2fe !important;
}

/* ===== Table Header ===== */
::v-deep(.p-datatable-thead > tr > th) {
  background: #4f46e5 !important;
  color: white !important;
  font-weight: 600;
  border: none !important;
}

/* ===== Table Rows ===== */
::v-deep(.p-datatable-tbody > tr) {
  background: #0f172a !important;
}

/* ===== Pagination ===== */
::v-deep(.p-paginator) {
  background: #0f172a !important;
  border: none;
}

::v-deep(.p-paginator .p-paginator-page) {
  color: #c7d2fe !important;
}

::v-deep(.p-paginator .p-paginator-page.p-highlight) {
  background: #7c3aed !important;
  color: white !important;
  border-radius: 8px;
}

/* ===== Inputs FULL FIX ===== */
::v-deep(.p-inputtext),
::v-deep(.p-dropdown),
::v-deep(.p-dropdown-label),
::v-deep(.p-calendar),
::v-deep(.p-inputnumber-input) {
  background: #0f172a !important;
  border: 1px solid #2563eb !important;
  color: #c7d2fe !important;
  border-radius: 10px;
}

/* Focus */
::v-deep(.p-inputtext:focus),
::v-deep(.p-dropdown.p-focus),
::v-deep(.p-calendar.p-focus) {
  border-color: #7c3aed !important;
  box-shadow: 0 0 0 2px #4f46e5 !important;
}

/* ===== Dropdown Panel ===== */
::v-deep(.p-dropdown-panel) {
  background: #0f172a !important;
  border: 1px solid #2563eb !important;
}

::v-deep(.p-dropdown-item) {
  color: #c7d2fe !important;
}

::v-deep(.p-dropdown-item:hover) {
  background: #2563eb !important;
  color: white !important;
}

/* ===== Calendar Panel ===== */
::v-deep(.p-datepicker) {
  background: #0f172a !important;
  border: 1px solid #2563eb !important;
}

::v-deep(.p-datepicker table td > span) {
  color: #c7d2fe !important;
}

::v-deep(.p-datepicker table td > span:hover) {
  background: #2563eb !important;
  color: white !important;
}

::v-deep(.p-datepicker table td > span.p-highlight) {
  background: #7c3aed !important;
  color: white !important;
}

/* Calendar Icon Button */
::v-deep(.p-datepicker-trigger) {
  background: #4f46e5 !important;
  border: none !important;
  color: white !important;
}

::v-deep(.p-datepicker-trigger:hover) {
  background: #7c3aed !important;
}

/* ===== Type Cell ===== */
.type-cell {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #c7d2fe;
}

/* ===== Amount ===== */
.amount-text {
  font-weight: 600;
  color: #2563eb;
}

/* ===== Status ===== */
.status-badge {
  padding: 6px 12px;
  font-size: 12px;
  border-radius: 20px;
  font-weight: 600;
}

.status-badge.completed {
  background: #2563eb;
  color: white;
}

.status-badge.pending {
  background: #7c3aed;
  color: white;
}

.status-badge.failed {
  background: #4f46e5;
  color: white;
}

/* ===== View Button ===== */
.view-btn {
  background: #2563eb;
  color: white;
  border-radius: 10px;
  border: none;
}

.view-btn:hover {
  background: #7c3aed;
  color: white;
}

/* ===== Dialog ===== */
::v-deep(.p-dialog),
::v-deep(.p-dialog-content) {
  background: #0f172a !important;
  color: #c7d2fe !important;
}

::v-deep(.p-dialog-header) {
  background: #4f46e5 !important;
  color: white !important;
}

.modal-content {
  color: #c7d2fe;
}

/* ===== Table Hover Soft ===== */
::v-deep(.p-datatable-tbody > tr:hover) {
  background: rgba(37, 99, 235, 0.12) !important; /* #2563EB با opacity کم */
  color: #c7d2fe !important;
}

.status-badge.finished {
  background: rgba(79, 70, 229, 0.15);
  color: #4f46e5;
  border: 1px solid #4f46e5;
}

.status-badge.skipped {
  background: rgba(79, 70, 229, 0.15);
  color: #c7d2fe;
  border: 1px solid #4f46e5;
}
</style>
