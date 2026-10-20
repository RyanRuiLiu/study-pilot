# 变更记录（changesets）

发版前跑 `pnpm changeset` 选包、选版本、写一句为什么；合并后由 `pnpm changeset version`
把版本号与依赖一起抬上去。本仓库的包都是 private：版本以 `privatePackages.version` 生效，
不发布到 npm，只用于给扩展与命令行打 tag、出产物。
