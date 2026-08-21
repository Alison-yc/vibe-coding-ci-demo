/**
 * 故意包含不安全代码模式 —— 仅用于 Semgrep 演示。
 *
 * 此文件不参与 CI 扫描（见 package.json semgrep 脚本）。
 * 本地运行 `yarn semgrep:demo` 观察 Semgrep 如何检出漏洞。
 *
 * ⚠️ 切勿将此类代码合并到生产分支。
 */

// rule: hardcoded-api-key
export const API_KEY = 'sk-live-demo-not-real-key-abc123';

// rule: dangerous-eval
export function runUserCode(userInput: string): unknown {
  return eval(userInput);
}

// rule: sql-string-concat
export function buildUnsafeQuery(userId: string): string {
  return 'SELECT * FROM users WHERE id = ' + userId;
}

// rule: innerhtml-xss (pattern for demo)
export function renderUserComment(comment: string): string {
  return `<div class="comment">${comment}</div>`;
}
