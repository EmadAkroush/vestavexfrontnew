<template>
  <div class="account">
    <!-- Breadcrumb -->
    <div class="mb-4 text-sm">
      <nuxt-link to="/" class="text-green-700 font-semibold">Home /</nuxt-link>
      <span> Account </span>
    </div>

    <h1 class="text-2xl font-bold mb-4">Account</h1>

    <div class="maincard grid grid-cols-1 sm:grid-cols-12 gap-4 sm:my-12 my-4">
      <!-- Sidebar for Desktop -->
      <div class="hidden sm:block sm:col-span-3">
        <div class="max-w-xs mx-auto p-4 bg-white rounded-lg text-center border border-gray-200">
          <div class="divide-y mt-4">
            <div
              v-for="item in menuItems"
              :key="item.key"
              class="py-2 flex justify-start items-center cursor-pointer"
              :class="{ 'icon-color font-bold': activeItem === item.key }"
              @click="setActive(item.key)"
            >
              <i :class="item.icon + ' mr-2 text-xl'"></i>
              <span class="text-gray-700 cursor-pointer mr-3">{{ item.label }}</span>
            </div>

            <!-- Logout (Desktop Only) -->
            <!-- <div
              class="py-2 flex justify-start items-center cursor-pointer text-red-500 hover:text-red-600"
              @click="logout"
            >
              <i class="mdi mdi-logout mr-2 text-xl"></i>
              <span>Logout</span>
            </div> -->
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="sm:col-span-9">
        <div class="sm:p-6 bg-white rounded-lg shadow-sm min-h-[60vh]">
          <component :is="currentComponent" />
        </div>
      </div>
    </div>

    <!-- Bottom Navigation (Mobile) -->
    <div
      class="sm:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 flex justify-around items-center py-2 shadow-lg z-50"
    >
      <div
        v-for="item in menuItems"
        :key="item.key"
        class="flex flex-col items-center cursor-pointer text-gray-600"
        :class="{ 'text-green-700 font-semibold': activeItem === item.key }"
        @click="setActive(item.key)"
      >
        <i :class="item.icon" class="text-2xl"></i>
        <span class="text-xs mt-1">{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// ===== Import Components =====
import AccountPerformance from '@/components/account/performance.vue'
import AccountPortfolio from '@/components/account/portfolio.vue'
import AccountCashout from '@/components/account/cashout.vue'
import AccountHistory from '@/components/account/history.vue'
import AccountSetting from '@/components/account/setting.vue'
import AccountVxPlan from '@/components/account/vxplan.vue'

// ===== Menu Items =====
const menuItems = ref([
  { key: 'performance', label: 'Performance', icon: 'mdi mdi-chart-bar' },
  { key: 'portfolio', label: 'Portfolio', icon: 'mdi mdi-currency-usd' },
  { key: 'cashout', label: 'Cashout', icon: 'mdi mdi-cash-minus' },
  { key: 'history', label: 'History', icon: 'mdi mdi-history' },
  { key: 'vxplan', label: 'VX Plan', icon: 'mdi mdi-family-tree' },
  { key: 'setting', label: 'Setting', icon: 'mdi mdi-account-cog-outline' },

])

// ===== Active Item =====
const activeItem = ref('performance')
const setActive = (key) => {
  activeItem.value = key
}

// ===== Dynamic Component Switch =====
const currentComponent = computed(() => {
  switch (activeItem.value) {
    case 'performance':
      return AccountPerformance
    case 'portfolio':
      return AccountPortfolio
    case 'cashout':
      return AccountCashout
    case 'history':
      return AccountHistory
    case 'vxplan':
      return AccountVxPlan
    case 'setting':
      return AccountSetting
    default:
      return {
        template: `<div class="text-center text-gray-500 py-10">Select an item from the menu.</div>`,
      }
  }
})

// ===== Logout Function =====
const logout = () => {
  alert('You have been logged out.')
}
</script>

<style lang="scss">
.account {
  .icon-color {
    color: #0b6d20;
  }

  h1 {
    font-size: 30px;
    margin-top: 10px;
  }

  box-sizing: border-box;
  padding: 10px 80px;

  // smooth transition when active item changes
  .text-green-700 {
    transition: color 0.2s ease;
  }
}

@media only screen and (max-width: 650px) {
  .account {
    padding: 10px 10px;
  }
}
</style>
