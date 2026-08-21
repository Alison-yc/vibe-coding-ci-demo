# vibe-coding-ci-demo

最小 Demo 仓库：演示 **CI + ESLint/Prettier + 单测覆盖率 + React UI + Playwright E2E + Semgrep SAST** 完整闭环。

配套学习文档：[VIBE_CODING_CI_SAST_学习手册.md](../VIBE_CODING_CI_SAST_学习手册.md)

## 目录结构

```
vibe-coding-ci-demo/
├── .github/workflows/ci.yml   # GitHub Actions 流水线
├── .semgrep.yml               # 自定义 SAST 规则
├── e2e/calculator.spec.ts     # Playwright E2E
├── src/
│   ├── lib/math.ts            # 业务逻辑 + 单测
│   ├── lib/bad-examples.ts    # Semgrep 演示（不进 CI 扫描）
│   ├── components/ui/         # shadcn 组件
│   └── App.tsx                # Number Toolkit 单页 UI
├── eslint.config.js           # ESLint flat config
├── .prettierrc                # Prettier 规则
├── playwright.config.ts
├── vite.config.ts
└── vitest.config.ts           # 覆盖率阈值 80%
```

## 快速开始

### 前置依赖

- Node.js 20+
- Yarn
- **Semgrep CLI**（不要用 `npm i semgrep`）：

  ```bash
  brew install semgrep
  # 或
  pip3 install semgrep
  ```

### 安装与运行

```bash
cd vibe-coding-ci-demo
yarn install

# 开发 UI
yarn dev

# TypeScript + ESLint
yarn lint

# 自动修复 ESLint 可修复项
yarn lint:fix

# Prettier 格式化
yarn format

# Prettier 检查（CI 用，不修改文件）
yarn format:check

# 单测 + 覆盖率门禁
yarn test:coverage

# 构建
yarn build

# E2E（需先 build，Playwright 会自动起 preview 服务）
yarn build
yarn test:e2e

# 肉眼观看 E2E（Playwright 不支持 CLI --slow-mo，用下面脚本）
yarn test:e2e:headed   # 有浏览器窗口
yarn test:e2e:slow     # 有窗口 + 每步延迟 800ms
yarn test:e2e:ui       # Playwright UI 调试面板
yarn test:e2e:debug    # 逐步暂停调试

# SAST
yarn semgrep
yarn semgrep:demo   # 扫描故意漏洞文件

# 本地模拟完整 CI
yarn ci
```

## UI 说明

单页 **Number Toolkit**（React + shadcn），三个卡片对应 `math.ts` 函数：

| 卡片       | 函数               | E2E testid                                    |
| ---------- | ------------------ | --------------------------------------------- |
| 加法       | `add`              | `add-a`, `add-b`, `add-submit`, `add-result`  |
| 钳制       | `clamp`            | `clamp-value`, `clamp-min`, `clamp-max`, ...  |
| 正整数解析 | `parsePositiveInt` | `parse-input`, `parse-submit`, `parse-result` |

## CI 流程

push 或 PR 时，GitHub Actions 依次执行：

```
lint + format:check → test:coverage → build → playwright e2e → semgrep → upload artifacts
```

失败时会上传 `coverage-report` 和 `playwright-report`。

## 实验建议

### 触发覆盖率 fail

删除 `src/lib/math.test.ts` 中某个用例，运行 `yarn test:coverage`。

### 触发 E2E fail

修改 `App.tsx` 中结果文案但不改测试，运行 `yarn test:e2e`。

### 观察 Semgrep 检出

```bash
yarn semgrep:demo
```

### 首次 E2E 需安装浏览器

```bash
npx playwright install chromium
```

## 后续扩展

- [ ] Review Agent GitHub Action
- [ ] Codecov diff coverage
- [ ] React Testing Library 集成测试
