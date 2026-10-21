/*
 * 命令行一轮的进程锁。
 *
 * 应用层的防重入（runningSince + runner 的认领）能挡住同一进程里的并发，
 * 但命令行是两个独立进程时，「读状态 → 判能否开始 → 写 running」之间有窗口：
 * 两个进程可以同时判成空闲，然后都去写平台。这里用状态文件旁的一把
 * `*.lock`（O_EXCL 创建）把这段收窄；崩溃留下的锁按 PID 是否还活着判断。
 */

import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

export class RunLockedError extends Error {}

function alive(pid: number): boolean {
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

/**
 * 取得这一轮的执行锁，返回释放函数。
 *
 * 锁里记录持有者 PID；发现同机已有活着的进程持锁就拒绝。
 * 进程已不在（崩溃、强杀）则视为残留锁，清掉重取。
 */
export function acquireRunLock(stateFile: string): () => void {
  const lockFile = `${stateFile}.lock`;
  mkdirSync(dirname(lockFile), { recursive: true });

  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      writeFileSync(lockFile, `${process.pid}\n`, { flag: 'wx', mode: 0o600 });
      let released = false;
      return () => {
        if (released) return;
        released = true;
        rmSync(lockFile, { force: true });
      };
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'EEXIST') throw error;
      const owner = Number(readFileSync(lockFile, 'utf8').trim());
      if (Number.isInteger(owner) && owner > 0 && alive(owner)) {
        throw new RunLockedError(
          `另一进程（pid ${owner}）正在执行这一轮；等它结束，或确认它已不在后删掉 ${lockFile}`,
        );
      }
      // 残留锁：持有者已经不在了
      rmSync(lockFile, { force: true });
    }
  }

  throw new RunLockedError(`没能取得执行锁：${lockFile}`);
}
