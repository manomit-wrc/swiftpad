import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import LoaderButton from '../../utils/LoaderButton';

const validate = values => {
    const errors = {}
    
    if (!values.email) {
      errors.email = 'Please enter email'
    } 
    if (!values.password) {
        errors.password = 'Please enter password'
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

class Login extends Component {

    constructor(props) {
        super(props);

        this.loadSignup = this.loadSignup.bind(this);
        this.loginSubmit = this.loginSubmit.bind(this);

        this.state = {
            isLoading: false,
            showMessage: false
        }
    }

    loadSignup() {
        this.props.history.push("/signup");
    }
    loginSubmit(e) {
        this.setState({ isLoading: true });
        this.props.login(e);
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
                        
                        <strong>Error!</strong> Email or password not found.
                    </div>
                );
            }
            
        }
        else {
            return null;
        }
    }

    render() {

        const { handleSubmit } = this.props;
        
        return(
            <div className="signin-container common-form-container text-center">
                <div className="logo">
                    <img src="/assets/images/logo-lg.png" alt="" />
                </div>
                <div className="heading">
                    <h4>
                        Secure sign in. Enter your access details below. 
                    </h4>
                </div>
                <div className="form-area">

                    <form className="" role="form" onSubmit={handleSubmit(this.loginSubmit)}>
                        {this.renderMessage()}
                        <div className="form-group form-group-default required ">
                            
                            <Field name="email" component={renderField} label="Email" type="email" placeholder="Type your email address" />
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
                        <a href="" className="forgot-pwd-anchor">Forgot password?</a>
                        <div className="divider"></div>
                        <div className="dont-label">Don’t have an account?</div>
                        <button type="button" className="btn  btn-outline-dark btn-lg btn-block" onClick={this.loadSignup}>GET STARTED</button>
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
Login = connect(mapStateToProps, { login })(reduxForm({
    form: 'login',
    validate
})(Login))

export default withRouter(Login);