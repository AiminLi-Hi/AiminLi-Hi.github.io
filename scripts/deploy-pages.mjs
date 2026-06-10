import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const distDir = path.join(root, 'dist');
const deployDir = process.env.PAGES_DEPLOY_DIR || path.join(os.tmpdir(), `aimin-gh-pages-${Date.now()}`);
const userName = process.env.GIT_AUTHOR_NAME || 'github-actions-bot';
const userEmail = process.env.GIT_AUTHOR_EMAIL || 'github-actions-bot@users.noreply.github.com';

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: options.cwd || root,
    stdio: 'inherit',
    env: process.env
  });
  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(' ')} failed with exit code ${result.status}`);
  }
}

function output(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: options.cwd || root,
    encoding: 'utf8',
    env: process.env
  });
  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(' ')} failed with exit code ${result.status}`);
  }
  return result.stdout.trim();
}

function cleanup() {
  if (!fs.existsSync(deployDir)) return;
  spawnSync('git', ['worktree', 'remove', '--force', deployDir], { cwd: root, stdio: 'inherit' });
}

if (!fs.existsSync(distDir)) {
  throw new Error('dist does not exist. Run npm run build before npm run deploy:pages.');
}

cleanup();
run('git', ['fetch', 'origin', 'gh-pages']);
run('git', ['worktree', 'add', deployDir, 'origin/gh-pages']);

try {
  run('rsync', ['-a', '--delete', '--exclude', '.git', `${distDir}/`, `${deployDir}/`]);
  run('git', ['add', '-A'], { cwd: deployDir });

  const status = output('git', ['status', '--short'], { cwd: deployDir });
  if (!status) {
    console.log('No GitHub Pages changes to deploy.');
  } else {
    run('git', ['config', 'user.name', userName], { cwd: deployDir });
    run('git', ['config', 'user.email', userEmail], { cwd: deployDir });
    run('git', ['commit', '-m', 'Deploy synchronized homepage'], { cwd: deployDir });
    run('git', ['push', 'origin', 'HEAD:gh-pages'], { cwd: deployDir });
  }
} finally {
  cleanup();
}
