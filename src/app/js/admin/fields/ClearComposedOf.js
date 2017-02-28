import React, { PropTypes } from 'react';
import translate from 'redux-polyglot/translate';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';

import { polyglot as polyglotPropTypes } from '../../propTypes';
import { clearComposedOf } from './';

export const ClearComposedOfComponent = ({ p: polyglot, onClick }) => (
    <FlatButton onClick={onClick} label={polyglot.t('remove')} />
);

ClearComposedOfComponent.propTypes = {
    p: polyglotPropTypes.isRequired,
    onClick: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
    onClick: clearComposedOf,
};

export default compose(
    translate,
    connect(null, mapDispatchToProps),
)(ClearComposedOfComponent);
