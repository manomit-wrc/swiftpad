import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { insertAct, getStoryContent, insertChapter, insertScene } from '../../actions/auth';
import _ from 'lodash';
import $ from 'jquery';

var placeholder = document.createElement("li");
placeholder.className = "placeholder";

class Main extends Component {

    constructor(props) {
      super(props);
      this.toggleParentClass = this.toggleParentClass.bind(this);
      this.toggleAnchorActive = this.toggleAnchorActive.bind(this);
      
      this.addAct = this.addAct.bind(this);
      
      this.chapterSortable = React.createRef();
      
      
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
        story_id: null,
        displayContent: true,
        ...props
        
      }
    }

    componentWillMount() {
      this.setState({ story_id: this.props.match.params.id });
      let story = {};
      story.id = this.props.match.params.id;
      this.props.getStoryContent(story);
      
    }
    
    componentWillReceiveProps(nextProps) {
      var array = this.state.actArr;
      if(nextProps.auth.storyContent !== undefined) {
        if(this.state.displayContent) {
            //console.log(nextProps.auth.storyContent);
          _.map(nextProps.auth.storyContent, (act, index) => {
            const actName = `ACT ${index + 1}`;

            array.push({
              name: actName,
              id: act.id,
              chapter: []
            });

            if(act.children !== undefined) {
              _.map(act.children, (chapter, c_index) => {
                array[index].chapter.push({
                  name: `Chapter`,
                  new_chapter_id: chapter.id,
                  scenes: [],
                  id: `chapter-${c_index + 1}-${index + 1}`
                })

                if(chapter.children !== undefined) {
                  _.map(chapter.children, (scene, s_index) => {
                      array[index].chapter[c_index].scenes.push({
                        name: "Scene"
                      });
                  })
                  
                }
              })
            }
          });

          //console.log(array);

          this.setState({ actArr: array });
        }

      }
    }

    componentDidMount() {
      // this.chapterSortable.current.sortable({
      //   connectWith: ".chapter-sortable",
      //   stack: '.chapter-sortable ul li'
      // }).disableSelection();

      $(document).ready(function() {
        $( ".chapter-sortable" ).sortable({
          connectWith: ".chapter-sortable"
        }).disableSelection();
        alert("Hello");
      });
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

    addChapter(e,actName, index, actId) {
      try {
        //alert(actId);
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
          
          this.setState({ actArr: array, chapterCount: currentChapterCount, displayContent: false});
          let actData = {};
          actData.type = 'chapter';
          actData.story_id = this.state.story_id;
          actData.parent_id = actId;
          actData.meta = {
            title: "Chapter",
            target_word_count: 0
          }

          this.props.insertChapter(actData);
          
        }
      }
      catch(error) {

      }
      
    
    }

    addAnotherChapter(e, actName, index, actId) {
      //alert(actId);
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
        
        this.setState({ actArr: array, chapterCount: currentChapterCount, displayContent: false});

        let actData = {};
        actData.type = 'chapter';
        actData.story_id = this.state.story_id;
        actData.parent_id = actId;
        actData.meta = {
          title: "Chapter",
          target_word_count: 0
        }

        this.props.insertChapter(actData);
        
      }
    }

    addChildChapter(e, actName, index, actId) {
      
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
      
      this.setState({ actArr: array, chapterCount: currentChapterCount, displayContent: false})

      let actData = {};
      actData.type = 'chapter';
      actData.story_id = this.state.story_id;
      actData.parent_id = actId;
      actData.meta = {
        title: "Chapter",
        target_word_count: 0
      }

      this.props.insertChapter(actData);
      
    }

    addScene(e, actName, chapter_id, new_chapter_id) {
      
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
        
        this.setState({ actArr: array, displayContent: false });

        let actData = {};
        actData.type = 'scene';
        actData.story_id = this.state.story_id;
        actData.parent_id = new_chapter_id;
        actData.meta = {
          title: "Scene",
          target_word_count: 0
        }

        this.props.insertScene(actData);
      }
      
    }

    addChildScene(e, actName, chapter_id, new_chapter_id) {
      
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
      this.setState({ actArr: array, displayContent: false });

      let actData = {};
        actData.type = 'scene';
        actData.story_id = this.state.story_id;
        actData.parent_id = new_chapter_id;
        actData.meta = {
          title: "Scene",
          target_word_count: 0
        }

        this.props.insertScene(actData);
    }

    parentAct(e) {

      let element = e.currentTarget;
      let actData = {}
      
      element.parentNode.parentNode.parentNode.previousSibling.classList.add("active");
      element.parentNode.parentNode.parentNode.nextSibling.style.display = "block";

      let array = this.state.actArr;
      
      const actName = `ACT ${array.length + 1}`;

      actData.type = 'act';
      actData.story_id = this.state.story_id;
      actData.meta = {
        title: actName,
        target_word_count: 1000
      }
      

      

      array.push({
        name: actName,
        chapter: []
      });
      

      const currentState = this.state.fa_active;
      
      
      this.setState({ fa_active: !currentState, ul_parent: true , actArr: array, displayContent: false });
      this.props.insertAct(actData);

    }

    addAct() {
      let actData = {};
      var array = this.state.actArr;
      const actName = `ACT ${array.length + 1}`;
      
      array.push({
        name: actName,
        chapter: []
      });
      this.setState({ actArr: array, displayContent: false });

      actData.type = 'act';
      actData.story_id = this.state.story_id;
      actData.meta = {
        title: actName,
        target_word_count: 1000
      }

      this.props.insertAct(actData);
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
         
          <div className="col-12 col-md-3 col-lg-2 p-0">
          <nav className="navbar  navbar-expand-md navbar-light navbar-fixed-side">
            <div className="container">
              <div className="navbar-header">
                <button id="toggle"  className="sidebar-toggle d-none d-md-block" ><img className="img-fluid svg-img" src="/assets/svg/menu.svg" alt="menu"/></button>
                <a className="navbar-brand justify-content-md-center" href="/dashboard"><img className="img-fluid" src="/assets/images/swift.png" alt="" /></a></div>
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
                    <li className="dropdown"><span className="pull-right"><img className="img-fluid svg-img" src="/assets/svg/setting.svg" alt="setting"/></span> 
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
                  <ul  id="parent" className="dropdown-menu" style={{display: this.state.ul_parent ? 'block': 'none'}}>
                    
                    
                    {this.state.actArr.map((act, index) => {
                          return (
                            <li className="dropdown act-dropdown droppable-act parent"
                                data-id={index} 
                                key={index}
                                
                                > 
                                  <a id={`act-${index + 1}`} onClick={(e)=>this.addChapter(e, act.name, index, act.id)} className="dropdown-toggle" role="button" aria-haspopup="false" aria-expanded="false">
                                    <i id={`i-${index + 1}`} onClick={(e)=>this.addAnotherChapter(e, act.name, index, act.id)} className="fa fa-angle-right" aria-hidden="true"></i>{act.name}
                                  </a>
                                  <span className="add act-add" onClick={this.addAct}>+ ACT</span>
                                  <ul className="dropdown-menu chapter-sortable" ref={this.chapterSortable} >
                                    {act.chapter.map((chapter, ChapterIndex) => {
                                      return (
                                        <li className="dropdown" 
                                        data-id={ChapterIndex}
                                        key={ChapterIndex}
                                       
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
                                          <a id={chapter.id} onClick={(e) => this.addScene(e, act.name, chapter.id, chapter.new_chapter_id)} className="dropdown-toggle"  role="button" aria-haspopup="true" aria-expanded="false">
                                          <i id={chapter.id} className="fa fa-angle-right" aria-hidden="true"></i>{chapter.name}</a>
                                          <span className="add chapter-add" onClick={(e)=>this.addChildChapter(e, act.name, index, act.id)}>+ CHAPTER</span>
                                          <ul className="dropdown-menu sceen-sortable">
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
                                                    <span className="add scene-add" onClick={(e) => this.addChildScene(e, act.name, chapter.id, chapter.new_chapter_id)}>+ SCENE</span> 
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
      
        )
    }
}

const mapStateToProps = (state) => {
  return {
      auth: state.auth
  };
}

Main = connect(mapStateToProps, { insertAct, getStoryContent, insertChapter, insertScene })(Main);
export default withRouter(Main);