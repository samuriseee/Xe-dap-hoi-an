<template>
  <div class="wrapper mx-auto">
    <div class="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32 mt-20">
      <div class="px-4 pt-8">
        <p class="text-xl font-medium">Thuê xe đạp vi vu</p>
        <p class="text-gray-400">
          Trả xe tại cửa hàng gần nhất hoặc tại nhà bạn
        </p>
        <div
          class="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6"
        >
          <div
            v-for="bike in cartsList"
            :key="bike.ma_xe"
            class="flex flex-col rounded-lg bg-white sm:flex-row"
          >
            <img
              class="m-2 h-24 w-28 rounded-md border object-cover object-center"
              :src="bike.anh[0]"
              alt=""
            />
            <div class="flex w-full flex-col px-4 py-4 text-left">
              <span class="font-semibold">{{ bike.tieu_de }}</span>
              <span class="float-right text-gray-400"
                >{{ datetimepicker.startDate }} -
                {{ datetimepicker.endDate }}</span
              >
              <p class="text-lg font-bold">
                {{ bike.gia_cho_thue_moi_gio }} VNĐ/giờ
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
        <p class="text-xl font-medium">Thông tin người đặt</p>
        <p class="text-gray-400">Kiểm tra thông tin người đặt xe</p>
        <div class="text-left">
          <label class="mt-4 mb-2 block text-sm font-medium">Họ và tên</label>
          <div class="relative">
            <input
              type="text"
              v-model="currentUser.ho_va_ten"
              class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="your.email@gmail.com"
            />
            <div
              class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            </div>
          </div>
          <label class="mt-4 mb-2 block text-sm font-medium"
            >Số điện thoại</label
          >
          <div class="relative">
            <input
              type="text"
              v-model="currentUser.sdt"
              class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
            />
            <div
              class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                />
              </svg>
            </div>
          </div>
        </div>
        <button
          @click="checkout"
          class="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
        >
          Thuê xe
        </button>
        <span style="color: red" class="text-left"
          >Tiền sẽ được thanh toán sau khi đã trả xe</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  name: "CheckoutView",
  data() {
    return {};
  },
  created() {},
  computed: {
    ...mapGetters([
      "startDateFormatted",
      "endDateFormatted",
      "startTime",
      "endTime",
    ]),
    datetimepicker() {
      return this.$store.state.datetimepicker;
    },
    cartsList() {
      return this.$store.state.carts;
    },
    currentUser() {
      return this.$store.state.currentUser;
    },
  },
  methods: {
    async checkout() {
      const API = `${process.env.VUE_APP_API}/phieu_thue_xe`;
      const data = {
        ma_nguoi_thue: this.currentUser.ma_nguoi_dung,
        ngay_thue: this.startDateFormatted,
        ngay_tra: this.endDateFormatted,
        gio_thue: this.startTime,
        gio_tra: this.endTime,
        thoi_gian_tra_thuc_te: null,
        trang_thai: "Đã đặt lịch",
      };
      const res = await axios
        .post(API, data, {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.container {
  width: 80%;
  margin: 0 auto;
  background: #ffff;
}
.form-group {
  display: flex;
  flex-direction: column;
}
.form-input {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  font-size: 16px;
  width: 100%;
}
</style>