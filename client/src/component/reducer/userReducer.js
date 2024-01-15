export function userReducer(state = { currentUser:null }, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, currentUser: action.payload };
    case "LOGOUT":
      return { ...state, currentUser: action.payload };
    case "UPDATE":
      return { ...state, currentUser: action.payload };
    case "DELETE":
      return { ...state, currentUser: action.payload };
    default:
      return state;
  }
}
