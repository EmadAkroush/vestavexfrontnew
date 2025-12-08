<template>
  <section class="login-wrapper min-h-screen flex items-center justify-center relative overflow-hidden">

    <!-- BG Gradient + Glow -->
    <div class="absolute inset-0 login-glow"></div>

    <!-- Glass Card -->
    <div class="glass-card w-full max-w-md mx-auto px-8 py-10 relative z-10">

      <!-- Title -->
      <h2 class="text-center text-3xl font-bold bg-gradient-to-r from-green-300 to-teal-400 bg-clip-text text-transparent mb-6">
        User Login
      </h2>

      <!-- Subtitle -->
      <p class="text-gray-300 text-center text-sm mb-8">
        Sign in to access your VXBUSINESS account
      </p>

      <!-- Form -->
      <div class="space-y-5">
        
        <!-- Email -->
        <div>
          <label class="login-label">Email</label>
          <input
            v-model="formData.email"
            type="email"
            placeholder="example@mail.com"
            class="login-input"
          />
        </div>

        <!-- Password -->
        <div>
          <label class="login-label">Password</label>
          <input
            v-model="formData.password"
            type="password"
            placeholder="Enter password"
            class="login-input"
          />
        </div>

        <!-- Errors -->
        <div v-if="errorsfront.length" class="text-red-400 text-sm leading-relaxed">
          <ul>
            <li v-for="(e,i) in errorsfront" :key="i">• {{ e }}</li>
          </ul>
        </div>

        <!-- Login button -->
        <button
          class="login-btn"
          :disabled="loading"
          @click="login"
        >
          <span v-if="!loading">Login</span>
          <span v-else>Loading...</span>
        </button>

        <!-- LINKS -->
        <div class="flex items-center justify-between text-sm mt-4">
          <nuxt-link to="/register" class="text-green-300 hover:text-green-200 transition">Create Account</nuxt-link>
          <nuxt-link to="/forgot-password" class="text-green-300 hover:text-green-200 transition">Forgot Password?</nuxt-link>
        </div>

      </div>

    </div>

    <Toast />
  </section>
</template>
<style scoped lang="scss">

/* BACKGROUND */
.login-wrapper {
  background: linear-gradient(180deg, #071114 0%, #02110c 100%);
}

/* GLOW */
.login-glow {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 30% 20%, rgba(0,255,180,0.18), transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(0,200,255,0.15), transparent 55%);
  filter: blur(65px);
  opacity: 0.6;
}

/* GLASS CARD */
.glass-card {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.12);
  backdrop-filter: blur(18px);
  border-radius: 24px;
  box-shadow:
      0 0 25px rgba(0,255,200,0.08),
      inset 0 0 20px rgba(255,255,255,0.04);
}

/* LABEL */
.login-label {
  display: block;
  color: #b8eee0;
  font-size: 14px;
  margin-bottom: 6px;
}

/* INPUT */
.login-input {
  width: 100%;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.15);
  padding: 12px;
  border-radius: 14px;
  color: white;
  outline: none;
  transition: 0.3s;

  &:focus {
    border-color: #00ffbf;
    box-shadow: 0 0 12px rgba(0,255,200,0.25);
  }
}

/* BUTTON */
.login-btn {
  width: 100%;
  padding: 12px 0;
  background: linear-gradient(90deg, #00c78b, #00ffd0);
  color: #00221a;
  border-radius: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.25s;
  text-align: center;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(0,255,200,0.35);
  }

  &:disabled {
    opacity: 0.5;
    transform: none;
  }
}

/* MOBILE FIX */
@media (max-width: 650px) {
  .glass-card {
    margin: 0 18px;
    padding: 32px 24px;
  }
}
</style>
<script setup>
definePageMeta({
  middleware: "guest",
});

const loading = ref(false);
const errorsfront = ref([]);

const formData = reactive({
  email: "",
  password: "",
});

function validateForm() {
  errorsfront.value = [];

  if (!formData.email.includes("@")) {
    errorsfront.value.push("Email is not valid.");
  }

  if (formData.password.length < 6) {
    errorsfront.value.push("Password must be at least 6 characters.");
  }

  return errorsfront.value.length === 0;
}

async function login() {
  if (!validateForm()) return;

  try {
    loading.value = true;
    const user = await $fetch("/api/auth/login", {
      method: "POST",
      body: formData,
    });

    authUser.value = user;

    toast.add({
      severity: "success",
      summary: "Login Successful",
      detail: "Welcome back!",
      life: 3000,
    });

    return navigateTo("/");
  } catch (error) {
    errorsfront.value = Object.values(error?.data?.data || { error: ["Login failed"] }).flat();
  } finally {
    loading.value = false;
  }
}
</script>


