import fs from "fs";
import path from "path";
import Layout from "../components/Layout";
import matter from "gray-matter";

export default function HomePage({ blogPosts }) {
  return (
    <Layout>
      <h1>Home Page</h1>
    </Layout>
  );
}

/**
 * Parse markdown files into blog posts objects and adds blog posts to props
 */
export async function getStaticProps() {
  const markdownFiles = fs.readdirSync(path.join("posts"));

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

  return {
    props: { blogPosts },
  };
}
