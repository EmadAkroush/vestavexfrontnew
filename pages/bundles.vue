<template>
  <section class="bundles-wrapper relative overflow-hidden min-h-screen">
    <!-- 3D background canvas (full-bleed) -->
      <BundlesThreeBackground />

    <!-- soft radial glows -->
    <div class="glow glow-left" aria-hidden="true"></div>
    <div class="glow glow-right" aria-hidden="true"></div>

    <!-- header -->
    <div
      class="header-container relative z-10 max-w-6xl mx-auto text-center px-6"
    >
      <p class="eyebrow">VXBUSINESS</p>
      <h2 class="hero-title section-title">Investment Bundles</h2>
      <p class="hero-sub">
        Select a bundle and grow your portfolio with confidence. Glass cards,
        subtle 3D particles and smooth micro-interactions.
      </p>
    </div>

    <!-- grid -->
    <div class="grid-wrap relative z-10 max-w-7xl mx-auto px-6 mt-12">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <article
          v-for="(item, idx) in bundlesItems"
          :key="idx"
          class="bundle-card group"
          :data-index="idx"
          @mousemove="onCardPointer($event, $event.currentTarget)"
          @mouseleave="onCardLeave($event.currentTarget)"
        >
          <header class="card-head">
            <div class="badge">{{ item.title }}</div>
            <div class="earn">{{ item.earn }}</div>
          </header>

          <div class="card-body">
            <div class="row">
              <span>Invest range</span
              ><strong>{{ item.investedDown }} — {{ item.investedUp }}</strong>
            </div>
            <div class="row">
              <span>Min withdrawal</span
              ><strong>{{ item.minimumwithdrawal }}</strong>
            </div>
            <div class="row">
              <span>Max cap</span><strong>{{ item.maxcap }}%</strong>
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
            <button class="btn btn-outline" @click="openDialog(item)">
              Details
            </button>
            <button class="btn btn-primary" @click="openInvestDialog(item)">
              Invest Now
            </button>
          </footer>
        </article>
      </div>
    </div>

    <!-- dialogs (use your existing PrimeVue dialogs or replace) -->
    <Dialog
      v-model:visible="visibleDetails"
      modal
      :style="{ width: '95%', maxWidth: '520px' }"
      :dismissableMask="true"
      class="glass-dialog"
    >
      <div class="glass-header">
        <h3>{{ selectedBundle?.title }} Bundle</h3>
        <p class="subtitle">Premium Investment Information</p>
      </div>

      <div class="glass-content">
        <!-- Row -->
        <div class="info-row">
          <i class="mdi mdi-cash text-green-400"></i>
          <span class="label">Invest Range</span>
          <span class="value"
            >{{ selectedBundle.investedDown }} –
            {{ selectedBundle.investedUp }}</span
          >
        </div>

        <div class="info-row">
          <i class="mdi mdi-bank-transfer text-green-400"></i>
          <span class="label">Min Withdrawal</span>
          <span class="value">{{ selectedBundle.minimumwithdrawal }}</span>
        </div>

        <div class="info-row">
          <i class="mdi mdi-chart-line text-green-400"></i>
          <span class="label">Monthly Return</span>
          <span class="value">{{ selectedBundle.earn }}</span>
        </div>

        <div class="info-row">
          <i class="mdi mdi-percent-outline text-green-400"></i>
          <span class="label">Max Cap</span>
          <span class="value">{{ selectedBundle.maxcap }}%</span>
        </div>

        <!-- EXPLANATION BOX -->
        <!-- EXPLANATION BOX -->
        <div class="explain-box">
          <h4>📌 Max Cap 300%</h4>
          <p>
            The maximum earning limit for each bundle includes the total of:
          </p>
          <ul>
            <li>✔ Monthly returns from the bundle</li>
            <li>✔ Network earnings (Binary Income)</li>
          </ul>
          <p>
            This means once your total profit reaches <strong>300%</strong> of
            your invested amount, the bundle has reached its cap and must be
            renewed.
          </p>
        </div>
      </div>

      <!-- FOOTER -->
      <template #footer>
        <div class="dialog-footer">
          <Button
            label="Close"
            class="p-button-text"
            @click="visibleDetails = false"
          />
          <Button
            label="Invest Now"
            class="p-button-success"
            @click="openInvestDialog(selectedBundle)"
          />
        </div>
      </template>
    </Dialog>

    <Dialog
      v-model:visible="visibleInvest"
      modal
      :header="'Invest in ' + (selectedBundle?.title || '')"
    >
      <div class="space-y-3">
        <label>Amount (USD)</label>
        <InputNumber
          v-model="investAmount"
          mode="currency"
          currency="USD"
          locale="en-US"
          class="w-full"
        />
        <Dropdown
          v-model="selectedPayment"
          :options="paymentMethods"
          optionLabel="label"
        />
      </div>
      <template #footer>
        <div class="flex justify-end gap-3">
          <Button
            label="Cancel"
            class="p-button-text"
            @click="visibleInvest = false"
          />
          <Button
            label="Confirm"
            class="p-button-success"
            @click="confirmInvestment"
          />
        </div>
      </template>
    </Dialog>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";





let gsap; // module reference

// UI state (dialogs etc.)
const visibleDetails = ref(false);
const visibleInvest = ref(false);
const selectedBundle = ref(null);
const investAmount = ref(null);
const selectedPayment = ref(null);

const paymentMethods = [
  { label: "Crypto (USDT / BTC / ETH)", value: "crypto" },
  { label: "Card", value: "card" },
  { label: "Bank", value: "bank" },
];

const bundlesItems = [
  {
    title: "Bronze",
    investedDown: "$50",
    investedUp: "$249",
    minimumwithdrawal: "$50",
    earn: "3% / month",
    maxcap: 300,
  },
  {
    title: "Silver",
    investedDown: "$250",
    investedUp: "$499",
    minimumwithdrawal: "$50",
    earn: "3.5% / month",
    maxcap: 300,
  },
  {
    title: "Gold",
    investedDown: "$500",
    investedUp: "$999",
    minimumwithdrawal: "$50",
    earn: "4% / month",
    maxcap: 300,
  },
  {
    title: "Platinum",
    investedDown: "$1,000",
    investedUp: "$2,499",
    minimumwithdrawal: "$1,000",
    earn: "4.5% / month",
    maxcap: 300,
  },
  {
    title: "Diamond",
    investedDown: "$2,500",
    investedUp: "$4,999",
    minimumwithdrawal: "$50",
    earn: "5% / month",
    maxcap: 300,
  },
  {
    title: "Titanium",
    investedDown: "$5,000",
    investedUp: "and more",
    minimumwithdrawal: "$50",
    earn: "6% / month",
    maxcap: 300,
  },
];

const normalize = (value) => Math.min(100, Math.round((value / 300) * 100));

function openDialog(item) {
  selectedBundle.value = item;
  visibleDetails.value = true;
}
function openInvestDialog(item) {
  selectedBundle.value = item;
  visibleInvest.value = true;
}
function confirmInvestment() {
  if (!investAmount.value || !selectedPayment.value) {
    alert("Please enter amount and select payment method");
    return;
  }
  alert(`Invested ${investAmount.value} in ${selectedBundle.value.title}`);
  visibleInvest.value = false;
}


/* ---------- GSAP card hover micro-interactions (dynamic import) ---------- */
async function enableGSAP() {
  const mod = await import("gsap");
  gsap = mod.default || mod;
  // add simple hover scale/shadow handled in CSS + small gsap tweak on enter
  const cards = Array.from(document.querySelectorAll(".bundle-card"));
  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      gsap.to(card, { scale: 1.03, duration: 0.35, ease: "power3.out" });
    });
    card.addEventListener("mouseleave", () => {
      gsap.to(card, { scale: 1, duration: 0.5, ease: "power3.out" });
      gsap.to(card.querySelector(".card-body"), {
        x: 0,
        y: 0,
        rotationX: 0,
        rotationY: 0,
        duration: 0.6,
        ease: "power3.out",
      });
    });
  });
}

/* ---------- pointer tilt effect (DIY, light) ---------- */
function onCardPointer(e, el) {
  // compute relative pointer on card
  const rect = el.getBoundingClientRect();
  const px = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 .. 0.5
  const py = (e.clientY - rect.top) / rect.height - 0.5;
  const rx = -py * 6; // rotateX
  const ry = px * 8; // rotateY
  el.style.transform = `perspective(900px) translateZ(0) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
  el.style.transition = "transform 0.08s linear";
}

function onCardLeave(el) {
  el.style.transform = "";
  el.style.transition = "transform 0.45s cubic-bezier(.2,.9,.25,1)";
}

onMounted(async () => {


  // enable GSAP interactions without blocking render (dynamic import)
  try {
    await enableGSAP();
  } catch (e) {
    // fine if no GSAP — fallback to CSS hover
  
  }

  window.addEventListener("resize", onResize);
});


</script>

<style scoped lang="scss">
/* root section */
/* ---- GLASS CARD DIALOG ---- */
.glass-dialog .p-dialog-content {
  background: rgba(255, 255, 255, 0.08) !important;
  backdrop-filter: blur(22px);
  border-radius: 22px;
  padding: 0 !important;
}

/* HEADER */
.glass-header {
  padding: 24px 20px 10px;
  text-align: center;
  background: linear-gradient(
    135deg,
    rgba(0, 255, 190, 0.25),
    rgba(0, 255, 130, 0.15)
  );
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 22px 22px 0 0;
}

.glass-header h3 {
  font-size: 26px;
  color: #00ffc3;
  font-weight: 700;
}

.glass-header .subtitle {
  color: #e0e0e0;
  font-size: 14px;
}

/* CONTENT */
.glass-content {
  padding: 22px;
}

.info-row {
  display: grid;
  grid-template-columns: 30px 1fr auto;
  align-items: center;
  padding: 12px 0;
  color: #e6e6e6;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.info-row .label {
  color: #bfbfbf;
  font-size: 14px;
}

.info-row .value {
  font-weight: 600;
  color: #00ffbf;
}

/* Explanation Box */
.explain-box {
  margin-top: 20px;
  background: rgba(0, 255, 180, 0.06);
  border: 1px solid rgba(0, 255, 180, 0.15);
  padding: 16px;
  border-radius: 14px;
}

.explain-box h4 {
  color: #00ffc3;
  margin-bottom: 6px;
}

.explain-box ul {
  margin: 8px 0;
  padding-left: 18px;
  color: #dcdcdc;
  font-size: 14px;
}

/* FOOTER */
.dialog-footer {
  padding: 15px 20px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  background: rgba(255, 255, 255, 0.04);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0 0 22px 22px;
}

.bundles-wrapper {
  position: relative;
  min-height: 100vh;
  background: linear-gradient(180deg, #0e1513, #0c0f0e);
  z-index: 5; /* ✔ محتوا بالای canvas */
}

.three-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw !important;
  height: 100vh !important;
  pointer-events: none;
  z-index: 0;
}

.bundles-wrapper {
  position: relative;
  padding: 60px 0 100px;
  background: linear-gradient(180deg, #071114 0%, #06110f 40%, #020403 100%);
  color: #dbeee4;
  overflow: hidden;
}


/* soft static glows */
.glow {
  position: absolute;
  width: 480px;
  height: 480px;
  filter: blur(80px);
  opacity: 0.32;
  z-index: 0;
}
.glow-left {
  left: -8%;
  top: -6%;
  background: radial-gradient(circle, rgba(0, 255, 180, 0.14), transparent 40%);
}
.glow-right {
  right: -6%;
  bottom: -8%;
  background: radial-gradient(
    circle,
    rgba(60, 200, 255, 0.12),
    transparent 40%
  );
}

/* header */
.header-container {
  z-index: 10;
  padding-top: 6px;
}
.eyebrow {
  color: #7af3c7;
  font-weight: 700;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  margin-bottom: 10px;
}
.hero-title {
  font-size: 2.25rem;
  line-height: 1.02;
  font-weight: 800;
  background: linear-gradient(90deg, #66ffd0, #9ef7ff, #fff7ea);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  background-size: 200% 100%;
  animation: titleShift 6s linear infinite;
  margin-bottom: 10px;
  text-shadow: 0 6px 30px rgba(0, 0, 0, 0.6);
}
.hero-sub {
  color: #9adfc9;
  max-width: 850px;
  margin: 0 auto;
}

/* title animation */
@keyframes titleShift {
  0% {
    background-position: 0% 0%;
  }
  50% {
    background-position: 100% 0%;
  }
  100% {
    background-position: 0% 0%;
  }
}

/* grid */
.grid-wrap {
  z-index: 10;
}

/* card */
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
  transition: transform 0.35s cubic-bezier(0.2, 0.9, 0.25, 1),
    box-shadow 0.35s ease;
  will-change: transform;
}

/* head */
.card-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}
.badge {
  background: linear-gradient(90deg, #06c78a, #00ffd0 70%);
  color: #032b20;
  font-weight: 800;
  padding: 6px 12px;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 255, 190, 0.08);
}
.earn {
  color: #bfeee0;
  font-weight: 600;
  font-size: 0.95rem;
}

/* body rows */
.card-body .row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin: 10px 0;
  color: #bfeee0;
}
.card-body .row span {
  font-size: 0.88rem;
  color: #9adfc9;
}

/* progress */
.progress-wrap {
  margin-top: 12px;
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
  box-shadow: 0 6px 18px rgba(0, 255, 190, 0.12);
  transition: width 0.9s cubic-bezier(0.2, 0.9, 0.25, 1);
}
.progress-label {
  font-size: 12px;
  margin-top: 6px;
  color: #9adfc9;
}

/* footer buttons */
.card-foot {
  display: flex;
  gap: 10px;
  margin-top: 14px;
}
.btn {
  cursor: pointer;
  border-radius: 12px;
  padding: 10px 12px;
  font-weight: 700;
  border: none;
}
.btn-outline {
  background: transparent;
  color: #7af3c7;
  border: 1px solid rgba(122, 243, 199, 0.18);
}
.btn-primary {
  background: linear-gradient(90deg, #00c78b, #00ffd0);
  color: #00221a;
  box-shadow: 0 8px 20px rgba(0, 255, 190, 0.08);
}

/* dialog/primevue styling fallback */
.p-dialog .p-dialog-header {
  background: linear-gradient(90deg, #00b682, #00fcd1);
  color: white;
}

/* small screens */
@media (max-width: 768px) {
  .hero-title {
    font-size: 1.8rem;
  }
  .bundle-card {
    min-height: 220px;
    padding: 14px;
  }
}
</style>
