module.exports = (options, ctx) => {
  return {
    // Add description
    extendPageData({
      _strippedContent,
      frontmatter
    }) {
      text = _strippedContent ? _strippedContent : '';
      frontmatter.description = frontmatter.description ? frontmatter.description : text.slice(0, 60) + '...';
    }
  }
}
