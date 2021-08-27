import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { sortByDate } from "@/utils/index";

const markdownFiles = fs.readdirSync(path.join("posts"));

/**
 * Helper function use to generate posts from markdown files
 */
export function getPosts() {
  const blogPosts = markdownFiles.map((filename) => {
    const slug = filename.replace(".md", "");
    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );

    // Parse front-matter
    const { data: frontmatter } = matter(markdownWithMeta);

    return {
      slug,
      frontmatter,
    };
  });

  return blogPosts.sort(sortByDate);
}
