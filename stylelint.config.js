module.exports = {
  extends: ['stylelint-config-idiomatic-order', 'stylelint-config-standard'],
  plugins: ['stylelint-scss'],
  rules: {
    // 覆盖
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'no-descending-specificity': null,
    'font-family-no-missing-generic-family-keyword': null,
    // Scss https://github.com/kristerkari/stylelint-scss/blob/master/docs/examples/if-else.md
    'at-rule-empty-line-before': ['always', {
      ignoreAtRules: ['else'],
      except: [
        'blockless-after-same-name-blockless',
        'first-nested'
      ],
      ignore: ['after-comment']
    }],
    'block-opening-brace-space-before': 'always',
    'block-closing-brace-newline-after': [
      'always', {
        ignoreAtRules: ['if', 'else']
      }
    ],
    'at-rule-name-space-after': 'always',
    'scss/at-else-closing-brace-newline-after': 'always-last-in-chain',
    'scss/at-else-closing-brace-space-after': 'always-intermediate',
    'scss/at-else-empty-line-before': 'never',
    'scss/at-if-closing-brace-newline-after': 'always-last-in-chain',
    'scss/at-if-closing-brace-space-after': 'always-intermediate',
    'no-empty-source': null
  }
}
