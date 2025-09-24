<template>
  <div class="login-container">
    <!-- 背景图片 -->
    <BackgroundImage :bgImageUrl="bgImageUrl" />

    <!-- 上部：显示日期、时间和星期 -->
    <div class="top">
      <div class="date-time">{{ currentDate }} 星期{{ currentWeekday }}</div>
      <div class="current-time">{{ currentTime }}</div>
    </div>

    <!-- 底部：提示信息 + 输入框 + 头像 -->
    <div class="bottom">
      <!-- 提示信息 -->
      <div class="tip">稍等一下，马上回来</div>

      <!-- 头像 -->
      <div class="footer">
        <img :src="avatarUrl" alt="User Avatar" class="avatar" />
      </div>

      <!-- 登录输入框 -->
      <div class="input-group">
        <input
          type="password"
          v-model="password"
          id="password"
          placeholder="输入密码以解锁"
          @keyup.enter="handleLogin"
          required
        />
      </div>
    </div>
  </div>
</template>

<script>
import BackgroundImage from '@/components/BackgroundImage.vue'

export default {
  name: 'Login',
  components: { BackgroundImage },
  data() {
    return {
      password: '1998', // 默认密码
      currentTime: '', // 实时时间
      currentDate: '', // 当前日期
      currentWeekday: '', // 当前星期
      avatarUrl: '/images/user.jpg', // 默认头像
      bgImageUrl: '/images/bg.jpg' // 默认背景图
    }
  },
  methods: {
    handleLogin() {
      // 验证密码
      if (this.password === '1998') {
        // 登录成功，设置 localStorage 标记
        localStorage.setItem('loggedIn', 'true')
        this.$router.push({ name: 'Home' }) // 跳转到首页
      } else {
        alert('密码错误')
      }
    },
    updateTime() {
      setInterval(() => {
        const now = new Date()
        this.currentTime = now.toLocaleTimeString() // 获取实时的时分秒
        this.currentDate = `${now.getMonth() + 1}月${now.getDate()}日` // 格式化日期为 月/日
        this.currentWeekday = ['日', '一', '二', '三', '四', '五', '六'][now.getDay()] // 获取当前星期几
      }, 1000)
    }
  },
  created() {
    this.updateTime() // 初始化时更新时间
  }
}
</script>

<style scoped>
.login-container {
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; /* 居中所有元素 */
  color: white;
  overflow: hidden;
}

/* 背景图片 */
.background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  z-index: -1;
}

/* 上部：日期、时间和星期 */
.top {
  position: absolute;
  top: 100px; /* 日期时间定位到顶部 100px */
  text-align: center;
  z-index: 1;
}

.date-time {
  font-size: 24px; /* 日期字体大小 24px */
}

.current-time {
  font-size: 100px; /* 时间字体大小 100px */
  font-weight: bold;
}

/* 底部：头像 + 提示信息 + 输入框 */
.bottom {
  position: absolute;
  bottom: 60px; /* 整体定位距离底部 32px */
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  text-align: center;
}

/* 提示信息样式 */
.tip {
  font-size: 14px;
  margin-bottom: 24px; /* 提示与输入框之间的间距 */
  color: white; /* 设置提示文字为白色 */
}

/* 输入框样式 */
.input-group {
  width: 160px; /* 输入框宽度 160px */
}

input {
  width: 100%;
  height: 32px; /* 输入框高度 32px */
  border: 1px solid #ccc;
  border-radius: 16px; /* 圆角 16px */
  background-color: transparent;
  color: white; /* 输入框文字为白色 */
  font-size: 16px;
  text-align: center;
  padding: 0; /* 去除输入框的 padding */
}

input::placeholder {
  color: #ffffff; /* 输入框内提示文字为白色 */
}

/* 底部头像 */
.footer {
  margin-bottom: 24px; /* 头像和输入框之间的间距 */
}

.avatar {
  width: 50px; /* 头像大小 50px */
  height: 50px;
  border-radius: 50%;
  border: 2px solid white;
}
</style>
