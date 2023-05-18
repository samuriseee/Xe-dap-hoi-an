<template>
  <div id="app" class="min-h-screen bg-gray-200 flex ">
    <Sidebar />
    <router-view />
  </div>
</template>

<script>
import Sidebar from "@/components/AdminPage/Sidebar.vue";
export default {
  name: "AdminView",
  components: {
    Sidebar,
  },
  data() {
    return {
      isShowSidebar: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.isShowSidebar = !this.isShowSidebar;
    },
  },
};
</script>

<style scoped>
#app {
height: 100vh;
}
</style>