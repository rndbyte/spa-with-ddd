import { hot } from 'react-hot-loader/root'
import React, { useEffect } from 'react';
import { Provider }  from 'react-redux';
import { Context } from '@redtea/react-inversify';
import { Switch, Route, useHistory } from 'react-router-dom';

import { routes } from './plugins/router';
import { container } from '@src/inversify.config';
import { store } from '@src/app/plugins/redux/store';
import { setUser } from '@src/app/plugins/redux/actions';
import { GetUserDataUseCase, GetUserDataUseCaseSymbol } from '@src/domains/user/ports/in/get-user-data.use-case';

import './theme.css';

const App: React.FC = () => {
    const history = useHistory();
    const state = store.getState();
    const userService = container.get<GetUserDataUseCase>(GetUserDataUseCaseSymbol);

    useEffect(() => {
        if (state.user) {
            history.push('/');
        }

        if (state.user === null) {
            userService.getUserData().then(userEntity => {
                store.dispatch(setUser(userEntity));
            }).catch(e => {
                history.push('/login');
            });
        }
    });

    return (
        <Provider store={store}>
            <Context.Provider value={container}>
                <Switch>
                    {routes.map(({ path, exact, component }) => (
                        <Route
                            key={path}
                            path={path}
                            exact={exact}
                            component={component}
                        />
                    ))}
                </Switch>
            </Context.Provider>
        </Provider>
    );
};

export default hot(App);
