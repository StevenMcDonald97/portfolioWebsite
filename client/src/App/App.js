import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import axios from 'axios';
import { Helmet } from "react-helmet";

import 'src/index.css';
import 'src/App/CSS/fonts.css';
import 'src/App/CSS/main.scss';
import 'src/App/CSS/header.scss';
import 'src/App/CSS/footer.scss';
import 'src/App/CSS/portfolio.css';
import 'src/App/CSS/modal.css';
import 'src/App/CSS/form.css';
import 'src/App/CSS/editing.css';


import ErrorBoundary from 'src/App/errorBoundary';

// page types
import Navigation from 'src/App/pages/navigation';
import Portfolio from 'src/App/pages/portfolio';
import TextPage from 'src/App/pages/textPage';
import ListPage from 'src/App/pages/listPage';
import Footer from 'src/App/pages/footer';
import Contact from 'src/App/pages/contact';
import HomePage from 'src/App/pages/homePage';
import Modal from 'src/App/pages/modal';
import Login from 'src/App/admin/login';
import Register from 'src/App/admin/register';
import EditProfile from 'src/App/admin/editProfile';

import UploadImages from 'src/App/admin/uploadImages';
import EditStyle from 'src/App/admin/editStyle';
import UserPanel from 'src/App/admin/userPanel';
import EditImages from 'src/App/admin/editImages';
import AddPages from 'src/App/admin/addPages';
import EditPages from 'src/App/admin/editPages';
import EditLayout from 'src/App/admin/editLayout';
import EditFooter from 'src/App/admin/editFooter';

import { history } from 'src/App/admin/authentication/history'
import { authenticationService } from 'src/App/admin/authentication/authenticationService';
import { PrivateRoute } from 'src/App/admin/authentication/privateRoute';

const layoutJson = require('src/App/layout.json');

// import Modal from './components/test-modal';
// import Portfolio from './components/portfolioPage';

// import * as serviceWorker from './serviceWorker';

// var homeText = `Steven is a nationally awarded plein air artist 
// living and working in the California Bay Area`;
// var HomeImage = '../testimages/home.jpg';
// var homeHeading = 'Steven McDonald';
// var homeImageDescription='A Painting of Clouds over Marshland'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      pageInfo: [],   
      showContact: false,
      title:"",
      subTitle:"",
      description:"",
      navBarType:layoutJson.navigationStyle
    };
    this.setState = this.setState.bind(this);
  }

  showContact = () => {
    this.setState({
      showContact: !this.state.showContact
    });
  };

  componentDidMount() {
    axios.get('/api/getPageInfo').then((response) => {
      this.setState({pageInfo:response.data});
    });
    axios.get('/api/getHomePage').then((response)=>{
      this.setState({title:response.data.name, subTitle:response.data.subHeader, description:response.data.description})
    })
  }

  logout() {
    authenticationService.logout();
    history.push('/login');
  }



  render(){
    // sort pages then render a link in the navbar for each route in the database
    const createRoutes = [].slice.call(this.state.pageInfo).map((page) => (
      page.title ? <Route key={page.title} exact path={`/${page.title.replace(/\s+/g, '')}`} render={() => {return <NewPage pageId={`${page._id}`} pageType={page.type}/>}} /> : null
    ));
  
    const ContactElement = <Contact cancel={ this.showContact }/>;

    return (
      <React.StrictMode>
        <div>
	        <Helmet>
				<title>{ this.state.title }</title>
				<meta name="description" content={this.state.title+" website: "+this.state.subHeader+this.state.description} />
			</Helmet>
          <Modal onClose={ this.showContact } show={ this.state.showContact} 
            content={ ContactElement }/>
          <Router>
            <div>
              <div className={`header ${layoutJson.menuStyle}`}>
                <h1 className={`pageTitle ${layoutJson.headerAlignment}`}><Link to ='/' className='pageLink'>{this.state.title}</Link></h1>
                <Navigation navigationStyle={layoutJson.menuStyle} showContact={ this.showContact } />
              </div>
              <div className={`pageContainer ${layoutJson.menuStyle}`}>
                <Switch>
                  <Route exact path='/login' component={Login} />
                  <Route exact path='/register' component={Register} />
                  <PrivateRoute exact path='/editProfile' component={EditProfile} />
                  <PrivateRoute exact path='/uploadImages' component={UploadImages} />
                  <PrivateRoute exact path='/styleEditor' component={EditStyle} />
                  <PrivateRoute exact path='/userPanel' component={UserPanel} />
                  <PrivateRoute exact path='/addPages' component={AddPages} />
                  <PrivateRoute exact path='/editPages' component={EditPages} />
                  <PrivateRoute exact path='/editImages' component={EditImages} />
                  <PrivateRoute exact path='/editLayout' component={EditLayout} />
                  <PrivateRoute exact path='/editFooter' component={EditFooter} />
                  { createRoutes }
                  <Route path='/' render={() => {return <NewPage title={this.state.title} subTitle={this.state.subTitle}/>}} />
                </Switch>
              </div>
              <Footer footerClass={layoutJson.menuStyle}/>
            </div>
          </Router>
        </div>
      </React.StrictMode>
    );
  }
}


const NewPage =(props)=> {
  if (props.pageType==='text'){
    return (
      <ErrorBoundary >
        <TextPage pageId={props.pageId}/>
      </ErrorBoundary>
    );
  } else if (props.pageType==='list'){
    return (
      <ErrorBoundary >
       <ListPage pageId={props.pageId}/>
      </ErrorBoundary>
    );
  } else if (props.pageType==='portfolio'){
    return (
      <ErrorBoundary >
       <Portfolio pageId={props.pageId} portfolioStyle={layoutJson.portfolioStyle}/>
      </ErrorBoundary>
    );
  } else {
    return (
      <ErrorBoundary >
       <HomePage imgDescription="Home page artwork"></HomePage>
      </ErrorBoundary>
    );
  }
  
};




