import { HEROS } from './action-types';
const INITIAL_STATE = {
  allHeros: [],
  isLoading: false,
  allLoaded: false
};

export const herosReducer = (state = INITIAL_STATE, action) => {
  const { REQUEST, SUCCESS, FAIL } = HEROS;
  switch (action.type) {
    case REQUEST:
      return { ...state, isLoading: true };
    case SUCCESS:
      return {
        ...state,
        [action.key]: action.payload,
        isLoading: false,
        allLoaded: true
      };
    case FAIL:
      return {
        ...state,
        error: true
      };
    default: {
      return { ...state };
    }
  }
};
