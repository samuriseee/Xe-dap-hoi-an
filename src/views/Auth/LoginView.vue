<template>
  <div class="w-full h-screen flex">
    <div class="imageBox">
      <div class="logo">
        <img src="@/assets/image/logo3.png" alt="" />
      </div>
      <ModalComponent :isOpen.sync="showModal" variant="small">
        <template v-slot:header> {{ modal.title }}</template>
        <template v-slot:content>{{ modal.content }}</template>
        <button @click="showModal = false">Close</button>
      </ModalComponent>
      <img
        src="@/assets/image/B2.jpg"
        alt="background"
        class="object-cover object-center h-screen w-7/12"
      />
    </div>
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

        <form class="mt-8 space-y-6 text-left" @submit.prevent="onSubmit">
          <input type="hidden" name="remember" value="true" />
          <div class="relative">
            <label class="">Tên đăng nhập</label>
            <input
              class="w-full text-base px-4 py-4 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500"
              type=""
              placeholder="Nhập tên đăng nhập của bạn tại đây"
              :class="{ invalid: $v.loginUser.username.$error }"
              v-model="loginUser.username"
            />
            <div class="errorText" v-if="$v.loginUser.username.$error">
              Tên người dùng nhập lỗi
            </div>
          </div>
          <div class="mt-8 content-left text-left">
            <label class="">Mật khẩu</label>
            <input
              class="w-full content-center text-base px-4 py-4 border-b rounded-2xl border-gray-300 focus:outline-none focus:border-indigo-500"
              type="password"
              placeholder="Nhập mật khẩu của bạn ở đây"
              :class="{ invalid: $v.loginUser.password.$error }"
              v-model="loginUser.password"
            />
            <div class="errorText" v-if="$v.loginUser.password.$error">
              Mật khẩu nhập lỗi
            </div>
          </div>
          <div class="mt-8 content-left text-left">
            <label class="">Nhập lại mật khẩu</label>
            <input
              class="w-full content-center text-base px-4 py-4 border-b rounded-2xl border-gray-300 focus:outline-none focus:border-indigo-500"
              type="password"
              placeholder="Nhập lại mật khẩu của bạn"
              :class="{ invalid: $v.loginUser.confirmPassword.$error }"
              v-model="loginUser.confirmPassword"
            />
            <div class="errorText" v-if="$v.loginUser.confirmPassword.$error">
              Mật khẩu nhập không đúng ở trên
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
            <span>Không có tài khoản?</span>
            <router-link
              to="/register"
              class="text-indigo-400 hover:text-blue-500 no-underline hover:underline cursor-pointer transition ease-in duration-300"
              >Đăng ký tại đây</router-link
            >
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { validationMixin } from "vuelidate";
import { required, minLength, sameAs } from "vuelidate/lib/validators";
import ModalComponent from "@/components/ui/ModalComponent.vue";
import { mapActions, mapMutations } from "vuex";
export default {
  name: "LoginView",
  mixins: [validationMixin],
  components: {
    ModalComponent,
  },
  validations: {
    loginUser: {
      username: {
        required,
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
  data() {
    return {
      loginUser: {
        username: "",
        password: "",
        confirmPassword: "",
      },
      showModal: false,
      modal: {
        title: "",
        content: "",
      },
      error: null,
    };
  },
  methods: {
    ...mapActions(["login"]),
    ...mapMutations(["setCurrentUser"]),
    onSubmit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.handleLogin();
      }
    },
    async handleLogin() {
      await this.login(this.loginUser)
        .then((response) => {
          this.setCurrentUser({
            ma_nguoi_dung: response.ma_nguoi_dung,
            ten_dang_nhap: response.ten_dang_nhap,
            ho_va_ten: response.ho_va_ten,
            cccd: response.cccd,
            email: response.email,
            sdt: response.sdt,
            dia_chi: response.dia_chi,
            trang_thai: response.trang_thai,
            quyen: response.quyen,
          });
          this.modal.title = "Đăng nhập thành công";
          this.modal.content = "Chào mừng bạn đến với hệ thống của chúng tôi";
          this.showModal = true;
          const closeModalBtn = document.querySelector("#close-modal");
          closeModalBtn.addEventListener("click", () => {
            this.$router.push("/");
          });
        })
        .catch((error) => {
          this.modal.title = "Đăng nhập thất bại";
          this.modal.content = error.response.data;
          this.showModal = true;
        });
    },
  },
};
</script>

<style>
button[type="submit"] {
  background: #d70000;
  color: white;
}
button[type="submit"]:hover {
  background: #ff0000;
}
.imageBox {
  position: relative;
  width: 100%;
  height: 100%;
}
.imageBox .logo {
  position: absolute;
  top: 40px;
  left: 50px;
  width: 100%;
  height: 100%;
  z-index: 3;
}
.imageBox .logo img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  cursor: pointer;
}
.imageBox img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
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