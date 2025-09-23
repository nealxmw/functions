module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  extends: [
    'plugin:vue/essential',  // Vue2 必备基础规则
    'eslint:recommended'     // JS 推荐规则
  ],
  parserOptions: {
    parser: 'babel-eslint'   // 让 ESLint 能理解 ES6+ 语法
  },
  rules: {
    // 常用的自定义规则，可以根据团队需要调整
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'semi': ['error', 'always'],          // 强制分号
    'quotes': ['error', 'single'],        // 强制单引号
    'indent': ['error', 2],               // 2 空格缩进
    'vue/html-indent': ['error', 2],      // Vue 模板缩进
    'vue/max-attributes-per-line': ['off'] // 关闭强制每行属性数限制
  }
};
