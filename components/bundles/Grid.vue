<template>
  <div class="grid-wrap relative z-10 max-w-7xl mx-auto px-6 mt-12">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <article
        v-for="(item, idx) in items"
        :key="idx"
        class="bundle-card group"
        @mousemove="onCardPointer($event, $event.currentTarget)"
        @mouseleave="onCardLeave($event.currentTarget)"
      >
        <header class="card-head">
          <div class="badge">{{ item.title }}</div>
          <div class="earn">{{ item.earn }}</div>
        </header>

        <div class="card-body">
          <div class="row">
            <span>Invest range</span>
            <strong>{{ item.investedDown }} — {{ item.investedUp }}</strong>
          </div>
          <div class="row">
            <span>Min withdrawal</span>
            <strong>{{ item.minimumwithdrawal }}</strong>
          </div>
          <div class="row">
            <span>Max cap</span>
            <strong>{{ item.maxcap }}%</strong>
          </div>

          <div class="progress-wrap">
            <div class="progress-bg">
              <div
                class="progress-fill"
                :style="{ width: normalize(item.maxcap) + '%' }"
              />
            </div>
            <div class="progress-label">{{ item.maxcap }}% cap</div>
          </div>
        </div>

        <footer class="card-foot">
          <button class="btn btn-outline" @click="$emit('details', item)">
            Details
          </button>
          <button class="btn btn-primary" @click="$emit('invest', item)">
            Invest Now
          </button>
        </footer>
      </article>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});

/* ---------- helpers ---------- */
const normalize = (value) =>
  Math.min(100, Math.round((value / 300) * 100));

/* ---------- pointer tilt ---------- */
function onCardPointer(e, el) {
  const rect = el.getBoundingClientRect();
  const px = (e.clientX - rect.left) / rect.width - 0.5;
  const py = (e.clientY - rect.top) / rect.height - 0.5;

  const rx = -py * 6;
  const ry = px * 8;

  el.style.transform = `
    perspective(900px)
    rotateX(${rx}deg)
    rotateY(${ry}deg)
    scale(1.02)
  `;
  el.style.transition = "transform 0.08s linear";
}

function onCardLeave(el) {
  el.style.transform = "";
  el.style.transition = "transform 0.45s cubic-bezier(.2,.9,.25,1)";
}

/* ---------- GSAP hover (optional) ---------- */
onMounted(async () => {
  try {
    const mod = await import("gsap");
    const gsap = mod.default || mod;

    document.querySelectorAll(".bundle-card").forEach((card) => {
      card.addEventListener("mouseenter", () => {
        gsap.to(card, { scale: 1.03, duration: 0.35, ease: "power3.out" });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(card, { scale: 1, duration: 0.45, ease: "power3.out" });
      });
    });
  } catch {
    /* GSAP optional */
  }
});
</script>

<style scoped lang="scss">
/* فقط استایل‌های مربوط به کارت */

.bundle-card {
  position: relative;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.03),
    rgba(255, 255, 255, 0.02)
  );
  border-radius: 18px;
  padding: 18px;
  min-height: 260px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6),
    inset 0 1px 0 rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.04);
  will-change: transform;
}

.card-head {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.badge {
  background: linear-gradient(90deg, #06c78a, #00ffd0 70%);
  color: #032b20;
  font-weight: 800;
  padding: 6px 12px;
  border-radius: 12px;
}

.earn {
  color: #bfeee0;
  font-weight: 600;
}

.card-body .row {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  color: #bfeee0;
}

.progress-bg {
  height: 12px;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 10px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #00ffd0, #2af7e0);
}

.card-foot {
  display: flex;
  gap: 10px;
  margin-top: 14px;
}

.btn {
  border-radius: 12px;
  padding: 10px 12px;
  font-weight: 700;
  border: none;
  cursor: pointer;
}

.btn-outline {
  background: transparent;
  color: #7af3c7;
  border: 1px solid rgba(122, 243, 199, 0.18);
}

.btn-primary {
  background: linear-gradient(90deg, #00c78b, #00ffd0);
  color: #00221a;
}
</style>

