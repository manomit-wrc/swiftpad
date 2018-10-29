import React, { Component, Fragment } from 'react';
import Switch from 'react-switchery';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../../actions/auth';
import { Field, reduxForm } from 'redux-form';
import LoaderButton from '../../utils/LoaderButton';

const validate = values => {
    const errors = {}
    if(!values.first_name) {
        errors.first_name = 'Please enter first name'
    }
    if(!values.last_name) {
        errors.last_name = 'Please enter last name'
    }
    if (!values.email) {
      errors.email = 'Please enter email'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address'
    }
    if (!values.password) {
        errors.password = 'Please enter password'
    } else if (values.password.length < 6) {
        errors.password = 'Minimum be 6 characters or more'
    }
    return errors
}

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <Fragment>
        <label className="">{label}</label>
        <input {...input} type={type} className="form-control" />
        {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
    </Fragment>
    
)

class Signup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            showMessage: false
        }

        this.signupSubmit = this.signupSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated === false) {
             this.setState({ isLoading: false, showMessage: true });
        }
        else if(nextProps.auth.isAuthenticated === true) {
             this.props.history.push('/dashboard');
        }
         
    }

    renderMessage() {
        
        if(this.state.showMessage === true) {
            if(this.props.auth.isAuthenticated === false) {
                return(
                    <div className="alert alert-danger alert-dismissible fade show">
                        
                        <strong>Error!</strong>Email Id already exists. Please Login...
                    </div>
                );
            }
            
        }
        else {
            return null;
        }
    }

    signupSubmit(e) {
        this.setState({ isLoading: true });
        this.props.signup(e);
    }

    onChange(value) {
        console.log(value);
    }
    render() {
        const { handleSubmit } = this.props;
        return(
            <div className="signup-step1 common-form-container text-center">
                <div className="logo">
                    <img src="/assets/images/logo-lg.png" alt="" />
                </div>
                <div className="heading">
                    <h4>
                        Get started for free. No Credit card needed.
                    </h4>
                    <h6>
                        Getting started with swiftPAD is free, easy and takes just a minute.
                    </h6>
                </div>
                <div className="form-area">
                    <form className="" role="form" onSubmit={handleSubmit(this.signupSubmit)}>
                        {this.renderMessage()}
                        <div className="form-group form-group-default required ">
                            <Field name="first_name" component={renderField} label="First Name" type="text" />
                        </div>
                        <div className="form-group form-group-default required ">
                            <Field name="last_name" component={renderField} label="Last Name" type="text" />
                        </div>
                        <div className="form-group form-group-default required ">
                            <Field name="email" component={renderField} label="Email" type="email" />
                        </div>
                        <div className="form-group form-group-default required">
                            <Field name="password" component={renderField} label="Password" type="password" />
                        </div>
                        
                        <LoaderButton
                            type="submit"
                            isLoading={this.state.isLoading}
                            text="Continue"
                            loadingText="Loading..."
                        />
                        <div className="chked-terms">
                        
                        <Switch
                            className="switch-class"
                            onChange={this.onChange}
                            options={
                            {
                                color: '#474F79',
                                size: 'small'
                            }
                            }
                            checked
                        />
                        <span>
                            By clicked continue, I agree with Swiftpad’s terms of service
                            and Privacy Policy.
                        </span>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    };
}

Signup = connect(mapStateToProps, { signup })(reduxForm({
    form: 'signup',
    validate
})(Signup))

export default withRouter(Signup);
