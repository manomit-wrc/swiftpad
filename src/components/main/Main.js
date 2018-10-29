import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { insertAct } from '../../actions/auth';
import _ from 'lodash';
import StoryWrite from './StoryWrite';

var placeholder = document.createElement("li");
placeholder.className = "placeholder";

class Main extends Component {

    constructor(props) {
      super(props);
      this.toggleParentClass = this.toggleParentClass.bind(this);
      this.toggleAnchorActive = this.toggleAnchorActive.bind(this);
      
      this.addAct = this.addAct.bind(this);
      
      
      
      this.state = {
        fa_active: false,
        anchor_active: false,
        actArr: [],
        ul_class: false,
        a_scene: false,
        chapterCount: 0,
        actName: '',
        actIndex: 0,
        chapterName: '',
        chapterID: 0, 
        sceneName: '', 
        SceneIndex: 0,
        ChapterIndex: 0,
        ul_parent: false,
        ...props
        
      }
    }
    toggleParentClass() {

      
      
      const currentState = this.state.fa_active;
      this.setState({ fa_active: !currentState });
    }

    toggleAnchorActive(e) {

      const currentState = this.state.anchor_active;

      if(currentState) {
        e.currentTarget.classList.remove("active");
        e.currentTarget.nextSibling.nextSibling.style.display = "none";
      }
      else {
        e.currentTarget.classList.add("active");
        e.currentTarget.nextSibling.nextSibling.style.display = "block";
      }
      this.setState({ anchor_active: !currentState });
    }

    addChapter(e,actName, index) {
      try {
        
        const currentState = this.state.ul_class;
        let currentChapterCount = this.state.chapterCount;
        const element = document.getElementById(e.target.id);
        if(!currentState) {
          element.classList.add("active");
          element.nextSibling.nextSibling.style.display = 'block';
          this.setState({ ul_class: true });
        }
        else {
          element.classList.remove("active");
          element.nextSibling.nextSibling.style.display = 'none';
          this.setState({ ul_class: false });
        }
        
        let array = this.state.actArr;
        const data = _.filter(array, arr => arr.name === actName);
        //console.log(data);
        if(data[0].chapter.length === 0) {
          _.map(array, (arr, index_1) => {
            
            if(arr.name === actName) {
              
              if(typeof arr.chapter !== undefined) {
                currentChapterCount++;
                arr.chapter.push({
                  name: `Chapter`,
                  scenes: [],
                  id: `chapter-${currentChapterCount}-${index + 1}`
                })
              }
            }
          });
          
          this.setState({ actArr: array, chapterCount: currentChapterCount})
          
        }
      }
      catch(error) {

      }
      
    
    }

    addAnotherChapter(e, actName, index) {
      const element = document.getElementById(e.target.id);
      const parentElement = element.parentElement;
      const currentState = this.state.ul_class;
      let currentChapterCount = this.state.chapterCount;
      if(!currentState) {
        parentElement.classList.add("active");
        parentElement.nextSibling.nextSibling.style.display = 'block';
        this.setState({ ul_class: true });
      }
      else {
        parentElement.classList.remove("active");
        parentElement.nextSibling.nextSibling.style.display = 'none';
        this.setState({ ul_class: false });
      }

      let array = this.state.actArr;
      const data = _.filter(array, arr => arr.name === actName);

      if(data[0].chapter.length === 0) {
        _.map(array, (arr, index_1) => {
          
          if(arr.name === actName) {
            
            if(typeof arr.chapter !== undefined) {
              currentChapterCount++;
              arr.chapter.push({
                name: `Chapter`,
                scenes: [],
                id: `chapter-${currentChapterCount}-${index + 1}`
              })
            }
          }
        });
        
        this.setState({ actArr: array, chapterCount: currentChapterCount})
        
      }
    }

    addChildChapter(e, actName, index) {
      let array = this.state.actArr;
      let currentChapterCount = this.state.chapterCount;
      _.map(array, (arr, index_1) => {
        if(arr.name === actName) {
          
          if(typeof arr.chapter !== undefined) {
            currentChapterCount++;
            arr.chapter.push({
              name: `Chapter`,
              scenes: [],
              id: `chapter-${currentChapterCount}-${index + 1}`
            })
          }
        }
      });
      
      this.setState({ actArr: array, chapterCount: currentChapterCount})
      
    }

    addScene(e, actName, chapter_id) {
      
      const currentState = this.state.a_scene;
      const element = document.getElementById(e.target.id);

      
      if(!currentState) {
        element.classList.add("active");
        element.nextSibling.nextSibling.style.display = 'block';
        this.setState({ a_scene: true });
      }
      else {
        element.classList.remove("active");
        element.nextSibling.nextSibling.style.display = 'none';
        this.setState({ a_scene: false });
      }

      let array = this.state.actArr;
      const actData = _.filter(array, arr => arr.name === actName);
      
      
      const chapterData = _.filter(actData[0].chapter, arr => arr.id === chapter_id);
      
      

      if(chapterData.length === 0 || chapterData[0].scenes.length === 0) {
        _.map(array, arr => {
          if(typeof arr.scenes !== undefined) {
            
            _.map(arr.chapter, arr1 => {
              if(arr1.id === chapter_id) {
                arr1.scenes.push({
                  name: 'Scene'
                })
              }
            })
          }
        });
        
        this.setState({ actArr: array });
      }
      
    }

    addChildScene(e, actName, chapter_id) {
      
      let array = this.state.actArr;
      _.map(array, arr => {
        if(typeof arr.scenes !== undefined) {
          _.map(arr.chapter, arr1 => {
            if(arr1.id === chapter_id) {
              arr1.scenes.push({
                name: 'Scene'
              })
            }
          })
        }
      });
      this.setState({ actArr: array });
    }

    parentAct(e) {

      let element = e.currentTarget;
      let actData = {}
      
      element.parentNode.parentNode.parentNode.previousSibling.classList.add("active");
      element.parentNode.parentNode.parentNode.nextSibling.style.display = "block";

      let array = this.state.actArr;
      
      const actName = `ACT ${array.length + 1}`;

      actData.type = 'act';
      actData.story_id = 21;
      actData.title = actName;
      actData.target_word_count = 1000;

      this.props.insertAct(actData);

      array.push({
        name: actName,
        chapter: []
      });
      

      const currentState = this.state.fa_active;
      
      
      this.setState({ fa_active: !currentState, ul_parent: true , actArr: array });

    }

    addAct() {
      var array = this.state.actArr;
      const actName = `ACT ${array.length + 1}`;
      
      array.push({
        name: actName,
        chapter: []
      });
      this.setState({ actArr: array })
    }

    dragStart(e) {
      this.dragged = e.currentTarget;
      
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/html', this.dragged);
    }
    dragEnd(e) {
      this.dragged.style.display = 'block';
      
      this.dragged.parentNode.removeChild(placeholder);
      
      // update state

      var data = this.state.actArr;
      var from = Number(this.dragged.dataset.id);
      var to = Number(this.over.dataset.id);

      if(from < to) to--;
      data.splice(to, 0, data.splice(from, 1)[0]);
      this.setState({actArr: data});
    }
    dragOver(e) {
      e.preventDefault();
      this.dragged.style.display = "none";
      if(e.target.className === 'placeholder') return;
      this.over = e.target.parentNode;
      //console.log(e.target.parentNode);
      const element = document.getElementById('parent');
      element.insertBefore(placeholder, e.target.parentNode)
      //e.target.parentNode.insertBefore(placeholder, e.target.parentNode);
    }

    dragChapterStart(e) {
      this.dragged = e.currentTarget;
      
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/html', this.dragged);
    }

    dragChapterEnd(e) {
      this.dragged.style.display = 'block';
      
      this.dragged.parentNode.removeChild(placeholder);
      
      // update state

      var data = this.state.actArr;
      var from = Number(this.dragged.dataset.id);
      var to = Number(this.over.dataset.id);

      if(from < to) to--;
      data.splice(to, 0, data.splice(from, 1)[0]);
      this.setState({actArr: data});
    }

    dragChapterOver(e) {
      e.preventDefault();
      this.dragged.style.display = "none";
      if(e.target.className === 'placeholder') return;
      this.over = e.target.parentNode;
      console.log(e.target.parentNode);
      const element = document.getElementsByClassName('ul-chapter');
      console.log(element[0]);
      //element[0].insertBefore(placeholder, element[0])
      //e.target.parentNode.insertBefore(placeholder, e.target.parentNode);
    }

    dispatchScene(e, actName,actIndex,  chapterName, chapterID, ChapterIndex, sceneName, SceneIndex) {
      
      this.setState({ actName, actIndex, chapterName, chapterID,ChapterIndex, sceneName, SceneIndex });
    }

    handleBlur = (txtValue, chapterID, SceneIndex) => {
      const array = this.state.actArr;
      
      _.map(array, (arr, index) => {
        _.map(arr.chapter, (chapter, chapIndex) => {
          if(chapter.id === chapterID) {
            _.map(chapter.scenes, (scene, scIndex) => {
              if(scIndex === SceneIndex) {
                array[index].chapter[chapIndex].scenes[SceneIndex].name = txtValue;
              }
              
            })
          }
        })
      });

      this.setState({ actArr: array });
    }

    


    render() {
        return(
          <Fragment>
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
                      <a onClick={(e) => this.toggleAnchorActive(e)} className="dropdown-toggle" role="button" aria-haspopup="true" aria-expanded="false">
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
                        <a href="javascript:void(0)" onClick={(e) => this.parentAct(e)}>Act</a>
                      </li>
                      <li>
                        <a href="#">Chapter</a>
                      </li>
                      <li>
                        <a href="#">Scene</a>
                      </li>
                    </ul>
                  </div>
                  <ul onDragOver={this.dragOver.bind(this)} id="parent" className="dropdown-menu" style={{display: this.state.ul_parent ? 'block': 'none'}}>
                    
                    
                    {this.state.actArr.map((act, index) => {
                          return (
                            <li className="dropdown act-dropdown droppable-act parent"
                                data-id={index} 
                                key={index}
                                draggable='true'
                                onDragEnd={this.dragEnd.bind(this)}
                                onDragStart={this.dragStart.bind(this)}
                                > 
                                  <a id={`act-${index + 1}`} onClick={(e)=>this.addChapter(e, act.name, index)} className="dropdown-toggle" role="button" aria-haspopup="false" aria-expanded="false">
                                    <i id={`i-${index + 1}`} onClick={(e)=>this.addAnotherChapter(e, act.name, index)} className="fa fa-angle-right" aria-hidden="true"></i>{act.name}
                                  </a>
                                  <span className="add act-add" onClick={this.addAct}>+ ACT</span>
                                  <ul className="dropdown-menu chapter-sortable ui-sortable ul-chapter"
                                    onDragOver={this.dragChapterOver.bind(this)}
                                  >
                                    {act.chapter.map((chapter, ChapterIndex) => {
                                      return (
                                        <li className="dropdown" 
                                        data-id={ChapterIndex}
                                        key={ChapterIndex}
                                        draggable='true'
                                        onDragEnd={this.dragChapterEnd.bind(this)}
                                        onDragStart={this.dragChapterStart.bind(this)}
                                        >
                                          <ul className="option-heading">
                                          <li>{index + 1}.{ChapterIndex + 1}</li>
                                          <li>
                                            <img className="img-fluid rotate-img svg-img ksc-modal2" src="/assets/svg/menu.svg" alt="menu" />
                                          </li>
                                          <li>
                                              <img className="img-fluid svg-img" src="/assets/svg/threedots.svg" alt="threedots" />
                                          </li>
                                          </ul>
                                          <a id={chapter.id} onClick={(e) => this.addScene(e, act.name, chapter.id)} className="dropdown-toggle"  role="button" aria-haspopup="true" aria-expanded="false">
                                          <i id={chapter.id} className="fa fa-angle-right" aria-hidden="true"></i>{chapter.name}</a>
                                          <span className="add chapter-add" onClick={(e)=>this.addChildChapter(e, act.name, index)}>+ CHAPTER</span>
                                          <ul className="dropdown-menu sceen-sortable ui-sortable">
                                            {chapter.scenes.map((scene, SceneIndex) => {
                                              return (
                                                <li key={SceneIndex}>
                                                <ul className="option-heading">
                                                  <li>{index + 1}.{ChapterIndex + 1}.{SceneIndex + 1}</li>
                                                  <li>
                                                    <img className="img-fluid rotate-img svg-img ksc-modal2" src="/assets/svg/menu.svg" alt="menu" />
                                                  </li>
                                                  <li>
                                                      <img className="img-fluid svg-img" src="/assets/svg/threedots.svg" alt="threedots" />
                                                  </li>
                                                </ul>
                                                  <a className="active" href="javascript:void(0)" onClick={(e) => this.dispatchScene(e, act.name,index,  chapter.name, chapter.id,ChapterIndex, scene.name, SceneIndex)}>
                                                    <i className="fa fa-circle" aria-hidden="true"></i>{scene.name}</a> 
                                                    <span className="add scene-add" onClick={(e) => this.addChildScene(e, act.name, chapter.id)}>+ SCENE</span> 
                                                </li>
                                              )
                                            })}
                                          </ul>
                                        </li>
                                      )
                                    })}
                                  </ul>
                            </li>
                          )
                    })}
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>

      <StoryWrite 
        actName={this.state.actName}
        actIndex={this.state.actIndex}
        chapterName={this.state.chapterName}
        chapterID={this.state.chapterID}
        ChapterIndex={this.state.ChapterIndex}
        sceneName={this.state.sceneName}
        SceneIndex={this.state.SceneIndex}
        handleBlur={this.handleBlur}
        handleScene={this.addChildScene}
      />
      </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
  return {
      auth: state.auth
  };
}

export default connect(mapStateToProps, { insertAct })(Main);