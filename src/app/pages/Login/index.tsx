import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik, FormikHelpers } from 'formik';
import { useService } from '@redtea/react-inversify';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@src/app/plugins/redux/reducers';
import { setLogged, setUser } from '@src/app/plugins/redux/actions';
import { LoginUserUseCase, LoginUserUseCaseSymbol } from '@src/domains/user/ports/in/login-user.use-case';

import './styles.css';

const mapStateToProps = (state: RootState) => {
    return {
        logged: state.logged,
        user: state.user,
    };
};

const connector = connect(mapStateToProps, {
    setUser,
    setLogged,
});

type LoginProps = ConnectedProps<typeof connector>;

const LoginPage: React.FC<LoginProps> = ({ logged, user, setUser, setLogged }) => {
    const history = useHistory();
    const [showPassword, setShowPassword] = useState(false);
    const loginUserService = useService<LoginUserUseCase>(LoginUserUseCaseSymbol);

    const goToMainPage = () => history.push('/');

    const initialValues = {
        login: '',
        password: '',
    };

    const validation = (values: typeof initialValues) => {
        const errors: Partial<typeof values> = {};

        if (!values.login) errors.login = 'Enter login';
        if (!values.password) errors.password = 'Enter password';

        return errors;
    };

    const onLogin = async (
        values: typeof initialValues,
        { setSubmitting, setErrors }: FormikHelpers<typeof values>
    ): Promise<void> => {
        try {
            const userEntity = await loginUserService.login(values);
            setUser(userEntity);
            setLogged(true);
            goToMainPage();
        } catch (e: unknown) {
            const errorMessage = (e as Error).message;

            setErrors({
                login: errorMessage,
            });

            setSubmitting(false);
            return;
        }
    };

    const formik = useFormik({
        initialValues,
        validate: validation,
        onSubmit: onLogin,
    });

    return (
        <div className="login-root">
            <div>
                <div className="login-card">
                    <h1>SPA with DDD</h1>
                    <h3>Login</h3>
                </div>

                <div>
                    <form
                        onSubmit={formik.handleSubmit}
                        onReset={formik.handleReset}
                        className="login-form"
                    >
                        <label htmlFor="login">Login</label>
                        <input
                            id="login"
                            name="login"
                            value={formik.values.login}
                            onChange={formik.handleChange}
                        />
                        { formik.touched.login && <p className="login-error">{formik.errors.login}</p> }

                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            type={showPassword ? 'text' : 'password'}
                        />

                        <button type="button" disabled={formik.isSubmitting} onClick={() => setShowPassword(!showPassword)}>
                            { showPassword ? 'Show password' : 'Hide password' }
                        </button>
                        { formik.touched.password && <p className="login-error">{formik.errors.password}</p> }

                        <button
                            disabled={formik.isSubmitting}
                            type="submit"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export const Login = connector(LoginPage);
