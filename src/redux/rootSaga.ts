import { all, AllEffect, call, ForkEffect, spawn } from 'redux-saga/effects';
import userSagas from '@redux/ghibli/sagas';

function* rootSaga(): Generator<AllEffect<ForkEffect<void>>, any, unknown> {
  const sagas = [userSagas];

  yield all(
    sagas.map((saga) =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {
            console.error(e);
          }
        }
      }),
    ),
  );
}

export default rootSaga;
