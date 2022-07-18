
const initialState = {
  userInfo:JSON.parse(localStorage.getItem('userinfo')),
  userToken: localStorage.getItem('token')
};

export const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, userToken: action.payload?.token, userInfo: action.payload.user }
    default:
      return state;
  }
};
