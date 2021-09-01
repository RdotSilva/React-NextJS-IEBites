const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

function postData() {
  const markdownFiles = fs.readdirSync(path.join("posts"));

  const blogPosts = markdownFiles.map((filename) => {
    const slug = filename.replace(".md", "");

    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );

    const { data: frontmatter } = matter(markdownWithMeta);

    return {
      slug,
      frontmatter,
    };
  });

  // Make the blog posts available to other files
  return `export const posts = ${JSON.stringify(blogPosts)}`;
}

// Check if we already have a cache, if not create it
try {
  fs.readdirSync("cache");
} catch (error) {
  fs.mkdirSync("cache");
}

// Fetch the post data and write to cache
fs.writeFile("cache/data.js", postData(), function (err) {
  if (err) return console.log(err);
  console.log("Posts Cached...");
});
