<template>
  <section class="about-page bg-gray-900 text-gray-100">
    <!-- Hero Section -->
    <div class="hero-section relative overflow-hidden text-center py-20 px-6 sm:px-16">
      <div class="absolute inset-0 bg-gradient-to-b from-purple-900/80 to-blue-600/60 z-0"></div>
      <img
        src="/public/bg.jpg"
        alt="background"
        class="absolute inset-0 w-full h-full object-cover opacity-30"
      />
      <div class="relative z-10 text-white max-w-3xl mx-auto">
        <h1 class="text-4xl sm:text-5xl font-bold mb-4">About <span class="text-purple-400">VXBUSINESS</span></h1>
        <p class="text-lg leading-relaxed">
          Empowering people to build wealth through innovation, transparency, and a trusted global network.
        </p>
      </div>
    </div>

    <div class="bg-gray-800">
      <div class="max-w-4xl mx-auto py-24 px-6 sm:px-12">
        <div class="space-y-8 text-lg leading-relaxed text-gray-300">
          <h2 class="text-3xl font-bold text-purple-400 mb-6" style="text-align: center;">Who We Are</h2>
          <p>
            VX Business is a specialized company operating in the fields of
            blockchain technology and decentralized exchanges (DEX), with over
            four years of continuous and professional experience in the
            decentralized finance (DeFi) ecosystem. Throughout this period, the
            company has established itself as a reliable and credible
            participant within the global DeFi landscape.
          </p>

          <p>
            Our work began with a focused commitment to the design, development,
            and optimization of decentralized infrastructures. Through in-depth
            market research, advanced technical implementation, and
            professional-grade risk management, VX Business has consistently
            strengthened its position among serious projects and experienced
            participants in the Web3 space.
          </p>

          <p>
            VX Business is built on three fundamental principles: security,
            transparency, and sustainable innovation. All products and services
            are developed using standardized blockchain architectures, auditable
            smart contracts, and a rigorous engineering methodology. Our focus
            remains on long-term value creation rather than short-term market
            trends.
          </p>

          <p>
            Over four years of active operation, VX Business has accumulated
            hands-on experience across a wide range of DeFi protocols, liquidity
            frameworks, decentralized trading strategies, and advanced
            decentralized exchange architectures. This depth of expertise allows
            us to deliver solutions aligned with the requirements of
            professional users, investors, and Web3-oriented organizations.
          </p>

          <p>
            The VX Business team is composed of senior blockchain engineers,
            smart contract architects, DeFi analysts, and security specialists
            who combine deep technical expertise with a strong understanding of
            decentralized economic systems. We prioritize precision,
            reliability, and quality, placing them above speed or market
            speculation.
          </p>

          <p>
            We believe the future of the digital economy lies in systems that
            operate without intermediaries, with full transparency and global
            accessibility. VX Business is committed to contributing to this
            future by bridging advanced blockchain technology with practical,
            sustainable, real-world adoption.
          </p>

          <p class="font-medium text-gray-100">
            VX Business is the choice for those who recognize decentralized
            finance not as a temporary trend, but as a foundational
            transformation of the global financial system.
          </p>
        </div>
      </div>
    </div>

    <!-- Why Choose VXBUSINESS -->
    <div class="why-section bg-gray-800 py-16 px-6 sm:px-12">
      <div class="max-w-6xl mx-auto text-center mb-10">
        <h2 class="text-3xl font-bold text-purple-400 mb-4">Why Choose VXBUSINESS</h2>
        <p class="text-gray-300 max-w-3xl mx-auto">
          We are more than just an investment platform — we are a financial partner for your future.
          Our system is designed to maximize growth, minimize risk, and empower every investor to succeed.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        <div class="p-6 rounded-2xl bg-purple-900/10 hover:bg-purple-800/20 transition text-center">
          <i class="mdi mdi-lock-outline text-4xl text-purple-400 mb-3"></i>
          <h3 class="font-semibold mb-2 text-white">Secure Transactions</h3>
          <p class="text-gray-300 text-sm">
            Advanced encryption and multi-layer protection for every transaction.
          </p>
        </div>

        <div class="p-6 rounded-2xl bg-purple-900/10 hover:bg-purple-800/20 transition text-center">
          <i class="mdi mdi-chart-line text-4xl text-purple-400 mb-3"></i>
          <h3 class="font-semibold mb-2 text-white">Consistent Returns</h3>
          <p class="text-gray-300 text-sm">
            Monthly profits and dynamic plans to match your growth goals.
          </p>
        </div>

        <div class="p-6 rounded-2xl bg-purple-900/10 hover:bg-purple-800/20 transition text-center">
          <i class="mdi mdi-account-group-outline text-4xl text-purple-400 mb-3"></i>
          <h3 class="font-semibold mb-2 text-white">Global Community</h3>
          <p class="text-gray-300 text-sm">
            Join thousands of investors building success through the VX Plan.
          </p>
        </div>

        <div class="p-6 rounded-2xl bg-purple-900/10 hover:bg-purple-800/20 transition text-center">
          <i class="mdi mdi-lightbulb-on-outline text-4xl text-purple-400 mb-3"></i>
          <h3 class="font-semibold mb-2 text-white">Smart Innovation</h3>
          <p class="text-gray-300 text-sm">
            Data-driven tools and transparent analytics that keep you in control.
          </p>
        </div>
      </div>
    </div>

    <!-- Call to Action -->
    <div class="cta bg-purple-700 text-white text-center py-20 px-6 sm:px-16">
      <h2 class="text-3xl font-bold mb-4">Join the Future of Investment</h2>
      <p class="mb-6 max-w-2xl mx-auto text-gray-100">
        Start growing your wealth with a secure, transparent, and intelligent investment system.
      </p>
      <nuxt-link to="/addfunds">
        <Button label="Start Investing Now" icon="mdi mdi-arrow-right" class="p-button-success bg-white text-purple-700 hover:bg-purple-50" />
      </nuxt-link>
    </div>
  </section>
</template>

<script setup>
import Button from "primevue/button";
</script>

<style lang="scss" scoped>
.about-page {
  .hero-section {
    h1 {
      text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
    }
  }
  .why-section i {
    transition: transform 0.2s ease;
  }
  .why-section:hover i {
    transform: scale(1.1);
  }
}
</style>
