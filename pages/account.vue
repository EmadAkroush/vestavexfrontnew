<template>
  <div class="account">
    <div>
      <nuxt-link to="/">
        <span style="color: #0b6d20"> home/ </span>
      </nuxt-link>
      <span> account </span>
    </div>
    <div>
      <h1>account</h1>
    </div>
    <div class="maincard grid grid-cols-1 sm:grid-cols-12 gap-4 sm:my-12 my-4">
      <div class="sm:col-span-3">
        <div
          class="max-w-xs mx-auto p-4 bg-white rounded-lg text-center border border-gray-200"
        >
          <div class="font-semibold">
            <!-- {{ authUser.name ? authUser.name : "بدون نام" }} -->
          </div>
          <!-- <div class="text-gray-700 mt-4">{{ authUser.cellphone }}</div> -->
          <div class="divide-y mt-4">
            <div
              v-for="item in menuItems"
              :key="item.key"
              class="py-2 flex justify-start items-center cursor-pointer"
              :class="{ 'icon-color font-bold': activeItem === item.key }"
              @click="setActive(item.key)"
            >
              <i :class="item.icon + ' mr-2'" style="font-size: 25px"></i>
              <span class="text-gray-700 cursor-pointer mr-3">{{
                item.label
              }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="sm:col-span-9">
        <div class="sm:p-6 bg-white">
          <!-- نمایش داینامیک کامپوننت -->
          <component :is="currentComponent" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeItem: null,
    };
  },
  methods: {
    setActive(item) {
      this.activeItem = item;
    },
    logout() {
      console.log("خروج انجام شد");
    },
  },
};
</script>

<script setup>
import AccountPerformance from '@/components/account/performance.vue'
import AccountPortfolio from '@/components/account/portfolio.vue'
import AccountMybundles from '@/components/account/mybundles.vue'
import AccountCashout from '@/components/account/cashout.vue'
import AccountHistory from '@/components/account/history.vue'
import AccountSetting from '@/components/account/setting.vue'




// definePageMeta({
//   middleware: "auth",
// });
const menuItems = [
  { key: "performance", label: "Performance", icon: "mdi mdi-chart-bar" },
  { key: "portfolio", label: "Portfolio", icon: "mdi mdi-currency-usd" },
  {
    key: "mybundles",
    label: "My Bundles",
    icon: "mdi mdi-package-variant-closed",
  },
  { key: "cashout", label: "Cashout", icon: "mdi mdi-cash-minus" },
  { key: "history", label: "History", icon: "mdi mdi-history" },
  { key: "vxplan", label: "VX Plan", icon: "mdi mdi-family-tree" },
  { key: "setting", label: "Setting", icon: "mdi mdi-account-cog-outline" },
  { key: "logout", label: "Logout", icon: "mdi mdi-logout" },
];

const activeItem = ref("performance");
const setActive = (key) => (activeItem.value = key);

const currentComponent = computed(() => {
  switch (activeItem.value) {
    case "performance":
      return AccountPerformance;
    case "portfolio":
      return AccountPortfolio;
    case "mybundles":
      return AccountMybundles;
    case "cashout":
      return AccountCashout;
    case "history":
      return AccountHistory;
    case "accounthistory":
      return AccountVxPlan;
    case "setting":
      return AccountSetting;
    case "support":
      return AccountSupport;
    case "logout":
      return {
        template: `<div><p class="text-red-500">You have been logged out.</p></div>`,
      };
    default:
      return { template: `<div>Select an item from the menu.</div>` };
  }
});

const product = ref();

// const { authUser } = useAuth();

// async function getproduct(par) {
//   try {
//     let data = await $fetch("/api/account");
//     product.value = toRaw(data.data.orders);
//     console.log("product.value", product.value);
//   } catch (error) {
//     console.log(error);
//   } finally {
//     // this.product = toRaw(this.product);
//     console.log("pr", toRaw(this.product));
//   }
// }

// async function logout() {
//   const headers = useRequestHeaders(["cookie"]);

//   await useFetch("/api/auth/logout", {
//     method: "POST",
//     headers,
//   });

//   authUser.value = null;
//   return navigateTo("/");
// }

// onBeforeMount(() => {
//   getproduct();
// });
</script>

<style lang="scss">
.account {
  .icon-color {
    color: #0b6d20;
  }
  .p-tablist-next-button {
    transform: rotate(180deg);
  }
  .p-tablist-prev-button {
    transform: rotate(180deg);
  }
  .p-tabs {
    max-width: 100%;
    overflow-x: auto; /* Make sure horizontal scroll is enabled */
  }
  .p-tabs-nav > .p-tab {
    flex-shrink: 0;
    margin-right: 10px;
  }
  .p-tabs-nav {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
  }

  .p-tabs-nav .p-tab {
    flex-shrink: 0;
    white-space: nowrap;
  }
  .p-tab-active {
    color: #0b6d20;
    border-color: #0b6d20 !important;
    .fold {
      background-color: #0b6d20;
    }
  }
  .fold {
    background-color: #64748b;
    color: white;
  }
  .rightc {
    width: 100%;
  }
  .p-inputnumber-input {
    width: 40px;
  }
  h1 {
    font-size: 30px;
    margin-top: 10px;
  }
  box-sizing: border-box;
  padding: 10px 80px;
}
@media only screen and (max-width: 650px) {
  .account {
    padding: 10px 10px;
  }
}
</style>
