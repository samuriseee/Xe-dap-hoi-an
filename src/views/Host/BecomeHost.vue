<template>
  <div class="container">
    <h1>Become a Host</h1>
    <ModalComponent :isOpen.sync="showModal" variant="small">
      <template v-slot:header>Kiếm tiền từ Hội An Bike</template>
      <template v-slot:content>
        <form>
          <div class="flex align-center justify-between">
            <div class="mb-6 w-full mr-1">
              <label
                class="block mb-2 text-sm font-medium text-gray-900 light:text-white"
                >Tên đăng nhập</label
              >
              <input
                type="text"
                v-model="becomeHost.ten_dang_nhap"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
                placeholder="name@flowbite.com"
                required
              />
            </div>
            <div class="mb-6 w-full ml-1">
              <label
                class="block mb-2 text-sm font-medium text-gray-900 light:text-white"
                >Họ và tên</label
              >
              <input
                type="text"
                v-model="becomeHost.ho_va_ten"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
                placeholder="name@flowbite.com"
                required
              />
            </div>
          </div>
          <div class="mb-6">
            <label
              class="block mb-2 text-sm font-medium text-gray-900 light:text-white"
              >Email</label
            >
            <input
              type="text"
              id="email"
              v-model="becomeHost.email"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div class="mb-6">
            <label
              class="block mb-2 text-sm font-medium text-gray-900 light:text-white"
              >Địa chỉ</label
            >
            <input
              type="text"
              id="email"
              v-model="becomeHost.dia_chi"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
              placeholder="05 Nguyễn Văn Linh, Hội An, Quảng Nam"
              required
            />
          </div>
          <div class="mb-6">
            <label
              class="block mb-2 text-sm font-medium text-gray-900 light:text-white"
              >Căn cước công dân</label
            >
            <input
              type="text"
              v-model="becomeHost.cccd"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
              placeholder="Có thể thay thế bằng chứng minh nhân dân"
              required
            />
          </div>
          <div class="mb-6">
            <label
              class="block mb-2 text-sm font-medium text-gray-900 light:text-white"
              >Số điện thoại</label
            >
            <input
              type="text"
              v-model="becomeHost.sdt"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            style="margin: 0 auto"
            @click="registerToBecomeHost"
            class="w-full text-bold text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center light:bg-blue-600 light:hover:bg-blue-700 light:focus:ring-blue-800"
          >
            Đăng ký thành người cho thuê
          </button>
        </form>
      </template>
      <button @click="showModal = false">Close</button>
    </ModalComponent>
    <div class="become_host">
      <div class="become_host_image">
        <img src="@/assets/image/login-image.jpg" alt="" />
      </div>
      <div class="become_host_info">
        <h3>Host your home on Bike Rental</h3>
        <p>
          Share your space with riders from around the world. It's free and easy
          to list your space.
        </p>
        <button @click="openModal">Learn more</button>
      </div>
    </div>
  </div>
</template>

<script>
import ModalComponent from "@/components/ui/ModalComponent.vue";
import axios from "axios";
export default {
  name: "BecomeHost",
  components: {
    ModalComponent,
  },
  data() {
    return {
      showModal: false,
      becomeHost: this.$store.state.currentUser,
    };
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    registerToBecomeHost() {
      const API = `${process.env.VUE_APP_API}/nguoi_dung/ma_nguoi_dung/${this.becomeHost.ma_nguoi_dung}`;
      axios
        .patch(
          API,
          {
            ...this.becomeHost,
            quyen: "NCT",
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            this.$router.push("/host/bikesManagement");
          }
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
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}
.container h1 {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 24px;
}
.become_host {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
.become_host_image {
  width: 50%;
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
}
.become_host_image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.become_host_info {
  width: 50%;
}
.become_host_info h3 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 12px;
}
.become_host_info p {
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 12px;
}
.become_host_info button {
  padding: 12px 24px;
  border: none;
  border-radius: 12px;
  background-color: #d70000;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
}
.become_host_info button:hover {
  background-color: #b80000;
}
</style>