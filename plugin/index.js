module.exports = (options, ctx) => {
  return {
    // Add description
    extendPageData(page) {
      const {
        _strippedContent,
        frontmatter
      } = page
      if (!frontmatter.description) {
        if (_strippedContent) {
          frontmatter.description = _strippedContent.slice(0, 60) + ' ...'
          const temp = _strippedContent.match(/([a-zA-z0-9])+\b|[\u4e00-\u9fa5]/g)
          const pageSize = temp ? temp.length : 0
          frontmatter.pageSize = pageSize
          frontmatter.readTime = Math.ceil(pageSize / 300) + '分钟'
        }
      }
    }
  }
}
