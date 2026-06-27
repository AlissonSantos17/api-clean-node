export default {
  '*.ts': [
    "eslint 'src/**' --fix",
    "pnpm run test:staged",
  ]
}
