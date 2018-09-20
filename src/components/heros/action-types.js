import { createActionTypes } from '../../lib/utils';

export const HEROS = createActionTypes(
  'heros',
  'REQUEST',
  'REQUEST_ALL',
  'SUCCESS',
  'FAIL',
  'CANCEL'
);
