import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { rootReducer } from './reducers';

export const store = process.env.NODE_ENV === 'production'
    ? createStore(rootReducer)
    : createStore(rootReducer, composeWithDevTools());
