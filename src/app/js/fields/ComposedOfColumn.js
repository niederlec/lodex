import React from 'react';
import PropTypes from 'prop-types';
import IconDelete from '@material-ui/icons/Delete';
import translate from 'redux-polyglot/translate';

import {
    IconButton,
    MenuItem,
    Select,
    FormHelperText,
    FormControl,
} from '@material-ui/core';

import {
    polyglot as polyglotPropTypes,
    field as fieldPropTypes,
} from '../propTypes';
import FieldInternalIcon from './FieldInternalIcon';

const styles = {
    compositionContainer: {
        display: 'flex',
    },
    select: {
        flexGrow: 2,
    },
    line: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    internal: {
        display: 'flex',
        alignItems: 'center',
    },
};

const ComposedOfColumn = ({
    fields,
    column,
    index,
    handleSelectColumn,
    handleRemoveColumn,
    p: polyglot,
}) => (
    <div style={styles.compositionContainer}>
        <FormControl fullWidth>
            <Select
                onChange={e => handleSelectColumn(e.target.value)}
                style={styles.select}
                value={column}
                required
            >
                {fields.map(f => (
                    <MenuItem
                        className={`composite-field-${index}-${f.name}`}
                        key={`composite-field-${index}-${f.name}`}
                        value={f.name}
                        style={styles.line}
                    >
                        {f.label}
                        <div style={styles.internal}>
                            {f.internalScopes &&
                                f.internalScopes.map(internalScope => (
                                    <FieldInternalIcon
                                        key={internalScope}
                                        scope={internalScope}
                                    />
                                ))}
                            {f.internalName}
                        </div>
                    </MenuItem>
                ))}
            </Select>
            <FormHelperText>{polyglot.t('select_a_field')}</FormHelperText>
        </FormControl>
        {index > 1 && (
            <IconButton
                className={`btn-remove-composite-field btn-remove-composite-field-${index}`}
                onClick={handleRemoveColumn}
                title={polyglot.t('remove_composition_column')}
            >
                <IconDelete />
            </IconButton>
        )}
    </div>
);

ComposedOfColumn.propTypes = {
    column: PropTypes.string.isRequired,
    fields: PropTypes.arrayOf(fieldPropTypes).isRequired,
    handleSelectColumn: PropTypes.func.isRequired,
    handleRemoveColumn: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    p: polyglotPropTypes.isRequired,
};

ComposedOfColumn.defaultProps = {
    columns: [],
};

export default translate(ComposedOfColumn);
