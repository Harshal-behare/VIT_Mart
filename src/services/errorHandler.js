/**
 * Error Handler Service
 * Centralized error handling and user notifications
 */

import { ERROR_MESSAGES, TOAST_TYPES, TOAST_DURATION } from '../constants/ui.js';

/**
 * Error class for application errors
 */
export class AppError extends Error {
  constructor(message, code = 'UNKNOWN', originalError = null) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.originalError = originalError;
    this.timestamp = new Date();
  }
}

/**
 * Handles errors and shows user-friendly messages
 */
class ErrorHandler {
  constructor() {
    this.listeners = [];
    this.errorLog = [];
  }

  /**
   * Subscribes to error events
   * @param {Function} listener - Callback
   */
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  /**
   * Notifies listeners of error
   * @param {Error|string} error - Error to handle
   * @param {string} type - Error type
   */
  notifyListeners(error, type = TOAST_TYPES.ERROR) {
    this.listeners.forEach((listener) => {
      listener({
        message: this.getErrorMessage(error),
        type,
        error,
      });
    });
  }

  /**
   * Gets user-friendly error message
   * @param {Error|string} error - Error object or message
   * @returns {string} User-friendly message
   */
  getErrorMessage(error) {
    if (typeof error === 'string') return error;

    if (error instanceof AppError) {
      return error.message;
    }

    if (error instanceof TypeError) {
      return ERROR_MESSAGES.INVALID_INPUT;
    }

    if (error instanceof ReferenceError) {
      return ERROR_MESSAGES.GENERIC;
    }

    if (error.message === 'Failed to fetch') {
      return ERROR_MESSAGES.NETWORK_ERROR;
    }

    return ERROR_MESSAGES.GENERIC;
  }

  /**
   * Handles error with logging and notification
   * @param {Error|string} error - Error to handle
   * @param {string} context - Error context/source
   * @param {string} type - Toast type
   */
  handle(error, context = 'Unknown', type = TOAST_TYPES.ERROR) {
    const appError = error instanceof AppError
      ? error
      : new AppError(
        typeof error === 'string' ? error : error.message,
        'HANDLED_ERROR',
        error,
      );

    // Log error
    this.logError(appError, context);

    // Notify listeners
    this.notifyListeners(appError, type);

    // Return for additional handling
    return appError;
  }

  /**
   * Logs error to console and storage
   * @param {AppError} error - Error to log
   * @param {string} context - Error context
   */
  logError(error, context) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      context,
      message: error.message,
      code: error.code,
      stack: error.stack,
    };

    console.error(`[${context}]`, error);
    this.errorLog.push(logEntry);

    // Keep only last 50 errors
    if (this.errorLog.length > 50) {
      this.errorLog = this.errorLog.slice(-50);
    }
  }

  /**
   * Gets error log
   * @returns {Array} Error log entries
   */
  getErrorLog() {
    return [...this.errorLog];
  }

  /**
   * Clears error log
   */
  clearErrorLog() {
    this.errorLog = [];
  }

  /**
   * Validates operation and catches errors
   * @param {Function} fn - Function to execute
   * @param {string} context - Operation context
   * @returns {*} Function result or null on error
   */
  async tryCatch(fn, context = 'Operation') {
    try {
      return await fn();
    } catch (error) {
      this.handle(error, context);
      return null;
    }
  }

  /**
   * Validates data and throws error if invalid
   * @param {*} data - Data to validate
   * @param {Array<string>} requiredFields - Required fields
   * @param {string} context - Validation context
   * @throws {AppError} If validation fails
   */
  validateData(data, requiredFields, context = 'Validation') {
    if (!data || typeof data !== 'object') {
      throw new AppError(`Invalid data: ${context}`, 'VALIDATION_ERROR');
    }

    const missing = requiredFields.filter((field) => !(field in data));
    if (missing.length > 0) {
      throw new AppError(
        `Missing required fields: ${missing.join(', ')}`,
        'MISSING_FIELDS',
      );
    }
  }
}

// Export singleton instance
export const errorHandler = new ErrorHandler();
