import { HEROS } from './action-types';

export const fetchHero = (id, redirect = false) => {
  return {
    type: HEROS.REQUEST,
    payload: id,
    redirect
  };
};

export const fetchAllHeros = () => ({
  type: HEROS.REQUEST_ALL,
  payload: 'all',
});
