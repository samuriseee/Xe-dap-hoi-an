<template>
  <nav>
    <div class="logo" @click="goToHome">
      <img src="@/assets/image/logo3.png" alt="" />
      <div class="text">
        <h3>Hội An</h3>
        <h3>Bikes</h3>
      </div>
    </div>
    <div class="navigation">
      <ul>
        <li><a href="/">Trang chủ</a></li>
        <li><a href="/rentals">Thuê xe</a></li>
        <li><a href="/about">Về chúng tôi</a></li>
        <li><a href="/contact">Liên hệ</a></li>
        <!-- <li>
          <router-link to="/host/bikes"
            >Cho thuê xe đạp thông qua Hội An Bike</router-link
          >
        </li> -->
        <!-- <li v-if="isAdmin">
          <router-link to="/admin">Quản trị viên</router-link>
        </li> -->
      </ul>
    </div>
    <div class="auth">
      <div id="divUserStt" v-if="isAuth">
        <button class="becomeHost" v-if="userRole == 'NT'">
          <router-link to="/host/become_host"
            >Trở thành người cho thuê</router-link
          >
        </button>
        <button class="becomeHost" v-if="userRole == 'NCT'">
          <router-link to="/host/bikesManagement">Quản lý xe</router-link>
        </button>
        <button class="becomeHost" v-if="userRole == 'QTV'">
          <router-link to="/admin">Quản lý website</router-link>
        </button>
        <router-link class="profile" to="/profile">
          <div class="avatar">{{ spliceUsernameToMakeAvatar }}</div>
          <p style="font-size: 17px; margin-right: 10px">
            {{ getUserFromStore }}
          </p>
        </router-link>
        <!-- |
        <router-link to="/login" @click="logout">Đăng xuất</router-link> -->
      </div>
      <ul v-else>
        <li><router-link to="/login">Login</router-link></li>
        <li><router-link to="/register">Register</router-link></li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  computed: {
    getUserFromStore() {
      return this.$store.state.currentUser.ten_dang_nhap;
    },
    isAuth() {
      return this.$store.getters.isAuthenticated;
    },
    spliceUsernameToMakeAvatar() {
      return this.$store.state.currentUser.ten_dang_nhap
        .slice(0, 1)
        .toUpperCase();
    },
    userRole() {
      return this.$store.getters.getUserRole;
    },
  },
  methods: {
    goToHome() {
      this.$router.push("/");
    },
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>

<style scoped>
nav {
  position: sticky;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 100px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
nav .logo {
  width: 200px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
}
nav .logo .text {
  margin-left: 10px;
  text-align: justify;
  letter-spacing: 1px;
  line-height: 21px;
}

nav .logo .text h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
}
nav .logo .text h3:nth-child(2) {
  color: #d70000;
  letter-spacing: 2px;
  text-transform: uppercase;
}

nav .logo img {
  width: 55px;
  object-fit: cover;
  cursor: pointer;
}
.navigation ul,
.auth ul {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  margin-bottom: 0;
}
.navigation ul li,
.auth ul li {
  list-style: none;
  margin-right: 20px;
}
.navigation ul li a,
.auth ul li a {
  text-decoration: none;
  color: #2c3e50;
  font-weight: bold;
}
#divUserStt {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  text-transform: uppercase;
  background-color: rgb(255, 236, 235);
  color: rgb(116, 21, 15);
  display: flex !important;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
}
.profile {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
button.becomeHost {
  background-color: transparent;
  border: none;
  border-radius: 22px;
  padding: 5px 15px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  margin-right: 10px;
}
button.becomeHost:hover {
  background-color: #f7f7f7;
  color: #ffff !important;
}
</style>
