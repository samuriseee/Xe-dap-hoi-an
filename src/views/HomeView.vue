<template>
  <div>
    <HeroSection @search-bike="searchBike" />
    <div class="wrapper">
      <cart-component />
      <div class="typesOfBike">
        <div v-for="type in typeOfBikes" :key="type.id" class="type">
          <img src="@/assets/icon/bike_icon.png" alt="" />
          <div class="bikeText">
            <span class="bikeName">{{ type.ten_loai_xe }}</span>
          </div>
        </div>
      </div>

      <div class="filterAndList" v-if="this.$store.state.datetimepicker">
        <div class="filter">
          <h2>Bộ lọc</h2>
        </div>
        <div class="list">
          <bike-rental-card
            v-for="bike in filteredBikeList"
            :key="bike.id"
            :bike="bike"
            @add-to-cart="addToCart"
          />
        </div>
      </div>
      <div class="list" v-else>
        <h1>Phải chọn ngày giờ</h1>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import CartComponent from "@/components/ui/CartComponent.vue";
import BikeRentalCard from "@/components/HomeView/BikeRentalCard.vue";
import HeroSection from "@/components/HomeView/HeroSection.vue";
import { mapGetters } from "vuex";
export default {
  name: "HomeView",
  components: {
    HeroSection,
    BikeRentalCard,
    CartComponent,
  },
  created() {
    this.$store.dispatch("getAllTypeOfBike");
  },
  computed: {
    typeOfBikes() {
      const typeOfBikes = this.$store.getters.getAllTypeOfBike;
      if (!typeOfBikes || typeOfBikes.length === 0) {
        // Handle the case when typeOfBikes is null or empty
        // You can return a default value or an empty array
        return []; // Return an empty array as a fallback
      }
      return typeOfBikes;
    },
  },
  data() {
    return {
      bikes: [],
    };
  },
  created() {
    this.getBikes();
  },
  computed: {
    ...mapGetters([
      "startDateFormatted",
      "endDateFormatted",
      "startTime",
      "endTime",
    ]),
    filteredBikeList() {
      if (this.$store.state.datetimepicker) {
        // Perform filtering based on the search criteria
        // Return the filtered bike list
        return this.bikes;
      } else {
        // Return the default list of all bikes
        return this.bikes;
      }
    },
  },
  methods: {
    addToCart(bike) {
      this.$store.dispatch("addToCart", bike);
    },
    async searchBike() {
      if (this.$store.state.datetimepicker) {
        const API = `${process.env.VUE_APP_API}/xe/ngay_thue/${this.startDateFormatted}/gio_thue/${this.startTime}/ngay_tra/${this.endDateFormatted}/gio_tra/${this.endTime}`;
        await axios
          .get(API)
          .then((res) => {
            res.data.map((item) => {
              item.anh = JSON.parse(item.anh);
              return item;
            });
            this.bikes = res.data;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    async getBikes() {
      const API = `${process.env.VUE_APP_API}/xe/trang_thai/1`;
      await axios
        .get(API)
        .then((res) => {
          res.data.map((item) => {
            item.anh = JSON.parse(item.anh);
            return item;
          });
          this.bikes = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>


<style scoped>
.wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}
.typesOfBike {
  width: 1165px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  margin: 20px auto;
}
.type {
  width: -moz-fit-content;
  width: fit-content;
  display: -webkit-box;
  display: flex;
  padding: 0 12px;
  -webkit-box-align: center;
  align-items: center;
  height: 74px;
  border-radius: 12px;
  border: 1px solid #eee;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.02);
  cursor: pointer;
  position: relative;
  margin-right: 12px;
}
.type:hover {
  border: 1px solid #d70000;
}
.type img {
  width: 70px;
  height: 50px;
  object-fit: contain;
}
.type .bikeText {
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  margin-left: 6px;
  text-align: left;
}
.type .bikeName {
  font-size: 16px;
  font-weight: 700;
  color: #333;
}
.type .bikePrice {
  font-size: 12px;
  color: #757575;
}
.filterAndList {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.filter {
  width: 285px;
  height: 500px;
  padding: 0 20px;
  box-sizing: border-box;
  border: 1px solid #eee;
  border-radius: 12px;
}
.list {
  margin-left: 20px;
}
</style>