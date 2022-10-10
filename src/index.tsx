import 'reflect-metadata';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './app/App';

render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('app'),
);
