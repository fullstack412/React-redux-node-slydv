import React from 'react';
import { connect } from 'react-redux';
import AuthForm from './AuthForm';
import { auth } from '../reducer/user';

const mapLogin = () => ({
  name: 'login',
  displayName: 'Login'
});

const mapSignup = () => ({
  name: 'signup',
  displayName: 'Sign Up'
});

const mapDispatch = dispatch => ({
  handleSubmit (evt) {
    evt.preventDefault();
    const formName = evt.target.name;
    const email = evt.target.email.value;
    const password = evt.target.password.value;
    dispatch(auth(email, password, formName));
  }
});

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
