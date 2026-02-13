<template>
  <section
    class="login-wrapper min-h-screen flex items-center justify-center relative overflow-hidden"
  >
    <!-- BG Gradient + Glow -->
    <div class="absolute inset-0 login-glow"></div>

    <!-- Glass Card -->
    <div class="glass-card w-full max-w-md mx-auto px-8 py-10 relative z-10">
      <!-- Title -->
      <h2
        class="text-center text-3xl font-bold bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] bg-clip-text text-transparent mb-6"
      >
        User Login
      </h2>

      <!-- Subtitle -->
      <p class="text-[#C7D2FE] text-center text-sm mb-8">
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
        <div
          v-if="errorsfront.length"
          class="text-red-400 text-sm leading-relaxed"
        >
          <ul>
            <li v-for="(e, i) in errorsfront" :key="i">• {{ e }}</li>
          </ul>
        </div>

        <!-- Login button -->
        <button class="login-btn" :disabled="loading" @click="login">
          <span v-if="!loading">Login</span>
          <span v-else>Loading...</span>
        </button>

        <!-- LINKS -->
        <div class="flex items-center justify-between text-sm mt-4">
          <nuxt-link
            to="/register"
            class="text-[#4F46E5] hover:text-[#7C3AED] transition"
            >Create Account</nuxt-link
          >
          <nuxt-link
            to="/forgot-password"
            class="text-[#4F46E5] hover:text-[#7C3AED] transition"
            >Forgot Password?</nuxt-link
          >
        </div>
      </div>
    </div>

    <Toast />
  </section>
</template>

<style scoped lang="scss">
/* BACKGROUND */
.login-wrapper {
  background: linear-gradient(180deg, #0F172A 0%, #020617 100%);
}

/* GLOW */
.login-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(
      circle at 30% 20%,
      rgba(79, 70, 229, 0.25),
      transparent 50%
    ),
    radial-gradient(circle at 80% 80%, rgba(124, 58, 237, 0.22), transparent 55%);
  filter: blur(65px);
  opacity: 0.6;
}

/* GLASS CARD */
.glass-card {
  background: rgba(15, 23, 42, 0.7);
  border: 1px solid rgba(199, 210, 254, 0.12);
  backdrop-filter: blur(18px);
  border-radius: 24px;
  box-shadow: 0 0 25px rgba(79, 70, 229, 0.12),
    inset 0 0 20px rgba(255, 255, 255, 0.03);
}

/* LABEL */
.login-label {
  display: block;
  color: #C7D2FE;
  font-size: 14px;
  margin-bottom: 6px;
}

/* INPUT */
.login-input {
  width: 100%;
  background: rgba(15, 23, 42, 0.9);
  border: 1px solid rgba(199, 210, 254, 0.2);
  padding: 12px;
  border-radius: 14px;
  color: #C7D2FE;
  outline: none;
  transition: 0.3s;

  &:focus {
    border-color: #4F46E5;
    box-shadow: 0 0 12px rgba(79, 70, 229, 0.35);
  }
}

/* BUTTON */
.login-btn {
  width: 100%;
  padding: 12px 0;
  background: linear-gradient(90deg, #2563EB, #4F46E5, #7C3AED);
  color: white;
  border-radius: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.25s;
  text-align: center;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(79, 70, 229, 0.45);
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
  } catch (error) {
    errorsfront.value = Object.values(
      error?.data?.data 
    ).flat();
  } finally {
    loading.value = false;
    window.location.reload();
  }
}
</script>
