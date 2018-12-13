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
        }
      }
    }
  }
}
