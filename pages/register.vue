<template>
  <section class="register-wrapper min-h-screen flex items-center justify-center relative overflow-hidden">
    <!-- BG Gradient + Glow -->
    <div class="absolute inset-0 register-glow" />

    <!-- Two-Column FULL WIDTH -->
    <div class="glass-container grid grid-cols-1 md:grid-cols-2 w-full min-h-screen relative z-10">


      <!-- RIGHT — IMAGE FULL AREA -->
      <div class="register-image hidden md:block">
        <img src="/SL_0212121_40670_54.jpg" class="w-full h-full object-cover" />
      </div>

      
      <!-- LEFT — FORM CENTERED -->
      <div class="flex items-center justify-center px-10 py-12">
        <div class="w-full max-w-md">
          <h2 class="text-center text-3xl font-bold bg-gradient-to-r from-green-300 to-teal-400 bg-clip-text text-transparent mb-3">
            Create Account
          </h2>

          <p class="text-gray-300 text-center text-sm mb-6">
            Register to access your Vestavex dashboard
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
              <label for="agree" class="text-sm text-gray-300">
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
                <nuxt-link to="/login" class="text-green-300 font-semibold hover:underline ml-1">Login</nuxt-link>
                •
                <nuxt-link to="/forgot" class="text-green-300 font-semibold hover:underline ml-1">Forgot Password</nuxt-link>
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

/* 🔥 Auto-fill referral code from query (?ref=XXXX) */
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

    const payload = { ...form };

    await $fetch("/api/auth/register", {
      method: "POST",
      body: payload,
    });

    toast.add({
      severity: "success",
      summary: "Registered Successfully",
      detail: "Your account has been created.",
      life: 3000,
    });

    router.push("/");
  } catch (err) {
    errorsFront.value = [err?.data?.message || "Registration error"];
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped lang="scss">

.glass-container {
  width: 100%;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(18px);
}

.register-image {
  width: 100%;
  height: 100%;
}

.register-wrapper {
  background: linear-gradient(180deg, #071114 0%, #02110c 60%, #04110e 100%);
}

/* subtle glow */
.register-glow {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 20% 10%, rgba(0,255,180,0.12), transparent 18%),
    radial-gradient(circle at 80% 80%, rgba(60,200,255,0.08), transparent 20%);
  filter: blur(70px);
  opacity: 0.7;
}

.glass-container {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(18px);
  box-shadow: 0 0 25px rgba(0,255,200,0.05);
}

/* INPUTS & LABELS */
.login-label {
  color: #c9efe4;
  font-size: 13px;
  margin-bottom: 6px;
}

.login-input {
  width: 100%;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.12);
  padding: 10px 12px;
  border-radius: 12px;
  color: #e6fff7;
  transition: 0.25s;
}

.login-input:focus {
  border-color: #00ffbf;
  box-shadow: 0 0 12px rgba(0,255,200,0.18);
}

/* BUTTON */
.login-btn {
  width: 100%;
  padding: 12px 0;
  background: linear-gradient(90deg, #00c78b, #00ffd0);
  color: #00221a;
  border-radius: 14px;
  font-weight: 700;
}

/* IMAGE SECTION */
.register-image {
  background: rgba(255,255,255,0.03);
}
</style>
