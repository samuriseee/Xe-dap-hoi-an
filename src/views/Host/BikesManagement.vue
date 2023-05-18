<template>
  <div class="bg-white p-8 rounded-md w-full">
    <ModalComponent :isOpen.sync="showModal" variant="small">
      <template v-slot:header> Đưa xe của bạn cho chúng tôi làm giàu </template>
      <template v-slot:content>
        <form>
          <div class="flex align-center justify-between">
            <div class="mb-6 w-full mr-1">
              <label
                class="block mb-2 text-sm font-medium text-gray-900 light:text-white"
                >Tên Xe</label
              >
              <input
                type="text"
                v-model="newRegisterBikes.tieu_de"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
                placeholder="Xe đạp cực ngầu 123"
                required
              />
            </div>
            <div class="mb-6 w-full ml-1">
              <label
                class="block mb-2 text-sm font-medium text-gray-900 light:text-white"
                >Loại xe</label
              >
              <select
                v-model="newRegisterBikes.ma_loai_xe"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
              >
                <option
                  v-for="bike in typeOfBikes"
                  :key="bike.ma_loai_xe"
                  :value="bike.ma_loai_xe"
                >
                  {{ bike.ten_loai_xe }}
                </option>
              </select>
            </div>
          </div>
          <div class="mb-6">
            <label
              class="block mb-2 text-sm font-medium text-gray-900 light:text-white"
              >Mô tả</label
            >
            <textarea
              type="text"
              v-model="newRegisterBikes.mo_ta"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
              placeholder="Miêu tả về chiếc xe cực ngầu của bạn"
              required
            />
          </div>
          <div class="mb-6 w-full mr-1">
            <label
              class="block mb-2 text-sm font-medium text-gray-900 light:text-white"
              >Giá cho thuê/giờ (VNĐ)</label
            >
            <input
              type="text"
              v-model="newRegisterBikes.gia_cho_thue_moi_gio"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
              placeholder="30000"
              required
            />
          </div>
          <div class="mb-6">
            <label
              class="block mb-2 text-sm font-medium text-gray-900 light:text-white"
              >Tải ảnh xe đạp và hoá đơn mua xe
              <span style="color: red">(Nếu có)</span></label
            >
            <CloudinaryUpload @image-uploaded="handleImageUploaded" />
          </div>
          <button
            type="submit"
            style="margin: 0 auto"
            @click="registerNewBikes"
            class="w-full flex justify-center p-2 rounded-lg cursor-pointer"
          >
            Đăng ký
          </button>
        </form>
      </template>
      <button @click="showModal = false">Close</button>
    </ModalComponent>
    <div class="flex items-center justify-between pb-6">
      <div>
        <h2 class="text-gray-600 font-semibold">Quản lý xe đạp của bạn</h2>
      </div>
      <div class="flex items-center justify-between">
        <div class="flex bg-gray-50 items-center p-2 rounded-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            />
          </svg>
          <input
            class="bg-gray-50 outline-none ml-1 block"
            type="text"
            name=""
            id=""
            placeholder="search..."
          />
        </div>
        <div class="lg:ml-40 ml-10 space-x-8">
          <button
            @click="showModal = true"
            class="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
          >
            Thêm mới
          </button>
        </div>
      </div>
    </div>
    <div>
      <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table class="min-w-full leading-normal">
            <thead>
              <tr>
                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Tên xe
                </th>
                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Loại xe
                </th>
                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Mô tả
                </th>
                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Trạng thái
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="bike in bikesList" :key="bike.ma_xe">
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div class="flex items-center justify-center">
                    <div class="ml-3">
                      <p class="text-gray-900 whitespace-no-wrap">
                        {{ bike.tieu_de }}
                      </p>
                    </div>
                  </div>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p class="text-gray-900 whitespace-no-wrap">
                    {{ bike.ma_loai_xe }}
                  </p>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p class="text-gray-900 whitespace-no-wrap">
                    {{ bike.mo_ta }}
                  </p>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <span
                    v-if="bike.trang_thai == 0"
                    class="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight"
                  >
                    <span
                      aria-hidden
                      class="absolute inset-0 bg-red-200 opacity-50 rounded-full"
                    ></span>
                    <span class="relative">Chưa duyệt</span>
                  </span>
                  <span
                    v-else
                    class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                  >
                    <span
                      aria-hidden
                      class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                    ></span>
                    <span class="relative">Đã duyệt</span>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <div
            class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between"
          >
            <span class="text-xs xs:text-sm text-gray-900">
              Showing 1 to 4 of 50 Entries
            </span>
            <div class="inline-flex mt-2 xs:mt-0">
              <button
                class="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l"
              >
                Prev
              </button>
              &nbsp; &nbsp;
              <button
                class="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ModalComponent from "@/components/ui/ModalComponent.vue";
import CloudinaryUpload from "@/components/ui/CloudinaryUpload.vue";
export default {
  name: "BikesManagement",
  components: {
    ModalComponent,
    CloudinaryUpload,
  },
  data() {
    return {
      imageUrls: null,
      bikesList: [],
      newRegisterBikes: {
        tieu_de: "",
        ma_loai_xe: "",
        mo_ta: "",
        gia_cho_thue_moi_gio: "",
        anh: "",
      },
      showModal: false,
      
      hostId: this.$store.state.currentUser.ma_nguoi_dung,
    };
  },
  computed: {
    typeOfBikes() {
      return this.$store.state.typeOfBikes;
    },
  },
  mounted() {
    this.getBikes();
    this.$store.dispatch("getAllTypeOfBike");
  },
  methods: {
    handleImageUploaded(imageUrls) {
      this.imageUrls = imageUrls;
    },
    async getBikes() {
      const API = `${process.env.VUE_APP_API}/xe/ma_nguoi_cho_thue/${this.hostId}`;
      try {
        const res = await axios.get(API, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        this.bikesList = res.data;
      } catch (err) {
        console.log(err);
      }
    },
    async registerNewBikes() {
      const API = `${process.env.VUE_APP_API}/xe`;
      try {
        const res = await axios.post(
          API,
          {
            ...this.newRegisterBikes,
            anh: JSON.stringify(this.imageUrls),
            ma_nguoi_cho_thue: this.hostId,
            trang_thai: "0",
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        alert("Đăng ký xe thành công");
      } catch (err) {
        alert("Đăng ký xe thất bại");
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
table th {
  text-align: center;
}
</style>