<template>
  <div class="aboutus">
    <Head>
      <Title>پارس اتوپارت</Title>
      <Meta
        name="description"
        content="ما به عنوان یک شرکت متعهد، به ایجاد رابطه‌ای بلندمدت و مؤثر با مشتریان خود اهمیت می‌دهیم. ارزش‌های ما شامل کیفیت، صداقت، و مشتری‌مداری است "
      />
    </Head>
    <div class="sec1">
      <div class="mt-4">
        <nuxt-link to="/">
          <span style="color: #0b6d20"> home / </span>
        </nuxt-link>
        <span>support</span>
      </div>
      <div class="flex flex-col mt-6">
        <div class="flex flex-col">
          <p>topic</p>
          <InputText class="mt-2" type="text" v-model="value" />
        </div>
        <div class="flex flex-col mt-4">
          <p>description</p>
          <Textarea v-model="value" rows="10" cols="30" />
        </div>
        <div class="flex justify-end mt-6">
          <Button
            label="send"
            class="p-button-sm p-button-success w-28 "
          />
        </div>
      </div>
    </div>
    <div class="sec2"></div>
  </div>
</template>
<script>
export default {
  data() {},
};
</script>
<style lang="scss">
.aboutus {
  background-color: #f9fbfc;
  .sec1 {
    padding: 10px 80px 0 80px;
  }
  .arow {
    width: 14px;
    height: 14px;
  }
  .sec2 {
    margin-top: 100px;
    background-image: url("/public/SL-0212121-40670-68.jpg");
    background-size: cover;
    width: 100%;
    height: 600px;
  }
  .sec4 {
    padding-bottom: 200px;
    border-bottom: 1px solid #e1e1e1;
  }
  .Besiness {
    height: 100%;
    width: 100%;
    background-color: blue;
    border-radius: 12px;
    font-size: 40px;
    color: white;
  }
  .card {
    width: 100%;
  }
  .ac {
    width: 60%;
    margin: auto;
  }
  img {
    border-radius: 8px;
  }
  h1 {
    font-size: 30px;
    margin-top: 10px;
  }
}
@media only screen and (max-width: 650px) {
  .aboutus {
    padding: 0;
    .sec2 {
      margin-top: 50px;
    }
    .sec3 {
      margin-top: 30px;
    }
    .sec4 {
      padding-bottom: 40px;
    }
    .ac {
      width: 100%;
      margin: auto;
    }
  }
}
</style>
