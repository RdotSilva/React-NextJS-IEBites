/**
 * Sort posts by newest date first
 * @returns
 */
export const sortByDate = (a, b) => {
  return new Date(b.frontmatter.date) - new Date(a.frontmatter.date);
};
