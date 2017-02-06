import React, { PropTypes } from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import translate from 'redux-polyglot/translate';
import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import CircularProgress from 'material-ui/CircularProgress';
import FlatButton from 'material-ui/FlatButton';

import { polyglot as polyglotPropTypes } from './lib/propTypes';
import { isLoggedIn as getIsLoggedIn, toggleLogin as toggleLoginAction } from './user';
import LoginDialog from './user/LoginDialog';

const styles = {
    appContainer: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    bodyContainer: {
        display: 'flex',
        flex: '1',
        backgroundColor: '#edecec',
    },
    body: {
        flex: 1,
    },
    linkToHome: {
        color: 'white',
        textDecoration: 'none',
    },
    loading: {
        margin: 8,
    },
};

export const AppComponent = ({ children, isLoading, isLoggedIn, p: polyglot, toggleLogin }) => {
    const LeftElement = isLoading
        ? <CircularProgress color="#fff" size={30} thickness={2} style={styles.loading} />
        : <span />;

    const RightElement = isLoggedIn
        ? <FlatButton containerElement={<Link to="/admin" />} linkButton label={polyglot.t('Admin')} />
        : <FlatButton label={polyglot.t('Sign in')} onClick={toggleLogin} />;

    return (
        <MuiThemeProvider>
            <div style={styles.appContainer}>
                <AppBar
                    className="appbar"
                    title={<Link style={styles.linkToHome} to="/home">Lodex</Link>}
                    iconElementLeft={LeftElement}
                    iconElementRight={RightElement}
                />
                <div className="body" style={styles.bodyContainer}>
                    <div style={styles.body}>{children}</div>
                </div>
                <LoginDialog />
            </div>
        </MuiThemeProvider>
    );
};

AppComponent.propTypes = {
    children: PropTypes.node.isRequired,
    isLoading: PropTypes.bool,
    isLoggedIn: PropTypes.bool.isRequired,
    p: polyglotPropTypes.isRequired,
    toggleLogin: PropTypes.func.isRequired,
};

AppComponent.defaultProps = {
    isLoading: false,
};

const mapStateToProps = state => ({
    isLoading: state.loading,
    isLoggedIn: getIsLoggedIn(state),
});

const mapDispatchToProps = ({
    toggleLogin: toggleLoginAction,
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    translate,
)(AppComponent);
