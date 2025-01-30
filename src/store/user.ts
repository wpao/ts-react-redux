
// initial state / slices
const DEFAULT_STATE: UserState = {
  username: "",
  id: "",
  role: ""
}

// reducer
export const userReducer = (state: UserState = DEFAULT_STATE, action: ReduxAction): UserState => {
  // if (action.type === "USER_LOGIN") {
  //   const dupState = { ...state };
  //   dupState.username = action.payload?.username || state.username;
  //   dupState.id = action.payload?.id || state.id;
  //   return dupState
  // }
  // return state
  switch (action.type) {
    case "USER_LOGIN":
      return {
        ...state,
        username: action.payload?.username || state.username,
        id: action.payload?.id || state.id,
        role: action.payload?.role || state.role
      };
    case "USER_LOGOUT":
      return DEFAULT_STATE
    default:
      return state;
  }
}

// types
interface UserState {
  username: string;
  id: string;
  role: string
}

interface ReduxAction {
  type: string;
  payload?: Partial<UserState>;
}