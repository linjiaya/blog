---
title: use shelljs
date: 2017-11-15 23:05:24
category: Node.js
---

# shelljs

> 最近准备复习下 node,用 node 执行在命令行做的事情.顺便将以前写的文章迁移到 github.io 上.

## shelljs && child_process.exec

如果没有使用`shelljs`,可能会想到使用 node 下的子进程去做这些事情.

difference between them? 这是一个问题.后面研究下.

```js
function resolve(dir = '') {
  return path.join(__dirname, './', dir)
}

// 基础配置
const localPublicDir = 'blog' // 本工程的发布文件夹
const deployRootDirName = 'EliazTray.github.io' // 目标文件夹名称
const deployRootDir = path.join(resolve(), '..', deployRootDirName) // H:\Project\EliazTray.github.io
const deployDir = path.join(resolve(), '..', deployRootDirName, localPublicDir) // H:\Project\EliazTray.github.io\blog

if (shell.exec('hexo clean').code === 0) {
  console.log(chalk.cyan('hexo clean executed completely'))
} else {
  shell.exit(1)
}

shell.exec('hexo g', (code, stdout, stderr) => {
  if (code !== 0) {
    console.log(chalk.yellow.bold('generate resource error!'))
    console.log(
      chalk.underline.bold.red('https://hexo.io/zh-cn/docs/generating.html')
    )
    shell.exit(1)
  } else {
    if (!fs.existsSync(deployDir)) {
      fs.mkdirSync(deployDir)
    }
    // 删除目标文件夹,递归覆盖到目标文件夹下.
    rm(deployDir, err => {
      if (err) throw err
      shell.cp('-Rf', localPublicDir, deployRootDir)
    })
  }
})
```

主要流程就是根据设置的文件夹的名称.将 hexo 生成的 blog 文件夹替换掉与 hexo 同级目录 EliazTray.github.io 下的 blog 文件夹,实现每次 hexo g 时,都能更新.

至于之后 push 上 git 库的操作还没有写.没什么语法,熟练度掌握和异步同步的掌握(这个就是 js 基础了)
