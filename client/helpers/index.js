import cookie from 'cookie';

/**
 * Возвращает CSRF-токен
 * @returns {string} csrftoken
 */
export const getCSRFToken = () => cookie.parse(document.cookie).csrftoken;

export const getDate = (strDate) => {
  const date = new Date(strDate);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};
