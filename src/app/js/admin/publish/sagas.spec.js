import expect from 'expect';
import { call, put, select, race, take } from 'redux-saga/effects';
import fetchSaga from '../../lib/sagas/fetchSaga';

import {
    publishError,
    publishSuccess,
    publishWarn,
    PUBLISH_CONFIRM,
    PUBLISH_CANCEL,
} from './';
import { getPublishRequest, getVerifyUriRequest } from '../../fetch/';
import { handlePublishRequest } from './sagas';

describe('publication saga', () => {
    describe('handlePublishRequest', () => {
        const saga = handlePublishRequest();

        it('should select getVerifyUriRequest', () => {
            expect(saga.next().value).toEqual(select(getVerifyUriRequest));
        });

        it('should call fetchSaga with the verify uri request', () => {
            expect(saga.next('verify uri request').value).toEqual(call(fetchSaga, 'verify uri request'));
        });

        it('should select getPublishRequest', () => {
            expect(saga.next({ response: { nbInvalidUri: 0 } }).value).toEqual(select(getPublishRequest));
        });

        it('should call fetchSaga with the request', () => {
            expect(saga.next('request').value).toEqual(call(fetchSaga, 'request'));
        });

        it('should put publishSuccess action', () => {
            expect(saga.next({}).value).toEqual(put(publishSuccess()));
        });

        it('should put publishError action with error if any', () => {
            const failedSaga = handlePublishRequest();
            failedSaga.next();
            failedSaga.next();
            failedSaga.next({ response: { nbInvalidUri: 0 } });
            failedSaga.next();
            expect(failedSaga.next({ error: 'foo' }).value)
                .toEqual(put(publishError('foo')));
        });
    });

    describe('handlePublishRequest with invalidUri canceling', () => {
        const saga = handlePublishRequest();

        it('should select getVerifyUriRequest', () => {
            expect(saga.next().value).toEqual(select(getVerifyUriRequest));
        });

        it('should call fetchSaga with the verify uri request', () => {
            expect(saga.next('verify uri request').value).toEqual(call(fetchSaga, 'verify uri request'));
        });

        it('should put publishWarn', () => {
            expect(saga.next({ response: { nbInvalidUri: 5 } }).value)
                .toEqual(put(publishWarn(5)));
        });

        it('should race PUBLISH_CONFIRM and PUBLISH_CANCEL', () => {
            expect(saga.next().value)
                .toEqual(race({
                    ok: take(PUBLISH_CONFIRM),
                    cancel: take(PUBLISH_CANCEL),
                }));
        });

        it('should end if cancel', () => {
            expect(saga.next({ cancel: true }).done)
                .toBe(true);
        });
    });

    describe('handlePublishRequest with invalidUri confirming', () => {
        const saga = handlePublishRequest();

        it('should select getVerifyUriRequest', () => {
            expect(saga.next().value).toEqual(select(getVerifyUriRequest));
        });

        it('should call fetchSaga with the verify uri request', () => {
            expect(saga.next('verify uri request').value).toEqual(call(fetchSaga, 'verify uri request'));
        });

        it('should put publishWarn', () => {
            expect(saga.next({ response: { nbInvalidUri: 5 } }).value)
                .toEqual(put(publishWarn(5)));
        });

        it('should race PUBLISH_CONFIRM and PUBLISH_CANCEL', () => {
            expect(saga.next().value)
                .toEqual(race({
                    ok: take(PUBLISH_CONFIRM),
                    cancel: take(PUBLISH_CANCEL),
                }));
        });

        it('should continue if ok', () => {
            expect(saga.next({ ok: true }).value)
                .toEqual(select(getPublishRequest));
        });
    });
});
