import React from 'react';
import { connect } from 'react-redux';
import translate from 'redux-polyglot/translate';
import compose from 'recompose/compose';

import { fromResource } from '../selectors';
import CreateResourceForm from './CreateResourceForm';
import ButtonWithDialog from '../../lib/ButtonWithDialog';
import {
    createResourceOpen,
    createResourceCancel,
    CREATE_RESOURCE_FORM_NAME,
} from './';

const mapStateToProps = (state, { p }) => ({
    open: fromResource.isCreating(state),
    saving: fromResource.isSaving(state),
    formName: CREATE_RESOURCE_FORM_NAME,
    form: <CreateResourceForm />,
    label: p.t('create_resource'),
    className: 'create-resource',
});

const mapDispatchToProps = {
    handleOpen: () => createResourceOpen(),
    handleClose: () => createResourceCancel(),
};

export default compose(
    translate,
    connect(mapStateToProps, mapDispatchToProps),
)(ButtonWithDialog);
