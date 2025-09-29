<template>
  <div class="mainbundles">
    <Head>
      <Title>خرید مطمئن قطعات خودرو با بهترین قیمت پارس اتوپارت</Title>
      <Meta
        name="description"
        content="پارس اتو پارتمرجع تخصصی فروش قطعات یدکی خودرو، ارائه‌دهنده قطعات اصل و باکیفیت برای انواع خودروها. تضمین اصالت کالا، ارسال سریع و بهترین قیمت بازار."
      />
    </Head>
    <div class="mt-4">
      <nuxt-link to="/">
        <span style="color: #405ff2"> home / </span>
      </nuxt-link>
      <span>bundles</span>
    </div>
    <div>
      <h1>bundles</h1>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center my-8">
      <div class="basis-1/3" v-for="(item, index) in bundlesItems" :key="index">
        <div class="Bcard relative rounded-2xl overflow-hidden shadow-lg">
          <!-- Background Image -->
          <img
            src="../public/22920.jpg"
            alt="Investment background"
            class="absolute inset-0 w-full h-full object-cover"
          />

          <!-- Dark overlay -->
          <div
            class="absolute inset-0 bg-black/50 flex flex-col justify-between p-4 text-white"
          >
            <!-- Title + Subtitle -->
            <div>
              <h2 class="text-lg font-bold">Investment Plan</h2>
              <p class="text-sm text-gray-200">Subtitle here</p>
            </div>

            <!-- Content -->
            <div>
              <p class="text-sm mb-2">
                Invested: <span class="font-semibold">$1000</span>
              </p>
              <p class="text-sm mb-2">
                Expected Return: <span class="font-semibold">$4200</span>
              </p>
              <p class="text-sm">Progress: 40%</p>
              <ProgressBar :value="40" class="h-2 mt-1" />
            </div>

            <!-- Actions -->
            <div class="flex gap-2 mt-3">
              <Button
                label="Details"
                class="p-button-sm p-button-outlined w-full"
              />
              <Button
                label="Upgrade"
                class="p-button-sm p-button-success w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.mainbundles {
  background-color: #f9fbfc;
  box-sizing: border-box;
  padding: 10px 80px;
  .Bcard {
    width: 400px;
    height: 280px;
  }
  h1 {
    font-size: 30px;
    margin-top: 10px;
  }
}
@media only screen and (max-width: 600px) {
  .mainbundles {
    padding: 10px 10px;
    .Bcard {
      width: 300px;
      height: 280px;
    }
  }
}
</style>
<script>
export default {
  data() {
    return {
      bundlesItems: [
        {
          title: "بسته اقتصادی",
          subtitle: "مناسب برای تعمیرات اساسی",
          invested: "$500",
          expectedReturn: "$1500",
          progress: 30,
        },
        {
          title: "بسته استاندارد",
          subtitle: "مناسب برای نگهداری منظم",
          invested: "$1000",
          expectedReturn: "$3000",
          progress: 50,
        },
        {
          title: "بسته پریمیوم",
          subtitle: "مناسب برای عملکرد بهینه",
          invested: "$2000",
          expectedReturn: "$6000",
          progress: 70,
        },
        {
          title: "بسته اقتصادی",
          subtitle: "مناسب برای تعمیرات اساسی",
          invested: "$500",
          expectedReturn: "$1500",
          progress: 30,
        },
        {
          title: "بسته استاندارد",
          subtitle: "مناسب برای نگهداری منظم",
          invested: "$1000",
          expectedReturn: "$3000",
          progress: 50,
        },
        {
          title: "بسته پریمیوم",
          subtitle: "مناسب برای عملکرد بهینه",
          invested: "$2000",
          expectedReturn: "$6000",
          progress: 70,
        },
      ],
    };
  },
};
</script>
