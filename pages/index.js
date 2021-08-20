import fs from "fs";
import path from "path";
import Link from "next/link";
import Layout from "../components/Layout";
import matter from "gray-matter";

export default function HomePage({ blogPosts }) {
  return (
    <Layout>
      <h1 className="text-5xl border-b-4 p-5 font-bold">Latest Posts</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {blogPosts.map((post, index) => (
          <h3>{post.frontmatter.title}</h3>
        ))}
      </div>
      <Link href="/blog">
        <a className="block text-center border border-gray-500 text-gray-800 rounded-md py-4 my-5 transition duration-500 ease select-none hover:text-white hover:bg-gray-900 focus:outline-none focus:shadow-outline w-full">
          All Posts
        </a>
      </Link>
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
