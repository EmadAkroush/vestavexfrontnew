<template>
  <section class="register-wrapper min-h-screen flex items-center justify-center relative overflow-hidden">
    <!-- BG Gradient + Glow -->
    <div class="absolute inset-0 register-glow" />

    <!-- Two-Column FULL WIDTH -->
    <div class="glass-container w-full min-h-screen relative z-10">

      <!-- RIGHT — IMAGE FULL AREA -->
      <div class="register-image">
        <img src="/public/SL-0212121-40670-68.jpg" class="w-full h-full object-cover" />
      </div>

      <!-- LEFT — FORM CENTERED -->
      <div class="flex items-center justify-center px-10 py-12 form-container">
        <div class="w-full max-w-md">
          <h2 class="text-center text-3xl font-bold bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] bg-clip-text text-transparent mb-3">
            Create Account
          </h2>

          <p class="text-[#C7D2FE] text-center text-sm mb-6">
            Register to access your VXBUSINESS dashboard
          </p>

          <!-- form -->
          <div class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="login-label">First Name</label>
                <input v-model="form.firstName" type="text" class="login-input" placeholder="John" />
              </div>
              <div>
                <label class="login-label">Last Name</label>
                <input v-model="form.lastName" type="text" class="login-input" placeholder="Doe" />
              </div>
            </div>

            <div>
              <label class="login-label">Email</label>
              <input v-model="form.email" type="email" class="login-input" placeholder="you@example.com" />
            </div>

            <div>
              <label class="login-label">Phone (optional)</label>
              <input v-model="form.cellphone" type="text" class="login-input" placeholder="09xxxxxxxxx" />
            </div>

            <div>
              <label class="login-label">Referral Code (optional)</label>
              <input v-model="form.referral" type="text" class="login-input" placeholder="Referral code" />
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="login-label">Password</label>
                <input v-model="form.password" type="password" class="login-input" placeholder="Minimum 6 characters" />
              </div>
              <div>
                <label class="login-label">Confirm Password</label>
                <input v-model="form.c_password" type="password" class="login-input" placeholder="Confirm password" />
              </div>
            </div>

            <!-- Terms -->
            <div class="flex items-start gap-3">
              <input id="agree" type="checkbox" v-model="agree" class="mt-1" />
              <label for="agree" class="text-sm text-[#C7D2FE]">
                I accept the Terms and Conditions.
              </label>
            </div>

            <!-- Errors -->
            <div v-if="errorsFront.length" class="text-red-400 text-sm leading-relaxed">
              <ul>
                <li v-for="(e, i) in errorsFront" :key="i">• {{ e }}</li>
              </ul>
            </div>

            <!-- Buttons -->
            <div class="flex flex-col gap-3">
              <button class="login-btn" :disabled="loading" @click="submit">
                <span v-if="!loading">Register</span>
                <span v-else>Processing...</span>
              </button>

              <div class="text-center mt-1 text-sm text-gray-400">
                Already have an account?
                <nuxt-link to="/login" class="text-[#4F46E5] font-semibold hover:underline ml-1">Login</nuxt-link>
                •
                <nuxt-link to="/forgot" class="text-[#4F46E5] font-semibold hover:underline ml-1">Forgot Password</nuxt-link>
                •
                <nuxt-link to="/verifyemail" class="text-[#4F46E5] font-semibold hover:underline ml-1">Verify Email</nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <Toast />
  </section>
</template>

<script setup>
definePageMeta({ middleware: "guest" });

import { reactive, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";

const router = useRouter();
const route = useRoute();
const toast = useToast();

const loading = ref(false);
const agree = ref(false);
const errorsFront = ref([]);

const form = reactive({
  firstName: "",
  lastName: "",
  email: "",
  cellphone: "",
  referral: "",
  password: "",
  c_password: "",
});

onMounted(() => {
  if (route.query.ref) {
    form.referral = String(route.query.ref);
  }
});

function validate() {
  errorsFront.value = [];

  if (!form.firstName.trim()) errorsFront.value.push("Please enter a valid first name.");
  if (!form.lastName.trim()) errorsFront.value.push("Please enter a valid last name.");

  if (!/^[\w.+-]+@[\w-]+\.[\w.-]+$/.test(form.email)) {
    errorsFront.value.push("Please enter a valid email address.");
  }

  if (form.cellphone && !/^09\d{9}$/.test(form.cellphone)) {
    errorsFront.value.push("Phone number must be 11 digits starting with 09.");
  }

  if (!form.password || form.password.length < 6) {
    errorsFront.value.push("Password must be at least 6 characters.");
  }

  if (form.password !== form.c_password) {
    errorsFront.value.push("Passwords do not match.");
  }

  if (!agree.value) {
    errorsFront.value.push("Please accept the Terms & Conditions.");
  }

  return errorsFront.value.length === 0;
}

async function submit() {
  if (!validate()) return;

  try {
    loading.value = true;

    const data = await $fetch("/api/auth/register", {
      method: "POST",
      body: { ...form },
    });

    toast.add({
      severity: "success",
      summary: "Registered Successfully",
      detail: data.message || "Your account has been created.",
      life: 3000,
    });

    setTimeout(() => {
      router.push("/verifyemail");
    }, 400);

  } catch (err) {
    errorsFront.value = [err?.data?.message || "Registration error"];
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped lang="scss">
.register-wrapper {
  background: linear-gradient(180deg, #0F172A 0%, #020617 60%, #030712 100%);
}

/* glow */
.register-glow {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 20% 10%, rgba(79,70,229,0.25), transparent 18%),
    radial-gradient(circle at 80% 80%, rgba(124,58,237,0.18), transparent 20%);
  filter: blur(70px);
  opacity: 0.7;
}

/* GRID FIX */
.glass-container {
  display: grid;
  grid-template-columns: 1fr; /* mobile */
  background: rgba(15, 23, 42, 0.75);
  border: 1px solid rgba(199, 210, 254, 0.1);
  backdrop-filter: blur(18px);
  box-shadow: 0 0 25px rgba(79,70,229,0.08);
}

@media (min-width: 768px) {
  .glass-container {
    grid-template-columns: 1fr 1fr;
  }
}

/* IMAGE */
.register-image {
  display: none;
}

@media (min-width: 768px) {
  .register-image {
    display: block;
    width: 100%;
    height: 100%;
    background: rgba(15,23,42,0.4);
  }
}

/* INPUTS */
.login-label {
  color: #C7D2FE;
  font-size: 13px;
  margin-bottom: 6px;
}

.login-input {
  width: 100%;
  background: rgba(15,23,42,0.9);
  border: 1px solid rgba(199,210,254,0.2);
  padding: 10px 12px;
  border-radius: 12px;
  color: #C7D2FE;
  transition: 0.25s;
}

.login-input:focus {
  border-color: #4F46E5;
  box-shadow: 0 0 12px rgba(79,70,229,0.25);
}

.login-btn {
  width: 100%;
  padding: 12px 0;
  background: linear-gradient(90deg, #2563EB, #4F46E5, #7C3AED);
  color: white;
  border-radius: 14px;
  font-weight: 700;
}
</style>
