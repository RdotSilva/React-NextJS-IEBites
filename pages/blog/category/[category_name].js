import fs from "fs";
import path from "path";
import Layout from "@/components/Layout";
import matter from "gray-matter";
import { sortByDate } from "@/utils/index";

export default function CategoryBlogPage() {
  return <Layout>Categories</Layout>;
}

/**
 * Get category paths from markdown files
 */
export async function getStaticPaths() {
  const markdownFiles = fs.readdirSync(path.join("posts"));

  const categories = markdownFiles.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );

    const { data: frontmatter } = matter(markdownWithMeta);

    return frontmatter.category.toLowerCase();
  });

  const paths = categories.map((category) => ({
    params: { category_name: category },
  }));

  return {
    paths,
    fallback: false,
  };
}

/**
 * Fetch posts related to a specific category and return the props
 */
export async function getStaticProps({ params: { category_name } }) {
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

  // Filter posts by category
  const categoryPosts = blogPosts.filter(
    (post) => post.frontmatter.category.toLowerCase() === category_name
  );

  return {
    props: { categoryPosts: categoryPosts.sort(sortByDate).slice(0, 6) },
  };
}
