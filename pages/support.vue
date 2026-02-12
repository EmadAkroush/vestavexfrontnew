<template>
  <section class="support-page bg-gray-900 min-h-screen text-gray-100">
    <!-- Hero Section -->
    <div
      class="support-hero relative text-center py-20 px-4 sm:px-16 bg-gradient-to-b from-gray-800 via-gray-900 to-gray-900 overflow-hidden"
    >
      <!-- پس‌زمینه نیمه‌شفاف -->
      <div class="absolute inset-0 bg-black/40 z-0"></div>

      <!-- محتوای اصلی -->
      <div class="relative z-10 max-w-3xl mx-auto">
        <h1 class="text-4xl sm:text-5xl font-bold mb-4 text-white">
          Support Center
        </h1>
        <p class="text-base sm:text-lg leading-relaxed max-w-2xl mx-auto text-gray-300">
          Need help? Our support team is available
          <span class="font-semibold text-blue-400">24/7</span> to assist you
          with any questions about your account, deposits, withdrawals, or
          investment plans.
        </p>
      </div>
    </div>

    <!-- Support Form -->
    <div
      class="max-w-6xl mx-auto my-16 px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-3 gap-10"
    >
      <!-- Form Section -->
      <div class="lg:col-span-2 bg-gray-800 shadow-md rounded-2xl p-8">
        <h2 class="text-2xl font-semibold mb-6 flex items-center gap-2 text-white">
          <i class="mdi mdi-email-outline text-3xl text-blue-400"></i> Send Us a Message
        </h2>

        <div class="flex flex-col gap-5">
          <div>
            <label class="block text-sm font-medium mb-2 text-gray-200">Topic</label>
            <InputText
              v-model="form.topic"
              placeholder="Enter your topic..."
              class="w-full input-field"
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-2 text-gray-200">Email (optional)</label>
            <InputText
              v-model="form.email"
              placeholder="your@email.com"
              class="w-full input-field"
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-2 text-gray-200">Description</label>
            <Textarea
              v-model="form.description"
              rows="7"
              autoResize
              placeholder="Describe your issue or question..."
              class="w-full input-field"
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-2 text-gray-200">Attach File (optional)</label>
            <input
              type="file"
              @change="handleFileUpload"
              class="w-full border p-2 rounded-md bg-gray-700 text-gray-200"
            />
          </div>

          <div class="flex justify-end mt-4">
            <Button
              label="Send Message"
              icon="mdi mdi-send"
              class="p-button-success w-48 bg-blue-500 hover:bg-blue-600"
              @click="sendMessage"
            />
          </div>
        </div>
      </div>

      <!-- Contact Section -->
      <div
        class="bg-gray-800 text-white rounded-2xl p-8 flex flex-col justify-between shadow-md"
      >
        <div>
          <h3 class="text-xl font-semibold mb-4">Contact Us Directly</h3>
          <ul class="space-y-4 text-gray-300">
            <li class="flex items-center gap-3">
              <i class="mdi mdi-email-outline text-2xl text-blue-400"></i>
              <span>support@VXBUSINESS.com</span>
            </li>
          </ul>
        </div>

        <div class="mt-8">
          <h4 class="font-semibold mb-3">Follow Us</h4>
          <div class="flex gap-4 text-2xl">
            <!-- Social icons can be added here -->
          </div>
        </div>
      </div>
    </div>

    <!-- FAQ Section -->
    <div class="faq-section bg-gray-800 py-16 px-6 sm:px-12 rounded-2xl shadow-md">
      <div class="max-w-5xl mx-auto text-center mb-10">
        <h2 class="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
        <p class="text-gray-300 max-w-3xl mx-auto">
          Find answers to the most common questions our investors ask before
          contacting support.
        </p>
      </div>

      <div class="max-w-4xl mx-auto space-y-6">
        <div
          v-for="(faq, index) in faqs"
          :key="index"
          class="border rounded-xl p-5 shadow-sm hover:shadow-md transition bg-gray-700"
        >
          <h3 class="font-semibold text-lg text-white mb-2">{{ faq.question }}</h3>
          <p class="text-gray-300 text-sm leading-relaxed">{{ faq.answer }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Button from "primevue/button";

const form = ref({
  topic: "",
  email: "",
  description: "",
  file: null,
});

function handleFileUpload(e) {
  form.value.file = e.target.files[0];
}

function sendMessage() {
  if (!form.value.topic || !form.value.description) {
    alert("⚠️ Please fill in topic and description before sending.");
    return;
  }
  alert("✅ Your message has been sent successfully. We will reply soon.");
  form.value = { topic: "", email: "", description: "", file: null };
}

const faqs = [
  {
    question: "How long does it take to process my withdrawal?",
    answer:
      "Withdrawals are typically processed within 24 hours, depending on the selected network.",
  },
  {
    question: "Can I edit my investment plan after deposit?",
    answer:
      "No, each plan is fixed after activation, but you can open new bundles anytime.",
  },
  {
    question: "Where can I track my performance?",
    answer:
      "You can track all performance data in your account under 'Portfolio' and 'Performance' tabs.",
  },
];
</script>

<style lang="scss" scoped>
.support-page {
  .support-hero {
    background-image: url("/public/support-bg.jpg");
    background-size: cover;
    background-position: center;
  }

  .input-field {
    background: #1f2937;
    border: 1px solid #374151;
    color: #d1d5db;
    border-radius: 0.5rem;
    padding: 0.5rem;
  }

  .input-field:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
  }

  h1, h2, h3, h4 {
    line-height: 1.3;
  }

  /* Hover effects */
  .shadow-md:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  }
}
</style>
