import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Layout from "@/components/Layout";
import Post from "@/components/Post";
import { getPosts } from "@/lib/posts";

export default function CategoryBlogPage({ categoryPosts, categoryName }) {
  return (
    <Layout>
      <div className="flex justify-between">
        <div className="w-3/4 mr-10">
          <h1 className="text-5xl border-b-4 p-5 font-bold">
            Posts in {categoryName}
          </h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {categoryPosts.map((post, index) => (
              <Post key={index} post={post} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
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
  const blogPosts = getPosts();

  // Filter posts by category
  const categoryPosts = blogPosts.filter(
    (post) => post.frontmatter.category.toLowerCase() === category_name
  );

  return {
    props: {
      categoryPosts: categoryPosts,
      categoryName: category_name,
    },
  };
}
