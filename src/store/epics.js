import { combineEpics } from 'redux-observable';
import { fetchHeroEpic } from '../components/heros/epics';

export default combineEpics(fetchHeroEpic);
