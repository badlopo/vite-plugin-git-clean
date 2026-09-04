import { execSync } from 'node:child_process';
import type { Plugin } from 'vite';

/**
 * Prevents a Vite production build when the current Git worktree is dirty.
 */
export default function vitePluginGitClean(): Plugin {
  return {
    name: 'vite-plugin-git-clean',

    apply: 'build',

    buildStart(): void {
      try {
        // 检查是否在 Git 仓库中
        try {
          execSync('git rev-parse --git-dir', { stdio: 'ignore' });
        } catch {
          console.warn('[vite-plugin-git-clean] 不在 Git 仓库中，跳过检查');
          return;
        }

        const status = execSync('git status --porcelain', { encoding: 'utf-8' });

        if (status.trim().length === 0) {
          console.log('[vite-plugin-git-clean] ✅ Git 工作区干净');
          return;
        }

        console.error('[vite-plugin-git-clean] ❌ 存在未提交的变更:');
        console.error(status);

        // 直接退出进程
        process.exit(1);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error('[vite-plugin-git-clean] 检查失败:', message);
        process.exit(1);
      }
    },
  };
}
