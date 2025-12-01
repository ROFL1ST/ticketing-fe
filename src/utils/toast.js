let toastCallback = null;

export const registerToast = (callback) => {
  toastCallback = callback;
};

export const showToast = (message, type = 'info') => {
  if (toastCallback) {
    toastCallback(message, type);
  }
};

export const toast = {
  success: (message) => showToast(message, 'success'),
  error: (message) => showToast(message, 'error'),
  info: (message) => showToast(message, 'info'),
  warning: (message) => showToast(message, 'warning'),
};