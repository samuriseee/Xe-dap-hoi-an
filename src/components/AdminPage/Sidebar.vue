<template>
  <aside
    class="relative h-screen inline-flex flex-col justify-between items-center bg-white shadow p-3"
  >
    <nav class="inline-flex flex-col space-y-2">
      <router-link
        v-for="(link, index) in nav"
        :key="index"
        :to="link.to"
        class="flex items-center text-gray-600 py-2 cursor-pointer"
        :class="[
          [
            selected == index
              ? 'bg-indigo-100 text-indigo-500'
              : 'hover:bg-gray-100',
          ],
          [isEnlarge ? 'pl-2 pr-6 rounded-lg' : 'px-2 rounded-full'],
        ]"
        @click="selected = index"
      >
        <span
          v-html="selected == index ? link.selectedIcon : link.icon"
          class="w-8 h-8 p-1"
          :class="{ 'mr-4': isEnlarge }"
        ></span>
        <span
          v-html="link.text"
          class="font-medium select-none"
          v-if="isEnlarge"
        ></span>
      </router-link>
    </nav>
    <div
      class="flex items-center w-full bg-gray-100 p-4 rounded-lg"
      v-if="isEnlarge"
    >
      <img
        :src="user.avatar"
        :alt="user.name"
        class="w-10 h-10 object-cover rounded-full mr-4 border border-solid border-white"
      />
      <div>
        <h3 class="text-gray-900 font-semibold" v-html="user.name"></h3>
        <h4 class="text-sm text-gray-700 mt-1" v-html="user.role"></h4>
      </div>
    </div>
    <img
      :src="user.avatar"
      :alt="user.name"
      class="w-10 h-10 object-cover rounded-full"
      v-else
    />
    <button
      class="absolute right-0 bottom-0 top-0 my-auto transform translate-x-full h-10 w-10 p-1 bg-white text-gray-600 rounded-r-lg mx-auto border border-solid border-gray-200 hover:border-gray-300"
      @click="isEnlarge = !isEnlarge"
    >
      <span v-html="isEnlarge ? enlarge.decrease : enlarge.enlarge"></span>
    </button>
  </aside>
</template>

<script>
export default {
  data() {
    return {
      selected: null,
      isEnlarge: true,
      nav: [
        {
          icon: '<svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>',
          selectedIcon:
            '<svg fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>',
          text: "Dashboard",
          to: "/admin",
        },
        {
          icon: '<svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path><path d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path></svg>',
          selectedIcon:
            '<svg fill="currentColor" viewBox="0 0 20 20"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>',
          text: "Quản lý xe đạp",
          to: "/bike-management",
        },
        {
          icon: '<svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>',
          selectedIcon:
            '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path></svg>',
          text: "Quản lý đơn thuê xe",
          to: "/rental-management",
        },
        {
          icon: '<svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>',
          selectedIcon:
            '<svg fill="currentColor" viewBox="0 0 20 20"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path></svg>',
          text: "Quản lý người dùng",
          to: "/user-management",
        },
      ],
      enlarge: {
        decrease:
          '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>',
        enlarge:
          '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>',
        text: "Group Manager",
      },
      user: {
        name: "John Doe",
        role: "CEO",
        avatar:
          "https://images.unsplash.com/photo-1558898479-33c0057a5d12?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
      },
    };
  },
};
</script>

<style scoped>
nav a.router-link-exact-active {
  background: #ffe4e6;
  color: #f43f5e;
}
</style>