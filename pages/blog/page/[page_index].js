import fs from "fs";
import path from "path";
import Layout from "@/components/Layout";
import Post from "@/components/Post";
import { POSTS_PER_PAGE } from "@/config/index";
import Pagination from "@/components/Pagination";
import { getPosts } from "@/lib/posts";
import CategoryList from "@/components/CategoryList";

/**
 * Main Blog component used to show all blog posts
 */
export default function BlogPage({
  blogPosts,
  numPages,
  currentPage,
  categories,
}) {
  return (
    <Layout>
      <div className="flex justify-between flex-col md:flex-row">
        <div className="w-3/4 mr-10">
          <h1 className="text-5xl border-b-4 p-5 font-bold">Blog</h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {blogPosts.map((post, index) => (
              <Post key={index} post={post} />
            ))}
          </div>

          <Pagination currentPage={currentPage} numPages={numPages} />
        </div>

        <div className="w-1/4">
          <CategoryList categories={categories} />
        </div>
      </div>
    </Layout>
  );
}

/**
 * Generate pagination paths for blog posts based on number of files in the posts folder
 */
export async function getStaticPaths() {
  const markdownFiles = fs.readdirSync(path.join("posts"));

  const numPages = Math.ceil(markdownFiles.length / POSTS_PER_PAGE);

  let paths = [];

  for (let i = 1; i <= numPages; i++) {
    paths.push({
      params: { page_index: i.toString() },
    });
  }

  return {
    paths,
    fallback: false,
  };
}

/**
 * Parse markdown files into blog posts objects and adds blog posts to props
 */
export async function getStaticProps({ params }) {
  const markdownFiles = fs.readdirSync(path.join("posts"));
  const blogPosts = getPosts();

  // Pagination
  const page = parseInt((params && params.page_index) || 1);
  const numPages = Math.ceil(markdownFiles.length / POSTS_PER_PAGE);
  const pageIndex = page - 1;

  // Get categories for sidebar
  const categories = blogPosts.map((post) => post.frontmatter.category);
  const uniqueCategories = [...new Set(categories)];

  // Sort the posts before sending as props
  const orderedPosts = blogPosts.slice(
    pageIndex * POSTS_PER_PAGE,
    (pageIndex + 1) * POSTS_PER_PAGE
  );

  return {
    props: {
      blogPosts: orderedPosts,
      numPages,
      currentPage: page,
      categories: uniqueCategories,
    },
  };
}
