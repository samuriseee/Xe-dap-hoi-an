<template>
  <div class="cart_container" @click="toggleCart">
    <div class="cart_icon">
      <i class="fas fa-shopping-cart"></i>
    </div>
    <div class="cart_count">{{ countItem }}</div>
    <img
      src="https://ananas.vn/wp-content/themes/ananas/fe-assets/images/svg/icon_gio_hang.svg"
    />
    <div class="shop_card" :class="{ hidden: isHidden }">
      <span class="caret"></span>
      <ul class="list_group">
        <li class="list_group_item title">
          <h4>Giỏ hàng thuê xe</h4>
        </li>
        <li class="list_group_item divider"></li>
        <li
          class="list_group_item items"
          v-for="item in cartList"
          :key="item.ma_xe"
        >
          <img :src="item.anh[0]" alt="" />
          <div class="text">
            <h5>{{ item.tieu_de }}</h5>
            <p>{{ item.gia_cho_thue_moi_gio }}/giờ</p>
          </div>
        </li>
        <li class="list-group-item divider-1"></li>
        <li class="list_group_item btn">
          <router-link to="/checkout">
            <button>Thanh toán</button>
          </router-link>
        </li>
        <li class="list_group_item btn">
          <button>Clear</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartComponent",
  data() {
    return {
      isHidden: true,
    };
  },
  computed: {
    countItem() {
      return this.$store.state.carts.length;
    },
    cartList() {
      if (!this.$store.state.carts) {
        return [];
      } else {
        return this.$store.state.carts;
      }
    },
  },
  methods: {
    toggleCart() {
      this.isHidden = !this.isHidden;
    },
  },
};
</script>

<style scoped>
img {
  vertical-align: middle;
  margin: 0 auto;
}
.cart_container {
  position: fixed;
  right: 0px;
  top: 232px;
  width: 40px;
  height: 75px;
  background: #ba0202;
  padding: 10px 2px;
  color: #fff;
  font-family: NunitoSanExtraBold;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
  z-index: 9999;
}
.shop_card {
  position: relative;
  right: 302px;
  top: -59px;
  width: 300px;
  background-color: #f1f1f1;
  color: #000;
  text-align: left;
  transition: all 0.3s ease-in-out;
}
.caret {
  content: "";
  position: absolute;
  right: 0px;
  top: 15px;
  display: block;
  width: 0;
  height: 0;
  border-width: 6px 6px;
  border-style: solid;
  border-color: transparent;
  border-bottom-color: #ba0202;
  -webkit-transform: rotate(-90deg);
  -moz-transform: rotate(-90deg);
  -ms-transform: rotate(-90deg);
  -o-transform: rotate(-90deg);
  transform: rotate(-90deg);
  z-index: 1001;
}
.list_group {
  margin-bottom: 20px;
  padding-left: 0;
  list-style: none;
}
.list_group .list_group_item {
  position: relative;
  display: block;
  padding: 10px 15px;
  margin-bottom: -1px;
  background-color: transparent;
  border: none;
}
.list_group .list_group_item.title {
  background-color: #f1f1f1;
  font-family: NunitoSanExtraBold;
  font-size: 16px;
  color: #000;
}
.list_group .list_group_item.divider {
  border-bottom: #000 3px solid;
  margin: 0px 15px;
  padding: 0px;
}
.list_group .list_group_item.items {
  max-height: 345px;
  overflow-y: scroll;
  display: flex;
  align-items: center;
  padding: 10px 20px;
  justify-content: space-between;
}
.list_group .list_group_item.items::-webkit-scrollbar {
  width: 5px;
}
.list_group .list_group_item.items img {
  width: 50px;
  height: 50px;
  object-fit: contain;
  margin: 0;
}
.list_group .list_group_item.total {
  font-size: 13px;
  font-family: NunitoSanExtraBold;
  display: block;
  overflow: hidden;
  padding-top: 15px;
}
.list_group .btn {
  padding: 5px 15px 10px 15px;
}
.list_group .btn button {
  width: 100%;
  padding: 10px 0px;
  border: none;
  background: #ba0202;
  color: #fff;
  font-family: NunitoSanExtraBold;
  font-size: 16px;
  cursor: pointer;
}
.divider-1 {
    border-bottom: #000 2px solid;
    margin: 0px 15px;
    padding: 0px;
}
</style>