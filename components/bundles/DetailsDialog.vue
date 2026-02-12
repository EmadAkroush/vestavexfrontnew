<template>
  <Dialog
    v-model:visible="visible"
    modal
    :dismissableMask="true"
    :style="{ width: '95%', maxWidth: '520px' }"
    class="glass-dialog"
  >
    <!-- HEADER -->
    <div class="glass-header">
      <h3>{{ bundle?.title }} Bundle</h3>
      <p class="subtitle">Premium Investment Information</p>
    </div>

    <!-- CONTENT -->
    <div class="glass-content" v-if="bundle">
      <div class="info-row">
        <i class="mdi mdi-cash text-indigo-400"></i>
        <span class="label">Invest Range</span>
        <span class="value">
          {{ bundle.investedDown }} – {{ bundle.investedUp }}
        </span>
      </div>

      <div class="info-row">
        <i class="mdi mdi-bank-transfer text-indigo-400"></i>
        <span class="label">Min Withdrawal</span>
        <span class="value">{{ bundle.minimumwithdrawal }}</span>
      </div>

      <div class="info-row">
        <i class="mdi mdi-chart-line text-indigo-400"></i>
        <span class="label">Monthly Return</span>
        <span class="value">{{ bundle.earn }}</span>
      </div>

      <div class="info-row">
        <i class="mdi mdi-percent-outline text-indigo-400"></i>
        <span class="label">Max Cap</span>
        <span class="value">{{ bundle.maxcap }}%</span>
      </div>

      <!-- EXPLANATION -->
      <div class="explain-box">
        <h4>📌 Max Cap {{ bundle.maxcap }}%</h4>
        <p>
          The maximum earning limit for each bundle includes the total of:
        </p>
        <ul>
          <li>✔ Monthly returns from the bundle</li>
          <li>✔ Network earnings (Binary Income)</li>
        </ul>
        <p>
          Once your total profit reaches
          <strong>{{ bundle.maxcap }}%</strong> of your invested amount,
          the bundle has reached its cap and must be renewed.
        </p>
      </div>
    </div>

    <!-- FOOTER -->
    <template #footer>
      <div class="dialog-footer">
        <Button
          label="Close"
          class="p-button-text"
          @click="close"
        />
        <Button
          label="Invest Now"
          class="p-button-success"
          @click="invest"
        />
      </div>
    </template>
  </Dialog>
</template>

<script setup>
import { computed } from "vue";

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

const emit = defineEmits(["update:modelValue", "invest"]);

const visible = computed({
  get: () => props.modelValue,
  set: (v) => emit("update:modelValue", v),
});

function close() {
  visible.value = false;
}

function invest() {
  emit("invest", props.bundle);
  visible.value = false;
}
</script>

<style scoped lang="scss">
.glass-dialog .p-dialog-content {
  background: rgba(99, 102, 241, 0.08) !important;
  backdrop-filter: blur(22px);
  border-radius: 22px;
  padding: 0 !important;
}

.glass-header {
  padding: 24px 20px 10px;
  text-align: center;
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.35),
    rgba(139, 92, 246, 0.25)
  );
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 22px 22px 0 0;
}

.glass-header h3 {
  font-size: 26px;
  color: #818cf8;
  font-weight: 700;
}

.glass-header .subtitle {
  color: #c7d2fe;
  font-size: 14px;
}

.glass-content {
  padding: 22px;
}

.info-row {
  display: grid;
  grid-template-columns: 30px 1fr auto;
  align-items: center;
  padding: 12px 0;
  color: #e0e7ff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.info-row .label {
  color: #a5b4fc;
  font-size: 14px;
}

.info-row .value {
  font-weight: 600;
  color: #8b5cf6;
}

.explain-box {
  margin-top: 20px;
  background: rgba(99, 102, 241, 0.08);
  border: 1px solid rgba(139, 92, 246, 0.25);
  padding: 16px;
  border-radius: 14px;
}

.explain-box h4 {
  color: #a78bfa;
  margin-bottom: 6px;
}

.explain-box ul {
  margin: 8px 0;
  padding-left: 18px;
  color: #c7d2fe;
  font-size: 14px;
}

.dialog-footer {
  padding: 15px 20px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  background: rgba(99, 102, 241, 0.05);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0 0 22px 22px;
}
</style>
