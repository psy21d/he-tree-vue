<template>
    <Tree :value="treeData" />
</template>

<script>
import {Tree, // Base tree
  //Fold, Check, Draggable, // plugins
  //foldAll, unfoldAll, cloneTreeData, walkTreeData, getPureTreeData, // utils
} from 'he-tree-vue'
import 'he-tree-vue/dist/he-tree-vue.css'

export default {
  name: 'CommentaryTree',
  data() {
    return {
      Tree
    }
  },
  components: {
    Tree,
  },
  props: {
    treeData: {
      type: Object,
      default: () => {},
    },
  }
}
</script>

