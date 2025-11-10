/**
 * Data Formatting Utilities
 * Format data for display
 */

/**
 * Formats date to readable string
 * @param {Date|number} date - Date object or timestamp
 * @returns {string} Formatted date string
 */
export function formatDate(date) {
  if (!(date instanceof Date)) {
    // eslint-disable-next-line no-param-reassign
    date = new Date(date);
  }
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Formats date and time
 * @param {Date|number} date - Date object or timestamp
 * @returns {string} Formatted date and time
 */
export function formatDateTime(date) {
  if (!(date instanceof Date)) {
    // eslint-disable-next-line no-param-reassign
    date = new Date(date);
  }
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Formats number with thousand separators
 * @param {number} num - Number to format
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted number
 */
export function formatNumber(num, decimals = 0) {
  return num.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Formats string to title case
 * @param {string} str - String to format
 * @returns {string} Title case string
 */
export function toTitleCase(str) {
  if (typeof str !== 'string') return '';
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Formats bytes to human readable size
 * @param {number} bytes - Size in bytes
 * @returns {string} Formatted file size
 */
export function formatFileSize(bytes) {
  const sizes = ['B', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 B';

  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / (1024 ** i)).toFixed(2)} ${sizes[i]}`;
}

/**
 * Truncates string to max length with ellipsis
 * @param {string} str - String to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated string
 */
export function truncateString(str, maxLength = 50) {
  if (typeof str !== 'string' || str.length <= maxLength) return str;
  return `${str.substring(0, maxLength).trim()}...`;
}

/**
 * Formats phone number
 * @param {string} phone - Phone number
 * @returns {string} Formatted phone number
 */
export function formatPhoneNumber(phone) {
  const digits = phone.replace(/\D/g, '');
  if (digits.length !== 10) return phone;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

/**
 * Capitalizes first letter of string
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
export function capitalize(str) {
  if (typeof str !== 'string' || str.length === 0) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Converts seconds to time duration string
 * @param {number} seconds - Total seconds
 * @returns {string} Formatted duration (e.g., "1h 30m")
 */
export function formatDuration(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  const parts = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);

  return parts.length > 0 ? parts.join(' ') : '0m';
}
