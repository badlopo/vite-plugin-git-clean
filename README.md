# @badlopo/vite-plugin-git-clean

A Vite plugin that prevents production builds when the current Git worktree has
uncommitted changes.

## Install

```sh
npm install --save-dev @badlopo/vite-plugin-git-clean
```

## Usage

```ts
import { defineConfig } from 'vite'
import gitClean from '@badlopo/vite-plugin-git-clean'

export default defineConfig({
  plugins: [gitClean()],
})
```

The check runs only during `vite build`. If the current directory is not inside
a Git repository, the plugin skips the check.

## License

[MIT](./LICENSE)
