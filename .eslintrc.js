module.exports = {
    'env': {
        'es6': true,
        amd: true,
        browser: true
    },
    'globals': {
        'Chain': true,
        'describe': true
    },
    'extends': 'airbnb',
    'parserOptions': {
        'ecmaVersion': 2018,
        'sourceType': 'script',
        'ecmaFeatures': {
            'impliedStrict': true
        }
    },
    'rules': {
        'no-underscore-dangle': 'warn',
        'no-useless-constructor': 'warn',
        'strict': [
            'off'
        ],
        'import/no-unresolved': 0,
        'indent': [
            'error',
            4
        ],
        'linebreak-style': [
            'off'
        ],
        'comma-dangle': [
            'off'
        ],
        'no-unused-vars': [
            'off'
        ],
        'no-console': [
            'off'
        ],
        'no-trailing-spaces': 'off',
        'max-len': [
            'error',
            240
        ],
        'import/prefer-default-export': 'off',
        'padded-blocks': 'off',
        'lines-between-class-members': 'off',
        'arrow-body-style': [
            'error',
            'always'
        ],
        'class-methods-use-this': 'off'
    }
};
