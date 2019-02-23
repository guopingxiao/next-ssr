import { all } from 'redux-saga/effects';
import userSagas from './user/index';

// https://juejin.im/post/5ad83a70f265da503825b2b4
export default function* rootSagas() {
  yield all([
    ...userSagas
  ]);
}
