<template>
  <div class="home">
    <!-- 间隔 12px -->
    <div style="height: 12px"></div>

    <!-- Banner 轮播图 -->
    <el-carousel
      :interval="30 * 1000"
      trigger="click"
      arrow="never"
      indicator-position="none"
      class="banner-carousel"
    >
      <el-carousel-item v-for="(img, index) in banners" :key="index">
        <div class="banner-img-wrapper">
          <img :src="img" class="banner-img" />
        </div>
      </el-carousel-item>
    </el-carousel>

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
    <transition name="fade" mode="out-in">
      <div v-if="marks[activeCategory]" :key="activeCategory" class="marks-container">
        <div class="group-grid">
          <el-card
            v-for="(sub, idx) in marks[activeCategory]"
            :key="idx"
            class="box-card"
            shadow="hover"
            ref="cards"
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
    </transition>
  </div>
</template>

<script>
import SearchBar from '@/components/SearchBar.vue'

export default {
  name: 'Home',
  components: { SearchBar },
  data() {
    return {
      banners: [
        '/images/1.jpg',
        '/images/2.jpg',
        '/images/3.jpg',
        '/images/4.jpg',
        '/images/5.jpg'
      ],
      categories: [],
      activeCategory: '',
      activeIndex: 0,
      marks: {},
      sliderStyle: { width: '0px', left: '0px' }
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
          this.$nextTick(() => this.alignCardHeights())
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
    },
    alignCardHeights() {
      let cards = this.$refs.cards
      if (!cards) return
      if (!Array.isArray(cards)) cards = [cards]
      // 每行两列对齐
      for (let i = 0; i < cards.length; i += 2) {
        const card1 = cards[i] && cards[i].$el
        const card2 = cards[i + 1] && cards[i + 1].$el
        if (!card1 && !card2) continue
        const h1 = card1 ? card1.offsetHeight : 0
        const h2 = card2 ? card2.offsetHeight : 0
        const maxH = Math.min(Math.max(h1, h2), 240)
        if (card1) card1.style.minHeight = maxH + 'px'
        if (card2) card2.style.minHeight = maxH + 'px'
      }
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

/* 轮播图 */
.banner-carousel {
  border-radius: 8px;
  overflow: hidden;
  height: auto !important;
}
.banner-img-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
.banner-img {
  width: 24vw;
  height: auto;
  display: block;
  border-radius: 8px;
}

/* 搜索框 */
.search-wrapper {
  margin: 24px 0;
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
.group-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;
}
.box-card {
  font-size: 14px;
  padding-bottom: 12px;
  max-height: 240px;
}

/* 链接容器 */
.links-container {
  display: flex;
  flex-direction: column;
  max-height: 240px;
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

/* fade 动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
