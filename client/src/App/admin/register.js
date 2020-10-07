import React, { Component } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import { authenticationService } from 'src/App/admin/authentication/authenticationService'

export default class RegistrationPage extends Component {
	constructor(props) {
        super(props);
        this.state={
            name:'',
            email:'',
            pswd:'',
            confirm:''
        }

        // redirect to home if already logged in
        if (authenticationService.currentUserValue) { 
            this.props.history.push('/userPanel');
        }

        this.onSubmit=this.onSubmit.bind(this);
	}

    onSubmit(setStatus){
        const user = this.state;
        setStatus();

        if (user.name && user.email && user.pswd && user.confirm && user.pswd === user.confirm){
            axios.post('/user/createUser', user, {}).then(res=> { // then print response status
                alert(res.statusText);
            }).catch(err => console.log(err)); 
        } else if (user.pswd !== user.confirm){
            alert('Passwords must match!')
        } else {
            alert('Please check that all fields are entered')
        }
    }
	
	render() {
        return (
            <div>
                <h2>Update Your Profile</h2>
                <Formik
                    initialValues={{
                        username: '',
                        email: '',
                        password: '',
                        confirm: ''
                    }}
                    validationSchema={Yup.object().shape({
                        username: Yup.string().required('Username is required'),
                        email: Yup.string().email().required('A valid email is required'),
                        password: Yup.string().required('Password is required'),
                        confirm: Yup.string().required('Please confirm your password')

                    })}
                    onSubmit={({username, email, password, confirm}, { setStatus }) => {        
                        if (username && email && password && confirm && password === confirm){
                            axios.post('/user/createUser', {name:username, email:email, password:password, confirm:confirm}, {}).then(res=> { // then print response status
                                alert(res.statusText);
                            }).catch(err => console.log(err)); 
                        } else if (password !== confirm){
                            alert('Passwords must match!')
                        } else {
                            alert('Please check that all fields are entered correctly')
                        }}
                    }
                >
                    {({ errors, status, touched, isSubmitting }) => (
                        <Form>
                            <div className="form-group">
                                <label htmlFor="username">Your Name</label>
                                <Field name="username" type="text" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
                                <ErrorMessage name="username" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                <ErrorMessage name="emaile" component="div" className="invalid-feedback" />
                            </div>                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                <ErrorMessage name="password" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirm">Confirm Password</label>
                                <Field name="confirm" type="password" className={'form-control' + (errors.confirm && touched.confirm ? ' is-invalid' : '')} />
                                <ErrorMessage name="confirm" component="div" className="invalid-feedback" />
                            </div>                            <div className="form-group">
                                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Register</button>
                                {isSubmitting &&
                                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" alt=""/>
                                }
                            </div>
                            {status &&
                                <div className={'alert alert-danger'}>{status}</div>
                            }
                        </Form>
                    )}
                </Formik>
            </div>
        )
    }
}

