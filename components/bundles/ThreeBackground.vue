<template>
  <canvas ref="canvas" class="three-canvas" aria-hidden="true"></canvas>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const canvas = ref(null);

let scene, camera, renderer, particles;
let animFrame;
let THREE;

/* ---------- Three.js init ---------- */
async function initThree() {
  const mod = await import("three");
  THREE = mod;

  const particleCount = 300;

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 6;

  renderer = new THREE.WebGLRenderer({
    canvas: canvas.value,
    alpha: true,
    antialias: true,
  });

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  /* particles */
  const positions = new Float32Array(particleCount * 3);
  const sizes = new Float32Array(particleCount);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3 + 0] = (Math.random() - 0.5) * 16;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
    sizes[i] = 0.5 + Math.random() * 1.2;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

  const material = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: {
      uColor: { value: new THREE.Color(0x6366f1) },
    },
    vertexShader: `
      attribute float size;
      varying float vAlpha;
      void main() {
        vAlpha = 1.0 - (position.z + 6.0) / 12.0;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      varying float vAlpha;
      void main() {
        float r = length(gl_PointCoord - vec2(0.5));
        float alpha = smoothstep(0.5, 0.0, r) * vAlpha;
        gl_FragColor = vec4(uColor, alpha);
      }
    `,
  });

  particles = new THREE.Points(geometry, material);
  scene.add(particles);

  animate();
}

function animate() {
  animFrame = requestAnimationFrame(animate);

  if (particles) {
    particles.rotation.y += 0.0008;
    particles.rotation.x += 0.0003;
  }

  renderer.render(scene, camera);
}

/* ---------- Resize ---------- */
function onResize() {
  if (!camera || !renderer) return;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

/* ---------- lifecycle ---------- */
onMounted(async () => {
  try {
    await initThree();
    window.addEventListener("resize", onResize);
  } catch (e) {
    console.error("ThreeBackground init failed:", e);
  }
});

onBeforeUnmount(() => {
  cancelAnimationFrame(animFrame);
  window.removeEventListener("resize", onResize);

  if (renderer) {
    renderer.dispose();
  }
});
</script>

<style scoped>
.three-canvas {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}
</style>
