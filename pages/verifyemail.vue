<template>
  <section class="min-h-screen flex items-center justify-center bg-[#020617] relative">

    <div class="absolute inset-0 opacity-30 bg-gradient-to-br from-blue-400/20 to-purple-500/10"></div>

    <div class="glass p-8 w-full max-w-md rounded-2xl relative z-10 text-center text-white">
      <h2 class="text-2xl font-bold mb-2">Verify Your Email</h2>
      <p class="text-gray-300 text-sm mb-6">
        A verification code was sent to your email.
      </p>

      <button
        class="verify-btn"
        @click="showModal = true"
      >
        Enter Verification Token
      </button>
    </div>

    <!-- MODAL -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
    >
      <div class="glass p-6 rounded-2xl w-full max-w-sm">
        <h3 class="text-xl font-bold text-center mb-4 text-white">
          Enter Token
        </h3>

        <input
          v-model="token"
          placeholder="Enter the code"
          class="token-input mb-4"
        />

        <div v-if="errors.length" class="text-red-400 text-sm mb-3">
          <ul>
            <li v-for="(e,i) in errors" :key="i">• {{ e }}</li>
          </ul>
        </div>

        <button
          class="verify-btn mb-3"
          @click="verify"
          :disabled="loading"
        >
          <span v-if="!loading">Verify</span>
          <span v-else>Checking...</span>
        </button>

        <button
          class="close-btn"
          @click="showModal = false"
        >
          Close
        </button>
      </div>
    </div>

    <Toast />
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";

const router = useRouter();
const toast = useToast();

const showModal = ref(true); // اول باز باشد
const token = ref("");
const loading = ref(false);
const errors = ref([]);

async function verify() {
  errors.value = [];

  if (token.value.trim().length < 4) {
    errors.value.push("Token must be at least 4 characters.");
    return;
  }

  try {
    loading.value = true;

    await $fetch("/api/auth/verifyemail", {
      method: "POST",
      body: { token: token.value },
    });

    toast.add({
      severity: "success",
      summary: "Verified",
      detail: "Your email is confirmed.",
      life: 3000,
    });

    router.push("/login");

  } catch (err) {
    errors.value = [err?.data?.message || "Invalid token"];
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.glass {
  background: rgba(20, 25, 45, 0.55);
  border: 1px solid rgba(120, 150, 255, 0.25);
  backdrop-filter: blur(20px);
  box-shadow: 0 0 30px rgba(80, 120, 255, 0.15);
}
.verify-btn {
  width: 100%;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  padding: 12px;
  color: #020617;
  border-radius: 14px;
  font-weight: bold;
  transition: 0.3s;
}
.verify-btn:hover {
  box-shadow: 0 0 18px rgba(99, 102, 241, 0.45);
  transform: translateY(-1px);
}
.close-btn {
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(120, 150, 255, 0.25);
  color: #e0e7ff;
  transition: 0.3s;
}
.close-btn:hover {
  background: rgba(99, 102, 241, 0.15);
}
.token-input {
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  background: rgba(30, 40, 80, 0.55);
  border: 1px solid rgba(120, 150, 255, 0.3);
  color: white;
  outline: none;
  transition: 0.3s;
}
.token-input:focus {
  border-color: #6366f1;
  box-shadow: 0 0 12px rgba(99, 102, 241, 0.35);
}
</style>
