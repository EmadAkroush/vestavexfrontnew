<template>
  <div class="home">
    <Head>
      <Title>VX business | Shaping the Future of Decentralized Finance</Title>
      <Meta
        name="description"
        content="Join VXBUSINESS: a smart investment platform built for network growth and passive income."
      />
    </Head>

    <section
      class="relative flex flex-col items-center justify-center min-h-[88vh] px-6 overflow-hidden rounded-b-[45px]"
    >
      <!-- 🔥 BACKGROUND GRADIENT + IMAGE BLEND -->
      <div
        class="absolute inset-0 bg-[url('/public/bg.jpg')] bg-cover bg-center bg-no-repeat"
      ></div>

      <div
        class="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-gray-900/70 backdrop-blur-[3px]"
      ></div>

      <!-- 🔥 ORB LIGHTS -->
      <div
        class="absolute w-[380px] h-[380px] bg-green-500/20 rounded-full blur-[120px] -top-20 -left-20"
      ></div>
      <div
        class="absolute w-[300px] h-[300px] bg-teal-400/20 rounded-full blur-[130px] bottom-10 right-10"
      ></div>

      <!-- 🔥 GLASS CONTAINER -->
      <div
        class="relative z-10 text-center max-w-3xl backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl p-10 shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)] animate-fadeIn"
      >
        <p class="uppercase tracking-[0.2em] text-green-400 font-semibold mb-3">
          VX business | Shaping the Future of Decentralized Finance
        </p>

        <h1
          class="gradient-animate text-4xl sm:text-6xl font-extrabold leading-tight mb-6 bg-gradient-to-r from-green-300 via-teal-300 to-white text-transparent bg-clip-text drop-shadow-xl tracking-tight"
        >
          Empowering Global Finance Through Decentralized Innovation
          <br />
        </h1>

        <p class="text-gray-200 text-base sm:text-xl leading-relaxed mb-8">
          VX business is a leading blockchain and decentralized exchange (DEX)
          company with over four years of continuous and professional experience
         
        </p>

        <Button
          label="Start Now"
          icon="mdi mdi-arrow-right"
          class="p-button-success px-7 py-3 sm:px-10 sm:py-4 text-base sm:text-lg rounded-full font-semibold shadow-xl hover:shadow-2xl hover:scale-[1.05] active:scale-[0.98] transition-all duration-200"
          @click="goToSignup"
        />
      </div>

      <!-- 🔥 FLOATING ILLUSTRATION -->
      <div class="absolute bottom-[-60px] sm:bottom-[-80px] animate-floating">
        <!-- <img
      src="/public/Team work-bro.svg"
      alt="Investment Illustration"
      class="w-40 sm:w-48 drop-shadow-[0_25px_40px_rgba(0,0,0,0.45)]"
    /> -->
      </div>
    </section>
    <!-- 🌌 3D Background -->

    <!-- FEATURE SECTION -->
    <section
      class="relative py-24 bg-gradient-to-b from-[#f7f8ff] to-[#eef1fb] overflow-hidden"
    >
      <!-- Background gradient blobs -->
      <div class="absolute inset-0">
        <div
          class="absolute -top-10 -left-10 w-60 h-60 bg-green-300/25 blur-3xl rounded-full"
        ></div>
        <div
          class="absolute bottom-0 right-0 w-72 h-72 bg-blue-300/20 blur-3xl rounded-full"
        ></div>
      </div>

      <div class="relative max-w-7xl mx-auto px-6">
        <h2
          class="feature-title text-center text-4xl sm:text-5xl font-extrabold mb-16 tracking-tight"
        >
          Platform Highlights
        </h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <div
            v-for="(feature, index) in features"
            :key="feature.title"
            class="group relative p-8 rounded-3xl backdrop-blur-xl bg-white/40 shadow-lg border border-white/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 overflow-hidden"
          >
            <!-- Three.js Canvas -->
            <div
              class="three-bg absolute inset-0 z-0"
              :id="'three-bg-' + index"
            ></div>

            <!-- Card Content -->
            <div class="relative z-10">
              <div
                class="w-20 h-20 flex items-center justify-center rounded-2xl bg-gradient-to-br from-green-500/80 to-green-700/80 text-white text-5xl shadow-lg group-hover:scale-110 transition-transform duration-300 mx-auto mb-6"
              >
                <i :class="feature.icon"></i>
              </div>

              <h3 class="text-xl font-semibold text-gray-800 mb-3 text-center">
                {{ feature.title }}
              </h3>

              <p class="text-gray-600 text-center leading-relaxed">
                {{ feature.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
import * as THREE from "three";
import { onMounted } from "vue";

onMounted(() => {
  setTimeout(() => {
    document.querySelectorAll(".three-bg").forEach((el) => initThreeBG(el));
  }, 200);
});

function initThreeBG(container) {
  const width = container.clientWidth;
  const height = container.clientHeight;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.z = 3;

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  // 🌟 Geometry + Material (floating squares)
  const geometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
  const material = new THREE.MeshStandardMaterial({
    color: "#00ff88",
    transparent: true,
    opacity: 0.25,
    metalness: 0.3,
    roughness: 0.2,
  });

  const cubes = [];
  for (let i = 0; i < 12; i++) {
    const cube = new THREE.Mesh(geometry, material);
    cube.position.x = (Math.random() - 0.5) * 2;
    cube.position.y = (Math.random() - 0.5) * 2;
    cube.position.z = (Math.random() - 0.5) * 1;
    scene.add(cube);
    cubes.push(cube);
  }

  // 💡 Lighting
  const light = new THREE.PointLight(0x00ffcc, 7);
  light.position.set(2, 2, 3);
  scene.add(light);

  const loop = () => {
    cubes.forEach((c, index) => {
      c.rotation.x += 0.01 + index * 0.0001;
      c.rotation.y += 0.015 + index * 0.0001;
      c.position.y += Math.sin(Date.now() * 0.005 + index) * 0.0005;
    });

    renderer.render(scene, camera);
    requestAnimationFrame(loop);
  };
  loop();
}

const goToSignup = () => router.push("/login");

// Features (بر اساس سند PDF)
const features = [
  {
    title: "Tech & Trading",
    icon: "mdi mdi-cog-outline",
    description:
      "Our unique combination of technology and trading strategies delivers consistent passive income to investors.",
  },
  {
    title: "VX Plan System",
    icon: "mdi mdi-family-tree",
    description:
      "Earn through your network with our binary VX Plan — unlock up to 10x rewards based on your investment.",
  },
  {
    title: "Bundles & Packages",
    icon: "mdi mdi-package-variant-closed",
    description:
      "Choose from flexible investment bundles with monthly yields from 3% up to 8%.",
  },
  {
    title: "Secure Wallet",
    icon: "mdi mdi-wallet-outline",
    description:
      "Deposit and withdraw safely with built-in wallet support and transparent fees.",
  },
  {
    title: "Real-Time Dashboard",
    icon: "mdi mdi-chart-line",
    description:
      "Track your portfolio, team volume, and growth progress in real-time through an intuitive dashboard.",
  },
  {
    title: "24/7 Support",
    icon: "mdi mdi-lifebuoy",
    description:
      "Our team is always here to help — contact us anytime for guidance and account assistance.",
  },
];
</script>

<style lang="scss">
.animated-squares {
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: 0;
}

.three-bg canvas {
  width: 100% !important;
  height: 100% !important;
  border-radius: 24px;
  opacity: 0.5;
}

.animated-squares::before {
  content: "";
  position: absolute;
  width: 200%;
  height: 200%;
  background-image: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.12) 1px,
      transparent 1px
    ),
    linear-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 1px);
  background-size: 40px 40px;
  animation: moveSquares 12s linear infinite;
  opacity: 0.25;
}

@keyframes moveSquares {
  from {
    transform: translate(-50px, -50px) rotate(0deg);
  }
  to {
    transform: translate(0, 0) rotate(360deg);
  }
}

.floating-square {
  position: absolute;
  bottom: -40px;
  background: rgba(255, 255, 255, 0.35);
  border-radius: 6px;
  backdrop-filter: blur(4px);
  animation-name: floatUp;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

@keyframes floatUp {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 0;
  }
  30% {
    opacity: 0.7;
  }
  100% {
    transform: translateY(-180px) rotate(45deg);
    opacity: 0;
  }
}

@keyframes moveGradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.gradient-animate {
  background-size: 200% 200%;
  animation: moveGradient 4s ease-in-out infinite;
}

.feature-title {
  background: linear-gradient(90deg, #00f260, #0575e6, #8e2de2, #f953c6);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  animation: titleGradient 6s ease infinite, floatTitle 4s ease-in-out infinite;

  text-shadow: 0 0 25px rgba(0, 255, 200, 0.4);
}

/* حرکت گرادینت زنده */
@keyframes titleGradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* حرکت شناور */
@keyframes floatTitle {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}

.home {
  box-sizing: border-box;
  background-color: #eef1fb;

  .secmain {
    box-sizing: border-box;
  }

  .p-button-success {
    background-color: #0b6d20 !important;
    border: none;
  }
  .p-button-success:hover {
    background-color: #0d8024 !important;
  }

  .Htext {
    color: white;
  }
}

@media only screen and (max-width: 650px) {
  .home {
    text-align: center;

    h1 {
      font-size: 28px;
      line-height: 1.4;
    }
    .p-button {
      font-size: 14px;
      padding: 0.5rem 1.5rem;
    }
  }
}
</style>

<style scoped>
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(20px) scale(0.98);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.animate-fadeIn {
  animation: fadeIn 1.3s ease-out both;
}

@keyframes floating {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-12px);
  }
  100% {
    transform: translateY(0px);
  }
}

.animate-floating {
  animation: floating 4s ease-in-out infinite;
}
</style>
