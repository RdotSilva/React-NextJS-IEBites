import fs from "fs";
import path from "path";
import Layout from "@/components/Layout";
import Post from "@/components/Post";
import { POSTS_PER_PAGE } from "@/config/index";
import Pagination from "@/components/Pagination";
import { getPosts } from "@/lib/posts";

/**
 * Main Blog component used to show all blog posts
 */
export default function BlogPage({ blogPosts, numPages, currentPage }) {
  return (
    <Layout>
      <h1 className="text-5xl border-b-4 p-5 font-bold">Blog</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {blogPosts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>

      <Pagination currentPage={currentPage} numPages={numPages} />
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
  const page = parseInt((params && params.page_index) || 1);
  const markdownFiles = fs.readdirSync(path.join("posts"));
  const blogPosts = getPosts();
  const numPages = Math.ceil(markdownFiles.length / POSTS_PER_PAGE);
  const pageIndex = page - 1;

  // Sort the posts before sending as props
  const orderedPosts = blogPosts.slice(
    pageIndex * POSTS_PER_PAGE,
    (pageIndex + 1) * POSTS_PER_PAGE
  );

  return {
    props: { blogPosts: orderedPosts, numPages, currentPage: page },
  };
}
