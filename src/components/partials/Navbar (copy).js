import React, { Component } from 'react';

class Navbar extends Component {

    constructor(props) {
      super(props);
      this.toggleParentClass = this.toggleParentClass.bind(this);
      this.toggleAnchorActive = this.toggleAnchorActive.bind(this);
      this.parentAct = this.parentAct.bind(this);
      this.addAct = this.addAct.bind(this);
      this.state = {
        fa_active: false,
        anchor_active: false,
        actArr: []
      }
    }

    toggleParentClass() {
      
      const currentState = this.state.fa_active;
      this.setState({ fa_active: !currentState });
    }

    toggleAnchorActive() {
      const currentState = this.state.anchor_active;
      this.setState({ anchor_active: !currentState });
    }

    onDragOver(e) {
      e.preventDefault();
    }
    onDragStart(e, name) {
      console.log("Drag Start: ", name);
      e.dataTransfer.setData("name", name);
    }
    onDrop(e, name) {
      console.log("Drag End: ", e.dataTransfer.getData("name"));
    }

    parentAct() {
      var array = this.state.actArr;
      const actName = `ACT ${array.length + 1}`;
      array.push(
        <li className="dropdown act-dropdown droppable-act" 
          key={actName}
          draggable 
          onDragOver={(e)=>this.onDragOver(e)} 
          onDrop={(e)=>{this.onDrop(e, actName)}}
          onDragStart={(e)=>{this.onDragStart(e, actName)}}
          > 
            <a className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="false" aria-expanded="false">
              <i className="fa fa-angle-right" aria-hidden="true"></i>{actName}
            </a>
            <span className="add act-add" onClick={this.addAct}>+ ACT</span>
                        
        </li>
      )
      this.setState({ actArr: array })
      this.setState({ fa_active: false });
    }

    addAct() {
      var array = this.state.actArr;
      const actName = `ACT ${array.length + 1}`;
      array.push(
      <li className="dropdown act-dropdown" 
        key={actName}
        draggable 
        onDragOver={(e)=>this.onDragOver(e)} 
        onDrop={(e)=>{this.onDrop(e, actName)}}
        onDragStart={(e)=>{this.onDragStart(e, actName)}}
        >
        <a className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="false" aria-expanded="false">
          <i className="fa fa-angle-right" aria-hidden="true"></i>{actName}
        </a>
        <span className="add act-add" onClick={this.addAct}>+ ACT</span>
        </li>);
      this.setState({ actArr: array })
    }

    render() {
        return(
            <div className="col-12 col-md-3 col-lg-2 p-0">
            <nav className="navbar  navbar-expand-md navbar-light navbar-fixed-side">
              <div className="container">
                <div className="navbar-header">
                  <button id="toggle"  className="sidebar-toggle d-none d-md-block" ><img className="img-fluid svg-img" src="assets/svg/menu.svg" alt="menu"/></button>
                  <a className="navbar-brand justify-content-md-center" href="#"><img className="img-fluid" src="assets/images/swift.png" alt="" /></a></div>
                  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation"> <span className="navbar-toggler-icon"></span> </button>
                  <form className="navbar-form navbar-left  d-none d-md-block" onSubmit={this.handleSubmit} >
                    <i className="fa fa-search" aria-hidden="true"></i>
                    <input className="form-control" placeholder="Search" onChange={this.handleChange} />
                  </form>
                  <div id="navbar" className="collapse navbar-collapse">
                    <ul className="nav navbar-nav">
                      <li className="dropdown">
                        <a className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i className="fa fa-angle-right" aria-hidden="true"></i>PLOAT</a>
                        <ul className="dropdown-menu">
                          <li><a href="#">Action</a></li>
                          <li><a href="#">One more</a></li>
                        </ul>
                      </li>
                      <li className="dropdown"><span className="pull-right"><img className="img-fluid svg-img" src="assets/svg/setting.svg" alt="setting"/></span> 
                        <a onClick={this.toggleAnchorActive} className={this.state.fa_active || this.state.anchor_active ? 'dropdown-toggle active': 'dropdown-toggle'} role="button" aria-haspopup="true" aria-expanded="false">
                          <i className="fa fa-angle-right" aria-hidden="true"></i>
                            WRITE<span>
                              &nbsp;
                              <i ref="plus_icon" className="fa fa-plus-circle plus-icon" aria-hidden="true" onClick={this.toggleParentClass}>
                          </i></span>
                        </a>
  
  
                      <div  className="plus-submenu" style={{display: this.state.fa_active ? 'block': 'none'}}>
                        <div className="sub-heading">
                          Story
                        </div>
                        <ul>
                        <li>
                          <a href="javascript:void(0)" onClick={this.parentAct}>Act</a>
                        </li>
                        <li>
                          <a href="#">Chapter</a>
                        </li>
                        <li>
                          <a href="#">Scene</a>
                        </li>
                      </ul>
                    </div>
                    <ul className="dropdown-menu" style={{display: this.state.fa_active || this.state.anchor_active ? 'block': 'none'}}>
                      <li><span className="pull-right hide-tag">HIDE</span><a href="#">Introduction </a></li>
                      
                      {this.state.actArr.map((input, index) => {
                            return input;
                      })}
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
        )
    }
}

export default Navbar;