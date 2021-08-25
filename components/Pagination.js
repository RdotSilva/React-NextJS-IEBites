import Link from "next/link";

export default function Pagination({ currentPage, numPages }) {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === numPages;
  const previousPageLink = `/blog/page/${currentPage - 1}`;
  const nextPageLink = `/blog/page/${currentPage + 1}`;

  // If only one page don't show any pagination
  if (numPages === 1) {
    return <></>;
  }

  return (
    <div className="mt-6">
      <ul className="flex pl-0 list-none my-2">
        {/* Only show previous link if current page is not the first */}
        {!isFirstPage && (
          <Link href={previousPage}>
            <li className="relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-gray-800 mr-1 hover:bg-gray-200 cursor-pointer">
              Previous
            </li>
          </Link>
        )}
      </ul>
    </div>
  );
}
