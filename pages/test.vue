<template>
  <section class="bundles-wrapper">
    <BundlesThreeBackground />

    <BundlesHeader />

    <BundlesGrid
      :items="bundlesItems"
      @details="openDetails"
      @invest="openInvest"
    />

    <BundlesDetailsDialog
      v-model="visibleDetails"
      :bundle="selectedBundle"
      @invest="openInvest"
    />

    <BundlesInvestDialog
      v-model="visibleInvest"
      :bundle="selectedBundle"
    />
  </section>
</template>

<script setup>
import { ref } from "vue";


const visibleDetails = ref(false);
const visibleInvest = ref(false);
const selectedBundle = ref(null);

const bundlesItems = [ /* همون دیتا */ ];

function openDetails(bundle) {
  selectedBundle.value = bundle;
  visibleDetails.value = true;
}

function openInvest(bundle) {
  selectedBundle.value = bundle;
  visibleInvest.value = true;
}
</script>
