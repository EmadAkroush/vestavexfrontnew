<template>
  <div class="card my-menu">
    <Menubar :model="items" style="" class="navbarshop">
      <template #start>
        <div class="flex items-center w-0 sm:w-20">
          <img
            src="/public/home/logo.svg.png"
            alt=""
            style="width: 40px; height: 40px"
            class="sm:block hidden"
          />
          <div class="mr-10 sm:mr-0">
            <nuxt-link to="/account" >
              <div class="flex ml-3">
                <!-- <Badge
                  value="8"
                  size="small"
                  severity="success"
                  style="position: relative; top: 10px; right: 10px"
                ></Badge> -->
                <i
                  class="mdi mdi-account-circle-outline"
                  style="font-size: 40px"
                />
              </div>
            </nuxt-link>
            <!-- <nuxt-link to="/login" >
              <div
                class="btn flex items-center justify-center sm:ml-8"
                style="width: max-content"
              >
                <i
                  class="mdi mdi-login ml-1"
                  style="font-size: 22px; margin-top: 2px"
                />
                <sapn> ورود|ثبت نام </sapn>
              </div>
            </nuxt-link> -->
          </div>
        </div>
      </template>

      <template #item="{ item, props }">
        <router-link
          v-if="item.route"
          v-slot="{ href, navigate }"
          :to="item.route"
          custom
        >
          <a
            class="flex items-center"
            v-ripple
            :href="href"
            v-bind="props.action"
            @click="navigate"
          >
            <span :class="item.icon" ></span>
            <span class="mr-2">{{ item.label }}</span>
          </a>
        </router-link>
        <a
          v-else
          v-ripple
          :href="item.url"
          :target="item.target"
          v-bind="props.action"
        >
          <span :class="item.icon" ></span>
          <span class="ml-2">{{ item.label }}</span>
        </a>
      </template>
      <template #end>

      </template>
    </Menubar>
  </div>
</template>
<style lang="scss">
.my-menu {
  
  .navbarshop {
    padding: 1rem 1rem 1rem 1.5rem;
  }
  .btn {
    border: 1px solid #405ff2;
    width: 100%;
    padding: 0 4px;
    border-radius: 8px;
    color: #405ff2;
    font-size: 16px;
  }
  font-size: 18px;
  .p-menubar-end {
    margin-right: auto;
    margin-left: 0;
  }
  .p-menubar-root-list {
    justify-content: center;
    width: 100%;
    margin-right: 75px;
  }

}
@media only screen and (max-width: 600px) {
  .my-menu {
    .navbarshop {
      padding: 0.5rem 0.5rem 0.5rem 0.5rem;
    }
  }
}
</style>
<script setup>
import { useCartStore } from "../store/cart"
const cart = useCartStore();

// اجرای composable و واکنش‌پذیر سازی authUser
const { authUser } = useAuth();
const countCart = computed(() => cart.count)

// تعریف items به عنوان یک آرایه واکنش‌پذیر
const items = ref([
  {
    label: "home",
    route: "/",
  },
  {
    label: "Bundles",
    route: "/bundles",
  },
  {
    label: "Add Funds",
    route: "/blogs",
  },
  {
    label: "Aboute Us",
    route: "/",
  },
  {
    label: "Support",
    route: "/abouteus",
  },
]);

// تعریف متد test
function test() {
  console.log("ggg", authUser);
}
</script>
