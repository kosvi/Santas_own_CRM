module.exports = {
  'env': {
    'node': true,
    'commonjs': true,
    'es2021': true,
    'cypress/globals': true
  },
  'extends': 'eslint:recommended',
  'parserOptions': {
    'ecmaVersion': 'latest'
  },
  'plugins': [
    'cypress'
  ],
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ]
  }
};
