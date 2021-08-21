import Link from "next/link";
import Image from "next/image";

export default function Post({ post }) {
  return (
    <div className="w-full px-10 py-6 bg-white rounded-log shadow-md mt-6">
      <Image
        src={post.frontmatter.cover_image}
        alt=""
        height={420}
        width={600}
        className="mb-4 rounded"
      />
      <div className="flex justify-between items-center">
        <span className="font-light text-gray-600">
          {post.frontmatter.date}
        </span>
        <div>{post.frontmatter.category}</div>
      </div>
      <div className="mt-2">
        <Link href={`/blog/${post.slug}`}>
          <a className="text-2xl text-gray-700 font-bold hover:underline">
            {post.frontmatter.title}
          </a>
        </Link>
        <p className="mt-2 text-gray-600">{post.frontmatter.excerpt}</p>
      </div>
    </div>
  );
}
