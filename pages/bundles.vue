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
        <span style="color: #0b6d20"> home / </span>
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
              <h2 class="text-lg font-bold">{{ item.title }}</h2>
              <p class="text-sm text-gray-200"> minimum Withdrawal: <span class="font-semibold"> {{ item.minimumwithdrawal }} </span>  </p>
            </div>

            <!-- Content -->
            <div>
              <p class="text-sm mb-2">
                Invested: <span class="font-semibold"> {{ item.investedDown }} -  {{ item.investedUp }} </span>
              </p>
              <p class="text-sm mb-2">
                 earn: <span class="font-semibold"> {{ item.earn }} </span>
              </p>
              <p class="text-sm">maxcap: {{ item.maxcap }}%</p>
             
               <ProgressBar :value="normalize(item.maxcap)"> {{ item.maxcap }}% </ProgressBar>
              
            </div>

            <!-- Actions -->
            <div class="flex gap-2 mt-3">
              <Button
                label="Details"
                class="p-button-sm p-button-outlined w-full"
              />
              <Button
                label="Investment Deposit"
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
          title: "Bronze",
          minimumwithdrawal: "$50",
          investedDown: "$50",
          investedUp: "$249",
          earn: "3% per month",
          maxcap: 300,
        },
        {
          title: "Silver",
          minimumwithdrawal: "$50",
          investedDown: "$250",
          investedUp: "$499",
          earn: "4% per month",
          maxcap: 340,
        },
        {
          title: "Gold",
          minimumwithdrawal: "$50",
          investedDown: "$500",
          investedUp: "$999",
          earn: "5% per month",
          maxcap: 380,
        },
        {
          title: "Platinum",
          minimumwithdrawal: "$50",
          investedDown: "$1,000",
          investedUp: "$2,499",
          earn: "6% per month",
          maxcap: 420,
        },
        {
          title: "Diamond",
          minimumwithdrawal: "$50",
          investedDown: "$2,500",
          investedUp: "4,999",
          earn: "7% per month",
          maxcap: 460,
        },
        {
          title: "Titanium",
          minimumwithdrawal: "$50",
          investedDown: "$5,000",
          investedUp: "and more",
          earn: "8% per month",
          maxcap: 500,
        },
      ],
    };
  },
  methods: {
    normalize(value) {

      return value/10; // clamp between 0–100
    },
  },
};
</script>

