
// initial state / slices
const DEFAULT_STATE: CounterState = {
  count: 0
}

// reducer
export const counterReducer = (state: CounterState = DEFAULT_STATE, action: ReduxAction): CounterState => {
  // switch (action.type) {
  //   default:
  //     return state;
  // }
  if (action.type === "COUNTER_INCREMENT_COUNT") {
    return { ...state, count: state.count + 1 }
  }
  if (action.type === "COUNTER_DECREMENT_COUNT") {
    return { ...state, count: state.count - 1 }
  } else if (action.type === "COUNTER_SET_COUNT") {
    return { ...state, count: action.payload || state.count };
  }
  return state
}

// ============================================
// types
interface CounterState {
  count: number
}

interface ReduxAction {
  type: string;
  // payload?: Partial<CounterState>;
  payload?: number
}