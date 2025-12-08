<template>
  <header
    class="navbar-wrapper sticky top-0 z-50 backdrop-blur-xl bg-white/10 border-b border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
  >
    <div class="flex items-center justify-between px-6 sm:px-10 py-4">

      <!-- LOGO -->
      <div class="flex items-center gap-3">
        <img
          src=""
          class="w-11 h-11 rounded-xl shadow-lg ring-1 ring-white/40"
        />
        <span class="text-2xl font-extrabold bg-gradient-to-r from-green-300 to-green-600 text-transparent bg-clip-text tracking-wide">
          VXBUSINESS
        </span>
      </div>

      <!-- DESKTOP MENU -->
      <nav class="hidden md:flex items-center gap-8">
        <router-link
          v-for="item in items"
          :key="item.label"
          :to="item.route"
          custom
          v-slot="{ navigate, href }"
        >
          <a
            :href="href"
            @click="item.command ? item.command() : navigate()"
            class="relative text-[15px] font-medium transition-all duration-300 px-1 py-1"
            :class="[
              activeRoute === item.route
                ? 'text-green-400'
                : 'text-gray-600 hover:text-green-300'
            ]"
          >
            <span class="flex gap-2 items-center">
              <i :class="[item.icon, 'text-lg opacity-90']"></i>
              {{ item.label }}
            </span>

            <!-- ACTIVE INDICATOR -->
            <span
              v-if="activeRoute === item.route"
              class="absolute bottom-[-6px] left-0 w-full h-[3px] rounded-full bg-gradient-to-r from-green-400 to-green-600 shadow-lg"
            ></span>
          </a>
        </router-link>
      </nav>

      <!-- PROFILE DROPDOWN (DESKTOP) -->
      <div class="relative hidden md:block">
        <button
          @click="profileOpen = !profileOpen"
          class="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 shadow-lg transition-all backdrop-blur-lg"
        >
          <i class="mdi mdi-account-circle text-3xl text-green-400"></i>
          <i class="mdi mdi-chevron-down text-gray-300"></i>
        </button>

        <transition name="fade">
          <div
            v-if="profileOpen"
            class="absolute right-0 mt-3 w-48 bg-[#0d0d0d] border border-white/10 shadow-2xl rounded-2xl py-3 backdrop-blur-xl"
          >
            <nuxt-link
              to="/account"
              class="px-4 py-2 block text-gray-200 hover:bg-white/10 rounded-lg transition flex items-center gap-2"
            >
              <i class="mdi mdi-view-dashboard-outline text-green-400"></i>
              Dashboard
            </nuxt-link>

            <button
              @click="logout"
              class="w-full text-left px-4 py-2 text-red-400 hover:bg-red-500/10 rounded-lg transition flex items-center gap-2"
            >
              <i class="mdi mdi-logout"></i>
              Logout
            </button>
          </div>
        </transition>
      </div>

      <!-- MOBILE MENU BUTTON -->
      <button
        class="md:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-md transition"
        @click="mobileMenu = !mobileMenu"
      >
        <i class="mdi mdi-menu text-2xl text-gray-200"></i>
      </button>
    </div>

    <!-- MOBILE DROPDOWN -->
    <transition name="slide">
      <nav
        v-if="mobileMenu"
        class="md:hidden bg-black/60 backdrop-blur-xl border-t border-white/10 px-4 py-5 space-y-2"
      >
        <!-- MENU ITEMS -->
        <router-link
          v-for="item in items"
          :key="item.label"
          :to="item.route"
          custom
          v-slot="{ navigate, href }"
        >
          <a
            :href="href"
            @click="navigate(); mobileMenu = false"
            class="flex items-center gap-3 py-3 px-4 rounded-xl transition-all bg-white/5 text-gray-100 hover:bg-white/10"
          >
            <i :class="[item.icon, 'text-xl opacity-80']"></i>
            {{ item.label }}
          </a>
        </router-link>

        <!-- 🔥 PROFILE OPTIONS FOR MOBILE -->
        <div class="pt-4 border-t border-white/10 flex flex-col gap-2">
          <nuxt-link
            to="/account"
            class="flex items-center gap-3 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 transition text-gray-100"
            @click="mobileMenu = false"
          >
            <i class="mdi mdi-view-dashboard-outline text-green-400 text-xl"></i>
            Dashboard
          </nuxt-link>

          <button
            class="flex items-center gap-3 py-3 px-4 rounded-xl bg-red-500/10 hover:bg-red-500/20 transition text-red-300"
            @click="logout"
          >
            <i class="mdi mdi-logout text-xl"></i>
            Logout
          </button>
        </div>
      </nav>
    </transition>
  </header>
</template>

<script setup>
import { ref, computed } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()
const activeRoute = computed(() => route.path)

const profileOpen = ref(false)
const mobileMenu = ref(false)

const logout = () => {
  alert("Logged out")
}

const items = ref([
  { label: "Home", route: "/", icon: "mdi mdi-home-outline" },
  { label: "Bundles", route: "/bundles", icon: "mdi mdi-package-variant-closed" },
  { label: "Add Funds", route: "/addfunds", icon: "mdi mdi-wallet-plus-outline" },
  { label: "About Us", route: "/abouteus", icon: "mdi mdi-information-outline" },
  { label: "Support", route: "/support", icon: "mdi mdi-lifebuoy" },
])
</script>

<style scoped lang="scss">

.navbar-wrapper {
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
