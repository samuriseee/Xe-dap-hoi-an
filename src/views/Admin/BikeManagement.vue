<template>
  <div class="bg-white p-8 rounded-md w-full">
    <div class="flex items-center justify-between pb-6">
      <div>
        <h2 class="text-gray-600 font-semibold">Quản lý người dùng</h2>
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
            class="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
          >
            New Report
          </button>
          <button
            class="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
          >
            Create
          </button>
        </div>
      </div>
    </div>
    <div>
      <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <div class="border border-gray-200 rounded-lg table-container">
            <!-- Tab buttons -->
            <div class="flex">
              <button
                :class="{
                  active: activeTab === 'approved',
                  normal: activeTab !== 'approved',
                }"
                class="px-4 py-2 text-sm font-medium rounded-tl-lg focus:outline-none"
                @click="activeTab = 'approved'"
              >
                Đã Duyệt
              </button>
              <button
                :class="{
                  active: activeTab === 'pending',
                  normal: activeTab !== 'pending',
                }"
                class="px-4 py-2 text-sm font-medium focus:outline-none"
                @click="activeTab = 'pending'"
              >
                Chờ duyệt
              </button>
              <button
                class="px-4 py-2 text-sm font-medium rounded-tr-lg bg-gray-200 text-gray-600"
                @click="activeTab = 'other'"
              >
                Other Tab
              </button>
            </div>

            <!-- Tab content -->
            <div>
              <!-- Tab 1 content -->
              <div v-show="activeTab === 'approved'">
                <table class="min-w-full">
                  <!-- Table headers -->
                  <thead>
                    <tr>
                      <th class="py-2">Mã Xe</th>
                      <th class="py-2">Loại Xe</th>
                      <th class="py-2">Người cho thuê</th>
                      <th class="py-2">Tiêu đề</th>
                      <th class="py-2">Giá cho thuê mỗi giờ</th>
                      <th class="py-2">Trạng thái</th>
                      <!-- Add more table headers as needed -->
                    </tr>
                  </thead>
                  <!-- Table rows -->
                  <tbody>
                    <tr v-for="(item, index) in approvedBikes" :key="index">
                      <td class="py-2">{{ item.ma_xe }}</td>
                      <td class="py-2">{{ item.ma_loai_xe }}</td>
                      <td class="py-2">{{ item.ma_nguoi_cho_thue }}</td>
                      <td class="py-2">{{ item.tieu_de }}</td>
                      <td class="py-2">{{ item.gia_cho_thue_moi_gio }}</td>
                      <td
                        v-if="item.trang_thai == 1"
                        class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                      >
                        <span
                          class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                        >
                          <span
                            aria-hidden
                            class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                          ></span>
                          <span class="relative">Đã duyệt</span>
                        </span>
                      </td>
                      <td
                        v-else
                        class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                      >
                        <span
                          class="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight"
                        >
                          <span
                            aria-hidden
                            class="absolute inset-0 bg-red-200 opacity-50 rounded-full"
                          ></span>
                          <span class="relative">Chờ duyệt</span>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- Tab 2 content -->
              <div v-show="activeTab === 'pending'">
                <table class="min-w-full">
                  <!-- Table headers -->
                  <thead>
                    <tr>
                      <th class="py-2">Mã Xe</th>
                      <th class="py-2">Loại Xe</th>
                      <th class="py-2">Người cho thuê</th>
                      <th class="py-2">Tiêu đề</th>
                      <th class="py-2">Giá cho thuê mỗi giờ</th>
                      <th class="py-2">Trạng thái</th>
                      <!-- Add more table headers as needed -->
                    </tr>
                  </thead>
                  <!-- Table rows -->
                  <tbody>
                    <tr v-for="(item, index) in pendingBikes" :key="index">
                      <td class="py-2">{{ item.ma_xe }}</td>
                      <td class="py-2">{{ item.ma_loai_xe }}</td>
                      <td class="py-2">{{ item.ma_nguoi_cho_thue }}</td>
                      <td class="py-2">{{ item.tieu_de }}</td>
                      <td class="py-2">{{ item.gia_cho_thue_moi_gio }}</td>
                      <td
                        v-if="item.trang_thai == 1"
                        class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                      >
                        <span
                          class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                        >
                          <span
                            aria-hidden
                            class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                          ></span>
                          <span class="relative">Đã duyệt</span>
                        </span>
                      </td>
                      <td
                        v-else
                        class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                      >
                        <span
                          class="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight"
                        >
                          <span
                            aria-hidden
                            class="absolute inset-0 bg-red-200 opacity-50 rounded-full"
                          ></span>
                          <span class="relative">Chờ duyệt</span>
                        </span>
                      </td>
                      <td><button @click="approveBikes(item.ma_xe)" class="approve">Duyệt xe này</button></td>
                      <!-- Add more table cells based on the data structure -->
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- Add more tabs and their corresponding content as needed -->
            </div>
          </div>
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
export default {
  data() {
    return {
      activeTab: "approved",
      approvedBikes: [],
      pendingBikes: [],
      // Add more data arrays for additional tabs
    };
  },
  created() {
    this.getBikesByState(1, "approvedBikes");
    this.getBikesByState(0, "pendingBikes");
    // Call the getBikesByState method for each tab
  },
  methods: {
    approveBikes(ma_xe) {
      const api = `${process.env.VUE_APP_API}/xe/ma_xe/${ma_xe}`;
      axios
        .patch(api,{
          trang_thai: 1,
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log(res);
          this.getBikesByState(1, "approvedBikes");
          this.getBikesByState(0, "pendingBikes");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getBikesByState(state, variable) {
      const api = `${process.env.VUE_APP_API}/xe/trang_thai/${state}`;
      axios
        .get(api, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          this[variable] = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* Table styles */
table {
  width: 100%;
  border-collapse: collapse;
  background: #ffffff;
}

.table th,
.table td {
  padding: 8px;
  border-bottom: 1px solid #ddd;
  text-align: left;
}

/* Tab styles */
.tabs-container {
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
}
button.active {
  background: #d70000;
  color: white;
  font-weight: bold;
}
button.normal {
  background: #ffffff;
  color: black;
  font-weight: bold;
}
.tabs {
  display: flex;
}

.tab-button {
  flex: 1;
  padding: 12px;
  text-align: center;
  font-weight: bold;
  cursor: pointer;
  border: none;
  background-color: #f9f9f9;
  transition: background-color 0.3s;
}

.tab-button:hover {
  background-color: #e9e9e9;
}

.tab-button.active {
  background-color: #ddd;
}

.tab-content {
  padding: 16px;
}

/* Example specific styles */
.table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.table td {
  background-color: #fff;
}
.approve {
  background-color: #d70000;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}
</style>
