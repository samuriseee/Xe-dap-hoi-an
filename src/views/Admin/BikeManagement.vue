<template>
  <div class="wrapper">
    <div class="border border-gray-200 rounded-lg table-container">
      <!-- Tab buttons -->
      <div class="flex">
        <button
          :class="{
            'active': activeTab === 'approved',
            'normal': activeTab !== 'approved',
          }"
          class="px-4 py-2 text-sm font-medium rounded-tl-lg focus:outline-none"
          @click="activeTab = 'approved'"
        >
          Đã Duyệt
        </button>
        <button
          :class="{
            'active': activeTab === 'pending',
            'normal': activeTab !== 'pending',
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
                <th class="py-2">Column 1</th>
                <th class="py-2">Column 2</th>
                <!-- Add more table headers as needed -->
              </tr>
            </thead>
            <!-- Table rows -->
            <tbody>
              <tr v-for="(item, index) in approvedItems" :key="index">
                <td class="py-2">{{ item.column1 }}</td>
                <td class="py-2">{{ item.column2 }}</td>
                <!-- Add more table cells based on the data structure -->
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
                <th class="py-2">Column 1</th>
                <th class="py-2">Column 2</th>
                <!-- Add more table headers as needed -->
              </tr>
            </thead>
            <!-- Table rows -->
            <tbody>
              <tr v-for="(item, index) in pendingItems" :key="index">
                <td class="py-2">{{ item.column1 }}</td>
                <td class="py-2">{{ item.column2 }}</td>
                <!-- Add more table cells based on the data structure -->
              </tr>
            </tbody>
          </table>
        </div>
  
        <!-- Add more tabs and their corresponding content as needed -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTab: "approved",
      approvedItems: [
        { column1: "Item 1", column2: "Item 1 Details" },
        { column1: "Item 2", column2: "Item 2 Details" },
        // Add more items for the "Đã Duyệt" tab
      ],
      pendingItems: [
        { column1: "Item 1", column2: "Item 1 Details" },
        { column1: "Item 2", column2: "Item 2 Details" },
        // Add more items for the "Chờ duyệt" tab
      ],
      // Add more data arrays for additional tabs
    };
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
.table-container {
  width: 80%;
  margin: 0 auto;
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
</style>
