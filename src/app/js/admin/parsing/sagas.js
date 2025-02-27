import { call, fork, put, select, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import fetchSaga from '../../lib/sagas/fetchSaga';

import {
    LOAD_PARSING_RESULT,
    loadParsingResultError,
    loadParsingResultSuccess,
} from './';
import { UPLOAD_SUCCESS } from '../upload';
import { fromUser } from '../../sharedSelectors';

export function* handleLoadParsingResult(action) {
    const request = yield select(fromUser.getLoadParsingResultRequest);

    if (action.type === UPLOAD_SUCCESS) {
        // MongoDB needs extra time to save first items
        yield call(delay, 2000);
    }
    const { error, response } = yield call(fetchSaga, request);

    if (error) {
        return yield put(loadParsingResultError(error));
    }
    return yield put(loadParsingResultSuccess(response));
}

export function* watchLoadParsingResult() {
    yield takeLatest(
        [LOAD_PARSING_RESULT, UPLOAD_SUCCESS],
        handleLoadParsingResult,
    );
}

export default function*() {
    yield fork(watchLoadParsingResult);
}
