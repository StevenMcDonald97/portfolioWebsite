import React, { Component } from 'react';
import {
  Link,
} from 'react-router-dom';
import axios from 'axios';
import {FaAngleDown} from 'react-icons/fa';
import ErrorBoundary from 'App/errorBoundary';

export default class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	style:this.props.type,
    	pageInfo:[],
      dropdownClass:"",
      menuWrapClass:""
    };
    this.clickToggleButton=this.clickToggleButton.bind(this);
    this.clickOutsideMenu=this.clickOutsideMenu.bind(this);
    this.stopPropogation=this.stopPropogation.bind(this);
  }

  componentDidMount() {
    axios.get('/api/getPageInfo').then((response) => {
      this.setState({pageInfo:response.data});
    });
  }

  clickToggleButton(){
    console.log("here");
    if (this.state.dropdownClass==""){
      this.setState({dropdownClass:"buttonOpen"});
      this.setState({menuWrapClass:"dropDownMenuShow"});
    } else {
      this.setState({dropdownClass:""});
      this.setState({menuWrapClass:""});
    }
  }

  clickOutsideMenu(){
    this.setState({dropdownClass:""});
    this.setState({menuWrapClass:""});
  }

  stopPropogation(e){
    e.stopPropagation();
  }

  render(){
    if (this.state.style==="sidebar"){
      const createSubLink = (childId) => {
        this.state.pageInfo.forEach((page)=>{
          if (page._id===childId){
            return <li ><Link className="dropDownMenuLink" to={`/${page.title.replace(/\s+/g, '')}`}>page.title}</Link></li>
          }
        })
      }

      const createLinks = this.state.pageInfo.sort((a,b) => a.index - b.index).map((page) => {
          if (page.children){
             return (
                <div>
                  <div className='sideLink'>{page.title} <FaAngleDown /></div>
                  <ul className="sub-menu">
                    page.children.map((childId)=>
                      createSubLink(childId)
                    )
                  </ul>
                </div>
              )
          } else if (page.parent){
              return null;
          } else {
            return <Link key={page._id} to={`/${page.title.replace(/\s+/g, '')}`} className='sideLink'>{page.title}</Link>     
          }
        }
      );

      return(
        <div className="menuSideBar">
          <div>
             <Link key='home' to={'/'} className='sideLink'>Home</Link>      
              { createLinks }
              <a key='contact' className='sideLink' onClick={ this.props.showContact } >Contact</a>
          </div>
        </div>
      );


    } else if (this.state.style==="sidebarCollapsable"){
    	const createLinks = this.state.pageInfo.map((page) => 
	      <Link key={page._id} to={`/${page.title.replace(/\s+/g, '')}`} className='navbar-link'>{page.title}</Link>
	    );
    	return(
        null
    	);
    } else if (this.state.style==="dropdown"){

      const createSubLink = (childId) => {
        this.state.pageInfo.forEach((page)=>{
          if (page._id===childId){
            return <li ><Link className="dropDownMenuLink" to={`/${page.title.replace(/\s+/g, '')}`}>page.title}</Link></li>
          }
        })
      }

      const createLinks = this.state.pageInfo.sort((a,b) => a.index - b.index).map((page) => {
          if (page.children){
             return (
                <li key={page._id} className="menu-item-has-children">
                  <div className='dropDownMenuLink'>{page.title} <FaAngleDown /></div>
                  <ul className="sub-menu">
                    page.children.map((childId)=>
                      createSubLink(childId)
                    )
                  </ul>
                </li>
              )
          } else if (page.parent){
              return null;
          } else {
            return <li key={page._id} ><Link to={`/${page.title.replace(/\s+/g, '')}`} className='dropDownMenuLink'>{page.title}</Link></li>          
          }
        }
      );

    	return(
        <div className="custom-dropdown-menu">
          <span className={`menuToggleButton ${this.state.dropdownClass}`} onClick={this.clickToggleButton}>
            <div className="menuBar menuBarTop"></div>
            <div className="menuBar menuBarMiddle"></div>
            <div className="menuBar menuBarBottom"></div>
          </span>
          <div className={`dropDownMenuWrap ${this.state.menuWrapClass}`} onClick={this.clickOutsideMenu}>
            <div>
              <ul className="dropDownMenu">
                <li key='home' ><Link to={'/'} className='dropDownMenuLink'>Home</Link></li>          
                { createLinks }
                <li key='contact'><div className='dropDownMenuLink' onClick={ this.props.showContact } >Contact</div></li>
              </ul>
            </div>
          </div>
        </div>
    	);
    } else {
      const createSubLink = (childId) => {
        this.state.pageInfo.forEach((page)=>{
          if (page._id===childId){
            return <Link className="user-dropwdown-link" to={`/${page.title.replace(/\s+/g, '')}`}>page.title}</Link>
          }
        })
      }

      const createLinks = this.state.pageInfo.sort((a,b) => a.index - b.index).map((page) => {
          if (page.children){
             return (<li key={page._id} className='navbar-link dropdown'>
                  <div className='user-navbar-link dropbtn'>{page.title} <FaAngleDown /></div>
                  <div className='dropdown-content'>
                    page.children.map((childId)=>
                      createSubLink(childId)
                    )
                  </div>
                </li>
              )
          } else if (page.parent){
              return null;
          } else {
            return <li key={page._id} className='navbar-link'><Link to={`/${page.title.replace(/\s+/g, '')}`} className='navbar-link'>{page.title}</Link></li>
          }
        }
      );

    	return(
          <ErrorBoundary>
            <div className='navbar'>
              <ul className='navbar-links'>
                <li className='navbar-link'><Link to={'/'} className='navbar-link'>Home</Link></li>
                { createLinks }
                <li key='contact' className='navbar-link'><div className='navbar-link' onClick={ this.props.showContact } >Contact</div></li>
              </ul>
            </div>
          </ErrorBoundary >
        );
    }
  }


}

