module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module'
  },
  "globals": {
    "location": false,
    "debugger": true,
    "alert": true
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    "arrow-parens": 0,
    "camelcase": 0,
    "no-debugger": 0
  }
}
