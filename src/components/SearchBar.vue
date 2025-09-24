<template>
  <div class="search-page">
    <el-input
      v-model="keyword"
      placeholder="输入搜索内容"
      clearable
      class="search-input"
      :class="{ focused: focused }"
      @focus="focused = true"
      @blur="focused = false"
      @input="onKeywordChange"
      @keyup.enter="onSearch"
      @keyup.down.prevent="highlightNext"
      @keyup.up.prevent="highlightPrev"
    >
      <!-- 前置下拉框 -->
      <template slot="prepend">
        <el-select
          v-model="selectedPlatform"
          size="small"
          class="platform-select"
          placeholder="选择平台"
          @focus.stop="focused = true"
          @blur.stop="focused = false"
          :popper-class="'custom-select-dropdown'"
        >
          <el-option
            v-for="(platform, index) in platforms"
            :key="platform.value"
            :label="platform.label"
            :value="platform.value"
            :class="{ highlighted: index === highlightedIndex }"
          />
        </el-select>
      </template>

      <!-- 后置搜索按钮 -->
      <template slot="append">
        <el-button size="small" type="primary" class="search-button" @click="onSearch"
          >搜索</el-button
        >
      </template>
    </el-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: '',
      platforms: [],
      selectedPlatform: '',
      focused: false,
      highlightedIndex: -1
    }
  },
  created() {
    fetch('/search.json')
      .then(res => res.json())
      .then(data => {
        this.platforms = data
        if (data.length) this.selectedPlatform = data[0].value
      })
      .catch(err => console.error(err))
  },
  methods: {
    onSearch() {
      if (!this.keyword || !this.selectedPlatform) return
      const url = this.selectedPlatform + encodeURIComponent(this.keyword)
      window.open(url, '_blank', 'noopener,noreferrer')
    },
    onKeywordChange() {
      if (!this.keyword) {
        this.highlightedIndex = -1
        return
      }
      const keywordLower = this.keyword.toLowerCase()
      const matchedIndex = this.platforms.findIndex(p =>
        p.label.toLowerCase().includes(keywordLower)
      )
      if (matchedIndex !== -1) {
        this.selectedPlatform = this.platforms[matchedIndex].value
        this.highlightedIndex = matchedIndex
      }
    },
    highlightNext() {
      if (!this.platforms.length) return
      this.highlightedIndex = (this.highlightedIndex + 1) % this.platforms.length
      this.selectedPlatform = this.platforms[this.highlightedIndex].value
    },
    highlightPrev() {
      if (!this.platforms.length) return
      this.highlightedIndex =
        (this.highlightedIndex - 1 + this.platforms.length) % this.platforms.length
      this.selectedPlatform = this.platforms[this.highlightedIndex].value
    }
  }
}
</script>

<style scoped>
/* 页面水平居中 */
.search-page {
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 50px 0;
}

/* 输入框整体 */
.search-input {
  width: 45vw;
  height: 40px;
  font-size: 14px;
  transition: box-shadow 0.3s, border-color 0.3s;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  color: #303133; /* 默认文字颜色 */
}

/* 聚焦阴影 + 边框渐变 */
.search-input.focused {
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3);
  border-color: #409eff;
}

/* 前置下拉框 */
.platform-select {
  width: 120px;
  height: 40px !important;
  display: flex;
  align-items: center; /* 下拉框内部垂直居中 */
  border: none;
  color: inherit;
}

/* 修正 el-select 内部高度 */
.platform-select .el-input__inner {
  height: 40px !important;
  line-height: 40px !important;
  padding: 0 6px !important;
  box-sizing: border-box;
  border: none;
  background: transparent;
  color: inherit;
}

/* 下拉箭头垂直居中 */
.platform-select .el-input__suffix {
  height: 40px !important;
  line-height: 40px !important;
  color: inherit;
}

/* 高亮项样式 */
.platform-select .highlighted {
  background-color: rgba(64, 158, 255, 0.2);
}

/* 下拉列表圆角 */
.custom-select-dropdown {
  border-radius: 4px;
}

/* 后置搜索按钮 */
.search-button {
  width: 140px;
  height: 40px;
  border-radius: 0 4px 4px 0;
  transition: background-color 0.3s, color 0.3s; /* 加上文字过渡 */
  color: #303133; /* 默认文字颜色 */
}

/* 搜索按钮悬停效果 */
.search-button:hover {
  background-color: #409eff; /* 蓝色背景 */
  color: #fff; /* 悬停文字变白 */
}

/* 输入框内部文字高度 */
.search-input .el-input__inner {
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  padding-left: 8px;
  padding-right: 8px;
  color: inherit;
}
</style>
