import cookie from 'cookie';

/**
 * Возвращает CSRF-токен
 * @returns {string} csrftoken
 */
// eslint-disable-next-line import/prefer-default-export
export const getCSRFToken = () => cookie.parse(document.cookie).csrftoken;
