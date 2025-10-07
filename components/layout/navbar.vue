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
        <!-- اگر route دارد -->
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

        <!-- اگر آدرس مستقیم دارد -->
        <a
          v-else-if="item.url"
          v-ripple
          :href="item.url"
          :target="item.target"
          v-bind="props.action"
          class="flex items-center"
        >
          <i :class="item.icon" class="text-xl mr-2"></i>
          <span>{{ item.label }}</span>
        </a>

        <!-- اگر عملکرد خاص دارد (مثل Logout) -->
        <a
          v-else-if="item.command"
          v-ripple
          class="flex items-center text-red-600 hover:text-red-700"
          @click="item.command"
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
const logout = () => {
  // اینجا می‌تونی هر عملکرد خروجی داشته باشی (پاک کردن توکن، مسیر جدید، ...)
  alert('You have been logged out!')
  // مثلا:
  // localStorage.removeItem('token')
  // navigateTo('/login')
}

const items = ref([
  {
    label: "Home",
    route: "/",
    icon: "mdi mdi-home-outline",
  },
  {
    label: "Bundles",
    route: "/bundles",
    icon: "mdi mdi-package-variant-closed",
  },
  {
    label: "Add Funds",
    route: "/addfunds",
    icon: "mdi mdi-wallet-plus-outline",
  },
  {
    label: "About Us",
    route: "/abouteus",
    icon: "mdi mdi-information-outline",
  },
  {
    label: "Support",
    route: "/support",
    icon: "mdi mdi-lifebuoy",
  },
  {
    label: "Logout",
    icon: "mdi mdi-logout",
    command: logout, // عمل خروج
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

  /* رنگ متفاوت برای Logout */
  a.text-red-600 i.mdi {
    color: #e11d48;
  }
  a.text-red-600:hover i.mdi {
    color: #b91c1c;
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
