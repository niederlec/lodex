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
    addFieldToResource,
    isSaving,
    NEW_RESOURCE_FIELD_FORM_NAME,
    getNewResourceFieldFormData,
} from './';
import {
    getCollectionFields,
    getFieldToAdd,
} from '../publication';
import Card from '../lib/Card';
import FormTextField from '../lib/FormTextField';
import Alert from '../lib/Alert';
import ButtonWithStatus from '../lib/ButtonWithStatus';
import { polyglot as polyglotPropTypes } from '../lib/propTypes';
import Property from '../lib/Property';
import SelectFieldToAdd from './SelectFieldToAdd';

export const AddFieldDetailComponent = ({
    resource,
    fields,
    saving,
    error,
    fieldToAdd,
    handleSubmit,
    p: polyglot,
}) => (
    <Card className="hide-detail">
        <CardText>
            {fields.map(({ name, scheme }) => (
                <Property name={name} scheme={scheme} value={resource[name]} />
            ))}
        </CardText>
        <CardHeader title={polyglot.t('add_field_to_resource')} />
        <CardText>
            <form id="add_field_resource_form" onSubmit={() => handleSubmit(resource.uri)}>
                {error && <Alert><p>{error}</p></Alert>}
                <div>
                    {polyglot.t('about_you')}
                    <CardText>
                        <Field
                            name="contributor.name"
                            component={FormTextField}
                            label={polyglot.t('contributorName')}
                            fullWidth
                        />
                        <Field
                            name="contributor.mail"
                            component={FormTextField}
                            label={polyglot.t('contributorMail')}
                            fullWidth
                        />
                    </CardText>
                </div>
                <div>
                    {polyglot.t('new_field')}
                    <CardText>
                        <SelectFieldToAdd />
                        {
                            fieldToAdd ?
                                <div>
                                    <Field
                                        name="field.name"
                                        disabled={fieldToAdd.name}
                                        component={FormTextField}
                                        label={polyglot.t('fieldName')}
                                        fullWidth
                                    />
                                    <Field
                                        name="field.label"
                                        disabled={fieldToAdd.name}
                                        component={FormTextField}
                                        label={polyglot.t('fieldLabel')}
                                        fullWidth
                                    />
                                    <Field
                                        name="field.value"
                                        disabled={fieldToAdd.name}
                                        component={FormTextField}
                                        label={polyglot.t('fieldValue')}
                                        fullWidth
                                    />
                                    <Field
                                        name="field.scheme"
                                        disabled={fieldToAdd.name}
                                        component={FormTextField}
                                        label={polyglot.t('fieldScheme')}
                                        fullWidth
                                    />
                                </div>
                            : null
                        }
                    </CardText>
                </div>
            </form>
        </CardText>
        <CardActions>
            <ButtonWithStatus
                className="hide-resource"
                label={polyglot.t('add_field')}
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

AddFieldDetailComponent.defaultProps = {
    resource: null,
    error: null,
    saving: false,
};

AddFieldDetailComponent.propTypes = {
    ...reduxFormPropTypes,
    fields: PropTypes.arrayOf(PropTypes.object).isRequired,
    saving: PropTypes.bool,
    p: polyglotPropTypes.isRequired,
};

const mapStateToProps = state => ({
    resource: getResourceLastVersion(state),
    fields: getCollectionFields(state),
    saving: isSaving(state),
    fieldToAdd: getFieldToAdd(state),
    initialValues: {
        ...getNewResourceFieldFormData(state),
        field: getFieldToAdd(state),
    },
});

const mapDispatchToProps = {
    handleSubmit: addFieldToResource,
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
        form: NEW_RESOURCE_FIELD_FORM_NAME,
        enableReinitialize: true,
    }),
    translate,
)(AddFieldDetailComponent);
