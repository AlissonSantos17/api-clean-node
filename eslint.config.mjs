import love from 'eslint-config-love'

export default [
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
  {
    ...love,
    files: ['src/**/*.ts'],
  },
]
