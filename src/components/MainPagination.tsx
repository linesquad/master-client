import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

interface PaginationCompProps {
  totalcount: number;
  limit: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const MainPagination: React.FC<PaginationCompProps> = ({
  totalcount,
  limit,
  currentPage,
  onPageChange,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const totalPages = Math.ceil(totalcount / limit);

  if (totalPages <= 1) return null;

  // Reduce window size on mobile
  const windowSize = isMobile ? 3 : 5;
  const halfWindow = Math.floor(windowSize / 2);

  let startPage = Math.max(currentPage - halfWindow, 1);
  let endPage = startPage + windowSize - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(endPage - windowSize + 1, 1);
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center py-6 px-4">
      <div className="flex items-center gap-1 sm:gap-2 max-w-full overflow-x-auto">
        {/* Previous Button */}
        <button
          onClick={() => {
            if (currentPage > 1) onPageChange(currentPage - 1);
          }}
          disabled={currentPage === 1}
          className="flex items-center gap-1 px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-600 transition-all duration-200 cursor-pointer whitespace-nowrap"
        >
          <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="hidden xs:inline">Previous</span>
          <span className="xs:hidden">Prev</span>
        </button>

        {/* First page + ellipsis */}
        {startPage > 1 && (
          <>
            <button
              onClick={() => {
                onPageChange(1);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="min-w-[32px] sm:min-w-[40px] h-8 sm:h-10 flex items-center justify-center text-xs sm:text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-gray-700 transition-all duration-200 cursor-pointer"
            >
              1
            </button>
            {startPage > 2 && (
              <span className="px-1 sm:px-2 text-gray-400 text-xs sm:text-sm">
                ...
              </span>
            )}
          </>
        )}

        {/* Page numbers */}
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => {
              onPageChange(page);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`
              min-w-[32px] sm:min-w-[40px] h-8 sm:h-10 flex items-center justify-center text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer
              ${
                page === currentPage
                  ? "bg-blue-600 text-white border border-blue-600 shadow-sm"
                  : "text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 hover:text-gray-700"
              }
            `}
          >
            {page}
          </button>
        ))}

        {/* Last page + ellipsis */}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <span className="px-1 sm:px-2 text-gray-400 text-xs sm:text-sm">
                ...
              </span>
            )}
            <button
              onClick={() => {
                onPageChange(totalPages);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="min-w-[32px] sm:min-w-[40px] h-8 sm:h-10 flex items-center justify-center text-xs sm:text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-gray-700 transition-all duration-200 cursor-pointer"
            >
              {totalPages}
            </button>
          </>
        )}

        {/* Next Button */}
        <button
          onClick={() => {
            if (currentPage < totalPages) {
              onPageChange(currentPage + 1);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          disabled={currentPage === totalPages}
          className="flex items-center gap-1 px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-600 transition-all duration-200 cursor-pointer whitespace-nowrap"
        >
          <span className="hidden xs:inline">Next</span>
          <span className="xs:hidden">Next</span>
          <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
        </button>
      </div>
    </div>
  );
};

export default MainPagination;
