<template>
  <div class="brans text-center">
    <p class="text-primary mb-12" style="font-size: 24px">
      جستجو بر اساس سازنده
    </p>
    <div class="grid grid-cols-2 sm:grid-cols-9 gap-2">
      <nuxt-link to="/product?carcompany=ایران%20خودرو">
        <Card class="cardbrand">
          <template #title>
            <img src="../../public/brands/1.png" alt="" />
          </template>
          <template #content>
            <p>ایران خودرو</p>
          </template>
        </Card>
      </nuxt-link>
      <nuxt-link to="/product?carcompany=سایپا">
        <Card class="cardbrand">
          <template #title>
            <img src="../../public/brands/2.png" alt="" />
          </template>
          <template #content>
            <p>سایپا</p>
          </template>
        </Card>
      </nuxt-link>
      <nuxt-link to="/product?carcompany=کیا">
        <Card class="cardbrand">
          <template #title>
            <img src="../../public/brands/3.png" alt="" />
          </template>
          <template #content>
            <p>کیا</p>
          </template>
        </Card>
      </nuxt-link>
      <nuxt-link to="/product?carcompany=هیوندای">
        <Card class="cardbrand">
          <template #title>
            <img src="../../public/brands/4.png" alt="" />
          </template>
          <template #content>
            <p>هیوندای</p>
          </template>
        </Card>
      </nuxt-link>
      <nuxt-link to="/product?carcompany=مزدا">
        <Card class="cardbrand">
          <template #title>
            <img src="../../public/brands/5.png" alt="" />
          </template>
          <template #content>
            <p>مزدا</p>
          </template>
        </Card>
      </nuxt-link>
      <nuxt-link to="/product?carcompany=دانگ فنگ">
        <Card class="cardbrand">
          <template #title>
            <img src="../../public/brands/6.png" alt="" />
          </template>
          <template #content>
            <p>دانگ فنگ</p>
          </template>
        </Card>
      </nuxt-link>
      <nuxt-link to="/product?carcompany=رنو">
        <Card class="cardbrand">
          <template #title>
            <img src="../../public/brands/7.png" alt="" />
          </template>
          <template #content>
            <p>رنو</p>
          </template>
        </Card>
      </nuxt-link>
      <nuxt-link to="/product?carcompany=نیسان">
        <Card class="cardbrand">
          <template #title>
            <img src="../../public/brands/8.png" alt="" />
          </template>
          <template #content>
            <p>نیسان</p>
          </template>
        </Card>
      </nuxt-link>
      <nuxt-link to="/product?carcompany=سیتروئن">
      <Card class="cardbrand">
        <template #title>
          <img src="../../public/brands/9.png" alt="" />
        </template>
        <template #content>
          <p>سیتروئن</p>
        </template>
      </Card>
    </nuxt-link>

    </div>
  </div>
</template>
<style lang="scss">
.brans {
  margin: 160px 80px;

  .cardbrand {
    box-shadow: none;
    border: 1px solid #e9e9e9;
  }
}
@media only screen and (max-width: 650px) {
  .brans {
    margin: 20px 10px;
  }
}
</style>
