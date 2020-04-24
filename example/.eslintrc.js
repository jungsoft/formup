module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  settings: {
    "import/resolver": {
      node: {
        paths: ["src"],
        extensions: [
          ".js",
          ".ts",
          ".jsx",
          ".tsx",
        ],
      },
    },
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-hooks',
  ],
  rules: {
    "react/jsx-filename-extension": 0,
    "react/jsx-props-no-spreading": 0,
    "import/extensions": 0,
    "no-console": 0,
    "react-hooks/exhaustive-deps": "warn",
    "react-hooks/rules-of-hooks": "error",
    "react/jsx-boolean-value": 0,
    "react/no-unescaped-entities": 0,
    "react/jsx-one-expression-per-line": 0,
    "react/prop-types": 0,
  },
};
