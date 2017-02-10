import React, { PropTypes } from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import translate from 'redux-polyglot/translate';
import { Field, reduxForm, propTypes as reduxFormPropTypes } from 'redux-form';
import { CardText, CardHeader, CardActions } from 'material-ui/Card';
import { Link } from 'react-router';
import FlatButton from 'material-ui/FlatButton';

import {
    getResourceLastVersion,
    hideResource,
    isSaving,
    HIDE_RESOURCE_FORM_NAME,
} from './';
import { getCollectionFields } from '../publication';
import Card from '../lib/Card';
import FormTextField from '../lib/FormTextField';
import Alert from '../lib/Alert';
import ButtonWithStatus from '../lib/ButtonWithStatus';
import { polyglot as polyglotPropTypes } from '../lib/propTypes';
import Property from '../lib/Property';

export const HideDetailComponent = ({ resource, fields, saving, error, handleSubmit, p: polyglot }) => (
    <Card className="hide-detail">
        <CardHeader title={polyglot.t('remove_resource')} />
        <CardText>
            {fields.map(({ name, scheme }) => (
                <Property name={name} scheme={scheme} value={resource[name]} />
            ))}
        </CardText>
        <CardText>
            <form id="hide_resource_form" onSubmit={() => handleSubmit(resource.uri)}>
                {error && <Alert><p>{error}</p></Alert>}
                <Field
                    name="reason"
                    component={FormTextField}
                    label={polyglot.t('reason')}
                    fullWidth
                    multiLine
                />
            </form>
        </CardText>
        <CardActions>
            <ButtonWithStatus
                className="hide-resource"
                label={polyglot.t('hide')}
                primary
                loading={saving}
                onTouchTap={() => handleSubmit(resource.uri)}
            />
            <Link to={{ pathname: '/resource', query: { uri: resource.uri } }}>
                <FlatButton label={'Cancel'} secondary />
            </Link>
        </CardActions>
    </Card>
);

HideDetailComponent.defaultProps = {
    resource: null,
    error: null,
    saving: false,
};

HideDetailComponent.propTypes = {
    ...reduxFormPropTypes,
    fields: PropTypes.arrayOf(PropTypes.object).isRequired,
    saving: PropTypes.bool,
    p: polyglotPropTypes.isRequired,
};

const mapStateToProps = state => ({
    initialValues: getResourceLastVersion(state),
    resource: getResourceLastVersion(state),
    fields: getCollectionFields(state),
    saving: isSaving(state),
});

const mapDispatchToProps = {
    handleSubmit: hideResource,
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
        form: HIDE_RESOURCE_FORM_NAME,
    }),
    translate,
)(HideDetailComponent);
