import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import LoaderButton from '../../utils/LoaderButton';
import { insertStory, getLogout, getStories } from '../../actions/auth';
import _ from 'lodash';

const validate = values => {
    const errors = {}
    if(!values.title) {
        errors.title = 'Please enter story title'
    }
    if(!values.target_word_count) {
        errors.target_word_count = 'Please enter target word count'
    }
    else if(isNaN(values.target_word_count)) {
        errors.target_word_count = 'Target word count should be number';
    }
    return errors
}

const renderField = ({ input, placeholder,  type, meta: { touched, error, warning } }) => (
    <Fragment>
        
        <input {...input} type={type} className="form-control" placeholder={placeholder} />
        {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
    </Fragment>
    
);


class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            showMsg: false,
            storyData: null,
            monthArr : ["Jan", "Feb", "March", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
            isSubmitted: false
        }
        
    }

    componentWillMount() {
        this.props.getStories();
    }

    componentWillReceiveProps(nextProps) {
        
        if(nextProps.auth.storyData !== undefined) {
            
            this.setState({ storyData: nextProps.auth.storyData.msg });  
            if(this.state.isSubmitted) {
                setTimeout(() => {
                    this.setState({ isLoading: false, showMsg: true });
                    document.getElementById("hidePopupBtn").click();
                }, 1500);
                
                
            }
        }
        
        
    }

    storySubmit = (e) => {
        let storyData = {};
        storyData.type = 'story';
        storyData.meta = {
            title : e.title,
            target_word_count: e.target_word_count
        }
       
        this.props.insertStory(storyData);
        this.setState({ isLoading: true, isSubmitted: true });
        
    }

    logout = () => {
        this.props.getLogout();
    }

    renderMessage() {
        if(this.state.showMsg) {
            return (
                <div className="alert alert-success">
                    <strong>Success!</strong> Story added successfully.
                </div>
            )
        }
        else {
            return null;
        }
    }

    loadStory = (story_id) => {
        
        window.location.href = `/dashboard/story-write/${story_id}`;
    }


    render() {
        const { handleSubmit } = this.props;
        return(
            <Fragment>
                <div className="col-12 col-md-9 col-lg-10">
                        <div className="row">
                            <div className="col-12 header" data-spy="affix" data-offset-top="68">
                                <div className="row">
                                    <div className="col-lg-5 col-12">
                                        
                                    </div>
                                    <div className="col-lg-4 col-md-6">

                                    </div>
                                    <div className="col-lg-3 col-md-6">
                                        <ul className="header-user">
                                            <li><a href="#"><img className="img-fluid svg-img" src="/assets/svg/bell.svg" alt="bell"/></a></li>
                                            <li><a href="#"><img className="img-fluid svg-img" src="/assets/svg/clock.svg" alt="clock"/></a></li>
                                            <li><a href="#"><img className="img-fluid svg-img" src="/assets/svg/user.svg" alt="user"/></a></li>
                                            <li className="dropdown pull-right">
                                                <button className="profile-dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <span className="thumbnail-wrapper  circular inline sm-m-r-5"> <img src="/assets/images/user-pic.png" alt="" data-src="/assets/images/user-pic.png" data-src-retina="/assets/images/user-pic.png" width="48" height="48" /> </span> </button>
                                                <div className="dropdown-menu dropdown-menu-right profile-dropdown" role="menu"> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Settings</a> <a href="#" className="dropdown-item"><i className="pg-outdent"></i> Feedback</a> <a href="#" className="dropdown-item"><i className="pg-signals"></i> Help</a> <a href="javascript:void(0)" onClick={this.logout} className="clearfix bg-master-lighter dropdown-item"> <span className="pull-left">Logout</span> <span className="pull-right"><i className="pg-power"></i></span> </a> </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-9 outer-block storymap-wrapper dashboard-wrapper">
                                <div className="title-block clearfix">
                                    <div className="pull-left">
                                        <h1> Library </h1>
                                    </div>
                                    <div className="pull-right">
                                        <form className="navbar-form navbar-left  d-none d-md-block" >
                                            <i className="fa fa-search" aria-hidden="true"></i>
                                            <input className="form-control" placeholder="Search"  />
                                        </form>
                                    </div>
                                </div>
                                <div className="content-main">
                                    <div className="alert alert-default d-flex bordered m-b-20" role="alert">
                                        <p className="mr-auto overflow-ellipsis col-10 no-padding">
                                            <span className="color lead">Ahoy Deep!</span> Click on Demo Story for a four of Swiftpad. If you need any help getting started or have questions for us,</p>
                                            <p className="bold no-margin"><a href="#" className="color">Chat now</a>
                                            </p>
                                            <button className="close" data-dismiss="alert"></button>
                                            <div className="clearfix"></div>
                                        </div>
                                        <div className="list ">
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="scene-tile">
                                                        <a href="javascript:void(0);" className="add-dashboard-story-link color"  data-target="#modalFillIn" data-toggle="modal">
                                                            <span>+</span>
                                                            <span>Add a project</span>
                                                        </a>
                                                    </div>
                                                </div>

                                                {
                                                    _.map(this.state.storyData, (story, index) => {
                                                        let fullYear = new Date(story.created).getFullYear();
                                                        let month = this.state.monthArr[new Date(story.created).getMonth()];
                                                        let day = new Date(story.created).getDay();
                                                        let dateString = day + " " + month + "," + fullYear;
                                                        return (

                                                <div className="col-md-4" key={index}>
                                                    <div className="scene-tile" style={{cursor: 'pointer'}} onClick={() => this.loadStory(story.id)}>
                                                    <div className="lbls m-b-15">
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <div className="left">
                                                                    <span>
                                                                        {story.title}
                                                                    </span>
                                                                </div>

                                                            </div>
                                                            <div className="col-6">
                                                                <div className="right text-right">
                                                                    <img className="img-fluid svg-img" src="/assets/svg/threedots.svg" alt="threedots"/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="para-content">
                                                        <div className="large-para">
                                                            <p>
                                                                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                                            </p>
                                                        </div>
                                                        <div className="border-divider m-t-15 m-b-15"></div>
                                                    </div>
                                                    <div className="avatar-area">
                                                        <ul>
                                                            <li>
                                                                <img src="/assets/images/scene-card-avatar1.png" alt=""/>
                                                            </li>
                                                            <li>
                                                                <img src="/assets/images/scene-card-avatar2.png" alt=""/>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="border-divider m-t-15 m-b-15"></div>
                                                    <div className="para-content">
                                                        <span>
                                                            {story.target_word_count} words
                                                        </span>
                                                        <span className="color" style={{fontSize: '10px'}}>
                                                            Created: {dateString}
                                                        </span>
                                                    </div>
                                                </div>
                                                </div>
                                                        );
                                                    })
                                                }
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>

            <div className="modal fade fill-in dashboard-modal" data-backdrop="static" id="modalFillIn" tabIndex="-1" role="dialog" aria-hidden="true">
                <button id="hidePopupBtn" type="button" className="close" data-dismiss="modal" aria-hidden="true">
                    <i className="pg-close"></i>
                    <br />
                    ESC
                </button>
                <div className="modal-dialog modal-lg text-center">
                    
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="p-b-5"><span className="semi-bold">Start a new story</span></h3>
                        </div>
                        {this.renderMessage()}
                        <div className="modal-body ">
                            <div className="form-area">
                                <form className="" role="form" onSubmit={handleSubmit(this.storySubmit)}>
                                    <div className="form-group">
                                        
                                        <Field name="title" component={renderField} placeholder="Story title" type="text" />
                                    </div>
                                    
                                   <div className="form-group">
                                        
                                        <Field name="target_word_count" component={renderField} placeholder="Target word count" type="text" />
                                   </div>
                                    <div className="row">
                                        <div className="col-md-6 mr-auto ml-auto">
                                            
                                            <LoaderButton
                                                type="submit"
                                                isLoading={this.state.isLoading}
                                                text="START WRITING"
                                                loadingText="Loading..."
                                            />
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                
                </div>
            
            </div>
        </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    };
}

Dashboard = connect(mapStateToProps, { insertStory, getLogout, getStories })(reduxForm({
    form: 'add_story',
    validate
})(Dashboard))

export default Dashboard;