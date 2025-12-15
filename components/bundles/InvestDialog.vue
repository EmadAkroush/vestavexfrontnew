<template>
  <Dialog
    v-model:visible="visible"
    modal
    :header="`Invest in ${bundle?.title || ''}`"
    :style="{ width: '95%', maxWidth: '420px' }"
  >
    <div class="content space-y-4" v-if="bundle">
      <!-- Amount -->
      <div class="field">
        <label class="label">Amount (USD)</label>
        <InputNumber
          v-model="amount"
          mode="currency"
          currency="USD"
          locale="en-US"
          class="w-full"
          :min="minAmount"
        />
        <small class="hint">
          Min: {{ bundle.investedDown }}
        </small>
      </div>

      <!-- Payment Method -->
      <div class="field">
        <label class="label">Payment Method</label>
        <Dropdown
          v-model="payment"
          :options="paymentMethods"
          optionLabel="label"
          optionValue="value"
          placeholder="Select payment method"
          class="w-full"
        />
      </div>
    </div>

    <!-- FOOTER -->
    <template #footer>
      <div class="footer">
        <Button
          label="Cancel"
          class="p-button-text"
          @click="close"
        />
        <Button
          label="Confirm Investment"
          class="p-button-success"
          :disabled="!isValid"
          @click="confirm"
        />
      </div>
    </template>
  </Dialog>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  bundle: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["update:modelValue", "confirm"]);

const visible = computed({
  get: () => props.modelValue,
  set: (v) => emit("update:modelValue", v),
});

/* form state */
const amount = ref(null);
const payment = ref(null);

const paymentMethods = [
  { label: "Crypto (USDT / BTC / ETH)", value: "crypto" },
  { label: "Credit / Debit Card", value: "card" },
  { label: "Bank Transfer", value: "bank" },
];

/* reset on open */
watch(
  () => visible.value,
  (v) => {
    if (v) {
      amount.value = null;
      payment.value = null;
    }
  }
);

/* simple validation */
const isValid = computed(() => {
  return amount.value && payment.value;
});

/* min amount (optional parse) */
const minAmount = computed(() => {
  if (!props.bundle?.investedDown) return 0;
  return Number(props.bundle.investedDown.replace(/[^0-9]/g, ""));
});

function close() {
  visible.value = false;
}

function confirm() {
  emit("confirm", {
    bundle: props.bundle,
    amount: amount.value,
    payment: payment.value,
  });
  visible.value = false;
}
</script>

<style scoped lang="scss">
.content {
  padding: 12px 0;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.label {
  font-size: 14px;
  font-weight: 600;
  color: #c9f5e4;
}

.hint {
  font-size: 12px;
  color: #9adfc9;
}

.footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>
