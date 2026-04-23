<template>
  <section
    class="login-wrapper min-h-screen flex items-center justify-center relative overflow-hidden"
  >
    <!-- BG Gradient + Glow -->
    <div class="absolute inset-0 login-glow"></div>

    <!-- Glass Card -->
    <div class="glass-card w-full max-w-md mx-auto px-8 py-10 relative z-10">
      <!-- <script src="https://www.google.com/recaptcha/api.js" async defer></script> -->
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
          <label class="login-label">Email Or VxCode</label>
          <input
            v-model="formData.email"
            type="email"
            placeholder="example@mail.com"
            class="auth-input"
          />
        </div>

        <div class="password-wrapper mb-4">
          <InputText
            v-model="formData.password"
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

        <!-- Errors -->
        <div
          v-if="errorsfront.length"
          class="text-red-400 text-sm leading-relaxed"
        >
          <ul>
            <li v-for="(e, i) in errorsfront" :key="i">• {{ e }}</li>
          </ul>
        </div>
        <div id="recaptcha-login" class="g-recaptcha flex justify-center mt-2 z-20"></div>
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
            to="/forgotpassword"
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

.login-wrapper {
  background: linear-gradient(180deg, #0f172a 0%, #020617 100%);
}

/* GLOW */
.login-glow {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(
      circle at 30% 20%,
      rgba(79, 70, 229, 0.25),
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 80%,
      rgba(124, 58, 237, 0.22),
      transparent 55%
    );
  filter: blur(65px);
  opacity: 0.6;
}

/* GLASS CARD */
.glass-card {
  background: rgba(15, 23, 42, 0.7);
  border: 1px solid rgba(199, 210, 254, 0.12);
  backdrop-filter: blur(18px);
  border-radius: 24px;
  box-shadow:
    0 0 25px rgba(79, 70, 229, 0.12),
    inset 0 0 20px rgba(255, 255, 255, 0.03);
}

/* LABEL */
.login-label {
  display: block;
  color: #c7d2fe;
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
  color: #c7d2fe;
  outline: none;
  transition: 0.3s;

  &:focus {
    border-color: #4f46e5;
    box-shadow: 0 0 12px rgba(79, 70, 229, 0.35);
  }
}

/* BUTTON */
.login-btn {
  width: 100%;
  padding: 12px 0;
  background: linear-gradient(90deg, #2563eb, #4f46e5, #7c3aed);
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

// reCAPTCHA state
const recaptchaWidgetId = ref(null);
const recaptchaToken = ref("");

// 🟢 Read ref query param (like ?ref=FO-991189)
onMounted(() => {
  // render reCAPTCHA widget when mounted (if grecaptcha is available)
  // Using site key that was previously present in your code.
  // If you want to change the key, replace the string below.
  const SITE_KEY = "6Lcq2XksAAAAAC7Oh8J6tBiqvT23twQYSaOxSyoF";

  const tryRender1 = () => {
    if (typeof window !== "undefined" && window.grecaptcha) {
      // avoid double render
      if (recaptchaWidgetId.value !== null) return;

      try {
        // render the visible checkbox widget into the container
        recaptchaWidgetId.value = window.grecaptcha.render("recaptcha-login", {
          sitekey: SITE_KEY,
          callback: (token) => {
            recaptchaToken.value = token;
          },
          "expired-callback": () => {
            recaptchaToken.value = "";
            window.grecaptcha.reset(recaptchaWidgetId.value);
          },
          "error-callback": () => {
            recaptchaToken.value = "";
            window.grecaptcha.reset(recaptchaWidgetId.value);
          },
        });
      } catch (e) {
        // render might fail if container not in DOM yet
        console.warn("reCAPTCHA render error:", e);
      }
    } else {
      // grecaptcha not ready yet — try again shortly
      setTimeout(tryRender1, 500);
    }
  };

  tryRender1();
});

// if user switches to register tab after mounted, ensure widget is rendered

// attempt to render (if not already)
// setTimeout(() => {
//   if (
//     recaptchaWidgetId.value === null &&
//     typeof window !== "undefined" &&
//     window.grecaptcha
//   ) {
//     try {
//       // use same SITE_KEY as above
//       recaptchaWidgetId.value = window.grecaptcha.render("recaptcha-register", {
//         sitekey: "6Lcq2XksAAAAAC7Oh8J6tBiqvT23twQYSaOxSyoF",
//         callback: (token) => {
//           recaptchaToken.value = token;
//         },
//         "expired-callback": () => {
//           recaptchaToken.value = "";
//         },
//         "error-callback": () => {
//           recaptchaToken.value = "";
//         },
//       });
//     } catch (e) {
//       // ignore
//     }
//   }
// }, 300);

const loading = ref(false);
const errorsfront = ref([]);
const showPassword = ref(false);

const formData = reactive({
  email: "",
  password: "",
});

function validateForm() {
  errorsfront.value = [];

  // if (!formData.email.includes("@")) {
  //   errorsfront.value.push("Email is not valid.");
  // }

  if (formData.password.length < 6) {
    errorsfront.value.push("Password must be at least 6 characters.");
  }
  if (!recaptchaToken.value) {
    errorsfront.value.push("Please complete the reCAPTCHA to continue.");
  }
  return errorsfront.value.length === 0;
}

async function login() {
  if (!validateForm()) return;


  
  try {
    loading.value = true;
    const user = await $fetch("/api/auth/login", {
      method: "POST",
      body: { ...formData  , recaptchaToken: recaptchaToken.value },
    });
    // console.log("fgfgfg", user);

    // Set user in auth composable/store if available
    const { authUser } = useAuth();
    authUser.value = user;

    await navigateTo("/account");
  } catch (error) {
    console.log("hhh" ,error );
    
    errorsfront.value = error?.data?.data
      ? Object.values(error.data.data).flat()
      : ["Login failed. Please try again."];
  } finally {
    loading.value = false;
    window.location.reload();
  }
}
</script>
