import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import axios from 'axios';

import 'index.css';
import 'App/CSS/main.scss';
import 'App/CSS/header.scss';
import 'App/CSS/portfolio.css';
import 'App/CSS/footer.css';
import 'App/CSS/modal.css';
import 'App/CSS/form.css';
import 'App/CSS/editing.css';


import ErrorBoundary from 'App/errorBoundary';

// page types
import Navigation from 'App/pages/navigation'
import Portfolio from 'App/pages/portfolio';
import TextPage from 'App/pages/textPage';
import ListPage from 'App/pages/listPage';
import Contact from 'App/pages/contact';
import HomePage from 'App/pages/homePage';
import Modal from 'App/pages/modal';
import Login from 'App/admin/login';
import Register from 'App/admin/register';
import EditProfile from 'App/admin/editProfile';

import UploadImages from 'App/admin/uploadImages';
import EditStyle from 'App/admin/editStyle';
import UserPanel from 'App/admin/userPanel';
import EditImages from 'App/admin/editImages';
import AddPages from 'App/admin/addPages';
import EditPages from 'App/admin/editPages';
import EditLayout from 'App/admin/editLayout';

import { history } from 'App/admin/authentication/history'
import { authenticationService } from 'App/admin/authentication/authenticationService';
import { PrivateRoute } from 'App/admin/authentication/privateRoute';

const layoutJson = require('App/layout.json');

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
      this.setState({title:response.data.name})
    })
  }

  logout() {
    authenticationService.logout();
    history.push('/login');
  }



  render(){
    // sort pages then render a link in the navbar for each route in the database
    let pages=this.state.pageInfo;
    const createLinks = pages.sort((a,b) => a.index - b.index).map((page) => 
      <li key={page._id} className='navbar-link'><Link to={`/${page.title.replace(/\s+/g, '')}`} className='navbar-link'>{page.title}</Link></li>
    );

    const createRoutes = this.state.pageInfo.map((page) => (
      <Route key={page.title} exact path={`/${page.title.replace(/\s+/g, '')}`} render={() => {return <NewPage pageId={`${page._id}`} pageType={page.type}/>}} />
    ));
  
    const ContactElement = <Contact cancel={ this.showContact }/>;

    return (
      <React.StrictMode>
        <div>
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
                  { createRoutes }
                  <Route path='/' render={() => {return <NewPage title={this.state.title} subTitle={this.state.subTitle}/>}} />
                </Switch>
            </div>
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
       <Portfolio pageId={props.pageId}/>
      </ErrorBoundary>
    );
  } else {
    return (
      <ErrorBoundary >
       <HomePage imgDescription="Home page artwork"></HomePage>;
      </ErrorBoundary>
    );
  }
  
};




