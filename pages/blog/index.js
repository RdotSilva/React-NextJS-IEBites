import fs from "fs";
import path from "path";
import Layout from "../../components/Layout";
import matter from "gray-matter";
import Post from "../../components/Post";
import { sortByDate } from "../../utils";

/**
 * Main Blog component used to show all blog posts
 */
export default function BlogPage({ blogPosts }) {
  return (
    <Layout>
      <h1 className="text-5xl border-b-4 p-5 font-bold">Blog</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {blogPosts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>
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
    props: { blogPosts: blogPosts.sort(sortByDate) },
  };
}
