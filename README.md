# vibe-coding-ci-demo

最小 Demo 仓库：演示 **CI + 单测覆盖率门禁 + Semgrep SAST** 完整闭环。

配套学习文档：[VIBE_CODING_CI_SAST_学习手册.md](../VIBE_CODING_CI_SAST_学习手册.md)

## 目录结构

```
vibe-coding-ci-demo/
├── .github/workflows/ci.yml   # GitHub Actions 流水线
├── .semgrep.yml               # 自定义 SAST 规则
├── src/
│   ├── math.ts                # 正常业务代码（CI 扫描 + 单测覆盖）
│   ├── math.test.ts           # Vitest 单测
│   └── bad-examples.ts        # 故意含漏洞（仅本地演示，不进 CI 扫描）
├── vitest.config.ts           # 覆盖率阈值 80% 门禁
└── package.json
```

## 快速开始

### 前置依赖

- Node.js 20+
- Yarn
- **Semgrep CLI**（二选一，不要用 `npm i semgrep`）：
  ```bash
  brew install semgrep
  # 或
  pip3 install semgrep
  ```

> **常见坑**：`npm i semgrep -g` 安装的是 npm 占位包 `semgrep@0.0.1`，**没有** `semgrep` 命令。真正的 Semgrep 是 Python/ brew 工具。

安装后验证：

```bash
semgrep --version
# 若 command not found，但 pip 已装，可临时：
export PATH="$HOME/Library/Python/3.9/bin:$PATH"
```

项目内 `yarn semgrep` 会通过 `scripts/semgrep.sh` 自动查找常见安装路径。

### 安装与运行

```bash
cd vibe-coding-ci-demo
yarn install

# 1. TypeScript 类型检查
yarn lint

# 2. 单测 + 覆盖率门禁（低于 80% 行覆盖会 fail）
yarn test:coverage

# 3. SAST 扫描（仅扫描 math.ts，必须通过）
yarn semgrep

# 4. 演示 Semgrep 如何检出漏洞（扫描 bad-examples.ts）
yarn semgrep:demo

# 5. 本地模拟完整 CI
yarn ci
```

## CI 流程说明

push 或 PR 到 `main` 时，GitHub Actions 依次执行：

```
checkout → yarn install → yarn lint → yarn test:coverage → semgrep → upload coverage artifact
```

任一步失败 → PR 显示红叉 → 若配置了 branch protection 则无法 merge。

## 实验建议

### 实验 1：触发覆盖率 fail

删除 `math.test.ts` 中某个测试用例，再运行：

```bash
yarn test:coverage
```

观察 Vitest 因阈值不达标而 exit 1。

### 实验 2：观察 Semgrep 检出

```bash
yarn semgrep:demo
```

应看到 `bad-examples.ts` 中被检出的：

- `hardcoded-api-key`（硬编码密钥）
- `dangerous-eval`（eval 调用）
- `sql-string-concat`（SQL 拼接）
- `unsafe-html-concat`（XSS 风险）

### 实验 3：写自定义 Semgrep 规则

在 `.semgrep.yml` 新增一条 rule，在 `bad-examples.ts` 加对应模式，用 `yarn semgrep:demo` 验证。

### 实验 4：推送到 GitHub

```bash
git init
git add .
git commit -m "feat: add CI coverage and semgrep demo"
gh repo create vibe-coding-ci-demo --public --source=. --push
```

开 PR 后观察 GitHub Actions checks。

## 面试话术

> 我在 Demo 仓库落地了完整 CI 闭环：TypeScript 检查、Vitest 覆盖率门禁（80% 阈值）、Semgrep SAST。本地与 CI 跑同一套 `yarn ci` 脚本。Semgrep 用 YAML 自定义规则拦截硬编码密钥和 eval；Review Agent 作为启发式补充，Semgrep 作为确定性门禁。故意漏洞文件仅用于本地演示，生产代码扫描路径与 CI 一致。

## 与 Review Agent 的关系

本 Demo 未集成 LLM Review Agent（保持最小）。Review Prompt 模板见学习手册第六章。完整流程：

```
PR → CI(lint+test+semgrep) → Review Agent 读 diff → 人工研判标红项 → merge
```

## 后续扩展

- [ ] 加 Playwright E2E（若引入 UI）
- [ ] GitHub Action 调用 LLM 做 PR Review
- [ ] Codecov 集成 diff coverage
- [ ] 引用官方 ruleset：`semgrep --config p/owasp-top-ten`
