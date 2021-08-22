import fs from "fs";
import path from "path";

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
