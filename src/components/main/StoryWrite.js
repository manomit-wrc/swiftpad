import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getLogout } from '../../actions/auth';

class StoryWrite extends Component {

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.state = {
            showMainModal: false
        }
    }

    logout() {
        this.props.getLogout();
        
    }

    sceneClicked = (e) => {
        const element = e.target;
        element.nextSibling.style.opacity = "1";
        element.nextSibling.value = e.target.innerHTML;
        element.style.display = "none";
        element.nextSibling.focus();
    }

    

    handleKey = (e) => {
        if(e.keyCode === 13) {
            e.target.style.opacity = "0";
            e.target.previousSibling.style.display = "block";
            e.target.previousSibling.innerHTML = e.target.value;
            
        }
    }

    openMainModal = () => {
        
        const currentState = this.state.showMainModal;
        const element = document.getElementById('right-modal1');
        if(!currentState) {
            element.classList.add("open")
        }
        else {
            element.classList.remove("open")
        }
        this.setState({ showMainModal: !currentState });
    }

    handleScene = (e) => {
      var newDiv = document.createElement('div');
      newDiv.classList.add("")
      this.props.handleScene(e, '', this.props.chapterID);
    }

    render() {
        
        return (
            <Fragment>
            <div className="col-12 col-md-9 col-lg-10">
                <div className="row">
              <div className="col-12 header" data-spy="affix" data-offset-top="68">
                <div className="row">
                  <div className="col-lg-5 col-12">
                    <button id="toggle" className="sidebar-toggle hidden d-none d-md-block" ><img className="img-fluid svg-img" src="/assets/svg/menu.svg" alt="menu"/></button>
                    <div className="arrows"> <a href="#" className="redo"><i className="fa fa-reply" aria-hidden="true"></i></a> <a href="#" className="undo"><i className="fa fa-share" aria-hidden="true"></i></a> </div>
                    <h2> <a className="ksc-modal1">{this.props.actName}</a> <span>/ First Draft</span> <span className="dropdown"><a className="dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fa fa-angle-down" aria-hidden="true"></i></a>
                      <div className="dropdown-menu dropdown-menu-right" role="menu"> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Outline</a> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Notes</a> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Versions</a>
                        <div className="dropdown-divider"></div>
                        <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Rename</a> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Archive</a> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Delete</a>
                        <div className="dropdown-divider"></div>
                        <a href="#" className="dropdown-item">+ Add to Series</a> </div>
                      </span> </h2>
                      <span className="dropdown"><a className="dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fa fa-play-circle" aria-hidden="true"></i> 2.5 Hours, 2000 words</a>
                        <div className="dropdown-menu dropdown-menu-left p-3" role="menu">
                        <table>
                          <thead>
                          <tr>
                            <th></th>
                            <th>Session</th>
                            <th>Words</th>
                          </tr>
                        </thead>
                        <tbody>
                        <tr>
                          <th>Today</th>
                          <td>2.5 hours</td>
                          <td>2000</td>
                        </tr>
                        <tr>
                          <th>This Week</th>
                          <td>12 hours</td>
                          <td>12000</td>
                        </tr>
                        <tr>
                          <th>This Month</th>
                          <td>73 hours</td>
                          <td>36000</td>
                        </tr>
                        <tr>
                          <th>Total</th>
                          <td>73 hours</td>
                          <td>36000</td>
                        </tr>
                      </tbody>
                    </table>
                    
                    <div className="dropdown-footer"><p>Goal</p>
                      <p>You haven't set a goal yet!</p>
                      <p><button className="btn col-6">SET GOAL</button></p>
                      <p>and let <a href="#">Swiftpad</a> keep you on target!</p>
                    </div>
                    
                    <div className="dropdown-divider"></div>
                    <div className="dropdown-footer">
                    <p>Goal</p>
                    <p>Total time writing <span className="float-right">75%</span></p>
                    <div className="nouislider_element bg-complete mt-2 mb-2" data-value="75"></div>
                    <p> <a href="#" className="float-right">Delete</a></p>
                  </div>
    
                </div>
              </span>
            </div>
            <div className="col-lg-4 col-md-6">
              <ul className=" header-right pull-right">
                <li><a href="#"><img className="img-fluid svg-img" src="/assets/svg/righttick.svg" alt="righttick"/> Saved</a></li>
                <li className="dropdown"> <a href="#"  className="dropdown-toggle" type="button"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" ><img className="img-fluid svg-img" src="/assets/svg/downarrow.svg" alt="downarrow"/> Writing</a>
    
                  <div className="dropdown-menu" role="menu" style={{padding: '0'}}>
                    <a className="dropdown-item dropdown-item-heading ">Writing Mode</a>  <div className="dropdown-divider"></div>
                    <a href="#" className="dropdown-item"><i className="pg-outdent"></i> Focus</a>
                    <a href="#" className="dropdown-item"><i className="pg-outdent"></i> Writing</a>
                    <a href="#" className="dropdown-item"><i className="pg-outdent"></i> Editing</a>
                  </div>
                </li>
                <li><a href="#"></a></li>
                <li><a href="#"><img className="img-fluid svg-img" src="/assets/svg/page.svg" alt="page"/></a></li>
                <li><a href="#"><img className="img-fluid svg-img" src="/assets/svg/copyicon.svg" alt="copyicon"/></a></li>
              </ul>
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
        <div className="col-12 col-lg-9 outer-block">
          <div className="block">
            <h3 className="heading">
              <ul className="option-heading">
                <li>1.0</li>
                <li><a onClick={this.openMainModal} data-toggle="quickview" data-toggle-element="#right-modal1" href="javascript:void(0)"><img className="img-fluid rotate-img svg-img" src="/assets/svg/menu.svg" alt="menu"/></a></li>
                <li><img className="img-fluid svg-img" src="/assets/svg/threedots.svg" alt="threedots"/></li>
              </ul>
            </h3>
            <div className="block active">
              <div className="inner-heading scene">
                <h4 onClick={this.sceneClicked}>{this.props.sceneName}</h4>
                <input type="text" onKeyDownCapture={this.handleKey} />
                <div className="pull-left"><span></span> <span>130 Words</span> <span className="badge">Opening Scene</span> </div>
                <div className="pull-right"> <span className="dropdown"><a className="dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fa fa-bolt" aria-hidden="true"></i> Idea</a>
                  <div className="dropdown-menu dropdown-menu-right" role="menu"> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Idea</a> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> First Draft</a> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Editing</a> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Final Draft</a> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Cut</a> </div>
                </span> <span><i className="fa fa-map-marker" aria-hidden="true"></i> Home</span> <span><i className="fa fa-meh-o" aria-hidden="true"></i> Santiago</span>
                <ul className="option-heading">
                  <li>1.1</li>
                  <li><img className="img-fluid rotate-img svg-img" src="/assets/svg/menu.svg" alt="menu"/></li>
                  <li className="dropdown"> <span className="dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img className="img-fluid svg-img" src="/assets/svg/threedots.svg" alt="threedots"/></span>
                    <div className="dropdown-menu dropdown-menu-right" role="menu"> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Outline</a> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Notes</a>
                      <div className="dropdown-divider"></div>
                      <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Versions</a> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Rename</a> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Cut</a> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Delete</a>
                      <div className="dropdown-divider"></div>
                      <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Import</a> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Export</a> </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="content-block" contentEditable={true} suppressContentEditableWarning={true}>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
              </div>
              <a href="javascript:void(0)" onClick={this.handleScene} className="add-scene more-btn">+ SCENE</a> 
              </div>
              <div className="block">
                <div className="inner-heading scene">
                  <h4>Scene one name here</h4>
                  <input type="text" />
                  <div className="pull-left"><span></span> <span>130 Words</span> </div>
                  <div className="pull-right"> <span className="dropdown"><a className="dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fa fa-bolt" aria-hidden="true"></i> Idea</a>
                    <div className="dropdown-menu dropdown-menu-right" role="menu"> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Idea</a> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> First Draft</a> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Editing</a> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Final Draft</a> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Cut</a> </div>
                  </span> <span><i className="fa fa-map-marker" aria-hidden="true"></i> Home</span> <span><i className="fa fa-meh-o" aria-hidden="true"></i> Santiago</span>
                  <ul className="option-heading">
                    <li>1.2</li>
                    <li><img className="img-fluid rotate-img svg-img" src="/assets/svg/menu.svg" alt="menu"/></li>
                    <li className="dropdown"> <span className="dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img className="img-fluid svg-img" src="/assets/svg/threedots.svg" alt="threedots"/></span>
                      <div className="dropdown-menu dropdown-menu-right" role="menu"> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Outline</a> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Notes</a>
                        <div className="dropdown-divider"></div>
                        <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Versions</a> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Rename</a> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Cut</a> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Delete</a>
                        <div className="dropdown-divider"></div>
                        <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Import</a> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Export</a> </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="content-block" contentEditable={true} suppressContentEditableWarning={true}>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                </div>
                <a href="#" className="add-scene more-btn">+ SCENE</a> </div>
                <a href="#" className="add-chapter more-btn">+ CHAPTER</a> </div>
                <div className="block">
                  <h3 className="heading">Things that bring you good luck and bad luck
                    <ul className="option-heading">
                      <li>1.0</li>
                      <li><a className="ksc-modal2"><img className="img-fluid rotate-img svg-img" src="/assets/svg/menu.svg" alt="menu"/></a></li>
                      <li><img className="img-fluid svg-img" src="/assets/svg/threedots.svg" alt="threedots"/></li>
                    </ul>
                  </h3>
                  <div className="block ">
                    <div className="inner-heading">
                      <h4>Scene one name here</h4>
                      <div className="pull-left"><span></span> <span>130 Words</span> <span className="badge">Opening Scene</span> </div>
                      <div className="pull-right"> <span className="dropdown"><a className="dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fa fa-bolt" aria-hidden="true"></i> Idea</a>
                        <div className="dropdown-menu dropdown-menu-right" role="menu"> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Idea</a> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> First Draft</a> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Editing</a> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Final Draft</a> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Cut</a> </div>
                      </span><span><i className="fa fa-map-marker" aria-hidden="true"></i> Home</span> <span><i className="fa fa-meh-o" aria-hidden="true"></i> Santiago</span>
                      <ul className="option-heading">
                        <li>1.1</li>
                        <li><img className="img-fluid rotate-img svg-img" src="/assets/svg/menu.svg" alt="menu"/></li>
                        <li className="dropdown"> <span className="dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img className="img-fluid svg-img" src="/assets/svg/threedots.svg" alt="threedots"/></span>
                          <div className="dropdown-menu dropdown-menu-right" role="menu"> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Outline</a> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Notes</a>
                            <div className="dropdown-divider"></div>
                            <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Versions</a> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Rename</a> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Cut</a> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Delete</a>
                            <div className="dropdown-divider"></div>
                            <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Import</a> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Export</a> </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="content-block" contentEditable={true} suppressContentEditableWarning={true}>
                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    </div>
                    <a href="#" className="add-scene more-btn">+ SCENE</a> </div>
                    <div className="block">
                      <div className="inner-heading">
                        <h4>Scene one name here</h4>
                        <div className="pull-left"><span></span> <span>130 Words</span> </div>
                        <div className="pull-right"><span className="dropdown"><a className="dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fa fa-bolt" aria-hidden="true"></i> Idea</a>
                          <div className="dropdown-menu dropdown-menu-right" role="menu"> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Idea</a> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> First Draft</a> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Editing</a> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Final Draft</a> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Cut</a> </div>
                        </span> <span><i className="fa fa-map-marker" aria-hidden="true"></i> Home</span> <span><i className="fa fa-meh-o" aria-hidden="true"></i> Santiago</span>
                        <ul className="option-heading">
                          <li>1.2</li>
                          <li><img className="img-fluid rotate-img svg-img" src="/assets/svg/menu.svg" alt="menu"/></li>
                          <li className="dropdown"> <span className="dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img className="img-fluid svg-img" src="/assets/svg/threedots.svg" alt="threedots"/></span>
                            <div className="dropdown-menu dropdown-menu-right" role="menu"> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Outline</a> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Notes</a>
                              <div className="dropdown-divider"></div>
                              <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Versions</a> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Rename</a> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Cut</a> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Delete</a>
                              <div className="dropdown-divider"></div>
                              <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Import</a> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Export</a> </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="content-block" contentEditable={true} suppressContentEditableWarning={true}>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                      </div>
                      <a href="#" className="add-scene more-btn">+ SCENE</a> </div>
                      <a href="#" className="add-chapter more-btn">+ CHAPTER</a> </div>
                      <div className="block">
                        <h3 className="heading">Things that bring you good luck and bad luck
                          <ul className="option-heading">
                            <li>1.0</li>
                            <li><a className="ksc-modal2"><img className="img-fluid rotate-img svg-img" src="/assets/svg/menu.svg" alt="menu"/></a></li>
                            <li><img className="img-fluid svg-img" src="assets/svg/threedots.svg" alt="threedots"/></li>
                          </ul>
                        </h3>
                        <div className="block ">
                          <div className="inner-heading">
                            <h4>Scene one name here</h4>
                            <div className="pull-left"><span></span> <span>130 Words</span> <span className="badge">Opening Scene</span> </div>
                            <div className="pull-right"> <span className="dropdown"><a className="dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fa fa-bolt" aria-hidden="true"></i> Idea</a>
                              <div className="dropdown-menu dropdown-menu-right" role="menu"> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Idea</a> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> First Draft</a> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Editing</a> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Final Draft</a> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Cut</a> </div>
                            </span> <span><i className="fa fa-map-marker" aria-hidden="true"></i> Home</span> <span><i className="fa fa-meh-o" aria-hidden="true"></i> Santiago</span>
                            <ul className="option-heading">
                              <li>1.1</li>
                              <li><img className="img-fluid rotate-img svg-img" src="assets/svg/menu.svg" alt="menu"/></li>
                              <li className="dropdown"> <span className="dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img className="img-fluid svg-img" src="/assets/svg/threedots.svg" alt="threedots"/></span>
                                <div className="dropdown-menu dropdown-menu-right" role="menu"> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Outline</a> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Notes</a>
                                  <div className="dropdown-divider"></div>
                                  <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Versions</a> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Rename</a> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Cut</a> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Delete</a>
                                  <div className="dropdown-divider"></div>
                                  <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Import</a> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Export</a> </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="content-block" contentEditable={true} suppressContentEditableWarning={true}>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                          </div>
                          <a href="#" className="add-scene more-btn">+ SCENE</a> </div>
                          <div className="block">
                            <div className="inner-heading">
                              <h4>Scene one name here</h4>
                              <div className="pull-left"><span></span> <span>130 Words</span> </div>
                              <div className="pull-right"><span className="dropdown"><a className="dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fa fa-bolt" aria-hidden="true"></i> Idea</a>
                                <div className="dropdown-menu dropdown-menu-right" role="menu"> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Idea</a> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> First Draft</a> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Editing</a> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Final Draft</a> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Cut</a> </div>
                              </span> <span><i className="fa fa-map-marker" aria-hidden="true"></i> Home</span> <span><i className="fa fa-meh-o" aria-hidden="true"></i> Santiago</span>
                              <ul className="option-heading">
                                <li>1.2</li>
                                <li><img className="img-fluid rotate-img svg-img" src="/assets/svg/menu.svg" alt="menu"/></li>
                                <li className="dropdown"> <span className="dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img className="img-fluid svg-img" src="/assets/svg/threedots.svg" alt="threedots"/></span>
                                  <div className="dropdown-menu dropdown-menu-right" role="menu"> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Outline</a> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Notes</a>
                                    <div className="dropdown-divider"></div>
                                    <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Versions</a> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Rename</a> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Cut</a> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Delete</a>
                                    <div className="dropdown-divider"></div>
                                    <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Import</a> <a href="#" className="dropdown-item"><i className="pg-settings_small"></i> Export</a> </div>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="content-block" contentEditable={true} suppressContentEditableWarning={true}>
                              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                            </div>
                            <a href="#" className="add-scene more-btn">+ SCENE</a> </div>
                            <a href="#" className="add-chapter more-btn">+ CHAPTER</a> </div>
                          </div>
                        </div>
            </div>

<div className="quickview-wrapper common-modal-wrapper" id="right-modal1">
<div className="scrollable">
  <div className="card-scrollable p-l-15 p-r-15">
    <div className="p-l-0 p-r-0">
      <a className="quickview-toggle" data-toggle="quickview" data-toggle-element="#right-modal1" href="javascript:void(0)">
        <i className="fa fa-times" aria-hidden="true"></i>
      </a>
      <div  className="right-modal">
        <div className="mheader">
          <span className="heading">Chapter 2, Scene3</span>
          
          <div className="form-group"> <input type="text" className="form-control" /></div>
        </div>
        <div className="mbody">
          <div className="blk border-bt" > <span className="heading">2 Readers</span>
            <div className="img-list"><img className="img-fluid" src="/assets/images/user-pic.png" alt=""/><img className="img-fluid" src="/assets/images/user-pic.png" alt=""/><a href="#" className="add-img">+</a></div>
          </div>
          <div className="blk"><span className="heading">POV CHATACTER</span>
            <div className="img-list"><img className="img-fluid" src="/assets/images/user-pic.png" alt=""/><a href="#" className="add-img">+</a></div>
          </div>
          <div className="blk"><span className="heading">CHaracter MENTIONS</span>
            <div className="img-list"><img className="img-fluid" src="/assets/images/user-pic.png" alt=""/><img className="img-fluid" src="/assets/images/user-pic.png" alt=""/><img className="img-fluid" src="/assets/images/user-pic.png" alt=""/><a href="#" className="add-img">+</a> </div>
          </div>
          <div className="form-group form-group-default form-group-default-select2">
            <label className="color">PLACE</label>
            <select className="full-width" data-placeholder="PLACE" data-init-plugin="select2">
              <option value="California">California</option>
              <option value="California">California</option>
              <option value="California">California</option>
            </select>
          </div>
          <div className="form-group form-group-default form-group-default-select2">
            <label className="color">SETTING</label>
            <select className="full-width" data-placeholder="SETTING" data-init-plugin="select2">
              <option value="California">California</option>
              <option value="California">California</option>
              <option value="California">California</option>
            </select>
          </div>
          <div className="blk"> <span className="heading">TIMELINE</span>
            <div className="row">
              <div className="col-6">
                <div className="input-group "> <label className="">Start</label>
                  <input type="text" className="form-control date" />
                  <div className="input-group-append "> <span className="input-group-text"><i className="fa fa-calendar"></i></span> </div>
                </div>
              </div>
              <div className="col-6">
                <div className="input-group "> <label className="">End</label>
                  <input type="text" className="form-control date" />
                  <div className="input-group-append "> <span className="input-group-text"><i className="fa fa-calendar"></i></span> </div>
                </div>
              </div>
            </div>
          </div>
          <div className="form-group form-group-default  tags-block">
            <label className="color">LABELS</label>
            <input className="tagsinput custom-tag-input" type="text"  />
            <div className="tags-block-dropdown">
              <ul>
                <li className="lbl-color">
                  <div className="circle">
                    <i className="fa fa-check" aria-hidden="true"></i>
                  </div>
                </li>
                <li>
                  <div className="circle" style={{background: '#ed3551'}}></div>
                </li>
                <li>
                  <div className="circle" style={{background: '#ff5e39'}}></div>
                </li>
                <li>
                  <div className="circle" style={{background: '#cd7a29'}}></div>
                </li>
                <li>
                 <div className="circle" style={{background: '#f0c141'}} ></div>
               </li>
               <li>
                 <div className="circle" style={{background: '#a1ce51'}} ></div>
               </li>
               <li>
                 <div className="circle" style={{background: '#57d17b'}} ></div>
               </li>
               <li>
                 <div className="circle" style={{background: '#1cc5ad'}} ></div>
               </li>
               <li>
                 <div className="circle" style={{background: '#00ace5'}} ></div>
               </li>
               <li>
                 <div className="circle" style={{background: '#3c88d9'}} ></div>
               </li>
               <li>
                 <div className="circle" style={{background: '#7b72e8'}} ></div>
               </li>
               <li>
                 <div className="circle" style={{background: '#ad65db'}} ></div>
               </li>
               <li>
                 <div className="circle" style={{background: '#e764dc'}} ></div>
               </li>
               <li>
                 <div className="circle" style={{background: '#ef4e99'}} ></div>
               </li>
               <li>
                 <div className="circle" style={{background: '#ff91ac'}} ></div>
               </li>
               <li>
                 <div className="circle" style={{background: '#8ca3a6'}} ></div>
               </li>
             </ul>
           </div>
         </div>
         <hr/>
         <div className="form-group form-group-default required ">
          <label>Objective</label>
          <input type="text" className="form-control" required />
        </div>
        <a href="javascript:void(0)" className="add-more color">+ Add More</a> </div>
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

StoryWrite = connect(mapStateToProps, { getLogout })(StoryWrite);

export default withRouter(StoryWrite);