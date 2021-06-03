<template>
  <CommentaryTree :treeData="treeData"/>
</template>

<script>
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
