<template>
  <div
    class="fixed z-50 inset-0 overflow-y-auto"
    aria-modal="true"
    :class="{ 'opacity-0 pointer-events-none': !isOpen }"
  >
    <div
      class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div
        class="fixed inset-0 transition-opacity"
        aria-hidden="true"
        @click="closeModal()"
      >
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
        >&#8203;</span
      >

      <div
        class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        :class="{
          'sm:p-6': variant === 'default',
          'sm:p-4': variant === 'small',
          'sm:max-w-2xl': variant === 'large',
        }"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div>
          <slot name="header"></slot>
        </div>

        <div>
          <slot name="content"></slot>
        </div>

        <div class="mt-5 sm:mt-6">
          <button
            type="button"
            class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
            @click="closeModal()"
            id="close-modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
export default {
  name: "ModalComponent",
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    variant: {
      type: String,
      default: "default",
    },
  },
  methods: {
    closeModal() {
      this.$emit("update:isOpen", false);
    },
  },
};
</script>
  