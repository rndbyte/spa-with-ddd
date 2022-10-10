import * as React from 'react';
import { Main } from '@src/app/pages/Main';
import { Login } from '@src/app/pages/Login';
import { NotFound } from '@src/app/pages/NotFound';

export type Route = {
    path: string;
    exact: boolean;
    component: (props: any) => JSX.Element;
};

export const routes: Route[] = [
    {
        path: '/',
        exact: true,
        component: Main,
    },
    {
        path: '/login',
        exact: true,
        component: Login,
    },
    {
        path: '/*',
        exact: false,
        component: NotFound,
    },
];
