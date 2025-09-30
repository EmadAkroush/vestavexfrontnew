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
      <span>aboute us</span>
    </div>
    <div >
      <h1>aboute us</h1>
    </div>
    </div>
    <div class="sec2">

    </div>


 
  </div>
</template>
<style lang="scss">
.aboutus {
  background-color: #f9fbfc;
  .sec1{
      padding: 10px 80px;
  }
  .arow {
    width: 14px;
    height: 14px;
  }
  .sec2 {
    margin-top: 200px;
    background-image: url('/public/SL-0212121-40670-68.jpg');
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
