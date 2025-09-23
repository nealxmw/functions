<template>
  <div>
    <h1>Element UI 测试</h1>
    <el-button type="primary" @click="handleClick">点我</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick() {
      this.$message.success('按钮点击成功！')
    }
  }
}
</script>
