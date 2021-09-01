import fs from "fs";
import path from "path";
import matter from "gray-matter";

/**
 * Handler used to parse the markdown files and filter out posts based on search criteria
 */
export default function handler(req, res) {
  let blogPosts;

  if (process.env.NODE_ENV === "production") {
    // Fetch data from the cache
    blogPosts = require("../../cache/data").posts;
  } else {
    const markdownFiles = fs.readdirSync(path.join("posts"));

    blogPosts = markdownFiles.map((filename) => {
      const slug = filename.replace(".md", "");

      const markdownWithMeta = fs.readFileSync(
        path.join("posts", filename),
        "utf-8"
      );

      const { data: frontmatter } = matter(markdownWithMeta);

      return {
        slug,
        frontmatter,
      };
    });
  }

  // Get the results from the request search query
  const results = blogPosts.filter(
    ({ frontmatter: { title, excerpt, category } }) =>
      title.toLowerCase().indexOf(req.query.q) != -1 ||
      excerpt.toLowerCase().indexOf(req.query.q) != -1 ||
      category.toLowerCase().indexOf(req.query.q) != -1
  );

  res.status(200).json(JSON.stringify({ results }));
}
