/**
 * Устанавливает данные пользователя
 * @param {Object} payload
 * @param {string} payload.username
 * @param {string} payload.firstName
 * @param {string} payload.lastName
 * @param {string} payload.email
 */
const setUserData = payload => ({
  type: 'USER_DATA',
  payload,
});

// eslint-disable-next-line import/prefer-default-export
export { setUserData };
