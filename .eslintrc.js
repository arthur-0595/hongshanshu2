// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    'indent_style' : 'space', //缩进风格,基于空格做缩进
    'indent_size' : 'off',   //缩进大小是2格
    'end_of_line' : 'lf',   //换行符的风格
    'insert_final_newline' : true,  //当你创建一个文件，会自动在文件末尾插入新行
    'trim_trailing_whitespace' : true,  //自动移除行尾多余空格
    // 关闭语句强制分号结尾
    "semi": [0],
    //空行最多不能超过100行
    "no-multiple-empty-lines": [0, {"max": 100}],
    //关闭禁止混用tab和空格
    "no-mixed-spaces-and-tabs": [0],
    "no-unused-vars": [2, {
      // 允许声明未使用变量
      "vars": "local",
      // 参数不检查
      "args": "none"
    }],
    'indent':'off',
    // allow debugger during development
    "space-before-function-paren": [0, "always"],//函数定义时括号前面要不要有空格
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
