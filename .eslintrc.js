module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    project: ['tsconfig.json']
  },
  plugins: [ 
    'react', 
    '@typescript-eslint'
  ],
  rules: {
    // Disabled Rules
    'react/react-in-jsx-scope': 0, // NextJS는 React import 하지 않아도 됨
    'no-unused-vars': 'off', // off 하지 않으면 interface에서 에러 발생 - typescript rules로 해결
    // Enabled rules
    '@typescript-eslint/no-unused-vars': ['error'], // 그냥 rule은 off해서 typescript rule 사용
    'react/jsx-curly-spacing': [ 'error', 'always' ], // 태그 속성의 중괄호 spacing
    'object-curly-spacing': [ 'error', 'always' ], // object spacing
    'array-bracket-spacing': [ 'error', 'always' ], // 배열 spacing
    '@typescript-eslint/type-annotation-spacing': [ 'error' ], // 타입 설정할 때 : 뒤로 spacing
    '@typescript-eslint/quotes': [ 'error', 'single' ], // 따옴표: 작은 따옴표
    '@typescript-eslint/semi': [ 'error', 'never' ], // 세미콜론 안쓰도록
    '@typescript-eslint/adjacent-overload-signatures': 'error', // overload 하는 함수는 선언이 붙어있도록
    '@typescript-eslint/no-misused-new': 'error', // new, constructor를 그냥 함수로 쓰지 못하게 함
    '@typescript-eslint/restrict-plus-operands': 'error', // 동일한 자료형끼리만 덧셈이 가능하게 함
  },
}
