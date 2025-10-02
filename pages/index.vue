<template>
  <div>
    <div class="home">
      <Head>
        <Title>vestavex</Title>
        <Meta
          name="description"
          content=""
        />
      </Head>
      <div class="Htext">
        <p class="toppoint">vestavex</p>
        <h1 class="">
          Smart investment platform with network-driven profit growth
        </h1>
        <Button
          label="sign up now and start investing"
          class="homebtn p-button-sm p-button-success w-68 mt-4"
          icon="mdi mdi-arrow-left"
        />
      </div>

    </div>
    <div class="secmain">
      <HomeBrands></HomeBrands>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cardata: null,
      carpart: null,
      carmodel: null,
      carcompany: null,
      part: null,
      partAll: null,
      car: null,
      carAll: null,
      company: null,
      companyAll: null,

      cities: [
        { name: "New York", code: "NY" },
        { name: "Rome", code: "RM" },
        { name: "London", code: "LDN" },
        { name: "Istanbul", code: "IST" },
        { name: "Paris", code: "PRS" },
      ],
    };
  },
  computed: {
    computedUrl() {
      // Conditionally build the query string
      let url = `/product/?`;
      if (this.cardata) {
        url += `cardata=${this.cardata}&`;
      }
      // Add 'carpart' only if it has a value
      if (this.carpart) {
        url += `carpart=${this.carpart.name}&`;
      }
      if (this.carmodel) {
        url += `carmodel=${this.carmodel.name}&`;
      }
      if (this.carcompany) {
        url += `carcompany=${this.carcompany.name}&`;
      }

      // Return the constructed URL
      return url;
    },
  },
  methods: {
    async getpart(par) {
      try {
        this.part = await $fetch("/api/advancedsearch/part", {
          query: { page: par },
        });
        this.partAll = this.part.carparts;
      } catch (error) {
        console.log(error);
      } finally {
        console.log("part", toRaw(this.part));
      }
    },
    async getmodel(par) {
      try {
        this.car = await $fetch("/api/advancedsearch/model", {
          query: { page: par },
        });
        this.carAll = this.car.cars;
      } catch (error) {
        console.log(error);
      } finally {
        console.log("model", toRaw(this.car));
      }
    },
    test() {
      console.log("ghgg", this.carpart.name);
    },
    async getcompany(par) {
      try {
        this.company = await $fetch("/api/advancedsearch/company", {
          query: { page: par },
        });
        this.companyAll = this.company.companies;
      } catch (error) {
        console.log(error);
      } finally {
        console.log("company", toRaw(this.company));
      }
    },
  },
  beforeMount() {
    this.getpart();
    this.getmodel();
    this.getcompany();
  },
};
</script>

<style lang="scss">
.toppoint {
  color: #10b981;
  padding-top: 60px;
}
.secmain {
  box-sizing: border-box;
}
.home {
  width: 100%;
  box-sizing: border-box;
  background-color: #eef1fb;
  height: 80vh;
  text-align: center;
  background-image: url(../public/bg.jpg);
  background-size: cover;
  border-radius: 0 0 30px 30px;
  overflow-x: hidden;

  .Htext {
    color: white;

  }


 

  h1 {
    font-size: 34px;
    margin-top: 10px;
  }
}
@media only screen and (max-width: 650px) {
  .secmain {
    margin: 50px 0;
  }
  .home {
    .toppoint {
      padding-top: 30px;
    }
    box-sizing: border-box;
    padding: 0 10px;

  }
}
</style>
