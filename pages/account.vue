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
              class="py-2 flex justify-start items-center"
              :class="{ 'icon-color font-bold': activeItem === 'performance' }"
              @click="setActive('performance')"
            >
              <i class="mdi mdi-cart mr-2" style="font-size: 25px"></i>
              <span class="cursor-pointer mr-3">performance</span>
            </div>
            <div
              class="py-2 flex justify-start items-center"
              :class="{ 'icon-color font-bold': activeItem === 'Portfolio' }"
              @click="setActive('Portfolio')"
            >
              <i
                class="mdi mdi-account-outline text-gray-700 mr-2"
                style="font-size: 25px"
              ></i>
              <span class="text-gray-700 cursor-pointer mr-3"> Portfolio</span>
            </div>
            <div
              class="py-2 flex justify-start items-center"
              :class="{ 'icon-color font-bold': activeItem === 'myBundles' }"
              @click="setActive('myBundles')"
            >
              <i
                class="mdi mdi-account-outline text-gray-700 mr-2"
                style="font-size: 25px"
              ></i>
              <span class="text-gray-700 cursor-pointer mr-3"> myBundles</span>
            </div>
            <div
              class="py-2 flex justify-start items-center"
              :class="{ 'icon-color font-bold': activeItem === 'Cashout' }"
              @click="setActive('Cashout')"
            >
              <i
                class="mdi mdi-account-outline text-gray-700 mr-2"
                style="font-size: 25px"
              ></i>
              <span class="text-gray-700 cursor-pointer mr-3"> Cashout</span>
            </div>
            <div
              class="py-2 flex justify-start items-center"
              :class="{ 'icon-color font-bold': activeItem === 'History' }"
              @click="setActive('History')"
            >
              <i
                class="mdi mdi-account-outline text-gray-700 mr-2"
                style="font-size: 25px"
              ></i>
              <span class="text-gray-700 cursor-pointer mr-3"> History</span>
            </div>
            <div
              class="py-2 flex justify-start items-center"
              :class="{ 'icon-color font-bold': activeItem === 'VX Plan' }"
              @click="setActive('VX Plan')"
            >
              <i
                class="mdi mdi-account-outline text-gray-700 mr-2"
                style="font-size: 25px"
              ></i>
              <span class="text-gray-700 cursor-pointer mr-3"> VX Plan</span>
            </div>
            <div
              class="py-2 flex justify-start items-center"
              :class="{ 'icon-color font-bold': activeItem === 'Setting' }"
              @click="setActive('Setting')"
            >
              <i
                class="mdi mdi-account-outline text-gray-700 mr-2"
                style="font-size: 25px"
              ></i>
              <span class="text-gray-700 cursor-pointer mr-3"> Setting</span>
            </div>
            <div
              class="py-2 flex justify-start items-center"
              :class="{ 'icon-color font-bold': activeItem === 'Support' }"
              @click="setActive('Support')"
            >
              <i
                class="mdi mdi-account-outline text-gray-700 mr-2"
                style="font-size: 25px"
              ></i>
              <span class="text-gray-700 cursor-pointer mr-3"> Support</span>
            </div>
            <div
              class="py-2 flex justify-start items-center"
              :class="{ 'icon-color font-bold': activeItem === 'logout' }"
              @click="setActive('logout')"
            >
              <i
                class="mdi mdi-logout text-gray-700 mr-2"
                style="font-size: 25px"
              ></i>
              <span class="text-gray-700 cursor-pointer mr-3" @click="logout()"
                >logout</span
              >
            </div>
          </div>
        </div>
      </div>
      <div class="sm:col-span-9">
        <div class="sm:p-6 bg-white">tytyu</div>
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
// definePageMeta({
//   middleware: "auth",
// });
const product = ref();

// const { authUser } = useAuth();

async function getproduct(par) {
  try {
    let data = await $fetch("/api/account");
    product.value = toRaw(data.data.orders);
    console.log("product.value", product.value);
  } catch (error) {
    console.log(error);
  } finally {
    // this.product = toRaw(this.product);
    console.log("pr", toRaw(this.product));
  }
}

async function logout() {
  const headers = useRequestHeaders(["cookie"]);

  await useFetch("/api/auth/logout", {
    method: "POST",
    headers,
  });

  authUser.value = null;
  return navigateTo("/");
}

onBeforeMount(() => {
  getproduct();
});
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
