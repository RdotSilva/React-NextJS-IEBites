import Link from "next/link";

/**
 * Component used to group and color labels based on category
 */
export default function CategoryLabel({ children }) {
  // Set a color key to use in the Tailwind class below
  const colorKey = {
    food: "yellow",
    drink: "blue",
    music: "green",
    shopping: "purple",
    other: "red",
  };

  return (
    <div
      className={`px-2 py-1 bg-${colorKey[children]}-600 text-gray-100 font-bold rounded`}
    >
      <Link href={`/blog/category/${children.toLowerCase()}`}>{children}</Link>
    </div>
  );
}
