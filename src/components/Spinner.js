/**
 * Loading Spinner Component
 * Shows loading state to users
 */

import { createElement, setHTML } from '../utils/dom.js';

/**
 * Loading Spinner
 */
class Spinner {
  static instance = null;

  constructor() {
    this.container = null;
    this.isShowing = false;
    this.initContainer();
  }

  /**
   * Gets singleton instance
   * @returns {Spinner} Spinner instance
   */
  static getInstance() {
    if (!Spinner.instance) {
      Spinner.instance = new Spinner();
    }
    return Spinner.instance;
  }

  /**
   * Initializes spinner container
   */
  initContainer() {
    if (!this.container) {
      this.container = createElement('div', {
        classes: ['spinner-container'],
        attributes: { id: 'spinner-container' },
      });

      const style = document.createElement('style');
      style.textContent = `
        .spinner-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(255, 255, 255, 0.9);
          display: none;
          align-items: center;
          justify-content: center;
          z-index: 9998;
          backdrop-filter: blur(2px);
        }

        .spinner-container.show {
          display: flex;
        }

        .spinner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        .spinner-circle {
          width: 50px;
          height: 50px;
          border: 4px solid #f0f0f0;
          border-top: 4px solid #007bff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .spinner-text {
          font-size: 16px;
          color: #666;
          font-weight: 500;
        }

        .spinner-dots {
          display: inline-block;
          animation: dots 1.4s infinite;
        }

        @keyframes dots {
          0%, 20% { content: '.'; }
          40% { content: '..'; }
          60%, 100% { content: '...'; }
        }
      `;

      document.head.appendChild(style);
      document.body.appendChild(this.container);
    }
  }

  /**
   * Shows spinner with optional message
   * @param {string} message - Loading message
   */
  show(message = 'Loading...') {
    setHTML(this.container, `
      <div class="spinner">
        <div class="spinner-circle"></div>
        <div class="spinner-text">${message}</div>
      </div>
    `);

    this.container.classList.add('show');
    this.isShowing = true;
  }

  /**
   * Hides spinner
   */
  hide() {
    this.container.classList.remove('show');
    this.isShowing = false;
  }

  /**
   * Toggles spinner visibility
   * @param {boolean} show - Show or hide
   * @param {string} message - Loading message
   */
  toggle(show, message = 'Loading...') {
    if (show) {
      this.show(message);
    } else {
      this.hide();
    }
  }

  /**
   * Shows spinner for async operation
   * @param {Function} asyncFn - Async function to execute
   * @param {string} message - Loading message
   * @returns {Promise} Result of async function
   */
  async withSpinner(asyncFn, message = 'Loading...') {
    try {
      this.show(message);
      return await asyncFn();
    } finally {
      this.hide();
    }
  }
}

export { Spinner };
