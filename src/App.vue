<template>
  <CommentaryTree
    :treeData="treeData"
    @nodeReply="addCommentary"
    @removeNode="removeCommentary"
    @nodeEdit="editCommentary"
    @reply="reply"
  />
  <CommentaryDialog v-if="dialogVisible" />
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import CommentaryTree from '@/components/CommentaryTree.vue'
import CommentaryDialog from '@/components/dialog/CommentaryDialog.vue'
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  data() {
    return {
    }
  },
  components: {
    CommentaryTree,
    CommentaryDialog,
  },
  computed: {
    ...mapGetters(['dialogText','dialogVisible', 'nodeId', 'parentId']),
    treeData() {
      return this.renderCommentaries(this.commentaries)
    },
    commentaries() {
      return this.$store.state.commentaries
    },
  },
  methods: {
    reply() {
      this.addCommentary(null)
    },
    addCommentary(node) {
      this.$store.commit('set', { key: 'dialogText', value: '' })
      this.$store.commit('set', { key: 'parentId', value: node ? node.id : null})
      this.$store.commit('set', { key: 'nodeId', value: uuidv4() })
      new Promise((resolve, reject) => {
        this.$store.commit('setDialog', { resolve, reject })
      }).then(() => {
        this.placeCommentary()
      });
    },
    editCommentary(node) {
      this.$store.commit('set', { key: 'dialogText', value: node.text })
      this.$store.commit('set', { key: 'parentId', value: node.parent })
      this.$store.commit('set', { key: 'nodeId', value: node.id })
      new Promise((resolve, reject) => {
        this.$store.commit('setDialog', { resolve, reject })
      }).then(() => {
        this.placeCommentary()
      });
    },
    placeCommentary() {
      this.$store.dispatch('addCommentary', {
        id: this.$store.state.nodeId,
        parent: this.$store.state.parentId,
        text: this.$store.state.dialogText,
      })
    },
    removeCommentary(node) {
      this.$store.dispatch('removeCommentary', node)
    },
    renderCommentaries() {
      let commentaries = this.commentaries
      let commentariesMap = {}
      commentaries.forEach((comment) => {
        if (!commentariesMap[comment.parent]) {
          commentariesMap[comment.parent] = []
        }
        commentariesMap[comment.parent].push(comment)
      })
      commentaries.forEach((comment) => {
        comment.children = commentariesMap[comment.id]
      })
      if (!commentariesMap['null']) {
        commentariesMap['null'] = [
          {
            text: 'Ваш комментарий будет первым',
            type: 'empty',
          }
        ]
      }
      return commentariesMap['null']
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
