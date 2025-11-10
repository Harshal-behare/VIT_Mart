/**
 * Pagination Component
 * Handles product pagination
 */

/**
 * Paginator Class
 */
export class Paginator {
  /**
   * Creates a new paginator
   * @param {number} totalItems - Total items to paginate
   * @param {number} itemsPerPage - Items per page
   */
  constructor(totalItems, itemsPerPage = 12) {
    this.totalItems = totalItems;
    this.itemsPerPage = itemsPerPage;
    this.currentPage = 1;
  }

  /**
   * Gets total pages
   * @returns {number} Total pages
   */
  getTotalPages() {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  /**
   * Gets items for current page
   * @param {Array} items - All items
   * @returns {Array} Items for current page
   */
  getPageItems(items) {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return items.slice(start, end);
  }

  /**
   * Goes to specific page
   * @param {number} pageNumber - Page number
   * @returns {boolean} True if page is valid
   */
  goToPage(pageNumber) {
    const maxPage = this.getTotalPages();
    if (pageNumber >= 1 && pageNumber <= maxPage) {
      this.currentPage = pageNumber;
      return true;
    }
    return false;
  }

  /**
   * Goes to next page
   * @returns {boolean} True if next page exists
   */
  nextPage() {
    return this.goToPage(this.currentPage + 1);
  }

  /**
   * Goes to previous page
   * @returns {boolean} True if previous page exists
   */
  previousPage() {
    return this.goToPage(this.currentPage - 1);
  }

  /**
   * Checks if on first page
   * @returns {boolean} True if on first page
   */
  isFirstPage() {
    return this.currentPage === 1;
  }

  /**
   * Checks if on last page
   * @returns {boolean} True if on last page
   */
  isLastPage() {
    return this.currentPage === this.getTotalPages();
  }

  /**
   * Gets pagination info
   * @returns {Object} Info object
   */
  getInfo() {
    return {
      currentPage: this.currentPage,
      totalPages: this.getTotalPages(),
      totalItems: this.totalItems,
      itemsPerPage: this.itemsPerPage,
      startItem: (this.currentPage - 1) * this.itemsPerPage + 1,
      endItem: Math.min(this.currentPage * this.itemsPerPage, this.totalItems),
    };
  }
}
