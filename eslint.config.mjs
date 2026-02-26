import love from 'eslint-config-love'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginPrettier from 'eslint-plugin-prettier'

export default [
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
  {
    ...love,
    files: ['src/**/*.ts'],
    plugins: {
      ...love.plugins,
      prettier: eslintPluginPrettier,
    },
    rules: {
      ...love.rules,
      'no-magic-numbers': 'off',
      '@typescript-eslint/no-magic-numbers': 'off',
      'prettier/prettier': 'error',
    },
  },
  eslintConfigPrettier,
]
