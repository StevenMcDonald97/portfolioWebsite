import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import axios from 'axios';

import 'index.css';
import 'App/CSS/header.css';
import 'App/CSS/main.css';
import 'App/CSS/portfolio.css';
import 'App/CSS/footer.css';
import 'App/CSS/modal.css';
import 'App/CSS/form.css';
import 'App/CSS/contentPage.css';
import 'App/CSS/editing.css';


import ErrorBoundary from 'App/errorBoundary';

// page types
import Portfolio from 'App/pages/portfolio';
import TextPage from 'App/pages/textPage';
import ListPage from 'App/pages/listPage';
import Contact from 'App/pages/contact';
import HomePage from 'App/pages/homePage';
import Modal from 'App/pages/modal';

import Login from 'App/admin/login'
import Register from 'App/admin/register'

import UploadImages from 'App/admin/uploadImages';
import EditStyle from 'App/admin/editStyle';
import UserPanel from 'App/admin/userPanel';
import EditImages from 'App/admin/editImages';
import AddPages from 'App/admin/addPages';
import EditPages from 'App/admin/editPages';

import { history } from 'App/admin/authentication/history'
import { authenticationService } from 'App/admin/authentication/authenticationService';
import { PrivateRoute } from 'App/admin/authentication/privateRoute';

// profile information
import profile from 'App/profile.json';


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


  }

  logout() {
    authenticationService.logout();
    history.push('/login');
  }


  render(){
    // render a link in the navbar for each route in the database
    const createLinks = this.state.pageInfo.map((page) => 
      <li key={page._id} className='navbar-link'><Link to={`/${page.title.replace(/\s+/g, '')}`} className='navbar-link'>{page.title}</Link></li>
    );

    const createRoutes = this.state.pageInfo.map((page) => (
      <Route key={page.title} exact path={`/${page.title.replace(/\s+/g, '')}`} render={() => {return <NewPage pageId={`${page._id}`} pageType={page.type}/>} } />
    ));

    const ContactElement = <Contact />;

    return (
      <React.StrictMode>
        <div>
          <Modal onClose={ this.showContact } show={ this.state.showContact} 
            content={ ContactElement }/>
          <Router>
            <div>
              <div className='header'>
                <h1 className='page-title'><Link to ='/' className='pageTitle'>{profile.Name}</Link></h1>
                <ErrorBoundary>
                  <div className='navbar'>
                    <ul className='navbar-links'>
                      { createLinks }
                      <li key='contact' className='navbar-link'><div className='navbar-link' onClick={ this.showContact } >Contact</div></li>
                      <li key='login' className='navbar-link'><Link to ='/contact' className='navbar-link'>Login</Link></li>
                      <li key='user' className='navbar-link'><Link to='/userPanel' className='navbar-link'>User Panel</Link></li>
                      <li key='upload' className='navbar-link'><Link to='/uploadImages' className='navbar-link'>Upload</Link></li>

                    </ul>
                  </div>
                </ErrorBoundary >
              </div>

              <Switch>
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
                <PrivateRoute exact path='/uploadImages' component={UploadImages} />
                <PrivateRoute exact path='/styleEditor' component={EditStyle} />
                <PrivateRoute exact path='/userPanel' component={UserPanel} />
                <PrivateRoute exact path='/addPages' component={AddPages} />
                <PrivateRoute exact path='/editPages' component={EditPages} />
                <PrivateRoute exact path='/editImages' component={EditImages} />
                { createRoutes }
                <Route path='/' component={NewPage} />
              </Switch>
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
       <HomePage heading={profile.name}  homeText={profile.HomeText} imgDescription={profile.HomeImageText}></HomePage>;
      </ErrorBoundary>
    );
  }
  
};




