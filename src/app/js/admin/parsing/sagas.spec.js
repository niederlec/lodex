import { call, put, select } from 'redux-saga/effects';

import fetchSaga from '../../lib/sagas/fetchSaga';

import {
    loadParsingResultError,
    loadParsingResultSuccess,
    LOAD_PARSING_RESULT,
} from './';

import { fromUser } from '../../sharedSelectors';

import { handleLoadParsingResult } from './sagas';
import { UPLOAD_SUCCESS } from '../upload';
import { delay } from 'redux-saga';

describe('parsing saga', () => {
    describe('handleLoadParsingResult', () => {
        const saga = handleLoadParsingResult({ type: LOAD_PARSING_RESULT });

        it('should select getLoadParsingResultRequest', () => {
            expect(saga.next().value).toEqual(
                select(fromUser.getLoadParsingResultRequest),
            );
        });

        it('should call fetchSaga with the request', () => {
            expect(saga.next('request').value).toEqual(
                call(fetchSaga, 'request'),
            );
        });

        it('should put loadParsingResultSuccess action', () => {
            expect(saga.next({ response: 'foo' }).value).toEqual(
                put(loadParsingResultSuccess('foo')),
            );
        });

        it('should put loadParsingResultError action with error if any', () => {
            const failedSaga = handleLoadParsingResult({
                type: LOAD_PARSING_RESULT,
            });
            failedSaga.next();
            failedSaga.next();
            expect(failedSaga.next({ error: 'foo' }).value).toEqual(
                put(loadParsingResultError('foo')),
            );
        });

        it('should add a delay if action type is UPLOAD_SUCCESS', () => {
            const saga = handleLoadParsingResult({
                type: UPLOAD_SUCCESS,
            });

            expect(saga.next().value).toEqual(
                select(fromUser.getLoadParsingResultRequest),
            );

            expect(saga.next().value).toEqual(call(delay, 2000));
        });
    });
});
