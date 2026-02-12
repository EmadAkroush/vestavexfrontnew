<template>
  <div
    class="header-container relative z-10 max-w-6xl mx-auto text-center px-6"
  >
    <p class="eyebrow">{{ eyebrow }}</p>

    <h2 class="hero-title section-title">
      {{ title }}
    </h2>

    <p class="hero-sub">
      {{ subtitle }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  eyebrow: {
    type: String,
    default: "VXBUSINESS",
  },
  title: {
    type: String,
    default: "Investment Bundles",
  },
  subtitle: {
    type: String,
    default:
      "Select a bundle and grow your portfolio with confidence. Glass cards, subtle 3D particles and smooth micro-interactions.",
  },
});
</script>

<style scoped lang="scss">
/* header */
.header-container {
  padding-top: 6px;
}

.eyebrow {
  color: #a5b4fc;
  font-weight: 700;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  margin-bottom: 10px;
}

.hero-title {
  font-size: 2.25rem;
  line-height: 1.02;
  font-weight: 800;
  background: linear-gradient(90deg, #6366f1, #7c3aed, #c4b5fd);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  background-size: 200% 100%;
  animation: titleShift 6s linear infinite;
  margin-bottom: 10px;
  text-shadow: 0 6px 30px rgba(0, 0, 0, 0.6);
}

.hero-sub {
  color: #c7d2fe;
  max-width: 850px;
  margin: 0 auto;
}

/* title gradient animation */
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

/* responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: 1.8rem;
  }
}
</style>
