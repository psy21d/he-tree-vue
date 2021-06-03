<template>
  <CommentaryTree
    :treeData="treeData"
    @nodeReply="addCommentary"
    @removeNode="removeCommentary"
    @reply="reply"
  />
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import CommentaryTree from '@/components/CommentaryTree.vue'

export default {
  name: 'App',
  data() {
    return {
    }
  },
  components: {
    CommentaryTree,
  },
  computed: {
    treeData() {
      return this.renderCommentaries(this.commentaries)
    },
    commentaries() {
      return this.$store.state.commentaries
    },
  },
  methods: {
    reply() {
      this.$store.dispatch('addCommentary', {
        id: uuidv4(),
        parent: null,
        text: 'Верхнеуровневый',
      })
    },
    addCommentary(node) {
      this.$store.dispatch('addCommentary', {
        id: uuidv4(),
        parent: node.id,
        text: 'Новый',
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
