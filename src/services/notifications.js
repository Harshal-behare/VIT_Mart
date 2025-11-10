/**
 * Notification Service
 * Displays toast notifications and alerts to users
 */

import { TOAST_TYPES, TOAST_DURATION, ANIMATION_DURATION } from '../constants/ui.js';
import { createElement, setHTML } from '../utils/dom.js';

/**
 * Toast Notification System
 */
class NotificationService {
  constructor() {
    this.container = null;
    this.notifications = [];
    this.initContainer();
  }

  /**
   * Initializes notification container
   */
  initContainer() {
    if (!this.container) {
      this.container = createElement('div', {
        classes: ['notification-container'],
        attributes: { id: 'notification-container' },
      });

      const style = document.createElement('style');
      style.textContent = `
        .notification-container {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 9999;
          max-width: 400px;
        }

        .notification {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          margin-bottom: 10px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          animation: slideIn 0.3s ease-out;
          font-size: 14px;
          line-height: 1.5;
        }

        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideOut {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(400px);
            opacity: 0;
          }
        }

        .notification.removing {
          animation: slideOut 0.3s ease-out;
        }

        .notification.success {
          background-color: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }

        .notification.error {
          background-color: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }

        .notification.warning {
          background-color: #fff3cd;
          color: #856404;
          border: 1px solid #ffeeba;
        }

        .notification.info {
          background-color: #d1ecf1;
          color: #0c5460;
          border: 1px solid #bee5eb;
        }

        .notification-icon {
          font-size: 20px;
          flex-shrink: 0;
        }

        .notification-message {
          flex: 1;
        }

        .notification-close {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 20px;
          padding: 0;
          opacity: 0.7;
          transition: opacity 0.2s;
        }

        .notification-close:hover {
          opacity: 1;
        }

        @media (max-width: 600px) {
          .notification-container {
            left: 10px;
            right: 10px;
            max-width: none;
          }
        }
      `;

      document.head.appendChild(style);
      document.body.appendChild(this.container);
    }
  }

  /**
   * Gets icon for notification type
   * @param {string} type - Notification type
   * @returns {string} Icon HTML
   */
  getIcon(type) {
    const icons = {
      [TOAST_TYPES.SUCCESS]: '✓',
      [TOAST_TYPES.ERROR]: '✕',
      [TOAST_TYPES.WARNING]: '⚠',
      [TOAST_TYPES.INFO]: 'ℹ',
    };
    return icons[type] || '';
  }

  /**
   * Shows notification
   * @param {string} message - Notification message
   * @param {string} type - Notification type
   * @param {number} duration - Duration in milliseconds
   * @returns {number} Notification ID
   */
  show(message, type = TOAST_TYPES.INFO, duration = TOAST_DURATION) {
    const id = Date.now();
    const notification = createElement('div', {
      classes: ['notification', type],
    });

    setHTML(notification, `
      <div class="notification-icon">${this.getIcon(type)}</div>
      <div class="notification-message">${message}</div>
      <button class="notification-close" aria-label="Close">×</button>
    `);

    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => this.remove(id));

    this.container.appendChild(notification);
    this.notifications.push({ id, element: notification, timeout: null });

    // Auto-remove after duration
    if (duration > 0) {
      const timeout = setTimeout(() => this.remove(id), duration);
      const notif = this.notifications.find((n) => n.id === id);
      if (notif) notif.timeout = timeout;
    }

    return id;
  }

  /**
   * Shows success notification
   * @param {string} message - Message
   * @param {number} duration - Duration
   * @returns {number} Notification ID
   */
  success(message, duration = TOAST_DURATION) {
    return this.show(message, TOAST_TYPES.SUCCESS, duration);
  }

  /**
   * Shows error notification
   * @param {string} message - Message
   * @param {number} duration - Duration
   * @returns {number} Notification ID
   */
  error(message, duration = TOAST_DURATION) {
    return this.show(message, TOAST_TYPES.ERROR, duration);
  }

  /**
   * Shows warning notification
   * @param {string} message - Message
   * @param {number} duration - Duration
   * @returns {number} Notification ID
   */
  warning(message, duration = TOAST_DURATION) {
    return this.show(message, TOAST_TYPES.WARNING, duration);
  }

  /**
   * Shows info notification
   * @param {string} message - Message
   * @param {number} duration - Duration
   * @returns {number} Notification ID
   */
  info(message, duration = TOAST_DURATION) {
    return this.show(message, TOAST_TYPES.INFO, duration);
  }

  /**
   * Removes notification
   * @param {number} id - Notification ID
   */
  remove(id) {
    const index = this.notifications.findIndex((n) => n.id === id);
    if (index === -1) return;

    const { element, timeout } = this.notifications[index];

    if (timeout) clearTimeout(timeout);

    element.classList.add('removing');
    setTimeout(() => {
      element.remove();
      this.notifications.splice(index, 1);
    }, ANIMATION_DURATION.SHORT);
  }

  /**
   * Removes all notifications
   */
  removeAll() {
    this.notifications.forEach((notif) => {
      if (notif.timeout) clearTimeout(notif.timeout);
      notif.element.remove();
    });
    this.notifications = [];
  }
}

// Export singleton instance
export const notifications = new NotificationService();
