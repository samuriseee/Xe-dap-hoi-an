import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: null,
    typeOfBikes: null,
    searchText: null,
    datetimepicker: null,
    carts: [],
  },
  getters: {
    isBikeInCart: (state) => (bikeId) => {
      // Check if the bike with the given id is in the cart
      return state.carts.some((item) => item.ma_xe === bikeId);
    },
    isAuthenticated(state) {
      return !!state.currentUser;
    },
    getUserRole(state) {
      return state.currentUser?.quyen;
    },
    getAllTypeOfBike(state) {
      return state.typeOfBikes;
    },
    startDateFormatted(state) {
      // Extract the date part from the startDate string and remove the hyphens
      return state.datetimepicker.startDate.slice(0, 10).replace(/-/g, "");
    },
    endDateFormatted(state) {
      // Extract the date part from the endDate string and remove the hyphens
      return state.datetimepicker.endDate.slice(0, 10).replace(/-/g, "");
    },
    startTime(state) {
      // Extract the hours part from the startDate string
      return state.datetimepicker.startDate.slice(11, 13);
    },
    endTime(state) {
      // Extract the hours part from the endDate string
      return state.datetimepicker.endDate.slice(11, 13);
    },
  },
  mutations: {
    setCurrentUser(state, user) {
      state.currentUser = user;
    },
    setTypeOfBikes(state, typeOfBikes) {
      state.typeOfBikes = typeOfBikes;
    },
    setSearchText(state, searchText) {
      state.searchText = searchText;
    },
    setDatetimepicker(state, datetimepicker) {
      state.datetimepicker = datetimepicker;
    },
    addToCart(state, bike) {
      // Add the bike to the cart items array
      state.carts.push(bike);
    },
  },
  actions: {
    addToCart({ commit }, bike) {
      commit("addToCart", bike);
    },
    async login({ commit }, { username, password, confirmPassword }) {
      const API = `${process.env.VUE_APP_API}/nguoi_dung/login`;
      try {
        const response = await axios.post(API, {
          ten_dang_nhap: username,
          mat_khau: password,
          xac_nhan_mat_khau: confirmPassword,
        });
        localStorage.setItem("token", response.data.token);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async getAllTypeOfBike({ commit }) {
      const API = `${process.env.VUE_APP_API}/loai_xe`;
      try {
        const response = await axios.get(API);
        commit("setTypeOfBikes", response.data);
      } catch (error) {
        console.error(error);
      }
    },
    async getCurrentUserInfo({ commit }, token) {
      const API = `${process.env.VUE_APP_API}/auth/currentUser`;
      if (!token) return;
      try {
        const response = await axios.get(API, {
          headers: { Authorization: `Bearer ${token}` },
        });
        commit("setCurrentUser", response.data.user);
      } catch (error) {
        console.error(error);
      }
    },
  },
  modules: {},
});
