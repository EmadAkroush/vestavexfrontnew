<template>
  <div class="cardpage">
    <div>
      <nuxt-link to="/">
        <span style="color: #405ff2"> صفحه اصلی / </span>
      </nuxt-link>
      <span> تسویه حساب </span>
    </div>
    <div>
      <h1>تسویه حساب</h1>
    </div>
    <div class="maincard grid grid-cols-1 sm:grid-cols-12 gap-4 sm:my-16 my-4">
      <div class="sm:col-span-3">
        <div
          class="max-w-sm mx-auto sm:my-6 bg-white rounded-lg border border-gray-200 p-4 rightc"
        >
          <div class="">
            <h2 class="text-right text-lg font-semibold mt-6">
              مجموع سبد خرید
            </h2>
            <div class="mt-4 space-y-2">
              <div class="flex justify-between">
                <span>جمع خرید</span>
                <span>{{ priceser(totalAmount) }} تومان</span>
              </div>
              <div class="flex justify-between">
                <span>جمع تخفیف</span>
                <span> {{ priceser(totalAmountoff) }} تومان</span>
              </div>
              <!-- <div class="flex justify-between">
                <span> هزینه بسته بندی </span>
                <span> 20,000  تومان</span>
              </div> -->
            </div>
            <div class="border-t border-gray-300 my-2"></div>
            <div class="flex justify-between font-bold mt-4">
              <span>مجموع</span>
              <span>{{ priceser(totalAmountkol) }} تومان</span>
            </div>
          </div>
          <Button
            label="پرداخت"
            icon="mdi mdi-arrow-left"
            iconPos="right"
            class="w-full text-white py-3 rounded-b-lg mt-4"
            style="background-color: #405ff2; border: 1px solid #405ff2"
            @click="submitForm()"
          />
        </div>
      </div>
      <div class="sm:col-span-9">
        <div class="flex justify-center items-center md:p-4">
          <div class="bg-white rounded-2xl p-8 border border-gray-200 w-full">
            <h1 class="text-2xl font-bold text-red-800 mb-4">
              با سلام و احترام،
            </h1>
            <p class="text-gray-700 leading-relaxed mb-4">
              از خرید شما سپاسگزاریم! ما همواره در تلاشیم تا بهترین خدمات را به
              شما ارائه دهیم.
            </p>
            <p class="text-gray-700 leading-relaxed mb-4">
              به اطلاع شما می‌رسانیم که در هنگام تحویل سفارش توسط مامور تیپاکس،
              لطفاً نکات زیر را مورد توجه قرار دهید:
            </p>
            <ul
              class="list-disc list-inside text-gray-700 leading-relaxed space-y-2 mb-4"
            >
              <li>
                <span class="font-semibold">بررسی سفارش:</span> حتماً در حضور
                مامور تیپاکس یا در دفتر نمایندگی تیپاکس، سفارش خود را به دقت
                بررسی کنید.
              </li>
              <li>
                <span class="font-semibold">گزارش مغایرت یا آسیب:</span> در
                صورتی که هرگونه مغایرت، آسیب دیدگی یا کسری در محصول مشاهده
                کردید، فوراً این موارد را به مامور تیپاکس اعلام کنید و
                صورتجلسه‌ای در این خصوص تنظیم نمایید.
              </li>
              <li>
                <span class="font-semibold">عدم مسئولیت حامل:</span> توجه داشته
                باشید که در صورت عدم بررسی و عدم ثبت مغایرت‌ها، هیچ گونه خسارتی
                شامل حامل نمی‌شود و مسئولیتی در این زمینه متوجه ما نخواهد بود.
              </li>
            </ul>
            <p class="text-gray-700 leading-relaxed mb-6">
              با آرزوی خریدی موفق و تجربه‌ای خوشایند برای شما.
            </p>
            <p class="text-gray-900 font-semibold">با احترام،</p>
          </div>
        </div>
        <div class="mx-auto sm:p-6 bg-white rounded-lg">
          <h2 class="text-right text-2xl font-bold mb-8 mt-3">اطلاعات ارسال</h2>
          <form
            @submit.prevent="submitForm"
            class="sm:space-y-10 sm:p-8 p-4 rounded-md border border-gray-200"
          >
            <!-- Name Fields -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="firstName" class="block text-gray-700 mb-2"
                  >نام</label
                >
                <InputText
                  id="firstName"
                  placeholder="نام"
                  class="w-full"
                  v-model="namemodel"
                />
                <span class="text-red-500 text-sm">{{ errors.namemodel }}</span>
              </div>
              <div>
                <label for="lastName" class="block text-gray-700 mb-2"
                  >نام خانوادگی</label
                >
                <InputText
                  id="lastName"
                  placeholder="نام خانوادگی"
                  class="w-full"
                  v-model="familymodel"
                />
                <span class="text-red-500 text-sm">{{
                  errors.familymodel
                }}</span>
              </div>
            </div>

            <!-- Address -->
            <div>
              <label for="address" class="block text-gray-700 mb-2">آدرس</label>
              <InputText
                id="address"
                v-model="addressmodel"
                placeholder="آدرس"
                class="w-full"
              />
              <span class="text-red-500 text-sm">{{
                errors.addressmodel
              }}</span>
            </div>

            <!-- City and Postal Code -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="city" class="block text-gray-700 mb-2">استان</label>

                <Dropdown
                  id="city"
                  :options="state"
                  v-model="provincemodel"
                  optionLabel="stateNameFa"
                  placeholder="انتخاب استان"
                  class="w-full"
                  filter
                />
                <span class="text-red-500 text-sm">{{
                  errors.provincemodel
                }}</span>
              </div>
              <div>
                <label for="city" class="block text-gray-700 mb-2">شهر</label>
                <Dropdown
                  id="city"
                  :options="city"
                  v-model="cityidmodel"
                  optionLabel="cityNameFa"
                  placeholder="انتخاب شهر"
                  class="w-full"
                  filter
                />
                <span class="text-red-500 text-sm">{{
                  errors.cityidmodel
                }}</span>
              </div>
            </div>

            <!-- Phone and Email -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="phone" class="block text-gray-700 mb-2"
                  >تلفن همراه</label
                >
                <InputText
                  id="phone"
                  placeholder=" تلفن همراه"
                  class="w-full"
                  v-model="cellphonemodel"
                />
                <span class="text-red-500 text-sm">{{
                  errors.cellphonemodel
                }}</span>
              </div>
              <!-- <div>
                <label for="email" class="block text-gray-700 mb-2"
                  >ایمیل</label
                >
                <InputText
                  id="email"
                  placeholder="ایمیل"
                  class="w-full"
                  v-model="emailmodel"
                />
                <span class="text-red-500 text-sm">{{ errors.emailmodel }}</span>
              </div> -->
              <div>
                <label for="city" class="block text-gray-700 mb-2"
                  >کدپستی</label
                >
                <InputText
                  id="phone"
                  placeholder="کدپستی"
                  class="w-full"
                  v-model="postal_codemodel"
                />
                <span class="text-red-500 text-sm">{{
                  errors.postal_codemodel
                }}</span>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6"></div>

            <!-- Delivery Method -->
            <h3 class="text-right text-xl font-semibold mt-8">
              انتخاب روش ارسال
            </h3>
            <div class="mx-auto">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- First Option -->
                <!-- <div
                  class="flex flex-col items-center justify-center p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div class="flex items-center">
                    <img
                      src="/public/checkout/1.png"
                      alt="تیپاکس لوگو"
                      class="ml-3"
                    />
                    <span class="text-lg font-semibold ml-2">تیپاکس</span>
                  </div>
                  <p class="text-gray-600 mt-2">
                    هزینه به صورت پس کرایه می باشد
                  </p>

                  <div class="flex items-center gap-2 mt-2">
                    <RadioButton
                      v-model="sendwaymodel"
                      inputId="ingredient1"
                      name="pizza"
                      value="tipaxe"
                    />
                  </div>
                </div> -->

                <div
                  class="flex flex-col items-center justify-center p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div class="flex items-center">
                    <img
                      src="/public/checkout/deka.webp"
                      alt="دکاپست"
                      class="ml-3"
                    />
                    <!-- <span class="text-lg font-semibold ml-2">دکاپست</span> -->
                  </div>
                  <p class="text-gray-600 mt-2">
                    هزینه به صورت پس کرایه می باشد
                  </p>

                  <div class="flex items-center gap-2 mt-2">
                    <RadioButton
                      v-model="sendwaymodel"
                      inputId="ingredient1"
                      name="pizza"
                      value="decapost"
                    />
                  </div>
                </div>

                <div
                  v-if="cityidmodel.cityCode == 71"
                  class="flex flex-col items-center justify-center p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div class="flex items-center">
                    <img
                      src="/public/لیست-پیک-موتوری-های-مشهد.webp"
                      style="width: 20px; height: 20px"
                      alt="تیپاکس لوگو"
                      class="ml-3"
                    />
                    <span class="text-lg font-semibold ml-2">پیک فروشگاه</span>
                  </div>
                  <p class="text-gray-600 mt-2">ارسال توسط پیک فروشگاه</p>

                  <div class="flex items-center gap-2 mt-2">
                    <RadioButton
                      v-model="sendwaymodel"
                      inputId="ingredient1"
                      name="pizza"
                      value="peykphoroshgah"
                    />
                  </div>
                </div>
              </div>
              <span class="text-red-500 text-sm">{{
                errors.sendwaymodel
              }}</span>
            </div>

            <!-- Payment Method -->
            <h3 class="text-right text-xl font-semibold mt-8">
              انتخاب درگاه پرداخت
            </h3>
            <div class="mx-auto">
              <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                <!-- First Option -->
                <div
                  class="flex flex-col items-center justify-center p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div class="flex items-center">
                    <img
                      src="/public/RLg1000747www.tiktarh.com_.jpg"
                      alt="زرین پال لوگو"
                      class="ml-3"
                      style="width: 120px; height: 80px"
                    />
                    <span class="text-lg font-semibold ml-2">زرین پال </span>
                  </div>

                  <div class="flex items-center gap-2 mt-2">
                    <RadioButton
                      v-model="ingredient1"
                      inputId="ingredient1"
                      name="pizza"
                      value="zarinpal"
                    />
                  </div>
                </div>
                <!-- <div
                  class="flex flex-col items-center justify-center p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div class="flex items-center">
                    <img
                      src="/public/IMG_8982.jpeg"
                      alt="تومن لوگو"
                      class="ml-3"
                      style="width: 80px; height: 80px"
                    />
                    <span class="text-lg font-semibold ml-2">درگاه تومن </span>
                  </div>

                  <div class="flex items-center gap-2 mt-2">
                    <RadioButton
                      v-model="ingredient1"
                      inputId="ingredient2"
                      name="pizza"
                      value="toman"
                    />
                  </div>
                </div> -->
                <div
                  class="flex flex-col items-center justify-center p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div class="flex items-center">
                    <img
                      src="/public/checkout/download.png"
                      alt="تومن لوگو"
                      class="ml-3"
                      style="width: 80px; height: 80px"
                    />
                    <span class="text-lg font-semibold ml-2">
                      پرداخت قسطی ستاره یک
                    </span>
                  </div>

                  <div class="flex items-center gap-2 mt-2">
                    <RadioButton
                      v-model="ingredient1"
                      inputId="ingredient2"
                      name="pizza"
                      value="setareyek"
                    />
                  </div>
                </div>
                <span class="text-red-500 text-sm">{{
                  errors.ingredient1
                }}</span>
              </div>
            </div>

            <!-- Additional Notes -->
            <div>
              <label for="notes" class="block text-gray-700 mb-2"
                >توضیحات اختیاری</label
              >
              <Textarea
                v-model="descriptionmodel"
                rows="5"
                cols="30"
                class="w-full rounded-md mt-2"
              />
            </div>

            <!-- Submit Button -->
            <div class="flex flex-items justify-end">
              <Button
                label="پرداخت"
                icon="mdi mdi-arrow-left"
                iconPos="right"
                class="text-white rounded-b-lg w-full"
                style="
                  background-color: #405ff2;
                  border: 1px solid #405ff2;
                  width: 250px;
                "
                @click="submitForm"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedCity: null,
      cities: [
        { name: "New York", code: 1 },
        { name: "Rome", code: 2 },
        { name: "London", code: 3 },
        { name: "Istanbul", code: 4 },
        { name: "Paris", code: 5 },
      ],
      ingredient: "",
      ingredient1: "",
      des: null,
      state: null,
      cityfilter: null,
    };
  },
  // watch: {
  //     // وقتی categoryid تغییر کند
  //     provincemodel() {
  //        this.getcity()
  //     },
  //   },

  methods: {
    async getstate() {
      try {
        this.state = await $fetch("/api/postservise/state", {
          method: "POST",
        });
        // console.log("state", this.state);
      } catch (error) {
        // errors.value = Object.values(error.data.data.message).flat();
        console.log(error);
      } finally {
      }
    },
  },

  beforeMount() {
    this.getstate();
  },
};
</script>
<!-- <script setup>
import { useCartStore } from "../store/cart";


const cart = useCartStore();
const cartItems = computed(() => cart.allItems);
const { authUser } = useAuth();
const totalAmount = computed(() => cart.totalAmount)
const totalAmountoff = computed(() => cart.totalAmountoff)
const totalAmountkol = computed(() => cart.totalAmountkol)



const namemodel = ref("");
const familymodel = ref("");
const addressmodel = ref("");
const emailmodel = ref("");
const cellphonemodel = ref("");
const postal_codemodel = ref("");
const sendwaymodel = ref("");
const descriptionmodel = ref("");
const provincemodel = ref("");
const cityidmodel = ref("");

const { handleSubmit, errors } = useForm({ validationSchema: schema });

const city = ref("");

watch(provincemodel.value, () => {
  getcity();
});



function priceser(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}



async function payment() {
  try {
    // loading.value = true;
    let datalocall = toRaw(cartItems.value);
    const data = await $fetch("/api/payment/send", {
      method: "POST",
      body: {
        user_id: toRaw(authUser.value.id),
        name: namemodel.value,
        family: familymodel.value,
        address: addressmodel.value,
        email: emailmodel.value,
        cellphone: cellphonemodel.value,
        postal_code: postal_codemodel.value,
        sendway: sendwaymodel.value,
        description: descriptionmodel.value,
        province_id: provincemodel.value.statePostCode,
        city_id: cityidmodel.value.cityCode,
        provincename : provincemodel.value.stateNameFa,
        cityname : cityidmodel.value.cityNameFa,
        order_items: datalocall,
        request_from: "web",
      },
    });
    console.log("data", data.data.url);

    await navigateTo(data.data.url, {
      external: true,
    });

    // router.go(data.url);
    // window.location.href = data.url;
  } catch (error) {
    // toast.error(Object.values(error.data.data.message).flat().toString());
    console.log("error", error);
  } finally {
    // loading.value = false;
  }
}

async function getcity() {
      try {
        city.value = await $fetch("/api/postservise/city", {
          method: "POST",
          body : {
            stateCode : provincemodel.value.statePostCode
          }
        });
        console.log("city", city.value);
      } catch (error) {
        // errors.value = Object.values(error.data.data.message).flat();
        console.log(error);
      } finally {

      }
 
    }
</script> -->

<script setup>
import { ref, computed, watch, toRaw } from "vue";
import { useCartStore } from "../store/cart";

const cart = useCartStore();
const cartItems = computed(() => cart.allItems);
const { authUser } = useAuth();
const totalAmount = computed(() => cart.totalAmount);
const totalAmountoff = computed(() => cart.totalAmountoff);
const totalAmountkol = computed(() => cart.totalAmountkol);

const namemodel = ref("");
const familymodel = ref("");
const addressmodel = ref("");
const emailmodel = ref("");
const cellphonemodel = ref("");
const postal_codemodel = ref("");
const sendwaymodel = ref("");
const descriptionmodel = ref("");
const provincemodel = ref("");
const cityidmodel = ref("");
const ingredient1 = ref("");

const city = ref("");
const errors = ref({});

watch(provincemodel, () => {
  getcity();
});

function priceser(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function validateForm() {
  errors.value = {};

  if (!namemodel.value) {
    errors.value.namemodel = "نام الزامی است.";
  }
  if (!familymodel.value) {
    errors.value.familymodel = "نام خانوادگی الزامی است.";
  }
  if (!addressmodel.value) {
    errors.value.addressmodel = "آدرس الزامی است.";
  }
  // if (!emailmodel.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailmodel.value)) {
  //   errors.value.emailmodel = "ایمیل معتبر وارد کنید.";
  // }
  if (!cellphonemodel.value || !/^09\d{9}$/.test(cellphonemodel.value)) {
    errors.value.cellphonemodel = "شماره تلفن معتبر وارد کنید.";
  }
  if (!postal_codemodel.value || postal_codemodel.value.length !== 10) {
    errors.value.postal_codemodel = "کدپستی باید ۱۰ رقم باشد.";
  }
  if (!provincemodel.value) {
    errors.value.provincemodel = "استان الزامی است.";
  }
  if (!cityidmodel.value) {
    errors.value.cityidmodel = "شهر الزامی است.";
  }
  if (!sendwaymodel.value) {
    errors.value.sendwaymodel = "روش ارسال را انتخاب کنید.";
  }
  if (!ingredient1.value) {
    errors.value.ingredient1 = "درگاه پرداخت را انتخاب کنید.";
  }

  return Object.keys(errors.value).length === 0;
}

async function submitForm() {
  if (!validateForm()) {
    console.log("Validation failed", errors.value);
    return;
  }
  if (ingredient1.value == "setareyek") {
    try {
      let datalocall = toRaw(cartItems.value);
      const data = await $fetch("/api/paymentsetareyek/send", {
        method: "POST",
        body: {
          user_id: toRaw(authUser.value.id),
          name: namemodel.value,
          family: familymodel.value,
          address: addressmodel.value,
          email: emailmodel.value,
          cellphone: cellphonemodel.value,
          postal_code: postal_codemodel.value,
          sendway: sendwaymodel.value,
          description: descriptionmodel.value,
          province_id: provincemodel.value.statePostCode,
          city_id: cityidmodel.value.cityCode,
          provincename: provincemodel.value.stateNameFa,
          cityname: cityidmodel.value.cityNameFa,
          order_items: datalocall,
          request_from: "setareyek",
        },
      });
      // console.log("data setareyek", data);

      await navigateTo(data.data.url, {
        external: true,
      });
    } catch (error) {
      console.log("error", error);
    }
  } else if (ingredient1.value == "zarinpal") {
    try {
      let datalocall = toRaw(cartItems.value);
      const data = await $fetch("/api/payment/send", {
        method: "POST",
        body: {
          user_id: toRaw(authUser.value.id),
          name: namemodel.value,
          family: familymodel.value,
          address: addressmodel.value,
          email: emailmodel.value,
          cellphone: cellphonemodel.value,
          postal_code: postal_codemodel.value,
          sendway: sendwaymodel.value,
          description: descriptionmodel.value,
          province_id: provincemodel.value.statePostCode,
          city_id: cityidmodel.value.cityCode,
          provincename: provincemodel.value.stateNameFa,
          cityname: cityidmodel.value.cityNameFa,
          order_items: datalocall,
          request_from: "web",
        },
      });
      console.log("data", data);

      await navigateTo(data.data.url, {
        external: true,
      });
    } catch (error) {
      console.log("error", error);
    }
  } else {
    console.log("درگاه پرداخت را انتخاب کنید.");
  }
}

async function getcity() {
  try {
    city.value = await $fetch("/api/postservise/city", {
      method: "POST",
      body: {
        stateCode: provincemodel.value.statePostCode,
      },
    });
    console.log("city", city.value);
  } catch (error) {
    console.log(error);
  }
}
</script>

<style lang="scss">
.cardpage {
  .rightc {
    width: 100%;
  }
  .p-inputnumber-input {
    width: 40px;
  }
  h1 {
    font-size: 30px;
    margin-top: 10px;
  }
  box-sizing: border-box;
  padding: 10px 80px;
}
@media only screen and (max-width: 650px) {
  .cardpage {
    padding: 10px 10px;
  }
}
</style>
