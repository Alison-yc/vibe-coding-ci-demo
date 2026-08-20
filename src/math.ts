/**
 * 正常业务函数 —— 供单测与覆盖率门禁演示。
 * CI 中 Semgrep 仅扫描此文件（及未来真实业务代码）。
 */

export function add(a: number, b: number): number {
  return a + b;
}

export function clamp(value: number, min: number, max: number): number {
  if (min > max) {
    throw new RangeError('min must be less than or equal to max');
  }
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

export function parsePositiveInt(input: string): number | null {
  const trimmed = input.trim();
  if (trimmed === '') return null;

  const parsed = Number.parseInt(trimmed, 10);
  if (Number.isNaN(parsed) || parsed <= 0) return null;

  return parsed;
}
