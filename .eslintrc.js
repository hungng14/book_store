module.exports = {
    'extends': [
        'airbnb-base',
        'eslint:recommended',
    ],
    "parser": "babel-eslint",
    'parserOptions': {
        'ecmaVersion': 8,
        'sourceType': 'module',
        'ecmaFeatures': {
            'jsx': true
        }
    },
    "plugins": [],
    'env': {
        'es6': true,
        'node': true
    },
    rules: {
        'linebreak-style': 0,
        'indent': ['error', 4],
        'no-console': 'off',
        'object-curly-spacing': 'off',
        'arrow-parens': 2,
        'semi': 2,
        'no-underscore-dangle': 'off',
        'consistent-return': "off",
        'max-len': 'off',
        'no-useless-constructor': 'off',
        'class-methods-use-this': 'off',
        'max-classes-per-file': 'off',
        'no-unused-vars': 2,
        'no-restricted-syntax': 'off',
        'guard-for-in': 'off',
        'camelcase': 'off',
        'no-plusplus': 'off',
        'array-callback-return': 'off',
        'no-continue': 'off',
        "indent": ["error", 2]
    }
};
