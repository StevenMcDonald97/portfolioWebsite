import React, { Component } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { authenticationService } from 'src/App/admin/authentication/authenticationService'

export default class LoginPage extends Component {
	constructor(props) {
        super(props);

        // redirect to userpanel if already logged in
        if (authenticationService.currentUserValue) { 
            this.props.history.push('/userPanel');
        }
        this.onSubmit=this.onSubmit.bind(this);

	}

    onSubmit(email, password, setStatus, setSubmitting){
        authenticationService.login(email, password, ()=> this.props.history.push('/userPanel'));
    }
	
	render() {
        return (
            <div className="pageEditor">
                <div className="loginPage">
                    <h2>Login</h2>
                    <Formik
                        initialValues={{
                            email: '',
                            password: ''
                        }}
                        validationSchema={Yup.object().shape({
                            email: Yup.string().required('Email is required'),
                            password: Yup.string().required('Password is required')
                        })}
                        onSubmit={({ email, password }, { setStatus, setSubmitting }) => {
                            this.onSubmit(email, password, setStatus, setSubmitting);
                        }}
                        
                    >
                        {({ errors, status, touched, isSubmitting }) => (
                            <Form className="loginForm">
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <Field name="email" type="text" className={'loginInput form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                    <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <Field name="password" type="password" className={'loginInput form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                    <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary loginInput" disabled={isSubmitting}>Login</button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        )
    }
}
