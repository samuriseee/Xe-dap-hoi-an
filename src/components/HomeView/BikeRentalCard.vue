<template>
  <div class="card_container">
    <div class="card_image">
      <img :src="spliceFirstImage" alt="" />
    </div>
    <div class="card_info">
      <h3>{{ bike.tieu_de }}</h3>
      <p>{{ bike.mo_ta }}</p>
      <p>{{ bike.gia_cho_thue_moi_gio }}</p>
    </div>
    <button @click="addToCart(bike)" :disabled="isBikeInCart(bike.ma_xe)">
      {{ isBikeInCart(bike.ma_xe) ? "In Cart" : "Add to Cart" }}
    </button>
  </div>
</template>

<script>
export default {
  name: "BikeRentalCard",
  props: {
    bike: {
      type: Object,
      required: true,
    },
  },
  computed: {
    spliceFirstImage() {
      return this.bike.anh[0];
    },
  },
  data() {
    return {};
  },
  methods: {
    addToCart(bike) {
      this.$store.commit("addToCart", bike);
    },
    isBikeInCart(bike) {
      return this.$store.getters.isBikeInCart(bike);
    },
  },
};
</script>

<style scoped>
.card_container {
  display: -webkit-box;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  padding: 32px 24px 45px;
  border-top: 1px solid #eee;
  width: 860px;
  margin: 0 auto;
  z-index: 1;
  position: relative;
}
.card_image {
  width: 200px;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
}
.card_image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.card_info {
  width: 100%;
  display: -webkit-box;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
}
.card_info h3 {
  font-size: 24px;
  font-weight: 600;
  color: #333;
}
.card_info p {
  font-size: 24px;
  font-weight: 600;
  color: #d70000;
}
</style>