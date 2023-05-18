<template>
  <div>
    <input
      type="file"
      ref="fileInput"
      multiple
      @change="handleFileUpload"
      class="hidden"
    />
    <div class="default" @click="openFileInput">
      <img src="@/assets/icon/uploadFileIcon.svg" alt="" />
      <div>Bấm để chọn ảnh cần tải lên</div>
      <div>hoặc kéo thả ảnh vào đây</div>
    </div>
    <div v-if="imageUrls.length" class="image-preview">
      <div v-for="(url, index) in imageUrls" :key="index" class="image-frame">
        <img :src="url" />
      </div>
    </div>
  </div>
</template>
  
<script>
import axios from "axios";
import { cloudinaryConfig } from "../../../cloudinaryConfig";
export default {
  data() {
    return {
      imageUrls: [],
    };
  },
  methods: {
    openFileInput() {
      this.$refs.fileInput.click();
      console.log("click click");
    },
    async handleFileUpload(event) {
      const files = Array.from(event.target.files);

      const uploaders = files.map((file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", cloudinaryConfig.uploadPreset);
        return axios.post(cloudinaryConfig.apiUrl, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      });
      const results = await Promise.all(uploaders);
      const urls = results.map((res) => res.data.secure_url);
      this.imageUrls.push(...urls);
      this.$emit("image-uploaded", this.imageUrls); // emit the event with imageUrls
    },
  },
};
</script>
  
  <style scoped>
.image-frame {
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
.image-preview {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.image-preview img {
  width: 200px;
  height: 150px;
  object-fit: cover;
}
.default {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.file-input {
  position: relative;
  display: inline-block;
}

.hidden {
  position: absolute;
  left: -9999px;
}

.default {
  /* your default styles */
  cursor: pointer;
}
</style>