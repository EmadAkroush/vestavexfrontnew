<template>
  <article
    class="bundle-card"
    @mousemove="onMove"
    @mouseleave="onLeave"
  >
    <header class="card-head">
      <div class="badge">{{ item.title }}</div>
      <div class="earn">{{ item.earn }}</div>
    </header>

    <div class="card-body">
      <!-- rows -->
    </div>

    <footer class="card-foot">
      <button class="btn btn-outline" @click="$emit('details')">Details</button>
      <button class="btn btn-primary" @click="$emit('invest')">Invest</button>
    </footer>
  </article>
</template>

<script setup>
defineProps({ item: Object });

function onMove(e) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5;
  const y = (e.clientY - r.top) / r.height - 0.5;
  el.style.transform = `perspective(900px) rotateX(${-y * 6}deg) rotateY(${x * 8}deg)`;
}

function onLeave(e) {
  e.currentTarget.style.transform = "";
}
</script>
