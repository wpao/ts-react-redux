
// initial state / slices
const DEFAULT_STATE: UserState = {
  username: "user", 
  email: "user@gmail.com",
  id: 10
}

// reducer
export const userReducer = (state: UserState = DEFAULT_STATE, action: ReduxAction): UserState => {
  switch (action.type) {
    default:
      return state;
  }
}

// types
interface UserState {
  username: string;
  email: string;
  id: number;
}

interface ReduxAction {
  type: string;
  payload?: Partial<UserState>;
}