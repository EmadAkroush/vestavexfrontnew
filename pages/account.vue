<template>
  <div class="account">
    <div>
      <nuxt-link to="/">
        <span style="color: #405ff2"> صفحه اصلی / </span>
      </nuxt-link>
      <span> حساب کاربری </span>
    </div>
    <div>
      <h1>حساب کاربری</h1>
    </div>
    <div class="maincard grid grid-cols-1 sm:grid-cols-12 gap-4 sm:my-12 my-4">
      <div class="sm:col-span-3">
        <div
          class="max-w-xs mx-auto p-4 bg-white rounded-lg text-center border border-gray-200"
        >
          <div class="font-semibold">
            {{ authUser.name ? authUser.name : "بدون نام" }}
          </div>
          <div class="text-gray-700 mt-4">{{ authUser.cellphone }}</div>
          <div class="divide-y mt-4">
            <div class="py-2 flex justify-start items-center">
              <i
                class="mdi mdi-cart text-blue-500 mr-2"
                style="font-size: 25px"
              ></i>
              <span class="text-blue-500 cursor-pointer mr-3">سفارشات</span>
            </div>
            <div class="py-2 flex justify-start items-center">
              <i
                class="mdi mdi-account-outline text-gray-700 mr-2"
                style="font-size: 25px"
              ></i>
              <span class="text-gray-700 cursor-pointer mr-3">حساب کاربری</span>
            </div>
            <div class="py-2 flex justify-start items-center">
              <i
                class="mdi mdi-logout text-gray-700 mr-2"
                style="font-size: 25px"
              ></i>
              <span class="text-gray-700 cursor-pointer mr-3" @click="logout()"
                >خروج</span
              >
            </div>
          </div>
        </div>
      </div>
      <div class="sm:col-span-9">
        <div class="sm:p-6 bg-white">
          <h2 class="text-right text-2xl font-bold mb-8">تاریخچه سفارشات</h2>
          <div>
            <Tabs value="0" :scrollable="true">
              <TabList>
                <Tab value="0" class="flex items-center">
                  <p>در انتطار تایید</p>
                  <!-- <div
                    style="width: 25px; height: 25px; border-radius: 4px"
                    class="fold mr-3"
                  >
                    20
                  </div> -->
                  </Tab
                >
                <Tab value="1" class="flex items-center"
                  >  ارسال شده 
                  <!-- <div
                    style="width: 25px; height: 25px; border-radius: 4px"
                    class="fold mr-3"
                  >
                    20
                  </div> -->
                  </Tab
                >
             
                <Tab value="2" class="flex items-center"
                  >لغو شده
                  <!-- <div
                    style="width: 25px; height: 25px; border-radius: 4px"
                    class="fold mr-3"
                  >
                    20
                  </div> -->
                  </Tab
                >
              </TabList>
              <TabPanels>
                <TabPanel value="0">
               
                  <div >
                    <div v-if="product && product.length">
                    <div  v-for="(itemout, indexout) in product" :key="indexout">
                   
                      <div class="mt-4"  v-if="itemout.status == 'در حال پردازش'">
                       {{ itemout.created_at }}
                      <div class="grid gap-3 sm:grid-cols-3 grid-cols-1 mt-6">

                        <div v-for="(item, index) in itemout.order_items" :key="index">
                        <CardShop  :productdata="item"></CardShop>
                        </div>
                      </div>
                      </div>

                      </div>
                    </div>
                    <div v-else class="text-center text-gray-500">
                      هیچ سفارشی برای نمایش وجود ندارد.
                    </div>
                  </div>
           
                  <Paginator
                    :rows="10"
                    :totalRecords="120"
                    :rowsPerPageOptions="[10, 20, 30]"
                    class="mt-8"
                  ></Paginator>
                </TabPanel>
                <TabPanel value="1">
                  <div >
                    <div v-if="product && product.length">
                    <div  v-for="(itemout, indexout) in product" :key="indexout">
                   
                      <div class="mt-4"  v-if="itemout.status == 'ارسال شده'">
                       {{ itemout.created_at }}
                      <div class="grid gap-3 sm:grid-cols-3 grid-cols-1 mt-6">

                        <div v-for="(item, index) in itemout.order_items" :key="index">
                        <CardShop  :productdata="item"></CardShop>
                        </div>
                      </div>
                      </div>

                      </div>
                    </div>
                    <div v-else class="text-center text-gray-500">
                      هیچ سفارشی برای نمایش وجود ندارد.
                    </div>
                  </div>
           
                  <Paginator
                    :rows="10"
                    :totalRecords="120"
                    :rowsPerPageOptions="[10, 20, 30]"
                    class="mt-8"
                  ></Paginator>
                </TabPanel>
                <TabPanel value="2">
                  <div >
                    <div v-if="product && product.length">
                    <div  v-for="(itemout, indexout) in product" :key="indexout">
                   
                      <div class="mt-4"  v-if="itemout.status == 'کنسل شده'">
                       {{ itemout.created_at }}
                      <div class="grid gap-3 sm:grid-cols-3 grid-cols-1 mt-6">

                        <div v-for="(item, index) in itemout.order_items" :key="index">
                        <CardShop  :productdata="item"></CardShop>
                        </div>
                      </div>
                      </div>

                      </div>
                    </div>
                    <div v-else class="text-center text-gray-500">
                      هیچ سفارشی برای نمایش وجود ندارد.
                    </div>
                  </div>
           
                  <Paginator
                    :rows="10"
                    :totalRecords="120"
                    :rowsPerPageOptions="[10, 20, 30]"
                    class="mt-8"
                  ></Paginator>
                </TabPanel>
           
           
              
              </TabPanels>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});
const product = ref();

const { authUser } = useAuth();

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
    color: #405ff2;
    border-color: #405ff2 !important;
    .fold {
      background-color: #405ff2;
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
