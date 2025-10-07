<template>
  <div class="card my-menu">
    <Menubar :model="items" class="navbarshop">
      <!-- Logo -->
      <template #start>
        <div class="flex items-center w-0 sm:w-20">
          <img
            src="/public/Photo_1747641514372-3.png"
            alt="Logo"
            style="width: 40px; height: 40px"
            class="sm:block hidden"
          />
        </div>
      </template>

      <!-- Menu Items -->
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
            <i :class="item.icon" class="text-xl mr-2"></i>
            <span>{{ item.label }}</span>
          </a>
        </router-link>

        <a
          v-else
          v-ripple
          :href="item.url"
          :target="item.target"
          v-bind="props.action"
          class="flex items-center"
        >
          <i :class="item.icon" class="text-xl mr-2"></i>
          <span>{{ item.label }}</span>
        </a>
      </template>

      <!-- Profile Icon -->
      <template #end>
        <div class="mr-0 sm:mr-0">
          <nuxt-link to="/account">
            <div class="flex mr-4">
              <i class="mdi mdi-account-circle-outline" style="font-size: 40px" />
            </div>
          </nuxt-link>
        </div>
      </template>
    </Menubar>
  </div>
</template>

<script setup>
const items = ref([
  {
    label: "Home",
    route: "/",
    icon: "mdi mdi-home-outline", // خانه
  },
  {
    label: "Bundles",
    route: "/bundles",
    icon: "mdi mdi-package-variant-closed", // پکیج‌ها
  },
  {
    label: "Add Funds",
    route: "/addfunds",
    icon: "mdi mdi-wallet-plus-outline", // افزودن موجودی
  },
  {
    label: "About Us",
    route: "/abouteus",
    icon: "mdi mdi-information-outline", // درباره ما
  },
  {
    label: "Support",
    route: "/support",
    icon: "mdi mdi-lifebuoy", // پشتیبانی
  },
]);
</script>

<style lang="scss">
.my-menu {
  box-sizing: border-box;

  .navbarshop {
    padding: 1rem 1rem 1rem 1.5rem;
    background-color: #fff;
    border-radius: 12px;
  }

  font-size: 18px;

  .p-menubar-root-list {
    justify-content: center;
    width: 100%;
    margin-right: 75px;
  }

  i.mdi {
    color: #0b6d20;
    transition: 0.2s;
  }

  a:hover i.mdi {
    color: #14a33b;
  }
}

@media only screen and (max-width: 600px) {
  .my-menu {
    .navbarshop {
      padding: 0.5rem;
    }

    .p-menubar-root-list {
      margin-right: 0;
    }
  }
}
</style>
