/*
 * 门禁项的公共输出格式。
 *
 * check-all.mjs 逐行解析「通过/失败 <名称>」来核对跑过哪些项，所以这行格式
 * 必须处处一致。适配脚本各自只负责把工具结果映射成若干项，格式收在这一处，
 * 免得每个脚本抄一份、慢慢漂移。
 */

/** 造一个收集器：record 打一项，finish 打印汇总并按结果退出。 */
export function createChecker() {
  const results = [];
  const record = (name, ok, detail) => {
    results.push({ name, ok, detail });
    console.log(`${ok ? '通过' : '失败'}  ${name}${detail ? `  ${detail}` : ''}`);
  };
  const finish = () => {
    const failed = results.filter((entry) => !entry.ok);
    console.log('');
    console.log(
      `共 ${results.length} 项，通过 ${results.length - failed.length} 项，失败 ${failed.length} 项。`,
    );
    if (failed.length > 0) {
      console.log('');
      console.log('失败项：');
      for (const entry of failed) console.log(`  ${entry.name}  ${entry.detail ?? ''}`);
    }
    process.exit(failed.length === 0 ? 0 : 1);
  };
  return { record, finish };
}

/** 把一段工具输出压成一行，供失败项的 detail 使用。 */
export function head(text, pattern = /./, limit = 4) {
  return (text ?? '')
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && pattern.test(line))
    .slice(0, limit)
    .join('  ');
}
