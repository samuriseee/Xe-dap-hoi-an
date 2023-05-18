<template>
  <div class="w-full h-screen flex">
    <div
      class="md:flex md:items-center md:justify-center w-full sm:w-auto md:h-full w-2/5 xl:w-2/5 p-8 md:p-10 lg:p-14 sm:rounded-lg md:rounded-none bg-white"
    >
      <div class="max-w-md w-full space-y-8">
        <div class="text-left">
          <h2 class="mt-6 text-3xl font-bold text-gray-900">Xin chào bạn!</h2>
          <p class="mt-2 text-sm text-gray-500">
            Đăng nhập để tiếp tục với dịch vụ của chúng tôi
          </p>
        </div>

        <form
          class="w-full mt-8 space-y-6 text-left"
          @submit.prevent="onSubmit"
        >
          <input type="hidden" name="remember" value="true" />
          <div class="flex items-center">
            <div class="relative">
              <label class="">Tên đăng nhập</label>
              <input
                class="w-full text-base px-4 py-4 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500"
                type="text"
                :class="{ invalid: $v.newUser.username.$error }"
                placeholder="Tên đăng nhập"
                v-model="newUser.username"
              />
              <div class="errorText" v-if="$v.newUser.username.$error">
                Tên người dùng nhập lỗi
              </div>
            </div>
            <div class="ml-5 content-left text-left">
              <label class="">Họ và tên</label>
              <input
                class="w-full content-center text-base px-4 py-4 border-b rounded-2xl border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                :class="{ invalid: $v.newUser.fullname.$error }"
                placeholder="Họ và tên"
                v-model="newUser.fullname"
              />
              <div class="errorText" v-if="$v.newUser.fullname.$error">
                Họ và tên nhập lỗi
              </div>
            </div>
          </div>
          <div class="mt-8 content-left text-left">
            <label class="">Nhập số điện thoại</label>
            <input
              class="w-full content-center text-base px-4 py-4 border-b rounded-2xl border-gray-300 focus:outline-none focus:border-indigo-500"
              type="phone"
              :class="{ invalid: $v.newUser.phone.$error }"
              placeholder="Nhập số điện thoại của bạn ở đây"
              v-model="newUser.phone"
            />
            <div class="errorText" v-if="$v.newUser.phone.$error">
              phone nhập lỗi
            </div>
          </div>
          <div class="mt-8 content-left text-left">
            <label class="">Nhập mật khẩu</label>
            <input
              class="w-full content-center text-base px-4 py-4 border-b rounded-2xl border-gray-300 focus:outline-none focus:border-indigo-500"
              type="password"
              :class="{ invalid: $v.newUser.password.$error }"
              placeholder="Nhập mật khẩu của bạn ở đây"
              v-model="newUser.password"
            />
            <div class="errorText" v-if="$v.newUser.password.$error">
              Password nhập lỗi
            </div>
          </div>
          <div class="mt-8 content-left text-left">
            <label class="">Nhập lại mật khẩu</label>
            <input
              class="w-full content-center text-base px-4 py-4 border-b rounded-2xl border-gray-300 focus:outline-none focus:border-indigo-500"
              type="password"
              :class="{ invalid: $v.newUser.confirmPassword.$error }"
              placeholder="Nhập lại mật khẩu của bạn"
              v-model="newUser.confirmPassword"
            />
            <div class="errorText" v-if="$v.newUser.confirmPassword.$error">
              Vui lòng nhập mật khẩu đúng như phía trên
            </div>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                class="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded"
              />
              <label for="remember_me" class="ml-2 block text-sm text-gray-900">
                Nhớ tài khoản
              </label>
            </div>
            <div class="text-sm">
              <a href="#" class="text-indigo-400 hover:text-blue-500">
                Quên mật khẩu?
              </a>
            </div>
          </div>
          <div>
            <button
              type="submit"
              class="w-full flex justify-center p-4 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-500"
            >
              Đăng nhập
            </button>
          </div>
          <p
            class="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500"
          >
            <span>Đã có tài khoản?</span>
            <router-link
              to="/login"
              class="text-indigo-400 hover:text-blue-500 no-underline hover:underline cursor-pointer transition ease-in duration-300"
              >trở về đăng nhập</router-link
            >
          </p>
        </form>
      </div>
    </div>
    <img
      src="@/assets/image/login-image.jpg"
      alt="background"
      class="object-cover object-center h-screen w-7/12"
    />
    <ModalComponent :isOpen.sync="showModal" variant="small">
      <template v-slot:header> {{ modal.title }}</template>
      <template v-slot:content>{{ modal.content }}</template>
      <button @click="showModal = false">Close</button>
    </ModalComponent>
  </div>
</template>
  
  <script>
import axios from "axios";
import { validationMixin } from "vuelidate";
import { required, minLength, sameAs } from "vuelidate/lib/validators";
import ModalComponent from "@/components/ui/ModalComponent.vue";
const { VUE_APP_API } = process.env;
export default {
  name: "RegisterView",
  components: {
    ModalComponent,
  },
  mixins: [validationMixin],
  data() {
    return {
      newUser: {
        username: "",
        fullname: "",
        phone: "",
        password: "",
        confirmPassword: "",
      },
      showModal: false,
      modal: {
        title: "",
        content: "",
      },
    };
  },
  validations: {
    newUser: {
      username: {
        required,
      },
      fullname: {
        required,
      },
      phone: {
        required,
        minLength: minLength(10),
      },
      password: {
        required,
        minLength: minLength(8),
      },
      confirmPassword: {
        required,
        sameAsPassword: sameAs("password"),
      },
    },
  },
  methods: {
    onSubmit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.register();
      }
    },
    register() {
      let API = `${process.env.VUE_APP_API}/nguoi_dung`;
      // let API = "http://localhost:8000/api/v1/nguoi_dung";
      axios
        .post(API, {
          ten_dang_nhap: this.newUser.username,
          mat_khau: this.newUser.password,
          xac_nhan_mat_khau: this.newUser.confirmPassword,
          ho_va_ten: this.newUser.fullname,
          cccd: null,
          sdt: this.newUser.phone,
          email: null,
          dia_chi: null,
          trang_thai: "1",
          quyen: "NT",
        })
        .then((res) => {
          console.log(res);
          this.modal.title = "Đăng ký thành công";
          this.modal.content = "Vui lòng đăng nhập để tiếp tục";
          this.showModal = true;
          const closeModalBtn = document.querySelector("#close-modal");
          closeModalBtn.addEventListener("click", () => {
            this.$router.push("/login");
          });
        })
        .catch((err) => {
          console.log(err);
          this.modal.title = "Đăng ký thất bại";
          this.modal.content = err.response.data;
          this.showModal = true;
        });
    },
  },
};
</script>
  
  <style scoped>
button[type="submit"] {
  background: #d70000;
  color: white;
}
button[type="submit"]:hover {
  background: #ff0000;
}
label {
  width: 100%;
  font-size: 14px;
  color: #0d0909;
  margin-left: 1rem;
  font-weight: bold;
}
.invalid {
  border: 1px solid red;
}

.errorText {
  color: red;
  font-size: 14px;
  margin-top: 4px;
  margin-left: 0.8rem;
}
</style>