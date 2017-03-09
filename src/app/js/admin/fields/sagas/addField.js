import { call, put, select, takeLatest } from 'redux-saga/effects';

import {
    ADD_FIELD,
    addFieldError,
    addFieldSuccess,
} from '../';

import { fromFields } from '../../selectors';

import fetchSaga from '../../../lib/fetchSaga';
import { getCreateFieldRequest } from '../../../fetch/';

export function* handleAddField({ payload: name }) {
    const index = yield select(fromFields.getNbFields);

    const newField = {
        cover: 'collection',
        label: name || `newField ${index + 1}`,
        name: name || `newField${index + 1}`,
        display_in_list: true,
        display_in_resouce: true,
        transformers: name ? [{
            operation: 'COLUMN',
            args: [{
                name: 'column',
                type: 'column',
                value: name,
            }],
        }] : [],
    };

    const request = yield select(getCreateFieldRequest, newField);
    const { error, response } = yield call(fetchSaga, request);

    if (error) {
        yield put(addFieldError(error));
    } else {
        yield put(addFieldSuccess(response));
    }
}

export default function* watchLoadField() {
    yield takeLatest([ADD_FIELD], handleAddField);
}
