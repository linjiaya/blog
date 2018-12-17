import quicklink from 'quicklink'
// 预先加载资源

// TODO: quicklink 正在完善，need IntersectionObserver 的拓展https://github.com/GoogleChromeLabs/quicklink/issues/47
// as shown below
// const observer = new IntersectionObserver(entries => {
//   // do something
// }

// observer.observe(target, {
//   subtree: true,
//   childList: true
// })

const prefetch = (el = document.body) => {
  quicklink({
    el,
    priority: false,
    origins: [location.hostname],
    // TODO: add more rules
    ignores: [
      (uri, node) => {
        return Boolean(node.hash) || node.hasAttribute('noprefetch') || node.href === `${location.origin}/`
      },
      uri => uri.includes('.zip')
    ]
  })
}
export default prefetch
