const initialState = {
  id: 0,
  auth: false,
  name: '',
  img: '',
  shortDescription: '',
  role: '',
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_DATA':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default user;
