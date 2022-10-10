import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@src/app/plugins/redux/reducers';
import { setUser, setLogged } from '@src/app/plugins/redux/actions';

import './styles.css';

const mapStateToProps = (state: RootState) => {
    return {
        user: state.user,
        logged: state.logged,
    };
};

const connector = connect(mapStateToProps, {
    setUser,
    setLogged,
});

type MainProps = ConnectedProps<typeof connector>;

const MainPage: React.FC<MainProps> = ({ user }) => {
    return (
        <React.Fragment>
            <header>
                <h1>Test</h1>
            </header>

            <main className="main-root">
                <p>Welcome to main page. You are logged as {JSON.stringify(user)}</p>
            </main>

            <footer>
                <h3>React with DDD.</h3>
            </footer>
        </React.Fragment>
    );
};

export const Main = connector(MainPage);
