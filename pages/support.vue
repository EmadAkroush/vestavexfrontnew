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
          <span style="color: #405ff2"> home / </span>
        </nuxt-link>
       
      </div>
      <div>
        <h1> 
            <InputText type="text" v-model="value" />
        </h1>
        <p>
          Welcome to our investment platform — a smart and transparent system
          designed to help you grow your wealth through structured investment
          plans and a powerful network-based reward system. Our platform offers
          a variety of investment bundles with monthly returns, portfolio
          management, and easy fund management options such as deposit and
          withdrawal. With innovative features like the VX Plan, binary
          commissions, and the 10x growth rule, we empower our community to
          achieve sustainable financial growth while building strong network
          connections. We are committed to providing a secure, user-friendly
          environment where every investor can track progress, maximize
          earnings, and access real-time support. Together, we create
          opportunities for financial freedom and long-term success.
        </p>
      </div>
    </div>
    <div class="sec2"></div>
  </div>
</template>
<script>
export default {
  data(){
    
  }
}
</script>
<style lang="scss">
.aboutus {
  background-color: #f9fbfc;
  .sec1 {
    padding: 10px 80px;
  }
  .arow {
    width: 14px;
    height: 14px;
  }
  .sec2 {
    margin-top: 200px;
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
    padding: 10px 10px;
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
