<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              default header
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              default body
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              default footer
              <button class="modal-default-button" @click="$emit('close')">
                OK
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export const baseDialogMixin = {
  props: {
    title: {
      type: String,
      requried: false,
      default: null,
    },
    dialogVisible: {
      type: Boolean,
      required: true,
    },
  },
};

export default {
  mixins: [baseDialogMixin],
  props: {
    width: {
      type: String,
      default: null,
    },
    maxWidth: {
      type: String,
      required: false,
      default: '600px',
    },
    top: {
      type: String,
      required: false,
      default: '0',
    },
  },
  computed: {
    calcStyle: (vm) => ({
      maxWidth: vm.width || vm.maxWidth,
      width: vm.width || '100%',
      marginTop: vm.top,
    }),
  },
};
</script>

<style lang="scss">
$spacing: 2rem;

.base-dialog {
  padding: $spacing;

  &.el-dialog__wrapper {
    overflow: hidden;
  }

  .el-dialog {
    display: flex;
    flex-direction: column;
    max-height: calc(100vh - (#{$spacing} * 2));

    &__body {
      overflow-y: auto;

      &::-webkit-scrollbar {
        width: 5px;
        height: 5px;
      }
      &::-webkit-scrollbar-track {
        background: transparent;
      }
      &::-webkit-scrollbar-thumb {
        background: #b3d8ff;
        border-radius: 4px;
      }
    }
  }
}

</style>
