<template>
  <base-dialog
    :title="title"
    :dialogVisible="dialogVisible"
    :showConfirmBtn="false"
    @close="rejectDialog"
    class="dialog"
  >
    <template v-slot:header>
      {{ title }}
    </template>
    <template v-slot:body>
      <textarea v-model="dialogTextPublished" />
    </template>
    <template v-slot:footer>
      <button @click="confirmDialog">Подтвердить</button>
      <button @click="rejectDialog">Отмена</button>
    </template>
  </base-dialog>
</template>

<script>
import BaseDialog from "./BaseDialog";
import { mapGetters } from 'vuex';

export default {
  props: ["isOpened", "title"],
  data() {
    return {
      dialogTextPublished: ''
    }
  },
  components: {
    BaseDialog
  },
  computed: {
    ...mapGetters(['dialogText','dialogVisible', 'nodeId']),
    computedTitle() {
      return this.nodeId ? 'Редактирование' : 'Создание'
    }
  },
  mounted() {
    this.dialogTextPublished = this.dialogText
    this.$store.commit('set', { key: 'dialogConfirmed', value: false })
  },
  watch: {
    dialogText() {
      this.dialogTextPublished = this.dialogText
    }
  },
  methods: {
    confirmDialog() {
      this.$store.commit('set', { key: 'dialogText', value: this.dialogTextPublished })
      this.$store.commit('resolveDialog')
    },
    rejectDialog() {
      this.$store.commit('rejectDialog');
    }
  }
};
</script>

<style>
.dialog /deep/ .el-dialog {
  min-width: 750px;
}
</style>
