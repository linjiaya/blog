---
title: child_process
date: 2017-11-21 09:47:48
category: Node.js
---

# child_process

> child_process 模块,主要是用于衍生一个新的子进程.同步方法阻塞事件循环.

- child_process.spawn(command[, args][, options])
- child_process.spawnSync()
- child_process.exec(command[, options][, callback])
- child_process.execSync()
- child_process.execFile(file[, args][, options][, callback])
- child_process.execFileSync()
- child_process.fork(modulePath[, args][, options])

大致就如上几个功能.从方法名可以看出一定的差异性.

child_process 在 windows 上衍生`.bat`,`.cmd`来执行.在没有终端的情况下是不能执行这些文件的.

exec 和 execFile 提供的回调函数 callback (error, stdout, stderr)形式的.

错误,标准输出流,标准错误流.

args 指代的是参数列表,比如 node xx.js --name=tom, 那么这个 args 是"-name=tom",这个字符串参数列表.

options 中是一些`cwd`,`env`之类的选项设置.see detail in [this](http://nodejs.cn/api/child_process.html#child_process_child_process_exec_command_options_callback)

具体说一下 fork. fork 用于衍生一个新的子进程,在父进程和子进程使用 icp 通道进行通信.可以通过`message`事件进行消息的传递.

**_in parent.js_**

```js
const { fork } = require('child_process')
const parent_process = fork('./child.js')
parent_process.on('message', m => {
  console.log('parent got name:' + m.name)
})

parent_process.send({
  name: 'parent',
  message: 'i am parent'
})
```

**_in child.js_**

```js
process.send({
  name: 'child',
  message: 'i am child'
})

process.on('message', m => {
  console.log('child got message:', m.message)
})
```

执行 parent.js,控制台输出什么呢?

```bash
child got message: i am parent
parent got message: child
```

在控制台输出的位置不一定是先 child 再 parent,根据文件内容而决定的输出顺序...跟事件循环机制有关.

然后最后强力推荐[shelljs](https://github.com/shelljs/shelljs)

直接使用 shelljs 模块来写命令行代码.下一篇文章就写他.

当然如果想要写`命令脚本`,强力推荐[vorpal](http://vorpal.js.org/).写起来真的是不要太简单.
