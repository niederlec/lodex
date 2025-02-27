import React, { useContext } from 'react';
import compose from 'recompose/compose';
import translate from 'redux-polyglot/translate';
import { makeStyles } from '@material-ui/core';
import { EnrichmentContext } from './EnrichmentContext';
import EnrichmentActionButton from './EnrichmentActionButton';
import theme from '../../theme';
import EnrichmentLogs from './EnrichmentLogs';

const useStyles = makeStyles({
    sidebarContainer: {
        marginTop: -75,
        marginRight: -20,
        paddingTop: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: theme.black.lighter,
        textAlign: 'center',
        height: '100vh',
        flex: 2,
        borderLeft: `2px solid ${theme.black.light}`,
        overflow: 'auto',
    },
});

export const EnrichmentSidebarComponent = () => {
    const { isEdit } = useContext(EnrichmentContext);
    const classes = useStyles();
    return isEdit ? (
        <div className={classes.sidebarContainer}>
            <EnrichmentActionButton />
            <EnrichmentLogs />
        </div>
    ) : null;
};

EnrichmentSidebarComponent.propTypes = {};

export default compose(translate)(EnrichmentSidebarComponent);
