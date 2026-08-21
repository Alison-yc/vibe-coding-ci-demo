import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { add, clamp, parsePositiveInt } from '@/lib/math';

function parseNumber(value: string): number | null {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

export default function App() {
  const [addA, setAddA] = useState('2');
  const [addB, setAddB] = useState('3');
  const [addResult, setAddResult] = useState<string>('');

  const [clampValue, setClampValue] = useState('15');
  const [clampMin, setClampMin] = useState('0');
  const [clampMax, setClampMax] = useState('10');
  const [clampResult, setClampResult] = useState<string>('');

  const [parseInput, setParseInput] = useState('42');
  const [parseResult, setParseResult] = useState<string>('');

  function handleAdd() {
    const a = parseNumber(addA);
    const b = parseNumber(addB);
    if (a === null || b === null) {
      setAddResult('无效输入');
      return;
    }
    setAddResult(String(add(a, b)));
  }

  function handleClamp() {
    const value = parseNumber(clampValue);
    const min = parseNumber(clampMin);
    const max = parseNumber(clampMax);
    if (value === null || min === null || max === null) {
      setClampResult('无效输入');
      return;
    }
    try {
      setClampResult(String(clamp(value, min, max)));
    } catch {
      setClampResult('范围无效：min 不能大于 max');
    }
  }

  function handleParse() {
    const parsed = parsePositiveInt(parseInput);
    setParseResult(parsed === null ? '无效输入' : String(parsed));
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 p-6">
      <header className="space-y-2">
        <h1
          className="text-3xl font-bold tracking-tight"
          data-testid="page-title"
        >
          Number Toolkit
        </h1>
        <p className="text-sm text-muted-foreground">
          演示 React UI + math 逻辑 + Playwright E2E + CI 流水线
        </p>
      </header>

      <Card data-testid="add-card">
        <CardHeader>
          <CardTitle>加法</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="add-a">A</Label>
              <Input
                id="add-a"
                data-testid="add-a"
                type="number"
                value={addA}
                onChange={(e) => setAddA(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-b">B</Label>
              <Input
                id="add-b"
                data-testid="add-b"
                type="number"
                value={addB}
                onChange={(e) => setAddB(e.target.value)}
              />
            </div>
          </div>
          <Button data-testid="add-submit" onClick={handleAdd}>
            计算
          </Button>
          <p data-testid="add-result">结果：{addResult || '—'}</p>
        </CardContent>
      </Card>

      <Card data-testid="clamp-card">
        <CardHeader>
          <CardTitle>钳制 clamp</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="clamp-value">Value</Label>
              <Input
                id="clamp-value"
                data-testid="clamp-value"
                type="number"
                value={clampValue}
                onChange={(e) => setClampValue(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="clamp-min">Min</Label>
              <Input
                id="clamp-min"
                data-testid="clamp-min"
                type="number"
                value={clampMin}
                onChange={(e) => setClampMin(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="clamp-max">Max</Label>
              <Input
                id="clamp-max"
                data-testid="clamp-max"
                type="number"
                value={clampMax}
                onChange={(e) => setClampMax(e.target.value)}
              />
            </div>
          </div>
          <Button data-testid="clamp-submit" onClick={handleClamp}>
            计算
          </Button>
          <p data-testid="clamp-result">结果：{clampResult || '—'}</p>
        </CardContent>
      </Card>

      <Card data-testid="parse-card">
        <CardHeader>
          <CardTitle>正整数解析</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="parse-input">输入</Label>
            <Input
              id="parse-input"
              data-testid="parse-input"
              value={parseInput}
              onChange={(e) => setParseInput(e.target.value)}
            />
          </div>
          <Button data-testid="parse-submit" onClick={handleParse}>
            解析
          </Button>
          <p data-testid="parse-result">结果：{parseResult || '—'}</p>
        </CardContent>
      </Card>
    </main>
  );
}
