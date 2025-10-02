<template>
  <div style="bottom: 0; position: relative ; background-color: black; color: white;">
    <div class="footer" style="padding-top: 10px;">
      <div class="grid grid-cols-1 sm:grid-cols-5">
        <div>
          <ul>
            <li class="one">vestavex</li>
            <nuxt-link to="/"> <li> Home </li></nuxt-link>
            <nuxt-link to="/bundles"> <li> Bundles </li></nuxt-link>
            <nuxt-link to="/addfunds"> <li> Add Funds </li></nuxt-link>
            <nuxt-link to="/abouteus"> <li> About Us </li></nuxt-link>
            <nuxt-link to="/support"> <li> support </li></nuxt-link>
          </ul>
        </div>
        <div>
      
        </div>
        <div>
     
        </div>
        <div>
                    <!-- <img src="/public/Cam1.jpg" alt="" class="icon-footer"> -->

   
        </div>
        <div >
          <ul>
         
            <li>Contact Us</li>
            <li class="flex items-center">
              <img
                src="/public/footer/SVG.png"
                alt=""
                class="ml-2"
                style="width: 14px; height: 22px"
              />
               <span> <a href=""> vesta@gmail.com </a> </span>   
            </li>
         
     
          </ul>
        </div>
      </div>
    </div>
    <div class="under-footer">
      <div class="flex justify-between">
        <p> All Rights Reserved </p>
        <p>© 2024 vestavex </p>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.footer {


  padding: 10px 80px;
  li {
    line-height: 40px;
  }
  .one {
    font-size: 20px;
    color: #0b6d20;
  }
  .icon-footer {
    width: 200px;
    height: 200px;
  }
}

.under-footer {
  padding: 10px 80px;
  border-top: 1px solid #e1e1e1;
  color: #0b6d20;

}
@media only screen and (max-width: 650px) {
  .footer {
  
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
