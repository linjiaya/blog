module.exports = (options, ctx) => {
  return {
    // Add description
    extendPageData(page) {
      const {
        _strippedContent,
        frontmatter
      } = page
      if (_strippedContent) {
        // Compute the description
        if (!frontmatter.description) {
          frontmatter.description = _strippedContent.slice(0, 60) + ' ...'
        }
        // Compute the pageSize & readTime
        const temp = _strippedContent.match(/([a-zA-z0-9])+\b|[\u4e00-\u9fa5]/g)
        const pageSize = temp ? temp.length : 0
        if (frontmatter.pageSize === undefined) {
          frontmatter.pageSize = pageSize
        }
        if (frontmatter.readTime === undefined) {
          frontmatter.readTime = Math.ceil(pageSize / 300)
        }
      }
    }
  }
}
