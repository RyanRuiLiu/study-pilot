/* 命令行一轮的进程锁：挡住并行进程，残留锁能自愈。 */

import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { acquireRunLock, RunLockedError } from '../src/run-lock.ts';

const dirs: string[] = [];

afterEach(() => {
  for (const dir of dirs) rmSync(dir, { recursive: true, force: true });
  dirs.length = 0;
});

function stateFile(): string {
  const dir = mkdtempSync(join(tmpdir(), 'study-pilot-lock-'));
  dirs.push(dir);
  return join(dir, 'cli-state.json');
}

describe('acquireRunLock', () => {
  it('已经有活着的进程持锁：拒绝并报出持有者', () => {
    const file = stateFile();
    const release = acquireRunLock(file);
    try {
      expect(() => acquireRunLock(file)).toThrow(RunLockedError);
      expect(() => acquireRunLock(file)).toThrow(String(process.pid));
    } finally {
      release();
    }
  });

  it('释放后可以再次取得', () => {
    const file = stateFile();
    const release = acquireRunLock(file);
    release();
    const again = acquireRunLock(file);
    again();
  });

  it('残留锁（持有者已不在）自动清掉', () => {
    const file = stateFile();
    // 一个几乎不可能存活的 PID；kill(pid, 0) 会抛 ESRCH
    writeFileSync(`${file}.lock`, '2147483647\n');
    const release = acquireRunLock(file);
    release();
  });
});
