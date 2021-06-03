<template>
    <TreeView :value="treeData" />
</template>

<script>
import TreeView from "@/components/TreeView.vue";

export default {
  name: 'CommentaryTree',
  data() {
    return {
    }
  },
  components: {
    TreeView,
  },
  props: {
    treeData: {
      type: Object,
      default: () => {},
    },
  }
}
</script>

