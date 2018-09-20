import { ofType } from 'redux-observable';
import { mergeMap, map, mapTo, tap } from 'rxjs/operators';
import { navigate } from '@reach/router';
import { ajax } from 'rxjs/ajax';
import { HEROS } from './action-types';

const fetchHero = payload => ajax.getJSON(`/api/characters/${payload}`);

const herosFullfilled = (payload, { redirect }) => ({
  type: HEROS.SUCCESS,
  key: Array.isArray(payload) ? 'allHeros' : 'hero',
  payload,
  redirect
});

const fetchHeroEpic = action$ =>
  action$.pipe(
    ofType(HEROS.REQUEST),
    mergeMap(action =>
      fetchHero(action.payload).pipe(
        map(response => herosFullfilled(response, action)),
        tap(({ payload, redirect }) => {
          // as this doesn't return an observable or a value typically,
          // it can be used to trigger other side effecgts,
          // in this case its a redirect, can also be achieved with mapTo
          // but that would likely entail adding more fetch functions and I tried
          // to wrap everything in a single call.
          if (redirect) {
            return mapTo(navigate(`/heros/${payload.id}`));
          }
        })
      )
    )
  );

export { fetchHeroEpic };
