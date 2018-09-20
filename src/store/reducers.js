import { combineReducers } from 'redux';

import { herosReducer } from '../components/heros/reducers';

export default combineReducers({
  heros: herosReducer
});
