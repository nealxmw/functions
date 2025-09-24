<template>
  <div class="home">
    <!-- 背景图片 -->
    <BackgroundImage :bgImageUrl="bgImageUrl" />

    <!-- 搜索框 -->
    <div class="search-wrapper">
      <SearchBar />
    </div>

    <!-- 分类 Tabs -->
    <div class="category-tabs-wrapper" ref="tabsWrapper">
      <div class="category-tabs">
        <div
          v-for="(cat, index) in categories"
          :key="cat.value"
          class="tab-item"
          :class="{ active: activeCategory === cat.value }"
          @click="switchCategory(cat.value, index)"
          @mouseover="hoverSlider(index)"
          @mouseleave="resetSlider"
        >
          {{ cat.label }}
        </div>
        <div class="tab-slider" :style="sliderStyle"></div>
      </div>
    </div>

    <!-- 分类内容 -->
    <div v-if="marks[activeCategory]" :key="activeCategory" class="marks-container">
      <div class="group-flex">
        <el-card
          v-for="(sub, idx) in marks[activeCategory]"
          :key="idx"
          class="box-card"
          shadow="hover"
        >
          <div slot="header">{{ sub.category }}</div>
          <div class="links-container">
            <a
              v-for="(link, i) in sub.links"
              :key="i"
              :href="link.url"
              target="_blank"
              class="link-item"
            >
              <span>{{ link.name }}</span>
            </a>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from '@/components/SearchBar.vue'
import BackgroundImage from '@/components/BackgroundImage.vue'

export default {
  name: 'Home',
  components: { SearchBar, BackgroundImage },
  data() {
    return {
      categories: [],
      activeCategory: '',
      activeIndex: 0,
      marks: {},
      sliderStyle: { width: '0px', left: '0px' },
      // 默认背景图
      bgImageUrl: '/images/bg.jpg' // 这里设置默认的背景图
    }
  },
  created() {
    fetch('/categories.json')
      .then(res => res.json())
      .then(categories => {
        this.categories = categories
        if (categories.length > 0) {
          this.activeCategory = categories[0].value
          this.activeIndex = 0
          this.loadMarks(this.activeCategory)
          this.$nextTick(() => this.moveSlider(this.activeIndex))
        }
      })
  },
  methods: {
    switchCategory(value, index) {
      this.activeCategory = value
      this.activeIndex = index
      this.loadMarks(value)
      this.$nextTick(() => this.moveSlider(index))
    },
    loadMarks(value) {
      if (this.marks[value]) return
      fetch(`/marks/${value}.json`)
        .then(res => res.json())
        .then(data => {
          this.$set(this.marks, value, data)
        })
    },
    moveSlider(index) {
      const tabsWrapper = this.$refs.tabsWrapper
      if (!tabsWrapper) return
      const tabItems = tabsWrapper.querySelectorAll('.tab-item')
      if (!tabItems[index]) return
      const target = tabItems[index]
      this.sliderStyle = { width: target.offsetWidth + 'px', left: target.offsetLeft + 'px' }
    },
    hoverSlider(index) {
      this.moveSlider(index)
    },
    resetSlider() {
      this.moveSlider(this.activeIndex)
    }
  }
}
</script>

<style scoped>
.home {
  width: 80vw;
  margin: 20px auto;
  font-size: 14px;
}

/* 搜索框 */
.search-wrapper {
  margin-top: 120px;
}

/* 分类 Tabs */
.category-tabs-wrapper {
  overflow-x: auto;
  margin-bottom: 20px;
  min-height: 36px;
  position: relative;
}
.category-tabs-wrapper::-webkit-scrollbar {
  display: none;
}
.category-tabs {
  display: flex;
  position: relative;
  background: #f5f5f5;
  border-radius: 6px;
  padding: 4px 8px;
  gap: 8px;
}
.tab-item {
  padding: 6px 16px;
  cursor: pointer;
  border-radius: 4px;
  white-space: nowrap;
  color: #555;
  transition: color 0.3s;
  font-weight: 500;
  font-size: 13px;
}
.tab-item:hover {
  color: #409eff;
}
.tab-item.active {
  color: #409eff;
  font-weight: 600;
}
.tab-slider {
  position: absolute;
  bottom: 0;
  height: 2px; /* 缩小滑块高度 */
  background: #409eff;
  border-radius: 2px;
  transition: all 0.3s;
}

/* 分类内容 */
.marks-container {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

/* 使用 flex 保证不换行，所有卡片在一行展示 */
.group-flex {
  display: flex;
  flex-wrap: nowrap; /* 禁止换行 */
  gap: 25px; /* 卡片间的间距 */
  justify-content: flex-start; /* 左对齐 */
  overflow-x: auto; /* 超出时可以水平滚动 */
}

.box-card {
  font-size: 14px;
  padding-bottom: 12px;
  height: auto; /* 高度自适应 */
  box-sizing: border-box;
  flex-grow: 1; /* 让每个卡片宽度尽量占满 */
  flex-basis: 0; /* 让所有卡片的宽度自动占满剩余空间 */
  min-width: 0; /* 防止卡片过小 */
}

/* 链接容器 */
.links-container {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  gap: 8px;
}
.links-container::-webkit-scrollbar {
  width: 6px;
}
.links-container::-webkit-scrollbar-thumb {
  background-color: #c0c0c0;
  border-radius: 3px;
}

/* 链接样式 */
.link-item {
  display: block;
  text-align: left;
  color: #555;
  text-decoration: none;
  padding: 4px 0;
  position: relative;
  width: fit-content;
  transition: color 0.2s;
}
.link-item:hover {
  color: #409eff;
}
.link-item::after {
  content: '';
  position: absolute;
  left: 4px;
  right: 4px;
  bottom: 0;
  height: 1px;
  background: #d0d0d0;
}
</style>
