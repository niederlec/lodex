import { take, put, select, call, takeEvery, fork } from 'redux-saga/effects';

import {
    loadMoreFailed,
    loadMoreSucceed,
    SEARCH_LOAD_MORE,
    SEARCH,
    SEARCH_SORT,
    searchFailed,
    searchSucceed,
    facetActionTypes,
    facetActions,
} from './reducer';

import { fromSearch, fromResource } from '../selectors';
import { LOAD_PUBLICATION_SUCCESS } from '../../fields';
import { LOAD_RESOURCE_SUCCESS } from '../resource';
import { fromUser, fromFields } from '../../sharedSelectors';
import fetchSaga from '../../lib/sagas/fetchSaga';
import facetSagasFactory from '../facet/sagas';

const PER_PAGE = 10;

const doSearchRequest = function*(page = 0) {
    const query = yield select(fromSearch.getQuery);
    const sort = yield select(fromSearch.getSort);
    const facets = yield select(fromSearch.getAppliedFacets);
    const invertedFacets = yield select(fromSearch.getInvertedFacetKeys);

    const request = yield select(fromUser.getLoadDatasetPageRequest, {
        match: query || '',
        sort,
        perPage: PER_PAGE,
        page,
        facets,
        invertedFacets,
    });

    return yield call(fetchSaga, request);
};

const handleSearch = function*() {
    const fieldsNumber = yield select(fromFields.getNbColumns);

    if (fieldsNumber === 0) {
        // Fields aren't loaded yet. Wait for them.
        yield take(LOAD_PUBLICATION_SUCCESS);
    }

    const { error, response } = yield doSearchRequest();

    if (error) {
        yield put(searchFailed({ error }));
        return;
    }

    const fields = {
        uri: 'uri',
        title: yield select(fromFields.getResourceTitleFieldName),
        description: yield select(fromFields.getResourceDescriptionFieldName),
        detail1: yield select(fromFields.getResourceDetail1FieldName),
        detail2: yield select(fromFields.getResourceDetail2FieldName),
    };

    yield put(
        searchSucceed({
            dataset: response.data,
            fields,
            total: response.total,
            fullTotal: response.fullTotal,
        }),
    );
};

const handleLoadMore = function*() {
    const currentPage = yield select(fromSearch.getPage);
    const page = currentPage + 1;

    const { error, response } = yield doSearchRequest(page);

    if (error) {
        yield put(loadMoreFailed({ error }));
        return;
    }

    yield put(
        loadMoreSucceed({
            dataset: response.data,
            page,
            total: response.total,
        }),
    );
};

const handleLoadNextResource = function*() {
    const total = yield select(fromSearch.getTotal);
    const results = yield select(fromSearch.getDataset);

    if (results.length >= total) {
        return;
    }

    const currentResource = yield select(fromResource.getResourceLastVersion);
    const indexCurrentResource = results.findIndex(
        resource => resource.uri === currentResource?.uri,
    );

    if (indexCurrentResource < results.length - 1) {
        return;
    }
    yield handleLoadMore();
};

const facetSagas = facetSagasFactory({
    actionTypes: facetActionTypes,
    actions: facetActions,
    selectors: fromSearch,
});

export default function*() {
    yield takeEvery(
        [
            SEARCH,
            SEARCH_SORT,
            facetActionTypes.TOGGLE_FACET_VALUE,
            facetActionTypes.INVERT_FACET,
            facetActionTypes.CLEAR_FACET,
            facetActionTypes.SET_FACETS,
        ],
        handleSearch,
    );
    yield takeEvery([SEARCH_LOAD_MORE], handleLoadMore);
    yield takeEvery([LOAD_RESOURCE_SUCCESS], handleLoadNextResource);
    yield fork(facetSagas);
}
