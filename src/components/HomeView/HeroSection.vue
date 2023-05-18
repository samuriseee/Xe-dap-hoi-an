<template>
  <div class="wrapper">
    <div class="text">
      <h1>
        Xe đạp <br />
        đỉnh nhất cái Hội An này
      </h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
        voluptatum, voluptate, quibusdam, quia voluptas quod quos exercitationem
        quas voluptatibus quidem doloribus. Quisquam voluptatum, voluptate,
        quibusdam, quia voluptas quod quos exercitationem quas voluptatibus
        quidem doloribus.
      </p>
      <div class="container_search">
        <SearchBar class="searchBar" />
        <div class="datePicker">
          <label for="">Ngày Giờ đặt xe - Ngày Giờ trả xe</label>
          <DateRangePicker />
        </div>
        <button
          type="submit"
          class="text-white ml-3 right-2.5 bottom-2.5"
          @click="handleSearchBike"
        >
          Tìm kiếm
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from "./SearchBar.vue";
import DateRangePicker from "./DateRangePicker.vue";
export default {
  name: "HeroSection",
  components: {
    DateRangePicker,
    SearchBar,
  },
  methods: {
    handleSearchBike() {
      this.$emit("search-bike");
    },
  },
};
</script>

<style scoped>
.wrapper {
  position: relative;
  width: 100%;
  height: 60vh;
  background-image: url("../../assets/image/hero-image.jpg");
  object-fit: cover;
  background-position: center;
}
.wrapper::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: inherit;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0.5;
}
.text {
  width: 50%;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ffffff;
  text-align: left;
  z-index: 2;
}
.text h1 {
  font-size: 3rem;
  margin-bottom: 20px;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
  font-weight: 700;
  text-transform: uppercase;
}
.text p {
  font-size: 1.2rem;
  margin-bottom: 20px;
}
.text button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #42b983;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
}
.container_search {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  position: relative;
  z-index: 7;
  margin: 0 auto;
  border-radius: 12px 0px 12px 12px;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.08);
}
.container_search .searchBar {
  width: 55%;
}
.container_search .datePicker {
  width: 45%;
  display: flex;
  flex-direction: column;
  color: black;
  text-align: center;
}
.container_search .datePicker label {
  font-size: 0.8rem;
  font-weight: 700;
}
.container_search button {
  background-color: #d70000;
  font-weight: bold;
  font-size: 0.8rem;
  cursor: pointer;
}
</style>
