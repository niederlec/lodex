import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import translate from 'redux-polyglot/translate';
import compose from 'recompose/compose';
import isEqual from 'lodash.isequal';

import {
    field as fieldPropTypes,
    polyglot as polyglotPropTypes,
} from '../../propTypes.js';
import { fromFormat, fromResource } from '../../public/selectors';
import { fromCharacteristic } from '../../sharedSelectors';
import {
    preLoadFormatData,
    loadFormatData,
    unLoadFormatData,
} from '../../formats/reducer';
import Loading from '../../lib/components/Loading';

const styles = {
    message: {
        margin: 20,
    },
};

const getCreateUrl = url => {
    if (typeof url === 'function') {
        return url;
    }
    if (typeof url === 'string') {
        return () => url;
    }

    return ({ field, resource }) => resource[field.name];
};

export default url => FormatView => {
    const createUrl = getCreateUrl(url);

    class GraphItem extends Component {
        static propTypes = {
            field: fieldPropTypes.isRequired,
            resource: PropTypes.object.isRequired,
            preLoadFormatData: PropTypes.func.isRequired,
            unLoadFormatData: PropTypes.func.isRequired,
            loadFormatData: PropTypes.func.isRequired,
            formatData: PropTypes.any,
            isLoaded: PropTypes.bool.isRequired,
            error: PropTypes.object,
            p: polyglotPropTypes.isRequired,
        };

        loadFormatData = () => {
            const { field, loadFormatData } = this.props;

            const value = createUrl(this.props);
            if (!value) {
                return;
            }

            loadFormatData({ field, value });
        };

        componentDidMount() {
            const { field } = this.props;
            if (!field) {
                return;
            }
            this.loadFormatData();
        }
        componentWillUnmount() {
            const { field, unLoadFormatData } = this.props;
            if (!field) {
                return;
            }

            unLoadFormatData(field);
        }
        componentDidUpdate(prevProps) {
            const { field, resource } = this.props;
            if (
                !field ||
                (isEqual(field, prevProps.field) &&
                    resource[field.name] ===
                        prevProps.resource[prevProps.field.name])
            ) {
                return;
            }

            this.loadFormatData();
        }

        filterFormatData = filter => {
            const { field, loadFormatData } = this.props;
            loadFormatData({
                field,
                value: createUrl(this.props),
                filter,
            });
        };

        render() {
            const {
                loadFormatData,
                formatData,
                p: polyglot,
                field,
                isLoaded,
                error,
                ...props
            } = this.props;

            if (error) {
                return (
                    <p style={styles.message}>
                        {polyglot.t('sparql_error') /*TODO add translation */}
                    </p>
                );
            }

            if (formatData === 'no result') {
                return (
                    <p style={styles.message}>
                        {polyglot.t('sparql_data' /*TODO add translation */)}
                    </p>
                );
            }

            return (
                <div>
                    {!isLoaded && <Loading>{polyglot.t('loading')}</Loading>}
                    <FormatView
                        {...props}
                        rawData={formatData /*injection dans le props ici*/}
                    />
                </div>
            );
        }
    }

    GraphItem.WrappedComponent = FormatView;

    const mapStateToProps = (state, { field }) => ({
        resource:
            field.cover === 'dataset'
                ? fromCharacteristic.getCharacteristicsAsResource(state)
                : fromResource.getResourceLastVersion(state),
        formatData: fromFormat.getFormatData(state, field.name),
        isLoaded: field && fromFormat.isFormatDataLoaded(state, field.name),
        error: fromFormat.getFormatError(state, field.name),
    });

    const mapDispatchToProps = {
        preLoadFormatData,
        unLoadFormatData,
        loadFormatData,
    };

    return compose(connect(mapStateToProps, mapDispatchToProps), translate)(
        GraphItem,
    );
};
