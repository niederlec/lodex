import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import translate from 'redux-polyglot/translate';
import compose from 'recompose/compose';
import { polyglot as polyglotPropTypes } from '../../propTypes';
import {
    List,
    ListItemText,
    Dialog,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Link,
    ListItem,
    Box,
    Tooltip,
    DialogTitle,
    Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import enrichers from '../../../custom/enrichers/enrichers-catalog.json';
import classnames from 'classnames';
import theme from '../../theme';
import FilterIcon from '@material-ui/icons/FilterList';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';

const useStyles = makeStyles({
    item: {
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: theme.black.veryLight,
        },
        borderBottom: `1px solid ${theme.black.light}`,
    },
    selectedItem: {
        backgroundColor: theme.green.secondary,
        '&:hover': {
            backgroundColor: theme.green.primary,
        },
        '& a': {
            color: 'white',
        },
    },
    list: {
        width: 800,
        height: '70vh',
    },
});

const EnricherDescription = ({ enricher, polyglot }) => {
    return (
        <React.Fragment>
            <Typography>
                {polyglot.t(`ws_${enricher.id}_description`)}
            </Typography>
            <Box justifyContent="flex-end" display="flex">
                {enricher.objectifTDM && (
                    <Tooltip title={polyglot.t(`tooltip_objectifTDM`)}>
                        <Link
                            href={enricher.objectifTDM}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ marginRight: '1em' }}
                            onClick={e => e.stopPropagation()}
                        >
                            <MenuBookIcon />
                        </Link>
                    </Tooltip>
                )}
                {enricher.swagger && (
                    <Tooltip title={polyglot.t(`tooltip_swagger`)}>
                        <Link
                            href={enricher.swagger}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={e => e.stopPropagation()}
                        >
                            <SettingsEthernetIcon />
                        </Link>
                    </Tooltip>
                )}
            </Box>
        </React.Fragment>
    );
};

export const EnrichmentCatalog = ({
    p: polyglot,
    isOpen,
    handleClose,
    onChange,
    selectedWebServiceUrl,
}) => {
    const classes = useStyles();

    const filters = [
        ...new Set(enrichers.map(item => item.type)),
    ].sort((x, y) => polyglot.t(x).localeCompare(polyglot.t(y)));
    filters.unshift('all');

    const [filteredEnricher, setFilterEnricher] = useState(enrichers);
    const [selectedFilter, setSelectedFilter] = useState('all');

    useEffect(() => {
        setFilterEnricher(
            selectedFilter && selectedFilter !== 'all'
                ? enrichers.filter(item => item.type === selectedFilter)
                : enrichers,
        );
    }, [selectedFilter]);

    const handleValueChange = newValue => {
        onChange(newValue);
        handleClose();
    };

    return (
        <Dialog open={isOpen} onClose={handleClose} scroll="body" maxWidth="xl">
            <DialogTitle>
                <Grid
                    container={true}
                    direction="row"
                    style={{ width: '100%', marginBottom: 25 }}
                    justifyContent="space-around"
                    spacing={2}
                >
                    <Box>
                        <FilterIcon
                            fontSize="large"
                            style={{ marginRight: 10, cursor: 'pointer' }}
                        />
                    </Box>
                    {filters.map(filter => (
                        <Box key={filter}>
                            <Button
                                color="primary"
                                className="format-category"
                                onClick={() => setSelectedFilter(filter)}
                                variant={
                                    filter === selectedFilter
                                        ? 'contained'
                                        : 'outlined'
                                }
                            >
                                {polyglot.t(filter)}
                            </Button>
                        </Box>
                    ))}
                </Grid>
            </DialogTitle>
            <DialogContent>
                <List
                    component="nav"
                    aria-label="format list"
                    className={classes.list}
                >
                    {filteredEnricher.map(enricher => (
                        <ListItem
                            key={enricher.id}
                            onClick={() => handleValueChange(enricher.url)}
                            className={classnames(classes.item, {
                                [classes.selectedItem]:
                                    selectedWebServiceUrl === enricher.url,
                            })}
                        >
                            <ListItemText
                                primary={polyglot.t(`ws_${enricher.id}_title`)}
                                primaryTypographyProps={{
                                    style: { fontWeight: 'bold' },
                                }}
                                secondary={
                                    <EnricherDescription
                                        enricher={enricher}
                                        polyglot={polyglot}
                                    />
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="text"
                    key="cancel"
                    color="secondary"
                    onClick={handleClose}
                >
                    {polyglot.t('cancel')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

EnrichmentCatalog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    p: polyglotPropTypes.isRequired,
    onChange: PropTypes.func.isRequired,
    selectedWebServiceUrl: PropTypes.string,
};

EnricherDescription.propTypes = {
    enricher: PropTypes.shape({
        id: PropTypes.string.isRequired,
        doc: PropTypes.string,
        swagger: PropTypes.string,
        objectifTDM: PropTypes.string,
    }).isRequired,
    polyglot: polyglotPropTypes.isRequired,
};

export default compose(translate)(EnrichmentCatalog);
