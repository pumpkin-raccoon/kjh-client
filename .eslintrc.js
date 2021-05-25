module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: [ "react", "@typescript-eslint" ],
  rules: {
    // Disabled Rules
    "react/react-in-jsx-scope": 0,
    "no-unused-vars": "off", // off 하지 않으면 interface에서 에러 발생 - typescript rules로 해결
    // Enabled rules
    "@typescript-eslint/no-unused-vars": [ "error" ], // 그냥 rule은 off해서 typescript rule 사용
    "react/jsx-curly-spacing": [ "error", "always" ], // 태그 속성의 중괄호 spacing
    "object-curly-spacing": [ "error", "always" ], // object spacing
    "array-bracket-spacing": [ "error", "always" ], // 배열 spacing
  },
}
