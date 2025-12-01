<template>
  <footer class="relative bg-black text-gray-300 pt-16 pb-10 overflow-hidden">

    <!-- 🔥 Animated gradient glow background -->
    <div class="absolute inset-0 opacity-40 footer-animated-bg"></div>

    <!-- Content -->
    <div class="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-4 gap-12">

      <!-- Brand -->
      <div>
        <h2 class="text-3xl font-extrabold bg-gradient-to-r from-green-400 to-teal-300 bg-clip-text text-transparent drop-shadow-md">
          Vestavex
        </h2>
        <p class="mt-3 text-gray-400 leading-relaxed text-sm">
          A smart investment platform blending technology and network power.
          Build your income with the VX system and intelligent scaling.
        </p>

        <!-- Social icons -->
        <div class="flex items-center gap-4 mt-5">
          <a href="#" class="footer-icon"><i class="mdi mdi-telegram"></i></a>
          <a href="#" class="footer-icon"><i class="mdi mdi-twitter"></i></a>
          <a href="#" class="footer-icon"><i class="mdi mdi-linkedin"></i></a>
          <a href="#" class="footer-icon"><i class="mdi mdi-youtube"></i></a>
        </div>
      </div>

      <!-- Quick links -->
      <div>
        <h3 class="footer-title">Quick Links</h3>
        <ul class="footer-list">
          <li><nuxt-link to="/" class="footer-link">Home</nuxt-link></li>
          <li><nuxt-link to="/bundles" class="footer-link">Bundles</nuxt-link></li>
          <li><nuxt-link to="/addfunds" class="footer-link">Add Funds</nuxt-link></li>
          <li><nuxt-link to="/vxplan" class="footer-link">VX Plan</nuxt-link></li>
          <li><nuxt-link to="/support" class="footer-link">Support</nuxt-link></li>
        </ul>
      </div>

      <!-- Legal -->
      <div>
        <h3 class="footer-title">Legal</h3>
        <ul class="footer-list">
          <li><a class="footer-link">Privacy Policy</a></li>
          <li><a class="footer-link">Terms of Service</a></li>
          <li><a class="footer-link">AML & KYC Policy</a></li>
          <li><a class="footer-link">Risk Disclosure</a></li>
        </ul>
      </div>

      <!-- Contact -->
      <div>
        <h3 class="footer-title">Contact Us</h3>
        <ul class="footer-list space-y-4">
          <li class="footer-contact">
            <i class="mdi mdi-email-outline text-green-400 text-xl"></i>
            <a href="mailto:support@vestavex.com">support@vestavex.com</a>
          </li>
          <li class="footer-contact">
            <i class="mdi mdi-map-marker text-green-400 text-xl"></i>
            <span>London, UK</span>
          </li>
          <li class="footer-contact">
            <i class="mdi mdi-phone text-green-400 text-xl"></i>
            <a href="tel:+447712345678">+44 7712 345678</a>
          </li>
        </ul>
      </div>
    </div>

    <!-- Divider -->
    <div class="relative z-10 border-t border-white/10 mt-12 py-5 text-center flex flex-col sm:flex-row items-center justify-between px-6 text-sm text-gray-500">
      <p>© {{ new Date().getFullYear() }} Vestavex. All rights reserved.</p>

      <div class="flex gap-4 mt-3 sm:mt-0">
        <a class="footer-link">Privacy Policy</a>
        <a class="footer-link">Terms</a>
      </div>
    </div>

  </footer>
</template>

<script setup>
// No script needed here yet — static footer.
</script>

<style lang="scss" scoped>
footer {
  position: relative;
}

/* 🔥 Gradient Soft Light on Top */
footer::before {
  content: "";
  position: absolute;
  top: -40px;
  left: 0;
  width: 100%;
  height: 120px;

  background: radial-gradient(
      circle at 50% 0%,
      rgba(34, 197, 94, 0.45),
      rgba(16, 185, 129, 0.30) 35%,
      rgba(20, 184, 166, 0.18) 60%,
      transparent 85%
  );

  filter: blur(45px);
  opacity: 0.9;

  pointer-events: none;
  z-index: 2;
}

.footer-title {
  @apply text-white font-semibold text-lg mb-4 tracking-wide;
}

.footer-list {
  @apply space-y-3;
}

.footer-link {
  @apply text-gray-400 text-sm transition duration-200 cursor-pointer;
}

.footer-link:hover {
  @apply text-green-400;
}

/* Contact row */
.footer-contact {
  @apply flex items-center gap-3 text-sm text-gray-300;
}

.footer-contact a:hover {
  @apply text-green-400;
}

/* Social icon buttons */
.footer-icon {
  @apply text-gray-300 text-2xl transition-all duration-300;
}

.footer-icon:hover {
  @apply text-green-400 scale-125 drop-shadow-[0_0_10px_rgba(34,197,94,0.7)];
}

/* 🔥 animated background */
.footer-animated-bg {
  background: radial-gradient(circle at 20% 30%, rgba(34,197,94,0.2), transparent),
              radial-gradient(circle at 80% 70%, rgba(20,184,166,0.2), transparent);
  animation: footerPulse 8s infinite ease-in-out alternate;
}

@keyframes footerPulse {
  0% {
    transform: scale(1);
    opacity: 0.35;
  }
  100% {
    transform: scale(1.25);
    opacity: 0.55;
  }
}

/* Mobile tweaks */
@media (max-width: 650px) {
  .footer-link {
    @apply block;
  }
}

.footer-container {
  background-color: #0a0a0a;
  color: white;
  position: relative;
  bottom: 0;
  font-family: "Inter", sans-serif;
}

.footer-link {
  color: #bdbdbd;
  font-size: 14px;
  transition: color 0.2s ease;
  &:hover {
    color: #10b981;
  }
}

@media only screen and (max-width: 650px) {
  .footer-container {
    text-align: center;
    .footer-link {
      display: inline-block;
      margin: 4px 0;
    }
  }
}
</style>
