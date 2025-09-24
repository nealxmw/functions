<template>
  <div class="background-image" :style="{ backgroundImage: `url(${bgImageUrl})` }"></div>
</template>

<script>
export default {
  name: 'BackgroundImage',
  props: {
    bgImageUrl: {
      type: String,
      default: '/images/bg.jpg' // 默认背景图片路径
    }
  }
}
</script>

<style scoped>
.background-image {
  position: fixed; /* 固定背景 */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover; /* 背景图片自适应 */
  background-position: center; /* 居中显示 */
  background-repeat: no-repeat; /* 防止重复 */
  z-index: -1; /* 确保背景在页面内容之下 */
}
</style>
