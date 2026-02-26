<template>
  <div
    class="min-h-screen bg-[#0F172A] flex items-center justify-center px-4 sm:px-6 relative overflow-hidden"
  >
    <!-- Background Gradient -->
    <div
      class="absolute inset-0 bg-gradient-to-b from-[#0F172A] via-[#111827] to-[#020617]"
    ></div>

    <!-- Glow Effects -->
    <div
      class="absolute w-[420px] h-[420px] bg-[#2563EB]/20 blur-[140px] -top-24 -left-24 rounded-full"
    ></div>
    <div
      class="absolute w-[360px] h-[360px] bg-[#7C3AED]/20 blur-[150px] bottom-0 right-0 rounded-full"
    ></div>

    <div
      class="relative z-10 w-full max-w-md p-8 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.7)] border border-[#C7D2FE]/10 backdrop-blur-xl bg-white/5 animate-fadeIn"
    >
      <!-- Title -->
      <h2
        class="text-3xl sm:text-2xl font-extrabold text-center mb-6 gradient-text"
      >
        Reset Password
      </h2>

      <!-- New Password -->

      <div class="password-wrapper mb-4">
        <InputText
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Password"
          class="auth-input"
        />
        <i
          :class="showPassword ? 'mdi mdi-eye-off' : 'mdi mdi-eye'"
          class="toggle-eye"
          @click="showPassword = !showPassword"
        ></i>
      </div>

      <!-- Confirm Password -->
    

      <div class="password-wrapper mb-4">
        <InputText
          v-model="confirmPassword"
          :type="showPasswordConfirm ? 'text' : 'password'"
          placeholder="Password"
          class="auth-input"
        />
        <i
          :class="showPasswordConfirm ? 'mdi mdi-eye-off' : 'mdi mdi-eye'"
          class="toggle-eye"
          @click="showPasswordConfirm = !showPasswordConfirm"
        ></i>
      </div>

      <!-- Error Message -->
      <p v-if="error" class="text-red-400 text-xs sm:text-sm mb-3">
        {{ error }}
      </p>

      <!-- Success Message -->
      <p v-if="success" class="text-emerald-400 text-xs sm:text-sm mb-3">
        {{ success }}
      </p>

      <!-- Submit Button -->
      <button @click="submit" class="submit-btn">Reset Password</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const password = ref("");
const confirmPassword = ref("");
const error = ref("");
const success = ref("");

const showPassword = ref(false);
const showPasswordConfirm = ref(false);

const submit = async () => {
  error.value = "";
  success.value = "";

  if (!password.value || !confirmPassword.value) {
    error.value = "Please fill all fields.";
    return;
  }

  if (password.value !== confirmPassword.value) {
    error.value = "Passwords do not match.";
    return;
  }

  const token = route.query.token;
  if (!token) {
    error.value = "Invalid or expired reset link.";
    return;
  }

  try {
    await $fetch("/api/auth/resetpassword", {
      method: "POST",
      body: {
        token,
        newPassword: password.value,
      },
    });

    success.value = "Your password has been reset successfully! Redirecting...";

    setTimeout(() => {
      navigateTo("/login");
    }, 1800);
  } catch (err) {
    error.value = err?.data?.message || "Something went wrong!";
  }
};
</script>

<style scoped>
/* Fade animation */

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(15px) scale(0.98);
  }
  100% {
    opacity: 1;
    transform: translateY(0px) scale(1);
  }
}
.animate-fadeIn {
  animation: fadeIn 0.7s ease;
}

/* Gradient Title */
.gradient-text {
  background: linear-gradient(90deg, #2563eb, #4f46e5, #7c3aed);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Input Style */
.form-input {
  width: 100%;
  margin-top: 6px;
  padding: 12px 14px;
  border-radius: 12px;
  background: rgba(199, 210, 254, 0.05);
  border: 1px solid rgba(199, 210, 254, 0.15);
  color: #e0e7ff;
  font-size: 14px;
  outline: none;
  transition: 0.3s;
}
.form-input::placeholder {
  color: rgba(199, 210, 254, 0.45);
}
.form-input:focus {
  border-color: #4f46e5;
  box-shadow: 0 0 12px rgba(79, 70, 229, 0.35);
  background: rgba(79, 70, 229, 0.08);
}

/* Button */
.submit-btn {
  width: 100%;
  margin-top: 8px;
  padding: 12px;
  border-radius: 14px;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #2563eb, #7c3aed);
  border: none;
  transition: all 0.25s ease;
  box-shadow: 0 10px 25px rgba(79, 70, 229, 0.35);
}
.submit-btn:hover {
  transform: translateY(-1px) scale(1.03);
  box-shadow: 0 14px 30px rgba(124, 58, 237, 0.45);
}

.password-wrapper {
  position: relative;
}

.password-wrapper .auth-input {
  padding-right: 40px;
}

.toggle-eye {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #ccc;
  font-size: 1.1rem;
  transition: color 0.2s;
}

.toggle-eye:hover {
  color: #00c6ae;
}

.auth-input {
  width: 100%;
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #fff;
  padding: 10px 16px;
  outline: none;
  transition: all 0.3s ease;
}
.auth-input:focus {
  border-color: #00c6ae;
  background: rgba(255, 255, 255, 0.1);
}

/* Mobile fine-tune */
@media (max-width: 360px) {
  input {
    font-size: 12px !important;
  }
  button {
    font-size: 13px !important;
  }
}
</style>
