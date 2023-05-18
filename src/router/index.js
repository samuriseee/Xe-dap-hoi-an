import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import store from "../store/index.js";
Vue.use(VueRouter);

const requireAuth = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();
  } else {
    alert("Bạn phải đăng nhập để tiếp tục!");
    next({ name: "login" });
  }
};

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Auth/LoginView.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/Auth/RegisterView.vue"),
  },
  {
    path: "/host/become_host",
    name: "host-become_host",
    component: () => import("../views/Host/BecomeHost.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/host/bikesManagement",
    name: "host-bikesManagement",
    component: () => import("../views/Host/BikesManagement.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/checkout",
    name: "checkout",
    component: () => import("../views/CheckoutView.vue"),
    beforeEnter: requireAuth,
    
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("../views/Admin/AdminView.vue"),
    beforeEnter: requireAuth,
    children: [
      {
        path: "/user-management",
        name: "user-management",
        component: () => import("../views/Admin/UserManagement.vue"),
      },
      {
        path: "/rental-management",
        name: "rental-management",
        component: () => import("../views/Admin/RentalManagement.vue"),
      },
      // {
      //   path: "/employee-management",
      //   name: "employee-management",
      //   component: () =>
      //     import("../views/AdminDashboard/EmployeeManagement.vue"),
      // },
      {
        path: "/bike-management",
        name: "bike-management",
        component: () => import("../views/Admin/BikeManagement.vue"),
      },
    ],
  },
];


const router = new VueRouter({
  routes,
});
export default router;
