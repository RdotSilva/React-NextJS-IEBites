import fs from "fs";
import path from "path";
import matter from "gray-matter";

export default function PostPage() {
  return <div>Post Page</div>;
}

/**
 * Set the path based on slug in markdown file
 */
export async function getStaticPaths() {
  const markdownFiles = fs.readdirSync(path.join("posts"));

  const paths = markdownFiles.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

/**
 * Fetch post content from markdown file
 */
export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(
    path.join("posts", slug + ".md"),
    "utf-8"
  );

  const { data: frontmatter, content } = matter(markdownWithMeta);
  return {
    props: {
      frontmatter,
      content,
      slug,
    },
  };
}
