import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import axios from 'axios';

import '../index.css';
import './CSS/header.css';
import './CSS/main.css';
import './CSS/portfolio.css';
import './CSS/footer.css';
import './CSS/modal.css';
import './CSS/form.css';
import './CSS/contentPage.css';
import './CSS/editing.css';

// authentication
import Login from './securePages/login';
import withAuth from './securePages/withAuth';
import Register from './securePages/registerUser';

// page types
import Portfolio from './pages/portfolioPage';
import TextPage from './pages/textPage';
import ListPage from './pages/listPage';

import Contact from './pages/contact';
import HomePage from './pages/homePage';
import Modal from './pages/modal';
import Secure from './securePages/secure';
import UploadImages from './securePages/uploadImages';
import EditStyle from './securePages/editStyle';
import UserPanel from './securePages/userPanel';
import EditImages from './securePages/editImages';
import AddPages from './securePages/addPages';
import EditPages from './securePages/editPages';
import AddPortfolios from './securePages/addPortfolios';
import EditPortfolios from './securePages/editPortfolios';
import StyleEditor from './securePages/editStyle';
import userPanel from './securePages/userPanel';

// profile information
import profileImg from "./profileimages/Profile-Pic.jpg";
import profile from './profile.json';


// import Modal from "./components/test-modal";
// import Portfolio from "./components/portfolioPage";

// import * as serviceWorker from './serviceWorker';

// var homeText = `Steven is a nationally awarded plein air artist 
// living and working in the California Bay Area`;
// var HomeImage = "../testimages/home.jpg";
// var homeHeading = "Steven McDonald";
// var homeImageDescription="A Painting of Clouds over Marshland"

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      pageInfo: [],   
      showContact: false,

    }
    this.setState = this.setState.bind(this);
    this.getPageInfo=this.getPageInfo.bind(this);
  }

  showContact = e => {
    this.setState({
      showContact: !this.state.showContact
    });
  };

  getPageInfo = () =>{
    axios.get('/api/getPageInfo').then((response) => {
      this.setState({pageInfo:response.data})
    });

  }

  componentDidMount() {
    this.getPageInfo();
  }



  //  // Retrieves the list of items from the Express app
  // getRoutes = () => {
  //   fetch('/api/getRoutes')
  //   .then(res => res.json())
  //   .then(data => this.setState({ routes: data, isLoading: false }));
  // }

  render(){
    // const { routes } = this.state;

    // render a link in the navbar for each route in the database
    const createLinks = this.state.pageInfo.map((page) => 
      <li key={page._id} className="navbar-link"><Link to={`/${page.title.replace(/\s+/g, '')}`} className="navbar-link">{page.title}</Link></li>
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
            <div className="header">
              <h1 className="page-title">{profile.Name}</h1>
              <div className="navbar">
                <ul className="navbar-links">
                  { createLinks }
                  <li key="contact" className="navbar-link"><div className="navbar-link" onClick={ this.showContact } >Contact</div></li>
                  <li key="login" className="navbar-link"><Link to ="/contact" className="navbar-link">Login</Link></li>
                  <li key="user" className="navbar-link"><Link to="/userPanel" className="navbar-link">User Panel</Link></li>
                  <li key="upload" className="navbar-link"><Link to="/uploadImages" className="navbar-link">Upload</Link></li>

                </ul>
              </div>
            </div>

            <Switch>
              <Route exact path="/secret" component={withAuth(Secure)} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/uploadImages" component={UploadImages} />
              <Route exact path="/styleEditor" component={EditStyle} />
              <Route exact path="/userPanel" component={UserPanel} />
              <Route exact path="/uploadImages" component={UploadImages} />
              <Route exact path="/addPages" component={AddPages} />
              { createRoutes }
              <Route path="/" component={NewPage} />

            </Switch>
          </div>
        </Router>
        </div>
      </React.StrictMode>
      
    );
  }
}


const NewPage =(props)=> {
    if (props.pageType==="text"){
      return <TextPage pageId={props.pageId}/>
    } else if (props.pageType==="list"){
      return <ListPage pageId={props.pageId}/>
    } else if (props.pageType==="portfolio"){
      return <Portfolio pageId={props.pageId}/>
    } else {
      return <HomePage heading={profile.name}  homeText={profile.HomeText} imgDescription={profile.HomeImageText}></HomePage>;

    }
  

}




