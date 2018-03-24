import debug from 'debug-miniapp'
debug.enable('Custom-font:,Vue-lifeCycle:')
const fontdebug = debug('Custom-font:')
const vuedebug = debug('Vue-lifeCycle:')
export { vuedebug, fontdebug }
