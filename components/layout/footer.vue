<template>
  <div style="bottom: 0; position: relative">
    <div class="footer">
      <div class="grid grid-cols-1 sm:grid-cols-5">
        <div>
          <ul>
            <li class="one">پارس اتو پارت</li>
            <nuxt-link to="/"> <li>صفحه اصلی</li></nuxt-link>
            <nuxt-link to="/product"> <li>فروشگاه</li></nuxt-link>
            <nuxt-link to="/blogs"> <li>بلاگ</li></nuxt-link>
            <nuxt-link to="/"> <li>پیگیری سفارش</li></nuxt-link>
            <nuxt-link to="/abouteus"> <li>درباره ما</li></nuxt-link>
          </ul>
        </div>
        <div>
          <ul>
            <li class="one">خودرو ها</li>
            <div v-for="(item, index) in carAll" :key="index">
              <nuxt-link :to="`/product?carmodel=${item.name}`">
                <li>{{ item.name }}</li>
              </nuxt-link>
            </div>
          </ul>
        </div>
        <div>
          <ul>
            <li class="one">برترین برند ها</li>
            <div v-for="(item, index) in brandAll" :key="index">
              <nuxt-link :to="`/product?brandname=${item.name}`">
                <li>{{ item.name }}</li>
              </nuxt-link>
            </div>
          </ul>
        </div>
        <div>
          <ul>
            <li class="one">لینک های مفید</li>
            <li>ایران خودرو</li>
            <li>سایپا</li>
            <li>کرمان موتور</li>
            <li>اتاق بازرگانی</li>
          </ul>
          <client-only>
            <div style="width: 200px; height: 200px">
              <a
                referrerpolicy="origin"
                target="_blank"
                href="https://trustseal.enamad.ir/?id=462659&Code=h6Zqy08hYOhWFpBGBh18V88VjNz26WJ0"
                ><img
                  src="../../public/enamad.png"
                  alt="enamad"
                  style="cursor: pointer"
                  id="h6Zqy08hYOhWFpBGBh18V88VjNz26WJ0"
              /></a>
              <!-- <a
                target="_blank"
                rel="origin"
                href="https://trustseal.enamad.ir/?id=92281&amp;Code=pGY3jgvOFAbMqVFPL4LW"
                ><img
                  src="https://www.banimode.com/assets/img/enamad.png"
                  alt="enamad"
                  style="cursor: pointer"
                  id="pGY3jgvOFAbMqVFPL4LW"
              /></a> -->
            </div>
          </client-only>
        </div>
        <div>
          <ul>
            <li class="one">ساعت کاری</li>
            <li>شنبه - چهارشنبه : 8 صبح تا 6 عصر</li>
            <li>پنجشنبه : 8 صبح تا 2 ظهر</li>
            <li>جمعه : تعطیل</li>
            <li>ارتباط با ما</li>
            <li class="flex items-center">
              <img
                src="/public/footer/SVG.png"
                alt=""
                class="ml-2"
                style="width: 14px; height: 22px"
              />
               <span> <a href="tel:+989173335691"> 09173335691 </a> </span>   
            </li>
            <li class="flex items-center">
              <img
                src="/public/footer/SVG.png"
                alt=""
                class="ml-2"
                style="width: 14px; height: 22px"
              />
               <span> <a href="tel:+989173335692"> 09173335692 </a> </span>   
            </li>
            <li class="flex items-center">
              <img
                src="/public/footer/SVG.png"
                alt=""
                class="ml-2"
                style="width: 14px; height: 22px"
              />
               <span> <a href="tel:+987138427497"> 07138427497 </a> </span>   
            </li>
            <li class="flex mt-4">
              <img src="/public/footer/Symbol.png" alt="" class="ml-2" />
              <img src="/public/footer/Symbol (1).png" alt="" class="ml-2" />
              <img src="/public/footer/Symbol (2).png" alt="" class="ml-2" />
              <img src="/public/footer/Symbol (3).png" alt="" class="ml-2" />
              <img src="" alt="" />
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="under-footer">
      <div class="flex justify-between">
        <p>تمامی حقوق محفوظ میباشد.</p>
        <p>© 1403 parsautoparts.ir</p>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.footer {
  margin: 60px 80px;
  li {
    line-height: 40px;
  }
  .one {
    font-size: 20px;
    color: gray;
  }
}
.under-footer {
  padding: 10px 80px;
  border-top: 1px solid #e1e1e1;
}
@media only screen and (max-width: 650px) {
  .footer {
    margin: 10px 10px;
  }
  .under-footer {
    padding: 10px;
  }
}
</style>
<script>
export default {
  data() {
    return {
      car: null,
      carAll: null,
      brand: null,
      brandAll: null,
    };
  },
  methods: {
    async getmodel(par) {
      try {
        this.car = await $fetch("/api/advancedsearch/model", {
          query: { page: par },
        });
        this.carAll = this.car.cars.slice(0, 8);
      } catch (error) {
        console.log(error);
      } finally {
        // console.log("model", toRaw(this.car));
      }
    },
    async getbrans(par) {
      try {
        this.brand = await $fetch("/api/advancedsearch/brand", {
          query: { page: par },
        });
        this.brandAll = this.brand.brands.slice(0, 8);
      } catch (error) {
        console.log(error);
      } finally {
        // console.log("brand", toRaw(this.brand));
      }
    },
  },
  beforeMount() {
    this.getmodel();
    this.getbrans();
  },
};
</script>
