/**
 * Modal/Dialog Component
 * Reusable modal for confirmations and messages
 */

import { createElement, setHTML, addEventListener } from '../utils/dom.js';
import { ANIMATION_DURATION } from '../constants/ui.js';

/**
 * Modal Dialog System
 */
class Modal {
  /**
   * Shows confirmation dialog
   * @param {string} title - Dialog title
   * @param {string} message - Dialog message
   * @param {Object} options - Configuration options
   * @param {string} options.confirmText - Confirm button text
   * @param {string} options.cancelText - Cancel button text
   * @param {string} options.confirmClass - Confirm button class
   * @returns {Promise<boolean>} True if confirmed
   */
  static confirm(
    title,
    message,
    options = {},
  ) {
    const {
      confirmText = 'Confirm',
      cancelText = 'Cancel',
      confirmClass = 'btn-danger',
    } = options;

    return new Promise((resolve) => {
      const backdrop = createElement('div', { classes: ['modal-backdrop'] });
      const modalContainer = createElement('div', { classes: ['modal-container'] });
      const modal = createElement('div', { classes: ['modal'] });

      setHTML(modal, `
        <div class="modal-header">
          <h2>${title}</h2>
          <button class="modal-close-btn" aria-label="Close">×</button>
        </div>
        <div class="modal-body">
          <p>${message}</p>
        </div>
        <div class="modal-footer">
          <button class="modal-cancel-btn btn">${cancelText}</button>
          <button class="modal-confirm-btn btn ${confirmClass}">${confirmText}</button>
        </div>
      `);

      const style = Modal.getStyles();
      if (!document.querySelector('#modal-styles')) {
        const styleEl = document.createElement('style');
        styleEl.id = 'modal-styles';
        styleEl.textContent = style;
        document.head.appendChild(styleEl);
      }

      const closeModal = (result) => {
        backdrop.classList.add('closing');
        setTimeout(() => {
          backdrop.remove();
          resolve(result);
        }, ANIMATION_DURATION.SHORT);
      };

      addEventListener(backdrop, 'click', (e) => {
        if (e.target === backdrop) closeModal(false);
      });

      addEventListener(modal.querySelector('.modal-close-btn'), 'click', () => {
        closeModal(false);
      });

      addEventListener(modal.querySelector('.modal-cancel-btn'), 'click', () => {
        closeModal(false);
      });

      addEventListener(modal.querySelector('.modal-confirm-btn'), 'click', () => {
        closeModal(true);
      });

      modalContainer.appendChild(modal);
      backdrop.appendChild(modalContainer);
      document.body.appendChild(backdrop);

      // Trigger animation
      setTimeout(() => backdrop.classList.add('open'), 10);
    });
  }

  /**
   * Shows alert dialog
   * @param {string} title - Alert title
   * @param {string} message - Alert message
   * @param {Object} options - Configuration options
   * @returns {Promise<void>}
   */
  static alert(title, message, options = {}) {
    const { okText = 'OK' } = options;

    return new Promise((resolve) => {
      const backdrop = createElement('div', { classes: ['modal-backdrop'] });
      const modalContainer = createElement('div', { classes: ['modal-container'] });
      const modal = createElement('div', { classes: ['modal'] });

      setHTML(modal, `
        <div class="modal-header">
          <h2>${title}</h2>
        </div>
        <div class="modal-body">
          <p>${message}</p>
        </div>
        <div class="modal-footer">
          <button class="modal-ok-btn btn btn-primary">${okText}</button>
        </div>
      `);

      const closeModal = () => {
        backdrop.classList.add('closing');
        setTimeout(() => {
          backdrop.remove();
          resolve();
        }, ANIMATION_DURATION.SHORT);
      };

      addEventListener(backdrop, 'click', (e) => {
        if (e.target === backdrop) closeModal();
      });

      addEventListener(modal.querySelector('.modal-ok-btn'), 'click', closeModal);

      modalContainer.appendChild(modal);
      backdrop.appendChild(modalContainer);
      document.body.appendChild(backdrop);

      setTimeout(() => backdrop.classList.add('open'), 10);
    });
  }

  /**
   * Gets modal CSS styles
   * @returns {string} CSS styles
   * @private
   */
  static getStyles() {
    return `
      .modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        transition: background-color 0.3s ease;
      }

      .modal-backdrop.open {
        background-color: rgba(0, 0, 0, 0.5);
      }

      .modal-backdrop.closing {
        background-color: rgba(0, 0, 0, 0);
      }

      .modal-container {
        animation: modalSlideIn 0.3s ease-out;
      }

      .modal-backdrop.closing .modal-container {
        animation: modalSlideOut 0.3s ease-out;
      }

      @keyframes modalSlideIn {
        from {
          transform: scale(0.9);
          opacity: 0;
        }
        to {
          transform: scale(1);
          opacity: 1;
        }
      }

      @keyframes modalSlideOut {
        from {
          transform: scale(1);
          opacity: 1;
        }
        to {
          transform: scale(0.9);
          opacity: 0;
        }
      }

      .modal {
        background: white;
        border-radius: 8px;
        max-width: 500px;
        width: 90%;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        max-height: 80vh;
        overflow-y: auto;
      }

      .modal-header {
        padding: 24px;
        border-bottom: 1px solid #e0e0e0;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .modal-header h2 {
        margin: 0;
        font-size: 18px;
        font-weight: 500;
      }

      .modal-close-btn {
        background: none;
        border: none;
        font-size: 28px;
        cursor: pointer;
        color: #666;
        padding: 0;
        width: 28px;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: color 0.2s;
      }

      .modal-close-btn:hover {
        color: #000;
      }

      .modal-body {
        padding: 24px;
      }

      .modal-body p {
        margin: 0 0 12px 0;
        line-height: 1.6;
        color: #333;
      }

      .modal-body p:last-child {
        margin-bottom: 0;
      }

      .modal-footer {
        padding: 16px 24px;
        border-top: 1px solid #e0e0e0;
        display: flex;
        justify-content: flex-end;
        gap: 12px;
      }

      .btn {
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        transition: background-color 0.2s;
        min-width: 80px;
      }

      .btn-primary {
        background-color: #007bff;
        color: white;
      }

      .btn-primary:hover {
        background-color: #0056b3;
      }

      .btn-danger {
        background-color: #dc3545;
        color: white;
      }

      .btn-danger:hover {
        background-color: #c82333;
      }

      .btn:not(.btn-primary):not(.btn-danger) {
        background-color: #f0f0f0;
        color: #333;
      }

      .btn:not(.btn-primary):not(.btn-danger):hover {
        background-color: #e0e0e0;
      }

      @media (max-width: 600px) {
        .modal {
          width: 95%;
        }

        .modal-header {
          padding: 16px;
        }

        .modal-body {
          padding: 16px;
        }

        .modal-footer {
          padding: 12px 16px;
          flex-direction: column-reverse;
        }

        .btn {
          width: 100%;
        }
      }
    `;
  }
}

export { Modal };
