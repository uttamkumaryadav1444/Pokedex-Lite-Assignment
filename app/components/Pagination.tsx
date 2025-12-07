'use client'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <nav aria-label="Page navigation" className="d-flex justify-content-center mt-5">
      <ul className="pagination">
        {/* Previous Button */}
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            style={{ borderRadius: '8px 0 0 8px' }}
          >
            ← Prev
          </button>
        </li>

        {/* Page Numbers */}
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          const pageNum = Math.max(1, currentPage - 2) + i
          return (
            <li key={pageNum} className={`page-item ${currentPage === pageNum ? 'active' : ''}`}>
              <button
                className="page-link"
                onClick={() => onPageChange(pageNum)}
                style={{
                  backgroundColor: currentPage === pageNum ? '#3b82f6' : 'white',
                  color: currentPage === pageNum ? 'white' : '#333',
                  borderColor: '#3b82f6'
                }}
              >
                {pageNum}
              </button>
            </li>
          )
        })}

        {/* Next Button */}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{ borderRadius: '0 8px 8px 0' }}
          >
            Next →
          </button>
        </li>
      </ul>
    </nav>
  )
}