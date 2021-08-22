import { takeLatest } from 'redux-saga/effects';

function* someFunction(params) {
  try {
  } catch (e) {}
}

export function* someWatcher() {
  yield takeLatest('action', someFunction);
}
